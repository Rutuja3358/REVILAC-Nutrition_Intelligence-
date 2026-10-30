# REVILAC Nutrition Intelligence v3.7 — Consolidated Safety & Test Packaging Repair

## Changes
- Added bounded backup restore validation to the actual `index.html` restore flow: 5 MB file/payload limit, 5,000 combined record limit, required collections/profile/preferences, allowed profile/preference keys, real ISO calendar dates, reminder field limits, and report text field limits.
- Added CSV formula-injection neutralization to `csvCell()` for cells beginning with whitespace followed by `=`, `+`, `-`, `@`, tab or carriage return.
- Included `test_backup_restore.js` and `test_csv_export_safety.js` in this package.
- Updated `RUN_TESTS.cmd` to run both test files.

## Validation actually run in this environment
- `test_terminology.js`: passed.
- `test_nutrition_core.js`: 19/19 passed (current working copy).
- `test_deep_workbench.js`: 20/20 static checks passed (current working copy).
- `run_synthetic_case_audit.js`: 8/8 passed.
- `test_ocr_date_safety.js`: 5/5 passed.
- `test_nutrition_ui_safety_gate.js`: 7/7 UI safety checks plus 4/4 planner regressions passed.
- `test_backup_restore.js`: 15/15 passed.
- `test_csv_export_safety.js`: 8/8 passed.
- `test_terminology_runtime.js`: 7/7 HTTP runtime assertions passed.
- `test_ui_stored_id_safety.js`: 6/6 static regression checks passed.
- `test_export_metadata.js`: 5/5 passed.
- `test_report_file_safety.js`: 8/8 passed.
- `test_multi_result_guard.js`: 4/4 passed.
- `test_multi_measurement_picker.js`: 9/9 static checks passed.
- `test_package.py`: structural checks passed.
- `node --check terminology-server.js`: passed.

## Not established by these tests
Browser end-to-end behavior, OCR accuracy, live external terminology API calls, formal security/privacy review, accessibility audit, and clinical validity are not established. This is a development prototype, not a clinically validated medical device. Use synthetic data until privacy/security review is complete.


### Additional terminology runtime hardening (working-copy update)
- Malformed percent-encoding in a URL path now returns HTTP 400 instead of throwing during path decoding.
- Added `test_terminology_runtime.js` for real HTTP checks: status endpoint, offline search, oversized query rejection, unknown system rejection, non-GET rejection, traversal rejection, and malformed-path handling.
- The new runtime test is included in `RUN_TESTS.cmd`.
- Local test result: 7/7 runtime assertions passed. This is not a browser end-to-end test or a clinical/security certification.

## Additional working-copy hardening (not yet packaged as a new release)
- Replaced inline JavaScript handlers that interpolated stored report/reminder IDs with escaped `data-*` attributes and a delegated click handler.
- Added `test_ui_stored_id_safety.js` with six static regression checks and wired it into `RUN_TESTS.cmd`.
- Targeted result: 6/6 passed. Package structural checks and inline JavaScript syntax check also passed.
- This is not a browser end-to-end test; full regression suite and final ZIP packaging remain pending.

### Follow-up maintenance — export metadata consistency
- Corrected the Eight-pillar workbench JSON export metadata from a stale `2.8 deep QA prototype` label to `3.7 development build`.
- Added `test_export_metadata.js` and wired it into `RUN_TESTS.cmd`.
- Targeted checks: 5/5 passed (current version label, stale-label absence, educational disclaimer, timestamp generation, report/safety context presence).
- This is a metadata consistency fix, not evidence of full browser or clinical validation.


### Report upload processing limits (working-copy update)
- Added a 15 MiB per-file limit for image OCR, selectable-text PDF extraction, and scanned-PDF OCR.
- Added a 50-page cap for selectable-text PDF extraction; scanned-PDF OCR retains its 20-page cap.
- Added `test_report_file_safety.js` and wired it into `RUN_TESTS.cmd`.
- Targeted static regression checks: 8/8 passed. Browser interaction and real-world OCR accuracy remain unverified.

### Multi-measurement review picker (working-copy update)
- When OCR/text parsing detects multiple recognized analytes, a dedicated selector now lets the user load one detected result into the single-measurement form at a time.
- The picker does not guess a reference interval; it clears that field and asks the user to verify the value/unit against the source report.
- The value-verification checkbox is reset whenever a different detected result is selected.
- Added `test_multi_measurement_picker.js` and included it in `RUN_TESTS.cmd`.
- Limitation: results are still saved individually; there is no bulk-save queue. This static test does not substitute for browser interaction testing.

### Browser interaction smoke run (working copy)
- Loaded the complete `index.html` in headless Chromium via an in-memory page and injected the local nutrition core module.
- Found and fixed one stale assertion in the in-app workbench test: it expected `Missing required report fields` while the validator correctly reports `Missing required report field: test.`.
- Follow-up browser run: built-in workbench self-checks, selected safety-flag hold, free-text exclusion hold, and no-risk sample rendering were exercised.
- This is a targeted Chromium interaction smoke test, not the complete app's upload/OCR/terminology journey, Android testing, or clinical validation.


### Report OCR numeric ambiguity hardening (working-copy change)
- Added a shared conservative OCR numeric normalizer. Decimal-comma values such as `4,5` can normalize to `4.5`, while values such as `1,234` (decimal vs thousands separator ambiguity) and mixed-separator values such as `1,234.5` are held for manual review instead of being auto-filled.
- OCR status now explicitly identifies ambiguous numeric tokens and tells the user not to rely on an automatic conversion.
- Added focused automated tests and registered them in `RUN_TESTS.cmd`.
- This is a data-quality safeguard, not OCR accuracy validation or clinical validation.

### OCR numeric whitespace ambiguity hardening (working-copy change)
- Tightened the shared OCR numeric normalizer so internal whitespace between digits (for example `1 234`) is not silently stripped into a potentially different value.
- Such tokens are now held for manual review with an explicit ambiguity reason.
- Expanded `test_ocr_numeric_ambiguity.js` to 9 checks; all 9 passed after the change.
- This is a conservative parser guard, not evidence of OCR accuracy or clinical validation.


### Verification inventory reconciliation (2026-10-21)
- Re-ran every `test_*.js` script present in the working copy: all 15 scripts completed successfully.
- Updated the reported nutrition-core and deep-workbench counts to match their current outputs (19/19 and 20/20 respectively).
- Re-ran `test_package.py` and `deep_quality_audit.py`: structural checks passed and deep static audit reported 23/23.
- This reconciliation updates documentation only; it does not expand browser, OCR-accuracy, live-provider, security, or clinical validation scope.
