@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 18 or later is required for the built-in test suite.
  exit /b 1
)
set "FAILED=0"
echo === REVILAC Nutrition Intelligence automated test suite ===
for %%F in (test_*.js) do call :run node "%%F"
for %%F in (account-server.js local-server.js terminology-server.js nutrition-core.js universal-report-nutrition.js report-wellness-integration.js fooddata-central-client.js revilac-final-guidance.js) do if exist "%%F" call :run node --check "%%F"
where python >nul 2>nul
if not errorlevel 1 (
  call :run python test_package.py
  call :run python deep_quality_audit.py
  call :run python test_http_smoke.py
) else (
  echo SKIP: Python package/static audits (Python not installed)
)
echo.
if "!FAILED!"=="0" (
  echo AUTOMATED TEST SUITE PASSED.
  echo Browser end-to-end, real-world OCR accuracy, live external APIs, security and clinical validity are not established by this suite.
  exit /b 0
) else (
  echo AUTOMATED TEST SUITE FAILED. Review the failures above.
  exit /b 1
)
:run
%*
if errorlevel 1 (
  echo FAIL: %*
  set "FAILED=1"
) else (
  echo PASS: %*
)
exit /b 0
