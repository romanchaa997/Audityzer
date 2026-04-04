# Single-stage build for Audityzer
# No build step needed - Node.js runs .js source directly
FROM node:20-alpine

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init curl && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S audityzer && adduser -S audityzer -u 1001

# Set working directory
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PUPPETEER_SKIP_DOWNLOAD=1
RUN corepack enable && corepack prepare pnpm@9 --activate

# Install all dependencies (prod/dev categorization is unreliable)
COPY package.json pnpm-lock.yaml ./
COPY scripts/fix-dependencies.js ./scripts/
RUN pnpm install --frozen-lockfile

# Copy source code directly
COPY --chown=audityzer:audityzer src/ ./src/
COPY --chown=audityzer:audityzer bin/ ./bin/
COPY --chown=audityzer:audityzer templates/ ./templates/
COPY --chown=audityzer:audityzer lib/ ./lib/
COPY --chown=audityzer:audityzer server.js ./
COPY --chown=audityzer:audityzer scripts/healthcheck.sh scripts/start.sh ./scripts/

# Make scripts executable and fix line endings
RUN chmod +x ./scripts/*.sh
RUN sed -i 's/\r$//' ./scripts/*.sh

# Create data directories with proper ownership before switching to non-root
RUN mkdir -p /app/reports /app/data /app/logs && chown -R audityzer:audityzer /app/reports /app/data /app/logs

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
