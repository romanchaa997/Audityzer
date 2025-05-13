# Smart Contract Security Scan PowerShell Script
# PowerShell script to run security checks on smart contracts

# Error handling
$ErrorActionPreference = "Stop"
trap {
    Write-Host "An error occurred: $_" -ForegroundColor Red
    exit 1
}

function CheckAndCreateDirectory {
    param (
        [string]$Path
    )

    if (-not (Test-Path -Path $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
        Write-Host "Created directory: $Path" -ForegroundColor Green
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Web3 Security Checklist Scanner    " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Create results directory
CheckAndCreateDirectory -Path "scan-results"

# Check if Docker is installed
try {
    $dockerVersion = docker --version
    Write-Host "Using $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "Docker is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    
    # Try to create a basic report even without Docker
    $reportPath = "scan-results/summary-report.md"
    Set-Content -Path $reportPath -Value "# Web3 Security Scan Report`r`n"
    Add-Content -Path $reportPath -Value "Generated on: $(Get-Date)`r`n"
    Add-Content -Path $reportPath -Value "## Security Recommendations`r`n"
    Add-Content -Path $reportPath -Value "- Install Docker to run the full security scan`r`n"
    Add-Content -Path $reportPath -Value "## Next Steps`r`n"
    Add-Content -Path $reportPath -Value "1. Install Docker Desktop`r`n"
    Add-Content -Path $reportPath -Value "2. Re-run this security scan`r`n"
    
    Write-Host "Created a basic report at $reportPath" -ForegroundColor Yellow
    exit 1
}

# Check if the scan-contracts.sh script exists
if (-not (Test-Path -Path "automation/scan-contracts.sh")) {
    Write-Host "scan-contracts.sh script not found in automation directory" -ForegroundColor Red
    exit 1
}

# Run the scan in Docker container
Write-Host "Running security scan in Docker container..." -ForegroundColor Cyan
Write-Host "This will analyze any Solidity files in the current directory"

try {
    # Using the trailofbits security toolbox which includes Slither and other tools
    $currentDir = (Get-Location).Path -replace '\\', '/'
    
    # Different handling for Windows paths (Docker requires specific path formats)
    if ($IsWindows -or $env:OS -match 'Windows') {
        # Convert Windows path to Docker format
        $currentDir = $currentDir -replace '^([A-Za-z]):', '//$1'
        $dockerCmd = "docker run --rm -v `"${currentDir}:/app`" -w /app trailofbits/eth-security-toolbox:latest bash -c `"cd /app && bash ./automation/scan-contracts.sh`""
    } else {
        $dockerCmd = "docker run --rm -v `"${PWD}:/app`" -w /app trailofbits/eth-security-toolbox:latest bash -c `"cd /app && bash ./automation/scan-contracts.sh`""
    }

    Write-Host "Running command: $dockerCmd" -ForegroundColor Gray
    Invoke-Expression $dockerCmd
    
    # Check if report was generated
    if (Test-Path -Path "scan-results/summary-report.md") {
        Write-Host "`nScan complete! Report generated successfully." -ForegroundColor Green
    } else {
        Write-Host "`nScan completed but no report was generated." -ForegroundColor Yellow
        
        # Create a basic report
        $reportPath = "scan-results/summary-report.md"
        Set-Content -Path $reportPath -Value "# Web3 Security Scan Report`r`n"
        Add-Content -Path $reportPath -Value "Generated on: $(Get-Date)`r`n"
        Add-Content -Path $reportPath -Value "## Security Recommendations`r`n"
        Add-Content -Path $reportPath -Value "- The scan completed but did not generate a complete report. Please check the Docker logs.`r`n"
    }
} catch {
    Write-Host "Error running Docker container: $_" -ForegroundColor Red
    
    # Create an error report
    CheckAndCreateDirectory -Path "scan-results"
    $reportPath = "scan-results/summary-report.md"
    Set-Content -Path $reportPath -Value "# Web3 Security Scan Report`r`n"
    Add-Content -Path $reportPath -Value "Generated on: $(Get-Date)`r`n"
    Add-Content -Path $reportPath -Value "## Error Running Security Scan`r`n"
    Add-Content -Path $reportPath -Value "The security scan encountered an error: $_`r`n"
    
    Write-Host "Created an error report at $reportPath" -ForegroundColor Yellow
}

Write-Host "`nCheck scan-results directory for the report." -ForegroundColor Green 