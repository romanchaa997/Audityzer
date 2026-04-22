# Multi-stage build for Audityzer
# Stage 1: Builder
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and scripts needed for postinstall
COPY package.json package-lock.json* ./
COPY scripts/ ./scripts/

# Install dependencies (triggers postinstall which needs scripts/fix-dependencies.js)
RUN npm install --omit=dev --legacy-peer-deps \
    --ignore-scripts=false \
    && npm cache clean --force

# Copy source code
COPY src/ ./src/
COPY bin/ ./bin/
COPY templates/ ./templates/
COPY lib/ ./lib/
COPY tsconfig.json ./

# Build the application
RUN npm run build 2>/dev/null || echo 'Build step skipped (no build script)'

# Stage 2: Production
FROM node:20-alpine AS production

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S audityzer -u 1001

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=audityzer:audityzer /app/node_modules ./node_modules
COPY --from=builder --chown=audityzer:audityzer /app/dist ./dist
COPY --from=builder --chown=audityzer:audityzer /app/bin ./bin
COPY --from=builder --chown=audityzer:audityzer /app/package.json ./

# Copy scripts for healthcheck and start
COPY --from=builder --chown=audityzer:audityzer /app/scripts ./scripts

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
