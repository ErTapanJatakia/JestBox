# JestBox Static Application Security Testing Policy

## Objective

Use static analysis to identify potentially unsafe application code, dependencies, workflow configuration, secrets, and Android packaging patterns before release.

## Current controls

The repository currently includes automated checks such as DevSkim, njsscan, Gitleaks, Trivy, OSV Scanner, Zizmor, actionlint, Bearer evaluation, and other workflow-defined validation. The exact scope and trigger for each tool are defined in its workflow.

## Operating requirements

- Pin scanner actions/containers to reviewed versions or immutable references where practical.
- Use least-privilege workflow permissions and disable persisted checkout credentials unless needed.
- Treat scanner output as triage input, not automatically as a confirmed vulnerability.
- Review findings against source, packaged artifact, manifest, and reachable application behaviour.
- Record false-positive or not-applicable dispositions with evidence and reassessment triggers.
- Do not suppress or dismiss alerts solely to improve dashboard status.
- Re-run relevant analysis after remediation and verify the resulting commit/artifact.

## Limitations

Static analysis cannot prove runtime safety, exploitability, absence of vulnerabilities, or store compliance. MobSF static results do not substitute for dynamic testing or manual penetration testing. ZAP results against a local test server do not establish production hosting security.

## Evidence

Each assessment record should identify tool/version, commit, target, run URL, result, findings, disposition, and coverage limitations.
