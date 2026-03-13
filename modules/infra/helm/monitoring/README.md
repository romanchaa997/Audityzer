# monitoring

Helm chart for AuditorSEC/DaBROIoTEXs monitoring stack: Prometheus, Grafana, AlertManager, and Loki.

## Prerequisites

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm dependency build ./monitoring
```

## Install

```bash
helm install monitoring ./monitoring \
  --namespace monitoring --create-namespace \
  --set kube-prometheus-stack.grafana.adminPassword="secure-password"
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `kube-prometheus-stack.grafana.adminPassword` | Grafana admin password | `changeme` |
| `kube-prometheus-stack.prometheus.prometheusSpec.retention` | Metrics retention | `15d` |
| `kube-prometheus-stack.prometheus.prometheusSpec.storageSpec...storage` | Prometheus PVC size | `10Gi` |
| `kube-prometheus-stack.grafana.persistence.size` | Grafana PVC size | `5Gi` |

## Dashboards

- **Kubernetes Health** — Cluster overview (community dashboard #15520)
- **AuditorSEC API Metrics** — Request rate, latency, errors
- **MQTT IoT Gateway** — Connected clients, message throughput
- **Telegram Bot Usage** — Message processing, RAG API calls
- **IoT Sensor Dashboard** — Device count, energy, temperature, humidity

## Alerts

Alerts are routed to Telegram via the bot webhook at `http://telegram-bots:80/webhook/alertmanager`.
