# JestBox External Software Interfaces

## Scope

This inventory covers interfaces used by the application and repository automation. It is not an API specification for a hosted JestBox service.

## Interface inventory

| Interface | Purpose | Data/authentication | Trust considerations |
|---|---|---|---|
| Android OS share sheet via Capacitor Share | User-initiated sharing | Joke title/text and dialog title | Data leaves the app only when user selects a destination |
| Capacitor WebView/native bridge | Invoke selected native capabilities | Plugin-specific arguments | Treat every bridge call as a privilege boundary |
| npm registry | Install locked build dependencies | Package metadata and tarballs over HTTPS | Lockfile, dependency review and integrity |
| Android SDK/Gradle | Generate and build Android package | Source, SDK components and build metadata | Pin/record toolchain versions; inspect outputs |
| GitHub repository and PR APIs | Source control and review | Git objects, refs and PR metadata | Branch ruleset and token scope |
| GitHub Actions | Execute CI, scanners and signing | Event metadata, source tree, scoped token; signing secrets only in protected job | Workflow code is security-sensitive |
| GitHub Actions artifacts | Temporary transfer of build and scan outputs | APKs, reports, checksums and metadata | Temporary retention; correlate artifact identity |
| GitHub Environment | Gate production signing | Reviewer/wait configuration and Environment-scoped secrets | Verify platform settings; YAML declaration alone is insufficient |
| Scanner containers/services | MobSF, ZAP, Trivy, OSV, Gitleaks and other analysis | Source, APK or dependency metadata | Assess scope, version, outbound network and limitations |
| App stores/distribution channels | Future distribution if separately approved | Signed APK and store metadata | Build/signing success does not authorize submission |

## Network and data boundaries

The product is designed for offline-first use. Do not introduce remote APIs, telemetry, analytics, account services or additional domains without approved privacy and security review. Build-time package downloads and scanner integrations are repository automation, not application runtime network requirements.

## Interface change review

For each new interface document purpose/owner, data categories, direction, authentication, secret scope, transport, permissions, trust boundary, failure behaviour, logging, retention, privacy impact, user consent, test evidence and rollback.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial inventory based on current application and workflow architecture. |
