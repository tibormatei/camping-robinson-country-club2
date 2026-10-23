# ==================================================================
# Backend DEV Dockerfile
# ==================================================================

FROM python:3.12-slim-trixie

# ------------------------------------------------------------------
# Install System dependencies
# ------------------------------------------------------------------
# curl - healthcheck and API testing
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# uv: faster Python package manager
RUN pip install --no-cache-dir --upgrade pip setuptools uv==0.11.28

# Use the image's own CPython instead of letting uv download a managed interpreter,
# and install dependencies into a project venv at /app/.venv.
ENV UV_PYTHON_DOWNLOADS=never \
    UV_PYTHON_PREFERENCE=only-system \
    UV_PROJECT_ENVIRONMENT=/app/.venv \
    PATH="/app/.venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# ------------------------------------------------------------------
# Create non-root app user
# ------------------------------------------------------------------
RUN useradd --create-home --shell /bin/bash appuser

# Set working directory
RUN mkdir -p /app/codebase
WORKDIR /app/codebase

# ------------------------------------------------------------------
# Copy the dependencies
# ------------------------------------------------------------------
# Only the lock + project metadata first: the dependency layer stays cached
# until pyproject.toml or uv.lock change.
COPY codebase/pyproject.toml codebase/uv.lock codebase/.python-version ./

# Dependencies only (not the project itself), including the dev group
# (pytest, ruff, mypy). --locked fails if pyproject.toml and uv.lock drifted.
RUN --mount=type=cache,target=/root/.cache/uv,sharing=locked \
    uv sync --locked --no-install-project --group dev

# ------------------------------------------------------------------
# Copy the entrypoint script
# ------------------------------------------------------------------
COPY --chmod=755 scripts/entrypoint.sh /usr/local/bin/entrypoint.sh

# ------------------------------------------------------------------
# Runtime
# ------------------------------------------------------------------

# Switch to non-root user
USER appuser

# Configure variables
ARG API_PORT=4000

# Set environment variables
ENV API_PORT=${API_PORT}

# Expose application port
EXPOSE ${API_PORT}

# Healthcheck: The source is bind-mounted at runtime (docker-compose).
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD curl -fsS http://localhost:${API_PORT}/api/health || exit 1

# Use the script as entrypoint
CMD ["entrypoint.sh"]
