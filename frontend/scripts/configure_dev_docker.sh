#!/bin/bash
#
# Entrypoint of the frontend development container.
# Syncs node_modules with bun.lock, then starts the Vite dev server.

set -euo pipefail  # The script will stop on the first error.

# =============================================================================
# Main Execution
# =============================================================================

echo "👣 Syncing node_modules with bun.lock ..."
bun install --frozen-lockfile

echo "🚀 Starting development server ..."
exec bun run dev
