# cert-manager

Helm chart wrapper for cert-manager with Let's Encrypt ClusterIssuers for AuditorSEC/DaBROIoTEXs.

## Prerequisites

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm dependency build ./cert-manager
```

## Install

```bash
helm install cert-manager ./cert-manager \
  --namespace cert-manager --create-namespace
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `cert-manager.installCRDs` | Install CRDs | `true` |
| `clusterIssuers.production.enabled` | Enable production issuer | `true` |
| `clusterIssuers.production.email` | ACME registration email | `dev@neuralinfra.digital` |
| `clusterIssuers.staging.enabled` | Enable staging issuer | `true` |

## Usage

Annotate Ingress resources with:

```yaml
annotations:
  cert-manager.io/cluster-issuer: letsencrypt-production
```

Use `letsencrypt-staging` for testing to avoid rate limits.
