
#!/bin/bash

set -e

echo "🔧 Setting up Audityzer monitoring stack..."

# Create monitoring directories
mkdir -p monitoring/grafana/dashboards
mkdir -p monitoring/rules
mkdir -p logs

# Set permissions
chmod +x monitoring/setup-monitoring.sh

echo "📊 Starting monitoring services..."
docker-compose -f monitoring/docker-compose.monitoring.yml up -d

echo "⏳ Waiting for services to start..."
sleep 30

echo "🔍 Checking service status..."
docker-compose -f monitoring/docker-compose.monitoring.yml ps

echo "✅ Monitoring stack setup complete!"
echo ""
echo "📊 Access URLs:"
echo "  Grafana:      http://localhost:3001 (admin/audityzer2025)"
echo "  Prometheus:   http://localhost:9090"
echo "  AlertManager: http://localhost:9093"
echo "  Node Exporter: http://localhost:9100"
echo "  cAdvisor:     http://localhost:8080"
echo ""
echo "📈 Import Grafana dashboards:"
echo "  - Node Exporter Full: 1860"
echo "  - Docker Container & Host Metrics: 179"
echo "  - Prometheus Stats: 2"
echo ""
echo "🚨 Configure alerts in AlertManager at http://localhost:9093"
