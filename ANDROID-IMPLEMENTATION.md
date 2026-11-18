# Android implementation plan

## Architecture

JestBox remains a static, offline-first HTML/CSS/JavaScript application. Capacitor packages the existing source as locally bundled WebView assets; the Android application does not need a remote website, backend, account, analytics SDK, or network API for its core functionality.

The root web files remain the single source of truth. `scripts/prepare-web.mjs` stages the application files, joke data, native share bridge, local `assets/`, and all twelve localized legal HTML pages into the generated `www/` directory. Legal pages are rendered from the six locale-specific Markdown policies and accessibility statements during the build, so they remain available offline. Generated staging output is recreated for every build.

## Toolchain

- Node.js 22
- Capacitor CLI, Core, and Android 8.6.2 (pinned)
- Java 21
- Android SDK supplied by the GitHub Actions runner

The proposed Android application ID is `com.ertapanjatakia.jestbox`. Treat it as provisional until package-name availability and store requirements are confirmed.

## Automated debug build

The `JestBox Android debug build` workflow installs the pinned Capacitor, Share, Markdown-rendering, and bundling dependencies; stages the local web assets and twelve localized legal pages; generates the Android platform project; synchronizes it; and assembles a debug APK. The APK is uploaded as a 14-day workflow artifact.

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
