# Multi-stage build for Audityzer
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@9

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies (no frozen lockfile to handle config mismatches)
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Install pnpm
RUN npm install -g pnpm@9

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S audityzer -u 1001

WORKDIR /app

# Copy package files and install production deps
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --prod --no-frozen-lockfile

# Copy built files from builder
COPY --from=builder --chown=audityzer:nodejs /app/dist ./dist
COPY --from=builder --chown=audityzer:nodejs /app/bin ./bin
COPY --from=builder --chown=audityzer:nodejs /app/src ./src
COPY --from=builder --chown=audityzer:nodejs /app/lib ./lib

USER audityzer

EXPOSE 8080

CMD ["dumb-init", "node", "bin/audityzer.js", "start"]
