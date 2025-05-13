@echo off
echo ========================================
echo     Web3 Security Checklist Scanner
echo ========================================
echo.

REM Check if PowerShell is available
where powershell >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: PowerShell is not available on this system.
    echo Please install PowerShell or run this scan on a system with PowerShell.
    exit /b 1
)

echo Running security scan using PowerShell...
echo.

REM Run the PowerShell script with execution policy bypass for compatibility
powershell -ExecutionPolicy Bypass -File "%~dp0run-scan.ps1"

if %ERRORLEVEL% neq 0 (
    echo.
    echo WARNING: The scan completed with errors. Check the logs above for details.
    echo Report may still be available in the scan-results directory.
) else (
    echo.
    echo Scan completed successfully!
    echo Check scan-results directory for the full report.
)

echo.
echo Press any key to exit...
pause >nul 