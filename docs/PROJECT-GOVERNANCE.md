# JestBox Project Governance

**Status:** Maintainer-governed project policy  
**Review cadence:** At least annually and after material ownership, architecture, or release changes.

## Purpose

This document describes how decisions, repository access, security-sensitive changes, and releases are governed for JestBox.

## Project scope

JestBox is a proprietary, offline-first Android joke application built from its canonical web application through Capacitor. The repository contains application source, joke content, Android build configuration, validation scripts, CI workflows, and security/release documentation. Public repository visibility does not grant permission to reuse, redistribute, or relicense proprietary project material.

## Decision authority

The repository maintainer is the final decision-maker for:
- project direction, scope, and acceptance of contributions;
- repository access, branch protection, and required checks;
- security response, risk acceptance, and disclosure coordination;
- signing, release approval, store submission, publication, and archival;
- changes to licensing, privacy posture, and supported distribution channels.

Technical reviewers and automated checks provide evidence; they do not independently authorize a release.

## Change control

- Changes are proposed through pull requests against `main`.
- Direct pushes to the protected default branch are not the normal change path.
- The active main ruleset requires pull requests, linear history, squash merges, resolution of review threads, and the configured required status checks.
- A passing CI run is necessary but not sufficient: the maintainer reviews scope, evidence, security impact, and release implications.
- Workflow, signing, dependency, privacy, and security-policy changes receive heightened scrutiny.
- Do not merge a pull request solely because its checks pass.

## Repository access

Grant the minimum access required for a defined task. Review access when responsibilities change and remove access when no longer needed. The current access-control evidence and any limitations are recorded in repository settings and review records; this document does not claim that an independent access review has occurred unless a dated record exists.

## Security-sensitive authority

Production signing is isolated in the manual-dispatch workflow and protected by the `production-signing` GitHub Environment. Signing, release publication, store submission, and durable archival remain distinct decisions. No workflow declaration alone is evidence that GitHub Environment settings are configured; the current signing record documents which settings were maintainer-confirmed and which were independently observable.

## Policy exceptions

Exceptions must identify the control, reason, scope, owner, compensating control, approval, and expiry/review date. Do not silently downgrade tests or remove required checks to obtain a green build.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial JestBox-specific governance document. |
