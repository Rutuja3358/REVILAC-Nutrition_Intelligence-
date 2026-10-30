# REVILAC Nutrition Intelligence — Consolidated QA Status

Build: v3.16 Consolidated Free-First Development Package (based on v3.15)

## v3.16 account lifecycle hardening
- Added prototype API endpoint for changing password after checking the current password; other active sessions for that account are invalidated.
- Added password-confirmed account deletion, removing that user's local account record and sessions from the prototype JSON store.
- Expanded account API integration coverage for wrong/current password handling, old/new login credentials, deletion confirmation, and token invalidation.
- These changes remain local prototype controls. They do not provide verified email/mobile, password-reset recovery, MFA, managed database, encryption at rest, independent security review, or production readiness.


## Checks executed in this environment
- Final one-pass verification on 2026-10-21: all available `test_*.js` scripts and the synthetic-case audit script completed successfully in the working copy.
- Terminology smoke tests: PASS
- Nutrition core tests: 19/19 PASS
- OCR date-safety tests: 5/5 PASS
- Nutrition UI safety gate and meal-planner regressions: 11/11 PASS
- Backup restore validation: 15/15 PASS
- CSV export safety: 8/8 PASS
- Stored-ID UI safety static regressions: 6/6 PASS
- Export metadata checks: 5/5 PASS
- Report file safety checks: 8/8 PASS
- Multi-result guard checks: 4/4 PASS
- Multi-measurement picker static checks: 9/9 PASS
- Terminology runtime HTTP tests: 7/7 PASS
- Deep workbench static checks: 20/20 PASS
- Synthetic fixture audit: 8/8 PASS
- Package structural checks: PASS
- Deep static audit: 23/23 PASS
- `node --check nutrition-core.js`: PASS
- `node --check terminology-server.js`: PASS
- Final ZIP archive integrity: checked with `unzip -t` after packaging; passed.

## Targeted browser interaction smoke check (working copy)
- Loaded the application HTML in headless Chromium with the local nutrition-core module injected in memory.
- In-app workbench self-check: 6/6 PASS after correcting a stale expected error-message string.
- Selected safety flag blocks tailored meal-plan generation: PASS.
- Free-text exclusion blocks tailored meal-plan generation: PASS.
- No-risk sample-plan rendering path: PASS.
- Browser page errors during this targeted run: 0.
- Scope limitation: because this environment blocks direct file/localhost navigation for Chromium, this was an in-memory targeted interaction test—not the full upload/OCR/terminology end-to-end journey or a deployment-equivalent test.

## NOT TESTED / NOT VALIDATED
- Real report OCR accuracy across photographed, rotated, low-quality and multi-page files
- Full browser end-to-end interactions in Chromium/Android
- Live external terminology APIs and credential/licensing configuration
- Authoritative food nutrient data completeness and numeric nutrient calculations
- Clinical validity of any recommendation or risk rules
- Penetration/security testing, encryption at rest, authentication and production access controls
- Formal translation and accessibility audit

## Safe-use conditions
- Prototype only; synthetic/demo data only.
- Verify every extracted field against the original report before use.
- Data completeness does not mean a result is medically correct or normal/abnormal.
- No selected safety flag does not mean clinically low-risk.
- No recommendations in this prototype should replace a clinician or registered dietitian.
- Do not place real patient data or secrets in this build until privacy and security work is completed.

## Reproducibility
On Windows with Node.js 18 or later, extract this folder and run `RUN_TESTS.cmd`. Python audit scripts are optional and require Python. Save the full console output with the release evidence. A PASS in a static or deterministic test is only evidence for that test's scope.


## v3.9 report-save validation integration
- The main report save handler calls the shared report data-quality assessment before saving.
- Each saved report stores `dataQualityStatus`, `dataQualityIssues`, `clinicalInterpretation: NOT_PERFORMED`, and `clinicalClearance: false`.
- The timeline displays the saved status and CSV export includes the status and issue list.
- Incomplete records remain saveable for recordkeeping but are explicitly marked `incomplete-needs-review`; complete data fields are still marked `data-complete-needs-human-review`.
- Targeted report-save validation tests: 10/10 PASS.

