
# Deployment Guide

This guide covers deploying Audityzer in various environments, from development to production.

## Overview

Audityzer supports multiple deployment methods:

- **Local Development**: Direct Node.js execution
- **Docker**: Containerized deployment
- **Docker Compose**: Multi-service orchestration
- **Kubernetes**: Production-ready container orchestration
- **Cloud Platforms**: AWS, GCP, Azure deployment

## Prerequisites

### System Requirements

- **CPU**: 2+ cores recommended
- **Memory**: 4GB+ RAM recommended
- **Storage**: 10GB+ available space
- **Network**: Internet access for dependency downloads

### Software Requirements

- Node.js 18+ (for local deployment)
- Docker 20+ (for containerized deployment)
- Kubernetes 1.20+ (for K8s deployment)

## Local Development Deployment

### Quick Start

```bash
# Clone and setup
git clone https://github.com/romanchaa997/audityzer.git
cd audityzer
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Configuration

Create `.env` file:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Features
ENABLE_MCP=true
ENABLE_AI=true
ENABLE_REPORTING=true

# Security
API_KEY_REQUIRED=false
CORS_ORIGIN=*
```

## Docker Deployment

### Single Container

```bash
# Build the image
docker build -t audityzer:latest .

# Run the container
docker run -d \
  --name audityzer \
  -p 5000:5000 \
  -e NODE_ENV=production \
  audityzer:latest
```

### Health Checks

The Docker image includes health checks:

```bash
# Check container health
docker ps
# Look for "healthy" status

# Manual health check
docker exec audityzer ./scripts/healthcheck.sh
```

### Volume Mounts

For persistent data:

```bash
docker run -d \
  --name audityzer \
  -p 5000:5000 \
  -v $(pwd)/reports:/app/reports \
  -v $(pwd)/config:/app/config:ro \
  audityzer:latest
```

## Docker Compose Deployment

### Full Stack

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services Included

- **audityzer**: Main application
- **mcp-server**: AI integration service
- **redis**: Caching and session storage
- **nginx**: Reverse proxy and load balancer

### Configuration

Edit `docker-compose.yml` for customization:

```yaml
services:
  audityzer:
    environment:
      - NODE_ENV=production
      - PORT=5000
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./config:/app/config:ro
      - ./reports:/app/reports
```

### Scaling

```bash
# Scale the main application
docker-compose up -d --scale audityzer=3

# Scale with load balancer
docker-compose up -d --scale audityzer=3 nginx
```

## Kubernetes Deployment

### Prerequisites

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Apply configuration
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/pvc.yaml
```

### Deploy Application

```bash
# Deploy services
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Setup ingress (optional)
kubectl apply -f k8s/ingress.yaml
```

### Verify Deployment

```bash
# Check pods
kubectl get pods -n audityzer

# Check services
kubectl get services -n audityzer

# View logs
kubectl logs -f deployment/audityzer -n audityzer
```

### Scaling

```bash
# Scale deployment
kubectl scale deployment audityzer --replicas=5 -n audityzer

# Horizontal Pod Autoscaler
kubectl autoscale deployment audityzer \
  --cpu-percent=70 \
  --min=2 \
  --max=10 \
  -n audityzer
```

### Updates

```bash
# Rolling update
kubectl set image deployment/audityzer \
  audityzer=audityzer:v1.2.0 \
  -n audityzer

# Check rollout status
kubectl rollout status deployment/audityzer -n audityzer

# Rollback if needed
kubectl rollout undo deployment/audityzer -n audityzer
```

## Cloud Platform Deployment

### AWS ECS

```bash
# Create task definition
aws ecs register-task-definition \
  --cli-input-json file://aws/task-definition.json

# Create service
aws ecs create-service \
  --cluster audityzer-cluster \
  --service-name audityzer \
  --task-definition audityzer:1 \
  --desired-count 2
```

### Google Cloud Run

```bash
# Build and push image
gcloud builds submit --tag gcr.io/PROJECT-ID/audityzer

