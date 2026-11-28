# JestBox Access and Collaborator Governance

## Sensitive resources

Sensitive resources include repository administration, branch rulesets, GitHub Actions secrets and variables, production signing Environment settings, keystore material, security alert configuration, release artifacts and publication permissions.

## Least privilege

Grant the minimum repository and organization permission needed for a defined responsibility. Separate read, write, maintain and administrative capabilities. Do not infer access from a person's participation in a discussion or pull request.

## Current verified controls

- The main-protection ruleset is active and prevents force pushes and branch deletion.
- Changes to main require pull requests and configured status checks; squash merge and linear history are required.
- Production signing is isolated in the production-signing GitHub Environment and is restricted to main according to maintainer-confirmed settings.
- The Environment reviewer and wait-timer configuration is maintainer-confirmed; the configured reviewer is the repository owner, so this is an auditable checkpoint rather than independent two-person approval.
- Public documentation must not expose private account details, sensitive vetting information or secret values.

## Access review

Review collaborators, teams, outside collaborators, Actions permissions, Environment reviewers, secrets/variables, deploy keys, webhooks and app installations:
- at least annually;
- before granting elevated access;
- after role changes or departure;
- after suspected account compromise;
- after signing, release or deployment architecture changes.

A review record must state date, scope, verified roles, exceptions and remediation. Do not claim a review occurred unless a dated record exists.

## Privilege escalation

Require a documented need, owner approval, minimum scope, MFA where supported, expiry/review date and confirmation that access was removed or reduced when no longer needed.

## Continuity

A single maintainer creates availability and continuity risk. Do not claim independent approval or two-person review where no independent authorized reviewer exists.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial policy. Live account-level inventory remains a separate verification task. |
