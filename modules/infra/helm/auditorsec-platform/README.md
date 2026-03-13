# auditorsec-platform

Helm chart for the AuditorSEC smart contract audit platform (Express API + React frontend).

## Install

```bash
helm install auditorsec-platform ./auditorsec-platform \
  --namespace auditorsec --create-namespace \
  -f auditorsec-platform/values.production.yaml \
  --set secrets.JWT_SECRET="$(openssl rand -base64 32)" \
  --set secrets.DATABASE_URL="postgresql://..." \
  --set secrets.SESSION_SECRET="$(openssl rand -base64 32)"
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas | `2` |
| `image.repository` | Container image | `registry.digitalocean.com/auditorsec/platform` |
| `image.tag` | Image tag | `latest` |
| `autoscaling.enabled` | Enable HPA | `true` |
| `autoscaling.minReplicas` | Min replicas | `2` |
| `autoscaling.maxReplicas` | Max replicas | `5` |
| `autoscaling.targetCPUUtilizationPercentage` | CPU target | `70` |
| `ingress.enabled` | Enable ingress | `true` |
| `secrets.JWT_SECRET` | JWT signing secret | `""` |
| `secrets.DATABASE_URL` | PostgreSQL connection string | `""` |

## Endpoints

- `app.neuralinfra.digital` — React frontend
- `api.neuralinfra.digital/api` — Express API
- `/api/health` — Health check
- `/api/metrics` — Prometheus metrics
