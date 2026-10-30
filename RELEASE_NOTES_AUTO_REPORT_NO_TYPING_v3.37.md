# REVILAC Nutrition Intelligence v3.37 — Automatic report upload, no typing

## Added
- Selecting a report file automatically starts extraction for supported PDF, image, TXT and CSV formats.
- Selectable PDF text is attempted first; scanned PDF OCR is attempted automatically when selectable text is absent or PDF text extraction fails.
- Report title defaults to the filename and can be replaced by a recognized report-family label.
- All confidently recognized supported measurements are queued automatically; no copying values into separate fields is needed.
- OCR/extracted text is read-only in the UI.
- Explicit visual confirmation is required before saving any detected measurements.

## Safety behavior
- Ambiguous numeric tokens are not silently normalized or queued.
- Units are preserved only when recognized; missing units are not fabricated.
- Reference ranges are not guessed if they cannot be confidently linked to a test.
- Saving measurements does not grant clinical clearance or produce a diagnosis.
- Original upload file is not retained by this browser-only workflow; extracted text and metadata are stored locally only after save.

## Verified in this environment
- `npm test`: 38/38 test scripts passed.
- `npm run test:syntax`: 50/50 root JavaScript files passed.
- `python test_package.py`: structural checks passed.
- All 6 inline JavaScript blocks parsed successfully.

## Not verified
- Browser-level real PDF/image OCR accuracy, real-world report coverage, OCR language accuracy, clinical safety, mobile end-to-end behavior, external providers, production security or production readiness. Internet is currently required to load OCR/PDF helper libraries.
