# REVILAC — Five-phase completion plan (free-first, honest status)

This checklist separates code already present from work that needs external infrastructure or human validation.

## Phase 1 — Local application verification
- [x] Automated JavaScript tests are included in `RUN_TESTS.cmd`.
- [x] Package and syntax checks are included.
- [ ] User must run `RUN_TESTS.cmd` on their own Windows computer and share any failures.
- [ ] Manual Android/Windows browser checks: upload a synthetic report, review OCR output, save multiple measurements, compare reports, export/restore demo data, and verify no console errors.

## Phase 2 — Account, authentication, and sync
- [x] Local prototype registration/login, password hashing with scrypt, hashed session tokens, validated explicit sync, password change, and password-confirmed account deletion.
- [ ] Email/mobile ownership verification and account recovery.
- [ ] Managed persistent database, database backups/restore drills, secure secrets management, HTTPS, shared rate limiting, MFA, session/device management, independent security review.
- [ ] Cross-device sync conflict strategy and data migration tests.

## Phase 3 — Wellness and notifications
- [x] Browser-local wellness routine and best-effort reminders are present in the prototype.
- [ ] Validate reminder time zones, daylight-saving changes, permission denial, duplicate schedules, pause/resume, reboot, offline, and app-closed cases on target devices.
- [ ] Reliable background push requires a supported push service and platform configuration; delivery cannot be promised by a browser timer alone.
- [ ] Clinician-reviewed safe content for exercise/yoga, condition-specific restrictions, and age-appropriate routines.

## Phase 4 — OCR and nutrition data
- [x] Best-effort OCR helpers, human confirmation gates, report data-quality labels, local starter terminology, and basic nutrition guidance exist.
- [ ] Benchmark OCR against a diverse, consented, de-identified report corpus (rotated, blurry, multi-page, tables, decimals, units, different labs).
- [ ] Build a source-attributed nutrient catalogue with licensing, serving-size/unit normalization, and independently tested calculations.
- [ ] Verify official terminology/API access and licenses where relevant.

## Phase 5 — Cross-device, privacy, and clinical validation
- [x] PWA manifest/service worker and local development server exist.
- [ ] Deploy to a real HTTPS host with persistent database and backups; confirm free-tier limits before use.
- [ ] Test supported Android, iOS/iPadOS, Windows, browsers, install/offline behavior, and assistive technologies.
- [ ] Privacy impact assessment, data retention/deletion verification, encryption-at-rest plan, access-control review, and independent security test.
- [ ] Qualified clinicians/dietitians validate the intended workflow and all health-facing copy before any real-patient use.

## Free-first boundary
Local development, synthetic test data, automated tests, browser-local features, and a prototype PWA can be worked on without paying a hosting/API bill. Public multi-device sync, verified OTP, reliable push, official licensed datasets, production security, and clinical validation may require provider services, credentials, licensing, infrastructure, and qualified reviewers. Never represent these as complete unless actually deployed and tested.
