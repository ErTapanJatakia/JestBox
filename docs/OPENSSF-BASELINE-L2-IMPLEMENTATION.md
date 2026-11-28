# OpenSSF OSPS Baseline Level 2 — JestBox Assessment

Assessment date: 2026-11-28  
Criteria snapshot: v2026.08.28, confirmed as the current official version on 2026-11-28. Recheck before every formal assessment.  
Repository: ErTapanJatakia/JestBox

> Internal evidence register only. It is not an OpenSSF award, certification or independent audit. JestBox's proprietary licence fails OSPS-LE-02.01 and OSPS-LE-02.02; no formal OSPS Baseline level can be claimed while the project remains proprietary. Level 2's maintainer/user eligibility requirements are additional prerequisites, not substitutes for the licensing requirement.

## Assessment summary

**Not eligible for formal attestation while proprietary; not scored.** OSPS-LE-02.01 require OSI- or FSF-compliant open-source licences for both source code and released software assets. This is an internal gap-analysis register only. Verify exact current controls and evidence for internal benchmarking. See [OpenSSF Eligibility and Applicability](OPENSSF-ELIGIBILITY-AND-APPLICABILITY.md).


## Assessment focus

Level 2 assessment must establish both applicability/eligibility and evidence for every official control. Do not assume that a single-maintainer project automatically satisfies any multi-maintainer or operational maturity condition.

| Control area | Evidence required | Initial status |
|---|---|---|
| Maintainer/project eligibility | Current contributor and maintainer roles, sustained project use where required | Unverified |
| Change control | PR/ruleset settings, review and required-check records | Unverified |
| Contributor identity and authorization | Project-specific written contributor authorization, commit-level assertion mechanism and required-check state | Unverified |
| Build and test reproducibility | Toolchain versions, lockfiles, build instructions, CI runs | Unverified |
| Security response | Private reporting configuration, response history and disclosure process | Unverified |
| Dependency and supply-chain assurance | SBOM, dependency review, pinned actions, vulnerability scans | Unverified |
| Release integrity | Protected signing, artifact identity, provenance and verification | Unverified |

## Contributor authorization status

JestBox uses a project-specific written contributor authorization policy because the project is proprietary. This is not standard DCO 1.1. Commit-level assertion and automated required-check enforcement are not currently implemented. Any criterion requiring a per-commit legal authorization assertion remains Unverified or Unmet as determined by the exact criterion; documentation alone is insufficient.

## Evidence guardrails

Record exact criterion ID/text, applicability, evidence path, commit/run ID, observation date, status, rationale and remediation. Never infer control effectiveness from another repository's assessment. N/A requires a criterion-specific rationale and must not be used to conceal a missing control.


## Official control inventory — v2026.08.28

The identifiers below are transcribed from the official v2026.08.28 control overview. These entries are provided for internal benchmarking only. Because JestBox's proprietary licence fails OSPS-LE-02.01, this register is not a formal compliance assessment. No control is marked Met.

| Control ID | Control summary | Internal status |
|---|---|---|
| OSPS-AC-04.01 | Default CI task permissions to least privilege | Not assessed — internal only |
| OSPS-BR-02.01 | Assign unique version identifiers to releases | Not assessed — internal only |
| OSPS-BR-04.01 | Include functional and security change logs in releases | Not assessed — internal only |
| OSPS-BR-05.01 | Use standardized dependency tooling where available | Not assessed — internal only |
| OSPS-BR-06.01 | Sign releases or provide signed hash manifests | Not assessed — internal only |
| OSPS-DO-06.01 | Document dependency selection, acquisition and tracking | Not assessed — internal only |
| OSPS-DO-07.01 | Document complete build instructions and dependencies | Not assessed — internal only |
| OSPS-GV-01.01 | Document project members with sensitive-resource access | Not assessed — internal only |
| OSPS-GV-01.02 | Document project member roles and responsibilities | Not assessed — internal only |
| OSPS-GV-03.02 | Document acceptable contribution requirements | Not assessed — internal only |
| OSPS-LE-01.01 | Require per-commit legal authorization assertions | Not assessed — internal only |
| OSPS-QA-03.01 | Require automated checks to pass before primary-branch commit | Not assessed — internal only |
| OSPS-QA-06.01 | Run an automated test suite before accepting commits | Not assessed — internal only |
| OSPS-SA-01.01 | Document system actors and actions | Not assessed — internal only |
| OSPS-SA-02.01 | Document external software interfaces | Not assessed — internal only |
| OSPS-SA-03.01 | Perform a project security assessment | Not assessed — internal only |
| OSPS-VM-01.01 | Publish coordinated vulnerability disclosure policy and response timeframe | Not assessed — internal only |
| OSPS-VM-03.01 | Provide private vulnerability reporting | Not assessed — internal only |
| OSPS-VM-04.01 | Publish vulnerability data | Not assessed — internal only |
