# Multi-stage build for Audityzer
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
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
    curl \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S audityzer -u 1001

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/templates ./templates

# Set ownership
RUN chown -R audityzer:nodejs /app

# Switch to non-root user
USER audityzer

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/cli.js"]
