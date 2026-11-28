# JestBox Coding Standards

## General principles

- Preserve offline-first behaviour and locally bundled application content.
- Keep the application lightweight and avoid introducing unnecessary network dependencies, analytics, accounts, or permissions.
- Prefer small, reviewable changes with regression coverage.
- Preserve supported locale identifiers and regional writing conventions.
- Avoid unrelated refactors in security-sensitive changes.

## JavaScript

- Use strict, readable JavaScript and explicit error handling.
- Keep application logic separate from build-time and validation scripts.
- Avoid dynamic code execution and unsafe HTML insertion.
- Validate untrusted values before using them in DOM, URL, file, or native bridge operations.
- Do not log secrets, personal data, or sensitive device information.

## Android and Capacitor

- Keep Capacitor as the selected Android architecture.
- Do not introduce a parallel native WebView application module without an approved architecture decision.
- Minimize manifest permissions and exported components.
- Keep WebView navigation/origin restrictions narrow.
- Treat plugins and native bridge calls as security boundaries; pass only the minimum data required.
- Never embed signing keys, passwords, access tokens, or private certificates in source.

## Content quality

- Do not add duplicate jokes, filler, literal translations that ignore regional usage, or culturally inappropriate material.
- Preserve the content schema and locale/category assignments.
- Run relevant content regression and diversity audits when modifying joke datasets.

## Tests and review

- Add or update tests for behaviour changes and security-sensitive fixes.
- Do not weaken/delete tests to obtain a passing result.
- Review dependency, permission, workflow, privacy, and release impact before approval.
- Keep documentation synchronized with actual implementation and verified CI evidence.

## Formatting

Follow existing repository formatting and naming conventions. Prefer descriptive filenames and stable script interfaces. Shell scripts should fail closed where safety depends on successful validation.
