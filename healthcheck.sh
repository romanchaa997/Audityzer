#!/bin/bash

echo "🏥 Audityzer Health Check"

# Check if server is running
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Server is running"
else
    echo "❌ Server is not responding"
    exit 1
fi

# Check database connection
if curl -f http://localhost:3000/health/db > /dev/null 2>&1; then
    echo "✅ Database connection healthy"
else
    echo "⚠️  Database connection issues"
fi

# Check external services
if curl -f http://localhost:3000/health/external > /dev/null 2>&1; then
    echo "✅ External services healthy"
else
    echo "⚠️  External service issues"
fi

echo "🎉 Health check completed"
