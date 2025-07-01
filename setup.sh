#!/bin/bash

# Setup script for Monorepo App
set -e

echo "🚀 Setting up Monorepo App..."

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 20 ]; then
    echo "❌ Node.js 20.x or higher is required. Current version: $(node -v)"
    echo "Please update Node.js: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check npm version
echo "📦 Checking npm version..."
npm_version=$(npm -v | cut -d'.' -f1)
if [ "$npm_version" -lt 10 ]; then
    echo "❌ npm 10.x or higher is required. Current version: $(npm -v)"
    echo "Please update npm: npm install -g npm@latest"
    exit 1
fi
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build Swagger documentation
echo "📚 Generating Swagger documentation..."
npm run build:swagger -w api

# Run linting
echo "🔍 Running linting..."
npm run lint

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "  • Start API: npm run dev -w api"
echo "  • Start Web: npm run start -w web"
echo "  • Or use Docker: docker-compose up"
echo ""
echo "📊 URLs:"
echo "  • Frontend: http://localhost:4200"
echo "  • API: http://localhost:3000"
echo "  • Swagger: http://localhost:3000/api-docs"
echo ""
