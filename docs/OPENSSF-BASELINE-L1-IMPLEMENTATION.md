# OpenSSF OSPS Baseline Level 1 — JestBox Assessment

Assessment date: 2026-11-28  
Criteria snapshot: v2026.08.28, current official version confirmed on 2026-11-28; recheck before every formal assessment.  
Repository: ErTapanJatakia/JestBox  
Scope: source, documentation, Android application, Capacitor packaging and GitHub automation.

> This is an internal assessment register, not an OpenSSF award, certification or independent audit. JestBox's proprietary licence fails OSPS-LE-02.01 and OSPS-LE-02.02, which require OSI- or FSF-compliant open-source licences for both source code and released software assets. JestBox is therefore not eligible to claim formal OSPS Baseline compliance while proprietary. Controls are retained solely as internal security benchmarks.

## Assessment summary

**Not eligible for formal attestation while proprietary; not scored.** OSPS-LE-02.01 and OSPS-LE-02.02 require OSI- or FSF-compliant open-source licences for source code and released software assets. This is an internal gap-analysis register only. Verify exact current controls and evidence for internal benchmarking. See [OpenSSF Eligibility and Applicability](OPENSSF-ELIGIBILITY-AND-APPLICABILITY.md).


## Control assessment method

Assess each official Level 1 control individually. Record the exact criterion identifier and wording from the official criteria, evidence path or platform setting, evidence date/commit, outcome, rationale, and remediation owner.

| Control area | JestBox evidence to inspect | Initial status |
|---|---|---|
| Project identity and documentation | README, user guide, supported locales, scope, license | Not assessed — internal only |
| Change control | Main ruleset, PR requirements, status checks, review records | Not assessed — internal only |
| Reporting and vulnerability handling | SECURITY.md, private reporting setting, response records | Not assessed — internal only |
| Quality and testing | Regression tests, build instructions, QA workflows | Not assessed — internal only |
| Security practices | Threat model, dependency policy, secret handling, SAST and SBOM | Not assessed — internal only |
| Release and provenance | Protected signing workflow, APK verification and release policy | Not assessed — internal only |

## Evidence guardrails

- A workflow file proves configuration exists, not that it ran successfully.
- A passing check proves only the scope of that check for its recorded commit.
- A policy is not proof that a process has operated.
- Platform settings require live inspection or clearly labelled maintainer confirmation.
- A signed commit, written authorization policy, per-commit legal assertion and automated required-check enforcement are distinct controls.
- Do not convert Unverified to Met merely because a document was added.
- N/A requires a criterion-specific applicability rationale.

## Reassessment triggers

Reassess after changes to official criteria, application scope, release model, repository settings, security workflows, contributor model or evidence. Record the exact criteria version and assessment date.


## Official control inventory — v2026.08.28

The identifiers below are transcribed from the official v2026.08.28 control overview. These entries are provided for internal benchmarking only. Because JestBox's proprietary licence fails OSPS-LE-02.01 and OSPS-LE-02.02, this register is not a formal compliance assessment. No control is marked Met.

| Control ID | Control summary | Internal status |
|---|---|---|
| OSPS-AC-01.01 | Require MFA for sensitive repository resources | Not assessed — internal only |
| OSPS-AC-02.01 | Restrict new collaborator permissions | Not assessed — internal only |
| OSPS-AC-03.01 | Prevent direct commits to the primary branch | Not assessed — internal only |
| OSPS-AC-03.02 | Protect the primary branch from deletion | Not assessed — internal only |
| OSPS-BR-01.01 | Validate untrusted CI metadata | Not assessed — internal only |
| OSPS-BR-01.03 | Isolate untrusted code from privileged CI resources | Not assessed — internal only |
| OSPS-BR-03.01 | Use encrypted channels for official project channels | Not assessed — internal only |
| OSPS-BR-03.02 | Protect official distribution channels against interception | Not assessed — internal only |
| OSPS-BR-07.01 | Prevent unencrypted secrets in version control | Not assessed — internal only |
| OSPS-DO-01.01 | Provide basic user guides | Not assessed — internal only |
| OSPS-DO-02.01 | Provide defect-reporting instructions | Not assessed — internal only |
| OSPS-GV-02.01 | Provide public discussion mechanisms | Not assessed — internal only |
| OSPS-GV-03.01 | Document contribution process or state contributions are not accepted | Not assessed — internal only |
| OSPS-LE-02.01 | Source licence meets OSI or FSF open-source definition | Not assessed — internal only |
| OSPS-LE-02.02 | Released software asset licence meets OSI or FSF definition | Not assessed — internal only |
| OSPS-LE-03.01 | Maintain source licence in a recognized repository location | Not assessed — internal only |
| OSPS-LE-03.02 | Include licence terms with release assets | Not assessed — internal only |
| OSPS-QA-01.01 | Make source repository publicly readable at a static URL | Not assessed — internal only |
| OSPS-QA-01.02 | Maintain public change history with author and timestamp | Not assessed — internal only |
| OSPS-QA-02.01 | Include direct dependency inventory where supported | Not assessed — internal only |
| OSPS-QA-04.01 | Document project codebases when multiple repositories are used | Not assessed — internal only |
| OSPS-QA-05.01 | Exclude generated executable artifacts from version control | Not assessed — internal only |
| OSPS-QA-05.02 | Exclude unreviewable binary artifacts from version control | Not assessed — internal only |
| OSPS-VM-02.01 | Publish security contacts | Not assessed — internal only |
