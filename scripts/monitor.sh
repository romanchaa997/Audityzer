
#!/bin/bash

# Monitoring script for Audityzer

set -e

# Configuration
LOG_FILE="/app/logs/monitor.log"
ALERT_EMAIL="${ALERT_EMAIL:-admin@example.com}"
CHECK_INTERVAL="${CHECK_INTERVAL:-60}"
MAX_MEMORY_MB="${MAX_MEMORY_MB:-1024}"
MAX_CPU_PERCENT="${MAX_CPU_PERCENT:-80}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Check if process is running
check_process() {
    if pgrep -f "audityzer" > /dev/null; then
        return 0
    else
        return 1
    fi
}

# Check memory usage
check_memory() {
    local pid=$(pgrep -f "audityzer" | head -1)
    if [ -n "$pid" ]; then
        local memory_kb=$(ps -o rss= -p "$pid" 2>/dev/null || echo "0")
        local memory_mb=$((memory_kb / 1024))
        
        if [ "$memory_mb" -gt "$MAX_MEMORY_MB" ]; then
            log "⚠️  High memory usage: ${memory_mb}MB (limit: ${MAX_MEMORY_MB}MB)"
            return 1
        else
            log "✅ Memory usage: ${memory_mb}MB"
            return 0
        fi
    fi
    return 1
}

# Check CPU usage
check_cpu() {
    local pid=$(pgrep -f "audityzer" | head -1)
    if [ -n "$pid" ]; then
        local cpu_percent=$(ps -o %cpu= -p "$pid" 2>/dev/null | tr -d ' ' || echo "0")
        local cpu_int=${cpu_percent%.*}
        
        if [ "$cpu_int" -gt "$MAX_CPU_PERCENT" ]; then
            log "⚠️  High CPU usage: ${cpu_percent}% (limit: ${MAX_CPU_PERCENT}%)"
            return 1
        else
            log "✅ CPU usage: ${cpu_percent}%"
            return 0
        fi
    fi
    return 1
}

# Check disk space
check_disk() {
    local disk_usage=$(df /app | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ "$disk_usage" -gt 90 ]; then
        log "⚠️  High disk usage: ${disk_usage}%"
        return 1
    elif [ "$disk_usage" -gt 80 ]; then
        log "⚠️  Moderate disk usage: ${disk_usage}%"
        return 0
    else
        log "✅ Disk usage: ${disk_usage}%"
        return 0
    fi
}

# Check application health endpoint
check_health_endpoint() {
    local port="${PORT:-5000}"
    local health_url="http://localhost:$port/health"
    
    if curl -f -s "$health_url" >/dev/null 2>&1; then
        log "✅ Health endpoint responding"
        return 0
    else
        log "❌ Health endpoint not responding"
        return 1
    fi
}

# Send alert (placeholder - implement your preferred alerting method)
send_alert() {
    local message="$1"
    log "🚨 ALERT: $message"
    
    # Example: send email (requires mail command)
    # echo "$message" | mail -s "Audityzer Alert" "$ALERT_EMAIL"
    
    # Example: send to webhook
    # curl -X POST -H "Content-Type: application/json" \
    #      -d "{\"text\":\"$message\"}" \
    #      "$WEBHOOK_URL"
}

# Main monitoring loop
monitor() {
    log "🔍 Starting Audityzer monitoring..."
    
    while true; do
        local issues=0
        
        # Check if process is running
        if ! check_process; then
            send_alert "Audityzer process is not running!"
            issues=$((issues + 1))
        fi
        
        # Check resource usage
        if ! check_memory; then
            issues=$((issues + 1))
        fi
        
        if ! check_cpu; then
            issues=$((issues + 1))
        fi
        
        if ! check_disk; then
            issues=$((issues + 1))
        fi
        
        # Check health endpoint
        if ! check_health_endpoint; then
            send_alert "Audityzer health endpoint is not responding!"
            issues=$((issues + 1))
        fi
        
        # Summary
        if [ "$issues" -eq 0 ]; then
            log "✅ All checks passed"
        else
            log "⚠️  $issues issues detected"
        fi
        
        sleep "$CHECK_INTERVAL"
    done
}

# Handle signals
cleanup() {
    log "🛑 Monitoring stopped"
    exit 0
}

trap cleanup SIGTERM SIGINT

# Create log directory
mkdir -p "$(dirname "$LOG_FILE")"

# Start monitoring
if [ "$1" = "--daemon" ]; then
    monitor &
    echo $! > /tmp/audityzer-monitor.pid
    log "🔍 Monitoring started in daemon mode (PID: $!)"
else
    monitor
fi
