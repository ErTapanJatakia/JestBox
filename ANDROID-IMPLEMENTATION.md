# Android implementation plan

## Architecture

JestBox remains a static, offline-first HTML/CSS/JavaScript application. Capacitor packages the existing source as locally bundled WebView assets; the Android application does not need a remote website, backend, account, analytics SDK, or network API for its core functionality.

The root web files remain the single source of truth. `scripts/prepare-web.mjs` stages the application files, joke data, native share bridge, local `assets/`, and all sixteen localized legal HTML pages into the generated `www/` directory. Legal pages are rendered from the eight locale-specific Markdown policies and accessibility statements during the build, so they remain available offline. Generated staging output is recreated for every build.

## Application branding

The canonical launcher artwork is `assets/JestBox-Original.png`. After Capacitor generates the Android platform, `scripts/prepare-android-branding.mjs` copies this exact source image into Android's `drawable-nodpi` resources and configures the generated application manifest to use it as both the standard and round launcher icon. The web launch screen and header use the same source PNG. No substitute mascot is used as the product logo.

## Toolchain

- Node.js 22
- Capacitor CLI, Core, and Android 8.6.2 (pinned)
- Java 21
- Android SDK supplied by the GitHub Actions runner

The proposed Android application ID is `com.ertapanjatakia.jestbox`. Treat it as provisional until package-name availability and store requirements are confirmed.

## Automated debug build

The `JestBox Android debug build` workflow installs the pinned Capacitor, Share, Markdown-rendering, and bundling dependencies; stages the local web assets and sixteen localized legal pages; generates the Android platform project; synchronizes it; and assembles a debug APK. The APK is uploaded as a 14-day workflow artifact.

This first integration stage generates the Android project in the CI workspace. It deliberately does not commit generated Android/Gradle files to the repository yet. Once the debug build and compatibility review pass, the generated native project can be committed in a dedicated follow-up change for maintainable Android Studio development and release signing.

## Security and privacy boundaries

- Do not add remote URLs, analytics, advertising, crash-reporting, or telemetry SDKs.
- Do not enable mixed content.
- Do not add Android permissions unless a documented feature requires them.
- Do not embed signing keys, passwords, or store credentials in source control.
- Debug APKs are not production-signed release packages.
- A successful CI build does not establish device compatibility, WCAG conformance of the Android WebView, or RuStore acceptance.

## Release work not yet performed

No release keystore has been created, no signed APK/AAB has been produced, and no RuStore submission has been made. Those steps require a separate release-readiness review and explicit approval.


## MobSF-driven Android hardening

The Android generation pipeline applies `scripts/prepare-android-security.mjs` after Capacitor creates the native project and before synchronization/build. The script fails closed if the upstream generated files no longer match the reviewed defaults.

- Minimum supported Android version is raised from API 24 to API 29. This avoids installing the app on Android 7–9 devices that no longer receive reasonable platform security updates. **Compatibility impact:** devices below Android 10 cannot install or upgrade to this hardened build.
- Application backup is disabled (`android:allowBackup="false"`) to reduce ADB backup extraction exposure.
- AndroidX ProfileInstaller's broadcast receiver is explicitly merged as non-exported, preventing other apps from invoking that receiver.
- Cordova's wildcard network access rule is narrowed to the local Capacitor origin (`http://localhost`). JestBox's application content is bundled locally and does not require arbitrary remote origins.

The build includes regression tests for these transformations and fails if the generated Capacitor defaults change unexpectedly. These are build-time source changes only; they do not alter an already-uploaded RuStore APK or the submission currently under moderation.

## MobSF findings requiring contextual validation

MobSF's external-storage and temporary-file warnings point into Capacitor's Share/WebChrome bridge. Those paths are part of user-initiated file sharing; the static report alone does not prove sensitive data is exposed. Hardening them by removing or breaking the share flow would be an unsafe false-positive fix. The application has no SMS permission, no tracker was detected, and the behaviour signatures are not proof of SMS inbox access. The hardcoded-data heuristic and generic Capacitor logging warning also require source-level validation before suppressing or modifying framework code.
