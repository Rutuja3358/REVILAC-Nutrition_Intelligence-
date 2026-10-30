# REVILAC Nutrition Intelligence v3.37 — Readiness status

## Status: LOCAL DEMO / STAGING ONLY — NOT APPROVED FOR REAL PATIENT DATA

### New in v3.37
- Upload-first report workflow for PDF, common images, TXT and CSV.
- File selection starts extraction automatically.
- Selectable PDF text is attempted first; scanned-PDF OCR is attempted automatically when selectable text is unavailable or extraction fails.
- Report title is derived from filename and may be replaced by a recognized report-family label.
- Confidently recognized test/value pairs are queued automatically, removing the need to type extracted measurements into separate fields.
- Extracted text is read-only. Explicit visual confirmation against the original report is still required before saving measurements.
- Ambiguous numeric tokens are held back; missing units are not fabricated; reference ranges are left blank when they cannot be confidently linked to a test.

### Test evidence from the packaged ZIP
- `npm test`: 39/39 test scripts passed.
- `npm run test:syntax`: 51/51 root JavaScript files passed.
- `python test_package.py`: structural checks passed.
- All 6 inline JavaScript blocks parsed successfully.
- The packaged ZIP was extracted into a fresh staging folder and the above automated tests were rerun successfully.

### Not verified / blockers
- Real browser OCR performance and report-family coverage have not been benchmarked on a representative, consented/de-identified dataset.
- OCR helpers load from public CDNs and require internet; offline OCR is not included in this build.
- OCR currently uses English recognition; other report languages/layouts may be misread or not recognized.
- Uploaded original files are not retained; extracted text and metadata are stored locally only after the user saves the report.
- The parser supports only a limited set of common analytes. Unknown results may remain in the extracted text without being converted into structured measurements.
- The original browser localStorage data is not encrypted at rest.
- Live database, email provider, TLS deployment, production security review, privacy/legal review, clinical/nutrition review, device E2E, backup/restore and monitoring gates remain open.

### Release rule
Use synthetic/demo data only. Do not upload identifiable real patient reports until privacy, security and qualified clinical review gates are cleared. Automated tests do not prove clinical safety, diagnostic accuracy, complete report coverage or production readiness.
