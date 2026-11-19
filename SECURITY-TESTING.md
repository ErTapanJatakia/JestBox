# JestBox security testing scope

## Automated OWASP ZAP DAST

The `JestBox OWASP ZAP penetration testing` workflow builds the app locally, serves the generated static web assets on the GitHub-hosted runner, and scans only `http://127.0.0.1:8080`.

- Pull requests, pushes to `main`, and the weekly schedule run ZAP Baseline (passive) scanning.
- A manually dispatched run can opt into a bounded ZAP Full Scan (active) against the same disposable local build.
- JSON and HTML reports plus a Markdown summary are retained as a GitHub Actions artifact for 30 days.
- The workflow has read-only repository permissions and does not scan production or third-party hosts.

## Coverage and limitations

This workflow provides automated web-layer DAST. It does not by itself constitute a human-led penetration test or establish that the app is vulnerability-free. It does not cover production hosting, authenticated user journeys, backend APIs (JestBox is designed as an offline-first static app), third-party infrastructure, or comprehensive Android runtime behavior.

MobSF static APK analysis remains a separate control. A future Android dynamic assessment would require a deliberately provisioned emulator and a validated MobSF dynamic-analysis setup; it should not be represented as covered by this ZAP workflow.

## Triage

Review each alert manually, reproduce it, record the affected URL and evidence, assess exploitability and impact, and track confirmed issues through remediation and retesting. Do not suppress scanner rules or delete tests merely to obtain a green workflow.
