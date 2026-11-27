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

**The unprotected production-signing workflows have been removed from `main` by PR #105.** The former `.github/workflows/hardened-apk-assurance.yml` workflow and its reusable `.github/workflows/mobsf-signed-apk.yml` caller are no longer present on `main`. The hardened workflow had directly accessed repository-level signing secrets without a protected GitHub Environment gate.

- The release-candidate workflow builds and validates an **unsigned release candidate only**. It does not sign APKs or produce a distributable release.
- The Android debug workflow produces a debug-signed development APK; that debug certificate is not the production signing identity.
- Do not distribute, submit, or upload either the debug APK or unsigned release candidate as a production release.
- PR #105 removed workflow files and corrected this documentation. It did not access, print, rotate, regenerate, or delete signing credentials or keys.
- The previously assessed signed APK and its certificate fingerprint are historical security-assessment evidence only. They do not establish that a production signing pipeline is currently enabled.

**Production signing remains unavailable and must stay disabled** until a separately protected signing design is implemented and verified. Removal of the unsafe workflows is a containment measure, not evidence that a replacement signing architecture is ready.

No production signing credentials, private keys, or encrypted backups were generated, changed, rotated, or deleted as part of PR #105. No production release, store submission, or publication was performed.

## Legacy signing bootstrap and workflow retirement

The former `.github/workflows/android-signing-bootstrap.yml` bootstrap had previously been removed. PR #105 removed the separate `.github/workflows/hardened-apk-assurance.yml` signing workflow and its reusable `.github/workflows/mobsf-signed-apk.yml` caller.

The former bootstrap was unsuitable for production key custody:

- It generated a new RSA-4096 JKS using repository-level secrets rather than a verified, reviewer-protected GitHub Environment.
- It placed base64-encoded encrypted keystore ciphertext in the workflow summary as well as uploading an encrypted backup artifact. Ciphertext is still sensitive recovery material and should not be exposed in broadly visible run summaries.
- It did not create or verify an Environment, configure required reviewers, or wire a trusted signing job to the release candidate workflow.
- Its 90-day artifact retention was not a durable recovery strategy.

**Do not recreate or replace the retired bootstrap with another key-generation workflow until the target controls and recovery custody are verified.** No key-generation workflow has been run as part of this remediation. Do not generate a replacement signing identity; preserve the existing identity and verify independent recovery custody before any future credential migration.

Do not paste passwords, private keys, ciphertext, or recovery material into chat, issues, pull requests, source files, or logs. Do not delete existing signing secrets until recovery custody is independently verified and a controlled migration plan is approved.

## Required target architecture before production signing

A future signing implementation must be a separate, narrowly scoped workflow and must satisfy all of the following before it is enabled:

1. A dedicated GitHub Environment (for example, `production-signing`) with required human reviewer approval, configured and independently verified in repository settings.
2. Signing credentials scoped to that environment, not available to pull-request builds or ordinary source-validation jobs.
3. A trusted immutable source commit from the protected `main` branch; no arbitrary PR head, fork, tag override, or user-supplied source ref may access signing credentials.
4. Verified branch protection or repository rules that prevent unreviewed changes to signing workflows and release-critical build scripts.
5. Least-privilege workflow permissions, pinned third-party actions, and checkout with persisted credentials disabled where appropriate.
6. Fail-closed verification of application ID, version, merged manifest, APK checksum, alignment, and release flags before signing.
7. An isolated signing job that receives only the validated candidate and required environment-scoped secrets.
8. Post-sign verification of APK signature schemes, signer certificate SHA-256 fingerprint, and exact APK checksum.
9. A durable evidence package containing the signed APK, checksum, certificate fingerprint, source commit, build metadata/provenance, SBOM, and corresponding MobSF report.
10. A separate explicit approval before any store upload, moderation submission, publication, or distribution.

Do not assume that a GitHub Environment, required reviewers, or branch protection exist until the settings have been inspected and verified. A workflow-level `environment:` declaration alone does not configure protection rules.

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
