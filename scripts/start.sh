#!/bin/sh

# Audityzer startup script

set -e

echo "Starting Audityzer..."

# Check if required environment variables are set
if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=production
fi

if [ -z "$PORT" ]; then
    export PORT=5000
fi

# Create necessary directories
mkdir -p /app/reports
mkdir -p /app/data
mkdir -p /app/logs

# Set permissions
chmod 755 /app/reports
chmod 755 /app/data
chmod 755 /app/logs

echo "Directories created"

# Check if the application source exists
if [ ! -f "/app/bin/audityzer.js" ]; then
    echo "Application source not found. Ensure src/ and bin/ are copied."
    exit 1
fi

echo "Application files found"

# Start the application
echo "Starting Audityzer on port $PORT..."
exec node bin/audityzer.js start
