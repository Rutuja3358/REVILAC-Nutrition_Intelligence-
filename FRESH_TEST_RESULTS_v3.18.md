# Fresh test results — v3.18

Run date: 2026-10-21. Runtime: Node.js v22.16.0, Python 3.13.5.

## Results
- `test_account_api_hardening.js`: 16/16 assertions passed.
- `test_account_sync_package.js`: 12/12 checks passed.
- `test_backup_restore.js`: 15/15 checks passed.
- `test_csv_export_safety.js`: 8/8 checks passed.
- `test_deep_workbench.js`: 20/20 static checks passed.
- `test_export_metadata.js`: 5/5 checks passed.
- `test_local_server_files.js`: 5/5 checks passed.
- `test_multi_measurement_picker.js`: 9/9 checks passed.
- `test_multi_measurement_save.js`: 10/10 checks passed.
- `test_multi_result_guard.js`: 4/4 checks passed.
- `test_nutrition_core.js`: 19 passed, 0 failed.
- `test_nutrition_ui_safety_gate.js`: 11/11 combined safety checks passed.
- `test_ocr_analyte_pairing.js`: 8/8 checks passed.
- `test_ocr_date_safety.js`: 5 passed, 0 failed.
- `test_ocr_numeric_ambiguity.js`: 9/9 checks passed.
- `test_production_preflight.js`: 13/13 preflight safety assertions passed.
- `test_pwa_package.js`: 9/9 checks passed.
- `test_report_file_safety.js`: 8 passed, 0 failed.
- `test_report_save_validation.js`: 10 passed, 0 failed.
- `test_terminology.js`: 7 checks passed.
- `test_terminology_runtime.js`: 7 checks passed.
- `test_ui_stored_id_safety.js`: 6 checks passed.
- `test_wellness_plan.js`: 14/14 checks passed.
- `run_synthetic_case_audit.js`: 8/8 fixture checks and 11 structural checks passed.
- `test_package.py`: structural audit passed; 66 starter terminology concepts detected.
- `deep_quality_audit.py`: 23/23 static checks passed.
- `production_preflight.js`: correctly exits with code 2 and identifies 11 production blockers (7 checks pass; 11 block). This is an expected negative result because production services and independent reviews are not configured.

## Limits
These are automated local regression/static/integration tests. They do not constitute a real-browser device matrix, security audit, clinical validation, OCR accuracy benchmark, live provider test, cloud deployment, or approval to handle real health data. Use synthetic/demo data only.
