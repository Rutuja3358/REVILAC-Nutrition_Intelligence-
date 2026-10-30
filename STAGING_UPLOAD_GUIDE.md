# REVILAC staging upload guide (Android-friendly)

1. Keep the GitHub repository `REVILAC` **Private**.
2. Upload the contents of this package's project folder, not the ZIP archive itself, if you need GitHub to display the source tree.
3. Keep `.gitignore`; it blocks `.env`, node_modules and local account/patient data patterns. Never upload actual secrets or identifiable patient records.
4. `.env.example` contains configuration placeholders only; inspect it before upload and never copy real credentials into it.
5. This package contains Node.js server components. A static-only host will not run `account-server.js` or `terminology-server.js`; choose a host that supports the required Node.js backend and configure environment variables privately.
6. Do not enter real patient data in staging. Use synthetic/demo records only.
7. Before public/clinical release: configure HTTPS and a managed database; verify authentication, recovery, backups and access controls; test on target devices; complete privacy/security and clinical reviews.
