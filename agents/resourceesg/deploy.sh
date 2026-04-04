#!/bin/bash
set -euo pipefail
IMAGE="ghcr.io/romanchaa997/resourceesg-agent:latest"
NAMESPACE="auditorsec"

echo "=== ResourceESG Agent Deploy ==="
docker build -t "$IMAGE" .
docker push "$IMAGE"

# Helm deploy (if K8s available)
if command -v helm &>/dev/null; then
  helm upgrade --install resourceesg ./charts/resourceesg \
    --namespace "$NAMESPACE" \
    --set image.repository="$IMAGE" \
    --set env.AMCU_API_KEY="${AMCU_API_KEY:-}" \
    --set env.DATABASE_URL="${DATABASE_URL:-}"
else
  docker run -d --name resourceesg \
    -e AMCU_API_KEY="${AMCU_API_KEY:-}" \
    -e DATABASE_URL="${DATABASE_URL:-}" \
    -p 8081:8080 "$IMAGE"
fi
echo "=== ResourceESG deployed ==="
