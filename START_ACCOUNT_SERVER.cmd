@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js 18 or later is required.
 pause
 exit /b 1
)
echo Starting REVILAC account/sync prototype at http://127.0.0.1:8001
echo Demo/synthetic data only. Do not expose this server to the internet.
echo Keep this window open. Press Ctrl+C to stop.
start "REVILAC Account & Sync" http://127.0.0.1:8001
set PORT=8001
node account-server.js
