# JestBox Regression Test Review Process

## Purpose

Maintain traceability between defects, fixes and regression coverage. This document defines the review method; it does not claim that every historical defect has already been mapped or that test coverage is complete.

## Required review method

For each material bug fix:
1. Record the issue/PR and affected behaviour.
2. Identify the root cause and regression risk.
3. Add a test that fails before the fix and passes after it, where practical.
4. Run the focused test and relevant full suite.
5. Record exact commit, run ID, job result and any skipped checks.
6. Confirm the test was not weakened or deleted during remediation.

## Review areas

- Locale detection, selection persistence and right-to-left rendering.
- Joke content counts, categories, uniqueness and script validation.
- Daily/random selection and no-immediate-repeat behaviour.
- Clipboard and native/browser sharing.
- Legal markdown rendering and third-party notices.
- Accessibility settings and responsive behaviour.
- Android manifest, package identity, permissions, exported components, signature and alignment.
- Workflow security, artifact retention and production signing.

## Three-failure rule

After three consecutive failures of the same test/CI strategy, stop repeating it. Change the diagnostic or implementation strategy, or defer. Do not weaken or delete tests.

## Review record template

| Date | Issue/PR | Defect and root cause | Regression test | Run/commit | Result | Follow-up |
|---|---|---|---|---|---|---|

Only populate completed rows with verified evidence.
