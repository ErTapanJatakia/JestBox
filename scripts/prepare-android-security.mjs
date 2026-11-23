import { readFile, writeFile } from "node:fs/promises";

const manifestPath = "android/app/src/main/AndroidManifest.xml";
const variablesPath = "android/variables.gradle";
const cordovaConfigPath = "android/app/src/main/res/xml/config.xml";

const [manifestInput, variablesInput, cordovaInput] = await Promise.all([
  readFile(manifestPath, "utf8"),
  readFile(variablesPath, "utf8"),
  readFile(cordovaConfigPath, "utf8")
]);

if (!/<application\b[^>]*>/s.test(manifestInput)) {
  throw new Error("Android application manifest has no application element; refusing partial hardening.");
}
if (!/android:allowBackup\s*=\s*"(?:true|false)"/.test(manifestInput)) {
  throw new Error("Manifest allowBackup attribute is missing or unrecognised; refusing to guess.");
}
if (!/^\s*minSdkVersion\s*=\s*24\s*$/m.test(variablesInput)) {
  throw new Error("Expected Capacitor minSdkVersion = 24 in variables.gradle; inspect template before changing.");
}
const wildcardAccessRule = /<access\b(?=[^>]*\borigin\s*=\s*["']\*["'])[^>]*\/>/g;
const wildcardAccessMatches = [...cordovaInput.matchAll(wildcardAccessRule)];
if (wildcardAccessMatches.length === 0) {
  throw new Error('Expected at least one Cordova wildcard access rule; refusing to silently skip origin restriction.');
}

let manifest = manifestInput.replace(
  /android:allowBackup\s*=\s*"(?:true|false)"/,
  'android:allowBackup="false"'
);

if (!manifest.includes("xmlns:tools=")) {
  manifest = manifest.replace(
    /<manifest\b/,
    '<manifest xmlns:tools="http://schemas.android.com/tools"'
  );
}
if (!manifest.includes('android:name="androidx.profileinstaller.ProfileInstallReceiver"')) {
  manifest = manifest.replace(
    /<\/application>/,
    '    <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false" tools:replace="android:exported" tools:node="merge" />\n</application>'
  );
} else {
  manifest = manifest.replace(
    /<receiver\b([^>]*android:name=["']androidx\.profileinstaller\.ProfileInstallReceiver["'][^>]*)\/>/,
    (_tag, attrs) => {
      let updated = attrs.replace(/android:exported=["'][^"']+["']/, "").trim();
      if (!/android:exported=/.test(updated)) updated += ' android:exported="false"';
      if (!/tools:replace=/.test(updated)) updated += ' tools:replace="android:exported"';
      if (!/tools:node=/.test(updated)) updated += ' tools:node="merge"';
      return '<receiver' + updated + ' />';
    }
  );
}
if (!manifest.includes('android:name="androidx.profileinstaller.ProfileInstallReceiver" android:exported="false"') ||
    !manifest.includes('tools:replace="android:exported"')) {
  throw new Error("Could not enforce non-exported ProfileInstallReceiver override.");
}

const variables = variablesInput.replace(
  /^\s*minSdkVersion\s*=\s*24\s*$/m,
  "    minSdkVersion = 29"
);
const cordovaConfig = cordovaInput.replace(
  wildcardAccessRule,
  '<access origin="http://localhost" />'
);

if (/android:allowBackup="true"/.test(manifest) ||
    /^\s*minSdkVersion\s*=\s*24\s*$/m.test(variables) ||
    wildcardAccessRule) {
  throw new Error("One or more Android security hardening invariants failed.");
}

await Promise.all([
  writeFile(manifestPath, manifest),
  writeFile(variablesPath, variables),
  writeFile(cordovaConfigPath, cordovaConfig)
]);
console.log("Android hardening applied: API 29 minimum, app backup disabled, ProfileInstallReceiver non-exported, all Cordova access origins restricted to localhost.");
