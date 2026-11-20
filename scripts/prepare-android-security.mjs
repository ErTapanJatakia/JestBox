import { readFile, writeFile } from "node:fs/promises";

const manifestPath = "android/app/src/main/AndroidManifest.xml";
const variablesPath = "android/variables.gradle";
const cordovaConfigPath = "android/app/src/main/res/xml/config.xml";

const [manifestInput, variablesInput, cordovaInput] = await Promise.all([
  readFile(manifestPath, "utf8"),
  readFile(variablesPath, "utf8"),
  readFile(cordovaConfigPath, "utf8")
]);

if (!/<application\\b[^>]*>/s.test(manifestInput)) {
  throw new Error("Android application manifest has no application element; refusing partial hardening.");
}
if (!/android:allowBackup\\s*=\\s*"(?:true|false)"/.test(manifestInput)) {
  throw new Error("Manifest allowBackup attribute is missing or unrecognised; refusing to guess.");
}
if (!/^\\s*minSdkVersion\\s*=\\s*24\\s*$/m.test(variablesInput)) {
  throw new Error("Expected Capacitor minSdkVersion = 24 in variables.gradle; inspect template before changing.");
}
if (!/<access\\s+origin=["']\\*["']\\s*\\/>/.test(cordovaInput)) {
  throw new Error('Expected Cordova wildcard <access origin="*" /> rule; refusing to silently skip origin restriction.');
}

let manifest = manifestInput.replace(
  /android:allowBackup\\s*=\\s*"(?:true|false)"/,
  'android:allowBackup="false"'
);

if (!manifest.includes("xmlns:tools=")) {
  manifest = manifest.replace(
    /<manifest\\b/,
    '<manifest xmlns:tools="http://schemas.android.com/tools"'
  );
}
if (!manifest.includes('android:name="androidx.profileinstaller.ProfileInstallReceiver"')) {
  manifest = manifest.replace(
    /<\\/application>/,
    '    <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false" tools:node="merge" />\\n</application>'
  );
} else {
  manifest = manifest.replace(
    /<receiver\\b([^>]*android:name=["']androidx\\.profileinstaller\\.ProfileInstallReceiver["'][^>]*)\\/>/,
    (tag, attrs) => {
      let updated = attrs.replace(/android:exported=["'][^"']+["']/, "").trim();
      if (!/android:exported=/.test(updated)) updated += ' android:exported="false"';
      if (!/tools:node=/.test(updated)) updated += ' tools:node="merge"';
      return '<receiver' + updated + ' />';
    }
  );
}
if (!manifest.includes('android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false"')) {
  throw new Error("Could not enforce non-exported ProfileInstallReceiver override.");
}

const variables = variablesInput.replace(
  /^\\s*minSdkVersion\\s*=\\s*24\\s*$/m,
  "    minSdkVersion = 29"
);
const cordovaConfig = cordovaInput.replace(
  /<access\\s+origin=["']\\*["']\\s*\\/>/,
  '<access origin="http://localhost" />'
);

if (/android:allowBackup="true"/.test(manifest) ||
    /^\\s*minSdkVersion\\s*=\\s*24\\s*$/m.test(variables) ||
    /<access\\s+origin=["']\\*["']\\s*\\/>/.test(cordovaConfig)) {
  throw new Error("One or more Android security hardening invariants failed.");
}

await Promise.all([
  writeFile(manifestPath, manifest),
  writeFile(variablesPath, variables),
  writeFile(cordovaConfigPath, cordovaConfig)
]);
console.log("Android hardening applied: API 29 minimum, app backup disabled, ProfileInstallReceiver non-exported, Cordova origin restricted to localhost.");
