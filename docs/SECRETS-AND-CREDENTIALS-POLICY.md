# JestBox Secrets and Credentials Policy

## Protected material

Protected material includes Android keystores, signing passwords, API tokens, GitHub credentials, private keys, recovery codes, and encrypted backups that enable recovery of signing material.

## Requirements

- Store secrets only in approved GitHub secret or protected Environment storage.
- Scope secrets to the smallest possible workflow/job and protected Environment.
- Never print, upload, commit, or include secret values or encrypted recovery material in summaries, logs, artifacts, issues, or pull requests.
- Use least-privilege permissions and disable persisted checkout credentials where appropriate.
- Do not expose production signing secrets to pull-request or fork builds.
- Clean temporary signing files and credentials after use, including on failure paths.
- Preserve existing signing identity; do not generate or rotate keys without explicit approval and verified recovery custody.

## Incident response

If a secret may have been exposed, restrict access, preserve relevant evidence, assess scope, and coordinate controlled revocation/rotation. Do not perform key rotation or deletion without an approved recovery plan where continuity of signing identity is required.

## Verification boundary

GitHub does not reveal secret values through repository APIs. The presence of a secret name does not prove its value is correct or that a workflow can use it. Record only independently verified outcomes, never secret contents.
