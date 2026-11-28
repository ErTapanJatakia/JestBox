# JestBox Multi-Repository and Subproject Security Policy

## Current structure

The current assessment target is the JestBox repository and its application/Android packaging. External providers, app stores, browsers and operating systems are dependencies or trust boundaries, not automatically JestBox-owned subprojects.

## If subprojects are introduced

Before a release or product scope includes multiple independently maintained repositories:
1. Inventory every repository, owner, purpose, primary branch and release relationship.
2. Assign an accountable maintainer for each subproject.
3. Require each subproject to maintain a security policy, vulnerability reporting path, dependency controls, least-privilege CI and release integrity appropriate to its risk.
4. Map shared dependencies, interfaces and data flows.
5. Define vulnerability coordination and supported-version responsibilities.
6. Review the aggregate release and each subproject's evidence.

## Applicability

Do not claim multi-repository governance or subproject controls are implemented unless additional repositories are actually in scope and their controls have been verified.
