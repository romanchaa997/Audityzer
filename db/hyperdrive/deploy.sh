#!/bin/bash
set -euo pipefail
# ==========================================
# AuditorSEC Hyperdrive + Worker Deploy
# ==========================================
# Prereqs:
#   npm install -g wrangler
#   wrangler login
#   CF API token with Workers + Hyperdrive + D1 permissions
# ==========================================

# All credentials must be set as environment variables
# NEVER hardcode credentials in this file
ACCOUNT_ID="${CF_ACCOUNT_ID:?CF_ACCOUNT_ID env var required}"
PG_HOST="${RAILWAY_PG_HOST:?RAILWAY_PG_HOST env var required}"
PG_PORT="${RAILWAY_PG_PORT:-5432}"
PG_USER="${RAILWAY_PG_USER:?RAILWAY_PG_USER env var required}"
PG_PASS="${RAILWAY_PG_PASS:?RAILWAY_PG_PASS env var required}"
PG_DB="${RAILWAY_PG_DATABASE:-railway}"

echo "Creating Hyperdrive config..."
HYPERDRIVE_OUTPUT=$(wrangler hyperdrive create audityzer-pg \
  --connection-string "postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DB}" \
  2>&1) || true

HYPERDRIVE_ID=$(echo "$HYPERDRIVE_OUTPUT" | grep -oP '"id":\s*"([a-f0-9]{32})"' | head -1 | grep -oP '[a-f0-9]{32}' || true)

if [ -z "$HYPERDRIVE_ID" ]; then
  echo "Hyperdrive already exist, listing..."
  HYPERDRIVE_ID=$(wrangler hyperdrive list 2>&1 | grep -A2 "audityzer-pg" | grep -oP '[a-f0-9]{32}' | head -1)
fi

if [ -z "$HYPERDRIVE_ID" ]; then
  echo "ERROR: Could not obtain Hyperdrive ID" >&2
  exit 1
fi

echo "Hyperdrive ID: $HYPERDRIVE_ID"

# Update wrangler.toml with the real ID
sed -i "s/REPLACE_WITH_HYPERDRIVE_ID/$HYPERDRIVE_ID/g" wrangler.toml

echo "Deploying Cloudflare Worker..."
wrangler deploy --compatibility-date 2024-01-01

echo "Deploy complete. Worker URL:"
wrangler deployments list | head -5
