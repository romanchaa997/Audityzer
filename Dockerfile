# Multi-stage build for AuditorSEC Defense
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production 2>/dev/null || npm install --legacy-peer-deps

# Copy source code
COPY src/ ./src/
COPY bin/ ./bin/
COPY templates/ ./templates/
COPY lib/ ./lib/

# Build the application
RUN npm run build 2>/dev/null || echo "Build step optional"

# Production stage
FROM node:20-alpine AS production

# Install security updates
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
COPY --from=builder --chown=audityzer:audityzer /app/dist ./dist 2>/dev/null || true
COPY --from=builder --chown=audityzer:audityzer /app/bin ./bin 2>/dev/null || true
COPY --from=builder --chown=audityzer:audityzer /app/package*.json ./

# Copy additional runtime files
COPY --chown=audityzer:audityzer templates/ ./templates/ 2>/dev/null || true
COPY --chown=audityzer:audityzer lib/ ./lib/ 2>/dev/null || true
COPY --chown=audityzer:audityzer scripts/healthcheck.sh ./scripts/ 2>/dev/null || true
COPY --chown=audityzer:audityzer scripts/start.sh ./scripts/ 2>/dev/null || true

# Make scripts executable if present
RUN if [ -d ./scripts ]; then chmod +x ./scripts/*.sh 2>/dev/null || true; fi

# Switch to non-root user
USER audityzer

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/cli.js"]
