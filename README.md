# REVILAC — Nutrition Intelligence | Consolidated Local-Testing Build v3.38.2

## Zero-cost mode
Start locally with `START_LOCAL_SERVER.cmd` and open `http://127.0.0.1:8000`. Use synthetic/demo data only. See [`ZERO_COST_EXECUTION_PLAN.md`](ZERO_COST_EXECUTION_PLAN.md) for the no-cost test sequence and [`PRODUCTION_READINESS_STATUS_v3.38.md`](PRODUCTION_READINESS_STATUS_v3.38.md) for current limitations.

**Important:** this is not approved for real patient data. Automated tests do not prove clinical safety, production security, OCR accuracy across all report types, or live multi-device behavior. The production preflight remains blocked until real infrastructure and independent review evidence exist.


## Quick start (Windows)
1. Extract this ZIP to a normal folder, e.g. `C:\REVILAC_Nutrition_Intelligence`.
2. Double-click `START_LOCAL_SERVER.cmd`. Keep its terminal window open.
3. In your browser open `http://127.0.0.1:8000`.
4. Use synthetic/demo data only. Do not enter real sensitive patient information in this prototype.
5. For source/syntax checks, run `RUN_TESTS.cmd`.

If Python is not installed, open `index.html` directly in a modern browser. Some browser features (especially PDF/OCR libraries) need internet and may not work when opened directly as a file.

## Release gate (v3.38.2)
This is a development/staging prototype, not production-ready. See `PRODUCTION_READINESS_STATUS_v3.38.md` and `FINAL_COMPLETION_MATRIX_v3.32.md` for the status of all 30 pinned sections. The v3.38 local run passed 41 JavaScript test scripts and 53 JavaScript syntax checks, plus package structural checks and synthetic local image, text-PDF and scanned-PDF OCR smoke tests. The production preflight correctly remains blocked until real hosting, security/privacy/clinical review, backup/restore and device-test evidence exist. Do not enter real patient data.

## Included functionality
- v3.37 automatic upload-first report flow for PDF, image, TXT and CSV files.
- v3.38 tries local Tesseract for image OCR and local Poppler/Tesseract for PDF extraction/OCR first when `local-server.js` is running and the tools are installed. Browser/CDN OCR remains a fallback. LocalStorage remains unencrypted; do not store identifiable patient data.

- Automatic report upload workflow: file selection starts extraction, the report title is derived from filename/report text, recognizable measurements are queued automatically, and no report values need to be typed. The user must still visually compare values and confirm before saving; uncertain fields remain unfilled or flagged.
- Best-effort local image OCR via Tesseract and local PDF extraction/scanned-PDF OCR via Poppler + Tesseract (up to 20 pages) when installed. Browser fallback uses public CDNs and needs internet.
- Common medical-test glossary in English, Marathi and Hindi, plus general guidance.
- Basic numeric comparison against a user-entered range (`low - high` or `low to high`) and arithmetic comparison of matching measurements over time.
- Individual food-source suggestions and alternatives based on selected nutrition topics and preferences; no recipes, dishes, or cooking instructions.
- Follow-up dates and optional browser notifications while page is open and browser permits them.
- JSON backup export/restore, CSV report export, and local data deletion.
- Core reports and wellness data save in browser localStorage. An optional local JSON-backed account/sync prototype is included; it is not a production cloud service and is not encrypted at rest.

## Test procedure
Run `RUN_TESTS.cmd` first. Then open the app and manually check:
1. Save a clearly synthetic report (e.g. `DEMO CBC`, metric `DemoMetric`, value `5`, unit `unit`, range `1 - 10`) and confirm it appears in history.
2. Add a second report with the same metric and unit but a different value and check the comparison.
3. Save food preferences and confirm individual food-source options appear (not dishes or recipes).
4. Add a follow-up reminder and confirm it appears in the list.
5. Export JSON and CSV; restore the JSON only after using demo data, because restore replaces local app data.
6. If internet is available, try OCR on a non-sensitive sample image and PDF. Check every extracted character against the original.
7. Reload the page and confirm the demo entries persist in that same browser profile.

