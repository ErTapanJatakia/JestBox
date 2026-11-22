# Third-Party Notices

**Project:** JestBox  
**Verification date:** 22 November 2026  
**Reviewed base commit:** `613a6a5119a4f1d1009961e051a62008d93e7b66`  
**Related inventory:** [`THIRD_PARTY_LICENSES.md`](THIRD_PARTY_LICENSES.md)

This file records licence texts and attribution notices for the five Trivy licence findings currently tracked in JestBox. It complements, but does not replace, the lockfile-derived package inventory.

> **Scope limitation:** This is a technical notice record, not legal advice or a certification of compliance. The committed lockfiles identify dependency versions; they do not by themselves prove which packages are present in a release artefact. Before distributing an app, inspect the actual web/Android artefacts and include notices for every third-party component actually distributed.

## 1. Packages covered by the five findings

| Code Scanning alert | Package | Locked version | Declared licence | Dependency scope | Attribution |
|---|---|---:|---|---|---|
| [#1](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/1) | `@capacitor/core` | 8.6.2 | MIT | Root `devDependency`; also the peer dependency used by `@capacitor/share` | Drifty Co. |
| [#2](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/2) | `@capacitor/share` | 8.0.3 | MIT | Root direct dependency | Ionic |
| [#3](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/3) | `tslib` | 2.9.1 | 0BSD | Root lockfile; transitive dependency | Microsoft Corporation |
| [#120](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/120) | `playwright` | 1.56.1 | Apache-2.0 | Isolated `.github/tooling/tablet` devDependency | Microsoft Corporation |
| [#121](https://github.com/ErTapanJatakia/JestBox/security/code-scanning/121) | `playwright-core` | 1.56.1 | Apache-2.0 | Isolated tablet tooling dependency of Playwright | Microsoft Corporation |

The Playwright packages are declared only in `.github/tooling/tablet/package.json` and its lockfile. They are browser-validation tooling, not root application dependencies. This classification is based on the committed manifests and lockfiles; it does not establish whether a particular CI image or release bundle contains them.

## 2. MIT — @capacitor/core 8.6.2

**Copyright notice:** Copyright (c) 2017-present Drifty Co.  
**Upstream versioned licence:** [Capacitor 8.6.2 LICENSE](https://github.com/ionic-team/capacitor/blob/8.6.2/LICENSE)  
**Package metadata:** The committed root lockfile pins 8.6.2 and declares MIT.

```text
MIT License

Copyright (c) 2017-present Drifty Co.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 3. MIT — @capacitor/share 8.0.3

**Copyright notice:** Copyright 2020-present Ionic  
**Attribution URL:** https://ionic.io  
**Upstream licence file reviewed:** [capacitor-plugins/share/LICENSE](https://github.com/ionic-team/capacitor-plugins/blob/main/share/LICENSE)  
**Version evidence:** The root lockfile pins 8.0.3; the npm package page identifies version 8.0.3 and MIT: [@capacitor/share on npm](https://www.npmjs.com/package/@capacitor/share/v/8.0.3).

```text
Copyright 2020-present Ionic
https://ionic.io

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

**Version-specific evidence limitation:** The official upstream licence file was retrieved from the repository's current `main` branch, not from a verified immutable source tag for 8.0.3. The package version and MIT declaration are corroborated by the lockfile and npm version page, but the exact 8.0.3 tarball was not independently unpacked in this review. Re-check the package archive when preparing a release notice bundle.

## 4. 0BSD — tslib 2.9.1

**Copyright notice:** Copyright (c) Microsoft Corporation.  
**Upstream package metadata:** [tslib/package.json](https://github.com/microsoft/tslib/blob/main/package.json) — reviewed manifest reports version 2.9.1 and licence 0BSD.  
**Upstream licence text:** [tslib/LICENSE.txt](https://github.com/microsoft/tslib/blob/main/LICENSE.txt).

```text
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```

The committed root lockfile pins 2.9.1 and declares 0BSD. The upstream manifest's version field matches 2.9.1. The upstream repository does not expose a corresponding 2.9.1 release tag in the release listing reviewed; therefore the manifest and licence file are version-matched by the repository's current package metadata, but were not independently extracted from the npm tarball during this review.

## 5. Apache-2.0 — Playwright 1.56.1 and Playwright Core 1.56.1

**Copyright / attribution:** Copyright (c) Microsoft Corporation.  
**Versioned upstream source:** [Playwright v1.56.1 LICENSE](https://github.com/microsoft/playwright/blob/v1.56.1/LICENSE) and [NOTICE](https://github.com/microsoft/playwright/blob/v1.56.1/NOTICE).  
**Package metadata:** The versioned upstream package manifests for both `playwright` and `playwright-core` identify version 1.56.1 and Apache-2.0.

### 5.1 Upstream NOTICE

```text
Playwright
Copyright (c) Microsoft Corporation

This software contains code derived from the Puppeteer project (https://github.com/puppeteer/puppeteer),
available under the Apache 2.0 license (https://github.com/puppeteer/puppeteer/blob/master/LICENSE).
```

The NOTICE attributes code derived from the Puppeteer project, available under Apache-2.0. Preserve this attribution when redistributing a derivative or package distribution to which the upstream NOTICE applies.

### 5.2 Apache License 2.0

The following is the Apache License 2.0 text retrieved from the Playwright v1.56.1 upstream source.

```text
Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Portions Copyright (c) Microsoft Corporation.
   Portions Copyright 2017 Google Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

**Package-archive limitation:** The versioned upstream source manifests, root licence, and NOTICE were checked. The npm tarballs for `playwright` and `playwright-core` were not independently unpacked in this review to confirm their exact archive file lists. Keep the upstream source evidence distinct from an archive-content verification.

## 6. Package archive and release verification record

The lockfiles contain npm registry tarball URLs and integrity fields for the five packages. These values pin the expected package archives, but this review did not download and hash-check those archives. Therefore:

- Licence identifiers and versions are checked against the committed lockfiles.
- The versioned upstream source was checked for Capacitor Core and Playwright.
- The upstream current-branch package manifest and licence text were checked for tslib; the manifest reports version 2.9.1.
- The package version page and upstream current-branch licence file were checked for Capacitor Share; the upstream licence file is not pinned here to an immutable 8.0.3 tag.
- Package archive contents and actual release artefact inclusion remain release-time checks.

## 7. Distribution handling

Before publishing a web or Android release:

1. Inspect the final release artefacts and determine which dependencies are bundled or otherwise distributed.
2. Include the applicable MIT licence text and copyright attribution for Capacitor Core and Capacitor Share if those works are distributed.
3. Include the applicable 0BSD licence/copyright notice for tslib if distributed.
4. If Playwright tooling is redistributed, include the Apache-2.0 licence and preserve the applicable Microsoft/Puppeteer attribution notices. If it is confined to CI and not included in any distributed artefact, record that evidence rather than assuming it ships with the app.
5. Re-check all upstream licence and NOTICE files against the exact package archives before a release, especially the two packages whose archive contents were not independently inspected above.
6. Re-run the lockfile inventory whenever either lockfile changes.

This file does not change package versions, application code, tests, Trivy configuration, or scanner behaviour. It does not itself dismiss or close any Code Scanning alert.

## 8. Source references

- [JestBox root package lockfile](package-lock.json)
- [JestBox tablet tooling package lockfile](.github/tooling/tablet/package-lock.json)
- [JestBox third-party licence inventory](THIRD_PARTY_LICENSES.md)
- [Capacitor Core 8.6.2 licence](https://github.com/ionic-team/capacitor/blob/8.6.2/LICENSE)
- [Capacitor Share npm package 8.0.3](https://www.npmjs.com/package/@capacitor/share/v/8.0.3)
- [Capacitor Share upstream licence file](https://github.com/ionic-team/capacitor-plugins/blob/main/share/LICENSE)
- [tslib upstream package manifest](https://github.com/microsoft/tslib/blob/main/package.json)
- [tslib upstream licence file](https://github.com/microsoft/tslib/blob/main/LICENSE.txt)
- [Playwright v1.56.1 licence](https://github.com/microsoft/playwright/blob/v1.56.1/LICENSE)
- [Playwright v1.56.1 NOTICE](https://github.com/microsoft/playwright/blob/v1.56.1/NOTICE)
- [Playwright v1.56.1 package manifest](https://github.com/microsoft/playwright/blob/v1.56.1/packages/playwright/package.json)
- [Playwright Core v1.56.1 package manifest](https://github.com/microsoft/playwright/blob/v1.56.1/packages/playwright-core/package.json)
