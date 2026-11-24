# JestBox Android release signing

## Selected Android architecture

JestBox uses the Capacitor Android project generated from the canonical web application. The locked Capacitor 8 toolchain, `@capacitor/share` integration, offline web asset preparation, and Android branding script are the release build inputs.

The standalone native WebView implementation in the draft Android wrapper PR is not the selected production architecture. Do not merge a second Android application module alongside Capacitor.

## Android application identity

- **Application ID:** `com.jestbox.app` (canonical value in `capacitor.config.json`).
- The Android release-candidate workflow checks the source configuration before project generation and independently checks the final APK manifest after assembly.
- Keep this application ID stable after the first store release. Changing it later makes Android and app stores treat the application as a different app.
- Before the first store upload, confirm that the RuStore app card is created with exactly this application ID.

## Current build and signing state (24 November 2026)

**Production signing is intentionally disabled in source-controlled build workflows.** PR [#103](https://github.com/ErTapanJatakia/JestBox/pull/103) removed signing operations and production keystore-secret references from `.github/workflows/android-release-candidate.yml`. The workflow now builds and validates an **unsigned release candidate only**.

- The release-candidate workflow does not sign APKs and does not produce a distributable release.
- The Android debug workflow produces a debug-signed development APK; that debug certificate is not the production signing identity.
- Do not distribute, submit, or upload either the debug APK or unsigned release candidate as a production release.
- No signing credentials were generated, rotated, or changed by PR #103. No release, store submission, or production publication was performed.
- The previously assessed signed APK and its certificate fingerprint are historical security-assessment evidence only. They do not establish that a production signing pipeline is currently enabled.

The current main-branch release-candidate workflow is deliberately unsigned until a separately protected signing design is implemented and verified.

## Signing bootstrap workflow — do not run yet

The repository currently contains `.github/workflows/android-signing-bootstrap.yml`, a manually dispatched workflow that can generate a new RSA-4096 JKS keystore and upload an encrypted backup artifact. It is **not** a production signing workflow, and it does not establish the required protected signing environment or reviewer gate.

**Do not dispatch this workflow at this stage.** Before any key-generation operation, the workflow and its recovery procedure must be reviewed and reconciled with the approved signing architecture. In particular:

- The current bootstrap expects three repository Actions secrets: `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_PASSWORD`, and `ANDROID_KEYSTORE_BACKUP_PASSWORD`.
- It uploads the encrypted keystore as a GitHub Actions artifact with a 90-day retention period. The workflow summary also contains base64-encoded encrypted ciphertext; ciphertext is still sensitive recovery material and must be handled accordingly.
- The workflow does not itself create a GitHub Environment, configure required reviewers, or establish environment-scoped secrets.
- Its generated key is not automatically wired into the current unsigned release-candidate workflow.
- Do not create, rotate, restore, or replace a signing identity merely to make a workflow green. First agree on the identity, recovery custody, and release controls.

Do not paste passwords, private keys, ciphertext, or recovery material into chat, issues, pull requests, source files, or logs.

## Required target architecture before production signing

A future signing implementation must be a separate, narrowly scoped workflow and must satisfy all of the following before it is enabled:

1. A dedicated GitHub Environment (for example, `production-signing`) with required human reviewer approval, configured and independently verified in repository settings.
2. Signing credentials scoped to that environment, not available to pull-request builds or ordinary source-validation jobs.
3. A trusted immutable source commit from the protected `main` branch; no arbitrary PR head, fork, tag override, or user-supplied source ref may access signing credentials.
4. Least-privilege workflow permissions, pinned third-party actions, and checkout with persisted credentials disabled where appropriate.
5. Fail-closed verification of application ID, version, merged manifest, APK checksum, alignment, and release flags before signing.
6. An isolated signing job that receives only the validated candidate and required environment-scoped secrets.
7. Post-sign verification of APK signature schemes, signer certificate SHA-256 fingerprint, and exact APK checksum.
8. A durable evidence package containing the signed APK, checksum, certificate fingerprint, source commit, build metadata/provenance, SBOM, and corresponding MobSF report.
9. A separate explicit approval before any store upload, moderation submission, publication, or distribution.

Do not assume that a GitHub Environment or required reviewers exist until the settings have been inspected and verified. A workflow-level `environment:` declaration alone does not configure protection rules.

## Evidence retention and archive policy

GitHub Actions artifacts are temporary evidence. The repository's current maximum artifact retention is 90 days; the transient debug APK artifact has a shorter three-day retention. Neither should be described as permanent.

A durable archive should be created only after an approved signed release exists. The proposed evidence set is:

- Production-signed APK (the exact binary assessed and approved for distribution).
- SHA-256 checksum and signing-certificate fingerprint.
- Source commit, versionCode/versionName, build run identifiers, and build provenance.
- SBOM for the exact release build.
- MobSF static report and assessment summary correlated to the same APK checksum.
- Release notes and approval record.

A GitHub Release asset archive is a candidate approach, subject to confirming repository policy, asset access, retention expectations, and recovery arrangements. No Release has been created by this work. Do not create or publish one without explicit maintainer approval. Describe evidence as retained only while the Release/archive remains available and retained; do not promise absolute or perpetual preservation.

## Release metadata

- Application ID: `com.jestbox.app`.
- npm project version: `1.0.0`.
- The generated Android version code/name are validated from the actual APK at build time. Increase versionCode for each subsequent store release and keep the application ID stable.

## Release and distribution boundary

The current release-candidate workflow builds and validates an unsigned APK only. It does not sign, upload to RuStore, submit moderation, publish, or modify a live application. Store submission and distribution are separate gated stages and require explicit approval. No production release or store submission is authorised by this document.