## Honest verification status
- This package has automated structural checks and a JavaScript syntax check when Node.js is installed.
- Automated checks cannot prove that every button works in every browser. Run the manual steps above on the target Android device and Windows PC.
- Not clinically validated, not a diagnostic device, not a prescribed nutrition planner, and not security/penetration tested. OCR may misread numbers, decimal points, units, names, and ranges. Reference-range comparison is arithmetic only and can be misleading without clinical context.
- Data in localStorage is not encrypted. Use synthetic/demo records only until a proper privacy and security review is complete. Browser notifications are not guaranteed while the app is closed.


## Auto-fill from OCR (v1.1 test build)
After image/PDF extraction, the prototype attempts to identify a limited set of common report types, dates, ages, lab/source names, and selected measurements. Use **Auto-fill from text** to retry. This is best-effort pattern matching, not full report understanding; many formats/analytes will not be recognized, and ambiguous dates or OCR mistakes can be wrong. Check every field against the original report before saving. No clinical interpretation is provided.


## Branding update
Visible product branding is **REVILAC Nutrition Intelligence**. The Nutrition Intelligence wording and the visible Test Build/version footer have been removed as requested. This package remains a prototype and still requires functional, security, and clinical validation before real-world medical use.


## v1.3 Personal Food Guide
Added interactive food cards and a sample-day planner with topic selection (balanced nutrition, protein, iron, B12, vitamin D, calcium, weight goals and diabetes-aware ideas), vegetarian/eggetarian/non-vegetarian/mixed/vegan choices, budget, language (Marathi/Hindi/English), allergy text and goal preferences. Choices can be saved locally. Kidney/liver selections intentionally do not generate a disease-specific diet; they display a clinician/dietitian safety message. Suggestions are general education, not diagnosis or treatment. Allergy filtering is simple keyword matching and cannot guarantee allergy safety. Every food, unit, portion, allergy, and clinical restriction must be reviewed by the user and qualified clinician as appropriate.


## Advanced Nutrition Intelligence v2.0
- Adds a patient-context form and explainable food matching starter catalogue.
- Includes specific food identities, nutrient explanations, portion ideas and cautions.
- Includes plain-language definitions for common lab terms.
- Saves context locally only when the user chooses Save.
- Not a diagnosis, clinical decision support validation, complete medical-code catalogue, or replacement for a clinician/dietitian.
- OCR and any entered report values must be manually verified.


## Advanced v2.1 Medical Coding Hub

This version adds a searchable starter map for common laboratory observations and clinical concepts, organized by LOINC, ICD-11, SNOMED CT, HL7 FHIR, UCUM, RxNorm, ICF, and ATC. It intentionally does not invent numeric codes or claim to bundle every official code. Complete code sets are large, versioned, and may have licensing or access conditions. Production deployment requires official/authorized terminology sources, jurisdiction-specific mappings, version tracking, and clinical informatics review.


## Terminology Service Hub (v2.2 connector build)
This build adds a local Node.js adapter and UI for querying terminology providers. The adapter does not bundle proprietary/complete terminology datasets and does not assign codes automatically.

### Start the connected adapter (Windows)
1. Install Node.js 18+ (Node.js 24 is fine).
2. Double-click `START_TERMINOLOGY_SERVER.cmd`; open `http://127.0.0.1:8787`. Do not use the older Python-only server for live terminology searches.
3. Copy `.env.example` to `.env` and enter only the credentials/endpoints you are authorized to use. Restart the server after editing `.env`.
4. In the app choose **Terminology services**, check status, and search a term.

### Provider notes
- **WHO ICD-11:** Register at https://icd.who.int/icdapi and create API client credentials. The adapter requests an OAuth token server-side.
- **LOINC:** Requires LOINC account credentials for its FHIR terminology service; that service is currently marked beta by LOINC. Search uses the official service and results must be verified.
- **SNOMED CT:** Requires an authorized SNOMED CT edition and a compatible FHIR terminology endpoint. Configure `SNOMED_FHIR_BASE`; availability and licensing depend on jurisdiction and service.
- **Generic FHIR:** Optional endpoint for ValueSet expansion.
- **UCUM:** Units are standards, not a general diagnosis lookup service; unit normalization/conversion must be dimensional, explicit, and audited.
- **RxNorm, ICF, ATC:** Catalogues have separate coverage/licensing/jurisdiction considerations; they are listed as concepts in the starter mapping but are not falsely represented as live API connections in this adapter.

