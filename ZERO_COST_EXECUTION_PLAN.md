# REVILAC Nutrition Intelligence — Zero-Cost Execution Plan

## Scope and honest status
This plan uses tools that can be used at no monetary cost. It does not promise that hosting, email delivery, clinical review, or security certification can be obtained for free. No real patient data should be entered until appropriate security, privacy, and clinical gates are independently cleared.

## What can be completed for ₹0 on a local computer
1. Run the app locally using `START_LOCAL_SERVER.cmd` and `http://127.0.0.1:8000`.
2. Run code tests using `RUN_TESTS.cmd`, or `npm test` and `npm run test:syntax` where Node.js is installed.
3. Test with synthetic reports only; compare OCR output character-by-character with the sample and record failures.
4. Test food preferences, nutrition display, report history, local backup/export, restore, and deletion using disposable demo data.
5. Run dependency checks with `npm audit` after dependencies are installed and internet is available. Review every finding; do not assume a clean result means the application is secure.
6. Use browser developer tools and Android/desktop browsers for manual checks. Record device, browser version, steps, and outcomes.
7. Keep encrypted backups locally and test restore to a separate folder/profile. Do not store the only backup on the same device.
8. Review code and documentation with free tools; maintain a checklist of open findings and do not label untested work as passed.

## What needs outside infrastructure or qualified people
- Public, reliable multi-device access needs a deployed service, domain or provider endpoint, TLS, persistent database and operational controls. Free tiers may change, sleep, impose limits or be unsuitable for health data.
- Real email OTP requires a configured email delivery provider and verified sender/domain; free quotas are not guaranteed.
- Production security requires independent review and remediation; free scanners are not a substitute for penetration testing.
- Clinical/nutrition safety requires qualified professional review. Automated tests cannot provide clinical approval.
- OCR performance claims require a representative, consented/de-identified labelled dataset and measured results.
- Privacy/legal compliance requires a review for the actual jurisdiction, data flows, vendors and intended use.

## Six workstreams and evidence required
1. **Server/database:** local boot and health checks can be done free. Production PostgreSQL integration needs a real test instance; do not claim passed until migrations, persistence, concurrency and failure handling are exercised.
2. **Email/account flows:** exercise locally with a test SMTP sink if available; real delivery requires provider configuration and an end-to-end test. Never paste credentials into chat or commit them.
3. **Security/privacy:** inspect headers, authentication, authorization, input validation, CSP, secret handling, deletion/export and backup encryption. Current CSP still permits `unsafe-inline`; this remains a release blocker until refactored and verified.
4. **OCR/nutrition:** test a documented sample set with synthetic or properly de-identified reports. Verify every extracted number and unit manually; unknown or ambiguous values must be flagged for human review. A human expert must review nutrition safety rules.
5. **Device/end-to-end:** use the actual target Android phone and at least one desktop browser. Check upload, report extraction, manual correction, saving, food guidance, history, export/delete, language, accessibility and reminders. Background reminders are not guaranteed when the browser/app is closed.
6. **Deployment/operations:** only after the prior gates, configure TLS, backups, restore drills, monitoring, alert ownership and incident response. Do not use public hosting for identifiable health data until reviewed and approved.

## Free local test run
From the extracted project folder:

```bash
npm test
npm run test:syntax
python test_package.py
```

If a command fails, save its full output and fix the cause before claiming a pass. The above checks do not replace live integration, device, security or clinical testing.

## Release rule
Use synthetic/demo data only while any production gate is open. Report each item as `PASS` only when there is reproducible evidence; otherwise mark `NOT RUN`, `BLOCKED`, or `FAIL`. Never fabricate evidence or claim global novelty from software tests.
