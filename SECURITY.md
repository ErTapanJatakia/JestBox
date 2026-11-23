# JestBox Security Policy and Security Assessment Programme


[![MobSF Static Analysis](https://img.shields.io/badge/MobSF-Static%20Analysis%20%E2%80%A2%2085%2F100-6f9f36?style=for-the-badge&logo=data:image%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMzYiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMzYiIHJ4PSIzIiBmaWxsPSIjMjUyYTMyIi8%2BPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjE3IiBjeT0iMTgiIHI9IjEwIi8%2BPGNpcmNsZSBjeD0iMTciIGN5PSIxOCIgcj0iNCIvPjxwYXRoIGQ9Ik0xNyA0djZtMCAxNnY2TTMgMThoNm0xNiAwaDYiLz48L2c%2BPHBhdGggZD0iTTEyIDE4aDEwbS01LTV2MTAiIHN0cm9rZT0iI2UzNGI0YiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48dGV4dCB4PSIzNCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmIj5Nb2JTRjwvdGV4dD48L3N2Zz4%3D)](https://mobsf.live/static_analyzer/15ef959d97334f14a20c4b347f9995ef/)  [![VirusTotal File Analysis](https://img.shields.io/badge/VirusTotal-File%20Analysis-394eff?style=for-the-badge&logo=virustotal&logoColor=white)](https://www.virustotal.com/gui/file/47848a2deb70530f4c0375e0f877914c448273a42f7fb24f7cbcff9b18d6dc71)  

[![ANY.RUN Sandbox Analysis](https://img.shields.io/badge/ANY.RUN-Sandbox%20Analysis-08c7d3?style=for-the-badge&logo=data:image%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI%2BPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiIGZpbGw9IiMwOGM3ZDMiLz48cGF0aCBkPSJNMTQuMSA3LjhjLS4zLjEtLjYuNC0uNy43LS4xLjMtLjEgNC4xLS4xIDguNHY4LjFsLjctLjQuNi0uNFY5LjZsNi41IDMuOGMzLjYgMi4xIDYuNiAzLjggNi43IDMuOS4xIDAtLjEuMi0uNi40bC0uNy40LjguNC44LjQuMy0uMmMuOS0uNCAxLjItLjcgMS4yLTEuMyAwLS41LS4xLS45LS40LTEuMS0uMy0uMy0xNC4zLTguMy0xNC42LTguNC0uMy0uMS0uNS0uMS0uOCAwWm0tMy45IDIuMmMtLjQuMi0uNy42LS44Ljl2MTcuMWwuMi4zYy4zLjQuNi41IDEuMS41LjQgMCAuNSAwIDcuNC00bDctNC4xYzAtLjEtMS41LS45LTEuNi0uOS0uMSAwLTIuOSAxLjYtNi4zIDMuNmwtNi4yIDMuNlYxMS44bC42LjNjLjMuMi42LjMuNy4zcy4xLS4zLjEtLjl2LS45bC0uNi0uM2MtLjctLjQtMS4xLS41LTEuNi0uM1oiIGZpbGw9IiNmZmYiLz48L3N2Zz4%3D)](https://app.any.run/tasks/95cbcaf1-0d41-4e46-8a15-495720d19d68)  [![Hybrid Analysis Sample](https://img.shields.io/badge/Hybrid%20Analysis-Sample%20Report-263746?style=for-the-badge&logo=firefoxbrowser&logoColor=white)](https://hybrid-analysis.com/sample/47848a2deb70530f4c0375e0f877914c448273a42f7fb24f7cbcff9b18d6dc71)


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

### Packaged Android manifest verification — 22 November 2026

**Result: passed for both the unsigned release APK and the signed assessment candidate.** A fail-closed verifier inspected each built APK's merged manifest through Android SDK `apkanalyzer`; it did not rely solely on the generated source manifest. The change is additive and does not alter application runtime behaviour or the production signing identity.

- **PR:** [#79 — Verify security controls in the final Android APK](https://github.com/ErTapanJatakia/JestBox/pull/79)
- **Source commit assessed:** `fb109daea05d5c2838da89c843c7dd4a52209c22`
- **Regression tests:** 11/11 Python standard-library manifest tests passed, including deliberately unsafe manifests and SDK-scoped sensitive permissions.
- **Unsigned release APK:** [Android PR build run #44990288140](https://github.com/ErTapanJatakia/JestBox/actions/runs/44990288140) · [artifact 14741626492](https://github.com/ErTapanJatakia/JestBox/actions/runs/44990288140/artifacts/14741626492) · SHA-256 `947d621df69a117ef535a156b4dd9f8a7a40c549739ce4b1eaffc271252c0848`.
- **Signed assessment candidate:** [hardened APK assurance run #44990288148](https://github.com/ErTapanJatakia/JestBox/actions/runs/44990288148) · [artifact 14741418670](https://github.com/ErTapanJatakia/JestBox/actions/runs/44990288148/artifacts/14741418670) · SHA-256 `7e047ea552404f2e41b55b892cff2f9ff696360d76e8033fa0090184a8f3b213`.
- **Signing:** APK Signature Scheme v3 verified; signer certificate SHA-256 `bf24d400008bf790561b6a20e4724d95cbd312e9dd6a07a38d8872fb83dcc61f`.
- **Emulator:** Android API 30 Google APIs x86_64; install, launch, 45-second process-survival observation, force-stop, relaunch and 10-second observation passed. No matching fatal exception was observed.

#### Verified packaged-manifest properties

| Property | Observed result |
|---|---|
| Application ID | `com.jestbox.app` |
| Minimum / target SDK | 29 / 36 |
| `android:allowBackup` | Explicitly false |
| Debuggable / test-only | False (platform default); `apkanalyzer` also reported debuggable=false |
| Cleartext traffic | Not enabled; target SDK 36 default applies |
| Custom network security config | Not declared |
| Exported components | Only `com.jestbox.app.MainActivity`, the launcher |
| FileProvider | Non-exported |
| ProfileInstallReceiver | Non-exported |
| InitializationProvider | Non-exported |
| Declared permissions | `INTERNET` and app-specific `DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` |
| Sensitive permission review | None detected |

The verifier fails closed if a custom `networkSecurityConfig` is introduced, until its rules are manually inspected. It also fails on unexpected exported components or sensitive permissions, rather than silently accepting them.

**Coverage boundary:** this is packaged-manifest verification plus an automated API 30 emulator smoke test. It is not a human-led penetration test, rooted-device/TLS interception assessment, physical-device certification, app-store acceptance, or public release. The signed APK is an assessment candidate only; no store submission or distribution was performed.

### Bearer CLI controlled SAST evaluation — 22 November 2026

A non-blocking evaluation workflow was added in [PR #80](https://github.com/ErTapanJatakia/JestBox/pull/80) for **Bearer CLI v2.1.3**. The official CLI supports JavaScript and TypeScript and provides SAST rules covering OWASP Top 10/CWE Top 25 security risks. The open-source CLI is distributed under Elastic License 2.0 (ELv2); its terms permit internal use but are not an OSI-approved permissive licence.

- **Tool release:** [Bearer CLI v2.1.3](https://github.com/Bearer/bearer/releases/tag/v2.1.3)
- **Documentation:** [Bearer CLI](https://docs.bearer.com/) · [scan command reference](https://docs.bearer.com/reference/commands/)
- **Pinned Linux AMD64 archive SHA-256:** `974d4ad7bb71bc578675684d444e345e8fbad91c85557aac035406ef5cc04c68`
- **Execution:** [workflow run #44991208476](https://github.com/ErTapanJatakia/JestBox/actions/runs/44991208476) · [artifact 14742136388](https://github.com/ErTapanJatakia/JestBox/actions/runs/44991208476/artifacts/14742136388)
- **Result:** 175 rules evaluated; 5 SARIF findings; SARIF schema and report structure validated.
- **Scope:** SAST only. Bearer's optional secrets scanner is excluded because Gitleaks already covers secret-pattern detection.
- **Reporting:** SARIF retained as a workflow artifact for manual triage; it is not uploaded into GitHub Code Scanning during the evaluation.
- **CI policy:** non-blocking (`--exit-code=0`); no existing scanner, required check, or CI gate is changed or weakened.
- **Credentials/network:** no Bearer Cloud API key is used; domain resolution and version-check network calls are disabled during the scan.

#### Initial finding triage

| Finding | Location | Assessment | Disposition |
|---|---|---|---|
| `python_lang_os_command_injection` | `scripts/verify_android_apk_manifest.py:203` | Uses an argv list with no shell expansion; the scanner does not model the fixed trusted CI invocation. | Open for hardening: use a fixed executable name, explicit `shell=False`, and retain command-argument validation. |
| `python_lang_path_traversal` | `scripts/verify_android_apk_manifest.py:214` | Output path is a CLI argument; current workflow passes a fixed workspace-relative path. | Open for hardening: constrain APK and report paths to the repository workspace and test traversal rejection. |
| `javascript_lang_manual_html_sanitization` | `scripts/prepare-web.mjs:25` | Markdown sources are repository-owned legal/accessibility documents, not user submissions. The renderer currently passes raw HTML lines through and performs manual escaping; this deserves a narrower HTML policy and attribute-safe link handling. | Open for remediation/review; do not dismiss as a false positive yet. |
| `javascript_lang_logger_leak` | `scripts/audit-joke-diversity.mjs:50` | Logs locale/category counts, line-distinctness counts and ratios; it does not log joke text, personal data or secrets. | Candidate contextual false positive; retain evidence and recheck after review. |
| `javascript_lang_logger_leak` | `scripts/prepare-web.mjs:87` | Logs only the fixed count of generated locale-specific legal pages. | Candidate contextual false positive; retain evidence and recheck after review. |

No finding has been blanket-dismissed or suppressed. The two logger observations appear non-sensitive based on the logged fields, but their final disposition remains subject to review. The two findings in the APK verifier will be hardened. The legal-page renderer will be reviewed to remove unrestricted raw-HTML passthrough and ensure generated link attributes cannot be injected.

The evaluation will compare language coverage, findings quality, rule overlap with CodeQL/njsscan/DevSkim, false-positive rate, execution time, and operational reliability. **Bearer is not yet an adopted required scanner**; adoption requires the follow-up remediation/re-scan and an evidence-based decision.

### Main-branch post-merge verification — 22 November 2026

**Result:** all 15 main-branch workflow runs and all 16 commit checks completed successfully on main. This assessment covers commit `519ecd7ec69ee59987e02e74d3669c73d5e27044`; it is automated post-merge verification, not a production release certification.

- **Main commit:** `519ecd7ec69ee59987e02e74d3669c73d5e27044`
- **Workflow runs:** 15/15 successful — [main-commit Actions runs](https://github.com/ErTapanJatakia/JestBox/actions?query=branch%3Amain)
- **Commit checks:** 16/16 successful — [commit check summary](https://github.com/ErTapanJatakia/JestBox/commit/519ecd7ec69ee59987e02e74d3669c73d5e27044/checks)

| Control / workflow | Main-branch result | Evidence |
|---|---|---|
| JestBox regression validation | Passed | [Run #44986022230](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022230) |
| CodeQL default setup — JavaScript/TypeScript and GitHub Actions | Both analyses passed | [Run #44986021999](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986021999) |
| njsscan 1.0.2 | **0 findings; 0 scanner errors; complete JSON/SARIF; SARIF upload successful** | [Run #44986022077](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022077) · [Report artifact 14739757153](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022077/artifacts/14739757153) |
| OWASP ZAP | Baseline and bounded active scans completed; 0 High, 2 Medium, 6 Low and 3 Informational alerts (triage below) | [Run #44986022097](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022097) · [Report artifact 14740365696](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022097/artifacts/14740365696) |
| Android debug and unsigned release builds | Both built; debug signature/alignment/checksum verification passed | [Run #44986022010](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022010) · [APK artifact 14740136346](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022010/artifacts/14740136346) |
| Hardened signed APK assessment | Signed candidate verified; API 30 emulator install, launch, process survival and relaunch passed; no matching fatal exception observed | [Run #44986022081](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022081) · [Evidence artifact 14740021924](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022081/artifacts/14740021924) |
| Tablet browser validation | Passed; viewport screenshots generated | [Run #44986022092](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022092) |
| Microsoft DevSkim | Passed | [Run #44986022184](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022184) |
| Trivy | Passed | [Run #44986022083](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022083) |
| OSV-Scanner | Passed | [Run #44986022054](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022054) |
| Gitleaks | Passed | [Run #44986022036](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022036) |
| Dependency Review | Passed | Included in [main commit checks](https://github.com/ErTapanJatakia/JestBox/commit/519ecd7ec69ee59987e02e74d3669c73d5e27044/checks) |
| OpenSSF Scorecard | Passed | [Run #44986022057](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022057) |
| zizmor | Passed | [Run #44986022088](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022088) |
| actionlint | Passed | [Run #44986022013](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022013) |
| Syft SBOM generation | Passed | [Run #44986022096](https://github.com/ErTapanJatakia/JestBox/actions/runs/44986022096) |

#### Main-branch ZAP alert triage

The main-push ZAP run performed both the baseline passive scan and the bounded active scan against the disposable local target `http://127.0.0.1:8080`. The active report contained 11 alerts: 0 High, 2 Medium, 6 Low and 3 Informational. It added one Informational **User Agent Fuzzer** observation to the 10 baseline alerts; this records response differences for legacy/fuzzed user-agent strings and is not a demonstrated exploit.

The Medium and Low findings remain the missing CSP and anti-clickjacking headers, missing COEP/COOP/CORP/Permissions Policy/X-Content-Type-Options headers, and the local Python test server's version header. They are test-server/deployment-edge observations, not evidence that production hosting has those same settings. The Informational findings remain the benign source comment, cacheability of static content, and user-agent response variation. No finding has been silently dismissed. Production-edge security-header verification remains open before a production deployment. The scan does not test production hosting, authenticated flows, backend APIs, or all Android runtime behavior and is not a human-led penetration test.

#### Main-branch Android build evidence

The downloaded main-branch Android artifact was inspected. Both APKs contain `assets/public/random-index.js`, `assets/public/jokes.js` and `assets/public/legal/third-party-notices.html`.

| APK | Size | SHA-256 |
|---|---:|---|
| `debug/app-debug.apk` | 12,208,577 bytes | `08482e7b3e42753d807065998789920e54f5dfd47ae18dd32f36b6d1ad181def` |
| `release/app-release-unsigned.apk` | 10,365,939 bytes | `947d621df69a117ef535a156b4dd9f8a7a40c549739ce4b1eaffc271252c0848` |

The separate hardened assessment produced a production-signed **assessment candidate** with SHA-256 `7e047ea552404f2e41b55b892cff2f9ff696360d76e8033fa0090184a8f3b213`. Its signature was verified and the app survived launch and relaunch on an Android API 30 Google APIs emulator. This was an automated emulator smoke test, not physical-device certification or a public release. The unsigned release build and signed assessment candidate were not published to an app store.

**MobSF note:** MobSF static/dynamic scanning remains deferred as previously agreed. The hardened APK emulator assessment above is a separate workflow and does not represent a successful MobSF scan.

### Latest Security Assurance Report — 22 November 2026

**Assessment status:** all 24 GitHub commit checks completed successfully on the application-code PR head recorded below. This report is added in a subsequent documentation-only update; PR #77 remains open and has not been merged into `main`. The report therefore records PR-branch verification, not a production release or deployment.

- **Repository:** [ErTapanJatakia/JestBox](https://github.com/ErTapanJatakia/JestBox)
- **Pull request:** [#77 — njsscan Node.js security analysis](https://github.com/ErTapanJatakia/JestBox/pull/77)
- **Assessed PR head:** `b1a092632a71760f2de06af4de174b968d8ebd07`
- **Base `main` commit:** `989fa1f893d6d87028eba6ae83cd28dadeb65d62`
- **GitHub PR merge-ref commit used by the scanner reports:** `7f4e568a4343f1b7164831849667e0d4fcbafa25`
- **Commit check result:** 24/24 checks successful — [check-run summary](https://github.com/ErTapanJatakia/JestBox/commit/b1a092632a71760f2de06af4de174b968d8ebd07/checks)

| Control / workflow | Latest result | Evidence |
|---|---|---|
| JestBox regression validation | **43/43 tests passed** | [Run #44985369263](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369263) |
| GitHub CodeQL — JavaScript/TypeScript and GitHub Actions | Both default-setup analyses passed | [Run #44985366944](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985366944) |
| njsscan 1.0.2 | **0 findings; 0 scanner errors; complete JSON and SARIF; SARIF upload successful** | [Run #44985369183](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369183) · [Report artifact 14739790820](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369183/artifacts/14739790820) |
| Android debug and unsigned release builds | Both APKs assembled; debug signature/alignment/checksum verification passed | [Run #44985369124](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369124) · [APK artifact 14740020521](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369124/artifacts/14740020521) |
| Tablet browser validation | Passed; tablet viewport screenshots generated | [Run #44985369154](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369154) |
| OWASP ZAP baseline DAST | Scan completed; 0 High, 2 Medium, 6 Low and 2 Informational alerts (triage below) | [Run #44985369066](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369066) · [Report artifact 14739561122](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369066/artifacts/14739561122) |
| Microsoft DevSkim | Passed | [Run #44985369088](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369088) |
| Trivy | Passed | [Run #44985369185](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369185) |
| OSV-Scanner | Passed | [Run #44985369085](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369085) |
| Gitleaks | Passed | [Run #44985369072](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369072) |
| Dependency Review | Passed | [Run #44985369114](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369114) |
| OpenSSF Scorecard | Passed | [Run #44985369107](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369107) |
| zizmor | Passed | [Run #44985369265](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369265) |
| actionlint | Passed | [Run #44985369048](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369048) |
| Syft SBOM generation | Passed | [Run #44985369135](https://github.com/ErTapanJatakia/JestBox/actions/runs/44985369135) |

#### njsscan timeout investigation and scope

The initial njsscan JSON report recorded a timeout in rule `regex_dos` against the 307 KB `jokes.js` bundle; this was an incomplete scan, not a clean result. The cause was traced to the file combining static joke data with batch-append JavaScript. The data was consolidated into a single JSON-compatible literal assignment. The `.njsscan` configuration now excludes only this static data filename; no njsscan rule is disabled. A regression test parses the bundle as JSON, checks that it remains a data-only assignment, verifies joke rendering uses `textContent`, and asserts that `jokes.js` is the sole filename exclusion. All executable JavaScript remains in njsscan scope. The subsequent JSON and SARIF reports contain no scanner errors or findings, and the completeness gate passed.

#### Investigation and closure of earlier failed checks

The following failures were investigated rather than suppressed:

- **CodeQL advanced-setup attempt (PR #76):** the advanced workflow could not run alongside the repository's already-enabled CodeQL default setup. PR #76 was closed without merging; the existing default setup was retained. Its JavaScript/TypeScript and GitHub Actions analyses both passed in the latest assessment.
- **Initial njsscan pattern finding:** the first report flagged `Math.random()` in non-security-sensitive random joke selection (CWE-327). The selection was replaced with a Web Crypto `crypto.getRandomValues()` rejection-sampling helper, and regression tests were added. No rule suppression was used.
- **JestBox regression suite:** the first 42-test run had two failures. The Android staging fixture did not copy the newly required `random-index.js` helper, and the random-selection test asserted an outdated conditional expression. The fixture and assertion were corrected; the latest suite passes 43/43 tests.
- **Android and ZAP first attempts:** both stopped in their shared preflight regression suite because of those same test failures; the Android Gradle build and ZAP scan had not yet started. After the fix, the latest Android debug and unsigned release builds completed successfully, and the ZAP baseline scan completed successfully.
- **njsscan incomplete scan:** the subsequent JSON diagnostic identified a `regex_dos` timeout against the mixed code/data `jokes.js` bundle. The data-only conversion, narrow filename exclusion, regression guard and fail-closed JSON/SARIF validation are documented above. The final scan completed with zero scanner errors and zero findings.

No existing working scanner was removed, no njsscan rule was disabled, and no regression or CI gate was deleted or weakened.

#### OWASP ZAP alert triage

The PR workflow ran the passive baseline scan against the disposable local target `http://127.0.0.1:8080`, served by Python `SimpleHTTP/0.6 Python/3.14.4`. It completed successfully, but it did **not** produce a finding-free report:

- **2 Medium:** Content Security Policy header not set; anti-clickjacking header missing.
- **6 Low:** COEP, COOP, CORP, Permissions Policy and X-Content-Type-Options headers missing; server-version information exposed by the local Python test server.
- **2 Informational:** a benign descriptive comment in `random-index.js`; static content reported as storable/cacheable.

The server-version finding is specific to the disposable Python test server. The missing-header findings describe that local test-server response and do not establish whether a production hosting edge supplies equivalent headers. Production hosting, authenticated flows, backend APIs and Android runtime behavior were not tested by this ZAP run. The header controls remain a deployment-edge verification item; they are not recorded as dismissed or remediated. The informational comment does not disclose credentials or secrets, and the cacheability alert concerns static content rather than user-specific data. This was a passive baseline scan, not a human-led penetration test or PR active scan.

#### Android artifact verification

The downloaded build artifact was inspected after the successful workflow:

| APK | Size | SHA-256 |
|---|---:|---|
| `debug/app-debug.apk` | 12,208,577 bytes | `7cd179efbe2aa8748b3ec265933e06625e3abe8c6b81f474a4f59d2f1cb1384b` |
| `release/app-release-unsigned.apk` | 10,365,939 bytes | `947d621df69a117ef535a156b4dd9f8a7a40c549739ce4b1eaffc271252c0848` |

Both APKs contain `assets/public/random-index.js`, `assets/public/jokes.js`, and `assets/public/legal/third-party-notices.html`. The release APK is unsigned; no production signing or release was performed.

#### Scanner coverage decisions

- Existing working scanners and CI gates were retained; no test or security gate was weakened or deleted.
- CodeQL remains on GitHub's existing default setup for JavaScript/TypeScript and GitHub Actions; no duplicate advanced CodeQL workflow was added.
- MobSF remains deferred for this workstream as previously agreed.
- Bearer was evaluated and remains a candidate for a controlled trial; it has not yet been integrated.
- OSSAR was evaluated and not adopted for this JavaScript-focused repository because its current beta/Windows-runner constraints add complexity with overlapping coverage.

**Interpretation:** successful checks mean the corresponding automation completed and its configured gate passed. They do not mean the application is vulnerability-free. The ZAP alerts above remain visible as deployment-context findings, and the report does not claim production-host security verification.


**Last updated:** 22 November 2026  
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
- [PR #71](https://github.com/ErTapanJatakia/JestBox/pull/71): isolated tablet-only Playwright tooling under `.github/tooling/tablet/`, pinned Playwright and Playwright Core 1.56.1 in a dedicated npm lockfile, changed the tablet workflow to `npm ci`, and added regression assertions preventing unlocked installation. Trivy reported Apache-2.0 license notices for `playwright` and `playwright-core`; these are permissive-license inventory notices, not vulnerability findings. The dependency is CI-only and is not added to the application runtime dependency set.

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
| Trivy | 5 SARIF licence notices: MIT for @capacitor/core and @capacitor/share; 0BSD for tslib; Apache-2.0 for CI-only playwright and playwright-core | Permissive licence inventory notices, not vulnerability findings. Package versions, scope, provenance and compliance handling are recorded in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). |
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
| P2 | Review remaining generated Cordova/Capacitor static-analysis heuristics | Contextual findings are validated or documented with rationale; packaged-manifest verification is complete (PR #79) |
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

### Post-merge security assurance and packaged-notice verification — 23 November 2026

**Result: 18/18 main-branch commit checks passed** on merge commit `94022328d8530ec5d5829f9af648a7a910428957`. PR #83 was merged after its own 27/27 checks passed. This entry supersedes earlier in-progress status notes for this commit; it does not replace historical assessment records.

- **PR:** [#83 — Android APK manifest verifier workflow compatibility](https://github.com/ErTapanJatakia/JestBox/pull/83)
- **Merge commit:** `94022328d8530ec5d5829f9af648a7a910428957`
- **Main-branch checks:** [18/18 successful commit checks](https://github.com/ErTapanJatakia/JestBox/commit/94022328d8530ec5d5829f9af648a7a910428957/checks)
- **PR validation:** 27/27 checks passed before merge.
- **Build and runtime assessment:** [Run #45063593421](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593421) · [assessment artifact 14770022883](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593421/artifacts/14770022883)
- **Android debug build:** [Run #45063593352](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593352) · [artifact 14770323311](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593352/artifacts/14770323311)
- **Trivy:** [Run #45063593348](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593348) · [report artifact 14770416668](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593348/artifacts/14770416668)
- **ZAP DAST:** [Run #45063593443](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593443)
- **CodeQL:** [Run #45063593103](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593103)

The 18 checks included JavaScript/TypeScript, Python and GitHub Actions CodeQL analyses; ZAP DAST; signed APK build, signature and emulator runtime assessment; Android debug build; Trivy, OSV, Bearer and njsscan; SBOM generation; supply-chain posture; tablet browser validation; workflow lint/security audit; smoke tests; and repository-history secret scanning. Every check concluded success. Scanner execution success is recorded separately from individual finding disposition.

#### Trivy licence-note evidence and disposition

The Trivy SARIF from run #45063593348 contained **5 Note-level licence inventory results, 0 Warning results and 0 Error results**. These are licence notices, not vulnerability findings. The exact alert/package mapping is:

| GitHub alert | Component and version | Licence | Evidence in built APK | Compliance disposition |
|---|---|---|---|---|
| #1 | `@capacitor/core` 8.6.2 | MIT | Capacitor Core attribution and full MIT text present in packaged notice | Attribution verified |
| #2 | `@capacitor/share` 8.0.3 | MIT | Capacitor Share attribution and full MIT text present in packaged notice | Attribution verified |
| #3 | `tslib` 2.9.1 | 0BSD | Microsoft copyright and 0BSD text present in packaged notice | Attribution verified |
| #120 | `playwright` 1.56.1 | Apache-2.0 | Not found in inspected APK contents; isolated tablet CI tooling | Developer-tool notice retained in repository record |
| #121 | `playwright-core` 1.56.1 | Apache-2.0 | Not found in inspected APK contents; isolated tablet CI tooling | Developer-tool notice retained in repository record |

The following APKs were opened as ZIP archives and their packaged `assets/public/legal/third-party-notices.html` was inspected directly:

| APK | SHA-256 |
|---|---|
| Debug `app-debug.apk` | `55ef306a22ec6fcca76825b8425c4b487a9309b53920ab25782097e70cff2736` |
| Unsigned release `app-release-unsigned.apk` | `921deb5a72cbc06a9dd7c25c113b6e2319b6074249c01c9cb4c238ae5b64078b` |
| Signed hardened assessment candidate `jestbox-hardened-assessment-signed.apk` | `b1d6cd6eda2983cb9745f7c466aade3bf2318f4b4e191eeac274d2d8fa02684f` |

All three APKs contained the notice file with the three app dependency attributions and their licence text. The Playwright components were not found as APK paths; the notice correctly identifies them as isolated developer tooling and points to the repository's detailed developer notice record. The notice file is packaged under `assets/public/legal/` in each APK.

**Alert lifecycle limitation:** the package attribution evidence is now complete and documented, but the available GitHub connector does not expose individual Code Scanning alert state or dismissal controls. Therefore this report does not claim alerts #1, #2, #3, #120 or #121 are closed. Do not dismiss them as false positives: they are valid licence-inventory observations with documented compliance evidence. Their live GitHub status must be confirmed in the [Security alerts page](https://github.com/ErTapanJatakia/JestBox/security/code-scanning). No scanner suppression or CI gate weakening was introduced.

#### Android assessment result

The signed hardened assessment candidate was verified with APK signature scheme v3 and installed/launched on an Android API 30 Google APIs x86_64 emulator. Initial process survival (45 seconds), force-stop, relaunch and second observation (10 seconds) passed; no matching fatal exception was observed. The packaged manifest assessment passed: application ID `com.jestbox.app`, min SDK 29, target SDK 36, `allowBackup=false`, no cleartext opt-in, no custom network security config, only the launcher activity exported, and no sensitive permissions detected.

This is an automated build/emulator assessment, not a human-led penetration test, physical-device certification, production deployment or store release. The assessment candidate and debug/unsigned APK artifacts remain CI evidence only; no distribution or submission was performed.

#### Remaining assurance work

1. Verify the live GitHub status of the five Trivy licence alerts in the Security UI; record their exact status without misclassifying them as vulnerabilities or suppressing scanner output.
2. Continue triage of the existing ZAP, MobSF and Bearer findings using their underlying reports; green workflow status alone does not close findings.
3. Keep production-edge header verification, human-led penetration testing and production release controls separate from this local-build assessment.
4. Run the documentation commit's CI and preserve its result. No deployment, signing for distribution, store submission or APK release is authorised by this assessment.

### Detailed ZAP and Bearer report review — 23 November 2026

This review inspected the raw reports from the post-merge commit `94022328d8530ec5d5829f9af648a7a910428957`, rather than relying only on workflow conclusions.

#### OWASP ZAP

- **Run:** [#45063593443](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593443)
- **Artifact:** [14770741996 — baseline, active JSON and HTML reports](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593443/artifacts/14770741996)
- **Target:** disposable local static build at `http://127.0.0.1:8080`, served by Python `SimpleHTTP/0.6 Python/3.14.4`.
- **Baseline:** 0 High, 2 Medium, 6 Low, 2 Informational.
- **Bounded active scan:** 0 High, 2 Medium, 6 Low, 3 Informational.

The two Medium categories are missing Content-Security-Policy and anti-clickjacking response headers. The six Low categories are missing COEP, COOP, CORP, Permissions-Policy and X-Content-Type-Options headers, plus the Python test server's version disclosure. The active scan's additional Informational result is User-Agent Fuzzer response variation. Other Informational results are a benign source comment and cacheability of static content.

**Disposition:** these are real observations of the disposable local test server and static build, not false-positive claims about a production host. The Python Server version disclosure is specifically attributable to the test harness. Response-header controls belong at the actual hosting/edge configuration and must be validated against the intended production origin before any deployment. No production domain was scanned, and no production hosting change is proposed or claimed. The comment and cacheability observations do not establish sensitive-data disclosure; the application is an offline-first static client and the scan did not identify a High-risk alert.

#### Bearer CLI SAST evaluation

- **Run:** [#45063593353](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593353)
- **Artifact:** [14770537471 — SARIF and scan log](https://github.com/ErTapanJatakia/JestBox/actions/runs/45063593353/artifacts/14770537471)
- **Tool:** Bearer CLI v2.1.3; 175 rules evaluated.
- **Raw SARIF results:** 3 findings (two `javascript_lang_dangerous_insert_html` results and one `javascript_lang_logger_leak` result). This count is the SARIF result count for this run and should not be confused with the earlier PR #80 evaluation's five findings.

| SARIF result | Location | Review |
|---|---|---|
| `javascript_lang_dangerous_insert_html` | `scripts/legal-markdown-renderer.mjs:124` | The flagged operation appends a DOM element built with `document.createElement`; the content label is assigned with `textContent`. No HTML string is parsed or injected. |
| `javascript_lang_dangerous_insert_html` | `scripts/legal-markdown-renderer.mjs:167` | The flagged operation appends a DOM element created from a fixed allowlisted tag (`h1`–`h6`, `p`, `hr`, `ol`, `ul`, `li`). Inline text is emitted as text nodes; links use parsed URL allowlisting and DOM `setAttribute`; no `innerHTML`, `outerHTML` or `insertAdjacentHTML` sink is used. |
| `javascript_lang_logger_leak` | `scripts/audit-joke-diversity.mjs:50` | The JSON report contains locale/category identifiers, aggregate joke counts, distinct-line counts and uniqueness ratios. It does not log joke text, user input, personal data, credentials or secrets. |

**Disposition:** based on the current source and data flow, the two DOM-construction observations are contextual false positives for the specific dangerous-HTML rule: the renderer constructs nodes using safe DOM APIs, uses text nodes/textContent for text, and restricts link protocols to HTTP(S), mailto and tel. The logger observation is a contextual false positive for sensitive-data leakage because the emitted fields are aggregate QA metrics and contain no joke bodies or user data. These are documented triage decisions, not scanner suppressions. The Bearer workflow remains a non-blocking evaluation; its findings are not silently discarded and its output remains available as a retained artifact.

#### Follow-up boundaries

1. Keep production HTTP security-header verification as a pre-deployment task; do not retrofit local Python test-server headers and then present that as production assurance.
2. Retain the renderer's safe DOM construction, URL protocol allowlist and tests. Any future change to render untrusted/user-submitted Markdown requires a fresh threat review and appropriate sanitization policy.
3. Preserve the diversity audit's aggregate-only output. Do not add joke text or user-specific content to CI logs.
4. The five Trivy licence alert states remain unverified in GitHub Security UI; their compliance evidence is documented above, but no close/dismiss action is claimed.

#### Documentation CI verification — 23 November 2026

The detailed ZAP and Bearer triage update was committed as `5e6574fa8baf701301a376d31ddde074b6755714`. Its complete main-branch validation subsequently finished with **16/16 commit checks successful, 0 failed**. This included CodeQL for JavaScript/TypeScript, Python and GitHub Actions; OSV/Trivy scans; CycloneDX/SPDX inventory generation; workflow lint and security audits; tablet browser validation; ZAP DAST; njsscan; repository-history secret scanning; smoke tests; and Android debug validation.

- **Commit:** [`5e6574fa8baf701301a376d31ddde074b6755714`](https://github.com/ErTapanJatakia/JestBox/commit/5e6574fa8baf701301a376d31ddde074b6755714)
- **Commit checks:** [16/16 successful](https://github.com/ErTapanJatakia/JestBox/commit/5e6574fa8baf701301a376d31ddde074b6755714/checks)

This confirms the documentation change passed the repository's existing checks. It does not close the five GitHub licence alerts, validate production-host headers, or substitute for the deferred MobSF and human-led assessments.


### DevSkim alert triage and post-merge assurance — 23 November 2026

**Result: PR #84 merged; all 27/27 PR checks and all 18/18 main-branch commit checks passed.** The merge commit is `ed665bba1a68cc885f11c0540fa95ec3123fc1ce`. This is automated source/build assurance for the Android APK project; JestBox has not been deployed as a website, and no APK distribution or store submission was performed.

- **PR:** [#84 — Triage three DevSkim findings with narrow source-level fixes](https://github.com/ErTapanJatakia/JestBox/pull/84)
- **Merge commit:** [`ed665bba1a68cc885f11c0540fa95ec3123fc1ce`](https://github.com/ErTapanJatakia/JestBox/commit/ed665bba1a68cc885f11c0540fa95ec3123fc1ce)
- **PR checks:** [27/27 successful](https://github.com/ErTapanJatakia/JestBox/pull/84/checks)
- **Main commit checks:** [18/18 successful](https://github.com/ErTapanJatakia/JestBox/commit/ed665bba1a68cc885f11c0540fa95ec3123fc1ce/checks)
- **Main-branch DevSkim:** [run #45068479634](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479634) · [SARIF artifact 14771604206](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479634/artifacts/14771604206)
- **Other main-branch security runs:** [CodeQL / checks](https://github.com/ErTapanJatakia/JestBox/commit/ed665bba1a68cc885f11c0540fa95ec3123fc1ce/checks) · [ZAP #45068479520](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479520) · [Trivy #45068479363](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479363) · [OSV #45068479528](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479528) · [Gitleaks #45068479391](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479391) · [njsscan #45068479369](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479369) · [Bearer #45068479402](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479402) · [Android debug #45068479368](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479368) · [Hardened APK assessment #45068479491](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479491) · [Tablet browser #45068479418](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479418) · [Syft SBOM #45068479541](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479541) · [zizmor #45068479514](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479514) · [actionlint #45068479500](https://github.com/ErTapanJatakia/JestBox/actions/runs/45068479500).

#### Disposition of the three reported Code Scanning findings

| Alert | Reported location | Technical assessment | Source remediation |
|---|---|---|---|
| #127 | `.github/workflows/bearer-evaluation.yml:47` — token/key heuristic | The value is the public SHA-256 integrity digest for the pinned Bearer CLI v2.1.3 archive. It is not a credential, access token or authentication key. | Kept the digest and strict `sha256sum --check --strict` verification. Added an explanatory comment and a line-scoped DevSkim `DS173237` suppression for this exact checksum line. |
| #126 | `scripts/verify_android_apk_manifest.py:14` — HTTP URL heuristic | The value is Android's required XML namespace identifier (`http://schemas.android.com/apk/res/android`), not an HTTP endpoint or network request. | Kept the namespace byte-for-byte unchanged. Added rationale and a line-scoped `DS137138` suppression. |
| #125 | `tests/test_android_apk_manifest_verifier.py:13` — HTTP URL heuristic | Duplicate fixture spelling of the same Android XML namespace identifier. | Removed the duplicate literal; the test now reuses the verifier's canonical namespace constant. |

Suppressions follow the documented [DevSkim suppression syntax](https://github.com/microsoft/DevSkim/wiki/Suppressions) and are restricted to the exact source lines and rule IDs. No real secrets, scanner rules, TLS protections, test assertions, or CI gates were removed or weakened. The checksum remains verified; the Android namespace remains unchanged at runtime.

The PR-branch SARIF no longer reported any finding at the three supplied source locations. The fresh main-branch SARIF confirms those locations are absent after merge. This is scanner evidence, not proof that the GitHub Code Scanning alert records have transitioned to Closed: the available GitHub connector does not expose individual alert lifecycle state. Verify the live state in the [Code Scanning alerts page](https://github.com/ErTapanJatakia/JestBox/security/code-scanning); no manual dismissal or closure is claimed here.

#### Fresh main-branch DevSkim result and residual warning

The completed main-branch DevSkim SARIF contains **0 Error, 1 Warning and 25 Note results (26 total)**. The remaining warning is a separate finding:

- **Rule:** `DS137138`
- **Location:** `tests/android-security-hardening.test.js:10`
- **Context:** a test fixture contains the same Android XML namespace identifier in an embedded manifest string. It is a namespace identifier, not a network endpoint. This warning was not one of the three alert locations supplied for PR #84 and remains separately tracked for narrow remediation.
- **Other output:** 25 Note-level results are retained as scanner observations; they are not silently converted into a clean-scan claim.

Do not describe the complete DevSkim scan as warning-free. The next source-level task is to handle this additional fixture occurrence with a minimal, well-documented approach, preserving the exact XML namespace and all test coverage, then rerun DevSkim and the relevant regression/CI checks.

#### Main-branch check result

All 18 commit checks on the merge commit completed successfully, with zero failures and zero pending checks. The run set included CodeQL (JavaScript/TypeScript, Python and GitHub Actions), ZAP DAST, hardened signed APK build/signature/emulator assessment, Android debug and unsigned release build, tablet browser validation, DevSkim, njsscan, Bearer, Trivy, OSV-Scanner, Gitleaks, Syft SBOM, OpenSSF Scorecard, zizmor and actionlint, plus repository validation and push workflow checks. Individual scanner success indicates the tool completed; it does not by itself disposition every finding.

**Build boundary:** the hardened signed APK is an assessment candidate only. The automated API 30 emulator assessment is not a human-led penetration test, physical-device certification, production deployment, or store release. JestBox remains an Android APK project; no website deployment is asserted.

#### Security assurance tracker — current checkpoint

| Workstream | Status | Evidence / next action |
|---|---|---|
| Three supplied DevSkim findings | Source remediations merged; fresh SARIF clear at supplied locations | PR #84 and main SARIF above; confirm live GitHub alert lifecycle in Security UI |
| Additional DevSkim namespace warning | Open for separate narrow remediation | `tests/android-security-hardening.test.js:10` |
| Main-branch CI after PR #84 | Complete — 18/18 passed | Merge commit check summary above |
| Trivy licence alerts #1, #2, #3, #120, #121 | Compliance evidence documented; GitHub alert states not verified | Confirm each alert status individually; do not dismiss valid licence inventory notices |
| ZAP findings | Scan completed; contextual findings remain documented | Local disposable target only; production-edge headers remain a pre-deployment check |
| MobSF | Deferred by agreement due to tool reliability issues | Do not block other assurance work on MobSF |
| Production deployment / APK distribution / store submission | Not authorised; not performed | Requires separate explicit authorisation |



### DevSkim namespace fixture remediation and latest main-branch assurance — 23 November 2026

**Result: PR #86 merged; all 27/27 PR checks and all 18/18 main-branch commit checks passed.** Merge commit: `8786bc4736da8269d6ad191533be364d99a61627`.

- **PR:** [#86 — Reuse the canonical Android XML namespace in security fixtures](https://github.com/ErTapanJatakia/JestBox/pull/86) · [27/27 PR checks](https://github.com/ErTapanJatakia/JestBox/pull/86/checks)
- **Main commit:** [`8786bc4736da8269d6ad191533be364d99a61627`](https://github.com/ErTapanJatakia/JestBox/commit/8786bc4736da8269d6ad191533be364d99a61627) · [18/18 checks successful, 0 failed, 0 pending](https://github.com/ErTapanJatakia/JestBox/commit/8786bc4736da8269d6ad191533be364d99a61627/checks)
- **Android debug build:** [run #45072074677](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074677) — successful.
- **Hardened APK assessment:** [run #45072074597](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074597) — successful.
- **DevSkim:** [run #45072074598](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074598) · [SARIF artifact 14774055406](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074598/artifacts/14774055406) — **0 Errors, 0 Warnings, 25 Notes**.
- **Trivy:** [run #45072074554](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074554) — successful; five licence-inventory notes remain informational.
- **ZAP:** [run #45072074710](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074710) — successful against disposable local scan target only.
- **OSV-Scanner:** [run #45072074595](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074595) — successful.
- **njsscan:** [run #45072074800](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074800) — successful.
- **Gitleaks:** [run #45072074803](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074803) — successful.
- **zizmor:** [run #45072074590](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074590) — successful.
- **actionlint:** [run #45072074661](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074661) — successful.
- **Syft SBOM:** [run #45072074653](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074653) — successful.
- **Tablet browser validation:** [run #45072074571](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074571) — successful.

#### Remediation detail

The residual DevSkim `DS137138` warning at `tests/android-security-hardening.test.js:10` was caused by a second test-fixture spelling of Android's XML namespace identifier. PR #86 centralised the identifier in `tests/helpers/android-xml-namespace.mjs` and reused the exported constant in the fixture. The exact namespace value remains unchanged; a narrow, line-scoped `DS137138` suppression documents that this literal is an XML namespace identifier, not a network endpoint. Fresh main-branch SARIF reports zero warnings. No scanner rules, tests, assertions, or CI gates were removed or weakened.

#### Trivy licence alert lifecycle clarification

The five licence inventory alerts — #1 (`@capacitor/core`), #2 (`@capacitor/share`), #3 (`tslib`), #120 (`playwright`) and #121 (`playwright-core`) — were **dismissed earlier, as confirmed by the maintainer**. Their technical classification remains informational licence inventory, not vulnerability findings. The repository records the relevant attributions and licence texts; app dependency notices are included in the inspected APKs, while Playwright packages are isolated tablet CI tooling and were not found in inspected APK contents. This report records dismissal status based on maintainer confirmation, not independent live API verification of each GitHub alert state. Dismissal does not remove dependencies or extinguish applicable licence obligations.

#### Updated assurance tracker

| Workstream | Status | Evidence / boundary |
|---|---|---|
| PR #86 DevSkim fixture warning | Remediated and merged | Fresh main SARIF: 0 Errors, 0 Warnings, 25 Notes |
| PR #86 validation | Complete | 27/27 PR checks; 18/18 main commit checks |
| Android debug build and hardened APK assessment | Automated workflows passed | CI assessment only; not public release or distribution |
| Trivy licence alerts #1, #2, #3, #120, #121 | Dismissed per maintainer confirmation; compliance evidence documented | Not vulnerabilities; licence obligations remain |
| ZAP | Workflow passed; findings remain scoped to disposable local target | No production origin exists or was scanned |
| MobSF | Deferred by agreement | Tool reliability issues; not represented as passed |
| Human-led penetration test / rooted-device and TLS interception review | Not completed | Separate manual assessment |
| Production-edge HTTP security headers | Pre-deployment requirement | JestBox has not been deployed as a website |
| APK distribution / app-store submission | Not authorised; not performed | Requires separate explicit authorisation |

**Assessment boundary:** this checkpoint confirms automated repository, scanner, build and emulator workflows. It is not a certification, independent audit, guarantee of vulnerability-free software, human-led penetration test, production-host assessment or release approval. JestBox remains an Android APK project and has not been deployed as a website.


### Final automated assurance evidence reconciliation — 23 November 2026

This checkpoint consolidates the post-PR #86 evidence and reviews the retained raw ZAP reports rather than relying solely on the workflow's green conclusion.

#### OWASP ZAP raw-report review

- **Run:** [#45072074710](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074710)
- **Artifact:** [14773468836 — baseline and bounded active JSON/HTML reports plus summary](https://github.com/ErTapanJatakia/JestBox/actions/runs/45072074710/artifacts/14773468836)
- **Assessed commit:** `8786bc4736da8269d6ad191533be364d99a61627`
- **Target:** isolated disposable local static build at `127.0.0.1:8080`.
- **Baseline:** 0 High, 2 Medium, 6 Low, 2 Informational.
- **Bounded active scan:** 0 High, 2 Medium, 6 Low, 3 Informational.

The raw JSON confirms the recurring observations: CSP header absent; anti-clickjacking header absent; COEP, COOP, CORP, Permissions-Policy and X-Content-Type-Options absent; the local test server's Server header exposes version information; a source comment is flagged; static content is cacheable; and the active scan adds a User-Agent Fuzzer informational observation. The CORP and cacheability instance counts vary slightly between baseline and active reports, but no additional risk category or High finding appears.

**Disposition:** these are observations of the disposable local static test target and its Python serving layer. They do not establish the response-header posture of a production origin. Since JestBox has not been deployed as a website, no production-edge host was available or scanned. Retain production HTTP security-header verification as a pre-deployment control; do not alter the local test harness merely to make its report look cleaner. ZAP's successful execution is not a clean scan and is not a human-led penetration test.

#### Bearer SAST evaluation reconciliation

The previously inspected Bearer CLI v2.1.3 report remains a non-blocking evaluation, not an adopted required scanner. Its three SARIF observations were reviewed at source level: two DOM construction alerts in `scripts/legal-markdown-renderer.mjs` use safe DOM node/text APIs and an explicit link-protocol allowlist rather than an HTML-string injection sink; the diversity-audit logger emits aggregate locale/category/count metrics and not joke bodies, personal data, credentials or secrets. These are documented contextual false-positive dispositions for the observed data flows, not scanner suppressions. Preserve those safe construction and aggregate-only logging properties in future changes. Bearer is not claimed as a fresh PR #86 main-branch check.

#### Code Scanning alert-state evidence boundary

Source remediations and scanner SARIF results are documented separately from GitHub alert lifecycle. The available GitHub connection did not provide an independently readable individual Code Scanning alert-state endpoint during this reconciliation. Accordingly, this report does not claim that every source-remediated alert has been independently verified as Closed in GitHub's UI/API. The five Trivy licence alerts #1, #2, #3, #120 and #121 remain recorded as dismissed based on the maintainer's explicit confirmation, not independent API verification. The maintainer may inspect the [repository Code Scanning alerts](https://github.com/ErTapanJatakia/JestBox/security/code-scanning) for the live lifecycle state of any other alert.

#### Final automated checkpoint

- PR #86: 27/27 checks passed.
- PR #86 merge commit `8786bc4736da8269d6ad191533be364d99a61627`: 18/18 commit checks passed.
- Documentation/evidence commit `75d9d1a8cb2942d398c8df2f6cea3c65565fe537`: 16/16 commit checks passed.
- Fresh DevSkim SARIF: 0 Errors, 0 Warnings, 25 Notes.
- Trivy, OSV-Scanner, ZAP, njsscan, Gitleaks, zizmor, actionlint, Syft SBOM, tablet browser validation, Android debug build and hardened APK assessment workflows completed successfully for the recorded checkpoint.

**Overall conclusion:** the planned automated repository and Android build assurance for this checkpoint is complete and the evidence is recorded. This is not a claim of zero vulnerabilities or a formal security certification. MobSF remains deferred by agreement because of tool reliability issues. Human-led penetration testing, rooted-device and TLS-interception testing, and production-edge header verification remain outside the completed automated scope. JestBox has not been deployed as a website; no APK distribution or app-store submission was performed or authorised.


### External Android APK scanner reports — 23 November 2026

This section preserves the external scanner references supplied during the JestBox APK assessment. The links below are **historical evidence for the earlier assessment APK**, not evidence that the later hardened candidate was scanned by every service.

#### Earlier assessment APK

- **Package:** `com.jestbox.app`
- **Version:** `1.0` (versionCode `1`)
- **SHA-256:** `b1d6cd6eda2983cb9745f7c466aade3bf2318f4b4e191eeac274d2d8fa02684f`
- **ANY.RUN interactive analysis:** [Task report](https://app.any.run/tasks/95cbcaf1-0d41-4e46-8a15-495720d19d68)
- **VirusTotal:** [File report](https://www.virustotal.com/gui/file/b1d6cd6eda2983cb9745f7c466aade3bf2318f4b4e191eeac274d2d8fa02684f)
- **Hybrid Analysis:** [Sample report](https://hybrid-analysis.com/sample/b1d6cd6eda2983cb9745f7c466aade3bf2318f4b4e191eeac274d2d8fa02684f)
- **MobSF Live:** [Static analysis report](https://mobsf.live/static_analyzer/60ea6e1404ed7f63f3d09cedaa98ffc8)

The MobSF report for this APK recorded a score of **81/100 (Grade A / Low Risk)**, with four Medium findings and one Informational finding. The principal observations included a wildcard Cordova `<access origin="*">` policy, generic Capacitor framework patterns for sensitive information/external storage/temporary files, and logging. These are scanner observations requiring context; the score is not a security certification. The wildcard access policy was subsequently remediated and verified against the packaged APK as described in the Android origin-policy remediation section below.

#### Hardened assessment APK — MobSF follow-up

- **Build source:** PR [#92 — Fix Android packaged Cordova origin policy](https://github.com/ErTapanJatakia/JestBox/pull/92), head commit `59e42e064b359052a9917d03d5de24ad6af79611` (merged into main as `fb54d4fc85da7c8bd169b5733a9b656e46ad4587`).
- **Package:** `com.jestbox.app`
- **SHA-256:** `47848a2deb70530f4c0375e0f877914c448273a42f7fb24f7cbcff9b18d6dc71`
- **MobSF report:** user-supplied PDF, dated 23 November 2026 (419 pages; retained in the assessment conversation; no public report URL was supplied).
- **VirusTotal report for this exact APK:** [File report](https://www.virustotal.com/gui/file/47848a2deb70530f4c0375e0f877914c448273a42f7fb24f7cbcff9b18d6dc71).
- **Hybrid Analysis report for this exact APK:** [Sample report](https://hybrid-analysis.com/sample/47848a2deb70530f4c0375e0f877914c448273a42f7fb24f7cbcff9b18d6dc71).
- **MobSF score:** **85/100**.
- **Observed Code Analysis results:** three Warning-level findings and one Informational finding remained. The earlier wildcard-origin finding was no longer present.
- **Manifest summary:** no manifest-analysis findings reported; no trackers detected; declared permissions limited to `INTERNET` and the app-specific dynamic receiver permission; V3 signing detected.

The remaining MobSF observations were reviewed against the app and bundled Capacitor framework source. The hardcoded-sensitive-information heuristic did not identify a concrete application secret; external-storage and temporary-file alerts mapped to generic Capacitor URI/document/media and image-capture handling, with no corresponding JestBox file-picker/capture feature or broad storage permission; and the logging observation did not establish sensitive-data disclosure in the non-debuggable assessment APK. No exploitable application vulnerability was established from these four remaining observations, and no broad suppression or scanner-rule change was made. Retain the findings as contextual scanner observations rather than claiming they were removed.

**Build correlation matters:** the ANY.RUN report still refers to the earlier APK (SHA-256 `b1d6cd6d...`) and must not be represented as an analysis of the hardened APK. The MobSF, VirusTotal and Hybrid Analysis links in this subsection refer to the signed assessment APK (SHA-256 `47848a2d...`). The historical ANY.RUN link remains listed separately; no fresh ANY.RUN scan of the hardened APK is claimed.

#### Dynamic analysis status and release relationship

The GitHub Actions workflow `.github/workflows/mobsf-android-dynamic.yml` provides an optional, manually triggered isolated Android API 30 emulator/MobSF assessment. A previous successful run [#44545632539](https://github.com/ErTapanJatakia/JestBox/actions/runs/44545632539) predates the hardened APK and assessed commit `e31454274b9dd1b94a9b81c32d4afcf8bc0eaa89`; it is not a fresh dynamic assessment of the hardened candidate.

Dynamic analysis is supplementary vulnerability-discovery work, **not a release-blocking gate**. If the hosted emulator, MobSF integration, or dynamic instrumentation fails or proves unreliable, record the failure and coverage limitation, preserve existing CI/security controls, and continue the independent release-readiness work. Do not report a dynamic test as passed unless its run and evidence artifact complete successfully. This does not waive remediation of confirmed vulnerabilities or other established release requirements.

#### Android packaged Cordova origin-policy remediation — 23 November 2026

PR #92 replaced wildcard Cordova access with the explicit `http://localhost` origin after Capacitor sync and added fail-closed verification of the actual compiled APK resource. It was merged as commit `fb54d4fc85da7c8bd169b5733a9b656e46ad4587`.

- **PR checks:** [27 check runs](https://github.com/ErTapanJatakia/JestBox/pull/92/checks) completed successfully.
- **Android hardened APK assurance:** [run #45117675274](https://github.com/ErTapanJatakia/JestBox/actions/runs/45117675274).
- **Build / emulator / security workflow evidence:** [PR #92 checks](https://github.com/ErTapanJatakia/JestBox/pull/92/checks).

The DevSkim check completed successfully but reported **1 Warning and 10 Notes** on PR changes, largely around localhost test/configuration fixtures. A successful workflow conclusion means the scanner ran; it does not mean its observations are absent. These observations remain subject to contextual review and are not described as a warning-free scan. The packaged APK verifier confirmed exactly one Cordova access origin, `http://localhost`, with no wildcard or unapproved origin.

**Assessment boundary:** external sandbox reports, static APK analysis, source review, packaged-resource verification and automated emulator smoke testing are separate evidence types. None alone is a human-led penetration test, formal independent audit, certification, guarantee of vulnerability-free software, physical-device certification, or app-store acceptance. No public APK release or store submission is implied by these records.
