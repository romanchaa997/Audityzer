# ============================================================================
# AuditorSEC / DaBROIoTEXs — Terraform Version Constraints
# Версії Terraform та провайдерів
# ============================================================================

terraform {
  required_version = ">= 1.6.0, < 2.0.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.40"
    }
  }
}
