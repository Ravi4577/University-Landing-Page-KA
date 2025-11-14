# University Landing Page - One-Click Runner
# Usage examples:
#   ./run.ps1                 # dev mode on port 5000
#   ./run.ps1 -Mode prod      # production mode
#   ./run.ps1 -Port 8080      # custom port

[CmdletBinding()]
param(
    [ValidateSet('dev', 'prod')]
    [string]$Mode = 'dev',

    [int]$Port = 5000
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  University Landing Page Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ensure Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green

# Ensure npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm is not available" -ForegroundColor Red
    exit 1
}
Write-Host "✓ npm: $npmVersion" -ForegroundColor Green

# Install deps if node_modules missing
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}

# Ensure .env exists
if (-not (Test-Path ".env") -and (Test-Path ".env.example")) {
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env created (edit as needed)" -ForegroundColor Green
}

# Set port
$env:PORT = "$Port"
Write-Host "PORT set to $Port" -ForegroundColor Green

# Start
if ($Mode -eq 'prod') {
    Write-Host "Starting server in PRODUCTION mode..." -ForegroundColor Cyan
    Write-Host "Tip: Press Ctrl+C to stop" -ForegroundColor DarkGray
    npm start
}
else {
    Write-Host "Starting server in DEVELOPMENT mode (auto-reload)..." -ForegroundColor Cyan
    Write-Host "Tip: Press Ctrl+C to stop" -ForegroundColor DarkGray
    npm run dev
}
