# Internal Security Review — 2026-11-28

**Review type:** Internal, AI-assisted source/workflow/evidence review with maintainer authorization.  
**Independence:** Not an independent human review, external audit, certification or penetration test.  
**Scope:** JestBox source and Android packaging, GitHub workflows, production signing boundary, MobSF findings, ZAP evidence, artifact retention and repository governance.

## 1. Review method

Reviewed the recorded protected production signing workflow, exact APK verification evidence, MobSF machine-readable findings, Android manifest/package validation, relevant application/native integration behaviour, ZAP target scope, workflow configuration and current repository governance records.

## 2. Positive evidence

- Protected production signing is manual-dispatch, main-only and gated by the `production-signing` Environment.
- The latest successful protected run #46120099306 completed 15/15 substantive steps, including the protected Environment gate, release build, signing, APK verification, MobSF assessment, evidence upload and temporary signing-material cleanup. The existing production signing identity was preserved; no keys were generated, rotated or changed.
- The assessed APK is package `com.jestbox.app`, version `1.1` (versionCode `2`), minSdk `29`, targetSdk `36`, non-debuggable; SHA-256 `1906704999261b8f0667f7dee07cffe146543fba05561bbf77ded839a8ef1504`. RSA-4096 certificate fingerprint `bf24d400008bf790561b6a20e4724d95cbd312e9dd6a07a38d8872fb83dcc61f`; APK Signature Scheme v3 verified.
- MobSF reported 0 High, 3 Warning and 1 Informational finding; manifest analysis reported 0/0/0; no network-security findings, no hardcoded secrets detected by the report, and 0 trackers of 432.
- The warning observations were traced to bundled Capacitor framework classes. Source review did not establish an app-owned secret, a corresponding JestBox file-capture workflow, or sensitive-data disclosure.
- The main ruleset and required status checks were previously verified active. CI and Android debug validation passed for the documented main commit.

## 3. Findings and limitations

| Area | Review outcome | Required follow-up |
|---|---|---|
| MobSF framework warnings | Contextual static-analysis observations; no confirmed application vulnerability established | Reassess if file upload/download, camera capture or sensitive-data handling is introduced |
| ZAP | Latest recorded local disposable-target DAST: run #46122224451; 0 FAIL alerts, 6 WARN categories, 0 informational alerts, 136 PASS checks | Warnings concern missing security headers and local server version disclosure; assess real hosting headers only after an explicitly authorized deployment |
| Artifact retention | GitHub Actions artifacts are subject to a 30-day repository retention cap | Preserve evidence only within approved custody; permanent archive requires separate approval |
| Contributor authorization | Automated DCO trailer validation is not a required check; DCO 1.1 is an open-source contribution-origin certification, not a proprietary rights assignment | Require project-specific written authorization and separate rights terms; do not claim DCO enforcement |
| Contributor independence | Governance remains single-maintainer | Do not claim independent review or multi-person approval |
| OpenSSF programme eligibility | JestBox is proprietary; Best Practices Badge is scoped to FLOSS; higher OSPS/Badge levels have eligibility prerequisites | Confirm programme applicability before formal attestation |

## 4. Overall conclusion

The reviewed evidence supports the existence of repository, build, signing and static-analysis safeguards. The protected signing evidence is from run #46120099306; the latest documented regression and local DAST evidence are from runs #46122224452 and #46122224451 respectively, against main commit `da82f571024ff79f18cb6c15fd4e859da48cf5a4`. It does not establish that JestBox is vulnerability-free, formally certified, independently audited, penetration-tested, or accepted by an app store. No production website deployment, store submission, public APK distribution or permanent artifact archive is claimed.

## 5. Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial internal review based on recorded workflow and assessment evidence. |
| 2026-11-28 | Reconciled with protected signing run #46120099306 and main-branch regression/DAST runs #46122224452 / #46122224451. |


## Evidence references

- Protected signing run #46120099306: https://github.com/ErTapanJatakia/JestBox/actions/runs/46120099306
- Regression validation run #46122224452 (57 passed, 0 failed, 0 skipped): https://github.com/ErTapanJatakia/JestBox/actions/runs/46122224452
- Local OWASP ZAP run #46122224451 (0 FAIL, 6 WARN, 0 informational, 136 PASS): https://github.com/ErTapanJatakia/JestBox/actions/runs/46122224451
- ZAP report artifact 15253999184: https://github.com/ErTapanJatakia/JestBox/actions/runs/46122224451/artifacts/15253999184

The regression and ZAP runs above assessed the main source/workflow tree at `da82f571024ff79f18cb6c15fd4e859da48cf5a4`; PR #118 subsequently made a documentation-only SECURITY.md reconciliation. The local ZAP target was a disposable static server, not a production website.


