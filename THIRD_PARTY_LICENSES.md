# Third-Party Software Licence Inventory

**Repository:** JestBox  
**Inventory date:** 22 November 2026  
**Branch reviewed:** `main`  
**Purpose:** Record third-party packages and the licence identifiers declared by the committed npm lockfiles. This is a software-composition inventory, not a legal opinion or a substitute for reviewing the licence texts and distributed artefacts.

## 1. Scope and method

This inventory was generated from these committed lockfiles on `main`:

| Dependency scope | Lockfile | Lockfile version | Package entries excluding project root |
|---|---|---:|---:|
| Application and build toolchain | [`package-lock.json`](package-lock.json) | 3 | 126 |
| Tablet screenshot / browser-test tooling | [`.github/tooling/tablet/package-lock.json`](.github/tooling/tablet/package-lock.json) | 3 | 3 |

The inventory records package name, locked version, and the `license` field declared in the lockfile. It includes transitive and optional dependency entries, not only direct dependencies. The same package may appear in more than one lockfile and is counted once per lockfile entry.

**Important limitation:** npm lockfile licence identifiers are metadata declarations. They do not prove that the corresponding package archive contains all required notices, that an upstream `NOTICE` file is absent, or that the project has fulfilled every redistribution obligation. Before distributing a release, verify the exact package version's upstream licence and notice files and preserve applicable copyright notices.

## 2. Inventory summary

| SPDX / declared identifier | Root lockfile entries | Tablet lockfile entries | Total entries |
|---|---:|---:|---:|
| MIT | 99 | 0 | 99 |
| ISC | 10 | 0 | 10 |
| BlueOak-1.0.0 | 12 | 0 | 12 |
| Unlicense | 2 | 0 | 2 |
| Apache-2.0 | 2 | 2 | 4 |
| 0BSD | 1 | 0 | 1 |
| Undeclared in lockfile | 0 | 1 | 1 |
| **Total third-party entries** | **126** | **3** | **129** |

## 3. Root application and build-toolchain dependencies

The following entries are taken from `package-lock.json`.

### MIT (99 package entries)

