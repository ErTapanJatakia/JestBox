# JestBox Security Assurance Case

Assessment date: 2026-11-28. Scope: application source, Capacitor Android packaging, GitHub workflows, dependencies, secrets, production signing and security evidence.

This is an internal structured assurance argument, not an independent audit, certification, penetration test or guarantee of defect absence.

## Top-level claim G0

JestBox uses proportionate, documented and testable safeguards to protect application integrity, user privacy, repository changes, signing credentials and release artifacts.

## Context and assumptions

- JestBox is an offline-first joke application built using a web application and Capacitor Android packaging.
- GitHub provides repository hosting, branch rulesets, Actions and configured security integrations within their documented scope.
- Security evidence is time-bound and must be refreshed after material changes.
- A green CI run proves only the checks that actually ran for the recorded commit.
- User/device OS and GitHub account security remain external trust assumptions.

## Claim decomposition

| Claim | Evidence | Residual risk |
|---|---|---|
| Changes are controlled | Main ruleset, PR workflow, required checks, resolved review threads and QA policy | Maintainer review is not independent multi-person review |
| Signing material is protected | Manual main-only protected signing workflow, Environment gate, least-privilege permissions, cleanup and signing verification | Some Environment settings are maintainer-confirmed; artifact retention is temporary |
| Android package is assessed | Manifest/config/signature/alignment/checksum validation and MobSF static analysis | Static analysis does not establish runtime safety |
| Dependencies are monitored | Dependabot, dependency review, OSV, Trivy and SBOM workflows | Scanner coverage and ecosystem inventories are incomplete by nature |
| Secrets are controlled | GitHub secret storage, Gitleaks, protected signing job and secrets policy | Secret values cannot be inspected through repository APIs |
| Application behaviour is tested | Node regression tests, syntax checks, Android build validation and tablet responsive checks | Automated coverage is not exhaustive device or manual testing |
| Vulnerabilities can be reported | SECURITY.md reporting and coordinated disclosure process | Response performance must be measured from actual reports |

## Verification plan

- Re-run relevant CI checks for every material change.
- Inspect exact APK manifest, package identity, signature, alignment and checksum.
- Correlate security reports with the same artifact hash.
- Review dependencies and workflow permissions.
- Reassess after adding network, file, camera, account, telemetry or sensitive-data features.
- Refresh evidence after workflow, ruleset, Environment or signing changes.

## Explicit limitations

- No independent third-party penetration test is claimed.
- No production-hosted web endpoint is claimed as assessed by the local ZAP run.
- No store acceptance, publication or public distribution is claimed.
- CI artifact retention is temporary and currently capped at 30 days.
- Automated DCO trailer validation is not currently enforced as a required check. DCO 1.1 is an open-source contribution-origin certification, not a proprietary rights assignment. JestBox requires project-specific written contributor authorization and separate rights terms; any future sign-off mechanism must complement, not replace, that agreement.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial JestBox-specific assurance case. |
