# University Landing Page - Setup & Installation Script
# This script will guide you through the setup process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  University Landing Page Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
else {
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}
else {
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Installing Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Install dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created!" -ForegroundColor Green
    Write-Host "📝 Please edit .env file to configure your settings" -ForegroundColor Yellow
}
else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 To start the server, run:" -ForegroundColor Green
Write-Host "   npm start        (Production mode)" -ForegroundColor White
Write-Host "   npm run dev      (Development mode with auto-reload)" -ForegroundColor White
Write-Host ""
Write-Host "🌐 The server will be available at:" -ForegroundColor Green
Write-Host "   http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Landing Pages:" -ForegroundColor Green
Write-Host "   http://localhost:5000/university1" -ForegroundColor White
Write-Host "   http://localhost:5000/university2" -ForegroundColor White
Write-Host ""
Write-Host "📖 For more information, see README_ENHANCED.md" -ForegroundColor Yellow
Write-Host ""