- `@capacitor/android` — `8.6.2`
- `@capacitor/cli` — `8.6.2`
- `@capacitor/core` — `8.6.2`
- `@capacitor/share` — `8.0.3`
- `@esbuild/aix-ppc64` — `0.28.2`
- `@esbuild/android-arm` — `0.28.2`
- `@esbuild/android-arm64` — `0.28.2`
- `@esbuild/android-x64` — `0.28.2`
- `@esbuild/darwin-arm64` — `0.28.2`
- `@esbuild/darwin-x64` — `0.28.2`
- `@esbuild/freebsd-arm64` — `0.28.2`
- `@esbuild/freebsd-x64` — `0.28.2`
- `@esbuild/linux-arm` — `0.28.2`
- `@esbuild/linux-arm64` — `0.28.2`
- `@esbuild/linux-ia32` — `0.28.2`
- `@esbuild/linux-loong64` — `0.28.2`
- `@esbuild/linux-mips64el` — `0.28.2`
- `@esbuild/linux-ppc64` — `0.28.2`
- `@esbuild/linux-riscv64` — `0.28.2`
- `@esbuild/linux-s390x` — `0.28.2`
- `@esbuild/linux-x64` — `0.28.2`
- `@esbuild/netbsd-arm64` — `0.28.2`
- `@esbuild/netbsd-x64` — `0.28.2`
- `@esbuild/openbsd-arm64` — `0.28.2`
- `@esbuild/openbsd-x64` — `0.28.2`
- `@esbuild/openharmony-arm64` — `0.28.2`
- `@esbuild/sunos-x64` — `0.28.2`
- `@esbuild/win32-arm64` — `0.28.2`
- `@esbuild/win32-ia32` — `0.28.2`
- `@esbuild/win32-x64` — `0.28.2`
- `@ionic/cli-framework-output` — `2.2.8`
- `@ionic/utils-array` — `2.1.6`
- `@ionic/utils-fs` — `3.1.7`
- `@ionic/utils-fs/node_modules/fs-extra` — `9.1.0`
- `@ionic/utils-object` — `2.1.6`
- `@ionic/utils-process` — `2.1.12`
- `@ionic/utils-stream` — `3.1.7`
- `@ionic/utils-subprocess` — `3.0.1`
- `@ionic/utils-terminal` — `2.3.5`
- `@types/fs-extra` — `8.1.5`
- `@types/node` — `26.6.6`
- `@types/slice-ansi` — `4.0.0`
- `@xmldom/xmldom` — `0.9.12`
- `ansi-regex` — `5.0.1`
- `ansi-styles` — `4.3.0`
- `astral-regex` — `2.0.0`
- `balanced-match` — `4.0.4`
- `base64-js` — `1.5.1`
- `bplist-creator` — `0.1.0`
- `bplist-parser` — `0.3.2`
- `brace-expansion` — `5.0.13`
- `buffer-crc32` — `0.2.13`
- `color-convert` — `2.0.1`
- `color-name` — `1.1.4`
- `commander` — `12.1.0`
- `cross-spawn` — `7.0.6`
- `debug` — `4.4.3`
- `define-lazy-prop` — `2.0.0`
- `emoji-regex` — `8.0.0`
- `env-paths` — `2.2.1`
- `esbuild` — `0.28.2`
- `fd-slicer` — `1.1.0`
- `fs-extra` — `11.4.1`
- `is-docker` — `2.2.1`
- `is-fullwidth-code-point` — `3.0.0`
- `is-wsl` — `2.2.0`
- `jsonfile` — `6.2.1`
- `kleur` — `4.1.5`
- `minizlib` — `3.1.0`
- `ms` — `2.1.3`
- `native-run` — `2.1.0`
- `open` — `8.4.2`
- `path-key` — `3.1.1`
- `pend` — `1.2.0`
- `plist` — `3.1.1`
- `prompts` — `2.4.2`
- `prompts/node_modules/kleur` — `3.0.3`
- `readable-stream` — `3.6.2`
- `safe-buffer` — `5.2.1`
- `shebang-command` — `2.0.0`
- `shebang-regex` — `3.0.0`
- `simple-plist` — `1.3.1`
- `simple-plist/node_modules/bplist-parser` — `0.3.1`
- `sisteransi` — `1.0.5`
- `slice-ansi` — `4.0.0`
- `string_decoder` — `1.3.0`
- `string-width` — `4.2.3`
- `strip-ansi` — `6.0.1`
- `through2` — `4.0.2`
- `tree-kill` — `1.2.2`
- `undici-types` — `8.9.0`
- `universalify` — `2.0.1`
- `untildify` — `4.0.0`
- `util-deprecate` — `1.0.2`
- `wrap-ansi` — `7.0.0`
- `xml2js` — `0.6.2`
- `xml2js/node_modules/xmlbuilder` — `11.0.1`
- `xmlbuilder` — `15.1.1`
- `yauzl` — `2.10.0`

### ISC (10 package entries)

- `@isaacs/fs-minipass` — `4.0.1`
- `at-least-node` — `1.0.0`
- `inherits` — `2.0.4`
- `ini` — `4.1.3`
- `isexe` — `2.0.0`
- `sax` — `1.1.4`
- `semver` — `7.8.6`
- `signal-exit` — `3.0.7`
- `split2` — `4.2.0`
- `which` — `2.0.2`

### BlueOak-1.0.0 (12 package entries)

- `@isaacs/nonrecursive-glob-match` — `1.1.0`
- `chownr` — `3.0.0`
- `glob` — `14.0.6`
- `graceful-fs` — `4.2.12`
- `lru-cache` — `11.5.3`
- `minimatch` — `11.0.9`
- `minipass` — `7.1.3`
- `package-json-from-dist` — `1.0.1`
- `path-scurry` — `3.0.0`
- `rimraf` — `6.1.4`
- `tar` — `7.5.23`
- `yallist` — `5.0.0`

### Unlicense (2 package entries)

