# REVILAC Nutrition Intelligence v3.38 — Zero-cost local image OCR path

- Added a localhost-only `/api/local-ocr` endpoint to `local-server.js`.
- The endpoint accepts image bytes only, limits requests to 15 MB, invokes Tesseract using `execFile` (no shell interpolation), and removes temporary image files after processing.
- The browser tries local Tesseract first when served from the bundled localhost server. If unavailable, the existing browser OCR fallback remains available when internet/CDN access works.
- Added regression checks for content-type allowlisting, size bounds, temp-file cleanup, subprocess invocation, fallback order, and safety confirmation.
- Actual smoke test in the build environment successfully OCR'd a synthetic image and extracted `Hemoglobin: 12.4 g/dL`.

## Limits
- Local OCR requires Tesseract installed on the same computer and present on PATH. This is not a built-in Android OCR engine.
- The local server binds to 127.0.0.1 and is not a public host. Do not change its bind address to expose patient files over a network.
- English OCR only is requested by this endpoint. Accuracy varies by scan, handwriting, layout, and language.
- Scanned PDF OCR still uses browser-based PDF.js/Tesseract and requires internet to load those libraries in the current build.
- This does not make browser localStorage encrypted and does not change the release decision: local demo/staging only, not approved for identifiable real patient data.
