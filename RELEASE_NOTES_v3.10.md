# REVILAC Nutrition Intelligence v3.10 — Multi-measurement report workflow

## Changes
- Add multiple individually confirmed measurements to one report before saving.
- Keep each measurement's test, value, unit, reference range, data-quality status and issues separately.
- Block exact duplicate queue entries.
- Display all measurements in the report timeline and include them in CSV export.
- Allow comparison grouping to consider measurements nested in report records.
- Clear queued measurements when the user clears the form.
- Add `test_multi_measurement_save.js` and include it in `RUN_TESTS.cmd`.

## Limitations
- Queue entries remain in memory until the containing report is saved.
- OCR extraction is best-effort and must be verified against the original report.
- No clinical interpretation or clinical clearance is performed.
- Full browser end-to-end, OCR accuracy, live official API, production security, and clinical validation are not established.
