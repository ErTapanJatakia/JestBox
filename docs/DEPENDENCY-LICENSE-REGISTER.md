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

| Action | Pinned commit | Version/tag | Licence at pinned commit |
|---|---|---|---|
| actions/checkout | `3d3c42e5aac5ba805825da76410c181273ba90b1` | v7.0.1 | MIT |
| actions/dependency-review-action | `2031cfc080254a8a887f58cffee85186f0e49e48` | v4 | MIT |
| actions/deploy-pages | `368f82528645a54fb793d4d04e342629a3f51346` | v5.0.1 | MIT |
| actions/setup-dotnet | `0f4a354dd5547a28c70b7853dbd95d5b67886e73` | v6.1.0 | MIT |
| actions/setup-go | `d35c59abb061a4a6fb18e82ac0862c26744d6ab5` | v5.5.0 | MIT |
| actions/setup-java | `c5195efecf7bdfc987ee8bae7a71cb8b11521c00` | v4.7.1 | MIT |
| actions/setup-node | `49933ea5288caeca8642d1e84afbd3f7d6820020` | v4.4.0 | MIT |
| actions/setup-python | `6d4fd22b20465ccc0f7354476588e8df7c9ca0e0` | v7.1.0 | MIT |
| actions/upload-artifact | `cf430e030ddbb5b0abf93d22962f4752f3646cd9` | v7.0.2 | MIT |
| actions/upload-pages-artifact | `56afc609e74202658d3ffba0e8f6dda462b719fa` | v3 | MIT |
| github/codeql-action | `24c54180a607b1449ed407dd24f251e4e9147c8d` | v4.38.3 | MIT |

The SBOM catalogue did not populate Action licences. To close that gap, each repository's `LICENSE` file was fetched at the exact immutable commit referenced by the workflow; all 11 listed Action revisions declare MIT. The SHA pins and adjacent version comments were cross-checked against the branch's workflow YAML. This is a licence-file check for the pinned Action repositories, not a complete audit of their nested runtime dependencies.

The workflow files also invoke these scanner containers:

| Container image | Workflow reference | Pinning observation | Licence review |
|---|---|---|---|
| `anchore/syft:v1.54.0` | `.github/workflows/sbom.yml` | Version tag; no digest in workflow | Apache-2.0 at upstream `v1.54.0` tag |
| `ghcr.io/google/osv-scanner:v2.7.1` | `.github/workflows/osv-scanner.yml` | Version tag; no digest in workflow | Apache-2.0 at upstream `v2.7.1` source tag |
| `ghcr.io/ossf/scorecard:v5.5.0` | `.github/workflows/scorecard.yml` | Version tag; no digest in workflow | Apache-2.0 at upstream `v5.5.0` source tag |
| `aquasec/trivy:0.76.2` | `.github/workflows/trivy.yml` | Version tag; no digest in workflow | Upstream licence verification remains open |
| `zricethezav/gitleaks:v8.24.3` | `.github/workflows/gitleaks.yml` | Version tag; no digest in workflow | Upstream licence verification remains open |
| `ghcr.io/zaproxy/zaproxy@sha256:9624669db72f54d86c4b46a7064518bd9bf79d8c61a4c31befa9923489f328af` | `.github/workflows/zap-pt.yml` | Digest-pinned | Upstream image/source licence verification remains open |
| `ghcr.io/zizmorcore/zizmor:1.32.0` | `.github/workflows/zizmor.yml` | Version tag; no digest in workflow | Upstream licence verification remains open |
| `opensecurity/mobile-security-framework-mobsf@sha256:815bb96de3c78a22e0a0996c667c164a227239c9d8a4aba80f188d247b928954` | `.github/workflows/mobsf-android-dynamic.yml`, `.github/workflows/protected-production-signing.yml` | Digest-pinned (MobSF v4.6.9 comment on dynamic workflow) | Upstream image/source licence verification remains open |
| `opensecurity/mobile-security-framework-mobsf:latest` | `.github/workflows/mobsf-android.yml` | Mutable `:latest` tag; not digest-pinned | Upstream licence verification remains open; mutable tag is a reproducibility/supply-chain follow-up |

The workflow inventory is not an exhaustive SBOM of the container images or their operating-system packages. In particular, the MobSF static-analysis workflow currently uses a mutable `:latest` tag; record this as a reproducibility risk for a separate workflow-hardening change, not as a licence incompatibility. Do not change workflow references as part of this documentation-only update.

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
| 2026-11-28 | Added evidence-backed PR source-tree SBOM inventory (95 CycloneDX components, 74 SPDX packages, 11 detected GitHub Action identities), verified all 11 immutable Action revisions as MIT from their pinned LICENSE files, inventoried scanner images and recorded remaining licence/pinning gaps, and recorded the maintainer's independent voluntary WCAG self-audit without requiring an audit artefact. Accessibility Statement text explicitly remains out of scope and unchanged. |
