# REVILAC Nutrition Intelligence v3.14 — Account API Hardening Prototype

## Added
- Sync payload schema boundary for supported app data sections.
- Bounds on nested values, object keys, array counts, field sizes, and total payload size.
- Basic response security headers and lightweight local registration/login throttling.
- Account API integration test for registration, valid sync, invalid data rejection, round-trip and logout invalidation.
- Cross-device deployment checklist and explicit production gaps.

## Important limitations
- Local JSON persistence only; no hosted cloud database.
- No email/SMS OTP, verified account recovery, managed sessions/rate limiting, or production security review.
- No guaranteed background push notifications.
- Use synthetic data only.
