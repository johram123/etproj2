@echo off
REM Auth0 Next.js Frontend Setup Script for Windows
echo 🔐 Auth0 Next.js Frontend Setup
echo ================================

REM Check if .env.local exists
if not exist ".env.local" (
    echo ❌ .env.local file not found!
    echo Please create .env.local with your Auth0 configuration:
    echo.
    echo # Auth0 Configuration
    echo AUTH0_SECRET='your-32-character-random-string'
    echo AUTH0_BASE_URL='http://localhost:3000'
    echo AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
    echo AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
    echo AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
    echo AUTH0_AUDIENCE='YOUR_AUTH0_API_AUDIENCE'
    echo.
    echo # Public environment variables
    echo NEXT_PUBLIC_AUTH0_AUDIENCE='YOUR_AUTH0_API_AUDIENCE'
    echo.
    echo Replace the placeholder values with your actual Auth0 configuration.
    echo.
    echo To generate AUTH0_SECRET on Windows PowerShell:
    echo -join ((1..32) ^| ForEach {[char][int]((97..122) + (48..57) ^| Get-Random)})
    pause
    exit /b 1
)

echo ✅ Environment file found

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

echo ✅ Dependencies ready

REM Start development server
echo 🚀 Starting development server...
echo    Navigate to: http://localhost:3000
echo    Auth0 callback: http://localhost:3000/api/auth/callback
echo.

npm run dev