### Security and clinical safety
The adapter binds to `127.0.0.1` and keeps provider secrets on the local server, not in browser JavaScript. `.env` contains secrets; do not share it or include it in screenshots. Do not expose this adapter to the public internet without authentication, TLS, access control, rate limits, logging controls and security review. Search results are candidates, not a confirmed code mapping or diagnosis. Human review and official release/version checks are required. This is a prototype, not clinically validated.


## v2.3 Free-first terminology
- Works with a bundled local starter catalogue without account, API key, or internet access for local terminology search (Node.js is still needed to run the adapter).
- Starter catalogue contains common lab and condition concepts, aliases, context cautions, and intentionally blank code fields where an official code has not been verified. It does not pretend to include every LOINC/ICD-11/SNOMED CT code.
- Optional WHO ICD-11, LOINC and authorized SNOMED CT connectors remain available when configured. Their credentials/access conditions are separate; no credentials are needed for local mode.
- Do not treat a local concept match as a diagnosis or a confirmed official code. Validate exact code, version, specimen, method, units, jurisdiction, and clinical context before saving any mapping.


## v2.4 additions
- Clinical Intelligence page with conservative report-review prompts, safety-context checks, and JSON export of the review.
- Specific-food reference cards with nutrient categories, reasons and safety caveats. These are educational examples, not report-triggered prescriptions.
- Expanded local terminology starter catalogue (still incomplete; official code assignments intentionally left blank until verified).
- Medical coding coverage map for LOINC, ICD-11, SNOMED CT, UCUM, HL7 FHIR, RxNorm, ATC and ICF. This is a workflow map, not a bundled complete official code set.
- All local storage remains on this browser/device. Use synthetic/demo data only.


## v2.5 Terminology Integration + Node Smoke Tests
- Added `MEDICAL_CODING_INTEGRATION_GUIDE.md` with official terminology resources, setup, mapping workflow, privacy and clinical safety notes.
- `RUN_TESTS.cmd` now runs Node.js-only smoke tests, so the package check does not require Python.
- `test_terminology.js` tests the local catalogue, syntax, status API, local Ferritin search, invalid requests, home page, and a basic path traversal check.
- These tests do not call external providers and do not validate OCR accuracy or clinical recommendations.
- Provider adapters remain optional and require credentials/authorized endpoints. This release does not contain all official code sets and does not claim complete global medical-code coverage.


## v2.6 Eight-Pillar Deep Workbench
Added an integrated workbench covering: (1) report-field completeness, (2) terminology search using configured adapters, (3) specific food reference, (4) explainable nutrition-topic prompts, (5) patient safety flags, (6) English/Marathi/Hindi term explanations, (7) patient-controlled individual food-source alternatives (not meal plans or recipes), and (8) local logic checks plus JSON export. Workbench records are stored locally only. The food reference avoids invented nutrient quantities. The food-source selector is not a clinical diet. All modules are prototypes and require professional review and full testing before any real-patient use.

### v2.8 Deep QA follow-up
The meal planner now enforces a hard safety hold when any risk checkbox is selected: it stops before rendering meal suggestions and asks for qualified clinician/dietitian review. This is still a prototype and must not be used as a clinical decision system. See `DEEP_QUALITY_AUDIT_REPORT.md` for tests and untested areas.

## Consolidated QA candidate v3.0

Run `RUN_TESTS.cmd` to execute the local terminology smoke tests and the dependency-free deep workbench static checks. Read `RELEASE_STATUS_v3.0.md` for exact results and limitations. Passing static checks does not mean browser interactions, OCR accuracy, clinical validity, external APIs, or security have been validated.

## v3.2 Deep development candidate
This package adds a shared conservative validation layer (`nutrition-core.js`) and 10 deterministic tests (`test_nutrition_core.js`). Report validation now checks missing fields, ambiguous numeric values, reference-range formatting, invalid/future dates, and missing original report transcription. These checks are data-quality checks only, not clinical interpretation. See `DEEP_DEVELOPMENT_STATUS_v3.2.md` for the eight-area status and explicit limitations. Use synthetic data only; OCR, browser workflow, live API, security and clinical validation remain incomplete.


## v3.3 consolidated development candidate
See `RELEASE_NOTES_v3.3.md` and `FINAL_CONSOLIDATED_STATUS.md` for the latest conservative validation changes and the explicit PASS / NOT TESTED boundary. This remains a prototype; use synthetic data only.

