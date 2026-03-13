#!/usr/bin/env bash
# =============================================================================
# AuditorSEC / DaBROIoTEXs — Infrastructure Bootstrap Script
# Скрипт розгортання інфраструктури
# =============================================================================
# Usage: ./bootstrap.sh [--skip-terraform] [--skip-k8s] [--dry-run]
# Requirements: doctl, terraform, kubectl, helm, docker, jq
# =============================================================================

set -euo pipefail

# ── Colors & helpers ─────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

STEP=0
TOTAL_STEPS=13

step() {
  STEP=$((STEP + 1))
  echo -e "\n${CYAN}[${STEP}/${TOTAL_STEPS}]${NC} ${BLUE}$1${NC}"
}

success() { echo -e "  ${GREEN}✓${NC} $1"; }
warn()    { echo -e "  ${YELLOW}⚠${NC} $1"; }
fail()    { echo -e "  ${RED}✗${NC} $1"; exit 1; }
info()    { echo -e "  ${CYAN}ℹ${NC} $1"; }

# ── Parse flags ──────────────────────────────────────────────────────────────
SKIP_TERRAFORM=false
SKIP_K8S=false
DRY_RUN=false

for arg in "$@"; do
  case $arg in
    --skip-terraform) SKIP_TERRAFORM=true ;;
    --skip-k8s)       SKIP_K8S=true ;;
    --dry-run)        DRY_RUN=true ;;
    --help|-h)
      echo "Usage: $0 [--skip-terraform] [--skip-k8s] [--dry-run]"
      exit 0
      ;;
  esac
done

if [ "$DRY_RUN" = true ]; then
  warn "DRY RUN — no changes will be made"
fi

# ── Configuration ────────────────────────────────────────────────────────────
REGION="fra1"
CLUSTER_NAME="auditorsec-k8s"
REGISTRY_NAME="auditorsec"
DOMAIN="neuralinfra.digital"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INFRA_DIR="${PROJECT_DIR}/infra"
TF_DIR="${INFRA_DIR}/terraform"

echo -e "${CYAN}"
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║    AuditorSEC Infrastructure Bootstrap           ║"
echo "  ║    Region: ${REGION} | Cluster: ${CLUSTER_NAME}            ║"
echo "  ╚══════════════════════════════════════════════════╝"
echo -e "${NC}"

# =============================================================================
# Step 1: Verify prerequisites
# =============================================================================
step "Verifying prerequisites / Перевірка залежностей"

REQUIRED_TOOLS=(doctl terraform kubectl helm docker jq)
MISSING=()

for tool in "${REQUIRED_TOOLS[@]}"; do
  if command -v "$tool" &>/dev/null; then
    success "$tool $(${tool} version 2>/dev/null | head -1 | grep -oP '[\d]+\.[\d]+\.[\d]+' | head -1 || echo 'found')"
  else
    MISSING+=("$tool")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  fail "Missing tools: ${MISSING[*]}"
fi

# =============================================================================
# Step 2: Verify DigitalOcean authentication
# =============================================================================
step "Verifying DigitalOcean authentication / Перевірка авторизації DO"

if [ -z "${DIGITALOCEAN_ACCESS_TOKEN:-}" ]; then
  if doctl account get &>/dev/null; then
    success "doctl already authenticated"
  else
    fail "Set DIGITALOCEAN_ACCESS_TOKEN or run: doctl auth init"
  fi
else
  success "DIGITALOCEAN_ACCESS_TOKEN is set"
fi

ACCOUNT=$(doctl account get --format Email --no-header 2>/dev/null || echo "unknown")
info "Account: ${ACCOUNT}"

# =============================================================================
# Step 3: Verify secrets / environment
# =============================================================================
step "Checking required secrets / Перевірка секретів"

SECRETS_OK=true
for var in DIGITALOCEAN_ACCESS_TOKEN DIGITALOCEAN_SPACES_KEY DIGITALOCEAN_SPACES_SECRET; do
  if [ -n "${!var:-}" ]; then
    success "${var} is set"
  else
    warn "${var} is NOT set"
    SECRETS_OK=false
  fi
done

if [ "$SECRETS_OK" = false ]; then
  warn "Some secrets are missing — Terraform and S3 operations may fail"
fi

# =============================================================================
# Step 4: Create Container Registry
# =============================================================================
step "Setting up Container Registry / Реєстр контейнерів"

if doctl registry get &>/dev/null 2>&1; then
  success "Container registry already exists"
else
  if [ "$DRY_RUN" = false ]; then
    doctl registry create "${REGISTRY_NAME}" --region "${REGION}" --subscription-tier starter
    success "Registry created: registry.digitalocean.com/${REGISTRY_NAME}"
  else
    info "Would create registry: ${REGISTRY_NAME}"
  fi
