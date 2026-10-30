# REVILAC Nutrition Intelligence — Production Readiness Gate (v3.17)

## Release decision
**Status: NOT PRODUCTION READY.** This package is a local development/prototype release. Use synthetic/demo data only. Do not expose the prototype account server to the public internet or store identifiable patient records in it.

## Verified in this package
- Node.js automated regression tests and syntax checks can be run locally with `RUN_TESTS.cmd` on Windows (Node.js 18+).
- Structural/static package audits and synthetic fixture checks are included.
- The local account API supports prototype registration/login, token-authenticated sync, password change and password-confirmed account deletion; tests exercise those flows using synthetic data.
- PWA shell/manifest assets are present. This is not proof of installability or offline behavior on every device/browser.

## Mandatory blockers before real users or real health data
1. **Hosting and database:** deploy only behind HTTPS; replace local JSON file storage with a managed, backed-up database, transactions/concurrency control, migrations, retention policy and tested restore procedure.
2. **Identity and account recovery:** integrate real email/mobile verification, secure password reset, session revocation and appropriate MFA. Never claim OTP delivery unless a real provider is configured and verified.
3. **Security/privacy:** independent threat model and security review; encryption in transit and at rest; secrets management; shared rate limiting; audit logging; access-control review; CSRF/CORS/CSP policy; vulnerability/dependency scanning; incident response and data deletion/retention procedures. Current local JSON data store is not production-grade.
4. **Regulatory/legal review:** determine applicable Indian privacy, health-data, consumer-protection and medical-software obligations with qualified counsel. Obtain valid consent and publish a reviewed privacy notice and terms.
5. **Clinical/nutrition validation:** registered dietitian/qualified clinician review of food data, units, reference ranges, safety rules, contraindications and plan logic. Maintain provenance, versioning and update process. No clinical clearance is asserted by this app.
6. **OCR validation:** benchmark against a representative, permissioned corpus of clear/blurred, rotated, multi-page and different-lab reports; measure field-level accuracy and abstention; require human confirmation against source documents.
7. **Notifications:** implement and verify platform-appropriate scheduling and push delivery. Browser-local reminders do not guarantee delivery while the app is closed; web push needs subscription, server delivery, permission handling and failure/retry controls.
8. **End-to-end and device QA:** test complete journeys on real Android/iOS devices and desktop browsers, slow/offline networks, account switching, data conflicts, backup/restore, accessibility, keyboard/screen readers, localization and timezone/daylight changes.
9. **Operations:** monitoring, alerting, logs with no sensitive payload leakage, backups, restore drills, release rollback, dependency updates, support process and incident runbooks.
10. **Release sign-off:** document named owners, test evidence, known issues, data-flow map, threat model, clinical approval and go/no-go decision.

## Suggested staged rollout
- **Stage A — Local demo:** synthetic data only; local server; no public internet exposure.
- **Stage B — Private test:** HTTPS staging, managed database, test accounts, no real clinical reliance; security and end-to-end QA.
- **Stage C — Limited pilot:** only after privacy/legal/security/clinical sign-off, documented consent, incident process and supervised evaluation.
- **Stage D — Production:** only after all blockers above are closed and independently evidenced.

## Re-run tests
From the extracted project folder run `RUN_TESTS.cmd`. The API integration test uses a temporary directory so it does not delete or overwrite a developer's existing `server-data` folder. Test PASS means only the exercised behavior passed; it is not a security certification or clinical validation.
