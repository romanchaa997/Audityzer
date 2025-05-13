@echo off
echo Stopping Web3 Security Test Kit Server...
echo.

powershell -ExecutionPolicy Bypass -File "scripts\server-manager.ps1" -Action stop -Port 5000

echo.
echo Server stopped successfully.
echo Press any key to exit...
pause > nul 