fi

# =============================================================================
# Step 5: Terraform init & plan
# =============================================================================
step "Terraform — init & plan / Ініціалізація Terraform"

if [ "$SKIP_TERRAFORM" = true ]; then
  warn "Skipping Terraform (--skip-terraform)"
else
  if [ ! -d "$TF_DIR" ]; then
    fail "Terraform directory not found: ${TF_DIR}"
  fi

  cd "$TF_DIR"

  if [ "$DRY_RUN" = false ]; then
    terraform init \
      -backend-config="access_key=${DIGITALOCEAN_SPACES_KEY:-}" \
      -backend-config="secret_key=${DIGITALOCEAN_SPACES_SECRET:-}"
    success "Terraform initialized"

    terraform plan -out=tfplan \
      -var="do_token=${DIGITALOCEAN_ACCESS_TOKEN:-}" \
      -var="spaces_access_key=${DIGITALOCEAN_SPACES_KEY:-}" \
      -var="spaces_secret_key=${DIGITALOCEAN_SPACES_SECRET:-}"
    success "Plan generated — review above output"
  else
    info "Would run: terraform init && terraform plan"
  fi

  cd "$PROJECT_DIR"
fi

# =============================================================================
# Step 6: Terraform apply
# =============================================================================
step "Terraform — apply / Застосування змін"

if [ "$SKIP_TERRAFORM" = true ]; then
  warn "Skipping Terraform (--skip-terraform)"
else
  if [ "$DRY_RUN" = false ]; then
    echo ""
    read -p "  Apply Terraform changes? (yes/no): " CONFIRM
    if [ "$CONFIRM" = "yes" ]; then
      cd "$TF_DIR"
      terraform apply tfplan
      success "Infrastructure provisioned"
      cd "$PROJECT_DIR"
    else
      warn "Terraform apply skipped by user"
    fi
  else
    info "Would run: terraform apply tfplan"
  fi
fi

# =============================================================================
# Step 7: Configure kubectl
# =============================================================================
step "Configuring kubectl / Налаштування kubectl"

if [ "$SKIP_K8S" = true ]; then
  warn "Skipping Kubernetes (--skip-k8s)"
else
  if [ "$DRY_RUN" = false ]; then
    doctl kubernetes cluster kubeconfig save "${CLUSTER_NAME}"
    success "kubectl configured for ${CLUSTER_NAME}"

    NODE_COUNT=$(kubectl get nodes --no-headers 2>/dev/null | wc -l)
    info "Cluster nodes: ${NODE_COUNT}"
  else
    info "Would configure kubectl for: ${CLUSTER_NAME}"
  fi
fi

# =============================================================================
# Step 8: Install Helm charts (cert-manager, nginx-ingress)
# =============================================================================
step "Installing Helm dependencies / Встановлення Helm чартів"

if [ "$SKIP_K8S" = true ]; then
  warn "Skipping Kubernetes (--skip-k8s)"
else
  if [ "$DRY_RUN" = false ]; then
    # cert-manager
    if kubectl get namespace cert-manager &>/dev/null 2>&1; then
      success "cert-manager already installed"
    else
      helm repo add jetstack https://charts.jetstack.io --force-update
      helm install cert-manager jetstack/cert-manager \
        --namespace cert-manager --create-namespace \
        --set crds.enabled=true \
        --wait
      success "cert-manager installed"
    fi

    # nginx-ingress
    if kubectl get namespace ingress-nginx &>/dev/null 2>&1; then
      success "ingress-nginx already installed"
    else
      helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx --force-update
      helm install ingress-nginx ingress-nginx/ingress-nginx \
        --namespace ingress-nginx --create-namespace \
        --set controller.publishService.enabled=true \
        --wait
      success "ingress-nginx installed"
    fi

    helm repo update
  else
    info "Would install: cert-manager, ingress-nginx"
  fi
fi

# =============================================================================
# Step 9: Create namespaces
# =============================================================================
step "Creating Kubernetes namespaces / Створення просторів імен"

if [ "$SKIP_K8S" = true ]; then
  warn "Skipping Kubernetes (--skip-k8s)"
else
  NAMESPACES=(staging production monitoring)
  for ns in "${NAMESPACES[@]}"; do
    if [ "$DRY_RUN" = false ]; then
      kubectl create namespace "$ns" --dry-run=client -o yaml | kubectl apply -f -
      success "Namespace: ${ns}"
    else
      info "Would create namespace: ${ns}"
    fi
  done
fi

