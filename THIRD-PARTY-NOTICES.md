# Third-Party Dependency Licence Notices

This file records the third-party packages associated with the current JestBox dependency lockfiles that generated Trivy licence notices. It is an inventory, not a grant of rights to the JestBox application source.

## Reviewed packages

| Package | Locked version | Declared SPDX licence | Dependency scope | Use in JestBox |
|---|---:|---|---|---|
| `@capacitor/core` | 8.6.2 | MIT | Application dependency | Capacitor runtime bridge used by the Android application wrapper |
| `@capacitor/share` | 8.0.3 | MIT | Application dependency | Native share-sheet integration |
| `tslib` | 2.9.1 | 0BSD | Transitive dependency | TypeScript runtime helper functions; required by the dependency tree |
| `playwright` | 1.56.1 | Apache-2.0 | CI-only development dependency | Browser automation for tablet-responsive validation |
| `playwright-core` | 1.56.1 | Apache-2.0 | CI-only transitive dependency | Browser automation engine used by Playwright |

## Source and verification

The versions and SPDX identifiers above were checked against the committed lockfiles:

- [Root package manifest](package.json)
- [Root npm lockfile](package-lock.json)
- [Tablet tooling package manifest](.github/tooling/tablet/package.json)
- [Tablet tooling npm lockfile](.github/tooling/tablet/package-lock.json)

Package metadata and upstream distribution references:

- [@capacitor/core on npm](https://www.npmjs.com/package/@capacitor/core)
- [@capacitor/share on npm](https://www.npmjs.com/package/@capacitor/share)
- [tslib on npm](https://www.npmjs.com/package/tslib)
- [playwright on npm](https://www.npmjs.com/package/playwright)
- [playwright-core on npm](https://www.npmjs.com/package/playwright-core)

## Compliance handling

- MIT and Apache-2.0 are permissive open-source licences. Their applicable copyright, licence and notice conditions must be preserved when redistributing the corresponding third-party components.
- 0BSD is a permissive licence with minimal conditions. The package's own licence text remains authoritative.
- These package licences apply to the identified third-party components only. They do not relicense JestBox's proprietary application source, branding, joke content, or other original assets.
- Playwright and Playwright Core are isolated under `.github/tooling/tablet/` and are not application runtime dependencies.
- Do not remove, downgrade, or suppress a dependency solely to silence a licence inventory notice. Reassess this inventory whenever the lockfiles change.

This inventory documents the current five Trivy licence notices. They are licence-classification findings, not reported vulnerability findings. Their presence alone does not establish a licence incompatibility; any redistribution decision must still be checked against the applicable upstream licence text and the actual distribution contents.
