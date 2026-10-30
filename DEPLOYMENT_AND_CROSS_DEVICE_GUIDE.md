# REVILAC cross-device deployment guide — v3.14

## What works in this development build
- Responsive web app/PWA shell and local browser storage.
- Local prototype account API with password hashing (scrypt), hashed bearer tokens, 8-hour expiry, logout invalidation, request-size limits, lightweight per-process attempt throttling, and basic sync-payload validation.
- Explicit upload/download for account data when the app and API are served by the same origin.

## What is not production-ready
This server stores account records and patient-like data in a local JSON file. It has no email/SMS OTP verification, no verified password reset, no managed database, no multi-instance session/rate-limit store, no encryption-at-rest key management, no independent penetration test, and no guaranteed background push notifications. The local rate limiter is only a prototype guardrail. Do not expose this server directly to the internet and do not enter real patient data.

## Local demo (Windows)
1. Extract the ZIP to a folder you control.
2. Run `START_ACCOUNT_SERVER.cmd` and keep its terminal open.
3. Open `http://127.0.0.1:8000` on that same computer.
4. Use synthetic/demo data only. The account data is saved under `server-data/accounts.json` beside the app.
5. Back up only synthetic test data; never upload that JSON file publicly.

## To make it genuinely cross-device
1. Deploy behind HTTPS on a managed host; never use plain HTTP over public networks.
2. Replace the JSON store with a managed database and enforce user-level access controls.
3. Add a real email/SMS verification provider and verified account recovery flow.
4. Move rate limiting and sessions to shared managed services; add monitoring, backups, retention/deletion workflows and incident response.
5. Review consent, privacy notice, data minimization and applicable law with qualified counsel.
6. Configure a real push-notification service if notifications must arrive while the app is closed; test on each target OS/browser.
7. Complete independent security testing, accessibility testing, browser/device E2E testing and clinical review before any real patient use.

## Safe test
Run `node test_account_api_hardening.js`. It starts a local test server, uses a synthetic account, checks validation and logout, and deletes the test-only local account store it created. Do not run it while another instance is using the same folder's `server-data`.
