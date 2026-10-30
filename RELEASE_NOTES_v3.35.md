# Release notes — v3.35

- Bounded and expiry-pruned the local food-search response cache.
- Strengthened production preflight so environment variables alone cannot masquerade as proof of independent reviews or successful operational drills.
- Added explicit evidence templates and kept all production gates blocked until real artifacts are supplied and reviewed.
- Updated regression tests for the cache bound and preflight evidence behavior.

Verification: `npm test` (37/37 scripts), `npm run test:syntax` (48/48 JS files). Production preflight remains blocked by design (7 passed, 14 blocked of 21).
