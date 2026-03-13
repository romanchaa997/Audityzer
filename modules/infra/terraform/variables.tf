# ============================================================================
# AuditorSEC / DaBROIoTEXs — Input Variables
# Вхідні змінні для всієї інфраструктури
# ============================================================================

# ---------------------------------------------------------------------------
# Credentials / Облікові дані
# ---------------------------------------------------------------------------

variable "do_token" {
  description = "DigitalOcean API token (PAT). Отримати: https://cloud.digitalocean.com/account/api/tokens"
  type        = string
  sensitive   = true
}

variable "spaces_access_id" {
  description = "Spaces access key ID for S3-compatible API. Отримати: API → Spaces Keys"
  type        = string
  sensitive   = true
}

variable "spaces_secret_key" {
  description = "Spaces secret key. Зберігайте у безпечному місці!"
  type        = string
  sensitive   = true
}

# ---------------------------------------------------------------------------
# Region / Регіон
# ---------------------------------------------------------------------------

variable "region" {
  description = "DigitalOcean region. FRA1 = Frankfurt — найближчий до України"
  type        = string
  default     = "fra1"

  validation {
    condition     = contains(["fra1", "ams3", "lon1"], var.region)
    error_message = "Region must be fra1 (Frankfurt), ams3 (Amsterdam), or lon1 (London)."
  }
}

# ---------------------------------------------------------------------------
# Domain / Домен
# ---------------------------------------------------------------------------

variable "domain" {
  description = "Primary domain for the platform"
  type        = string
  default     = "neuralinfra.digital"
}

# ---------------------------------------------------------------------------
# Environment / Середовище
# ---------------------------------------------------------------------------

variable "environment" {
  description = "Deployment environment: production, staging, development"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be production, staging, or development."
  }
}

# ---------------------------------------------------------------------------
# Kubernetes / Кубернетіс
# ---------------------------------------------------------------------------

variable "k8s_version" {
  description = "Kubernetes version prefix (e.g. '1.31'). Latest patch auto-selected via data source."
  type        = string
  default     = "1.31"
}

variable "k8s_node_size" {
  description = "Droplet size for K8s worker nodes"
  type        = string
  default     = "s-2vcpu-4gb"
}

variable "k8s_node_count" {
  description = "Initial number of worker nodes"
  type        = number
  default     = 2

  validation {
    condition     = var.k8s_node_count >= 1 && var.k8s_node_count <= 10
    error_message = "Node count must be between 1 and 10."
  }
}

variable "k8s_min_nodes" {
  description = "Minimum nodes for auto-scaling"
  type        = number
  default     = 2
}

variable "k8s_max_nodes" {
  description = "Maximum nodes for auto-scaling"
  type        = number
  default     = 5
}

variable "k8s_auto_upgrade" {
  description = "Enable automatic K8s minor version upgrades"
  type        = bool
  default     = true
}

variable "k8s_surge_upgrade" {
  description = "Enable surge upgrades (extra node during upgrade, no downtime)"
  type        = bool
  default     = true
}

# ---------------------------------------------------------------------------
# Database / База даних
# ---------------------------------------------------------------------------

variable "db_size" {
  description = "Managed PostgreSQL Droplet size"
  type        = string
  default     = "db-s-1vcpu-1gb"
}

variable "db_engine_version" {
  description = "PostgreSQL major version"
  type        = string
  default     = "16"
}

variable "db_name" {
  description = "Default database name"
  type        = string
  default     = "auditorsec"
}

variable "db_node_count" {
  description = "Number of database nodes (1 = standalone, 2+ = HA)"
  type        = number
  default     = 1
}

variable "db_pool_size" {
  description = "Connection pool size for pgBouncer"
  type        = number
  default     = 25
}

variable "db_pool_mode" {
  description = "Connection pool mode: transaction, session, statement"
  type        = string
  default     = "transaction"

  validation {
    condition     = contains(["transaction", "session", "statement"], var.db_pool_mode)
    error_message = "Pool mode must be transaction, session, or statement."
  }
}

# ---------------------------------------------------------------------------
# Spaces / Об'єктне сховище
# ---------------------------------------------------------------------------

variable "spaces_force_destroy" {
  description = "Allow Terraform to destroy non-empty Spaces buckets. НЕБЕЗПЕЧНО у продакшені!"
  type        = bool
  default     = false
}

# ---------------------------------------------------------------------------
# Monitoring Droplet / Дроплет моніторингу
# ---------------------------------------------------------------------------

variable "enable_monitoring_droplet" {
  description = "Deploy a standalone monitoring Droplet (Grafana + Prometheus). Set false if running in K8s."
  type        = bool
  default     = false
}

variable "monitoring_droplet_size" {
  description = "Droplet size for the monitoring server"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "ssh_key_fingerprints" {
  description = "List of SSH key fingerprints for Droplet access"
  type        = list(string)
  default     = []
}

# ---------------------------------------------------------------------------
# DNS & LoadBalancer / DNS та балансувальник
# ---------------------------------------------------------------------------

variable "lb_ip" {
  description = "External IP of the K8s LoadBalancer (nginx-ingress). Set after first deploy."
  type        = string
  default     = "127.0.0.1" # Placeholder — update after nginx-ingress creates the LB
}

# ---------------------------------------------------------------------------
# Tags / Теги
# ---------------------------------------------------------------------------

variable "common_tags" {
  description = "Common tags applied to all resources"
  type        = map(string)
  default = {
    project     = "auditorsec"
    managed_by  = "terraform"
    org         = "dabroiotexs"
  }
}
