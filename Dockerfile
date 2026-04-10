# Multi-stage build for Audityzer
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY bin/ ./bin/
COPY templates/ ./templates/
COPY lib/ ./lib/

RUN npm run build 2>/dev/null || true

# Production stage
FROM node:20-alpine AS production

RUN apk update && apk upgrade && apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

RUN addgroup -g 1001 -S nodejs && adduser -S audityzer -u 1001

WORKDIR /app

COPY --from=builder --chown=audityzer:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=audityzer:nodejs /app/bin ./bin
COPY --from=builder --chown=audityzer:nodejs /app/src ./src
COPY --from=builder --chown=audityzer:nodejs /app/templates ./templates
COPY --from=builder --chown=audityzer:nodejs /app/lib ./lib
COPY --chown=audityzer:nodejs package*.json ./

COPY server.js ./

USER audityzer

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