## 6. Post-merge scanner evidence and dispositions — 28 November 2026

**Commit:** `fbcea7ed10babcaad7a46d1d7a69dd12acdbcd92` (PR #120). Post-merge validation completed with 15/15 workflow runs and 17/17 check runs successful. This does not mean every scanner emitted zero findings.

### 6.1 OSV-Scanner and Trivy

- OSV-Scanner run [#46164418763](https://github.com/ErTapanJatakia/JestBox/actions/runs/46164418763): 0 SARIF results.
- Trivy run [#46164418910](https://github.com/ErTapanJatakia/JestBox/actions/runs/46164418910): 0 Error, 0 Warning and 5 Note records. The five notes are licence classifications only: Playwright (Apache-2.0), Playwright Core (Apache-2.0), Capacitor Core (MIT), Capacitor Share (MIT), and tslib (0BSD). No vulnerability alert was represented by these five notes.

### 6.2 Bearer CLI 2.1.3

Run [#46164418904](https://github.com/ErTapanJatakia/JestBox/actions/runs/46164418904), artifact [15271475010](https://github.com/ErTapanJatakia/JestBox/actions/runs/46164418904/artifacts/15271475010): 175 rules evaluated, 4 SARIF results.

| SARIF rule | Location | Source review and disposition |
|---|---|---|
| `javascript_lang_dangerous_insert_html` | `scripts/legal-markdown-renderer.mjs:124` | The source creates DOM elements and assigns parsed label text with `textContent`; links pass a URL parser/protocol allowlist. No HTML-string sink was identified in the inspected renderer. Likely DOM-API false positive; preserve as tracked pending focused regression confirmation. |
| `javascript_lang_dangerous_insert_html` | `scripts/legal-markdown-renderer.mjs:167` | The image path is a fixed local asset; alt text is assigned as an attribute. No HTML parsing sink was identified. Likely safe-attribute false positive; preserve as tracked pending focused regression confirmation. |
| `javascript_lang_logger_leak` | `scripts/audit-joke-diversity.mjs:50-55` | Logs aggregate threshold, category count, distinct-line counts and uniqueness ratios, not joke content or secrets. Contextual false-positive candidate; keep output aggregate-only. |
| `javascript_lang_logger_leak` | `scripts/prepare-android-release-version.mjs:43` | Logs Android version name and version code, both public release metadata. Contextual false-positive candidate; no sensitive data identified. |

No Bearer finding is described as cleared, suppressed or closed. This source review is not a fresh scanner re-run or a formal false-positive adjudication by the tool vendor.

### 6.3 OWASP ZAP

Run [#46164418915](https://github.com/ErTapanJatakia/JestBox/actions/runs/46164418915), artifact [15271240634](https://github.com/ErTapanJatakia/JestBox/actions/runs/46164418915/artifacts/15271240634):

| Report | High | Medium | Low | Informational | Alert records |
|---|---:|---:|---:|---:|---:|
| Baseline | 0 | 2 | 6 | 2 | 10 |
| Active | 0 | 2 | 6 | 3 | 11 |

The medium observations were Content Security Policy not set and Missing Anti-clickjacking Header. Low observations included missing COEP, COOP, CORP, Permissions Policy and X-Content-Type-Options headers, plus server-version disclosure. Informational observations included suspicious comments and cacheability; the active scan also reported User Agent Fuzzer. These are responses from the disposable local static server, not proof of weaknesses in the Android APK or any production hosting. The server uses Python `http.server`; its default headers account for the missing-header and version observations. The temporary harness should not be mistaken for a deployed web service. Do not change Android runtime code to address a test-server-only header warning.

### 6.4 Residual actions and assurance limits

- Preserve the four Bearer results and their source-level rationale; add/retain regression cases for hostile Markdown labels, links, image attributes and inert raw HTML where the renderer contract supports those inputs.
- Re-run Bearer after any renderer change; compare SARIF results without weakening the non-blocking evaluation or suppressing rules.
- Treat ZAP header warnings as local harness observations. If JestBox ever gains an intentionally hosted web surface, define and test its production security-header policy separately.
- Retain Trivy licence notes as inventory metadata; do not infer or invent licence terms beyond the scanner's records.
- No Code Scanning alert closure is claimed because the connector did not expose the alerts endpoint for independent verification.

These are automated source and disposable-target checks. They are not an independent audit, human-led penetration test, certification, guarantee of security, or assessment of a deployed website. JestBox remains an Android APK project; no web deployment, production signing or APK publication was initiated by this review.

## 7. Review history update

| Date | Change |
|---|---|
| 2026-11-28 | Added exact PR #120 post-merge scanner counts, Bearer source review, Trivy licence-note interpretation, OSV result and ZAP disposable-server scope/dispositions. |
