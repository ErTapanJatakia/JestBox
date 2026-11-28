# JestBox Android release signing

## Selected Android architecture

JestBox uses the Capacitor Android project generated from the canonical web application. The locked Capacitor 8 toolchain, `@capacitor/share` integration, offline web asset preparation, and Android branding script are the release build inputs.

The standalone native WebView implementation in the draft Android wrapper PR is not the selected production architecture. Do not merge a second Android application module alongside Capacitor.

## Android application identity

- **Application ID:** `com.jestbox.app` (canonical value in `capacitor.config.json`).
- The Android release-candidate workflow checks the source configuration before project generation and independently checks the final APK manifest after assembly.
- Keep this application ID stable after the first store release. Changing it later makes Android and app stores treat the application as a different app.
- Before the first store upload, confirm that the RuStore app card is created with exactly this application ID.

## Current build and signing state (28 November 2026)

**The former unprotected signing path has been retired.** PR [#105](https://github.com/ErTapanJatakia/JestBox/pull/105) removed the former `.github/workflows/hardened-apk-assurance.yml` workflow and its reusable `.github/workflows/mobsf-signed-apk.yml` caller, which accessed signing secrets without a protected GitHub Environment gate.

**A protected production-signing workflow is now implemented and has completed successfully.** PR [#107](https://github.com/ErTapanJatakia/JestBox/pull/107) introduced `.github/workflows/protected-production-signing.yml`; PRs [#109](https://github.com/ErTapanJatakia/JestBox/pull/109) and [#110](https://github.com/ErTapanJatakia/JestBox/pull/110) corrected its APK validator artifact selection.

- The workflow is manual-dispatch only and restricted to the protected `main` branch.
- The signing job uses the `production-signing` GitHub Environment. The maintainer-confirmed configuration includes a required reviewer checkpoint, a five-minute wait timer, and deployment branch restriction to `main`; administrator bypass is disabled. The configured reviewer is the maintainer's own account, so this is an auditable gate, not independent two-person approval. Environment settings were confirmed by the maintainer; the GitHub connection did not independently expose all Environment settings for API verification.
- Existing signing secrets are used by the gated workflow. No secret values are recorded in this document or exposed in logs.
- The ordinary Android release-candidate workflow remains **unsigned**. The Android debug workflow produces a debug-signed development APK; that debug certificate is not the production signing identity.
- Do not distribute, submit, or upload either the debug APK or unsigned release candidate as a production release.

### Successful protected signing evidence

- **Run:** [#46091336344](https://github.com/ErTapanJatakia/JestBox/actions/runs/46091336344), assessed main commit `46e8d265f7787d9a581d01749f9ad212b2244495`.
- **Result:** successful. The Environment gate was satisfied; no bypass was used.
- **APK:** package `com.jestbox.app`, version 1.1, versionCode 2.
- **APK SHA-256:** `1906704999261b8f0667f7dee07cffe146543fba05561bbf77ded839a8ef1504`.
- **Signature:** APK Signature Scheme v3 verified; RSA 4096-bit signing certificate.
- **Certificate SHA-256 fingerprint:** `bf24d400008bf790561b6a20e4724d95cbd312e9dd6a07a38d8872fb83dcc61f`.
- **Artifacts:** [production-signed APK and verification evidence](https://github.com/ErTapanJatakia/JestBox/actions/runs/46091336344/artifacts/15241112583) · [MobSF report and evidence](https://github.com/ErTapanJatakia/JestBox/actions/runs/46091336344/artifacts/15241373543).
- All 14 substantive job steps passed, including regression tests, unsigned build, protected keystore decryption, signing, APK validators, MobSF scan, artifact upload, container shutdown and temporary signing-material cleanup.

### MobSF static-analysis disposition

The machine-readable MobSF report recorded 0 High, 3 Warning and 1 Informational findings; manifest analysis recorded 0/0/0; no network-security findings; no hardcoded secrets detected by the report; and 0 trackers of 432.

The three Warning observations were traced to the locked Capacitor Android 8.6.2 and Share 8.0.3 source. The WebView file chooser/media-capture and URI resolver APIs are framework capabilities; JestBox has no file input, capture control, getUserMedia flow or file upload/download feature, and its manifest declares no broad storage, camera or microphone permission. The Share plugin's flagged `_share_nonce` is an identifier; the plugin generates a fresh random nonce per share, while JestBox passes only text/title/dialogTitle and no files. AppUUID is a randomly generated, SHA-256-derived app-instance identifier stored under a fixed private SharedPreferences key, not a credential. Capacitor Logger defaults to debug-only logging; the app does not override loggingBehavior and the production APK is non-debuggable. No app-owned secret or sensitive logging path was established. These remain contextual static-analysis observations, not proof that every framework path is safe at runtime. Reassess before adding file/media handling or sensitive-data features.

MobSF was run as static APK analysis; malware reputation lookups were disabled. This is not dynamic analysis, rooted-device assessment, or a human-led penetration test.

## Legacy signing bootstrap retirement

The former `.github/workflows/android-signing-bootstrap.yml` bootstrap had previously been removed. It was unsuitable for production key custody because it generated a new RSA-4096 JKS using repository-level secrets, exposed encrypted keystore ciphertext in a workflow summary, lacked a protected reviewer gate, and relied on temporary artifact retention.

Do not recreate that bootstrap or generate a replacement signing identity. Preserve the existing production signing identity. Do not delete or migrate existing signing secrets until independent recovery custody is verified and a controlled migration plan is explicitly approved.

Do not paste passwords, private keys, ciphertext, or recovery material into chat, issues, pull requests, source files, or logs. No signing key was generated, rotated, or changed by the successful protected signing work.

## Evidence retention and archive policy

GitHub Actions artifacts are temporary evidence. The protected signing workflow is configured to request **30 days**, matching the repository's current maximum artifact retention. The two artifacts linked above are temporary CI evidence, not a permanent archive.

A durable archive should preserve the exact approved signed APK, checksum, certificate fingerprint, source commit, version/build metadata, provenance, SBOM, MobSF report, release notes and approval record. A GitHub Release asset archive is a candidate approach, subject to confirming repository policy, access, retention expectations and recovery arrangements.

**No GitHub Release or other durable archive has been created.** Do not create or publish one without separate explicit maintainer approval. Describe evidence as retained only while the Release/archive remains available and retained; do not promise absolute or perpetual preservation.

## Release metadata

- Application ID: `com.jestbox.app`.
- npm project version: `1.0.0`.
- The generated Android version code/name are validated from the actual APK at build time. Increase versionCode for each subsequent store release and keep the application ID stable.

## Release and distribution boundary

The protected workflow can create and assess a signed APK, but a successful signing run does not itself authorise publication. Store submission, moderation, public distribution, GitHub Release creation and production deployment remain separate actions requiring explicit approval. No store submission, publication or production deployment occurred as part of the 28 November signing verification.


### Latest protected production assessment — 28 November 2026

- **Run:** [#46115617387](https://github.com/ErTapanJatakia/JestBox/actions/runs/46115617387), source commit `e16b46728130524922f1ad549175f266995fa536`.
- **APK and verification evidence:** [artifact 15252136163](https://github.com/ErTapanJatakia/JestBox/actions/runs/46115617387/artifacts/15252136163).
- **MobSF report/evidence:** [artifact 15252220554](https://github.com/ErTapanJatakia/JestBox/actions/runs/46115617387/artifacts/15252220554).
- **Result:** successful protected signing and static assessment; 15/15 job steps passed.
- **APK SHA-256:** `1906704999261b8f0667f7dee07cffe146543fba05561bbf77ded839a8ef1504`.
- **SBOM SHA-256:** `9c754bf68b8aee2d7895377da0ac26a60543935d44f8c7f8f27fd730c645ef07`.
- **MobSF:** 85/100; 0 High, 3 Warning, 1 Informational. The raw report was complete; a workflow-summary path mismatch was identified and is being corrected with schema validation and regression tests.
- **Retention:** both workflow artifact uploads are being aligned to the repository's 30-day maximum.

No release, publication, distribution, store submission or signing-key change occurred.


### Latest protected production signing verification — 28 November 2026

This entry supersedes the preceding 28 November protected-run snapshot as the latest recorded evidence. It records the post-merge protected verification; it does not authorise release or distribution.

- **Successful run:** [#46120099306](https://github.com/ErTapanJatakia/JestBox/actions/runs/46120099306).
- **Workflow outcome:** 15/15 reported substantive steps passed; zero failed steps. Protected signing, APK signature/alignment verification, SBOM binding, MobSF assessment, evidence upload and temporary signing-material cleanup completed successfully.
- **APK:** `com.jestbox.app`, version `1.1`, versionCode `2`; minSdk `29`, targetSdk `36`; non-debuggable.
- **APK SHA-256:** `1906704999261b8f0667f7dee07cffe146543fba05561bbf77ded839a8ef1504`. Independently recomputed from the artifact and matched the MobSF report and SBOM binding; identical to the prior verified signed APK.
- **Signing:** RSA 4096-bit certificate; APK Signature Scheme v3 verified. Certificate SHA-256 fingerprint: `bf24d400008bf790561b6a20e4724d95cbd312e9dd6a07a38d8872fb83dcc61f`. Existing production signing identity unchanged; no key generation or rotation.
- **MobSF v4.6.9:** 85/100; 0 High, 3 Warning, 1 Informational. Manifest analysis 0/0/0; no network-security findings. Existing contextual Capacitor finding triage remains applicable.
- **CycloneDX SBOM:** version 1.6; 72 components; 285 relationships; SHA-256 `074360c62c6dbf76b85fb6c12459aed39c900d65366d384e4a639e254e9f933b`. Binding identifies the exact APK hash, source commit, package and version. Four components lack declared licence metadata; none was inferred. Scope is Gradle `:app releaseRuntimeClasspath`; Android platform APIs, build plugins and host-runner packages are outside this runtime SBOM scope.
- **Artifacts:** [signed APK and signing evidence, artifact 15253327915](https://github.com/ErTapanJatakia/JestBox/actions/runs/46120099306/artifacts/15253327915) · [MobSF report and signed APK evidence, artifact 15253651404](https://github.com/ErTapanJatakia/JestBox/actions/runs/46120099306/artifacts/15253651404). Both have 30-day retention, with expected expiry **28 December 2026**.
- **Limitations:** static APK analysis and protected signing verification only; not dynamic/runtime testing, a human-led penetration test, independent audit, certification or a guarantee of security. No GitHub Release, app-store submission, publication, public distribution or production website deployment occurred.

The identical APK digest across the two protected runs supports binary reproducibility for this artifact. It does not establish identical runtime behaviour on every device. Durable archival remains a separate approval decision.
