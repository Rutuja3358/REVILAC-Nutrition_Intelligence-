#!/bin/sh
set -eu
# Intentionally requires an explicitly named restore target; never defaults to the live production DB.
DUMP="${1:?Usage: RESTORE_DB_CONTAINER=<separate-test-db-container> RESTORE_DB_NAME=<test-db> ops/restore-postgres.sh backup.dump}"
: "${RESTORE_DB_CONTAINER:?Set RESTORE_DB_CONTAINER to a separate non-production PostgreSQL container}"
: "${RESTORE_DB_NAME:?Set RESTORE_DB_NAME to the non-production restore database name}"
case "$RESTORE_DB_NAME" in *[!A-Za-z0-9_]*|'') echo "RESTORE_DB_NAME may contain only letters, digits and underscore." >&2; exit 2;; esac
test -f "$DUMP"
case "$RESTORE_DB_CONTAINER" in *revilac*prod*|*production*) echo "Refusing an obviously production-named restore target." >&2; exit 2;; esac
echo "Target container: $RESTORE_DB_CONTAINER; target database: $RESTORE_DB_NAME"
echo "This will replace objects in the named restore database. Use a separate test instance, never the live production database."
read -r -p "Type RESTORE_TO_NONPRODUCTION to continue: " ANSWER
[ "$ANSWER" = RESTORE_TO_NONPRODUCTION ] || exit 1
docker exec -i "$RESTORE_DB_CONTAINER" sh -c 'pg_restore --clean --if-exists --no-owner -U "$POSTGRES_USER" -d "$RESTORE_DB_NAME"' < "$DUMP"
echo "Restore command completed. Validate schema, row counts, and application workflows before marking backup/restore evidence complete."