# Deploy to Cloud Run
gcloud run deploy audityzer \
  --image gcr.io/PROJECT-ID/audityzer \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances

```bash
# Create container group
az container create \
  --resource-group audityzer-rg \
  --name audityzer \
  --image audityzer:latest \
  --dns-name-label audityzer \
  --ports 5000
```

## Monitoring and Observability

### Health Checks

Built-in health endpoints:

- `GET /health` - Application health
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

### Logging

Configure structured logging:

```bash
# Environment variables
LOG_LEVEL=info
LOG_FORMAT=json
LOG_OUTPUT=stdout

# Log aggregation
# Use tools like Fluentd, Logstash, or cloud logging
```

### Metrics

Prometheus metrics available at `/metrics`:

- Request duration
- Request count
- Error rates
- System metrics

### Monitoring Script

Use the included monitoring script:

```bash
# Start monitoring
./scripts/monitor.sh

# Run as daemon
./scripts/monitor.sh --daemon

# Check status
ps aux | grep monitor
```

## Security Considerations

### Container Security

1. **Use non-root user** (already configured)
2. **Scan images** for vulnerabilities
3. **Keep base images updated**
4. **Limit container capabilities**

### Network Security

1. **Use HTTPS** in production
2. **Configure firewalls** appropriately
3. **Implement rate limiting**
4. **Use secure headers**

### Secrets Management

```bash
# Kubernetes secrets
kubectl create secret generic audityzer-secrets \
  --from-literal=api-key=your-api-key \
  -n audityzer

# Docker secrets
echo "your-api-key" | docker secret create api-key -
```

## Performance Optimization

### Resource Allocation

```yaml
# Kubernetes resource limits
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Caching

Configure Redis for caching:

```bash
# Redis configuration
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
ENABLE_CACHE=true
```

### Load Balancing

Use nginx for load balancing:

```nginx
upstream audityzer {
    server audityzer-1:5000;
    server audityzer-2:5000;
    server audityzer-3:5000;
}

server {
    listen 80;
    location / {
        proxy_pass http://audityzer;
    }
}
```

## Backup and Recovery

### Data Backup

```bash
# Backup reports directory
tar -czf reports-backup-$(date +%Y%m%d).tar.gz reports/

# Database backup (if using database)
pg_dump audityzer > audityzer-backup-$(date +%Y%m%d).sql
```

### Disaster Recovery

1. **Regular backups** of data and configuration
2. **Infrastructure as Code** for quick rebuilding
3. **Multi-region deployment** for high availability
4. **Automated failover** procedures

## Troubleshooting

### Common Issues

#### Container won't start
```bash
# Check logs
docker logs audityzer

# Check health
docker exec audityzer ./scripts/healthcheck.sh
```

#### High memory usage
```bash
# Monitor resources
docker stats audityzer

# Check for memory leaks
kubectl top pods -n audityzer
```

#### Network connectivity issues
```bash
# Test connectivity
kubectl exec -it pod-name -- curl http://service-name:port/health

# Check DNS resolution
kubectl exec -it pod-name -- nslookup service-name
```

### Performance Issues

1. **Check resource limits** and adjust if needed
2. **Monitor application metrics** for bottlenecks
3. **Scale horizontally** if CPU/memory bound
4. **Optimize database queries** if applicable

### Getting Help

1. Check application logs first
2. Review monitoring dashboards
3. Test health endpoints
4. Consult the troubleshooting section
5. Open GitHub issue with deployment details

## Maintenance

### Regular Tasks

1. **Update dependencies** regularly
2. **Monitor security advisories**
3. **Review and rotate secrets**
4. **Clean up old logs and reports**
5. **Test backup and recovery procedures**

### Automated Maintenance

Set up automated tasks:

```bash
# Cron job for cleanup
0 2 * * * /app/scripts/cleanup.sh

# Log rotation
/app/logs/*.log {
    daily
    rotate 7
    compress
    missingok
}
```

This deployment guide provides comprehensive instructions for deploying Audityzer in various environments. Choose the deployment method that best fits your infrastructure and requirements.
