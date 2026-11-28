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

## Source-tree SBOM and workflow inventory — 2026-11-28

The PR-triggered Syft workflow completed successfully for PR #113 at head `05b52e0455a1193b936d0e5778c1e4e04a7fa99f` (workflow run [46109119934](https://github.com/ErTapanJatakia/JestBox/actions/runs/46109119934)). The workflow generated CycloneDX JSON and SPDX JSON source-tree inventories. Its summary records the checked-out merge-ref commit `88413d0662ade96440485087c4ffb311338f44c9`; the PR run metadata identifies the source head above.

| SBOM observation | Result | Interpretation |
|---|---:|---|
| CycloneDX components | 95 | 73 library components and 22 file components |
| SPDX packages | 74 | Source-tree package inventory |
| Distinct package/action identities in CycloneDX | 41 | Includes npm packages, GitHub Actions and project/tooling entries |
| GitHub Action identities detected | 11 | Action tags/versions are catalogued below; licence verification remains separate |
| Production APK components | Not covered | Workflow explicitly inventories the checked-out source tree, not the signed production APK |

The source SBOM detected these GitHub Action identities and versions:

| Action | SBOM version/tag |
|---|---|
| actions/checkout | v7.0.1 |
| actions/dependency-review-action | v4 |
| actions/deploy-pages | v5.0.1 |
| actions/setup-dotnet | v6.1.0 |
| actions/setup-go | v5.5.0 |
| actions/setup-java | v4.7.1 |
| actions/setup-node | v4.4.0 |
| actions/setup-python | v7.1.0 |
| actions/upload-artifact | v7.0.2 |
| actions/upload-pages-artifact | v3 |
| github/codeql-action/upload-sarif | v4.38.3 |

Syft's GitHub Actions cataloguer did not populate licence declarations for these Action components in the generated CycloneDX file. The observed SBOM tags are inventory identifiers, not a substitute for checking the exact immutable workflow references and each upstream repository's licence. Review the pinned commit, source repository, licence file, maintenance status and permissions for each Action before marking its licence verified.

The source SBOM also detected the root npm packages `@capacitor/core@8.6.2` (MIT) and `@capacitor/share@8.0.3` (MIT), tablet-tooling packages `playwright@1.56.1` and `playwright-core@1.56.1` (Apache-2.0), and `tslib@2.9.1` (0BSD). It did not populate a licence for `fsevents@2.3.2`; the lockfile and upstream manifest review recorded above remain the source for that finding. The SBOM also contains project root package entries without a declared licence; these are project identifiers, not third-party licence findings.

The SBOM workflow invokes `anchore/syft:v1.54.0` as its scanner container. That container image and other scanner images/toolchains are not themselves fully inventoried by a source-tree SBOM. Container image digests, provenance, upstream licences and tool versions therefore remain a separate review item.

The signed production APK and MobSF report from release workflow run [46091336344](https://github.com/ErTapanJatakia/JestBox/actions/runs/46091336344) are separate artifacts. The source-tree SBOM must not be represented as an APK SBOM. Android/Gradle transitive dependencies and packaged native components still require a release-build/SBOM review.

## Asset provenance and accessibility audit note — 2026-11-28

The repository asset tree contains two distinct assets, with provenance clarified by the maintainer on 2026-11-28:

- `assets/JestBox-Original.png` — original JestBox logo created by the project team. Record as original project artwork; this attribution does not change the proprietary rights position.
- `assets/wcag22aa-blue.svg` — locally stored WCAG 2.2 Level AA blue conformance logo supplied by W3C/WAI for use by content providers making the corresponding conformance claim. Treat as W3C/WAI-provided material, not as JestBox-owned artwork. W3C/WAI's official [WCAG conformance-logo guidance](https://www.w3.org/WAI/standards-guidelines/wcag/conformance-logos/) describes use of the level logo, corresponding conformance link and alternative text, and makes clear that the logo is not a W3C/WAI review or certification. See also [WAI material-use guidance](https://www.w3.org/WAI/about/using-wai-material/) for attribution and no-modification requirements.

The maintainer confirms that an independent WCAG audit was personally performed and that the application's conformance position is a voluntary, self-assessed claim. W3C/WAI certification or independent W3C review is not represented or required. This register does not require a separate audit artefact as a precondition for recording the maintainer's audit statement. The Accessibility Statement is outside the scope of this dependency/licence register work: do not edit, rewrite, or otherwise change any of its text. Do not describe the logo or the audit as W3C-certified or W3C-verified.

## Current automation evidence

JestBox has Dependabot configuration for npm and GitHub Actions, Dependency Review on pull requests, OSV Scanner, Trivy, Syft SBOM generation, OpenSSF Scorecard, Gitleaks and workflow-security scanners. Their presence does not mean every ecosystem or historical version is covered. The PR #113 source-tree SBOM and 14 successful PR workflow runs are evidence of this run's source inventory and checks only; they do not establish a complete Android release SBOM or complete licence verification of every external Action/container.

## Required fields

For each direct dependency record name/ecosystem, exact version or immutable revision, direct/transitive classification, license identifier and evidence, source repository, purpose, last-reviewed date, known advisory status and disposition.

## Update process

Refresh after dependency updates and at least quarterly. Confirm exact Action references and container image versions from workflow files. Do not mark a license verified from a package name alone. Escalate unknown, proprietary, dual or incompatible license terms for maintainer review.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Enumerated both committed npm lockfiles (126 root entries and 3 tablet-tooling entries), reconciled existing licence inventories/notices, and recorded maintainer-confirmed provenance for the original JestBox logo and W3C/WAI WCAG 2.2 AA conformance logo. |
| 2026-11-28 | Added evidence-backed PR source-tree SBOM inventory (95 CycloneDX components, 74 SPDX packages, 11 detected GitHub Action identities), documented scope limitations, and recorded the maintainer's independent voluntary WCAG self-audit without requiring an audit artefact. Accessibility Statement text explicitly remains out of scope and unchanged. |
