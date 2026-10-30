#!/bin/sh
set -eu
# Run on the host with POSTGRES_PASSWORD in the environment; output must be moved to encrypted off-host storage.
: "${POSTGRES_PASSWORD:?Set POSTGRES_PASSWORD}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="${1:-./revilac-db-${STAMP}.dump}"
docker compose -f docker-compose.production.yml exec -T db sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -U revilac -d revilac -Fc' > "$OUT"
chmod 600 "$OUT"
echo "Created $OUT. Encrypt and copy off-host; then perform a restore drill before claiming backup readiness."
