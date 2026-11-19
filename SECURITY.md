# Security Policy

## Reporting
Report suspected vulnerabilities privately. Do not publish exploit details in public issues or pull requests.

- General Security and Privacy: cyber.litigation.advisor@gmail.com
- Russia: ertapanjatakia@yandex.com
- Other regions: tapan_ditu_17.20@outlook.com

Include the affected commit/version, impact, reproduction steps, and minimal evidence. Remove credentials, personal data, and unrelated sensitive information. Do not access or disrupt third-party systems or other users' data.

## Scope
This policy covers the JestBox source, all eight locale experiences (`en-US`, `es-PE`, `ru-RU`, `es-ES`, `en-IN`, `hi-IN`, `ur-IN`, and `ur-PK`), the Android wrapper and generated development APKs. Hosting providers, browsers, operating systems, app stores, and recipient share apps remain governed by their own security processes.

## Coordinated Disclosure
Allow the maintainer a reasonable opportunity to investigate and remediate before public disclosure. The maintainer will make reasonable efforts to acknowledge and assess reports, but no fixed response or remediation SLA is promised.

## Supported Versions
JestBox is under development and has no stable release support window yet. The current development branch is reviewed as part of ongoing work; old commits and unreleased snapshots have no separate support commitment.

## Automated Security Checks
The repository uses CodeQL, OSV-Scanner, Trivy, Microsoft DevSkim, Dependency Review, OpenSSF Scorecard, and MobSF static APK analysis. Their scope, reporting locations, limitations, and remediation process are documented in [Security Assessment Programme](#2-current-assessment-snapshot). Automated checks do not constitute a penetration test, independent audit, certification, or guarantee that the application is vulnerability-free.

## Safe Harbor
Good-faith research that follows this policy and applicable law is welcome. Avoid privacy violations, destructive testing, service disruption, and unauthorized access. Stop and report privately if sensitive data is encountered. This policy does not authorize otherwise unlawful activity.

---

## Security Assessment Programme

**Last updated:** 19 November 2026  
**Repository:** [ErTapanJatakia/JestBox](https://github.com/ErTapanJatakia/JestBox)  
**Main commit before this documentation consolidation:** `6e5368da55499ec86b69e3c919004a5e7e1dd21a`  
**Security-workflow baseline commit covered by the 19 November assessment snapshot:** `d4b6e13dfb5e0f56a078eb29ef8d36a85a95dba1`  
**Primary purpose:** maintain one auditable record of security workflows, automated testing, assessments, evidence, findings and remediation for JestBox.

> **Assessment Statement:** This document records automated defensive security checks and their evidence. A successful workflow means that the relevant automation completed; it does not mean that the application has zero vulnerabilities. These checks do not constitute a human-led penetration test, independent security audit, certification, or guarantee of security.

## 1. Scope and Boundaries

The programme covers:

- JestBox's JavaScript/TypeScript application and its eight supported locales.
- npm dependencies and dependency-change review.
- Repository source patterns, secrets exposure and filesystem configuration.
- GitHub Actions workflow security and software supply-chain posture.
- Software Bill of Materials (SBOM) generation.
- The generated Android **debug** APK, including static analysis.
- Local-build web dynamic application security testing (DAST) with OWASP ZAP.
- Android runtime/dynamic assessment using MobSF and an isolated Android API 30 emulator, when that workflow can complete.

The automated ZAP workflow scans a disposable local web build. It does not test the production hosting environment. MobSF static analysis is distinct from MobSF dynamic runtime analysis. MobSF Android dynamic analysis completed successfully in automatic Frida Gadget mode on an isolated Android API 30 emulator. The report and logs are available in [run #44545632539](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539) and [artifact 14540387667](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539/artifacts/14540387667). Root-dependent inspection and TLS tests were unavailable because MobSF could not remount the system partition writable; this limitation is recorded below.

Out of scope unless separately authorised: production signing, production credentials, app-store submission, production deployment, hosted production testing, and changes to application content or functionality made solely to silence a scanner.

## 2. Current Assessment Snapshot

The following is the historical main-branch baseline before PR #26, recorded on **19 November 2026** at commit `d4b6e13dfb5e0f56a078eb29ef8d36a85a95dba1`. The newer PR #26 validation batch is recorded immediately below.

| Assessment / Control | Latest recorded state | Evidence |
|---|---|---|
| Android debug build | Completed successfully | [Workflow run #44455530109](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530109) |
| MobSF Android APK static assessment | Completed successfully; report artifact available | [Run #44455530144](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530144) · [Download static report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530144/artifacts/14497274347) |
| OWASP ZAP web DAST | Completed successfully; report artifact available | [Run #44455530108](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530108) · [Download ZAP report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530108/artifacts/14497119307) |
| OSV-Scanner dependency assessment | Completed successfully; report artifact available | [Run #44455530086](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530086) · [Download OSV report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530086/artifacts/14496304666) |
| Trivy repository security scan | Completed successfully; report artifact available | [Run #44455530010](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530010) · [Download Trivy report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530010/artifacts/14497074164) |
| Gitleaks secret detection | Completed successfully; report artifact available | [Run #44455529973](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529973) · [Download Gitleaks report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529973/artifacts/14497726019) |
| Microsoft DevSkim source security lint | Completed successfully; report artifact available | [Run #44455530186](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530186) · [Download DevSkim report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530186/artifacts/14497338653) |
| OpenSSF Scorecard | Completed successfully; report artifact available | [Run #44455530032](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530032) · [Download Scorecard report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530032/artifacts/14497671544) |
| zizmor GitHub Actions security audit | Completed successfully; report artifact available | [Run #44455530035](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530035) · [Download zizmor report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530035/artifacts/14497024561) |
| Syft SBOM generation | Completed successfully; SBOM artifact available | [Run #44455530058](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530058) · [Download SBOM](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530058/artifacts/14497004351) |
| GitHub CodeQL | Completed successfully; findings surface is GitHub code scanning | [Run #44455529177](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529177) · [Security / code scanning](https://github.com/ErTapanJatakia/JestBox/security/code-scanning) |
| Dependency Review | Completed successfully on PR #22 validation | [Run #44454850848](https://github.com/ErTapanJatakia/JestBox/actions/runs/44454850848) |
| MobSF Android dynamic assessment | Not completed at this historical baseline; later completed in PR #26 using Frida Gadget mode | [Historical cancelled run #44457340221](https://github.com/ErTapanJatakia/JestBox/actions/runs/44457340221) · [Successful PR #26 run #44545632539](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539) |

**Important:** “Completed successfully” above records workflow execution status, not a clean scan or a finding-free result. Scanner output must be reviewed and findings validated before risk can be accepted or remediation declared complete. This document does not currently assert a total vulnerability count or a zero-findings outcome.

### PR #26 validation batch — 19 November 2026

These runs validate the dependency-lockfile and Android-assessment workflow changes on the PR branch. They are not production-host or signed-release assessments.

| Assessment | Result reviewed | Evidence |
|---|---|---|
| MobSF Android dynamic | Completed; auto mode selected Frida Gadget; dynamic report and runtime logs generated | [Run #44545632539](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539) · [Artifact 14540387667](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539/artifacts/14540387667) |
| MobSF release APK static | Completed against unsigned release APK; findings triaged below | [Run #44476246772](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246772) · [Artifact 14506926059](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246772/artifacts/14506926059) |
| OWASP ZAP baseline | Completed against local 127.0.0.1:8080 test server | [Run #44476246577](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246577) · [Artifact 14506163218](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246577/artifacts/14506163218) |
| OSV-Scanner | 0 SARIF findings in the reviewed report | [Run #44476246805](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246805) · [Artifact 14507045265](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246805/artifacts/14507045265) |
| Trivy | 3 informational license notices; no vulnerability findings in this SARIF report | [Run #44476246837](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246837) · [Artifact 14507035133](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246837/artifacts/14507035133) |
| Gitleaks | 0 SARIF findings | [Run #44476246759](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246759) · [Artifact 14506361683](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246759/artifacts/14506361683) |
| Microsoft DevSkim | 20 notes, 0 warnings/errors; contextual triage below | [Run #44476246743](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246743) · [Artifact 14506481555](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246743/artifacts/14506481555) |
| OpenSSF Scorecard | Score 6.4/10; improvement areas recorded below | [Run #44476246690](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246690) · [Artifact 14505894499](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246690/artifacts/14505894499) |
| zizmor | 0 SARIF findings | [Run #44476246822](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246822) · [Artifact 14506397421](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246822/artifacts/14506397421) |
| Syft source SBOM | 68 CycloneDX components; CycloneDX and SPDX reports generated | [Run #44476246868](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246868) · [Artifact 14506366585](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246868/artifacts/14506366585) |



## 3. Downloadable Report Index

The following links point to the actual GitHub Actions artifacts verified as present and unexpired when this document was updated.

| Tool / report | Artifact | Run | Direct download |
|---|---|---:|---|
| MobSF Android static | `jestbox-mobsf-static-report` (JSON + Markdown summary) | [#44455530144](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530144) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530144/artifacts/14497274347) |
| OWASP ZAP DAST | `jestbox-owasp-zap-pt-report` | [#44455530108](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530108) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530108/artifacts/14497119307) |
| OSV-Scanner | `jestbox-osv-scanner-report` | [#44455530086](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530086) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530086/artifacts/14496304666) |
| Trivy | `jestbox-trivy-report` | [#44455530010](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530010) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530010/artifacts/14497074164) |
| Gitleaks | `jestbox-gitleaks-report` | [#44455529973](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529973) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529973/artifacts/14497726019) |
| Microsoft DevSkim | `jestbox-devskim-report` | [#44455530186](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530186) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530186/artifacts/14497338653) |
| OpenSSF Scorecard | `jestbox-openssf-scorecard-report` (JSON) | [#44455530032](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530032) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530032/artifacts/14497671544) |
| zizmor | `jestbox-zizmor-report` | [#44455530035](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530035) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530035/artifacts/14497024561) |
| Syft SBOM | `jestbox-source-sbom` (CycloneDX / SPDX) | [#44455530058](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530058) | [Download](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530058/artifacts/14497004351) |

GitHub CodeQL findings are available in the repository's [Code Scanning alerts](https://github.com/ErTapanJatakia/JestBox/security/code-scanning), not as a downloadable artifact in the run above. Dependency Review results are available in the linked pull-request workflow check and run summary.

### Earlier ZAP Assessment Evidence

An earlier ZAP baseline execution scanned 13 URLs and recorded the following scanner summary: 59 PASS, 8 WARN, 0 FAIL-NEW and 0 FAIL-INPROG. Its report was generated against a disposable local test server. The warnings included missing or weak browser security headers and server/test-environment disclosures; they must not be assumed to describe the production hosting environment.

- [Earlier ZAP baseline run #44441957211](https://github.com/ErTapanJatakia/JestBox/actions/runs/44441957211)
- [Earlier ZAP active-scan run #44444489118 and report artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44444489118/artifacts/14492298494)

The active scan summary recorded 137 PASS, 6 WARN, 0 FAIL-NEW and 0 FAIL-INPROG. Its JSON report contained scanner alert categories, including two medium, six low and two informational categories. These are scanner classifications and require manual validation; they are not confirmed exploitable vulnerabilities or CVSS ratings. The active scan also ran against a disposable local build, not the production site.

## 4. Tooling and Workflow Register

| Tool / workflow | Purpose and coverage | Current reporting surface |
|---|---|---|
| GitHub CodeQL (default setup) | Static analysis for supported JavaScript/TypeScript and GitHub Actions code. | [Code scanning alerts](https://github.com/ErTapanJatakia/JestBox/security/code-scanning), [latest run](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529177) |
| OSV-Scanner | Detects known vulnerabilities in dependency inventories available to the workflow. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530086/artifacts/14496304666) |
| Trivy | Repository/filesystem security scanning, including supported dependency, secret and misconfiguration checks configured in the workflow. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530010/artifacts/14497074164) |
| Microsoft DevSkim | Static secure-coding pattern checks. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530186/artifacts/14497338653) |
| Gitleaks | Detects patterns resembling exposed credentials/secrets in scanned repository content and history scope configured by the workflow. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455529973/artifacts/14497726019) |
| Dependency Review | Reviews dependency changes introduced by pull requests; current workflow gates critical-severity dependency additions. | [PR #22 run](https://github.com/ErTapanJatakia/JestBox/actions/runs/44454850848) |
| OpenSSF Scorecard | Evaluates repository and software supply-chain security practices. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530032/artifacts/14497671544) |
| zizmor | Audits GitHub Actions workflow configuration for security issues. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530035/artifacts/14497024561) |
| Syft | Generates CycloneDX and SPDX software bill of materials for source/dependency inventory. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530058/artifacts/14497004351) |
| MobSF static | Analyses the generated Android debug APK and its manifest/components/permissions and other supported static indicators. | [Run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530144/artifacts/14497274347) |
| OWASP ZAP | Baseline and optionally manually dispatched active DAST against a locally served disposable web build. Active scan is manual-only and bounded. | [Latest run and artifact](https://github.com/ErTapanJatakia/JestBox/actions/runs/44455530108/artifacts/14497119307) |
| MobSF dynamic | Android runtime analysis on an isolated API 30 x86_64 emulator; automatic mode can use rooted preparation or Frida Gadget fallback. | [Successful run and report](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539/artifacts/14540387667) |

### 4.1 Automated OWASP ZAP DAST — detailed execution scope

The `JestBox OWASP ZAP penetration testing` workflow builds the app locally, serves the generated static web assets on the GitHub-hosted runner, and scans **only** `http://127.0.0.1:8080`.

- Pull requests targeting `main`, pushes to `main`, and the weekly schedule run ZAP Baseline (passive) scanning.
- A manually dispatched run can opt into a bounded ZAP Full Scan (active) against the same disposable local build. Active scanning is opt-in and defaults to disabled.
- JSON and HTML reports plus a Markdown summary are retained as a GitHub Actions artifact for 30 days.
- The workflow has read-only repository permissions and does not scan production or third-party hosts.
- This is automated web-layer DAST, not a human-led penetration test.

**Coverage Limitations:** the workflow does not cover production hosting, authenticated user journeys, backend APIs (JestBox is designed as an offline-first static app), third-party infrastructure, or comprehensive Android runtime behavior. It does not replace authenticated manual testing, business-logic testing, backend/API assessment, production-host testing, or a human-led penetration test.

**Triage:** review each alert manually, reproduce it, record the affected URL and evidence, assess exploitability and impact, and track confirmed issues through remediation and retesting. Do not suppress scanner rules or delete tests merely to obtain a green workflow.

MobSF static APK analysis remains a separate control. Android dynamic assessment requires a deliberately provisioned emulator and a validated MobSF dynamic-analysis setup; it must not be represented as covered by ZAP.

### 4.2 Workflow Hardening History

The security automation was introduced and hardened in a series of changes:

- [PR #7](https://github.com/ErTapanJatakia/JestBox/pull/7): initial security automation baseline, including CodeQL/SARIF integrations, OSV, Trivy, DevSkim, Dependency Review, MobSF static and assessment documentation.
- [PR #12](https://github.com/ErTapanJatakia/JestBox/pull/12): OpenSSF Scorecard workflow stabilisation.
- [PR #14](https://github.com/ErTapanJatakia/JestBox/pull/14): report summaries and artifact retention improvements.
- [PR #15](https://github.com/ErTapanJatakia/JestBox/pull/15): Gitleaks, zizmor, Syft SBOM and actionlint integration.
- [PR #16](https://github.com/ErTapanJatakia/JestBox/pull/16): OWASP ZAP baseline and controlled active-scan workflow.
- [PR #18](https://github.com/ErTapanJatakia/JestBox/pull/18): workflow hardening, immutable action pinning, reduced token persistence, tighter permissions and MobSF trust-boundary improvements.
- [PR #19](https://github.com/ErTapanJatakia/JestBox/pull/19): MobSF Android dynamic assessment workflow.
- [PR #20](https://github.com/ErTapanJatakia/JestBox/pull/20): replaced a blocked third-party emulator action with native Android SDK emulator commands.
- [PR #21](https://github.com/ErTapanJatakia/JestBox/pull/21): Android SDK licence-pipeline handling and bounded Gradle retries for Maven Central HTTP 429 responses.
- [PR #22](https://github.com/ErTapanJatakia/JestBox/pull/22): added Android SDK platform-tools/emulator paths to the dynamic workflow so `adb` and `emulator` resolve correctly.
- [PR #24](https://github.com/ErTapanJatakia/JestBox/pull/24): consolidated the security policy, assessment history and testing procedures into this SECURITY.md.
- [PR #26](https://github.com/ErTapanJatakia/JestBox/pull/26): committed package-lock.json, moved CI installs to npm ci, added unsigned release-APK static assessment, stabilised MobSF dynamic ADB handling, and incorporated Dependabot updates for checkout, upload-artifact, deploy-pages and setup-dotnet.

These changes concern security automation and workflow reliability. They did not authorise production signing, store submission, or production deployment.

## 5. MobSF Android Dynamic Assessment: Execution History and Results

The dynamic workflow builds a disposable debug APK, provisions an Android API 30 x86_64 emulator, starts MobSF and performs a bounded runtime observation. A successful static scan is not a substitute for this dynamic control.

| Attempt / change | Observed outcome | Evidence / interpretation |
|---|---|---|
| Initial third-party action attempts | Blocked by repository Actions policy | GitHub disallowed reactivecircus/android-emulator-runner; replaced with native Android SDK commands. [Run #44447154285](https://github.com/ErTapanJatakia/JestBox/actions/runs/44447154285) · [Run #44448122699](https://github.com/ErTapanJatakia/JestBox/actions/runs/44448122699) |
| SDK, licence and PATH fixes | Android SDK and emulator became available; earlier run was cancelled during device startup | [PR #20](https://github.com/ErTapanJatakia/JestBox/pull/20) · [PR #21](https://github.com/ErTapanJatakia/JestBox/pull/21) · [PR #22](https://github.com/ErTapanJatakia/JestBox/pull/22) |
| Earlier cancelled attempt | Unbounded ADB wait was a plausible design weakness; logs did not prove the exact hang point | [Run #44457340221](https://github.com/ErTapanJatakia/JestBox/actions/runs/44457340221) |
| First MobSF execution after lockfile workflow changes | Failed when an unqualified ADB command saw both emulator-5554 and 127.0.0.1:5555 and returned “more than one device/emulator” | [Run #44476246717](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246717) · [Artifact 14506646841](https://github.com/ErTapanJatakia/JestBox/actions/runs/44476246717/artifacts/14506646841) |
| Intermediate PR update | Run was cancelled by a later PR update because concurrency used cancel-in-progress: true; no completed report from that attempt | [Run #44544804967](https://github.com/ErTapanJatakia/JestBox/actions/runs/44544804967) |
| Successful dynamic assessment | ADB transport, APK launch, 60-second observation, MobSF stop and JSON report generation completed; artifact uploaded | [Run #44545632539](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539) · [Artifact 14540387667](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539/artifacts/14540387667) |

### Successful run details and coverage boundary

- MobSF version: v4.6.9.
- Target: disposable JestBox debug APK, package com.ertapanjatakia.jestbox.
- Emulator: Android API 30 / Android 11, x86_64 Google APIs image without Google Play.
- ADB endpoints: emulator-5554 and its TCP transport 127.0.0.1:5555; all host-side app and logcat commands explicitly target emulator-5554.
- MobSF dynamic start returned device_mode: gadget, data_collected: true at stop, and a dynamic JSON report was generated.
- MobSF could not remount /system writable and explicitly fell back to Frida Gadget. The report has tls_tests_available: false; rooted/system-level CA and TLS interception tests were therefore not performed.
- The dynamic report detected 0 trackers. Its URL list includes Android emulator/system-service traffic; this is not proof that all app network behaviour is absent.
- The 60-second observation completed without a matching JestBox fatal-exception signature in the captured logcat.

The workflow fix uses explicit ADB serials, bounded commands, one existing ADB server, and always-run diagnostic artifact collection. A later workflow hardening change sets cancel-in-progress: false so an ordinary PR update does not cancel an already-running assessment.

Acceptance status: the automated MobSF dynamic run is complete in Frida Gadget mode. Root-dependent inspection and TLS tests remain a documented coverage limitation, not a passed test. This is not a human-led penetration test and does not assess production hosting or third-party infrastructure.

## 6. Trigger Schedule and Execution Model

The exact triggers are defined in the workflow YAML files under `.github/workflows/`. The current design includes:

- OSV-Scanner, Trivy and DevSkim: main pushes, pull requests targeting main, weekly schedule and manual dispatch.
- Dependency Review: pull requests targeting main.
- OpenSSF Scorecard: main pushes, weekly schedule and manual dispatch.
- MobSF static: trusted Android debug build on main and supported manual execution path.
- MobSF dynamic: manual dispatch and weekly schedule; it builds its own debug APK in the same workflow execution.
- ZAP: main pushes, pull requests targeting main and weekly schedule; active scanning is opt-in via manual dispatch and defaults off.
- CodeQL: GitHub-managed default setup. The repository avoids adding a duplicate advanced CodeQL setup alongside default setup.

Workflow runs and artifacts can be browsed from [GitHub Actions](https://github.com/ErTapanJatakia/JestBox/actions).

## 7. Findings Triage and Remediation Register

A scanner run is not a remediation decision. Each finding should be recorded with enough evidence to reproduce and verify it.

| Field | Required record |
|---|---|
| Finding ID | Scanner rule/CVE/alert identifier |
| Source | Tool and workflow run link |
| Severity | Original scanner severity; map to CVSS only when a CVSS score/vector is actually supplied |
| Affected asset | File, dependency/package version, APK component or workflow |
| Evidence | Sanitised excerpt, path, line, package path or report reference |
| Validation | Confirmed, false positive, not exploitable in context, or needs investigation |
| Decision | Fix, mitigate, accept temporarily, or defer |
| Remediation | Specific change and responsible owner |
| Verification | Relevant rerun/check and its report link |
| Status | Open, in progress, fixed pending verification, verified fixed, accepted risk or deferred |
| Review date | Date and condition for reassessment |

No blanket dismissals, blanket suppressions or test weakening are permitted. Accepted risks must have a rationale, owner, affected version and review condition. Security alert counts and remediation status must be taken from live GitHub/report evidence; do not infer them from green workflow badges.

### Current Triage Limitations

- The CodeQL workflow run is visible, but individual alert details have not yet been reliably retrieved through the available repository API access. Use the [Code Scanning alerts page](https://github.com/ErTapanJatakia/JestBox/security/code-scanning) to inspect current alerts.
- Repository-level Dependabot alert and secret-scanning settings/status must be verified in GitHub Security settings. Their status must not be inferred from scanner workflow success.
- The report artifacts are generated and linked, but their complete finding contents have not all been manually reviewed in this document update. No finding should be marked remediated solely because a scan workflow passed.

### Results reviewed — PR #26 assessment batch

| Tool | Observed report result | Triage |
|---|---|---|
| OSV-Scanner | 0 SARIF findings | No known-vulnerability finding in this scanned lockfile snapshot; not a guarantee of zero vulnerabilities. |
| Gitleaks | 0 SARIF findings | No secret-pattern finding in the scanned repository/history scope. |
| zizmor | 0 SARIF findings | No workflow-security finding reported by this zizmor run. |
| Trivy | 3 SARIF notes: MIT notices for @capacitor/core and @capacitor/share, and 0BSD for tslib | License inventory notices, not vulnerability findings. |
| DevSkim | 20 SARIF notes, 0 warnings/errors | 19 DS162092 localhost references are confined to local CI scanner/test-server workflows. One DS172411 note is on setTimeout(dismiss, 5000); the callback is a fixed local function, not an untrusted string. Contextual notes; not confirmed exploitable findings. |
| OWASP ZAP | 9 alert categories: 2 medium, 6 low, 1 informational | All alert instances target the disposable Python HTTP server at 127.0.0.1:8080. Missing CSP/anti-clickjacking and other headers, Python Server disclosure and cacheability describe this local test server, not a verified production host. |
| MobSF unsigned release APK | MobSF security score 60; 2 high, 6 warning, 1 informational in the report | One high is the expected missing signing certificate on an intentionally unsigned assessment APK. The other high is minSdk=24 (Android 7.0 support), which is a compatibility/security-policy decision and was not changed without approval. Warnings include allowBackup=true, a dependency-generated ProfileInstallReceiver protected by android.permission.DUMP, and generic Capacitor/Cordova storage, temporary-file, hardcoded-string and wildcard-access heuristics; these require contextual review and are not automatically confirmed vulnerabilities. |
| MobSF dynamic | Report generated in Frida Gadget mode; 0 trackers detected; tls_tests_available=false | Runtime observation completed, but root-dependent and system-level TLS tests were unavailable because /system could not be remounted writable. |
| OpenSSF Scorecard | 6.4/10 | Main gaps: Branch-Protection 0, Code-Review 0 (0/28 approved changesets), Fuzzing 0, CII Best Practices 0, Maintained 0 (new repository), Pinned-Dependencies 8, SAST 9. Packaging and Signed-Releases were not scored because no release workflow/releases exist; production release remains intentionally deferred. |

### GitHub repository settings verification

- Verified: .github/dependabot.yml schedules npm updates weekly on Monday at 04:00 Asia/Kolkata and GitHub Actions updates weekly at 04:15 Asia/Kolkata.
- Verified: CodeQL analysis runs are active and PR #26 checks passed for the changed code.
- Verified gap: no repository rulesets were returned; Scorecard independently reports that main has no branch protection.
- Not independently verified: Dependabot security alerts/security updates toggles, secret scanning, push protection and Dependency Graph. The connector did not expose the required settings/alert endpoints. Do not infer these are enabled.
- No GitHub Actions allowlist change was required for the current workflows.

### Dependency and Android release-readiness review

- A reviewed package-lock.json is now committed on PR #26 (lockfile version 3; 127 package entries) and CI installs use npm ci; OSV and Trivy scan that lockfile.
- Android debug build and unsigned release APK build completed in CI. The release APK is deliberately unsigned and is not a store-ready artifact. Production signing, RuStore submission and deployment were not performed.
- The MobSF unsigned-release finding for minSdk=24 was not silently changed because raising the minimum to API 29 would drop Android 7/8/9 compatibility. The backup setting and generated Cordova/Capacitor heuristics also need an explicit product/security decision before changing data-restore or navigation behaviour.

## 8. Known coverage limitations and caveats

1. **Dependency Lockfile:** PR #26 adds a reviewed package-lock.json (lockfile version 3; 127 package entries) and changes CI installs to npm ci. OSV and Trivy now consume the committed lockfile.
2. **MobSF Static vs Dynamic:** release-APK static analysis and an Android API 30 Frida Gadget dynamic run have completed. The dynamic run did not have a writable /system; root-dependent and TLS tests remain unavailable.
3. **ZAP Target:** the ZAP workflow scans a local disposable build/test server. Local test-server headers and disclosures must not automatically be attributed to the production deployment.
4. **Automated DAST Limits:** ZAP automation does not replace authenticated manual testing, business-logic testing, backend/API assessment, production-host testing, or human-led penetration testing.
5. **Scanner Classifications:** SARIF error/warning/note and tool-specific severity labels are not interchangeable with CVSS. Validate findings and exposure context.
6. **False Positives:** Trivy, DevSkim, MobSF and other automated tools can report false positives or context-dependent observations.
7. **Repository Settings:** CodeQL runs and Dependabot version-update configuration are verified. No main-branch ruleset/branch protection was found. Dependabot security-alert toggles, Dependency Graph, secret scanning and push protection remain unverified because the available connector cannot read those settings.
8. **No Guarantee:** absence of findings in a particular scan does not prove absence of vulnerabilities.
9. **Artifact Expiry:** the artifacts linked in the 19 November 2026 run batch reported an expiry date of **19 December 2026** when checked. Download and preserve evidence before expiry. Future updates must verify artifact existence and expiry before adding direct artifact links.
10. **Data Handling:** MobSF runs locally in an ephemeral GitHub-hosted runner. VirusTotal integration and external domain-malware lookups are disabled. Do not place production credentials, private signing keys or user data in reports/artifacts.
11. **Public Disclosure:** publish only sanitised summaries. Do not expose raw secrets, personal data, sensitive exploit details or private vulnerability information in a public repository document.

## 9. Security Assessment Operating Rules

- Prefer free/open-source tooling and repository-native GitHub capabilities.
- Keep workflow permissions least-privilege and third-party actions pinned to reviewed immutable commit SHAs where feasible.
- Do not modify application content, jokes, locales, theme palettes or the canonical logo during security-workflow-only changes.
- Do not weaken or delete tests to achieve green CI.
- After three consecutive failures of the same test/check using the same strategy, stop repeating it; redesign, isolate the cause, or defer with evidence.
- Merge workflow/documentation PRs only after all required CI checks pass.
- Do not initiate production signing, store submission or deployment without separate authorisation.

## 10. Ongoing Report Maintenance Protocol

Update this file whenever a security workflow is added, changed, executed, fails, is cancelled, or produces a material finding/remediation result.

For every material execution, record:

1. Date/time (UTC), workflow name, trigger and run ID.
2. Branch, commit SHA and relevant PR/merge reference.
3. Exact scope and target (local build, debug APK, repository, dependency inventory, emulator/API version, etc.).
4. Tool/version and meaningful configuration (for example, ZAP baseline vs active; MobSF static vs dynamic).
5. Execution conclusion separately from scanner findings.
6. Finding counts only when read directly from the report, with severity taxonomy identified.
7. Direct links to the workflow run and each verified artifact, including expiry date where available.
8. Remediation decisions, PR/commit links and verification reruns.
9. Limitations, skipped tests, cancellations and unverified coverage.
10. Updated status of open, fixed, accepted and deferred findings.

For a cancelled or failed workflow, link the run and describe what actually executed. Do not create a report link when no artifact exists. For GitHub code scanning results, link the Security alerts surface as well as the relevant workflow run. Preserve previous entries as historical evidence; add a dated entry rather than silently replacing prior results.

## 11. Outstanding Work

| Priority | Action | Exit Condition |
|---|---|---|
| P1 | Verify/enable main branch protection and required status checks | Ruleset/branch-protection configuration verified; keep merge automation compatible |
| P1 | Verify Dependabot security alerts, secret scanning, push protection and Dependency Graph | Settings confirmed in GitHub repository security settings |
| P1 | Decide Android minimum supported API | Product decision recorded for MobSF minSdk=24 observation; do not silently drop older-device support |
| P2 | Review allowBackup, ProfileInstallReceiver permission and generated Cordova/Capacitor static-analysis heuristics | Findings confirmed, mitigated or documented as accepted/deferred with rationale |
| P2 | Improve rooted MobSF coverage if TLS/system-level testing is required | A supported writable-system API 30 emulator completes rooted mode; otherwise retain Gadget-mode limitation |
| P2 | Preserve time-limited report artifacts | Evidence downloaded or retained before artifact expiry |
| P3 | Human-led penetration test and production-host assessment | Separately authorised assessment with defined scope |
| P3 | Production signing, RuStore submission and deployment | Remain deferred until separately authorised |

## 12. Reference Links

- [JestBox repository](https://github.com/ErTapanJatakia/JestBox)
- [GitHub Actions workflow history](https://github.com/ErTapanJatakia/JestBox/actions)
- [GitHub Code Scanning alerts](https://github.com/ErTapanJatakia/JestBox/security/code-scanning)
- [Security workflow definitions](https://github.com/ErTapanJatakia/JestBox/tree/main/.github/workflows)
- [Canonical security document history](https://github.com/ErTapanJatakia/JestBox/commits/main/SECURITY.md)
- [Historical assessment-document changes](https://github.com/ErTapanJatakia/JestBox/commits/main/SECURITY-ASSESSMENT.md)
- [Historical testing-document changes](https://github.com/ErTapanJatakia/JestBox/commits/main/SECURITY-TESTING.md)