## v3.4 OCR date safety update
The report auto-fill logic now avoids silently guessing ambiguous day/month dates and validates calendar dates before filling. Ambiguous dates remain for manual review. Run `node test_ocr_date_safety.js` or use `RUN_TESTS.cmd` on Windows. This is a guardrail improvement, not proof of OCR accuracy; always verify extracted values against the source report.


## v3.5 safety-gate update

The Nutrition Intelligence food-match panel pauses personalized matching for selected medical/safety contexts, age under 18, allergy/exclusion notes, invalid ages, and kidney/liver topics. This is a conservative software guardrail, not a clinical risk score or clinical validation. See `RELEASE_NOTES_v3.5.md` for the current automated test results and limitations.

## v3.6 safety-gate update
The Practical Meal Planner blocks tailored output whenever any safety checkbox is selected or the allergy/restriction notes or preferences/exclusions field is non-empty. Free text is not interpreted automatically because keyword matching cannot reliably establish allergy safety. Review `RELEASE_NOTES_v3.6.md` for limitations. Use synthetic data only; browser localStorage is not encrypted.


## Current build status (v3.10)
This README includes historical feature notes from earlier builds. The current consolidated development package is v3.11. Run `RUN_TESTS.cmd` for the current test inventory. Automated checks do not establish browser end-to-end behavior, OCR accuracy, live official API correctness, privacy/security, or clinical validity. Use synthetic/demo data only.


## v3.9 historical report-save data-quality status
The report save workflow now calls the shared data-quality assessment and stores its status and issue list with each report. The timeline displays that status and CSV export includes it. Saving remains possible when fields are incomplete, but the record is explicitly marked `incomplete-needs-review`; complete fields are marked `data-complete-needs-human-review`. Neither status is clinical clearance or a diagnosis. The source-confirmation checkbox records the user's confirmation only and does not establish correctness. See `RELEASE_NOTES_v3.9.md`.


## v3.10 multi-measurement report workflow
The report form can queue several individually confirmed measurements into one report record. Each queued measurement stores its own test label, value, unit, reference range, data-quality status, and issues. Exact duplicate entries are blocked in the queue. The timeline renders all measurements; trend comparison can use measurements from multi-measurement records; CSV export includes the full measurement array as JSON text. Queue entries remain in memory until the user saves the report and are cleared by the Clear form action. This is still data-quality checking, not clinical interpretation or clearance.


## v3.11 patient-led wellness routine (development prototype)
The v3.11 update adds a daily-plan screen with conditional-style multiple-choice onboarding fields for goal, food preference, activity level, sleep, wake/bed times, language, reminder categories and a higher-risk context guardrail. It creates a locally stored starter routine for hydration prompts, meal routine, movement, optional gentle yoga, mindfulness, sleep wind-down and daily check-in. Users can mark tasks complete, snooze or skip, and reset today's check-in. Profile fields now include optional birth year, email, mobile and accessibility preference. The values remain in this browser's localStorage and are not an account or secure cloud profile.

**Notification limitation:** the browser notification helper checks schedules while the app is open and can send a reminder near the selected time only when the browser is running and permission is granted. It does not guarantee daily background notifications while the app is closed. Reliable delivery requires a properly hosted PWA/native app and further device testing; server-side push also requires delivery infrastructure. Email/mobile sign-up, verified OTP, secure multi-user account isolation and cloud sync are not implemented by this local-only update and must not be represented as complete.

Wellness suggestions are general education only. Exercise, yoga, fluid intake and food choices must be individualized for allergies, clinician-prescribed limits and relevant conditions. This build is not clinically validated.

## v3.12 PWA / multi-device readiness update

This package now includes `manifest.webmanifest`, `service-worker.js`, an SVG app icon, and a dependency-free `local-server.js`. On Windows, run `START_LOCAL_SERVER.cmd`; if Python is unavailable, the launcher falls back to Node.js. Open `http://127.0.0.1:8000`. In a supported browser, use the displayed **Install app** action or the browser's own Install/Add to Home Screen menu when available.

This is **PWA installability groundwork**, not internet hosting. Local browser data is still local to that browser/device; no cloud account sync, secure production login, email/SMS OTP, or guaranteed closed-app notifications are included. For access from multiple devices with one patient account, a hosted HTTPS deployment, authenticated backend, database, recovery/verification providers, access controls, backups and privacy/security review must be implemented and tested. Do not enter identifiable patient data into this development prototype.


