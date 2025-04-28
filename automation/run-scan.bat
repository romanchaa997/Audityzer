@echo off
REM Smart Contract Security Scan Script for Windows
REM Simple wrapper to run the security scan in a Docker container

echo ========================================
echo    Web3 Security Checklist Scanner
echo ========================================

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed or not in PATH
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop/
    exit /b 1
)

echo Creating scan-results directory...
if not exist scan-results mkdir scan-results

echo Running security scan in Docker container...
echo This will analyze any Solidity files in the current directory

REM Run the scan in a Docker container with the necessary tools
docker run --rm -v %cd%:/app -w /app trailofbits/eth-security-toolbox:latest bash -c "cd /app && bash ./automation/scan-contracts.sh"

echo.
echo Scan complete! Check scan-results directory for the report.
echo. 