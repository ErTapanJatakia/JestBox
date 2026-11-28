# JestBox External Interface Currency Review

**Review date:** 2026-11-28  
**Review type:** Initial interface inventory and review procedure  
**Status:** Inventory documented; comprehensive deprecation scan not yet attested.

## Scope

JestBox uses a web application packaged for Android through Capacitor. This review covers maintained application interfaces, package/toolchain dependencies, Android SDK/Gradle integration, GitHub Actions and scanner interfaces. It does not cover the internal implementation or service-level availability of external providers.

## Current interface inventory

| Interface | Current known version or mechanism | Review focus |
|---|---|---|
| Node.js | CI selects Node.js 22 | Runtime support lifecycle and compatibility |
| npm | Lockfile-driven `npm ci` | Registry transport, lockfile integrity and package lifecycle |
| Capacitor core / CLI / Android | 8.6.2 | Supported APIs, plugin compatibility and Android bridge exposure |
| Capacitor Share plugin | 8.0.3 | Data passed to native share sheet and platform behaviour |
| esbuild | 0.28.2 | Build tool updates, advisories and supply-chain integrity |
| Java | Temurin 21 in Android CI | Supported LTS runtime and Gradle compatibility |
| Android SDK | Platform 36 / Build Tools 36.0.0 in Android CI | Platform support, target SDK and packaging behaviour |
| GitHub Actions | Third-party actions pinned to full commit SHAs in maintained workflows | Runtime deprecations, permissions, action provenance and updates |
| Scanner containers | Workflow-pinned image versions/digests | Tool support, image provenance and vulnerability updates |
| GitHub APIs and artifact storage | Repository, Actions, Environment and artifact interfaces | API deprecation, permissions, retention and evidence traceability |

Version values above describe the reviewed repository configuration, not a recommendation to keep those versions indefinitely. The lockfile and workflow files are authoritative.

## Review procedure

For every material dependency or external-interface update:
1. Identify the interface, version, purpose, data exchanged and trust boundary.
2. Check official release notes and support lifecycle for deprecation or end-of-life notices.
3. Review security advisories, breaking changes, licence and provenance.
4. Confirm that authentication, TLS verification, redirects and permissions remain appropriately restricted.
5. Update compatibility tests and documentation where behaviour changes.
6. Record the exact commit, tool version, source URL, CI run and disposition.

For GitHub Actions, inspect both the action source at the pinned commit and the workflow's permissions/secret exposure. For scanner containers, use a reviewed version or immutable digest and record the scanner version in the resulting evidence. For native plugins, review manifest permissions, exported components and WebView/native bridge behaviour.

## Current evidence boundary

The existence of a version pin does not prove that the version is still supported or vulnerability-free. A passing workflow validates only the paths exercised by that run. This document does not claim that every dependency or API has undergone a comprehensive deprecation audit, nor does it claim that all third-party services remain current.

## Reassessment triggers

Review at least annually and whenever Node.js, npm, Capacitor, Android SDK/Gradle, native plugins, GitHub Actions runtimes, scanner containers, network interfaces or release tooling changes materially.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial JestBox-specific interface inventory and review procedure. |
