#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing system dependencies..."
    
    # Update package list
    sudo apt-get update
    
    # Install required packages
    sudo apt-get install -y \
        docker.io \
        docker-compose \
        nodejs \
        npm \
        python3 \
        python3-pip \
        nginx \
        certbot \
        python3-certbot-nginx \
        git \
        curl \
        wget \
        unzip
    
    # Install Terraform
    if ! command_exists terraform; then
        print_status "Installing Terraform..."
        wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
        echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
        sudo apt-get update && sudo apt-get install -y terraform
    fi
    
    # Install AWS CLI
    if ! command_exists aws; then
        print_status "Installing AWS CLI..."
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
        rm -rf aws awscliv2.zip
    fi
    
    print_success "Dependencies installed successfully"
}

# Function to setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    # Create main environment file if it doesn't exist
    if [ ! -f .env ]; then
        print_status "Creating main environment file..."
        cat > .env << EOF
# Audityzer Environment Configuration
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://audityzer:password@localhost:5432/audityzer
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)

# External APIs
INFURA_PROJECT_ID=your_infura_project_id
ALCHEMY_API_KEY=your_alchemy_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Monitoring
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3001

# Application URLs
BASE_URL=https://audityzer.com
API_URL=https://api.audityzer.com
FRONTEND_URL=https://app.audityzer.com
EOF
        print_warning "Please update .env with your actual credentials"
    fi
    
    print_success "Environment setup complete"
}

# Function to setup production infrastructure
setup_production() {
    print_status "Setting up production infrastructure..."
    
    cd infrastructure/terraform
    
    # Initialize Terraform
    terraform init
    
    # Create terraform.tfvars if it doesn't exist
    if [ ! -f terraform.tfvars ]; then
        cat > terraform.tfvars << EOF
aws_region = "us-east-1"
environment = "production"
domain_name = "audityzer.com"
cloudflare_api_token = "your_cloudflare_token"
EOF
        print_warning "Please update terraform.tfvars with your actual values"
    fi
    
    # Plan and apply (commented out for safety)
    # terraform plan
    # terraform apply -auto-approve
    
    cd ../..
    print_success "Production infrastructure configured"
}

# Function to setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring stack..."
    
    # Run monitoring setup script
    ./monitoring/setup-monitoring.sh
    
    print_success "Monitoring stack deployed"
}

# Function to setup community platform
setup_community() {
    print_status "Setting up community platform..."
    
    # Run community setup script
    ./community/setup-community.sh
    
    print_success "Community platform deployed"
}

# Function to setup marketing automation
setup_marketing() {
    print_status "Setting up marketing automation..."
    
    # Run marketing setup script
    ./marketing/setup-marketing.sh
    
    print_success "Marketing automation deployed"
}

# Function to build and deploy application
deploy_application() {
    print_status "Building and deploying application..."
    
    # Install application dependencies
    npm install
    
    # Build the application
    npm run build
    
    # Run database migrations (if applicable)
    # npm run migrate
    
    # Start the application with PM2
    if command_exists pm2; then
        pm2 start ecosystem.config.js
    else
        npm install -g pm2
        pm2 start ecosystem.config.js
    fi
    
    print_success "Application deployed"
}

# Function to setup SSL certificates
setup_ssl() {
    print_status "Setting up SSL certificates..."
    
    # This would typically be done with Let's Encrypt
    print_warning "SSL setup requires domain configuration. Please run:"
    print_warning "sudo certbot --nginx -d audityzer.com -d api.audityzer.com"
    
    print_success "SSL configuration instructions provided"
}

# Function to run health checks
run_health_checks() {
    print_status "Running health checks..."
    
    # Check if services are running
    services=("docker" "nginx" "postgresql" "redis")
    
    for service in "${services[@]}"; do
        if systemctl is-active --quiet "$service"; then
            print_success "$service is running"
        else
            print_warning "$service is not running"
        fi
    done
    
    # Check application health
    if curl -f http://localhost:3000/health >/dev/null 2>&1; then
        print_success "Application health check passed"
    else
        print_warning "Application health check failed"
    fi
    
    # Check monitoring services
    if curl -f http://localhost:9090 >/dev/null 2>&1; then
        print_success "Prometheus is accessible"
    else
        print_warning "Prometheus is not accessible"
    fi
    
    if curl -f http://localhost:3001 >/dev/null 2>&1; then
        print_success "Grafana is accessible"
    else
        print_warning "Grafana is not accessible"
    fi
    
    print_success "Health checks completed"
}

