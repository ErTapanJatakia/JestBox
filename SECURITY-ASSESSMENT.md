# JestBox Security Assessment Programme

## Purpose and boundaries

This document describes the repository-level automated security checks. These checks are defensive assurance controls; they do not constitute a penetration test, independent audit, certification, or proof that the application is vulnerability-free.

The scope includes the eight-locale JavaScript application, npm dependencies, GitHub Actions workflows, repository supply-chain posture, and the generated Android debug APK. Production signing, app-store submission, hosted production testing, and dynamic Android testing are outside this automation.

## Automated tools

| Tool | Coverage | Reporting |
|---|---|---|
| GitHub CodeQL default setup | JavaScript/TypeScript and GitHub Actions analysis already managed by GitHub repository security settings | GitHub code scanning |
| OSV-Scanner | Known vulnerabilities in discoverable dependency manifests/lockfiles | GitHub code scanning |
| Trivy | Filesystem dependencies, secrets, misconfigurations and licence findings | GitHub code scanning |
| Microsoft DevSkim | Secure-coding rules for source files | GitHub code scanning |
| Dependency Review | Dependency changes introduced by pull requests | Pull-request check |
| OpenSSF Scorecard | Repository and software supply-chain security posture | GitHub code scanning and Scorecard public results |
| MobSF | Static analysis of the generated Android debug APK | Downloadable JSON workflow artifact |

## Trigger schedule

- CodeQL: managed by the repository's existing GitHub default setup; its analysis runs are visible in the Security/Actions surfaces. No duplicate advanced-setup workflow is added.
- OSV, Trivy and DevSkim: pushes to `main`, pull requests targeting `main` where configured, weekly schedule, and manual dispatch.
- Dependency Review: pull requests targeting `main`.
- OpenSSF Scorecard: pushes to `main`, weekly schedule, and manual dispatch.
- MobSF: after a successful Android debug build on `main`, or manual dispatch against a successful Android workflow run.

## Interpretation and remediation

1. Review every finding and validate whether the affected code, package, APK component, or workflow is present and reachable.
2. Prioritise confirmed critical/high findings, exposed credentials, exploitable misconfigurations, and vulnerable shipped dependencies.
3. Prefer vendor-supported patched versions and minimal targeted code changes.
4. Preserve existing tests. Do not suppress, delete, or weaken a test merely to obtain a green workflow.
5. Record false positives and accepted risks with a rationale, owner, date, affected version, and revisit condition.
6. Re-run the relevant scanners and the full regression/Android validation after remediation.

The initial workflows are configured to collect a baseline without automatically failing the entire build on every pre-existing finding. Dependency Review currently gates only critical-severity dependency additions. Tighten gates after the baseline has been triaged.

## Known coverage limitations

- The repository currently has no committed `package-lock.json`. Exact direct dependency versions are declared in `package.json`, but transitive npm dependency coverage is incomplete until a reproducible lockfile is generated, reviewed, and committed.
- OSV-Scanner coverage depends on package metadata it can discover. A manifest-only scan is not equivalent to a complete lockfile-based transitive dependency assessment.
- MobSF performs static APK analysis only in this workflow. Dynamic analysis requires a separately provisioned Android emulator/device and is not claimed here.
- Trivy and DevSkim may produce false positives; findings require human validation.
- GitHub repository security settings (Dependency Graph, Dependabot alerts, secret scanning, and CodeQL default setup) must be verified separately in repository settings. Existing CodeQL default-setup runs were detected; the additional advanced-setup workflow was removed because GitHub rejects simultaneous default and advanced CodeQL configurations.
- No scanner guarantees absence of vulnerabilities. Third-party action and container versions must be reviewed and updated regularly.

## Data handling

The MobSF workflow runs its scanner locally in an ephemeral GitHub-hosted runner. VirusTotal integration is explicitly disabled. The generated APK and JSON report are retained as GitHub Actions artifacts for 14 days. Do not add private signing keys, production credentials, or user data to these artifacts.
