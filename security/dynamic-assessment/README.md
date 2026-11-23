# JestBox cloud dynamic assessment

This branch exists solely to trigger the isolated MobSF Android dynamic-assessment workflow after the scoped push trigger was merged.

The workflow builds a disposable debug APK from this branch's source commit and runs it in a GitHub-hosted Android API 30 emulator with a local MobSF instance. No production APK is uploaded to a public scanning service, and no release or distribution action is performed.

This assessment is supplementary security evidence, not a human-led penetration test or a release gate.
