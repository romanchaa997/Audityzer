#!/bin/bash
# Cloudflare Hyperdrive setup for Railway Postgres
# Requires: CF_API_TOKEN, CF_ACCOUNT_ID, DATABASE_URL

CF_TOKEN="${CF_API_TOKEN}"

# Create Hyperdrive configuration
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/hyperdrive/configs" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "audityzer-railway-pg",
    "origin": {
      "scheme": "postgresql",
      "host": "'${PG_HOST}'",
      "port": '${PG_PORT:-5432}',
      "database": "'${PG_DATABASE}'",
      "user": "'${PG_USER}'",
      "password": "'${PG_PASSWORD}'"
    },
    "caching": {
      "disabled": false,
      "max_age": 60,
      "stale_while_revalidate": 15
    }
  }'
