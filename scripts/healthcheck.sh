
#!/bin/sh

# Health check script for Audityzer

set -e

# Default values
PORT=${PORT:-5000}
HEALTH_ENDPOINT="http://localhost:$PORT/health"

# Function to check if service is healthy
check_health() {
    if command -v curl >/dev/null 2>&1; then
        curl -f -s "$HEALTH_ENDPOINT" >/dev/null
    elif command -v wget >/dev/null 2>&1; then
        wget -q -O /dev/null "$HEALTH_ENDPOINT"
    else
        # Fallback: check if port is listening
        nc -z localhost "$PORT"
    fi
}

# Perform health check
if check_health; then
    echo "✅ Audityzer is healthy"
    exit 0
else
    echo "❌ Audityzer health check failed"
    exit 1
fi
