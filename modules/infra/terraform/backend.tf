# ============================================================================
# AuditorSEC / DaBROIoTEXs — Remote State Backend
# Віддалене збереження стану у DigitalOcean Spaces (S3-compatible)
# ============================================================================
#
# ВАЖЛИВО / IMPORTANT:
# Before first `terraform init`, create the state bucket manually:
#
#   export SPACES_ACCESS_KEY_ID="your-key"
#   export SPACES_SECRET_ACCESS_KEY="your-secret"
#   export AWS_ACCESS_KEY_ID="$SPACES_ACCESS_KEY_ID"
#   export AWS_SECRET_ACCESS_KEY="$SPACES_SECRET_ACCESS_KEY"
#
#   aws s3api create-bucket \
#     --bucket auditorsec-tfstate \
#     --endpoint-url https://fra1.digitaloceanspaces.com \
#     --region fra1
#
# Then run:
#   terraform init \
#     -backend-config="access_key=$SPACES_ACCESS_KEY_ID" \
#     -backend-config="secret_key=$SPACES_SECRET_ACCESS_KEY"
#
# ============================================================================

terraform {
  backend "s3" {
    # DigitalOcean Spaces endpoint (S3-compatible)
    endpoints = {
      s3 = "https://fra1.digitaloceanspaces.com"
    }

    bucket = "auditorsec-tfstate"
    key    = "infra/terraform.tfstate"
    region = "us-east-1" # Required by S3 backend but ignored by Spaces

    # Disable AWS-specific features not supported by Spaces
    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_s3_checksum            = true
  }
}
