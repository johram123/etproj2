#!/bin/bash

# Auth0 Next.js Frontend Setup Script
echo "🔐 Auth0 Next.js Frontend Setup"
echo "================================"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your Auth0 configuration:"
    echo ""
    cat << EOF
# Auth0 Configuration
AUTH0_SECRET='$(openssl rand -hex 32)'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
AUTH0_AUDIENCE='YOUR_AUTH0_API_AUDIENCE'

# Public environment variables
NEXT_PUBLIC_AUTH0_AUDIENCE='YOUR_AUTH0_API_AUDIENCE'
EOF
    echo ""
    echo "Replace the placeholder values with your actual Auth0 configuration."
    exit 1
fi

echo "✅ Environment file found"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies ready"

# Start development server
echo "🚀 Starting development server..."
echo "   Navigate to: http://localhost:3000"
echo "   Auth0 callback: http://localhost:3000/api/auth/callback"
echo ""

npm run dev
