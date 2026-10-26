#!/bin/bash
#
# Entrypoint of the backend container.

set -euo pipefail  # The script will stop on the first error.

# =============================================================================
# Main Execution
# =============================================================================

echo "🚀 Starting application ..."
exec python robinson/main.py --mode=DEVELOPMENT
# exec uvicorn app.main:app --host 0.0.0.0 --port "${BACKEND_PORT:-4000}" --reload
