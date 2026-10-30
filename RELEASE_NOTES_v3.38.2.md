# REVILAC Nutrition Intelligence v3.38.2

## Privacy data-minimization change
- The main report save path no longer persists the raw OCR transcript, uploaded file name, or free-text notes. Those values can contain direct identifiers copied from the report.
- Structured report metadata and measurements still persist in browser localStorage in plaintext. This is a risk reduction, not encryption or production approval.
- Do not use identifiable real-patient data until encrypted storage/access control, security review, privacy review, qualified clinical review, and representative OCR validation are complete.

## Verification
- Added automated privacy-minimization assertions.
- Passing tests do not establish clinical accuracy or production readiness.
