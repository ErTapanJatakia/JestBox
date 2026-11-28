# JestBox Documentation Maintenance

Owner: Repository maintainer. Review cadence: quarterly and after material changes to application behaviour, security controls, workflows, dependencies, signing or release process.

## Authoritative sources

| Subject | Authoritative source |
|---|---|
| Product scope and supported locales | Application source, content datasets and README |
| Build and test behaviour | Package files, scripts and workflow definitions |
| Android architecture and identity | Capacitor configuration, Android workflows and signing documentation |
| Repository controls | Live GitHub rulesets, permissions and Environment settings |
| Security results | Exact workflow run, report artifact and assessed commit |
| Dependency inventory | Lockfiles, workflow Action/container references, SBOM and dependency tools |
| Release state | Protected signing run, release approval record and distribution platform |
| OpenSSF assessment | Current official criteria and evidence mapped in the relevant register |

## Maintenance requirements

- Update documentation with the behaviour/control change where practical.
- Never copy another repository's account-specific status, project identifiers, badge achievements, paths, secrets, access roles or evidence.
- Distinguish implemented controls from documented intentions and platform settings that have not been independently verified.
- Record assessment date, criteria version, commit, workflow run and evidence retention where relevant.
- Recheck relative links and referenced filenames.
- Preserve required historical evidence when correcting stale claims.
- Do not publish private data or secret values.

## Review checklist

1. Do links and filenames resolve?
2. Does every workflow description match current YAML?
3. Are tool versions and triggers current?
4. Are claims supported by current evidence?
5. Are N/A and Unverified rationales defensible?
6. Are release and security limitations explicit?
7. Are user-facing app assets unaffected by documentation-only changes?

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial maintenance policy. |
