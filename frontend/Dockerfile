# syntax=docker/dockerfile:1.7

# ==================================================================
# Frontend DEV Dockerfile
# ==================================================================
# Development image: runs the Vite dev server with hot reload.

# Keep BUN_VERSION in sync with codebase/package.json -> packageManager.
ARG BUN_VERSION=1.4.3

# Bun base image. Alpine Linux is a lightweight, security-oriented,
# distribution designed for resource efficiency, containers, and servers.
# Image: https://hub.docker.com/r/oven/bun
FROM oven/bun:${BUN_VERSION}-alpine

# Set build args
ARG APP_PORT=3000

# Set environment variables
ENV APP_PORT=${APP_PORT}

# ------------------------------------------------------------------
# Install System packages
# ------------------------------------------------------------------
# bash - convenient shell inside the container
# curl - healthcheck and API testing
RUN apk add --no-cache bash curl

# Set working directory
WORKDIR /app

# ------------------------------------------------------------------
# Create non-root app user
# ------------------------------------------------------------------
RUN addgroup -S appuser \
    && adduser  -S appuser -G appuser \
    && mkdir -p /home/appuser \
    && chown -R appuser:appuser /home/appuser \
    && chown -R appuser:appuser /app

# Set HOME environment variable
ENV HOME=/home/appuser

# ------------------------------------------------------------------
# Prepare directories for the bind mount
# ------------------------------------------------------------------
# (so named volume inherits correct ownership)
# -p parents
RUN mkdir -p /app/codebase/node_modules \
    && chown -R appuser:appuser /app/codebase


# ------------------------------------------------------------------
# Copy the dependencies
# ------------------------------------------------------------------
# Copy package files first for better Docker layer caching.
# --chown ensures the copied files belong to appuser.
COPY --chown=appuser:appuser codebase/package.json codebase/bun.lock /app/codebase/

# ------------------------------------------------------------------
# Copy the entrypoint script
# ------------------------------------------------------------------
COPY --chown=appuser:appuser scripts/configure_dev_docker.sh /app/scripts/configure_dev_docker.sh
RUN chmod 755 /app/scripts/configure_dev_docker.sh

# ------------------------------------------------------------------
# Runtime
# ------------------------------------------------------------------

# Switch to non-root user
USER appuser

# Set the working directory for the runtime.
WORKDIR /app/codebase

# Expose application port
EXPOSE 3000

# Healthcheck: the Vite dev server responds on "/".
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
    CMD curl -fsS http://localhost:${APP_PORT}/ >/dev/null || exit 1

# Use the development configure script as entrypoint
ENTRYPOINT ["/app/scripts/configure_dev_docker.sh"]
