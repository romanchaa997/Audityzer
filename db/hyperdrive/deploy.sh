#!/bin/bash
set -euo pipefail
# ========================================
# AuditorSEC Hyperdrive + Worker Deploy
# ========================================
# Prereqs:
#   npm install -g wrangler
#   wrangler login
#   CF API token with Workers + Hyperdrive + D1 permissions
# ========================================

ACCOUNT_ID="44413650497549d4e08c7040d1710225"
PG_HOST="interchange.proxy.rlwy.net"
PG_PORT="47123"
PG_USER="postgres"
PG_PASS="GVLphDtWHztHEvkxlpfnSINUlHnvzwPP"
PG_DB="railway"

echo ">>> Step 1: Create Hyperdrive config"
HYPERDRIVE_OUTPUT=$(wrangler hyperdrive create audityzer-pg \
  --connection-string="postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DB}" \
  2>&1) || true

# Extract Hyperdrive ID
HYPERDRIVE_ID=$(echo "$HYPERDRIVE_OUTPUT" | grep -oP '[a-f0-9]{32}' | head -1)
if [ -z "$HYPERDRIVE_ID" ]; then
  echo ">>> Hyperdrive may already exist, listing..."
  HYPERDRIVE_ID=$(wrangler hyperdrive list 2>&1 | grep "audityzer-pg" -A2 | grep -oP '[a-f0-9]{32}' | head -1)
fi

echo ">>> Hyperdrive ID: $HYPERDRIVE_ID"

echo ">>> Step 2: Update wrangler.toml with Hyperdrive ID"
sed -i "s/REPLACE_WITH_HYPERDRIVE_ID/$HYPERDRIVE_ID/" wrangler.toml

echo ">>> Step 3: Install dependencies"
npm install

echo ">>> Step 4: Deploy Worker"
wrangler deploy

echo ""
echo "==================================="
echo "  Deployed: audityzer-public-api"
echo "  URL: https://audityzer-public-api.${ACCOUNT_ID}.workers.dev"
echo "  Hyperdrive: $HYPERDRIVE_ID"
echo "==================================="
