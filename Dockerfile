<<<<<<< HEAD

# Multi-stage build for Audityzer
FROM node:20-alpine AS builder

# Set working directory
=======
FROM node:20-slim as builder

>>>>>>> 9fcef16aa3870634216e27d04154ec98e4c712a8
WORKDIR /app
COPY package*.json ./
<<<<<<< HEAD
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/
COPY bin/ ./bin/
COPY templates/ ./templates/
COPY lib/ ./lib/

# Build the application
RUN npm run build

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
COPY --from=builder --chown=audityzer:audityzer /app/dist ./dist
COPY --from=builder --chown=audityzer:audityzer /app/bin ./bin
COPY --from=builder --chown=audityzer:audityzer /app/package*.json ./

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
=======
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm ci --omit=dev

CMD ["node", "dist/cli.js"]
>>>>>>> 9fcef16aa3870634216e27d04154ec98e4c712a8
