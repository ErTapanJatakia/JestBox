import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const manifest = read("../android/app/src/main/AndroidManifest.xml");
const gradle = read("../android/app/build.gradle.kts");
const activity = read("../android/app/src/main/java/com/ertapanjatakia/jestbox/MainActivity.kt");

test("Android manifest requests no network or sensitive runtime permissions", () => {
  assert.equal(manifest.includes("<uses-permission"), false);
  assert.match(manifest, /android:allowBackup="false"/);
  assert.match(manifest, /android:usesCleartextTraffic="false"/);
});

test("Android wrapper uses the canonical bundled web entry point", () => {
  assert.ok(activity.includes('webView.loadUrl("file:///android_asset/www/index.html")'));
  assert.match(gradle, /syncJestBoxWebAssets/);
  assert.ok(gradle.includes('include("index.html", "script.js", "styles.css")'));
  assert.ok(gradle.includes('into("www/assets")'));
});

test("WebView disables persistent storage and unsafe cross-origin file access", () => {
  assert.match(activity, /javaScriptEnabled = true/);
  assert.match(activity, /domStorageEnabled = false/);
  assert.match(activity, /databaseEnabled = false/);
  assert.match(activity, /allowContentAccess = false/);
  assert.match(activity, /allowFileAccessFromFileURLs = false/);
  assert.match(activity, /allowUniversalAccessFromFileURLs = false/);
  assert.match(activity, /MIXED_CONTENT_NEVER_ALLOW/);
  assert.match(activity, /safeBrowsingEnabled = true/);
  assert.match(activity, /handler\?\.cancel\(\)/);
});

test("Android wrapper blocks non-HTTPS external navigation inside WebView", () => {
  assert.match(activity, /if \(scheme != "https"\) return true/);
  assert.match(activity, /Intent\(Intent\.ACTION_VIEW, uri\)/);
  assert.doesNotMatch(activity, /addJavascriptInterface/);
});

test("Android module starts without third-party runtime dependencies", () => {
  assert.doesNotMatch(gradle, /implementation\s*\(/);
  assert.match(gradle, /compileSdk = 35/);
  assert.match(gradle, /minSdk = 23/);
  assert.match(gradle, /jvmTarget = "17"/);
});
