#!/bin/bash
set -euo pipefail
IMAGE="ghcr.io/romanchaa997/osiris-bot:latest"
NAMESPACE="auditorsec"

echo "=== Osiris Bot Deploy ==="
docker build -t "$IMAGE" .
docker push "$IMAGE"

if command -v helm &>/dev/null; then
  helm upgrade --install osiris-bot ./charts/osiris-bot \
    --namespace "$NAMESPACE" \
    --set image.repository="$IMAGE" \
    --set env.TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}" \
    --set env.TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}" \
    --set env.AUDITYZER_API_URL="${AUDITYZER_API_URL:-https://bbbhhai.com}"
else
  docker run -d --name osiris-bot \
    -e TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}" \
    -e TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}" \
    -e AUDITYZER_API_URL="${AUDITYZER_API_URL:-https://bbbhhai.com}" \
    -p 8083:8080 "$IMAGE"
fi
echo "=== Osiris Bot deployed ==="
