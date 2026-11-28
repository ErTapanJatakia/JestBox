# JestBox Repository Quality Assurance Policy

## 1. Purpose and scope

This policy defines the minimum evidence expected for changes to JestBox source, content, Android packaging, workflows, and project documentation.

## 2. Validation model

Validation is layered:
1. Static syntax and structural checks.
2. Unit/regression tests for application behaviour and content integrity.
3. Android build and package validation.
4. Security and supply-chain analysis.
5. Responsive/device-oriented checks where applicable.
6. Human review of scope, risk, and evidence.

No single scanner or green workflow proves the application is secure.

## 3. Pull request acceptance

A pull request should:
- explain the user-visible or repository-level change;
- identify affected components, locales, workflows, permissions, and dependencies;
- include regression tests for changed behaviour;
- update relevant documentation;
- pass the branch ruleset's required checks;
- resolve review conversations;
- avoid unrelated changes and unexplained generated files.

Security-sensitive changes require explicit review of threat impact, least privilege, data handling, and rollback implications.

## 4. Major changes

Treat changes to Android architecture, application identity, signing, permissions, network access, dependencies, CI permissions, release workflows, privacy behaviour, and vulnerability handling as major/security-sensitive.

Require targeted tests and evidence. For signing changes, preserve key custody and verify the exact signed artifact. For dependency changes, inspect advisories, provenance, licenses, and transitive impact.

## 5. Failure policy

Inspect every failure. Do not dismiss or suppress a finding without documented rationale. If the same test/CI strategy fails three consecutive times, stop repeating that strategy and redesign or defer. Tests must not be weakened or deleted to obtain a green pipeline.

## 6. Evidence

For significant checks, record:
- repository and commit SHA;
- workflow/run/job identifiers;
- tool and version;
- scope and target;
- outcome and material findings;
- artifact identifiers and retention limits;
- exclusions and limitations.

A skipped step is not a pass. A historical result is not proof of current state. A static scan is not a penetration test.

## 7. Review

The maintainer reviews this policy at least annually and after material changes to architecture, release process, or CI controls.
