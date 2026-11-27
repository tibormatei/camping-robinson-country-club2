# ==================================================================
# Database Dockerfile
# ==================================================================

FROM postgres:17-alpine

# ------------------------------------------------------------------
# Runtime
# ------------------------------------------------------------------

# Configure variables
ARG DB_POSTGRES_PORT=5432

# Set environment variables
ENV DB_POSTGRES_PORT=${DB_POSTGRES_PORT}

# Expose application port
EXPOSE ${DB_POSTGRES_PORT}
