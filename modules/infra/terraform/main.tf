# ============================================================================
# AuditorSEC / DaBROIoTEXs — Main Configuration
# Головна конфігурація: провайдер, локальні змінні, проєкт
# ============================================================================

# ---------------------------------------------------------------------------
# Provider / Провайдер
# ---------------------------------------------------------------------------

provider "digitalocean" {
  token             = var.do_token
  spaces_access_id  = var.spaces_access_id
  spaces_secret_key = var.spaces_secret_key
}

# ---------------------------------------------------------------------------
# Local Values / Локальні значення
# ---------------------------------------------------------------------------

locals {
  # Common tags applied to every resource that supports them
  tags = [
    "project:auditorsec",
    "env:${var.environment}",
    "managed-by:terraform",
    "org:dabroiotexs",
  ]

  # Resource naming prefix
  prefix = "auditorsec"

  # CIDR for VPC — /20 gives 4094 usable addresses
  vpc_cidr = "10.100.0.0/20"
}

# ---------------------------------------------------------------------------
# Data Sources / Джерела даних
# ---------------------------------------------------------------------------

# Fetch latest available K8s version matching the requested prefix
data "digitalocean_kubernetes_versions" "available" {
  version_prefix = "${var.k8s_version}."
}

# ---------------------------------------------------------------------------
# Project / Проєкт DigitalOcean
# ---------------------------------------------------------------------------
# Groups all resources under one DigitalOcean project for billing & access.

resource "digitalocean_project" "auditorsec" {
  name        = "AuditorSEC"
  description = "AuditorSEC + DaBROIoTEXs — Smart contract audit platform, IoT digital twin, gig contracts (Дія.City)"
  purpose     = "Service or API"
  environment = var.environment == "production" ? "Production" : (var.environment == "staging" ? "Staging" : "Development")
}

# Associate resources with the project.
# DOKS, databases, Spaces, domains, droplets are added here.
resource "digitalocean_project_resources" "auditorsec" {
  project = digitalocean_project.auditorsec.id

  resources = compact(flatten([
    [digitalocean_kubernetes_cluster.main.urn],
    [digitalocean_database_cluster.postgres.urn],
    [digitalocean_spaces_bucket.artifacts.urn],
    [digitalocean_spaces_bucket.iot_data.urn],
    [digitalocean_spaces_bucket.backups.urn],
    [digitalocean_domain.main.urn],
    var.enable_monitoring_droplet ? [digitalocean_droplet.monitoring[0].urn] : [],
  ]))
}
