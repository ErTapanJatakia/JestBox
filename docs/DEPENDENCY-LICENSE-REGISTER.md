# JestBox Dependency and License Register

Snapshot date: 2026-11-28  
Scope: npm runtime/build dependencies, Capacitor plugins, Android/Gradle components, GitHub Actions, scanner containers and toolchain dependencies visible in the repository.

## Register maintenance

This file is a register framework, not a substitute for current package metadata. Exact package versions and licenses must be derived from lockfiles and authoritative license files at the resolved dependency revision. Do not copy version/license values from another repository.

## Dependency categories

| Category | Source of truth | Review requirement |
|---|---|---|
| npm runtime/build packages | package.json, lockfile and npm metadata | Version, license, advisory, transitive dependency and maintenance |
| Capacitor plugins | npm lockfile and plugin source | Native permissions, bridge surface, maintenance and license |
| Android/Gradle components | Generated project/toolchain and workflow configuration | SDK/Gradle version, transitive dependencies and license |
| GitHub Actions | .github/workflows/*.yml uses declarations | Immutable pin, upstream maintenance, license and permissions |
| Scanner containers | Workflow image references | Version/digest, provenance and scanner scope |
| Test/QA tooling | Package files and workflow setup steps | Version, license and production/runtime impact |

## Lockfile and asset audit — 2026-11-28

The committed npm lockfiles were enumerated at the reviewed branch head. The package-level licence identifiers below are the declarations recorded in those lockfiles; they are not independent legal verification of every upstream archive.

| Dependency scope | Lockfile entries (excluding project root) | Declared licence summary | Evidence |
|---|---:|---|---|
| Root application/build toolchain | 126 | MIT 99; ISC 10; BlueOak-1.0.0 12; Unlicense 2; Apache-2.0 2; 0BSD 1 | [Full lockfile-derived inventory](../THIRD_PARTY_LICENSES.md) |
| Isolated tablet validation tooling | 3 | Apache-2.0 2; fsevents 1 with no licence field in lockfile (upstream v2.3.2 manifest declares MIT) | [Full lockfile-derived inventory](../THIRD_PARTY_LICENSES.md) |

The full inventory includes transitive and optional entries. A lockfile entry does not establish that a component is included in an Android or web release. The five tracked Trivy licence findings and their attribution records are documented in [THIRD-PARTY-NOTICES.md](../THIRD-PARTY-NOTICES.md); the in-app notice page is [THIRD_PARTY_NOTICES.html](../THIRD_PARTY_NOTICES.html). These files have distinct purposes and should be maintained rather than replaced with a duplicate NOTICE file.

The repository asset tree contains two distinct assets, with provenance clarified by the maintainer on 2026-11-28:

- `assets/JestBox-Original.png` — original JestBox logo created by the project team. Record as original project artwork; this attribution does not change the proprietary rights position.
- `assets/wcag22aa-blue.svg` — locally stored WCAG 2.2 Level AA blue conformance logo supplied by W3C/WAI for use by content providers making the corresponding conformance claim. Treat as W3C/WAI-provided material, not as JestBox-owned artwork. W3C/WAI's official [WCAG conformance-logo guidance](https://www.w3.org/WAI/standards-guidelines/wcag/conformance-logos/) permits use of the appropriate level logo and local copies, specifies the corresponding conformance link and alternative text, and places responsibility for accuracy of the claim on the content provider. W3C explicitly states that the logo is not a W3C/WAI review or validation. The logo should not be altered, and its use must be limited to pages within the accurately evaluated conformance scope. See also [WAI material-use guidance](https://www.w3.org/WAI/about/using-wai-material/) for attribution and no-modification requirements.

The repository provenance item is now clarified by maintainer statement. A separate conformance-evidence check remains: confirm that the exact page(s) displaying this logo have been evaluated against all applicable WCAG 2.2 Level A and AA success criteria, that the page links to the official Level AA explanation, and that the visible claim states its scope. Automated checks alone are insufficient. Do not describe the logo as W3C-certified or W3C-verified.

The repository does not commit a generated Android Gradle project or wrapper in this tree. Android SDK/Gradle transitive components therefore require a release-build/SBOM artefact review rather than inference from the npm lockfiles. GitHub Actions and scanner container licence inventories also remain separate follow-up scope; successful scanners do not constitute a complete licence audit of those tools.

## Current automation evidence

JestBox has Dependabot configuration for npm and GitHub Actions, Dependency Review on pull requests, OSV Scanner, Trivy, Syft SBOM generation, OpenSSF Scorecard, Gitleaks and workflow-security scanners. Their presence does not mean every ecosystem or historical version is covered.

## Required fields

For each direct dependency record name/ecosystem, exact version or immutable revision, direct/transitive classification, license identifier and evidence, source repository, purpose, last-reviewed date, known advisory status and disposition.

## Update process

Refresh after dependency updates and at least quarterly. Confirm exact Action references and container image versions from workflow files. Do not mark a license verified from a package name alone. Escalate unknown, proprietary, dual or incompatible license terms for maintainer review.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Enumerated both committed npm lockfiles (126 root entries and 3 tablet-tooling entries), reconciled existing licence inventories/notices, and recorded maintainer-confirmed provenance for the original JestBox logo and W3C/WAI WCAG 2.2 AA conformance logo. Asset conformance-claim scope and non-npm toolchain review remain follow-ups. |
