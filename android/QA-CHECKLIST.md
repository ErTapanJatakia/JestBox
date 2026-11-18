# Android wrapper engineering checklist

## Source and architecture
- [x] Native Android module scaffolded with platform WebView APIs only
- [x] Root web app remains the single source of truth
- [x] Gradle task bundles root HTML, CSS, JavaScript and local assets
- [x] No Android network or sensitive runtime permissions declared
- [x] WebView persistent storage and unsafe file-origin access disabled
- [x] HTTPS navigation delegated to the external browser
- [x] Launcher icon and application label added

## Validation and release
- [ ] Node.js static Android-wrapper regression tests pass in GitHub Actions
- [ ] Gradle debug build succeeds on JDK 17 / Android SDK 35
- [ ] APK contents inspected to confirm all web assets are bundled
- [ ] APK installed and tested on physical Android device(s)
- [ ] Offline operation verified with device network disabled
- [ ] Locale selection, filtering, daily joke, copy and share fallbacks tested
- [ ] TalkBack and large-font accessibility checked
- [ ] Android back navigation and external-link handling tested
- [ ] Package ID and versioning confirmed for the RuStore listing
- [ ] Release signing configuration established outside source control
- [ ] Release APK/AAB and RuStore submission reviewed and approved

The unchecked items are not claims of failure; they are pending validation. Do not mark them complete without recorded evidence.