## v3.13 Account & cross-device sync prototype

- New `Account & sync` screen provides prototype registration/login and explicit upload/download sync for the current browser's REVILAC data.
- Start with `START_ACCOUNT_SERVER.cmd` (Node.js 18+), then open `http://127.0.0.1:8000`. This command uses `account-server.js`, not the static-only local server.
- Prototype API endpoints: `GET /api/health`, `POST /api/register`, `POST /api/login`, `GET /api/me`, `GET /api/data`, `PUT /api/data`, `POST /api/logout`.
- Passwords are hashed with Node.js `scrypt`; session tokens are random, stored hashed server-side and held in browser memory only. Sessions expire after eight hours. The server data file is `server-data/accounts.json` and is created with restrictive local file permissions where supported.
- **Demo data only. Do not enter real patient or health data.** This prototype is not production-secure and does not implement email/mobile verification, password reset, MFA, cloud deployment, a managed/encrypted database, shared/production-grade rate limiting, audit logging, or full security/privacy compliance. A small in-process prototype throttle and sync-payload validation were added in v3.14.
- Cross-device sync works only when both devices can securely reach the same deployed server. The default binds to `127.0.0.1` for local-only testing. Public hosting requires HTTPS, a hardened production deployment and independent security review. Do not expose this prototype server to the internet.
- Sync is explicit and destructive in each direction: Upload replaces the account data; Download replaces local browser data. Export a backup first. No automatic background sync is performed.

## v3.13 note
This release adds an experimental account-and-sync API, but it is not a public cloud service. The server defaults to loopback (`127.0.0.1`). Do not change it to a public bind or forward its port. Cross-device account sync requires a properly secured shared deployment; that deployment is not included in this ZIP.


## v3.14 Account API hardening prototype
- Adds bounded sync payload validation, top-level data-field allowlist, nesting/field/string limits, basic security response headers and lightweight per-process registration/login throttling.
- Adds a local account API integration test covering register, data upload/download, invalid payload rejection and logout.
- See `DEPLOYMENT_AND_CROSS_DEVICE_GUIDE.md` for local use and the exact requirements still needed for a real hosted multi-device deployment.
- These are prototype safeguards, not a production security certification. Do not expose the local JSON-backed server to the public internet or use real patient data.


## v3.14 tested change
The v3.14 local account API integration test uncovered and fixed a method-gate bug that previously blocked `PUT /api/data` sync requests. The test now exercises valid upload/download, rejects unsupported fields and oversized strings, and confirms logout invalidates the token. This is a local prototype test only.


## v3.15 free-first reliability update
- Fixed a sync allowlist mismatch: the current app's `nutritionContext` field is now accepted and validated by the prototype account API, so the app's normal data shape can round-trip. The integration test now asserts this field survives upload/download.
- Bumped the service-worker shell cache name so browsers can distinguish this release from earlier cached app shells.
- Added `FREE_SETUP_AND_DEPLOYMENT_GUIDE.md` describing what can be done without paid APIs, local/PWA use, deployment caveats, and why this prototype must not be publicly exposed or used with real patient data.
- This is still a local prototype. Free hosting availability and persistent storage vary; no real cloud deployment, verified OTP, password recovery, or guaranteed background notifications are included.

## v3.16 account lifecycle hardening
The local account prototype now supports password change (requires the current password) and password-confirmed account deletion. Changing a password invalidates other sessions. These are prototype API features, not verified email/mobile or account recovery. See `FIVE_PHASE_COMPLETION_PLAN.md` for a consolidated checklist of what is implemented, what still needs testing, and what requires hosting/providers or qualified reviewers.

## Production readiness gate (v3.17)
See `PRODUCTION_READINESS_GATE_v3.17.md` before any deployment. The current package is **NOT PRODUCTION READY** and must use synthetic/demo data only. The local account API is a prototype, not a secure managed cloud service. A green automated test suite does not establish clinical validity, security certification, live cross-device hosting, or guaranteed closed-app notifications.


