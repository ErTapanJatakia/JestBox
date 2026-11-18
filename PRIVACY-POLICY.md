# JestBox Privacy Policy

**Effective date:** 18 November 2026  
**Product:** JestBox (`en-US`, `es-PE`, `ru-RU`, `es-ES`, `en-IN`, and `hi-IN`)  
**Scope:** The JestBox application source and its current browser-based experience.

## 1. At a glance

JestBox is an offline-first joke application. Its core experience is designed to run entirely on the user's device using joke content and interface code bundled with the app.

The current application source does not implement user accounts, sign-in, analytics, advertising, tracking, external API calls, cookies, localStorage, sessionStorage, IndexedDB, or an application database. It does not ask users to provide personal information.

This policy describes the application behavior visible in the repository. It is not a guarantee about independent hosting providers, app stores, operating systems, browsers, or future builds.

## 2. Who is responsible

JestBox is maintained as an independent, non-monetized project by its repository owner. The repository is [ErTapanJatakia/JestBox](https://github.com/ErTapanJatakia/JestBox).

For privacy questions and data-protection requests, use the designated contact details in sections 10 and 11 below. The DPO contact is a project-designated contact point; this policy does not imply that a statutory DPO appointment is legally required or that the project is certified compliant in any jurisdiction. **Do not put personal, sensitive, or account information in a public issue.**

## 3. Information handled by the app

### Information the app does not request or collect

The current application code does not request or intentionally collect:
- names, email addresses, telephone numbers, postal addresses, or account credentials;
- precise or approximate location;
- contacts, photos, files, microphone, or camera data;
- advertising identifiers or device fingerprinting information;
- usage analytics, crash telemetry, or behavioral profiles.

The app does not create an account or maintain a user profile.

### Information used temporarily on the device

The app uses ordinary in-memory application state to:
- remember the selected language and joke category while the current page is open;
- display the current joke and avoid immediately repeating a random result;
- determine the daily joke from the device's local calendar date, selected language, and selected category.

These values are not written to browser storage by the application. A fresh page load starts in American English (`en-US`).

### Clipboard and sharing

If a user selects **Copy**, the app asks the browser to write the currently displayed joke text to the system clipboard. The app does not read the existing clipboard contents.

If a user selects **Share**, the app opens a share dialog. The user may then ask the operating system or browser to open its native share interface, where compatible installed apps may be offered. If native sharing is unavailable, the app explains the limitation and offers a separate, explicit Copy action. JestBox does not silently copy text as a substitute for a share.

The user chooses whether and where to share. Once text is passed to a share target or copied, the receiving app, service, or operating system handles it under its own terms and privacy practices. JestBox does not receive a report of who the user shares with or what the recipient does with the text.

## 4. Network access and hosting

The app's core features do not require network access after the application files have been loaded. The application source does not make external API or telemetry requests.

A browser-based deployment must still deliver its files from a web host. The host, content-delivery infrastructure, DNS provider, network operator, browser, or operating system may process technical request information (for example, IP address, request time, user-agent information, and security logs) as part of delivering and protecting the service. Such infrastructure processing is separate from the app's own application logic and is governed by the relevant provider's terms and privacy notices.

The same distinction applies to any future Android package or store distribution: the operating system, app store, package wrapper, and any added SDKs may process information independently. This policy must be reviewed against the exact packaged build before release. No claim is made here that every third-party platform collects no data.

## 5. Children's privacy

JestBox is a lightweight general-audience humour app. The current app does not ask for age, create profiles, or knowingly collect children's personal information. It is not designed as a service for collecting information from children.

If a future version adds accounts, analytics, advertising, user submissions, or other data processing, its age suitability and applicable child-protection requirements must be reassessed before release.

## 6. Data retention, deletion, and security

Because the current app does not create an application account or store personal information in its own application storage, it has no in-app personal profile or user-data deletion workflow.

Temporary interface state exists only while the page is running and is discarded when the page is closed or reloaded. Clipboard contents and information shared through another app are controlled by the device and the relevant destination, not by JestBox.

The project aims to minimize data handling by design. No software can promise absolute security; users should keep their browser, operating system, and device updated.

## 7. Your choices

You can use the core joke experience offline after the app files have loaded. You can choose either supported language, select a category, and decide whether to use Copy or Share. Copying and sharing are optional; neither is required to use JestBox.

You can stop using the app at any time by closing the page or app.

## 8. Legal and regional considerations

JestBox offers American English and Russian-language content. Language availability does not, by itself, establish the user's location, the project operator's establishment, or which privacy law applies to a particular interaction.

The project is intended to minimize personal-data processing. This policy is informational and is not a legal opinion or a certification of compliance with the laws of India, the Russian Federation, the United States, or any other jurisdiction. Applicable obligations depend on the actual operator, distribution model, hosting configuration, users, and deployed build. Those matters should be reviewed by qualified counsel before commercial or large-scale distribution.

## 9. Changes to this policy

If the app's data practices change, this policy and the app's privacy summary must be updated before or alongside the relevant release. The effective date at the top will be revised. Users should review the policy periodically.

## 10. App developer and support contact

The contact information for the app developer and support team is:

- **Name:** Er. Tapan Jatakia (C. Eng.)
- **Email — Russia:** [ertapanjatakia@yandex.com](mailto:ertapanjatakia@yandex.com)
- **Email — regions outside Russia:** [tapan_ditu_17.20@outlook.com](mailto:tapan_ditu_17.20@outlook.com)
- **Phone:** [+91 9664332984](tel:+919664332984)
- **Website:** [https://linktr.ee/ertapanjatakia](https://linktr.ee/ertapanjatakia)

## 11. Data Protection Officer (DPO) contact

The contact information designated for the Data Protection Officer (DPO) is:

- **Name:** Er. Tapan Jatakia (C. Eng.)
- **Email:** [cyber.litigation.advisor@gmail.com](mailto:cyber.litigation.advisor@gmail.com)
- **Phone:** [+91 9664332984](tel:+919664332984)
- **Website:** [https://linktr.ee/ertapanjatakia](https://linktr.ee/ertapanjatakia)

For privacy questions, data-protection requests, or concerns about this policy, contact the DPO using the details above. For general app support, use the developer/support contact. Do not disclose passwords, account credentials, or unnecessary sensitive information in a public GitHub issue.

The publication of these contact details identifies the project's designated points of contact; it does not, by itself, determine whether a statutory DPO appointment is legally required or establish compliance with any particular jurisdiction's data-protection law.

---

## Technical accuracy note

This policy is based on the current repository source: the app's in-memory locale/category/joke state, local-date daily selection, and explicit clipboard/share actions. It must be revalidated if the source, deployment configuration, Android wrapper, store SDKs, analytics, or third-party integrations change.
