# JestBox Release Policy

## Release channels

JestBox distinguishes:
- local development and debug builds;
- unsigned release candidates;
- production-signed APKs;
- store submission/moderation;
- public distribution and post-release support.

These are separate stages and must not be conflated.

## Build and signing

The Android debug workflow creates a development APK. The release-candidate workflow creates an unsigned candidate. Production signing is performed only by the manual-dispatch, main-branch-only protected signing workflow using the `production-signing` GitHub Environment.

The signing workflow verifies the package identity, APK configuration, manifest, signature, alignment, checksum, and MobSF assessment. Signing evidence is specific to the exact source commit and binary.

## Approval gates

A successful build, scan, or signature verification does not authorize:
- uploading to RuStore or another store;
- moderation submission;
- publication or public distribution;
- production deployment;
- creation of a GitHub Release or durable archive.

Each action requires separate explicit maintainer approval.

## Signing identity

Preserve the established production signing identity. Do not generate, rotate, replace, export, or delete signing material without an approved key-custody and recovery plan. Never expose secret values or encrypted recovery material in source, issues, pull requests, or logs.

## Release evidence

A release record should identify version, versionCode, source commit, build run, APK SHA-256, signing-certificate fingerprint, validation results, SBOM where available, security assessment, release notes, and approval.

GitHub Actions artifacts are temporary. The currently observed repository retention cap is 30 days; do not describe transient artifacts as permanent evidence.

## Rollback and incident response

If a release defect or security issue is identified, preserve the relevant artifact and logs, assess affected versions, coordinate disclosure, and determine whether distribution should be paused or a corrected build issued. Do not overwrite historical evidence.
