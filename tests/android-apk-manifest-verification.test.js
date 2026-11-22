import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const script = resolve("scripts/verify-android-apk-manifest.mjs");
const validManifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.jestbox.app">
  <uses-sdk android:minSdkVersion="29" android:targetSdkVersion="36" />
  <uses-permission android:name="android.permission.INTERNET" />
  <application android:allowBackup="false" android:debuggable="false">
    <activity android:name="com.jestbox.app.MainActivity" android:exported="true">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
    <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false" />
    <provider android:name="androidx.core.content.FileProvider" android:exported="false" />
  </application>
</manifest>`;

async function runVerifier(xml) {
  const root = await mkdtemp(join(tmpdir(), "jestbox-apk-manifest-"));
  try {
    const input = join(root, "manifest.xml");
    const report = join(root, "report.json");
    await writeFile(input, xml);
    const result = spawnSync(process.execPath, [script, input, "--report", report], { encoding: "utf8" });
    const json = await readFile(report, "utf8").then(JSON.parse);
    return { result, json };
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("final APK manifest accepts the expected hardened application profile", async () => {
  const { result, json } = await runVerifier(validManifest);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(json.checksPassed, true);
  assert.deepEqual(json.permissions, ["android.permission.INTERNET"]);
  assert.equal(json.components.find((item) => item.name === "androidx.profileinstaller.ProfileInstallReceiver").exported, "false");
});

test("final APK manifest rejects backup, cleartext, old SDK and exported non-launcher components", async () => {
  const unsafe = validManifest
    .replace('android:minSdkVersion="29"', 'android:minSdkVersion="24"')
    .replace('android:allowBackup="false"', 'android:allowBackup="true"')
    .replace('<application android:allowBackup="true" android:debuggable="false">', '<application android:allowBackup="true" android:debuggable="false" android:usesCleartextTraffic="true">')
    .replace('android:name="androidx.core.content.FileProvider" android:exported="false"', 'android:name="androidx.core.content.FileProvider" android:exported="true"');
  const { result, json } = await runVerifier(unsafe);
  assert.notEqual(result.status, 0);
  assert.equal(json.checksPassed, false);
  assert.match(json.failures.join("\\n"), /minSdkVersion|allowBackup|cleartext|Unexpected exported component/);
});

test("final APK manifest rejects sensitive permissions and a missing ProfileInstaller receiver", async () => {
  const unsafe = validManifest
    .replace('  <uses-permission android:name="android.permission.INTERNET" />', '  <uses-permission android:name="android.permission.INTERNET" />\\n  <uses-permission android:name="android.permission.READ_CONTACTS" />')
    .replace(/    <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false" \/>\\n/, "");
  const { result, json } = await runVerifier(unsafe);
  assert.notEqual(result.status, 0);
  assert.match(json.failures.join("\\n"), /sensitive permission|ProfileInstallReceiver/);
});