## v3.19 final branding pass
- Product name is **REVILAC**. The PWA manifest name and short name are both `REVILAC`.
- Branding text was normalized across the current package; historical release-note content may still describe the evolution of earlier versions.
- This is a development/staging build, **not production-ready**. Use synthetic data only until security, privacy, cloud deployment, and clinical validation are completed.


## Production status (v3.21)
Fresh package tests passed, but this is not production-ready. See `PRODUCTION_REMAINING_WORK_v3.21.md` and run `node production_preflight.js` in the actual staging environment. Do not use real patient data.

## v3.22 Vision & About
The main navigation now includes **Vision & About**, with the product vision, intended workflow, capability boundaries, design principles, and current readiness gate. This page is informational and does not change the clinical scope of the prototype. See `RELEASE_NOTES_v3.22.md` for verified checks and remaining limits.


## v3.23 patient-first quick food alternatives
The Nutrition Guidance page includes a local Quick Food Alternatives tool for budget, protein-containing foods, fibre, dairy-free ideas, quick meals and familiar meal variety. It filters by broad food pattern, supports Marathi/Hindi/English, and pauses suggestions when allergy or prescribed-restriction text is entered. It is educational only; do not use it to establish allergy safety or therapeutic diets. See `RELEASE_NOTES_v3.23.md`.


## v3.24 patient usability update
Quick Food Alternatives includes Marathi and Hindi food-name/explanation translations for the starter examples. Translation completeness is not a substitute for native-speaker review. The starter catalogue is not comprehensive; allergy/restriction text pauses suggestions rather than claiming safety.


## Universal report-to-nutrition routing (new)

See `UNIVERSAL_REPORT_NUTRITION_ROUTER.md`. The Add Report screen now includes automatic keyword-based routing across 26 starter report families. For larger terminology coverage, obtain an official LOINC CSV under its current license terms and run `python import_loinc_catalog.py path/to/Loinc.csv`; the generated local `loinc_report_registry.json` is loaded by the browser app when served from the project folder. Imported terminology matches are candidates only and do not automatically create nutrition advice. Run `node test_universal_report_nutrition.js` to test the router.


## v3.29 patient-controlled food and activity classification
- Adds a 10-category food-source picker with selectable items, qualitative nutrient associations, optional portion recording, and planned/eaten/rejected states. A limited starter subset now shows approximate portion-scaled values with explicit verification warnings; it is not a complete verified composition database.
- Adds ability-class movement options (bed-based, seated, walking, gentle adapted yoga, restricted/clinician review) and safer alternatives. This is not an exercise prescription.
- Adds a rotating optional food-source example and browser read-aloud where supported.
- Documents the pinned 30-section scope in `REVILAC_30_SECTION_SCOPE.md`.
- The report router has an expanded starter registry (including symptoms/headache, eye, dental/oral, cardiac, respiratory/sleep and genetic families) and an unknown-report fallback. It does not cover every report worldwide and imported terminology matches are not clinical interpretations.
- Run `node test_final_guidance.js` plus the existing tests. Structural and unit tests do not establish clinical validity, complete report coverage, browser end-to-end readiness, privacy/security certification, or background notifications. Use synthetic/demo data only.


## Patient-controlled food and activity options (integrated scope)
- The Daily Wellness page contains a food category → specific food selector, Other Options across categories, portion entry, and planned/eaten/rejected tracking. It does not suggest recipes.
- A limited starter subset can show approximate nutrient estimates for entered grams. These estimates are for software demonstration and must be checked against current authoritative food-composition records before clinical use. Other foods show nutrient associations without inventing numeric values.
- Voice input and read-aloud use browser/device APIs where available; support varies by browser and language. Large controls and category labels provide a non-voice alternative.
- Activity options include bed-based, seated, walking, adapted gentle yoga and restricted/no-exercise review. The software does not prescribe exercises for a restricted user.
- The report registry includes laboratory, imaging, pathology, symptom/general clinical note, eye, dental/oral, cardiac, respiratory, genetic and other report families. A match is a candidate, not a verified interpretation. Unknown or high-risk reports are routed to review.
- See `REPORT_COVERAGE_AND_NUTRITION_ROUTING.md` and `REVILAC_30_SECTION_SCOPE.md` for scope and limitations.

## Build approach
The requested workflow is to finish the integrated feature set first, then run the full automated suite and package checks once at the end. Adding a test file to the suite does not mean that suite has been run.


