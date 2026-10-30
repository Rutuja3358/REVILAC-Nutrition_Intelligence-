@echo off
setlocal
if "%~1"=="" (
  echo Usage: IMPORT_LOINC_CATALOG.cmd path\to\Loinc.csv
  echo First obtain the official LOINC release and review its license terms.
  pause
  exit /b 2
)
python import_loinc_catalog.py "%~1" loinc_report_registry.json
pause
