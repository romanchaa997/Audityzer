# AuditorSEC / DaBROIoTEXs — Kubernetes Helm Charts

Production-ready Helm charts for deploying all AuditorSEC and DaBROIoTEXs services on DigitalOcean DOKS (Managed Kubernetes).

## Architecture

```
                    *.neuralinfra.digital
                           │
                    ┌──────┴──────┐
                    │ DO LB (nginx)│
                    └──────┬──────┘
           ┌───────┬───────┼───────┬──────────┐
           │       │       │       │          │
        api.*    app.*   bot.*  mqtt.*   grafana.*
           │       │       │       │          │
   ┌───────┴───┐   │   ┌──┴──┐ ┌──┴───┐  ┌───┴───┐
   │ Platform  │   │   │Bots │ │ MQTT │  │Grafana│
   │ (Express) │───┘   │(WH) │ │(WSS) │  │       │
   │ + React   │       └──┬──┘ └──┬───┘  └───┬───┘
   └─────┬─────┘          │       │          │
         │           ┌────┘   ESP32/IoT   Prometheus
      PostgreSQL     │      (port 1883)    + Loki
                  RAG API
```

## Charts

| Chart | Description | Namespace |
|-------|-------------|-----------|
| [`ingress-nginx/`](./ingress-nginx/) | Nginx ingress controller with DO LoadBalancer | `ingress-nginx` |
| [`cert-manager/`](./cert-manager/) | TLS certificates via Let's Encrypt | `cert-manager` |
| [`monitoring/`](./monitoring/) | Prometheus + Grafana + AlertManager + Loki | `monitoring` |
| [`auditorsec-platform/`](./auditorsec-platform/) | Main Express + React application | `auditorsec` |
| [`telegram-bots/`](./telegram-bots/) | @audityzerbot + alert/YouTube bots | `auditorsec` |
| [`mqtt-gateway/`](./mqtt-gateway/) | Eclipse Mosquitto MQTT broker for IoT | `auditorsec` |

## Quick Start

### Prerequisites

- DigitalOcean DOKS cluster
- `kubectl` configured for the cluster
- `helm` v3.x installed
- DO Container Registry access (for app images)

### Deploy All Services

```bash
# Staging
./deploy.sh

# Production
./deploy.sh production

# Dry run
DRY_RUN=true ./deploy.sh production
```

### Deploy Individual Charts

```bash
# Add repos
helm repo add jetstack https://charts.jetstack.io
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Build dependencies
helm dependency build ./cert-manager
helm dependency build ./ingress-nginx
helm dependency build ./monitoring

# Deploy
helm install cert-manager ./cert-manager -n cert-manager --create-namespace
helm install ingress-nginx ./ingress-nginx -n ingress-nginx --create-namespace
helm install monitoring ./monitoring -n monitoring --create-namespace
helm install auditorsec-platform ./auditorsec-platform -n auditorsec --create-namespace
helm install telegram-bots ./telegram-bots -n auditorsec
helm install mqtt-gateway ./mqtt-gateway -n auditorsec
```

## Domains

| Subdomain | Service | TLS |
|-----------|---------|-----|
| `api.neuralinfra.digital` | Platform API (Express) | cert-manager |
| `app.neuralinfra.digital` | Platform App (React) | cert-manager |
| `bot.neuralinfra.digital` | Telegram Bot Webhooks | cert-manager |
| `mqtt.neuralinfra.digital` | MQTT WebSocket | cert-manager |
| `grafana.neuralinfra.digital` | Grafana Dashboards | cert-manager |

## Deployment Order

The `deploy.sh` script handles this automatically:

1. **cert-manager** — CRDs and ClusterIssuers for TLS
2. **ingress-nginx** — LoadBalancer and ingress controller
3. **monitoring** — Prometheus, Grafana, Loki (so ServiceMonitors work)
4. **auditorsec-platform** — Main application
5. **telegram-bots** — Bot webhooks (depends on platform RAG API)
6. **mqtt-gateway** — IoT MQTT broker

## Production Overrides

Each chart includes a `values.production.yaml` with production-specific settings (higher resources, stricter security, longer retention). Applied automatically when deploying with `./deploy.sh production`.

## Monitoring

- **Prometheus** scrapes all services via ServiceMonitor CRDs
- **Grafana** dashboards: K8s health, API metrics, MQTT metrics, IoT sensors, bot usage
- **AlertManager** routes alerts to Telegram via bot webhook
- **Loki** aggregates logs from all pods via Promtail
