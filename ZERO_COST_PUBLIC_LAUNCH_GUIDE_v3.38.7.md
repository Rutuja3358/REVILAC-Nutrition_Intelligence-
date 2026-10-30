# REVILAC Nutrition Intelligence v3.38.7 — zero-cost public launch path

## What this package adds
- Versioned PWA app-shell cache (`revilac-app-shell-v3.38.7`) so an update replaces the old shell cache.
- GitHub Actions CI remains available for syntax and regression tests.
- A manual GitHub Pages deployment workflow that publishes only an explicit allowlist of static app assets; it does not publish backend server files, `.env` files, or local user data.
- Deployment remains opt-in: no repository or cloud service was created or connected on the user's behalf.

## Free public URL setup (laptop)
1. Create a GitHub account if needed and create a **public** repository named `revilac-nutrition-intelligence`. A public repo may expose source code; never commit secrets, credentials, patient data, local backups, or `.env` files.
2. Extract this ZIP and push the project files to that repository. Ensure `.gitignore` remains in place and inspect `git status` before pushing.
3. Open the repository's **Settings → Pages**. Set the build/deployment source to **GitHub Actions**.
4. Open **Actions → Deploy REVILAC static PWA to GitHub Pages → Run workflow**. Wait for the workflow to complete.
5. Copy the Pages URL shown in the deployment summary. Test HTTPS, installability, reload/update, and offline shell on laptop and phone. Only after the URL exists can a real QR code for the app URL be generated.

## Important limitations — do not skip
- GitHub Pages serves the **static local-first PWA only**. It does not run `production-server.js`, provide PostgreSQL, email verification, account recovery, shared sessions, or cloud sync.
- Local encrypted-vault data remains specific to that browser/device/origin. The vault does **not** automatically sync between devices.
- The current app does not have a verified secure server-side patient-share service. Do not create or distribute patient-specific public URLs/QRs for health records yet. A patient ID or QR is not an authorization control.
- Public hosting is for prototype/demo with synthetic data only until independent security, privacy/legal, clinical and OCR validation are complete.
- OCR may use third-party CDNs when local tools are unavailable; internet and vendor terms then apply. This workflow does not bundle those libraries locally.
- GitHub Pages' availability and limits are controlled by GitHub and can change. No custom domain is required for the initial demo.

## Why cloud sync is not included as a fake feature
Secure multi-device health-data sync requires a real backend, account verification/recovery, per-user authorization, database, key-management design, conflict handling, backups, deletion controls and operational monitoring. Static hosting alone cannot supply these safely. Keep the existing local-first mode until those components are implemented and tested; never upload real patient records to a public repository.

## Final pre-publication checklist
- [ ] Inspect repository for secrets, `.env`, local databases, report samples, exported backups and patient-identifying content.
- [ ] Confirm CI passes on the repository.
- [ ] Set Pages source to GitHub Actions and run deployment manually.
- [ ] Confirm the public page opens over HTTPS and the PWA install prompt works where supported.
- [ ] Confirm encrypted vault setup/unlock/lock and wrong-passphrase behavior on each target browser.
- [ ] Confirm app clearly says local data is not synced across devices.
- [ ] Use only synthetic/demo data until release blockers have independent evidence.
