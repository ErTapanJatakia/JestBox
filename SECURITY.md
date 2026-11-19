# Security Policy

## Reporting
Report suspected vulnerabilities privately. Do not publish exploit details in public issues or pull requests.

- General security and privacy: cyber.litigation.advisor@gmail.com
- Russia: ertapanjatakia@yandex.com
- Other regions: tapan_ditu_17.20@outlook.com

Include the affected commit/version, impact, reproduction steps, and minimal evidence. Remove credentials, personal data, and unrelated sensitive information. Do not access or disrupt third-party systems or other users' data.

## Scope
This policy covers the JestBox source, all eight locale experiences (`en-US`, `es-PE`, `ru-RU`, `es-ES`, `en-IN`, `hi-IN`, `ur-IN`, and `ur-PK`), the Android wrapper and generated development APKs. Hosting providers, browsers, operating systems, app stores, and recipient share apps remain governed by their own security processes.

## Coordinated disclosure
Allow the maintainer a reasonable opportunity to investigate and remediate before public disclosure. The maintainer will make reasonable efforts to acknowledge and assess reports, but no fixed response or remediation SLA is promised.

## Supported versions
JestBox is under development and has no stable release support window yet. The current development branch is reviewed as part of ongoing work; old commits and unreleased snapshots have no separate support commitment.

## Automated security checks
The repository uses CodeQL, OSV-Scanner, Trivy, Microsoft DevSkim, Dependency Review, OpenSSF Scorecard, and MobSF static APK analysis. Their scope, reporting locations, limitations, and remediation process are documented in [SECURITY-ASSESSMENT.md](SECURITY-ASSESSMENT.md). Automated checks do not constitute a penetration test, independent audit, certification, or guarantee that the application is vulnerability-free.

## Safe harbor
Good-faith research that follows this policy and applicable law is welcome. Avoid privacy violations, destructive testing, service disruption, and unauthorized access. Stop and report privately if sensitive data is encountered. This policy does not authorize otherwise unlawful activity.
