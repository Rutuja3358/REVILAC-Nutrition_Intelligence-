#!/usr/bin/env python3
"""Generate a QR code for the public REVILAC app URL (never for patient records)."""
import argparse
from pathlib import Path
from urllib.parse import urlparse

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('url', help='Public HTTPS URL of the deployed REVILAC app')
parser.add_argument('--output', default='REVILAC_APP_QR.png', help='Output PNG filename')
args = parser.parse_args()
parsed = urlparse(args.url)
if parsed.scheme != 'https' or not parsed.netloc:
    parser.error('Use the final public HTTPS app URL, e.g. https://username.github.io/revilac-nutrition-intelligence/')
try:
    import qrcode
except ImportError:
    raise SystemExit('Missing free dependency. Install it with: python -m pip install "qrcode[pil]"')
img = qrcode.make(args.url)
out = Path(args.output).resolve()
img.save(out)
print(f'App QR saved: {out}')
print('This QR opens the app only; it contains no patient ID or medical data.')
