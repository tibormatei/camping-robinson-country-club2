#!/bin/bash
#
# Camping Robinson Country Club 2 - run the backend locally.
#
# Steps:
# 1. Installs uv (the Python package manager), if it is not installed yet.
# 2. Installs the backend dependencies into backend/codebase/.venv (from uv.lock).
# [ 3. Loads the .env file and starts the development server (uvicorn --reload). ]
#
# Usage: ./backend/scripts/run_local.sh [--install-only] [--lock] [--help]
#

set -euo pipefail  # The script will stop on the first error.

# =============================================================================
# Configuration
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/../codebase" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

ENV_FILE="${ROOT_DIR}/.env"
ENTRYPOINT_FILE="${SCRIPT_DIR}/entrypoint.sh"

# Options
UV_INSTALL_ONLY=0
UPDATE_LOCK=0


# =============================================================================
# Utility Functions
# =============================================================================

# Print a step header.
step() {
  echo "  💾  $1"
}

# Print a completed message.
completed() {
  echo "  ⭐  $1"
}

# Print an info message.
info() {
  echo "  💤  $1"
}

# Print an error message and exit.
die() {
  echo "  💢  $1" >&2
  exit 1
}

# Check if a command is available.
# Returns 0 if the command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1  # all output is redirected to /dev/null
}

print_usage() {
  cat <<'EOF'
Usage: backend/scripts/run_local.sh [options]

Installs the backend for local development and/or update lock and/or starts the development server.

Options:
  --install-only  - Install uv and the dependencies, but do not start the server.
  --update-lock   - Update backend/codebase/uv.lock from pyproject.toml, then continue.
  --help          - Show this help message.
EOF
}

# Parse the command line arguments. Call: parse_args "$@"
parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --install-only)
        UV_INSTALL_ONLY=1
        ;;
      --lock)
        UPDATE_LOCK=1
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


# =============================================================================
# Step Operations
# =============================================================================

install_uv() {
  # Prepend $HOME/.local/bin so a uv that was installed earlier can be found.
  if [ -x "${HOME}/.local/bin/uv" ]; then
    export PATH="${HOME}/.local/bin:${PATH}"
  fi
 
  if command_exists uv; then
    completed "uv found ($(uv --version))"
    return 0
  fi

  if ! command_exists curl; then
    die "curl is required to install uv. Install uv manually: https://docs.astral.sh/uv/getting-started/installation/"
  fi

  # Installing uv
  curl -LsSf https://astral.sh/uv/install.sh | sh

  # Ensure uv is on PATH for the rest of this script
  export PATH="${HOME}/.local/bin:${PATH}"
  if ! command_exists uv; then
    die "uv install completed but 'uv' is not on PATH. Add \$HOME/.local/bin to your PATH."
  fi
  completed "uv installed ($(uv --version))"
}

update_lock() {
  if [ ! -f "${BACKEND_DIR}/pyproject.toml" ]; then
    die "pyproject.toml not found in ${BACKEND_DIR}"
  fi

  # Resolve the dependencies from pyproject.toml and write uv.lock.
  (cd "${BACKEND_DIR}" && uv lock)
  completed "uv.lock updated!"
}

install_backend() {
  if [ ! -f "${BACKEND_DIR}/pyproject.toml" ]; then
    die "pyproject.toml not found in ${BACKEND_DIR}"
  fi
 
  # uv sync creates the virtual environment (.venv) too, if it does not exist.
  # --locked: stop if pyproject.toml and uv.lock differ.
  (cd "${BACKEND_DIR}" && uv sync --locked --group dev)
  completed "Backend installed"
}

load_env() {
  if [ -f "${ENV_FILE}" ]; then
    # Allow unset variables while sourcing: the file may refer to variables that are not set.
    set +u
    # Export every variable that the file defines.
    set -a
    # shellcheck disable=SC1090
    source "${ENV_FILE}"
    set +a
    set -u

    completed "Environment loaded from: ${ENV_FILE}"
  else
    info "No .env file found, using the existing environment variables."
  fi
}

start_dev_server() {
  info "Starting development server, press Ctrl+C to stop!"
  cd "${BACKEND_DIR}"
  exec uv run "${ENTRYPOINT_FILE}"
}


# =============================================================================
# Main Execution
# =============================================================================

parse_args "$@"

step "Installing uv"
install_uv

# # Only with --lock, or when there is no uv.lock yet. (First run)
if [ "${UPDATE_LOCK}" -eq 1 ] || [ ! -f "${BACKEND_DIR}/uv.lock" ]; then
  step "Updating uv.lock"
  update_lock
fi

step "Installing backend"
install_backend

if [ "${INSTALL_ONLY}" -eq 0 ]; then
  step "Loading environment"
  load_env
 
  step "Starting development server"
  start_dev_server
fi
