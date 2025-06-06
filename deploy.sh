
#!/bin/bash
# Automated deployment script for Audityzer
# Usage: ./deploy.sh [environment] [build_number]

set -e

ENVIRONMENT=${1:-staging}
BUILD_NUMBER=${2:-$(date +%Y%m%d%H%M%S)}

echo "🚀 Starting Audityzer deployment to $ENVIRONMENT..."
echo "📦 Build Number: $BUILD_NUMBER"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Environment validation
validate_environment() {
    log "Validating environment configuration..."
    
    required_vars=("DB_HOST" "DB_PORT" "REDIS_HOST" "SLACK_WEBHOOK")
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            error "$var environment variable not set"
            exit 1
        fi
    done
    
    if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
        error "Invalid environment: $ENVIRONMENT. Must be development, staging, or production"
        exit 1
    fi
    
    log "✅ Environment validation passed"
}

# Pre-deployment health checks
health_check() {
    log "Performing pre-deployment health checks..."
    
    # Database connectivity
    if ! timeout 10 pg_isready -h $DB_HOST -p $DB_PORT -q; then
        error "Database connection failed"
        exit 1
    fi
    log "✅ Database connectivity verified"
    
    # Redis connectivity
    if ! timeout 10 redis-cli -h $REDIS_HOST ping > /dev/null 2>&1; then
        error "Redis connection failed"
        exit 1
    fi
    log "✅ Redis connectivity verified"
    
    # Docker daemon
    if ! docker info > /dev/null 2>&1; then
        error "Docker daemon not running"
        exit 1
    fi
    log "✅ Docker daemon verified"
    
    # Kubernetes cluster
    if [[ "$ENVIRONMENT" == "production" ]] && ! kubectl cluster-info > /dev/null 2>&1; then
        error "Kubernetes cluster not accessible"
        exit 1
    fi
    log "✅ Kubernetes cluster verified"
}

# Build application
build_application() {
    log "Building application..."
    
    # Install dependencies
    npm ci --production=false
    
    # Run tests
    log "Running test suite..."
    npm run test:ci
    
    # Security audit
    log "Running security audit..."
    npm audit --audit-level=high
    
    # Build application
    log "Building application bundle..."
    npm run build
    
    # Build Docker image
    log "Building Docker image..."
    docker build -t audityzer:$BUILD_NUMBER .
    docker tag audityzer:$BUILD_NUMBER audityzer:latest
    
    log "✅ Application build completed"
}

# Deploy to staging
deploy_staging() {
    log "Deploying to staging environment..."
    
    # Update staging deployment
    kubectl set image deployment/audityzer-staging audityzer=audityzer:$BUILD_NUMBER
    
    # Wait for rollout
    kubectl rollout status deployment/audityzer-staging --timeout=300s
    
    # Run smoke tests
    log "Running smoke tests..."
    npm run test:smoke -- --env=staging
    
    log "✅ Staging deployment completed"
}

# Deploy to production
deploy_production() {
    log "Deploying to production environment..."
    
    # Create backup of current deployment
    kubectl get deployment audityzer-production -o yaml > backup-$(date +%Y%m%d%H%M%S).yaml
    
    # Blue-green deployment
    log "Starting blue-green deployment..."
    
    # Deploy to green environment
    kubectl set image deployment/audityzer-green audityzer=audityzer:$BUILD_NUMBER
    kubectl rollout status deployment/audityzer-green --timeout=300s
    
    # Health check on green environment
    log "Performing health checks on green environment..."
    sleep 30
    
    GREEN_POD=$(kubectl get pods -l app=audityzer,version=green -o jsonpath='{.items[0].metadata.name}')
    if ! kubectl exec $GREEN_POD -- curl -f http://localhost:3000/health; then
        error "Health check failed on green environment"
        exit 1
    fi
    
    # Switch traffic to green
    log "Switching traffic to green environment..."
    kubectl patch service audityzer -p '{"spec":{"selector":{"version":"green"}}}'
    
    # Wait and verify
    sleep 60
    
    # Final health check
    if ! curl -f https://audityzer.com/health; then
        error "Production health check failed, rolling back..."
        rollback_production
        exit 1
    fi
    
    # Clean up blue environment
    kubectl scale deployment audityzer-blue --replicas=0
    
    log "✅ Production deployment completed"
}

# Rollback function
rollback_production() {
    warn "Initiating production rollback..."
    
    # Switch traffic back to blue
    kubectl patch service audityzer -p '{"spec":{"selector":{"version":"blue"}}}'
    
    # Scale up blue environment
    kubectl scale deployment audityzer-blue --replicas=3
    
    # Wait for blue to be ready
    kubectl rollout status deployment/audityzer-blue --timeout=300s
    
    log "✅ Rollback completed"
}

# Post-deployment tasks
post_deployment() {
    log "Running post-deployment tasks..."
    
    # Database migrations
    if [[ "$ENVIRONMENT" == "production" ]]; then
        log "Running database migrations..."
        kubectl exec deployment/audityzer-production -- npm run migrate
    fi
    
    # Clear caches
    log "Clearing application caches..."
    redis-cli -h $REDIS_HOST flushdb
    
    # Update monitoring
    log "Updating monitoring configuration..."
    curl -X POST "$MONITORING_WEBHOOK" -d "{\"version\":\"$BUILD_NUMBER\",\"environment\":\"$ENVIRONMENT\"}"
    
    log "✅ Post-deployment tasks completed"
}

# Send notifications
send_notifications() {
    local status=$1
    local message
    
    if [[ "$status" == "success" ]]; then
        message="✅ Audityzer successfully deployed to $ENVIRONMENT (Build: $BUILD_NUMBER)"
    else
        message="❌ Audityzer deployment to $ENVIRONMENT failed (Build: $BUILD_NUMBER)"
    fi
    
    # Slack notification
    curl -X POST "$SLACK_WEBHOOK" \
        -H 'Content-type: application/json' \
        --data "{\"text\":\"$message\"}"
    
    # Email notification (if configured)
    if [[ -n "$EMAIL_WEBHOOK" ]]; then
        curl -X POST "$EMAIL_WEBHOOK" \
            -H 'Content-type: application/json' \
            --data "{\"subject\":\"Audityzer Deployment\",\"message\":\"$message\"}"
    fi
}

# Cleanup function
cleanup() {
    log "Performing cleanup..."
    
    # Remove old Docker images
    docker image prune -f
    
    # Clean up old backups (keep last 5)
    ls -t backup-*.yaml | tail -n +6 | xargs -r rm
    
    log "✅ Cleanup completed"
}

# Main deployment function
main() {
    local start_time=$(date +%s)
    
    trap 'error "Deployment interrupted"; send_notifications "failure"; exit 1' INT TERM
    
    validate_environment
    health_check
    build_application
    
    case $ENVIRONMENT in
        "development"|"staging")
            deploy_staging
            ;;
        "production")
            deploy_staging
            read -p "Staging tests passed. Deploy to production? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                deploy_production
            else
                log "Production deployment cancelled by user"
                exit 0
            fi
            ;;
    esac
    
    post_deployment
    cleanup
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log "🎉 Deployment completed successfully in ${duration}s"
    send_notifications "success"
}

# Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
