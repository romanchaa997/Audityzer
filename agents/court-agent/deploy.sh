#!/bin/bash
set -euo pipefail
IMAGE="ghcr.io/romanchaa997/court-agent:latest"
NAMESPACE="auditorsec"

echo "=== Court-Agent Deploy ==="
docker build -t "$IMAGE" .
docker push "$IMAGE"

if command -v helm &>/dev/null; then
  helm upgrade --install court-agent ./charts/court-agent \
    --namespace "$NAMESPACE" \
    --set image.repository="$IMAGE" \
    --set env.PROZORRO_API_KEY="${PROZORRO_API_KEY:-}" \
    --set env.DATABASE_URL="${DATABASE_URL:-}"
else
  docker run -d --name court-agent \
    -e PROZORRO_API_KEY="${PROZORRO_API_KEY:-}" \
    -e DATABASE_URL="${DATABASE_URL:-}" \
    -p 8082:8080 "$IMAGE"
fi
echo "=== Court-Agent deployed ==="
