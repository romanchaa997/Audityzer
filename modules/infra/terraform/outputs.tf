# ============================================================================
# AuditorSEC / DaBROIoTEXs — Outputs
# Вихідні значення для інтеграції з CI/CD, Helm, ArgoCD
# ============================================================================

# ---------------------------------------------------------------------------
# Kubernetes / Кубернетіс
# ---------------------------------------------------------------------------

output "k8s_cluster_id" {
  description = "DOKS cluster ID"
  value       = digitalocean_kubernetes_cluster.main.id
}

output "k8s_cluster_name" {
  description = "DOKS cluster name"
  value       = digitalocean_kubernetes_cluster.main.name
}

output "k8s_endpoint" {
  description = "Kubernetes API server endpoint"
  value       = digitalocean_kubernetes_cluster.main.endpoint
  sensitive   = true
}

output "k8s_version" {
  description = "Running Kubernetes version"
  value       = digitalocean_kubernetes_cluster.main.version
}

output "k8s_kubeconfig" {
  description = "Raw kubeconfig for kubectl access. Use: terraform output -raw k8s_kubeconfig > ~/.kube/config"
  value       = digitalocean_kubernetes_cluster.main.kube_config[0].raw_config
  sensitive   = true
}

# ---------------------------------------------------------------------------
# Database / База даних
# ---------------------------------------------------------------------------

output "db_host" {
  description = "PostgreSQL host (private network)"
  value       = digitalocean_database_cluster.postgres.private_host
}

output "db_port" {
  description = "PostgreSQL port"
  value       = digitalocean_database_cluster.postgres.port
}

output "db_name" {
  description = "Default database name"
  value       = digitalocean_database_db.default.name
}

output "db_user" {
  description = "Database admin user"
  value       = digitalocean_database_cluster.postgres.user
  sensitive   = true
}

output "db_password" {
  description = "Database admin password"
  value       = digitalocean_database_cluster.postgres.password
  sensitive   = true
}

output "db_uri" {
  description = "PostgreSQL connection URI (private). Для підключення з K8s."
  value       = digitalocean_database_cluster.postgres.private_uri
  sensitive   = true
}

output "db_pool_uri" {
  description = "pgBouncer connection pool URI (private)"
  value       = digitalocean_database_connection_pool.default.private_uri
  sensitive   = true
}

# ---------------------------------------------------------------------------
# Spaces / Об'єктне сховище
# ---------------------------------------------------------------------------

output "spaces_artifacts_endpoint" {
  description = "Artifacts bucket endpoint"
  value       = digitalocean_spaces_bucket.artifacts.bucket_domain_name
}

output "spaces_artifacts_cdn" {
  description = "Artifacts CDN endpoint"
  value       = digitalocean_cdn.artifacts.endpoint
}

output "spaces_iot_data_endpoint" {
  description = "IoT data bucket endpoint"
  value       = digitalocean_spaces_bucket.iot_data.bucket_domain_name
}

output "spaces_backups_endpoint" {
  description = "Backups bucket endpoint"
  value       = digitalocean_spaces_bucket.backups.bucket_domain_name
}

output "spaces_endpoints" {
  description = "All Spaces bucket endpoints (map)"
  value = {
    artifacts = digitalocean_spaces_bucket.artifacts.bucket_domain_name
    iot_data  = digitalocean_spaces_bucket.iot_data.bucket_domain_name
    backups   = digitalocean_spaces_bucket.backups.bucket_domain_name
  }
}

# ---------------------------------------------------------------------------
# Container Registry / Реєстр контейнерів
# ---------------------------------------------------------------------------

output "registry_endpoint" {
  description = "Container registry endpoint for docker push/pull"
  value       = digitalocean_container_registry.main.endpoint
}

output "registry_server_url" {
  description = "Registry server URL (for K8s imagePullSecrets)"
  value       = digitalocean_container_registry.main.server_url
}

# ---------------------------------------------------------------------------
# DNS / Домен
# ---------------------------------------------------------------------------

output "domain" {
  description = "Primary domain name"
  value       = digitalocean_domain.main.name
}

output "nameservers" {
  description = "DigitalOcean nameservers — set these at your registrar"
  value       = ["ns1.digitalocean.com", "ns2.digitalocean.com", "ns3.digitalocean.com"]
}

# ---------------------------------------------------------------------------
# VPC / Мережа
# ---------------------------------------------------------------------------

output "vpc_id" {
  description = "VPC ID"
  value       = digitalocean_vpc.main.id
}

output "vpc_cidr" {
  description = "VPC CIDR range"
  value       = digitalocean_vpc.main.ip_range
}

# ---------------------------------------------------------------------------
# Monitoring (optional) / Моніторинг
# ---------------------------------------------------------------------------

output "monitoring_ip" {
  description = "Monitoring Droplet public IP (if enabled)"
  value       = var.enable_monitoring_droplet ? digitalocean_droplet.monitoring[0].ipv4_address : null
}
