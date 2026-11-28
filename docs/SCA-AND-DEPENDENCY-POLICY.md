# JestBox Software Composition Analysis and Dependency Policy

## Scope

This policy covers npm packages, Capacitor plugins, Android/Gradle components, GitHub Actions, scanner containers, and other third-party build/runtime dependencies.

## Selection and maintenance

- Prefer actively maintained dependencies with a clear purpose.
- Minimize dependency count and native permissions.
- Review release history, maintenance status, advisories, license, provenance, and transitive dependencies before adoption.
- Keep lockfiles authoritative and use reproducible installation in CI.
- Use Dependabot and dependency-review workflows as detection mechanisms; review proposed updates before merging.
- Pin GitHub Actions and container images to immutable references where practical.

## Vulnerability handling

Assess severity, reachability, exploitability, affected versions, available fixes, and impact on the packaged Android artifact. Prioritize critical/high risk and internet/native boundary exposure. Record accepted risks and temporary exceptions with owner and review date.

## SBOM

The repository generates CycloneDX and SPDX inventories through its SBOM workflow. An SBOM is an inventory snapshot, not proof that dependencies are vulnerability-free. Correlate it to the exact source/build where possible and retain the run metadata.

## Licensing

Maintain an inventory of material third-party components and their licenses. Verify license compatibility before adding or redistributing components. Do not infer that repository visibility grants rights to third-party or proprietary assets.
