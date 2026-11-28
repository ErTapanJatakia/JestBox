# Internal Security Review — 2026-11-28

**Review type:** Internal, AI-assisted source/workflow/evidence review with maintainer authorization.  
**Independence:** Not an independent human review, external audit, certification or penetration test.  
**Scope:** JestBox source and Android packaging, GitHub workflows, production signing boundary, MobSF findings, ZAP evidence, artifact retention and repository governance.

## 1. Review method

Reviewed the recorded protected production signing workflow, exact APK verification evidence, MobSF machine-readable findings, Android manifest/package validation, relevant application/native integration behaviour, ZAP target scope, workflow configuration and current repository governance records.

## 2. Positive evidence

- Protected production signing is manual-dispatch, main-only and gated by the `production-signing` Environment.
- The successful protected run #46091336344 completed its substantive build, signing, APK verification, MobSF, artifact upload and temporary signing-material cleanup steps.
- The assessed APK package identity, version, SHA-256, RSA-4096 certificate fingerprint and APK Signature Scheme v3 were verified and recorded in SECURITY.md.
- MobSF reported 0 High, 3 Warning and 1 Informational finding; manifest analysis reported 0/0/0; no network-security findings, no hardcoded secrets detected by the report, and 0 trackers of 432.
- The warning observations were traced to bundled Capacitor framework classes. Source review did not establish an app-owned secret, a corresponding JestBox file-capture workflow, or sensitive-data disclosure.
- The main ruleset and required status checks were previously verified active. CI and Android debug validation passed for the documented main commit.

## 3. Findings and limitations

| Area | Review outcome | Required follow-up |
|---|---|---|
| MobSF framework warnings | Contextual static-analysis observations; no confirmed application vulnerability established | Reassess if file upload/download, camera capture or sensitive-data handling is introduced |
| ZAP | Historical local disposable test target only; 0 High, 2 Medium, 6 Low, 3 Informational | Assess real hosting headers only after an explicitly authorized deployment |
| Artifact retention | GitHub repository cap is 30 days despite longer workflow request | Preserve evidence under approved custody; permanent archive requires separate approval |
| DCO | Automated DCO trailer validation is not a required check; standard DCO 1.1 does not replace proprietary rights authorization | Use project-specific written authorization; do not claim DCO enforcement |
| Contributor independence | Governance remains single-maintainer | Do not claim independent review or multi-person approval |
| OpenSSF programme eligibility | JestBox is proprietary; Best Practices Badge is scoped to FLOSS; higher OSPS/Badge levels have eligibility prerequisites | Confirm programme applicability before formal attestation |

## 4. Overall conclusion

The reviewed evidence supports the existence of several meaningful repository, build, signing and static-analysis safeguards. It does not establish that JestBox is vulnerability-free, formally certified, independently audited, penetration-tested, or accepted by an app store. No production website deployment, store submission, public APK distribution or permanent artifact archive is claimed.

## 5. Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial internal review based on recorded workflow and assessment evidence. |
