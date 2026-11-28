# JestBox Build and Test Instructions

## Scope

These instructions describe the repository's current web/Capacitor Android build and automated validation. They are not a claim that every supported Android device has been manually tested.

## Prerequisites

- Git
- Node.js 22.x
- npm compatible with the repository lockfile
- Java and Android SDK components required by the Android workflow
- Docker only for workflows that explicitly run scanner or SBOM containers

Use the versions pinned or selected by the workflow as the authoritative CI environment. Do not update toolchains casually during unrelated changes.

## Install dependencies

```sh
npm ci
```

If the repository state does not contain an npm lockfile, do not substitute an unpinned `npm install` and claim reproducibility; first inspect the current package manifests and CI configuration.

## Fast local validation

```sh
node --check script.js
node --check jokes.js
node --check share-bridge.entry.js
node --test
```

Run additional repository-specific checks when modifying their inputs, including joke-content audits and Android configuration validators.

## Android build

The canonical Android build is generated through the locked Capacitor toolchain. CI prepares the local web assets, generates/synchronizes the Android platform project, applies the JestBox launcher artwork and MobSF-driven hardening, then assembles and validates the APK.

Prefer the repository's GitHub Actions workflows for reproducible Android validation. The debug APK is for development/testing. The release-candidate workflow produces an unsigned APK. Production signing is a separate manual workflow gated by the `production-signing` Environment.

Do not distribute a debug or unsigned APK as a production release.

## CI workflows

The workflow files under `.github/workflows/` are authoritative for triggers, permissions, tool versions, and job steps. Current checks include application regression/syntax validation, Android debug and release-candidate builds, dependency review, SBOM generation, Scorecard, secret scanning, SAST, container/dependency scanning, workflow security linting, OWASP ZAP, MobSF, and tablet responsive validation.

Some workflows are scheduled or manual-only. A workflow existing in the repository does not prove it has run successfully for a particular commit.

## Evidence and failure handling

- Record the exact commit, run URL, workflow/job, result, and artifact identifier for material assurance evidence.
- Distinguish skipped steps from failed steps.
- Inspect failures before changing code or configuration.
- After the same test/CI strategy fails three consecutive times, stop repeating it and redesign or defer the approach.
- Never weaken or delete tests merely to make a pipeline pass.
- Do not manually trigger destructive cleanup workflows as a test.

## Release boundary

A successful build or signing run does not authorize store submission, publication, deployment, or release archival. Each requires separate explicit maintainer approval.
