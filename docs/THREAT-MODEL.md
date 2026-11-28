# JestBox Application and Repository Threat Model

Assessment scope: JestBox web application, Capacitor Android packaging, local content and preferences, native share bridge, GitHub repository, CI workflows, production signing and release evidence.

## Security objectives

Protect application integrity and availability, confidentiality of production signing material, authenticity of source changes and signed APKs, user privacy, and safe interaction between WebView content and native Android plugins.

## Assets

| Asset | Classification | Protection objective |
|---|---|---|
| Production keystore and passwords | Highly restricted | Confidentiality, integrity, recoverability |
| Source, workflows and release scripts | Project-controlled | Integrity and traceability |
| Signed APK and verification evidence | Release-sensitive | Integrity, authenticity, availability |
| Joke datasets and locale metadata | Project content | Integrity and quality |
| Local preferences | User-local data | Confidentiality and integrity |
| Share intent content | User-initiated | Data minimization |
| CI tokens and repository settings | Restricted | Least privilege |

## Actors and trust boundaries

- User/device: Android OS, installed APK, local storage and selected share destination.
- Web application: HTML/JavaScript executing in the Capacitor WebView.
- Native bridge/plugins: privileged boundary between web content and Android APIs.
- Contributors: propose source, workflow, content and documentation changes.
- GitHub Actions: executes workflows with declared permissions and available secrets.
- Production signing Environment: gated boundary for signing credentials.
- External services: GitHub, package registries, scanner containers and future distribution providers.

## Threat scenarios and safeguards

| Threat | Impact | Existing safeguards / evidence | Residual concern |
|---|---|---|---|
| Malicious PR changes workflow to exfiltrate secrets | Signing compromise | Production signing is manual, main-only and Environment-gated; ordinary PR workflows do not use signing secrets | Review workflow/build-script changes carefully |
| Compromised dependency or Action | Build compromise | Dependabot, dependency review, OSV, Trivy, SBOM, pinned Actions and workflow scanners | Transitive/runtime coverage remains incomplete |
| Web content abuses native bridge | Local data/device capability exposure | Narrow plugin use, origin hardening and MobSF-driven Android hardening | Reassess every new plugin or file/camera capability |
| Excessive Android permissions/components | Increased attack surface | Manifest validation and least-permission review | Revalidate each release artifact |
| Secret committed or logged | Signing/repository compromise | GitHub secret storage and Gitleaks | Scanner coverage is not proof of absence |
| Malicious joke content | UI injection, offensive content, crashes | Content schema and regression tests | Test locale/rendering contexts; avoid unsafe HTML |
| Release artifact substitution | Altered APK installed | SHA-256, certificate fingerprint, signature/alignment checks | Temporary artifact retention is not durable |
| Misleading assurance claims | Incorrect decisions | Evidence-scoped Security Policy and assessment registers | Keep claims current and distinguish unverified controls |

## Secure design requirements

- Keep network access and Android permissions to the minimum required.
- Do not introduce accounts, telemetry, remote content, analytics or additional domains without privacy/security review and explicit product approval.
- Escape/render content safely; never treat joke data as executable markup.
- Keep native plugin inputs minimal and validate at the boundary.
- Keep production signing secrets out of PR and fork execution.
- Preserve tests and fail closed where safe operation depends on validation.

## Verification limitations

Static analysis does not prove runtime safety. Local ZAP testing is not production-edge testing. MobSF static analysis is not dynamic analysis or penetration testing. A signed APK is not proof of store acceptance or absence of vulnerabilities.

## Review history

| Date | Change |
|---|---|
| 2026-11-28 | Initial JestBox-specific threat model. |
