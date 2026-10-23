#!/bin/bash
#
# Camping Robinson Country Club 2 Bootstrap script for local development.
#
# Steps:
# 1. Sets up the frontend. It runs frontend/scripts/run_local.sh --install-only.
# 2. Sets up the backend. It runs backend/scripts/run_local.sh --install-only.
#
# Usage: ./scripts/bootstrap.sh
#

set -euo pipefail  # The script will stop on the first error.

# =============================================================================
# Configuration
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRONTEND_DIR="${ROOT_DIR}/frontend/codebase"
BACKEND_DIR="${ROOT_DIR}/backend/codebase"

# Runtime states
STEP_COUNTER=0
TOTAL_STEPS=2


# =============================================================================
# Utility Functions
# =============================================================================

# Print a step header.
step() {
  STEP_COUNTER=$((STEP_COUNTER + 1))
  echo "🚀  ${STEP_COUNTER}/${TOTAL_STEPS} $1"
}

# Print a completed message.
completed() {
  echo "  ✅  $1"
}

# Print an info message.
info() {
  echo "  ❕  $1"
}

# Print a warning message.
warning() {
  echo "  ⚠️  $1"
}

# Print an error message and exit.
die() {
  echo "  ❌  $1"
  exit 1
}

# Check if a command is available.
# Returns 0 if the command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1  # all output is redirected to /dev/null
}


# =============================================================================
# Step Operations
# =============================================================================

# 1.
setup_frontend() {
  step "Setting up frontend"

  # Check if the frontend codebase directory exists!
  if [ ! -d "${FRONTEND_DIR}" ]; then
    warning "Frontend codebase not found, skipping frontend setup!"
    return 0
  fi
  info "Frontend codebase found, setting up frontend!"

  # Prepend $HOME/.bun/bin so a bun that was installed earlier can be found.
  if [ -x "${HOME}/.bun/bin/bun" ]; then
    export PATH="${HOME}/.bun/bin:${PATH}"
  fi

  # Check if Bun is installed
  if command_exists bun && [ -d "${FRONTEND_DIR}/node_modules" ]; then
    completed "Frontend already installed (bun $(bun --version)), skipping!"
    return 0
  fi

  local FRONTEND_RUN_LOCAL="${ROOT_DIR}/frontend/scripts/run_local.sh"

  if [ ! -f "${FRONTEND_RUN_LOCAL}" ]; then
    warning "run_local.sh not found: ${FRONTEND_RUN_LOCAL}"
    return 0
  fi

  info "Frontend not installed yet, setting up frontend!"
  bash "${FRONTEND_RUN_LOCAL}" --install-only

  completed "Frontend setup finished"
}

# 2.
setup_backend() {
  step "Setting up backend"

  # Check if the backend codebase directory exists!
  if [ ! -d "${BACKEND_DIR}" ]; then
    warning "Backend codebase not found, skipping backend setup!"
    return 0
  fi
  info "Backend codebase found, setting up backend!"

  # Prepend $HOME/.local/bin so a uv that was installed earlier can be found.
  if [ -x "${HOME}/.local/bin/uv" ]; then
    export PATH="${HOME}/.local/bin:${PATH}"
  fi

  # Check if uv is installed
  if command_exists uv && [ -d "${BACKEND_DIR}/.venv" ]; then
    completed "Backend already installed (uv $(uv --version)), skipping!"
    return 0
  fi

  local BACKEND_RUN_LOCAL="${ROOT_DIR}/backend/scripts/run_local.sh"

  if [ ! -f "${BACKEND_RUN_LOCAL}" ]; then
    warning "run_local.sh not found: ${BACKEND_RUN_LOCAL}"
    return 0
  fi

  info "Backend not installed yet, setting up backend!"
  bash "${BACKEND_RUN_LOCAL}" --install-only

  completed "Backend setup finished"
}


# =============================================================================
# Main Execution
# =============================================================================

setup_frontend
setup_backend
