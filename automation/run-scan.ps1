# Smart Contract Security Scan PowerShell Script
# PowerShell script to run security checks on smart contracts

Write-Host "========================================"
Write-Host "    Web3 Security Checklist Scanner    "
Write-Host "========================================"

# Check if Docker is installed
try {
    $dockerVersion = docker --version
    Write-Host "Using $dockerVersion"
} catch {
    Write-Host "Docker is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    exit 1
}

# Create results directory
if (-not (Test-Path -Path "scan-results")) {
    New-Item -ItemType Directory -Path "scan-results" | Out-Null
    Write-Host "Created scan-results directory" -ForegroundColor Green
}

# Run the scan in Docker container
Write-Host "Running security scan in Docker container..." -ForegroundColor Cyan
Write-Host "This will analyze any Solidity files in the current directory"

# Using the trailofbits security toolbox which includes Slither and other tools
docker run --rm -v ${PWD}:/app -w /app trailofbits/eth-security-toolbox:latest bash -c "cd /app && bash ./automation/scan-contracts.sh"

Write-Host "`nScan complete! Check scan-results directory for the report." -ForegroundColor Green 