# Function to display deployment summary
show_summary() {
    print_success "🎉 Audityzer deployment completed!"
    echo ""
    echo "📊 Access URLs:"
    echo "  Application:      http://localhost:3000"
    echo "  API:              http://localhost:3000/api"
    echo "  Health Check:     http://localhost:3000/health"
    echo "  Metrics:          http://localhost:3000/metrics"
    echo ""
    echo "📈 Monitoring:"
    echo "  Prometheus:       http://localhost:9090"
    echo "  Grafana:          http://localhost:3001 (admin/audityzer2025)"
    echo "  AlertManager:     http://localhost:9093"
    echo ""
    echo "🏘️ Community:"
    echo "  Forum:            http://localhost:8080"
    echo "  Discord Bot:      Configure in community/.env"
    echo "  Telegram Bot:     Configure in community/.env"
    echo ""
    echo "📢 Marketing:"
    echo "  Analytics:        http://localhost:3002"
    echo "  Email Campaigns:  Configure in marketing/.env"
    echo "  Social Media:     Configure in marketing/.env"
    echo ""
    echo "🔧 Configuration Files:"
    echo "  Main:             .env"
    echo "  Infrastructure:   infrastructure/terraform/terraform.tfvars"
    echo "  Community:        community/.env"
    echo "  Marketing:        marketing/.env"
    echo ""
    echo "📚 Documentation:"
    echo "  Main README:      README.md"
    echo "  Deployment:       DEPLOYMENT.md"
    echo "  Roadmap:          ROADMAP.md"
    echo "  Next Steps:       NEXT_STEPS.md"
    echo ""
    echo "🚀 Next Steps:"
    echo "  1. Update all .env files with your credentials"
    echo "  2. Configure domain names and SSL certificates"
    echo "  3. Set up external service integrations"
    echo "  4. Run production deployment with Terraform"
    echo "  5. Configure monitoring alerts"
    echo "  6. Launch marketing campaigns"
    echo ""
    print_success "Happy auditing! 🛡️"
}

# Main deployment function
main() {
    echo "🚀 Starting Audityzer Complete Deployment"
    echo "========================================"
    
    # Check if running as root
    if [ "$EUID" -eq 0 ]; then
        print_error "Please don't run this script as root"
        exit 1
    fi
    
    # Parse command line arguments
    SKIP_DEPS=false
    SKIP_INFRA=false
    QUICK_DEPLOY=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-deps)
                SKIP_DEPS=true
                shift
                ;;
            --skip-infra)
                SKIP_INFRA=true
                shift
                ;;
            --quick)
                QUICK_DEPLOY=true
                shift
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --skip-deps    Skip dependency installation"
                echo "  --skip-infra   Skip infrastructure setup"
                echo "  --quick        Quick deployment (skip optional components)"
                echo "  -h, --help     Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Install dependencies
    if [ "$SKIP_DEPS" = false ]; then
        install_dependencies
    fi
    
    # Setup environment
    setup_environment
    
    # Setup production infrastructure
    if [ "$SKIP_INFRA" = false ]; then
        setup_production
    fi
    
    # Deploy core application
    deploy_application
    
    # Setup monitoring
    setup_monitoring
    
    # Setup community platform (unless quick deploy)
    if [ "$QUICK_DEPLOY" = false ]; then
        setup_community
    fi
    
    # Setup marketing automation (unless quick deploy)
    if [ "$QUICK_DEPLOY" = false ]; then
        setup_marketing
    fi
    
    # Setup SSL certificates
    setup_ssl
    
    # Run health checks
    run_health_checks
    
    # Show deployment summary
    show_summary
}

# Run main function
main "$@"
