# ============================================================================
# AuditorSEC / DaBROIoTEXs — DNS Configuration
# Домен neuralinfra.digital та DNS-записи для всіх сервісів
# ============================================================================
#
# ВАЖЛИВО / IMPORTANT:
# After `terraform apply`, update your domain registrar's nameservers to:
#   ns1.digitalocean.com
#   ns2.digitalocean.com
#   ns3.digitalocean.com

resource "digitalocean_domain" "main" {
  name = var.domain
}

# ---------------------------------------------------------------------------
# A Records / А-записи для піддоменів
# ---------------------------------------------------------------------------
# All subdomains point to the K8s LoadBalancer IP.
# nginx-ingress inside the cluster routes traffic to the correct service.
#
# Піддомени:
#   api.neuralinfra.digital     — REST / GraphQL API сервер
#   app.neuralinfra.digital     — Frontend SPA (Vite + React)
#   grafana.neuralinfra.digital — Моніторинг (Grafana)
#   mqtt.neuralinfra.digital    — MQTT брокер для IoT-пристроїв
#   bot.neuralinfra.digital     — Telegram-бот вебхуки

locals {
  # Subdomains that point to the K8s LoadBalancer
  subdomains = ["api", "app", "grafana", "mqtt", "bot"]
}

resource "digitalocean_record" "subdomains" {
  for_each = toset(local.subdomains)

  domain = digitalocean_domain.main.id
  type   = "A"
  name   = each.key
  # Placeholder — replace with actual LoadBalancer IP after nginx-ingress deploys.
  # Use `kubectl get svc -n ingress-nginx` to find the external IP.
  # Or use a data source / variable to set this dynamically.
  value  = var.lb_ip
  ttl    = 300
}

# ---------------------------------------------------------------------------
# Root domain → app / Кореневий домен → додаток
# ---------------------------------------------------------------------------

resource "digitalocean_record" "root" {
  domain = digitalocean_domain.main.id
  type   = "A"
  name   = "@"
  value  = var.lb_ip
  ttl    = 300
}

# ---------------------------------------------------------------------------
# CAA Record / CAA-запис для Let's Encrypt
# ---------------------------------------------------------------------------
# Allow cert-manager (Let's Encrypt) to issue certificates for this domain.

resource "digitalocean_record" "caa_letsencrypt" {
  domain = digitalocean_domain.main.id
  type   = "CAA"
  name   = "@"
  value  = "letsencrypt.org."
  tag    = "issue"
  flags  = 0
  ttl    = 3600
}
