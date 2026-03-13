# ============================================================================
# AuditorSEC / DaBROIoTEXs — Managed PostgreSQL
# Керована база даних PostgreSQL із пулом з'єднань (pgBouncer)
# ============================================================================

resource "digitalocean_database_cluster" "postgres" {
  name                 = "${local.prefix}-db"
  engine               = "pg"
  version              = var.db_engine_version
  size                 = var.db_size
  region               = var.region
  node_count           = var.db_node_count
  private_network_uuid = digitalocean_vpc.main.id

  tags = local.tags

  # Maintenance window: Sunday 04:00 UTC (06:00 Kyiv time)
  # Вікно обслуговування: неділя 04:00 UTC (06:00 за Києвом)
  maintenance_window {
    hour = "04:00"
    day  = "sunday"
  }

  lifecycle {
    prevent_destroy = true
  }
}

# ---------------------------------------------------------------------------
# Default Database / База даних за замовчуванням
# ---------------------------------------------------------------------------

resource "digitalocean_database_db" "default" {
  cluster_id = digitalocean_database_cluster.postgres.id
  name       = var.db_name
}

# ---------------------------------------------------------------------------
# Connection Pool (pgBouncer) / Пул з'єднань
# ---------------------------------------------------------------------------
# pgBouncer reduces connection overhead for microservices running in K8s.
# Режим "transaction" — найкращий для мікросервісів.

resource "digitalocean_database_connection_pool" "default" {
  cluster_id = digitalocean_database_cluster.postgres.id
  name       = "${local.prefix}-pool"
  mode       = var.db_pool_mode
  size       = var.db_pool_size
  db_name    = digitalocean_database_db.default.name
  user       = digitalocean_database_cluster.postgres.user
}

# ---------------------------------------------------------------------------
# Trusted Sources / Довірені джерела
# ---------------------------------------------------------------------------
# Restrict database access to K8s cluster nodes only.
# Обмежити доступ до бази лише вузлами K8s кластера.

resource "digitalocean_database_firewall" "postgres" {
  cluster_id = digitalocean_database_cluster.postgres.id

  rule {
    type  = "k8s"
    value = digitalocean_kubernetes_cluster.main.id
  }
}
