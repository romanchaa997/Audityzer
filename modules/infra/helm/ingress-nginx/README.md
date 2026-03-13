# ingress-nginx

Helm chart wrapper for ingress-nginx controller on DigitalOcean DOKS for AuditorSEC/DaBROIoTEXs.

## Prerequisites

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm dependency build ./ingress-nginx
```

## Install

```bash
helm install ingress-nginx ./ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `ingress-nginx.controller.replicaCount` | Controller replicas | `2` |
| `ingress-nginx.controller.service.type` | Service type | `LoadBalancer` |
| `ingress-nginx.controller.config.use-proxy-protocol` | Enable proxy protocol | `true` |
| `ingress-nginx.controller.metrics.enabled` | Enable Prometheus metrics | `true` |

## DigitalOcean Integration

The chart includes DO-specific LoadBalancer annotations for:
- Proxy protocol support (preserves real client IPs)
- TLS passthrough to cert-manager
- Small LB size (upgrade in production values)

## Rate Limiting

Apply per-ingress rate limits:

```yaml
annotations:
  nginx.ingress.kubernetes.io/limit-rps: "10"
  nginx.ingress.kubernetes.io/limit-connections: "5"
  nginx.ingress.kubernetes.io/limit-burst-multiplier: "3"
```
