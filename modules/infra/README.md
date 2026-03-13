# AuditorSEC / DaBROIoTEXs — Infrastructure

Інфраструктурний репозиторій для платформи AuditorSEC.
Infrastructure repository for the AuditorSEC platform.

## Architecture / Архітектура

```
┌─────────────────────────────────────────────────────────────┐
│  DigitalOcean (FRA1 — Frankfurt)                            │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ DOKS (K8s)  │  │ Managed      │  │ Spaces (S3)       │  │
│  │ 2-5 nodes   │  │ PostgreSQL   │  │ artifacts         │  │
│  │ s-2vcpu-4gb │  │ v16, 1 node  │  │ backups           │  │
│  │             │  │              │  │ terraform-state   │  │
│  └──────┬──────┘  └──────────────┘  └───────────────────┘  │
│         │                                                   │
│  ┌──────┴──────────────────────────────────┐               │
│  │ Namespaces:                             │               │
│  │  staging    → staging.neuralinfra.digital│               │
│  │  production → app.neuralinfra.digital   │               │
│  │  monitoring → grafana.neuralinfra.digital│               │
│  └─────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure / Структура

```
infra/
├── terraform/          # IaC — DigitalOcean resources
├── ci-cd/
│   └── .github/
│       └── workflows/
│           ├── deploy.yml          # Main CI/CD (lint→build→staging→prod)
│           ├── terraform.yml       # Terraform plan/apply
│           └── iot-firmware.yml    # ESP32 PlatformIO build
├── docker/
│   ├── Dockerfile.platform         # Node.js 20 multi-stage
│   ├── Dockerfile.bot              # Python 3.12 Telegram bot
│   ├── Dockerfile.mqtt             # Eclipse Mosquitto
│   ├── docker-compose.yml          # Full local dev stack
│   ├── docker-compose.override.yml # Dev overrides (hot reload)
│   ├── mosquitto.conf              # MQTT broker config
│   └── .env.example                # Environment template
├── helm/
│   └── auditorsec/                 # Helm chart for K8s deployment
├── bootstrap.sh                    # Full infrastructure bootstrap
└── README.md                       # ← You are here
```

## Quick Start / Швидкий старт

### Local Development / Локальна розробка

```bash
# 1. Clone and configure
cd infra/docker
cp .env.example .env
# Edit .env with your values / Відредагуйте .env

# 2. Start all services
docker compose up -d

# 3. Verify
curl http://localhost:3000/api/health
# Platform:   http://localhost:3000
# Grafana:    http://localhost:3001
# Prometheus: http://localhost:9090
# MQTT:       localhost:1883
```

### Production Bootstrap / Розгортання продакшн

```bash
# 1. Install prerequisites
# doctl, terraform, kubectl, helm, docker, jq

# 2. Authenticate with DigitalOcean
doctl auth init
export DIGITALOCEAN_ACCESS_TOKEN="your-token"
export DIGITALOCEAN_SPACES_KEY="your-key"
export DIGITALOCEAN_SPACES_SECRET="your-secret"

# 3. Run bootstrap
chmod +x infra/bootstrap.sh
./infra/bootstrap.sh

# Or skip specific parts:
./infra/bootstrap.sh --skip-terraform
./infra/bootstrap.sh --skip-k8s
./infra/bootstrap.sh --dry-run
```

## CI/CD Pipelines / Конвеєри

### Main Deploy Pipeline (`deploy.yml`)

Triggers: push to `main`, release tags `v*`

| Job | Description |
|-----|-------------|
| `lint-and-test` | Parallel matrix: Node 20/22 × lint/test/security |
| `build-and-push` | Docker build → DO Container Registry, SBOM + Trivy scan |
| `deploy-staging` | Helm upgrade → staging namespace, smoke tests |
| `deploy-production` | Canary rollout: 10% → 50% → 100%, auto-rollback |

### Terraform Pipeline (`terraform.yml`)

Triggers: changes to `infra/terraform/**`

| Job | Description |
|-----|-------------|
| `format` | `terraform fmt -check` |
| `plan` | Init → validate → plan, PR comment with output |
| `apply` | Manual approval via `infrastructure` environment |

### IoT Firmware Pipeline (`iot-firmware.yml`)

Triggers: changes to `iot/**`

| Job | Description |
|-----|-------------|
| `build` | PlatformIO: esp32-dht22 + esp32-gateway, checksum + manifest |
| `upload` | s3cmd to Spaces `firmware/esp32/` prefix |

## Required Secrets / Необхідні секрети

Configure in GitHub → Settings → Secrets and variables → Actions:

| Secret | Description |
|--------|-------------|
| `DIGITALOCEAN_ACCESS_TOKEN` | DO API token (read/write) |
| `DIGITALOCEAN_SPACES_KEY` | Spaces access key |
| `DIGITALOCEAN_SPACES_SECRET` | Spaces secret key |
| `TELEGRAM_BOT_TOKEN` | @audityzerbot token |
| `TELEGRAM_CHAT_ID` | Notifications chat ID |
| `DB_HOST` | Managed PostgreSQL host |
| `DB_PASSWORD` | Database password |

## Environments / Середовища

| Environment | URL | Approval |
|-------------|-----|----------|
| Staging | https://staging.neuralinfra.digital | Auto |
| Production | https://app.neuralinfra.digital | Auto (canary) |
| Infrastructure | https://cloud.digitalocean.com | Manual |

## Domain: neuralinfra.digital

| Subdomain | Service |
|-----------|---------|
| `app.neuralinfra.digital` | Platform (production) |
| `api.neuralinfra.digital` | REST API |
| `staging.neuralinfra.digital` | Staging |
| `grafana.neuralinfra.digital` | Monitoring dashboards |
| `mqtt.neuralinfra.digital` | MQTT broker |
| `bot.neuralinfra.digital` | Telegram bot webhook |

## Docker Images

| Image | Registry | Description |
|-------|----------|-------------|
| `auditorsec-platform` | `registry.digitalocean.com/auditorsec` | Express + Vite + React |
| `auditorsec-bot` | `registry.digitalocean.com/auditorsec` | Aiogram v3 Telegram bot |

## Terraform Resources

| Resource | Type | Details |
|----------|------|---------|
| VPC | `digitalocean_vpc` | FRA1, 10.10.0.0/16 |
| DOKS | `digitalocean_kubernetes_cluster` | 2-5 nodes, s-2vcpu-4gb |
| PostgreSQL | `digitalocean_database_cluster` | v16, db-s-1vcpu-1gb |
| Spaces × 3 | `digitalocean_spaces_bucket` | artifacts, backups, terraform-state |
| Registry | `digitalocean_container_registry` | starter tier |
| DNS | `digitalocean_domain` + records | neuralinfra.digital |
| Firewall | `digitalocean_firewall` | SSH, HTTP/S, MQTT |
