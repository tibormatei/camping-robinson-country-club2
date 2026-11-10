#!/bin/bash
#
# Camping Robinson Country Club 2 - run the backend tests in Docker.
#

set -euo pipefail  # The script will stop on the first error.

# =============================================================================
# Configuration
# =============================================================================

CONTAINER_RUNTIME="docker"  # or "podman"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/../codebase" && pwd)"

# Options
RUN_LOCALLY=0


# =============================================================================
# Utility Functions
# =============================================================================

print_usage() {
  cat <<'EOF'
Usage: backend/scripts/run_tests.sh [options]

Run tests for the backend locally or in Docker.

Options:
  --locally  - uv run pytest on your local machine.
  --help     - Show this help message.
EOF
}

# Parse the command line arguments. Call: parse_args "$@"
parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --locally)
        RUN_LOCALLY=1
        ;;
      --help)
        print_usage
        exit 0
        ;;
      *)
        print_usage >&2
        exit 1
        ;;
    esac
    shift
  done
}

# Check if a command is available.
# Returns 0 if the command exists.
command_exists() {
  command -v "$1" >/dev/null 2>&1  # all output is redirected to /dev/null
}

# Get container state.
get_container_state() {
  local runtime="$1"
  local container_id="$2"
  "${runtime}" inspect --format='{{.State.Status}}' "${container_id}" 2>/dev/null || echo "unknown"
}

# Get container health status.
get_container_health() {
  local runtime="$1"
  local container_id="$2"
  "${runtime}" inspect --format='{{.State.Health.Status}}' "${container_id}" 2>/dev/null || echo "none"
}

# Find a container ID by service name.
find_container_id() {
  local service="$1"
  local container_id

  command_exists "${CONTAINER_RUNTIME}" || return 1
  container_id="$("${CONTAINER_RUNTIME}" compose ps -q "${service}" 2>/dev/null | head -n 1)" || true
  [ -n "${container_id}" ] || return 1

  echo "${container_id}"
}

# Returns 0, if the container is running by service name.
container_is_running() {
  local container_id
  container_id="$(find_container_id "$1")" || return 1

  [ "$(get_container_state "${CONTAINER_RUNTIME}" "${container_id}")" = "running" ]
}

# Returns 0, if the container is running AND its healthy.
container_is_healthy() {
  container_is_running "$1" || return 1

  local container_id
  container_id="$(find_container_id "$1")" || return 1

  [ "$(get_container_health "${CONTAINER_RUNTIME}" "${container_id}")" = "healthy" ]
}


# =============================================================================
# Main Execution
# =============================================================================

parse_args "$@"

if [ "${RUN_LOCALLY}" -eq 1 ]; then
  echo "🩺  Running the tests locally ..."

  cd "${BACKEND_DIR}"
  exec uv run pytest

else
  echo "🩺  Running the tests in Docker ..."

  if container_is_running "backend"; then
    echo "✅ Found backend container."
    "${CONTAINER_RUNTIME}" compose exec backend pytest
  else
    echo "💤 The backend container is not running, then creating a new test container."
    "${CONTAINER_RUNTIME}" compose run --rm backend pytest
  fi
fi
