# ============================================================================
# AuditorSEC / DaBROIoTEXs — Container Registry
# Реєстр Docker-образів для всіх мікросервісів платформи
# ============================================================================
#
# Starter tier: 500 MB storage, free.
# Sufficient for initial microservices (API, bots, audit pipeline).
# Upgrade to Basic ($5/mo, 5 GB) or Professional ($20/mo, unlimited)
# when image count grows.
#
# DigitalOcean Container Registry is account-wide (one per account).
# All K8s clusters in the account can pull from it automatically.

resource "digitalocean_container_registry" "main" {
  name                   = local.prefix
  subscription_tier_slug = "starter"
  region                 = var.region
}

# ---------------------------------------------------------------------------
# Docker Credentials for K8s / Docker-облікові дані для K8s
# ---------------------------------------------------------------------------
# Automatically configure DOKS to pull images from the registry.
# Автоматично налаштовує кластер для завантаження образів з реєстру.

resource "digitalocean_container_registry_docker_credentials" "main" {
  registry_name = digitalocean_container_registry.main.name
}
