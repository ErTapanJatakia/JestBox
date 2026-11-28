# JestBox Vulnerability Exploitability eXchange (VEX) Process

## Purpose

Use VEX to communicate whether a known vulnerability in an identified component affects a specific JestBox build or release. VEX is not a mechanism for hiding alerts or avoiding remediation.

## Applicability and current state

JestBox generates SBOM evidence and uses dependency/security scanners. A VEX exception must not be created merely because a finding is inconvenient. Before adding VEX exceptions, confirm the actual SBOM format, component identifiers, validator and workflow integration. No exception is implied by this policy.

## Status semantics

Use only status values supported by the selected VEX specification and validator:
- **affected:** vulnerability applies; track remediation.
- **not_affected:** permitted only with specific evidence and recognized justification.
- **under_investigation:** evidence is incomplete; retain finding and set owner/review date.
- **fixed:** use only after corrected component/build is verified.

Do not convert uncertainty into not_affected.

## Required evidence

Identify exact component (including package URL or equivalent), vulnerability/advisory ID, affected version range, JestBox version/build or artifact digest, status, justification, supporting evidence, author, date and review trigger.

## Approval and lifecycle

The maintainer approves publication. Review when component version, app configuration, advisory details, reachability, build artifact or evidence changes. Revoke or update stale statements.

## Non-exceptionable findings

Do not use VEX to waive malware detection, signing-integrity failures, secret exposure, or a confirmed exploitable issue without a valid specification-supported rationale. Preserve scanner findings and remediation evidence.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial process; no blanket exceptions asserted. |