## Online food-composition lookup (free-first)
The Nutrition Calculator now has an optional online search for individual food records from USDA FoodData Central. Run `START_LOCAL_SERVER.cmd` with Node.js 18+ to use the local `/api/food-search` proxy; the API key is kept on the server, not in browser code. If `FDC_API_KEY` is not configured, the server falls back to the public `DEMO_KEY`, which is rate-limited. To use a personal key, copy `.env.example` to `.env`, set `FDC_API_KEY`, and keep `.env` private. The lookup imports only recognized nutrient names/units for non-branded database records; branded records are name-only because serving basis can differ. Review each value and food form before adding it to a daily total. Online lookup is optional and can fail if the internet/provider is unavailable. This is not a complete food database and does not provide individualized nutrient targets.


## v3.36 production-candidate notes

- `production-server.js` is the PostgreSQL + email-verification production-candidate entry point. It requires `pg` and `nodemailer`, `DATABASE_URL`, SMTP settings, an HTTPS `APP_ORIGIN`, and a high-entropy `REVILAC_SESSION_SECRET`.
- `account-server.js` remains a local-only prototype server. Do not expose it to the internet.
- Review `PRODUCTION_DEPLOYMENT_GUIDE_v3.36.md`, `docker-compose.production.yml`, and `Caddyfile` before deployment.
- Passing automated tests does not mean clinical, security, privacy, OCR, accessibility, or production deployment validation is complete. Use synthetic data until every release gate is independently verified.

## v3.37 automatic no-typing report workflow
- Select a PDF/image/TXT/CSV file; extraction starts automatically.
- The title is filled from the filename and may be replaced when a recognized report family is found. An unambiguous date may be extracted; otherwise the current date is the upload-date fallback.
- Recognized values are queued automatically where a test name and numeric value can be identified. The parser does not silently guess ambiguous numbers. Reference ranges are left blank when they cannot be confidently bound to the correct test.
- No manual typing is required for detected fields, but the patient must compare the queue with the original report and tick the confirmation checkbox before saving. This human check is intentionally retained for safety.
- This is still best-effort OCR, not medical-grade extraction. It has not been benchmarked against a representative real-report dataset; use synthetic/demo data until privacy, security and clinical review gates are cleared.


## v3.38 local image OCR (zero-cost option)
Run `START_LOCAL_SERVER.cmd` on a computer with Node.js. For offline image OCR, install the free Tesseract OCR program on that same computer and ensure `tesseract` is available on PATH, then restart the local server. Open `http://127.0.0.1:8000`. The app attempts local image OCR before the browser fallback. This local OCR endpoint only binds to localhost and accepts images up to 15 MB. It is English-only in the current endpoint. PDF text extraction/scanned-PDF OCR still needs internet to load browser libraries. This does not encrypt saved data or approve real patient use.


## v3.38 zero-cost local PDF OCR update
- The local server exposes `/api/local-pdf-ocr`. It tries native PDF text extraction with Poppler first, then renders scanned PDFs and uses Tesseract. PDF processing is limited to 25 MB and 20 pages per request.
- Install Tesseract OCR and Poppler utilities on the computer running the local server; these are free open-source tools. The built-in OCR currently uses English language data.
- In the report form, choose the PDF and click **Read PDF text** or **OCR scanned PDF**. The app tries local processing first, then falls back to browser libraries if local processing is unavailable.
- All extracted values still require visual verification. This is not medical-grade OCR or clinical validation.


## v3.38.2 privacy hardening
- Report save no longer persists the raw OCR transcription, uploaded filename, or free-text notes in the saved report record. OCR text is used transiently for parsing and validation only.
- The upload section explicitly discloses that structured measurements and report details remain in readable browser localStorage and are not encrypted.
- This reduces unnecessary retained data but does **not** make the app safe for identifiable patient data. Real-patient use remains blocked pending encryption/access-control design, security review, clinical validation, and OCR benchmarking.


## v3.38.8 workspace layout refresh
The primary navigation is now grouped around Home, Add report, Nutrition guidance, Nutrition intelligence, My daily plan and Report timeline. Additional pages remain accessible under **More tools**. The emerald-green responsive styling changes presentation only; existing report/nutrition logic is retained. See `UI_LAYOUT_REFRESH_v3.38.8.md` for fresh test results and limitations.
