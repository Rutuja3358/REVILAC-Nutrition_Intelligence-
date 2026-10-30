# REVILAC Nutrition Intelligence v3.38.1 — Readiness status

## Status: LOCAL DEMO / STAGING ONLY — NOT APPROVED FOR IDENTIFIABLE REAL PATIENT DATA

### Zero-cost local OCR in this package (v3.38.1 patch)
- Local image OCR endpoint uses an installed Tesseract executable where available.
- Local PDF endpoint first tries Poppler `pdftotext`; if no selectable text is found, it renders up to 20 pages with `pdftoppm` and runs Tesseract OCR.
- PDF request size is capped at 25 MB; image OCR is capped at 15 MB. PDF processing uses a temporary directory that is cleaned after the request, argument-array process calls (no shell interpolation), timeouts, and a page limit.
- Browser image/PDF OCR tries the local endpoint first. Browser/CDN fallback remains available when local tools or the local server are unavailable.

### Verified in this package
- Automated JavaScript tests: 41/41 passed.
- JavaScript syntax checks: 53/53 passed.
- Package structural checks and all 6 inline JavaScript blocks passed.
- Synthetic local image OCR returned the expected synthetic hemoglobin line.
- Synthetic text-based PDF was extracted locally by `pdftotext` and returned synthetic Hemoglobin/Glucose values.
- Synthetic scanned PDF was rendered locally and OCRed by Tesseract; expected synthetic Hemoglobin/Glucose text was recovered.

### Zero-cost use constraints
- The app can run locally without paid hosting. The included local server binds to 127.0.0.1.
- Local image OCR needs Tesseract installed on the same computer and available on PATH.
- Local PDF OCR needs Poppler utilities (`pdftotext`, `pdfinfo`, `pdftoppm`) and Tesseract installed on the same computer and available on PATH. Local OCR currently uses English (`eng`) data.
- Local OCR is not medical-grade. Only synthetic sample files were tested here; representative real medical report accuracy, multilingual performance and coverage across all report families have not been benchmarked.
- Data is saved in browser localStorage without encryption at rest. Anyone with access to the same unlocked browser profile may be able to read it.

### Release blockers (do not waive for budget reasons)
- LocalStorage encryption / secure storage design is not implemented or reviewed.
- Real-browser/device end-to-end tests, representative OCR benchmark, report-family coverage, clinical/nutrition validation and accessibility/translation review are incomplete.
- No independent security review, privacy/legal review, penetration testing or incident-response drill.
- Production hosting, database, email verification, TLS deployment, monitoring and backup/restore remain unverified. Paid infrastructure is not required for a private local prototype, but a zero-cost local run is not a production deployment.
- Food data provenance, licensing, portion coverage and nutrition calculation accuracy require verification.

## Release decision
Do not use this package to store identifiable real patient reports or make patient-specific clinical decisions. Use synthetic/de-identified reports for testing. Before real identifiable records are used, implement and independently review secure storage, access control, retention/deletion, and safety workflows, and obtain qualified clinical/privacy/security validation. No test count proves medical accuracy or production readiness.