## Final packaging note
This v3.9 section is historical. The current v3.10 package adds multi-measurement queue/save/review behavior. Version labels are development identifiers, not claims of clinical capability or validation.


## v3.10 multi-measurement workflow integration
- Added an in-form queue for multiple measurements per report, with per-entry confirmation and duplicate prevention.
- Stored each measurement's own data-quality status and issues; clinical clearance remains false.
- Updated timeline display, comparison grouping, CSV export, and clear-form behavior for measurement arrays.
- Added `test_multi_measurement_save.js` and wired it into `RUN_TESTS.cmd`.
- Browser end-to-end validation, OCR accuracy benchmarking, live official API verification, production security review, and clinical validation remain incomplete.


## v3.11 patient-led wellness routine integration
Added a dedicated daily-plan screen, multiple-choice routine setup, saved local preferences, daily check-ins, complete/snooze/skip actions, optional notification permission and expanded local profile fields. A new static integration test checks these UI contracts. This is a browser-local prototype, not account authentication or secure cloud storage. Background notification delivery is not guaranteed while the app is closed. Real email/mobile verification, secure multi-user accounts, hosted push delivery, clinical validation and end-to-end device testing remain outstanding.


## v3.12 cross-device/PWA readiness update
- Added PWA manifest, install prompt handling, SVG app icon, and static app-shell service worker.
- Added Node.js local server fallback for systems without Python.
- Added PWA and local-server regression tests to the automated suite.
- This does not yet provide public HTTPS hosting, authenticated cloud accounts, cross-device sync, email/SMS OTP, or guaranteed background notifications.


## v3.13 status — account/sync prototype
- Added an account/sync UI and a Node.js prototype API.
- Passwords use scrypt hashing; session tokens are stored hashed on the server and held in memory in the browser.
- Explicit sync only; upload/download can replace data and should be preceded by a backup.
- This does not yet provide verified email/SMS, password reset, MFA, managed cloud deployment, production-grade storage/security or background push notifications. Synthetic data only; not production-ready.

## Final note for v3.13
The account API smoke test was performed locally using a synthetic test account. The temporary server data was deleted before packaging. This validates basic prototype endpoint flow only; it is not a penetration test, not external hosting validation, and not permission to use real patient data.


## v3.14 account API hardening
- Sync API now permits PUT requests and validates the app data envelope, nested depth, field names, item counts, string sizes and total payload size.
- Adds lightweight per-process register/login throttling and additional response headers.
- `test_account_api_hardening.js` locally verified registration, sync upload/download, invalid payload rejection and logout invalidation (6/6).
- Still a local JSON-backed prototype; no OTP verification, password reset, managed cloud database, production shared rate limiter, HTTPS deployment, external security review or guaranteed background notifications. Synthetic data only.


## v3.15 free-first reliability update
- Fixed account sync validation to accept `nutritionContext`, a real top-level field saved by the current app.
- Extended the local API round-trip test to assert the nutrition context survives upload/download.
- Updated service-worker cache version and added `FREE_SETUP_AND_DEPLOYMENT_GUIDE.md`.
- Free local/PWA use is supported as a development path; internet-hosted multi-device use, verification providers, production security and closed-app push notifications are not complete. Synthetic data only.

## v3.16 verification run
- All 22 `test_*.js` scripts completed successfully after the account lifecycle changes.
- Account API integration assertions: 16/16 passed, including password change, rejection of incorrect current password, old/new credential behavior, password-confirmed account deletion, and deleted-token rejection.
- Wellness integration checks: 14/14 passed.
- PWA package checks: 9/9 passed.
- Account/sync package checks: 12/12 passed.
- Static package checks: PASS; deep quality audit: 23/23 PASS; synthetic fixture audit: 8/8 PASS.
- `node --check` passed for account-server.js, local-server.js, terminology-server.js, and nutrition-core.js.
- This run does not include live hosted multi-device tests, real-world OCR benchmark, independent security review, or clinical validation.
