# Multi-stage build for Audityzer
# Stage 1: Builder
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files and scripts needed for postinstall
COPY package.json pnpm-lock.yaml ./
COPY scripts/ ./scripts/

# Install dependencies (triggers postinstall which needs scripts/fix-dependencies.js)
RUN pnpm install --frozen-lockfile --prod

# Copy source code
COPY src/ ./src/
COPY bin/ ./bin/
COPY templates/ ./templates/
COPY lib/ ./lib/
COPY tsconfig.json ./

# Build the application
RUN pnpm run build

# Stage 2: Production
FROM node:20-alpine AS production

# Install security updates and runtime deps
RUN apk update && apk upgrade && apk add --no-cache \
    dumb-init \
    curl \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S audityzer && \
    adduser -S audityzer -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=audityzer:audityzer /app/node_modules ./node_modules
COPY --from=builder --chown=audityzer:audityzer /app/dist ./dist
COPY --from=builder --chown=audityzer:audityzer /app/bin ./bin
COPY --from=builder --chown=audityzer:audityzer /app/package.json ./

# Copy additional runtime files
COPY --chown=audityzer:audityzer templates/ ./templates/
COPY --chown=audityzer:audityzer lib/ ./lib/
COPY --chown=audityzer:audityzer scripts/healthcheck.sh ./scripts/
COPY --chown=audityzer:audityzer scripts/start.sh ./scripts/

# Make scripts executable
RUN chmod +x ./scripts/*.sh

# Switch to non-root user
USER audityzer

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ./scripts/healthcheck.sh

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["./scripts/start.sh"]
