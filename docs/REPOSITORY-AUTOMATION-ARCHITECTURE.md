# JestBox Repository Automation Architecture

## 1. System boundary

JestBox consists of a static HTML/CSS/JavaScript application, locale-specific bundled joke content, Capacitor Android packaging, documentation, validation scripts and GitHub Actions automation. It is not a hosted backend service.

## 2. Components

| Component | Responsibility |
|---|---|
| Web application | User interface, locale selection, joke browsing, settings and user-initiated sharing |
| Local content | Joke datasets and locale-specific strings bundled with the app |
| Capacitor | Packages the static web experience for Android and exposes selected native capabilities |
| Regression tests | Validate application behaviour, content, legal rendering and packaging validators |
| GitHub repository | Source control, pull requests, branch rules and project documentation |
| GitHub Actions | Validation, security scanning, Android builds, SBOM and release signing |
| Protected signing Environment | Restricts access to production signing credentials |
| Workflow artifacts | Temporarily retain build outputs and security evidence |

## 3. Main automation paths

### Pull request
Source changes enter through a pull request. Required checks validate applicable source, tests, security tooling and workflow definitions. The maintainer reviews the change before merging.

### Main branch
Pushes to main run the configured validation and security workflows. A green result applies only to the checks that actually executed.

### Android debug build
The workflow prepares web assets, generates/synchronizes the Capacitor Android project, applies Android hardening, builds the debug APK and validates package outputs.

### Production signing
The protected signing workflow is manually dispatched, main-only and Environment-gated. It decrypts signing material only inside the protected job, signs and verifies the APK, runs MobSF static analysis, uploads temporary evidence and cleans temporary signing files.

### Artifact cleanup
A scheduled workflow removes only specifically allowlisted transient debug/unsigned artifacts. Production-signed APK and MobSF evidence names are excluded. Its fail-closed anchor behaviour must be verified from a post-change scheduled run before claiming operational validation.

## 4. Trust boundaries

Treat pull-request source, third-party Actions, package registries, scanner containers, native plugins, GitHub tokens, signing credentials and downloaded artifacts as separate trust boundaries. Keep workflow permissions minimal and never expose production signing secrets to untrusted code.

## 5. Change triggers

Update this architecture when application runtime interfaces, native plugins, CI workflows, signing, artifact retention, distribution or repository governance materially changes.
