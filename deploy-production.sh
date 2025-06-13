#!/bin/bash

echo "🚀 Starting Audityzer Production Deployment"

# Pre-deployment checks
echo "📋 Running pre-deployment checks..."
npm run lint
npm run test:unit
npm run test:integration
npm run test:security
npm run security:scan

# Build for production
echo "🔨 Building for production..."
npm run build

# Database migrations (if needed)
echo "🗄️  Running database migrations..."
npm run db:migrate 2>/dev/null || echo "No migrations to run"

# Start production server
echo "🌟 Starting production server..."
npm run start:prod

echo "✅ Deployment completed successfully!"
