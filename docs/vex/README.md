# JestBox VEX Register

This directory is reserved for project-specific Vulnerability Exploitability eXchange statements when a real vulnerability has been assessed against an identified JestBox component and build.

## Current state

No VEX exception is asserted by this directory. The presence of this README does not mean an advisory has been assessed or classified as not affected.

## Adding a statement

1. Identify the exact advisory (for example, GHSA/CVE), component name, version and package URL.
2. Identify the exact JestBox source revision, build/version and artifact digest in scope.
3. Determine reachability and applicability using reproducible evidence.
4. Create a statement using the selected VEX specification and a validator compatible with the generated SBOM format.
5. Record status, justification, evidence, author, date, expiry/review date and approval.
6. Validate the statement and ensure it matches the component identity in the SBOM.
7. Reassess when the component, configuration, build, advisory or evidence changes.

Do not use VEX to hide findings, bypass remediation, or convert missing evidence into a not-affected conclusion. No machine-enforced exception allowlist is currently declared by this document.
