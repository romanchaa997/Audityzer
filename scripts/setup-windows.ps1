# Web3 Security Test Kit - Windows Setup Script
# This script sets up the development environment on Windows

# Colors for better output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Function to check if a command exists
function Test-CommandExists {
    param (
        [string]$Command
    )
    
    $exists = $null -ne (Get-Command -Name $Command -ErrorAction SilentlyContinue)
    return $exists
}

# Display welcome message
Write-ColorOutput Cyan "`n=== Web3 Security Test Kit - Windows Setup ==="
Write-ColorOutput Cyan "This script will set up your development environment.`n"

# Check Node.js
Write-ColorOutput Yellow "Checking Node.js installation..."
if (Test-CommandExists "node") {
    $nodeVersion = node --version
    Write-ColorOutput Green "Node.js $nodeVersion is installed."
}
else {
    Write-ColorOutput Red "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    Write-ColorOutput Red "Then run this script again."
    exit 1
}

# Check npm
Write-ColorOutput Yellow "`nChecking npm installation..."
if (Test-CommandExists "npm") {
    $npmVersion = npm --version
    Write-ColorOutput Green "npm $npmVersion is installed."
}
else {
    Write-ColorOutput Red "npm is not installed. Please install Node.js from https://nodejs.org/"
    Write-ColorOutput Red "Then run this script again."
    exit 1
}

# Install dependencies
Write-ColorOutput Yellow "`nInstalling project dependencies..."
try {
    npm install
    Write-ColorOutput Green "Dependencies installed successfully."
}
catch {
    Write-ColorOutput Red "Failed to install dependencies."
    Write-ColorOutput Yellow "Trying with legacy peer deps..."
    try {
        npm install --legacy-peer-deps
        Write-ColorOutput Green "Dependencies installed successfully with legacy peer deps."
    }
    catch {
        Write-ColorOutput Red "Failed to install dependencies. Please check the error messages above."
        exit 1
    }
}

# Configure environment
Write-ColorOutput Yellow "`nConfiguring environment..."

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-ColorOutput Yellow "Creating .env file from .env-example..."
    if (Test-Path ".env-example") {
        Copy-Item ".env-example" ".env"
        Write-ColorOutput Green ".env file created. Please review and update the values."
    }
    else {
        Write-ColorOutput Yellow "Warning: .env-example not found. Creating empty .env file."
        @"
# Web3 Security Test Kit Environment Variables

# Add your environment variables here
"@ | Out-File -FilePath ".env" -Encoding utf8
    }
}
else {
    Write-ColorOutput Green ".env file already exists."
}

# Set up Firebase config if it doesn't exist
if (-not (Test-Path ".firebase-config.json")) {
    Write-ColorOutput Yellow "`nCreating Firebase configuration..."
    try {
        npm run firebase:setup
        Write-ColorOutput Green "Firebase configuration created."
        Write-ColorOutput Yellow "Please update .firebase-config.json with your Firebase credentials."
    }
    catch {
        Write-ColorOutput Red "Failed to create Firebase configuration."
    }
}
else {
    Write-ColorOutput Green "`nFirebase configuration already exists."
}

# Create scripts directory if it doesn't exist
if (-not (Test-Path "scripts")) {
    Write-ColorOutput Yellow "`nCreating scripts directory..."
    New-Item -ItemType Directory -Path "scripts" | Out-Null
    Write-ColorOutput Green "Scripts directory created."
}

# Create batch files for easy execution
$startServerPath = "start-server.bat"
if (-not (Test-Path $startServerPath)) {
    Write-ColorOutput Yellow "`nCreating start server batch file..."
    @"
@echo off
echo Starting Web3 Security Test Kit Server...
echo.
powershell -ExecutionPolicy Bypass -File "scripts\server-manager.ps1" -Action start -Port 5000
"@ | Out-File -FilePath $startServerPath -Encoding ascii
    Write-ColorOutput Green "Start server batch file created at $startServerPath"
}
else {
    Write-ColorOutput Green "`nStart server batch file already exists."
}

$stopServerPath = "stop-server.bat"
if (-not (Test-Path $stopServerPath)) {
    Write-ColorOutput Yellow "`nCreating stop server batch file..."
    @"
@echo off
echo Stopping Web3 Security Test Kit Server...
echo.
powershell -ExecutionPolicy Bypass -File "scripts\server-manager.ps1" -Action stop -Port 5000
"@ | Out-File -FilePath $stopServerPath -Encoding ascii
    Write-ColorOutput Green "Stop server batch file created at $stopServerPath"
}
else {
    Write-ColorOutput Green "`nStop server batch file already exists."
}

# Create npm scripts for Docker if they don't exist
$packageJsonPath = "package.json"
if (Test-Path $packageJsonPath) {
    Write-ColorOutput Yellow "`nUpdating package.json with Docker commands..."
    try {
        $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
        
        # Check if Docker scripts already exist
        $scriptsNeedUpdate = $true
        if ($packageJson.scripts.PSObject.Properties.Name -contains "docker:start" -and 
            $packageJson.scripts.PSObject.Properties.Name -contains "docker:stop" -and 
            $packageJson.scripts.PSObject.Properties.Name -contains "docker:build") {
            $scriptsNeedUpdate = $false
        }
        
        if ($scriptsNeedUpdate) {
            # Add Docker scripts
            $packageJson.scripts | Add-Member -NotePropertyName "docker:start" -NotePropertyValue "powershell -ExecutionPolicy Bypass -File `"scripts\docker-setup.sh`" start" -Force
            $packageJson.scripts | Add-Member -NotePropertyName "docker:stop" -NotePropertyValue "powershell -ExecutionPolicy Bypass -File `"scripts\docker-setup.sh`" stop" -Force
            $packageJson.scripts | Add-Member -NotePropertyName "docker:build" -NotePropertyValue "powershell -ExecutionPolicy Bypass -File `"scripts\docker-setup.sh`" build" -Force
            
            # Convert back to JSON and write to file
            $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath
            Write-ColorOutput Green "Docker scripts added to package.json"
        }
        else {
            Write-ColorOutput Green "Docker scripts already exist in package.json"
        }
    }
    catch {
        Write-ColorOutput Red "Failed to update package.json with Docker commands."
    }
}

# Setup complete
Write-ColorOutput Cyan "`n=== Setup Complete! ==="
Write-ColorOutput White "You can now start the development server with:"
Write-ColorOutput Green ".\start-server.bat"

Write-ColorOutput White "`nOr use the server manager directly:"
Write-ColorOutput Green ".\scripts\server-manager.ps1 -Action start -Port 5000"
Write-ColorOutput Green ".\scripts\server-manager.ps1 -Action stop -Port 5000"
Write-ColorOutput Green ".\scripts\server-manager.ps1 -Action restart -Port 5000"

Write-ColorOutput Cyan "`nHappy testing!" 