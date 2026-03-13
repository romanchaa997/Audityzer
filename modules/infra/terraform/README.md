# AuditorSEC / DaBROIoTEXs — Terraform Infrastructure

Production-ready Infrastructure as Code for deploying the AuditorSEC platform on DigitalOcean.

## Architecture / Архітектура

| Resource | Description | Monthly Cost (est.) |
|----------|-------------|-------------------|
| VPC (`auditorsec-vpc`) | Private network, FRA1, 10.100.0.0/20 | Free |
| DOKS (`auditorsec-k8s`) | Kubernetes 1.31, 2–5 nodes (s-2vcpu-4gb) | ~$48+ |
| PostgreSQL (`auditorsec-db`) | Managed PG 16, pgBouncer pool | $15 |
| Spaces × 3 | artifacts (CDN), iot-data, backups | ~$5–15 |
| Container Registry | Starter tier (500 MB) | Free |
| DNS | neuralinfra.digital + subdomains | Free |
| Monitoring Droplet | Grafana + Prometheus (optional) | $6 |

**Total estimated: ~$70–85/mo** (production, 2 nodes, no monitoring droplet)

## Prerequisites / Передумови

1. [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.6.0
2. [doctl](https://docs.digitalocean.com/reference/doctl/how-to/install/) CLI
3. DigitalOcean account with:
   - API token (PAT)
   - Spaces access key + secret
4. Domain `neuralinfra.digital` registered and NS pointed to DigitalOcean

## Quick Start / Швидкий старт

### 1. Authenticate / Автентифікація

```bash
# Install doctl
brew install doctl  # macOS
# or: snap install doctl  # Ubuntu

# Authenticate
doctl auth init

# Verify
doctl account get
```

### 2. Create State Bucket / Створити бакет для стану

```bash
export SPACES_ACCESS_KEY_ID="your-key"
export SPACES_SECRET_ACCESS_KEY="your-secret"
export AWS_ACCESS_KEY_ID="$SPACES_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$SPACES_SECRET_ACCESS_KEY"

aws s3api create-bucket \
  --bucket auditorsec-tfstate \
  --endpoint-url https://fra1.digitaloceanspaces.com \
  --region fra1
```

### 3. Initialize Terraform / Ініціалізація

```bash
cd infra/terraform

# Copy example vars
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values (NEVER commit this file!)

# Initialize with backend credentials
terraform init \
  -backend-config="access_key=$SPACES_ACCESS_KEY_ID" \
  -backend-config="secret_key=$SPACES_SECRET_ACCESS_KEY"
```

### 4. Plan & Apply / Планування та застосування

```bash
# Set credentials via env vars (recommended)
export TF_VAR_do_token="dop_v1_your_token"
export TF_VAR_spaces_access_id="$SPACES_ACCESS_KEY_ID"
export TF_VAR_spaces_secret_key="$SPACES_SECRET_ACCESS_KEY"

# Review changes
terraform plan

# Apply infrastructure
terraform apply
```

### 5. Configure kubectl / Налаштування kubectl

```bash
# Option A: via doctl
doctl kubernetes cluster kubeconfig save auditorsec-k8s

# Option B: via terraform output
terraform output -raw k8s_kubeconfig > ~/.kube/config

# Verify
kubectl get nodes
```

### 6. Deploy nginx-ingress / Розгортання ingress-контролера

```bash
# Install nginx-ingress via Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.service.type=LoadBalancer

# Get LoadBalancer IP
kubectl get svc -n ingress-nginx -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}'

# Update terraform.tfvars with the LB IP, then:
terraform apply
```

### 7. Install cert-manager / Встановлення cert-manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
```

## File Structure / Структура файлів

```
infra/terraform/
├── versions.tf              # Terraform & provider versions
├── variables.tf             # Input variables with validation
├── backend.tf               # Remote state (DO Spaces)
├── main.tf                  # Provider, locals, project
├── vpc.tf                   # VPC (private network)
├── kubernetes.tf            # DOKS cluster + node pool
├── database.tf              # PostgreSQL + pgBouncer + firewall
├── spaces.tf                # 3 Spaces buckets + CDN
├── registry.tf              # Container registry
├── dns.tf                   # Domain + DNS records
├── firewall.tf              # Firewall + monitoring droplet
├── outputs.tf               # All outputs
├── terraform.tfvars.example # Example values (safe to commit)
└── README.md                # This file
```

## Useful Commands / Корисні команди

```bash
# Show all outputs
terraform output

# Get database connection string
terraform output -raw db_uri

# Get kubeconfig
terraform output -raw k8s_kubeconfig > kubeconfig.yaml

# Show specific resource
terraform state show digitalocean_kubernetes_cluster.main

# Destroy (CAUTION! Database and Spaces have prevent_destroy)
terraform destroy

# Import existing resources
terraform import digitalocean_domain.main neuralinfra.digital
```

## Environments / Середовища

| Setting | Production | Staging | Development |
|---------|-----------|---------|-------------|
| K8s HA control plane | Yes | No | No |
| Node count | 2–5 | 1–3 | 1–2 |
| DB nodes | 2+ (HA) | 1 | 1 |
| Monitoring droplet | No (use K8s) | Optional | No |
| `spaces_force_destroy` | `false` | `true` | `true` |

## Security Notes / Безпека

- **Secrets**: Use `TF_VAR_*` env vars or a secrets manager. Never commit `terraform.tfvars`.
- **Database**: Restricted to K8s nodes only (trusted sources / довірені джерела).
- **VPC**: All resources in private network, no public IPs except LB.
- **State**: Encrypted at rest in DO Spaces. Use state locking for teams.
- **Lifecycle**: `prevent_destroy` on database and Spaces buckets.
- **DNS CAA**: Restricts certificate issuance to Let's Encrypt only.

## Contributing

See [CLAUDE.md](../../CLAUDE.md) for coding conventions and workflow.