- `big-integer` — `1.6.52`
- `stream-buffers` — `2.2.0`

### Apache-2.0 (2 package entries)

- `elementtree` — `0.1.7`
- `xcode` — `4.0.0`

### 0BSD (1 package entries)

- `tslib` — `2.9.1`

## 4. Tablet-only tooling dependencies

The following entries are taken from `.github/tooling/tablet/package-lock.json`. Playwright is isolated in this tooling lockfile and is not added to the root application's runtime dependency set.

### Apache-2.0 (2 package entries)

- `playwright` — `1.56.1`
- `playwright-core` — `1.56.1`

### Undeclared in lockfile (1 package entries)

- `fsevents` — `2.3.2`

### 4.1 Metadata follow-up: fsevents

The tablet lockfile contains optional dependency `fsevents@2.3.2` without a `license` field. The upstream versioned package manifest declares `MIT` and restricts the package to macOS. This metadata was checked against [the upstream v2.3.2 package.json](https://github.com/fsevents/fsevents/blob/v2.3.2/package.json). This supplemental check does not replace verification of the package's actual licence text.

## 5. Findings currently represented in GitHub Code Scanning

These five alerts were reported by Trivy as licence findings, not vulnerability findings. The package/version/licence values below match the reviewed lockfiles.

| Alert | Package | Version | Licence | Lockfile / role |
|---|---|---:|---|---|
| [#121](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/121) | `playwright-core` | 1.56.1 | Apache-2.0 | Tablet tooling; dependency of Playwright |
| [#120](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/120) | `playwright` | 1.56.1 | Apache-2.0 | Tablet tooling; browser automation |
| [#3](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/3) | `tslib` | 2.9.1 | 0BSD | Root lockfile; transitive runtime helper |
| [#2](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/2) | `@capacitor/share` | 8.0.3 | MIT | Root lockfile; direct application dependency |
| [#1](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/1) | `@capacitor/core` | 8.6.2 | MIT | Root lockfile; declared development dependency and peer dependency |

**Disposition:** Dependencies are intentionally retained. These notices are to be handled through licence inventory and notice review, not by removing packages or disabling Trivy licence scanning. This document does not itself dismiss or close any Code Scanning alert and does not declare legal compliance complete.

## 6. Practical licence review checklist

Before distributing an application or other artefact that contains or bundles third-party software:

- [ ] Confirm the exact package versions actually included in the distributable (not just the development lockfile).
- [ ] Obtain the licence text for each included package from the corresponding upstream version.
- [ ] Preserve applicable copyright and licence notices in the distribution.
- [ ] For Apache-2.0 packages, check for an upstream `NOTICE` file and comply with its applicable notice requirements; review the licence's patent provisions.
- [ ] Confirm whether optional, platform-specific and CI-only packages are included in the distributed artefact. Do not assume that a lockfile entry means it is shipped to end users.
- [ ] Record any exceptions, missing metadata, or incompatible obligations and obtain review from the organisation's compliance owner or legal counsel where needed.
- [ ] Re-run the inventory whenever either lockfile changes and review new, changed or removed package/licence entries.
- [ ] Keep Trivy's licence scanner enabled; investigate changes rather than suppressing the inventory signal.

## 7. Licence references

Use the exact licence text distributed by the relevant upstream package as the controlling package-level reference. The following SPDX pages are useful reference material for standard licence identifiers:

- [MIT](https://spdx.org/licenses/MIT.html)
- [ISC](https://spdx.org/licenses/ISC.html)
- [Apache-2.0](https://spdx.org/licenses/Apache-2.0.html)
- [0BSD](https://spdx.org/licenses/0BSD.html)
- [Unlicense](https://spdx.org/licenses/Unlicense.html)
- [Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0)

## 8. Maintenance

Update this file whenever either npm lockfile changes. Keep the package/version/declared-licence lists synchronised with the committed lockfiles. Record the inventory date, reviewed commit, any upstream metadata checks, and any release-specific notice verification. Do not mark an alert closed or a compliance obligation fulfilled solely because a package appears in this inventory.
