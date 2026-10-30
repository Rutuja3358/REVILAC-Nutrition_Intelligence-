# REVILAC Nutrition Intelligence v3.33 — PWA cache consistency pass

## Change
- Bumped the service-worker app-shell cache key from v3.30 to v3.33 so users updating from older builds receive the current app shell instead of retaining a stale cache version.
- Updated the PWA regression test to assert the current cache version and reject the stale v3.30 key.

## Verification
- Full automated test suite and static checks were rerun for this package.
- This code-level fix does not change the production release decision: deployment, database, provider configuration, independent security/privacy review, clinical validation, real-device end-to-end tests, backup restore evidence and operational monitoring remain external release gates.

## Release status
Development/staging only; not certified production-ready. Use synthetic/demo data only until all release gates have evidence.
