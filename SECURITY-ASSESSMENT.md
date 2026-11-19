# JestBox Security Assessment Programme

## Purpose and boundaries

This document describes repository-level automated security checks. These checks are defensive assurance controls; they do not constitute a penetration test, independent audit, certification, or proof that the application is vulnerability-free.

The scope includes the eight-locale JavaScript application, npm dependencies, GitHub Actions workflows, repository supply-chain posture, and the generated Android debug APK. Production signing, app-store submission, hosted production testing, and dynamic Android testing are outside this automation.

## Automated tools and report locations

| Tool | Coverage | GitHub Security / check surface | Downloadable report |
|---|---|---|---|
| GitHub CodeQL default setup | JavaScript/TypeScript and GitHub Actions analysis managed by GitHub | Security → Code scanning | GitHub code-scanning findings and workflow logs |
| OSV-Scanner | Known vulnerabilities in discoverable dependency manifests/lockfiles | SARIF uploaded to code scanning | SARIF + Markdown summary, 30 days |
| Trivy | Filesystem dependencies, secrets, misconfigurations and licence findings | SARIF uploaded to code scanning | SARIF + Markdown summary, 30 days |
| Microsoft DevSkim | Secure-coding rules for source files | SARIF uploaded to code scanning | SARIF + Markdown summary, 30 days |
| Dependency Review | Dependency changes introduced by pull requests | Pull-request check | Markdown run summary, 30 days; package-level details remain in check logs |
| OpenSSF Scorecard | Repository and software supply-chain security posture | Workflow summary | JSON report, 30 days |
| MobSF | Static analysis of the generated Android debug APK | Workflow summary | JSON + Markdown summary, 30 days |

Each SARIF-based workflow uploads the original SARIF to GitHub code scanning and archives that same machine-readable file alongside a human-readable Markdown summary. Summaries include commit and workflow-run references. SARIF error, warning, and note levels are scanner classifications and are not a universal CVSS severity mapping.

## Trigger schedule

- CodeQL: managed by the repository's existing GitHub default setup; analysis is visible in Security/Actions surfaces. No duplicate advanced-setup workflow is added.
- OSV, Trivy and DevSkim: pushes to main, pull requests targeting main, weekly schedule, and manual dispatch.
- Dependency Review: pull requests targeting main.
- OpenSSF Scorecard: pushes to main, weekly schedule, and manual dispatch.
- MobSF: after a successful Android debug build on main, or manual dispatch against a successful Android workflow run.

## Report access and publication

- Workflow artifacts are downloadable from the corresponding GitHub Actions run by users with repository access. Retention is configured to 30 days for the report artifacts listed above.
- GitHub code-scanning alerts and raw workflow artifacts are separate reporting surfaces. Uploading SARIF does not automatically make the original SARIF a downloadable artifact; these workflows now explicitly archive it.
- Public-facing reporting should contain aggregate, sanitised status only. Do not publish raw SARIF/JSON, secret locations, exploit paths, personal data, or detailed vulnerable-component exposure without a deliberate disclosure review.
- No GitHub Pages publication or public report deployment is configured by this change.

## Interpretation and remediation

1. Review every finding and validate whether the affected code, package, APK component, or workflow is present and reachable.
2. Prioritise confirmed critical/high findings, exposed credentials, exploitable misconfigurations, and vulnerable shipped dependencies.
3. Prefer vendor-supported patched versions and minimal targeted code changes.
4. Preserve existing tests. Do not suppress, delete, or weaken a test merely to obtain a green workflow.
5. Record false positives and accepted risks with a rationale, owner, date, affected version, and revisit condition.
6. Re-run the relevant scanners and the full regression/Android validation after remediation.

The workflows collect a baseline without automatically failing the entire build on every pre-existing finding. Dependency Review currently gates only critical-severity dependency additions. Tighten gates after the baseline has been triaged.

## Known coverage limitations

- The repository currently has no committed package-lock.json. OSV-Scanner and Trivy generate a temporary lockfile in the ephemeral runner using npm install --package-lock-only --ignore-scripts --no-audit --no-fund, so transitive packages can be scanned without executing package lifecycle scripts. This is useful baseline coverage but is not a committed, reproducible dependency lock; committing a reviewed lockfile remains recommended.
- MobSF performs static APK analysis only in this workflow. Dynamic analysis requires a separately provisioned Android emulator/device and is not claimed here.
- Trivy and DevSkim may produce false positives; findings require human validation.
- GitHub repository security settings (Dependency Graph, Dependabot alerts, secret scanning, and CodeQL default setup) must be verified separately in repository settings. Existing CodeQL default-setup runs were detected; GitHub rejects simultaneous default and advanced CodeQL configurations.
- No scanner guarantees absence of vulnerabilities. Third-party action and container versions must be reviewed and updated regularly.

## Data handling

MobSF runs locally in an ephemeral GitHub-hosted runner. VirusTotal integration and external domain-malware lookups are explicitly disabled. The generated APK and JSON report are retained as GitHub Actions artifacts for 30 days. Do not add private signing keys, production credentials, or user data to these artifacts.
