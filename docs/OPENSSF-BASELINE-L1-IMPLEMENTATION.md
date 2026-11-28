# OpenSSF OSPS Baseline Level 1 — JestBox Assessment

Assessment date: 2026-11-28  
Criteria snapshot: v2026.08.28, inherited as the initial assessment reference; verify the latest official criteria before submitting answers.  
Repository: ErTapanJatakia/JestBox  
Scope: source, documentation, Android application, Capacitor packaging and GitHub automation.

> This is an internal assessment register, not an OpenSSF award, certification or independent audit. No compliance result is asserted by this initial register. Controls remain Unverified until mapped to current evidence.

## Assessment summary

**Not scored.** This is an internal gap-analysis register only. Exact current control IDs, wording, applicability and evidence must be imported from the official v2026.08.28 catalogue before assigning outcomes. JestBox is proprietary; consult [OpenSSF Eligibility and Applicability](OPENSSF-ELIGIBILITY-AND-APPLICABILITY.md) before any formal attestation.


## Control assessment method

Assess each official Level 1 control individually. Record the exact criterion identifier and wording from the official criteria, evidence path or platform setting, evidence date/commit, outcome, rationale, and remediation owner.

| Control area | JestBox evidence to inspect | Initial status |
|---|---|---|
| Project identity and documentation | README, user guide, supported locales, scope, license | Unverified |
| Change control | Main ruleset, PR requirements, status checks, review records | Unverified |
| Reporting and vulnerability handling | SECURITY.md, private reporting setting, response records | Unverified |
| Quality and testing | Regression tests, build instructions, QA workflows | Unverified |
| Security practices | Threat model, dependency policy, secret handling, SAST and SBOM | Unverified |
| Release and provenance | Protected signing workflow, APK verification and release policy | Unverified |

## Evidence guardrails

- A workflow file proves configuration exists, not that it ran successfully.
- A passing check proves only the scope of that check for its recorded commit.
- A policy is not proof that a process has operated.
- Platform settings require live inspection or clearly labelled maintainer confirmation.
- A signed commit is not DCO sign-off; a DCO policy is not automated DCO enforcement.
- Do not convert Unverified to Met merely because a document was added.
- N/A requires a criterion-specific applicability rationale.

## Reassessment triggers

Reassess after changes to official criteria, application scope, release model, repository settings, security workflows, contributor model or evidence. Record the exact criteria version and assessment date.
