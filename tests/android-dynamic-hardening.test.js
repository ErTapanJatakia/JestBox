import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("MobSF dynamic APK build applies hardening and verifies the packaged artifact", async () => {
  const workflow = await readFile(".github/workflows/mobsf-android-dynamic.yml", "utf8");
  const sync = workflow.indexOf("npx cap sync android");
  const hardening = workflow.indexOf("node scripts/prepare-android-security.mjs", sync);
  const build = workflow.indexOf("assembleDebug", hardening);
  const verification = workflow.indexOf("python3 scripts/verify_android_apk_config.py --artifact debug", build);
  const emulator = workflow.indexOf("Start Android API 30 emulator", verification);

  assert.notEqual(sync, -1, "Capacitor sync step must exist");
  assert.ok(hardening > sync, "Android hardening must run after Capacitor sync");
  assert.ok(build > hardening, "Debug APK must be built after hardening");
  assert.ok(verification > build, "The compiled debug APK must be verified after build");
  assert.ok(emulator > verification, "Emulator/MobSF execution must not start before APK policy verification");
});

test("compiled APK verifier exposes the disposable debug artifact", async () => {
  const verifier = await readFile("scripts/verify_android_apk_config.py", "utf8");
  assert.match(verifier, /"debug": Path\("android\/app\/build\/outputs\/apk\/debug\/app-debug\.apk"\)/);
});
