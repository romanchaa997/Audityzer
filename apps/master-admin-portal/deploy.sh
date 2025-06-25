#!/bin/bash

# Audityzer Master Admin Portal - Railway Deployment Script
# This script helps verify the deployment setup

echo "🚀 Audityzer Master Admin Portal - Railway Deployment Setup"
echo "============================================================"

# Check if all required files are present
echo "📋 Checking deployment files..."

required_files=(
    "package.json"
    "next.config.js"
    "Dockerfile"
    "railway.json"
    "prisma/schema.prisma"
    "prisma/seed.ts"
    ".env"
    "app/layout.tsx"
    "app/page.tsx"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    echo "✅ All required files are present"
else
    echo "❌ Missing files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    exit 1
fi

# Check package.json scripts
echo "📦 Checking package.json scripts..."
if grep -q '"build"' package.json && grep -q '"start"' package.json; then
    echo "✅ Build and start scripts found"
else
    echo "❌ Missing required scripts in package.json"
    exit 1
fi

# Check environment variables
echo "🔧 Checking environment configuration..."
if [ -f ".env" ]; then
    echo "✅ Environment file found"
    
    # Check for required environment variables
    required_vars=("DATABASE_URL" "NEXTAUTH_URL" "NEXTAUTH_SECRET" "JWT_SECRET")
    for var in "${required_vars[@]}"; do
        if grep -q "$var" .env; then
            echo "✅ $var configured"
        else
            echo "⚠️  $var not found in .env (will be set by Railway)"
        fi
    done
else
    echo "❌ .env file not found"
    exit 1
fi

# Check Prisma setup
echo "🗄️  Checking database setup..."
if [ -f "prisma/schema.prisma" ] && [ -f "prisma/seed.ts" ]; then
    echo "✅ Prisma schema and seed files found"
else
    echo "❌ Prisma files missing"
    exit 1
fi

# Check Railway configuration
echo "🚂 Checking Railway configuration..."
if [ -f "railway.json" ]; then
    echo "✅ Railway configuration found"
    if grep -q "npm run db:migrate" railway.json; then
        echo "✅ Database migration configured"
    fi
    if grep -q "npm run db:seed" railway.json; then
        echo "✅ Database seeding configured"
    fi
else
    echo "❌ railway.json not found"
    exit 1
fi

echo ""
echo "🎉 Deployment setup verification complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload this directory to a GitHub repository"
echo "2. Go to railway.app and sign in"
echo "3. Click 'Deploy a new project'"
echo "4. Select 'Deploy from GitHub repo'"
echo "5. Choose your repository"
echo "6. Add PostgreSQL service"
echo "7. Wait for deployment to complete"
echo ""
echo "🔗 Expected URL format: https://audityzer-master-admin-production.up.railway.app"
echo ""
echo "👤 Login credentials:"
echo "   Email: admin@audityzer.com"
echo "   Password: password123"
echo ""
echo "✨ Your unified Audityzer ecosystem hub will be live!"
