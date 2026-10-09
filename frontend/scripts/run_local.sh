#!/bin/bash
#
# Camping Robinson Country Club 2 - run the frontend locally.
#
# Steps:
#
# Usage: ./frontend/scripts/run_local.sh [--install-only] [--help]
#

set -euo pipefail  # The script will stop on the first error.

# =============================================================================
# Configuration
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(cd "${SCRIPT_DIR}/../codebase" && pwd)"

SETUP_DEV_ENV_FILE="setup-dev-env.js"

# Options
BUN_INSTALL_ONLY=0


# =============================================================================
# Utility Functions
# =============================================================================

# Print a step header.
step() {
  echo "    💾 $1"
}

# Print a completed message.
completed() {
  echo "    ⭐ $1"
}

# Print an info message.
info() {
  echo "    💤 $1"
}

# Print an error message and exit.
die() {
  echo "    💢 $1" >&2
  exit 1
}

# Check if a command is available.
# Returns 0 if the command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1  # all output is redirected to /dev/null
}

print_usage() {
  cat <<'EOF'
Usage: frontend/scripts/run_local.sh [options]

Installs the frontend for local development and/or starts the development server.

Options:
  --install-only  - Install bun and the dependencies, but do not start the server.
  --help          - Show this help message.
EOF
}

# Parse the command line arguments. Call: parse_args "$@"
parse_args() {
  while [ $# -gt 0 ]; do
    case "$1" in
      --install-only)
        BUN_INSTALL_ONLY=1
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

install_bun() {
  # Prepend $HOME/.bun/bin so a bun that was installed earlier can be found.
  if [ -x "${HOME}/.bun/bin/bun" ]; then
    export PATH="${HOME}/.bun/bin:${PATH}"
  fi

  if command_exists bun; then
    completed "bun found ($(bun --version))"
    return 0
  fi

  if ! command_exists curl; then
    die "curl is required to install bun. Install bun manually: https://bun.sh/docs/installation"
  fi

  # The installer needs unzip to extract bun on Linux.
  if ! command_exists unzip; then
    die "unzip is required to install bun. Run: sudo apt install unzip"
  fi

  curl -fsSL https://bun.sh/install | bash

  # Ensure bun is on PATH for the rest of this script
  export PATH="$HOME/.bun/bin:$PATH"
  if ! command_exists bun; then
    die "bun install completed but 'bun' is not on PATH. Add \$HOME/.bun/bin to your PATH."
  fi
  completed "bun installed ($(bun --version))"
}

install_frontend() {
  if [ ! -f "${FRONTEND_DIR}/${SETUP_DEV_ENV_FILE}" ]; then
    die "${SETUP_DEV_ENV_FILE} not found in ${FRONTEND_DIR}"
  fi

  (cd "${FRONTEND_DIR}" && bun "${SETUP_DEV_ENV_FILE}")
  completed "Frontend installed"
}

start_dev_server() {
  info "Starting development server, press Ctrl+C to stop!"
  cd "${FRONTEND_DIR}"
  exec bun run dev
}


# =============================================================================
# Main Execution
# =============================================================================

parse_args "$@"

step "Installing bun"
install_bun

step "Installing frontend"
install_frontend

if [ "${BUN_INSTALL_ONLY}" -eq 0 ]; then
  step "Starting development server"
  start_dev_server
fi
