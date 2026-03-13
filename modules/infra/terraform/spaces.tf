# ============================================================================
# AuditorSEC / DaBROIoTEXs — Spaces (S3-compatible Object Storage)
# Об'єктне сховище: артефакти, IoT-дані, бекапи
# ============================================================================

# ---------------------------------------------------------------------------
# 1. Artifacts Bucket / Бакет артефактів
# ---------------------------------------------------------------------------
# Audit reports, contract ABIs, compiled bytecode, frontend assets.
# CDN enabled for fast delivery worldwide.

resource "digitalocean_spaces_bucket" "artifacts" {
  name   = "${local.prefix}-artifacts"
  region = var.region
  acl    = "private"

  force_destroy = var.spaces_force_destroy

  # CORS для веб-доступу (SPA, API downloads)
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = [
      "https://${var.domain}",
      "https://app.${var.domain}",
      "https://api.${var.domain}",
    ]
    max_age_seconds = 3600
  }

  lifecycle {
    prevent_destroy = true
  }
}

# CDN для бакета артефактів — швидка доставка статичних файлів
resource "digitalocean_cdn" "artifacts" {
  origin = digitalocean_spaces_bucket.artifacts.bucket_domain_name
  ttl    = 3600

  # Custom subdomain (optional, requires certificate)
  # custom_domain = "cdn.${var.domain}"
}

# ---------------------------------------------------------------------------
# 2. IoT Data Bucket / Бакет IoT-даних
# ---------------------------------------------------------------------------
# Raw telemetry from ESP32 sensors, MQTT payloads, time-series exports.
# Дані з датчиків DHT22, BME280 — температура, вологість, тиск.

resource "digitalocean_spaces_bucket" "iot_data" {
  name   = "${local.prefix}-iot-data"
  region = var.region
  acl    = "private"

  force_destroy = var.spaces_force_destroy

  lifecycle {
    prevent_destroy = true
  }
}

# ---------------------------------------------------------------------------
# 3. Backups Bucket / Бакет резервних копій
# ---------------------------------------------------------------------------
# Database dumps, K8s etcd snapshots, configuration backups.
# Резервні копії бази даних та конфігурацій.

resource "digitalocean_spaces_bucket" "backups" {
  name   = "${local.prefix}-backups"
  region = var.region
  acl    = "private"

  force_destroy = var.spaces_force_destroy

  lifecycle {
    prevent_destroy = true
  }
}
