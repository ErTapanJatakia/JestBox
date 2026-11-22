import { readFile, writeFile } from "node:fs/promises";

const [manifestPath, ...args] = process.argv.slice(2);
if (!manifestPath) {
  console.error("Usage: node scripts/verify-android-apk-manifest.mjs <apkanalyzer-manifest.xml> [--report <json-path>]");
  process.exit(2);
}
const reportIndex = args.indexOf("--report");
const reportPath = reportIndex >= 0 ? args[reportIndex + 1] : null;
if (reportIndex >= 0 && !reportPath) {
  console.error("--report requires a file path.");
  process.exit(2);
}

const xml = await readFile(manifestPath, "utf8");
const failures = [];
const attr = (source, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp("(?:^|\\s)" + escaped + "\\s*=\\s*\\\"([^\\\"]*)\\\""));
  return match?.[1] ?? null;
};
const openTag = (name) => {
  const match = xml.match(new RegExp("<" + name + "\\b([^>]*)>", "s"));
  if (!match) failures.push("Missing <" + name + "> element in APK manifest.");
  return match?.[1] ?? "";
};
const manifestAttrs = openTag("manifest");
const sdkAttrs = openTag("uses-sdk");
const appAttrs = openTag("application");
const android = (attrs, name) => attr(attrs, "android:" + name);

const packageName = attr(manifestAttrs, "package");
const minSdk = Number(android(sdkAttrs, "minSdkVersion"));
const targetSdk = Number(android(sdkAttrs, "targetSdkVersion"));
const allowBackup = android(appAttrs, "allowBackup");
const debuggable = android(appAttrs, "debuggable");
const cleartext = android(appAttrs, "usesCleartextTraffic");
const networkSecurityConfig = android(appAttrs, "networkSecurityConfig");

if (packageName !== "com.jestbox.app") failures.push("Unexpected package identity: " + (packageName ?? "missing"));
if (!Number.isFinite(minSdk) || minSdk < 29) failures.push("APK minSdkVersion must be at least 29; found " + (android(sdkAttrs, "minSdkVersion") ?? "missing"));
if (!Number.isFinite(targetSdk) || targetSdk < 35) failures.push("APK targetSdkVersion must be at least 35; found " + (android(sdkAttrs, "targetSdkVersion") ?? "missing"));
if (allowBackup !== "false") failures.push("APK application must explicitly set android:allowBackup=false.");
if (debuggable === "true") failures.push("APK application is debuggable=true.");
if (cleartext === "true") failures.push("APK application explicitly permits cleartext traffic.");

const componentPattern = /<(activity|activity-alias|service|receiver|provider)\\b([^>]*?)(\\/?)>/g;
const components = [];
for (const match of xml.matchAll(componentPattern)) {
  const [, tag, attributes, selfClosing] = match;
  const name = android(attributes, "name") ?? "unnamed";
  const exported = android(attributes, "exported");
  const start = match.index + match[0].length;
  const closeIndex = selfClosing ? start : xml.indexOf("</" + tag + ">", start);
  const body = closeIndex < 0 ? "" : xml.slice(start, closeIndex);
  const hasIntentFilter = /<intent-filter\\b/.test(body);
  const isLauncher = /android:name=["']android\\.intent\\.action\\.MAIN["']/.test(body) &&
    /android:name=["']android\\.intent\\.category\\.LAUNCHER["']/.test(body);

  components.push({ tag, name, exported, hasIntentFilter, launcher: isLauncher });
  if (hasIntentFilter && exported === null) {
    failures.push(tag + " " + name + " has an intent-filter but no explicit android:exported value.");
  }
  if (exported === "true" && (!(tag === "activity" || tag === "activity-alias") || !isLauncher)) {
    failures.push("Unexpected exported component: " + tag + " " + name + ".");
  }
  if (tag === "receiver" && name === "androidx.profileinstaller.ProfileInstallReceiver" && exported !== "false") {
    failures.push("ProfileInstallReceiver must be explicitly non-exported.");
  }
}
if (!components.some((item) => item.tag === "receiver" && item.name === "androidx.profileinstaller.ProfileInstallReceiver" && item.exported === "false")) {
  failures.push("Expected non-exported AndroidX ProfileInstallReceiver was not found in the merged APK manifest.");
}
if (!components.some((item) => item.launcher && item.exported === "true")) {
  failures.push("No explicitly exported MAIN/LAUNCHER activity was found.");
}

const permissionPattern = /<(uses-permission|uses-permission-sdk-23|uses-permission-sdk-m)\\b([^>]*)\\/?>/g;
const permissions = [...xml.matchAll(permissionPattern)].map((match) => attr(match[2], "android:name")).filter(Boolean);
const prohibitedPermission = /^(?:android\\.permission\\.(?:READ|WRITE)_EXTERNAL_STORAGE|android\\.permission\\.MANAGE_EXTERNAL_STORAGE|android\\.permission\\.(?:READ|SEND|RECEIVE)_SMS|android\\.permission\\.(?:READ|WRITE)_CONTACTS|android\\.permission\\.(?:READ|WRITE)_CALENDAR|android\\.permission\\.(?:ACCESS_FINE_LOCATION|ACCESS_COARSE_LOCATION|ACCESS_BACKGROUND_LOCATION|CAMERA|RECORD_AUDIO|CALL_PHONE|READ_CALL_LOG|WRITE_CALL_LOG|BODY_SENSORS|ACTIVITY_RECOGNITION|READ_MEDIA_(?:IMAGES|VIDEO|AUDIO)|READ_MEDIA_VISUAL_USER_SELECTED))$/;
for (const permission of permissions) {
  if (prohibitedPermission.test(permission)) failures.push("Unexpected sensitive permission declared: " + permission);
}

const report = {
  packageName,
  minSdkVersion: Number.isFinite(minSdk) ? minSdk : null,
  targetSdkVersion: Number.isFinite(targetSdk) ? targetSdk : null,
  allowBackup,
  debuggable: debuggable ?? "false (manifest default)",
  usesCleartextTraffic: cleartext ?? "false (platform default for targetSdkVersion >= 28)",
  networkSecurityConfig,
  permissions: [...new Set(permissions)].sort(),
  components,
  checksPassed: failures.length === 0,
  failures
};

if (reportPath) await writeFile(reportPath, JSON.stringify(report, null, 2) + "\\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) {
  console.error("APK manifest verification failed closed.");
  process.exit(1);
}
console.log("APK merged-manifest security verification passed.");
