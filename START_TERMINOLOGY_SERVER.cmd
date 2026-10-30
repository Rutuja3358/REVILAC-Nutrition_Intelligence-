@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (echo Node.js 18 or later is required. Install Node.js, then retry. & pause & exit /b 1)
if not exist .env copy .env.example .env >nul
echo Starting REVILAC Nutrition Intelligence + terminology adapter on http://127.0.0.1:8787
echo Configure .env for official providers. Keep secrets private.
start "REVILAC Nutrition Intelligence" http://127.0.0.1:8787
node terminology-server.js
pause
