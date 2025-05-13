@echo off
echo Starting Web3 Security Test Kit Server...
echo.

powershell -ExecutionPolicy Bypass -File "scripts\server-manager.ps1" -Action start -Port 5000

echo.
echo Server started at http://localhost:5000
echo Press any key to open in browser...
pause > nul
start http://localhost:5000 