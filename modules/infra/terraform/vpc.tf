# ============================================================================
# AuditorSEC / DaBROIoTEXs — VPC (Virtual Private Cloud)
# Віртуальна приватна мережа — ізоляція всіх ресурсів
# ============================================================================

resource "digitalocean_vpc" "main" {
  name        = "${local.prefix}-vpc"
  region      = var.region
  ip_range    = local.vpc_cidr
  description = "AuditorSEC private network — K8s, DB, monitoring (${var.region})"
}
