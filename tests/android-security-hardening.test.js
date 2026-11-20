import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const script = resolve("scripts/prepare-android-security.mjs");
const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <application android:allowBackup="true" android:label="JestBox">
    <activity android:name=".MainActivity" android:exported="true" />
  </application>
</manifest>`;
const variables = `ext {\n    minSdkVersion = 24\n    compileSdkVersion = 36\n    targetSdkVersion = 36\n}\n`;
const cordova = `<?xml version="1.0" encoding="utf-8"?>
<widget><access origin="*" /><allow-navigation href="http://localhost/*" /></widget>`;

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "jestbox-android-hardening-"));
  await mkdir(join(root, "android/app/src/main/res/xml"), { recursive: true });
  await mkdir(join(root, "android"), { recursive: true });
  await writeFile(join(root, "android/app/src/main/AndroidManifest.xml"), manifest);
  await writeFile(join(root, "android/variables.gradle"), variables);
  await writeFile(join(root, "android/app/src/main/res/xml/config.xml"), cordova);
  return root;
}

test("Android hardening closes the MobSF manifest and hybrid-origin gaps", async () => {
  const root = await fixture();
  try {
    const run = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
    assert.equal(run.status, 0, run.stderr || run.stdout);
    const [m, v, c] = await Promise.all([
      readFile(join(root, "android/app/src/main/AndroidManifest.xml"), "utf8"),
      readFile(join(root, "android/variables.gradle"), "utf8"),
      readFile(join(root, "android/app/src/main/res/xml/config.xml"), "utf8")
    ]);
    assert.match(m, /android:allowBackup="false"/);
    assert.ok(m.includes('xmlns:tools="http://schemas.android.com/tools"'));
    assert.ok(m.includes('android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false" tools:node="merge"'));
    assert.match(v, /minSdkVersion = 29/);
    assert.doesNotMatch(v, /minSdkVersion = 24/);
    assert.ok(c.includes('<access origin="http://localhost" />'));
    assert.ok(!c.includes('<access origin="*" />'));
    assert.ok(c.includes('<allow-navigation href="http://localhost/*" />'));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("Android hardening fails closed if upstream Capacitor defaults change", async () => {
  const root = await fixture();
  try {
    await writeFile(join(root, "android/variables.gradle"), variables.replace("minSdkVersion = 24", "minSdkVersion = 25"));
    const run = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
    assert.notEqual(run.status, 0);
    assert.match(run.stderr, /Expected Capacitor minSdkVersion = 24/);
    assert.match(await readFile(join(root, "android/app/src/main/AndroidManifest.xml"), "utf8"), /allowBackup="true"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
