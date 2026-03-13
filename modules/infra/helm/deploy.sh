#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# AuditorSEC / DaBROIoTEXs — Kubernetes Deployment Script
# Deploys all Helm charts in correct dependency order on DigitalOcean DOKS
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENVIRONMENT="${1:-staging}"
DRY_RUN="${DRY_RUN:-false}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $*"; }
ok()   { echo -e "${GREEN}[$(date +'%H:%M:%S')] ✓${NC} $*"; }
warn() { echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠${NC} $*"; }
err()  { echo -e "${RED}[$(date +'%H:%M:%S')] ✗${NC} $*" >&2; }

usage() {
  cat <<EOF
Usage: $0 [environment]

Environments:
  staging     Deploy with default values (default)
  production  Deploy with production overrides

Options:
  DRY_RUN=true $0 [env]   Preview without deploying

Examples:
  $0                       # Deploy staging
  $0 production            # Deploy production
  DRY_RUN=true $0 production  # Dry run production
EOF
  exit 1
}

# --- Pre-flight checks ---

check_prerequisites() {
  log "Checking prerequisites..."

  for cmd in helm kubectl; do
    if ! command -v "$cmd" &>/dev/null; then
      err "$cmd is required but not installed."
      exit 1
    fi
  done

  if ! kubectl cluster-info &>/dev/null; then
    err "Cannot connect to Kubernetes cluster. Check your kubeconfig."
    exit 1
  fi

  ok "Prerequisites OK"
}

# --- Helm helpers ---

helm_deploy() {
  local name="$1"
  local chart_dir="$2"
  local namespace="$3"
  shift 3
  local extra_args=("$@")

  log "Deploying ${name} to namespace ${namespace}..."

  local values_args=("-f" "${chart_dir}/values.yaml")
  if [[ "$ENVIRONMENT" == "production" ]] && [[ -f "${chart_dir}/values.production.yaml" ]]; then
    values_args+=("-f" "${chart_dir}/values.production.yaml")
  fi

  local cmd=(helm upgrade --install "$name" "$chart_dir"
    --namespace "$namespace" --create-namespace
    "${values_args[@]}"
    --wait --timeout 5m
    "${extra_args[@]}"
  )

  if [[ "$DRY_RUN" == "true" ]]; then
    cmd+=(--dry-run)
    warn "DRY RUN: ${cmd[*]}"
  fi

  if "${cmd[@]}"; then
    ok "${name} deployed successfully"
  else
    err "${name} deployment failed!"
    return 1
  fi
}

# --- Build dependencies ---

build_deps() {
  log "Building Helm chart dependencies..."

  for chart in cert-manager ingress-nginx monitoring; do
    if [[ -f "${SCRIPT_DIR}/${chart}/Chart.yaml" ]]; then
      log "  Building deps for ${chart}..."
      helm dependency build "${SCRIPT_DIR}/${chart}" --skip-refresh 2>/dev/null || \
        helm dependency build "${SCRIPT_DIR}/${chart}"
    fi
  done

  ok "Dependencies built"
}

# --- Add Helm repos ---

add_repos() {
  log "Adding Helm repositories..."

  helm repo add jetstack https://charts.jetstack.io 2>/dev/null || true
  helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx 2>/dev/null || true
  helm repo add prometheus-community https://prometheus-community.github.io/helm-charts 2>/dev/null || true
  helm repo add grafana https://grafana.github.io/helm-charts 2>/dev/null || true
  helm repo update

  ok "Helm repos updated"
}

# =============================================================================
# Main deployment — ordered by dependency
# =============================================================================

main() {
  echo ""
  echo "=========================================="
  echo " AuditorSEC / DaBROIoTEXs Deployment"
  echo " Environment: ${ENVIRONMENT}"
  echo "=========================================="
  echo ""

  check_prerequisites
  add_repos
  build_deps

  # 1. cert-manager (TLS certificates — must be first for ClusterIssuers)
  helm_deploy "cert-manager" "${SCRIPT_DIR}/cert-manager" "cert-manager"

  log "Waiting for cert-manager webhook to be ready..."
  kubectl wait --for=condition=available deployment/cert-manager-webhook \
    -n cert-manager --timeout=120s 2>/dev/null || true

  # 2. ingress-nginx (LoadBalancer — needed before any Ingress resources)
  helm_deploy "ingress-nginx" "${SCRIPT_DIR}/ingress-nginx" "ingress-nginx"

  log "Waiting for LoadBalancer IP..."
  for i in $(seq 1 30); do
    LB_IP=$(kubectl get svc -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx \
      -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' 2>/dev/null || true)
    if [[ -n "$LB_IP" ]]; then
      ok "LoadBalancer IP: ${LB_IP}"
      break
    fi
    sleep 5
  done
  if [[ -z "${LB_IP:-}" ]]; then
    warn "LoadBalancer IP not yet assigned. Update DNS manually later."
  fi

  # 3. monitoring (Prometheus + Grafana + Loki)
  helm_deploy "monitoring" "${SCRIPT_DIR}/monitoring" "monitoring"

  # 4. auditorsec-platform (main application)
  helm_deploy "auditorsec-platform" "${SCRIPT_DIR}/auditorsec-platform" "auditorsec"

  # 5. telegram-bots (depends on platform for RAG API)
  helm_deploy "telegram-bots" "${SCRIPT_DIR}/telegram-bots" "auditorsec"

  # 6. mqtt-gateway (IoT broker)
  helm_deploy "mqtt-gateway" "${SCRIPT_DIR}/mqtt-gateway" "auditorsec"

  # --- Summary ---
  echo ""
  echo "=========================================="
  echo " Deployment Complete!"
  echo "=========================================="
  echo ""
  log "Services:"
  echo "  - Platform API:   https://api.neuralinfra.digital"
  echo "  - Platform App:   https://app.neuralinfra.digital"
  echo "  - Telegram Bot:   https://bot.neuralinfra.digital"
  echo "  - MQTT WebSocket: wss://mqtt.neuralinfra.digital"
  echo "  - Grafana:        https://grafana.neuralinfra.digital"
  echo ""

  if [[ -n "${LB_IP:-}" ]]; then
    log "DNS: Point *.neuralinfra.digital to ${LB_IP}"
  fi

  log "Post-deploy steps:"
  echo "  1. Set Telegram webhook:"
  echo '     curl -X POST "https://api.telegram.org/bot${TOKEN}/setWebhook" \'
  echo '       -d '\''{"url": "https://bot.neuralinfra.digital/webhook/telegram"}'\'''
  echo "  2. Verify certificates:"
  echo "     kubectl get certificates -A"
  echo "  3. Check pods:"
  echo "     kubectl get pods -n auditorsec"
  echo ""
}

# Handle help flag
if [[ "${1:-}" == "-h" ]] || [[ "${1:-}" == "--help" ]]; then
  usage
fi

main
