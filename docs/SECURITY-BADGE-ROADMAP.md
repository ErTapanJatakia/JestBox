# JestBox OpenSSF and Security Assurance Roadmap

## Purpose

This roadmap tracks evidence-led improvements for repository security and OpenSSF assessment. A badge, workflow or policy document is not proof by itself. Use current official criteria and the live repository state.

## Workstreams

### 1. Baseline and governance
- Verify project identity, proprietary licence and contribution authorization.
- Confirm repository visibility, default branch and branch protection.
- Verify vulnerability reporting and security contact settings.
- Keep governance, access and release policies aligned with actual operations.

### 2. Build and test assurance
- Maintain reproducible Node/npm setup using the lockfile.
- Maintain regression tests for application, content, legal rendering and Android validators.
- Record device/browser/assistive-technology limitations.
- Preserve the three-failure rule.

### 3. Supply-chain assurance
- Review Dependabot, Dependency Review, OSV, Trivy and SBOM output.
- Verify Action pinning, container digests and downloaded tool integrity.
- Maintain dependency/license inventory with exact versions and authoritative license evidence.
- Do not create VEX exceptions without component-specific evidence.

### 4. Security testing
- Maintain CodeQL and supported language scanners, secret scanning, workflow analysis, MobSF and ZAP with clear scope.
- Distinguish static, dynamic, local and production assessments.
- Triage all findings with evidence; do not suppress to improve badge status.

### 5. Release integrity
- Preserve main-only protected production signing and Environment gates.
- Verify package identity, signing certificate, signature scheme, alignment and checksum.
- Correlate MobSF evidence to the exact APK.
- Respect artifact retention and explicit archive/publication approval boundaries.

### 6. OpenSSF assessment
- Assess each official OSPS Baseline level independently.
- Assess Passing, Silver and Gold criteria independently and cumulatively.
- Record exact criterion ID, wording, status, evidence path, date, commit/run and rationale.
- Use N/A only with a defensible criterion-specific applicability rationale.
- Submit answers only after the evidence is verified in the official assessment service.

## Immediate evidence gaps

- Confirm current official criteria revisions and eligibility.
- Complete the criterion-by-criterion evidence mapping; do not rely on provisional counts in draft registers.
- Independently inspect platform settings where repository APIs do not expose them.
- Complete the dependency/license inventory from lockfiles, Action references and actual license texts.
- Verify the post-change scheduled transient-artifact cleanup run.
- Complete DCO/contributor-signoff design only after resolving compatibility with JestBox's proprietary licence. Standard DCO 1.1 is intended for contributions submitted under an open-source licence and must not be represented as a proprietary assignment instrument.

## Status discipline

Use Met, Partial, Unmet, N/A and Unverified internally. The official OpenSSF service may use a different status vocabulary. Never report an award or achieved level until it is actually awarded by the relevant official programme.
