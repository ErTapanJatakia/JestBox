# JestBox for Android

This directory contains a native Android shell for the existing JestBox web application.

## Architecture

- The repository-root `index.html`, `styles.css`, `script.js`, and `assets/` remain the canonical application source.
- The Gradle `syncJestBoxWebAssets` task copies those files into the Android build's generated `assets/www/` directory before `preBuild`.
- The app loads only the bundled entry point at `file:///android_asset/www/index.html`.
- The wrapper uses the platform WebView and Android SDK APIs; it does not add a JavaScript bridge or third-party runtime dependency.
- The Android manifest deliberately omits `INTERNET`, location, camera, microphone, contacts, and storage permissions. The app's core functionality is local.
- HTTPS links explicitly opened by the user are handed to the external browser. Non-HTTPS navigation is blocked inside the WebView.

## Security controls

- JavaScript is enabled only because the bundled JestBox interface requires it.
- DOM storage and WebView database storage are disabled.
- Content URI access, geolocation, pop-up windows, mixed content, and universal/file-to-file URL access are disabled.
- Safe Browsing is enabled on Android 8.0 and newer.
- TLS errors are cancelled; the wrapper does not provide an SSL bypass.
- WebView debugging is enabled only in debug builds.

## Build prerequisites

- JDK 17
- Android SDK Platform 35 and Android Build Tools installed
- Gradle 8.9 or compatible wrapper (Android Gradle Plugin 8.7.3)

From this directory, build a debug APK with:

```sh
gradle assembleDebug
```

The expected output is `app/build/outputs/apk/debug/app-debug.apk`.

## Release caveats

The application ID `com.ertapanjatakia.jestbox`, version code, version name, minimum SDK, target SDK, icons, and store metadata are initial engineering defaults, not confirmed RuStore registration values. Confirm package identity and RuStore requirements before publishing. Release signing, device testing, accessibility testing in TalkBack, and store validation remain outstanding. Do not distribute a debug APK as a production release.
