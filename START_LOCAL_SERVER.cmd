@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
  echo Starting REVILAC local PWA server at http://127.0.0.1:8000
  echo Online food database lookup is available through the Node.js server.
  echo Keep this window open while using the app. Press Ctrl+C to stop.
  start "REVILAC Nutrition Intelligence" http://127.0.0.1:8000
  node local-server.js
  goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
  echo Starting static REVILAC app at http://127.0.0.1:8000
  echo Note: Python static mode does not include the online food database proxy.
  start "REVILAC Nutrition Intelligence" http://127.0.0.1:8000
  py -m http.server 8000 --bind 127.0.0.1
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  echo Starting static REVILAC app at http://127.0.0.1:8000
  echo Note: Python static mode does not include the online food database proxy.
  start "REVILAC Nutrition Intelligence" http://127.0.0.1:8000
  python -m http.server 8000 --bind 127.0.0.1
  goto :eof
)
echo Python or Node.js is required. Install Node.js 18+ or Python 3, then retry.
pause
