#!/bin/bash

set -e

echo "🚀 Setting up Monorepo NgXp Boilerplate DevContainer..."

# Ensure we're in the right directory
cd /workspace

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build Swagger documentation
echo "📚 Generating Swagger documentation..."
npm run build:swagger -w api || echo "⚠️  Swagger build failed, will try again after first run"

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
fi

# Set up git hooks (if .git exists)
if [ -d .git ]; then
    echo "🔧 Setting up git hooks..."
    
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the issues before committing."
    exit 1
fi
echo "✅ Pre-commit checks passed!"
EOF
    
    chmod +x .git/hooks/pre-commit
fi

# Create useful aliases
echo "🔧 Creating useful bash aliases..."
cat >> ~/.bashrc << 'EOF'

# Monorepo NgXp Boilerplate aliases
alias ll='ls -la'
alias la='ls -la'
alias l='ls -l'
alias ..='cd ..'
alias ...='cd ../..'

# Project specific aliases
alias api='cd /workspace/apps/api'
alias web='cd /workspace/apps/web'
alias root='cd /workspace'

# npm aliases
alias ni='npm install'
alias nr='npm run'
alias nrd='npm run dev'
alias nrb='npm run build'
alias nrt='npm run test'
alias nrl='npm run lint'

# Docker aliases
alias dc='docker-compose'
alias dcu='docker-compose up'
alias dcd='docker-compose down'
alias dcb='docker-compose build'

# Git aliases
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gb='git branch'
alias gco='git checkout'

# Useful functions
swagger() {
    echo "🔄 Regenerating Swagger..."
    npm run build:swagger -w api
    echo "✅ Swagger documentation updated!"
}

dev() {
    echo "🚀 Starting development servers..."
    npm run dev
}

EOF

# Make scripts executable
chmod +x setup.sh

echo ""
echo "🎉 DevContainer setup completed successfully!"
echo ""
echo "📋 Quick start commands:"
echo "  • npm run dev -w api     # Start API server"
echo "  • npm run start -w web   # Start Angular app"
echo "  • npm run dev            # Start both"
echo "  • docker-compose up      # Start with database"
echo ""
echo "📊 Useful URLs:"
echo "  • API: http://localhost:3000"
echo "  • Web: http://localhost:4200"
echo "  • Swagger: http://localhost:3000/api-docs"
echo ""
echo "🔧 Useful aliases added to ~/.bashrc:"
echo "  • api, web, root         # Navigate to directories"
echo "  • ni, nr, nrd, nrb       # npm shortcuts"
echo "  • dc, dcu, dcd           # docker-compose shortcuts"
echo "  • gs, ga, gc, gp         # git shortcuts"
echo "  • swagger()              # Regenerate swagger"
echo "  • dev()                  # Start dev servers"
echo ""
echo "Ready to code! 🚀"
