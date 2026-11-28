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
