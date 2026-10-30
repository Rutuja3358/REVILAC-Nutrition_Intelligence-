# REVILAC Nutrition Intelligence — Start Here (v3.38.8)

## What was added in this consolidated build
- PWA shell cache version updated to v3.38.8.
- One-command local static deployment build: `npm run build:pages`.
- Manual GitHub Pages workflow (`.github/workflows/deploy-pages.yml`) that runs syntax and regression tests and publishes only an explicit allowlist of frontend assets.
- Zero-cost public launch guide and a local QR generator for the final public app URL.
- The production preflight remains a release gate; missing independent evidence is not silently marked complete.

## Local checks on Windows
Install Node.js 20+ first. Open PowerShell in the extracted project folder and run:

```powershell
node -v
npm -v
npm run test:syntax
npm test
npm run test:production-contract
npm run build:pages
```

The `dist` folder is the static PWA artifact. The UI navigation refresh is v3.38.8. It is local-first; it does not provide cloud accounts or cross-device health-data sync.

## Public app link (free-tier route)
Follow `ZERO_COST_PUBLIC_LAUNCH_GUIDE_v3.38.7.md` to create a GitHub repository, enable GitHub Pages with GitHub Actions, and run the manual deployment workflow. A public HTTPS URL only exists after you complete that step; it cannot be truthfully supplied in advance.

## App QR code after deployment
Install Python if needed, then run:

```powershell
python -m pip install -r requirements-qr.txt
python tools/generate_app_qr.py "https://YOUR-GITHUB-USERNAME.github.io/revilac-nutrition-intelligence/"
```

Replace the example URL with the actual Pages URL. The script creates `REVILAC_APP_QR.png` locally and does not send the URL to a QR service.

## Patient-specific QR/link and cloud sync
These are intentionally **not claimed as implemented**. The current app has a local encrypted vault, but local data is device/browser-specific. Patient-specific link sharing needs a secure server-side share-token service with authorization, expiry, revocation, audit logging, and privacy controls. Do not put a patient ID or health data into a public QR code. Use synthetic/demo data only until production security and clinical release requirements are satisfied.
