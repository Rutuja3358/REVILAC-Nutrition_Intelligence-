# REVILAC UI and Voice patch
- Added emerald-green navigation/button styling and active selection styling.
- Added English/Marathi/Hindi translations for common navigation and key Home/source-explorer labels.
- Added Read/Stop speech synthesis with locale selection and status feedback.
- Added speech recognition with permission/error messages and transcript insertion into focused input.
- Removed Account & Sync from the main navigation without deleting its account code.
- Hid the Nutrient Source Explorer except when Home is the active navigation section.
- Lock Vault: no distinct visible "Lock Vault" label was found in the supplied index.html; no vault functionality was deleted.
## Notes
Browser speech recognition depends on browser/device support and microphone permissions. Marathi/Hindi voice availability depends on installed browser/system voices. Test locally before public deployment; do not use real patient data in this prototype.