# =============================================================================
# Step 10: Create Kubernetes secrets
# =============================================================================
step "Creating Kubernetes secrets / Створення секретів K8s"

if [ "$SKIP_K8S" = true ]; then
  warn "Skipping Kubernetes (--skip-k8s)"
else
  for ns in staging production; do
    if [ "$DRY_RUN" = false ]; then
      # Registry secret
      doctl registry kubernetes-manifest | kubectl apply -n "$ns" -f -

      # App secrets
      kubectl create secret generic auditorsec-secrets \
        --namespace="$ns" \
        --from-literal=telegram-bot-token="${TELEGRAM_BOT_TOKEN:-placeholder}" \
        --from-literal=telegram-chat-id="${TELEGRAM_CHAT_ID:-placeholder}" \
        --from-literal=db-password="${DB_PASSWORD:-placeholder}" \
        --dry-run=client -o yaml | kubectl apply -f -

      success "Secrets created in ${ns}"
    else
      info "Would create secrets in: ${ns}"
    fi
  done
fi

# =============================================================================
# Step 11: Build and push Docker images
# =============================================================================
step "Building & pushing Docker images / Збірка Docker образів"

if [ "$DRY_RUN" = false ]; then
  doctl registry login

  COMMIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "latest")

  # Platform image
  info "Building platform image..."
  docker build \
    -f "${INFRA_DIR}/docker/Dockerfile.platform" \
    -t "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-platform:${COMMIT_SHA}" \
    -t "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-platform:latest" \
    "$PROJECT_DIR"
  docker push "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-platform:${COMMIT_SHA}"
  docker push "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-platform:latest"
  success "Platform image pushed"

  # Bot image
  info "Building bot image..."
  docker build \
    -f "${INFRA_DIR}/docker/Dockerfile.bot" \
    -t "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-bot:${COMMIT_SHA}" \
    -t "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-bot:latest" \
    "$PROJECT_DIR"
  docker push "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-bot:${COMMIT_SHA}"
  docker push "registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-bot:latest"
  success "Bot image pushed"
else
  info "Would build and push: platform, bot images"
fi

# =============================================================================
# Step 12: Deploy with Helm
# =============================================================================
step "Deploying to staging / Деплой на стейджинг"

if [ "$SKIP_K8S" = true ]; then
  warn "Skipping Kubernetes (--skip-k8s)"
else
  HELM_CHART="${INFRA_DIR}/helm/auditorsec"

  if [ ! -d "$HELM_CHART" ]; then
    warn "Helm chart not found at ${HELM_CHART} — skipping deploy"
  elif [ "$DRY_RUN" = false ]; then
    COMMIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "latest")

    helm upgrade --install auditorsec-staging "$HELM_CHART" \
      --namespace staging \
      --set image.repository="registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-platform" \
      --set image.tag="${COMMIT_SHA}" \
      --set bot.image.repository="registry.digitalocean.com/${REGISTRY_NAME}/auditorsec-bot" \
      --set bot.image.tag="${COMMIT_SHA}" \
      --set environment=staging \
      --set ingress.host="staging.${DOMAIN}" \
      --timeout 5m \
      --wait

    success "Deployed to staging"
  else
    info "Would deploy to staging namespace"
  fi
fi

# =============================================================================
# Step 13: Verify deployment
# =============================================================================
step "Verifying deployment / Перевірка деплою"

if [ "$SKIP_K8S" = true ]; then
  warn "Skipping Kubernetes (--skip-k8s)"
else
  if [ "$DRY_RUN" = false ]; then
    echo ""
    info "Pods in staging:"
    kubectl get pods -n staging -o wide 2>/dev/null || warn "Could not list pods"

    info "Services:"
    kubectl get svc -n staging 2>/dev/null || warn "Could not list services"

    info "Ingress:"
    kubectl get ingress -n staging 2>/dev/null || warn "Could not list ingress"
  else
    info "Would verify deployment status"
  fi
fi

# =============================================================================
# Done
# =============================================================================
echo ""
echo -e "${GREEN}"
echo "  ╔══════════════════════════════════════════════════╗"
echo "  ║    Bootstrap complete!                           ║"
echo "  ║    Розгортання завершено!                        ║"
echo "  ╚══════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo "  Next steps / Наступні кроки:"
echo "    1. Verify staging:  curl https://staging.${DOMAIN}/api/health"
echo "    2. Check Grafana:   https://grafana.${DOMAIN}"
echo "    3. Monitor MQTT:    mosquitto_sub -h mqtt.${DOMAIN} -t '#'"
echo "    4. Production:      Merge to main → auto-deploy via GitHub Actions"
echo ""
