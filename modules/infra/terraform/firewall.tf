# ============================================================================
# AuditorSEC / DaBROIoTEXs — Firewall Rules
# Правила мережевого екрану для захисту інфраструктури
# ============================================================================
#
# Note: DOKS nodes are managed by DigitalOcean and have their own firewall.
# These rules apply to the optional monitoring Droplet and any future Droplets.
# K8s Network Policies handle pod-to-pod traffic inside the cluster.

# ---------------------------------------------------------------------------
# Monitoring Droplet Firewall / Фаєрвол дроплета моніторингу
# ---------------------------------------------------------------------------

resource "digitalocean_firewall" "monitoring" {
  count = var.enable_monitoring_droplet ? 1 : 0

  name = "${local.prefix}-fw-monitoring"

  droplet_ids = [digitalocean_droplet.monitoring[0].id]

  tags = local.tags

  # --- Inbound / Вхідний трафік ---

  # SSH (restricted — only from known IPs in production)
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Grafana Web UI
  inbound_rule {
    protocol         = "tcp"
    port_range       = "3000"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Prometheus (internal only — from VPC)
  inbound_rule {
    protocol           = "tcp"
    port_range         = "9090"
    source_addresses   = [local.vpc_cidr]
  }

  # Node Exporter (internal only — from VPC)
  inbound_rule {
    protocol           = "tcp"
    port_range         = "9100"
    source_addresses   = [local.vpc_cidr]
  }

  # ICMP (ping) — for health checks
  inbound_rule {
    protocol         = "icmp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # --- Outbound / Вихідний трафік ---

  # Allow all outbound TCP (apt, API calls, scraping)
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allow all outbound UDP (DNS, NTP)
  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  # ICMP outbound
  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

# ---------------------------------------------------------------------------
# Monitoring Droplet / Дроплет моніторингу (Grafana + Prometheus)
# ---------------------------------------------------------------------------
# Optional standalone monitoring server. Set enable_monitoring_droplet = true.
# Рекомендується для staging; у production — моніторинг в K8s (kube-prometheus-stack).

resource "digitalocean_droplet" "monitoring" {
  count = var.enable_monitoring_droplet ? 1 : 0

  name     = "${local.prefix}-monitoring"
  image    = "ubuntu-24-04-x64"
  size     = var.monitoring_droplet_size
  region   = var.region
  vpc_uuid = digitalocean_vpc.main.id

  ssh_keys = var.ssh_key_fingerprints

  tags = concat(local.tags, ["monitoring"])

  # Cloud-init: install Docker, Grafana, Prometheus
  user_data = <<-CLOUDINIT
    #!/bin/bash
    set -euo pipefail

    # Update system / Оновлення системи
    apt-get update && apt-get upgrade -y

    # Install Docker / Встановлення Docker
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker && systemctl start docker

    # Create monitoring network
    docker network create monitoring || true

    # Run Prometheus
    docker run -d \
      --name prometheus \
      --network monitoring \
      --restart unless-stopped \
      -p 9090:9090 \
      -v /opt/prometheus:/etc/prometheus \
      prom/prometheus:latest

    # Run Grafana
    docker run -d \
      --name grafana \
      --network monitoring \
      --restart unless-stopped \
      -p 3000:3000 \
      -e GF_SECURITY_ADMIN_PASSWORD=changeme \
      -v grafana-data:/var/lib/grafana \
      grafana/grafana:latest

    # Run Node Exporter
    docker run -d \
      --name node-exporter \
      --network monitoring \
      --restart unless-stopped \
      -p 9100:9100 \
      --pid=host \
      -v /:/host:ro \
      prom/node-exporter:latest \
      --path.rootfs=/host
  CLOUDINIT
}
