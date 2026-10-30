# REVILAC Nutrition Intelligence — Zero-Cost Release Decision

**Code baseline:** v3.38.0  
**Decision:** LOCAL TESTING / DEMONSTRATION ONLY — NOT APPROVED FOR IDENTIFIABLE REAL PATIENT DATA  
**Budget assumption:** ₹0; no paid API, paid hosting, or paid OCR service assumed.

## What has been verified in this package

- `npm test`: 40/40 test scripts passed in the available environment.
- `npm run test:syntax`: 52/52 root JavaScript files passed.
- `python test_package.py`: structural checks passed, including parsing the inline JavaScript blocks.
- A synthetic, non-patient image was read through the localhost Tesseract endpoint and returned the expected text `Hemoglobin: 12.4 g/dL`.
- Production preflight ran and correctly returned BLOCKED: 7/22 checks passed, 15 blockers remain.

These checks verify code structure and selected logic only. They do not establish production readiness, medical-grade OCR, clinical accuracy, or security certification.

## Free local use

1. Install a supported Node.js version (20 or newer) and Python 3 if not already present.
2. Extract this ZIP on a computer you control.
3. In the extracted `REVILAC_Nutrition_Intelligence` folder, run `npm install` to install the declared dependencies if internet is available.
4. For local image OCR, install Tesseract OCR separately and ensure `tesseract` is on PATH. The local OCR route accepts PNG, JPEG, WebP, BMP, or TIFF images up to 15 MB.
5. Start the local app using the supplied local launcher or `node local-server.js`, then open the localhost address shown by the launcher. Do not expose the local server to a public network.
6. Use synthetic or de-identified reports for testing. Verify every detected value, unit, date, and range against the original document before saving.

This is a computer-local workflow, not a hosted cross-device service. Browser PDF extraction/scanned-PDF OCR currently loads helper libraries from a CDN and needs internet; local image OCR needs Tesseract installed on the same computer. This package does not guarantee OCR support for every language or report type.

## Why real-patient production use is still blocked

- The browser app stores data in localStorage, which is not encrypted clinical-record storage.
- Production PostgreSQL, HTTPS/domain, email OTP/recovery, and multi-instance throttling have not been verified against live services.
- Content Security Policy still allows inline scripts/styles for legacy UI; this needs security remediation and review.
- No independent security/penetration test, privacy/legal review, clinical/nutrition validation, real-device end-to-end review, or successful off-host backup restore drill is attached.
- OCR has not been benchmarked on a representative, consented/de-identified set of real report layouts/languages. The synthetic smoke test is not a clinical accuracy metric.
- The nutrition reference data's completeness, licensing and clinical applicability need review.

## Zero-cost path to readiness

Use local/synthetic data while completing the following with free tools and qualified volunteer/institutional review where available:

1. Remove or properly nonce/hash legacy inline scripts/styles and re-test CSP.
2. Add encryption at rest for sensitive local records and a safe key/recovery design; test export/deletion and device-loss scenarios.
3. Test on the intended Android/desktop devices and browsers.
4. Build a consented/de-identified OCR benchmark, measure errors by report family/language, and keep uncertain results in review state.
5. Have a qualified clinician/dietitian review all safety rules and nutrition guidance; do not infer diagnoses or prescribe treatment from OCR.
6. Run the included production preflight after actual deployment evidence exists. Do not fabricate release-evidence files or mark checks passed without real evidence.
7. Only consider real identifiable patient data after all gates pass and applicable privacy/legal obligations are met.

## Important distinction

A ₹0 local prototype can be useful. A secure public production service for real patient records cannot be honestly declared ready solely from code changes in this environment. Free tiers and free tools may help, but availability, limits, and provider terms can change. No credentials or patient records should be pasted into this chat.
