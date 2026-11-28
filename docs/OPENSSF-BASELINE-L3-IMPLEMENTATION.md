# OpenSSF OSPS Baseline Level 3 — JestBox Assessment

Assessment date: 2026-11-28  
Criteria snapshot: v2026.08.28, confirmed as the current official version on 2026-11-28. Recheck before every formal assessment.  
Repository: ErTapanJatakia/JestBox

> Internal evidence register only. It is not an OpenSSF award, certification or independent audit. JestBox's proprietary licence fails OSPS-LE-02.01 and OSPS-LE-02.02; no formal OSPS Baseline level can be claimed while the project remains proprietary. This Level 3 register is retained only as an internal high-assurance benchmark.

## Assessment summary

**Not eligible for formal attestation while proprietary; not scored.** OSPS-LE-02.01 and OSPS-LE-02.02 require OSI- or FSF-compliant open-source licences for both source code and released software assets. This is an internal gap-analysis register only. Verify exact current controls and evidence for internal benchmarking. See [OpenSSF Eligibility and Applicability](OPENSSF-ELIGIBILITY-AND-APPLICABILITY.md).


## High-assurance evidence areas

| Control area | Evidence required | Initial status |
|---|---|---|
| Advanced project and maintainer eligibility | Current project profile, maintainer roles and official eligibility conditions | Unverified |
| Strong change review and provenance | Ruleset, review records, signed commits/tags where required, attestations | Unverified |
| Secure development lifecycle | Threat model, security reviews, regression coverage and vulnerability response | Unverified |
| Build/release integrity | Reproducible build inputs, artifact provenance, signing and verification | Unverified |
| Supply-chain security | Complete dependency inventory, SBOM, provenance, vulnerability management | Unverified |
| Operational resilience | Access review, continuity, incident handling and recovery evidence | Unverified |

## Assessment rules

- Copy exact control identifiers and current official wording into the detailed assessment before scoring.
- Distinguish policy, implementation, operational evidence and independent verification.
- A maintainer confirmation must be labelled as such.
- A CI workflow configuration does not prove a successful execution.
- A successful signed build does not prove reproducibility or store acceptance.
- Do not claim multi-person review or independent approval if the actual operating model is single-maintainer.
- Record N/A only where the official criterion permits it and the project facts support it.

## Reassessment triggers

Reassess on criteria revisions, new maintainers, new release channels, material architecture changes, or new evidence. Do not pursue a Level 3 claim before lower-level prerequisites and eligibility are established.


## Official control inventory — v2026.08.28

The identifiers below are transcribed from the official v2026.08.28 control overview. These entries are provided for internal benchmarking only. Because JestBox's proprietary licence fails OSPS-LE-02.01 and OSPS-LE-02.02, this register is not a formal compliance assessment. No control is marked Met.

| Control ID | Control summary | Internal status |
|---|---|---|
| OSPS-AC-04.02 | Assign minimum necessary permissions to CI jobs | Not assessed — internal only |
| OSPS-BR-01.04 | Validate trusted collaborator input to CI | Not assessed — internal only |
| OSPS-BR-02.02 | Associate every release asset with a unique identifier | Not assessed — internal only |
| OSPS-BR-07.02 | Maintain a secrets and credentials management policy | Not assessed — internal only |
| OSPS-DO-03.01 | Document release integrity and authenticity verification | Not assessed — internal only |
| OSPS-DO-03.02 | Document expected release author/process identity verification | Not assessed — internal only |
| OSPS-DO-04.01 | Document support scope and duration per release | Not assessed — internal only |
| OSPS-DO-05.01 | Document end-of-support and security-update policy | Not assessed — internal only |
| OSPS-GV-04.01 | Review collaborators before escalating sensitive access | Not assessed — internal only |
| OSPS-QA-02.02 | Deliver compiled release assets with an SBOM | Not assessed — internal only |
| OSPS-QA-04.02 | Require subprojects to enforce equivalent security requirements | Not assessed — internal only |
| OSPS-QA-06.02 | Document when and how tests are run | Not assessed — internal only |
| OSPS-QA-06.03 | Require major changes to add or update automated tests | Not assessed — internal only |
| OSPS-QA-07.01 | Require non-author human approval before primary-branch merge | Not assessed — internal only |
| OSPS-SA-03.02 | Perform threat modelling and attack-surface analysis | Not assessed — internal only |
| OSPS-VM-04.02 | Use VEX for non-exploitable component vulnerabilities | Not assessed — internal only |
| OSPS-VM-05.01 | Define remediation thresholds for SCA findings | Not assessed — internal only |
| OSPS-VM-05.02 | Define release-blocking policy for SCA violations | Not assessed — internal only |
| OSPS-VM-05.03 | Automatically evaluate and block dependency-policy violations | Not assessed — internal only |
| OSPS-VM-06.01 | Define remediation thresholds for SAST findings | Not assessed — internal only |
| OSPS-VM-06.02 | Automatically evaluate and block SAST-policy violations | Not assessed — internal only |
