# ============================================================================
# AuditorSEC / DaBROIoTEXs — Kubernetes (DOKS)
# Managed Kubernetes кластер для всіх сервісів платформи
# ============================================================================

resource "digitalocean_kubernetes_cluster" "main" {
  name         = "${local.prefix}-k8s"
  region       = var.region
  version      = data.digitalocean_kubernetes_versions.available.latest_version
  vpc_uuid     = digitalocean_vpc.main.id
  auto_upgrade = var.k8s_auto_upgrade
  surge_upgrade = var.k8s_surge_upgrade

  # HA control plane — recommended for production.
  # Costs extra; set false for dev/staging.
  ha = var.environment == "production"

  # Maintenance window: Saturday 04:00 UTC (06:00 Kyiv time)
  maintenance_policy {
    start_time = "04:00"
    day        = "saturday"
  }

  tags = local.tags

  # -------------------------------------------------------------------------
  # Default Node Pool / Пул вузлів за замовчуванням
  # -------------------------------------------------------------------------
  # Workloads: API server, Telegram bots, n8n, MQTT broker, nginx-ingress,
  #            cert-manager, ArgoCD, audit pipeline microservices
  node_pool {
    name       = "${local.prefix}-workers"
    size       = var.k8s_node_size
    auto_scale = true
    min_nodes  = var.k8s_min_nodes
    max_nodes  = var.k8s_max_nodes
    node_count = var.k8s_node_count

    tags = concat(local.tags, ["k8s-worker"])

    labels = {
      "workload"    = "general"
      "environment" = var.environment
    }
  }
}
