# Release evidence directory

This directory intentionally ships without PASS evidence. Do not add fabricated review records or use environment variables to bypass a gate. Each JSON record must refer to a real, inspectable artifact and be reviewed by an accountable person. Evidence older than 90 days is stale for this gate.

Expected record shape:
```json
{
  "status": "passed",
  "checkedAt": "2026-10-22T12:00:00.000Z",
  "reviewer": "Full name or accountable role",
  "artifact": "relative path or immutable report ID for the actual evidence",
  "scope": "the required scope named by the gate"
}
```

Required files: `database-integration.json`, `https-deployment.json`, `account-verification.json`, `shared-rate-limit.json`, `security-review.json`, `privacy-review.json`, `clinical-review.json`, `device-e2e.json`, `backup-restore.json`, `monitoring.json`, `nutrition-data.json`, `ocr-benchmark.json`, and `accessibility-review.json`.

The metadata is only an index to evidence, not proof by itself. Review the linked artifacts. The current bundle's account API still uses local JSON storage, so the managed database gate remains blocked until a real adapter and migrations are implemented and tested.
