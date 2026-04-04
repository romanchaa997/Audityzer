
# Multi-stage build for Audityzer
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PUPPETEER_SKIP_DOWNLOAD=1
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY scripts/ ./scripts/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src/ ./src/
COPY bin/ ./bin/
COPY templates/ ./templates/
COPY lib/ ./lib/

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init curl && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S audityzer && adduser -S audityzer -u 1001

# Set working directory
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PUPPETEER_SKIP_DOWNLOAD=1
RUN corepack enable && corepack prepare pnpm@9 --activate

# Install production dependencies only (11 prod deps instead of 42 total)
COPY package.json pnpm-lock.yaml ./
COPY scripts/fix-dependencies.js ./scripts/
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder --chown=audityzer:audityzer /app/dist ./dist
COPY --from=builder --chown=audityzer:audityzer /app/bin ./bin

# Copy additional runtime files
COPY --chown=audityzer:audityzer templates/ ./templates/
COPY --chown=audityzer:audityzer lib/ ./lib/
COPY --chown=audityzer:audityzer scripts/healthcheck.sh scripts/start.sh ./scripts/

# Make scripts executable
RUN chmod +x ./scripts/*.sh

# Switch to non-root user
USER audityzer

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD ./scripts/healthcheck.sh

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["./scripts/start.sh"]
