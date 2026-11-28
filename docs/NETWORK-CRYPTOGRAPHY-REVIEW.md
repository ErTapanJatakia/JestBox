# JestBox Network Transport and Cryptography Review

## Scope and current architecture

The product is designed as an offline-first static application with locally bundled content. The Android wrapper uses Capacitor and a narrow native sharing integration. Build workflows download dependencies, SDK components, scanner images and reports; those CI interfaces are distinct from application runtime network access.

## Review requirements

For every new runtime network interface, record:
- destination, purpose, data categories and direction;
- transport protocol and minimum TLS version;
- certificate and hostname verification behaviour;
- authentication and secret scope;
- redirects, proxy handling, timeout and retry behaviour;
- logging, retention and privacy implications;
- test evidence and owner.

Do not disable certificate verification or allow cleartext transport as a convenience workaround. Any exception requires explicit risk acceptance and a documented expiry.

## Cryptography

Use platform-maintained cryptographic libraries and APIs. Do not invent custom cryptographic protocols. Signing key material must remain in the protected production-signing boundary. Public certificate fingerprints may be documented; private keys, keystore bytes and passwords must never be committed or logged.

## Current review boundary

No independent runtime network interception or TLS penetration test is claimed by this policy. Reassess if JestBox adds remote APIs, telemetry, analytics, authentication, remote content, sync or other application-initiated network calls.
