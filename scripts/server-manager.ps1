# Web3 Security Test Kit - Windows Server Manager
# This script manages the development server on Windows systems

param (
    [Parameter(Mandatory=$true)]
    [ValidateSet('start', 'stop', 'restart')]
    [string]$Action,
    
    [Parameter(Mandatory=$false)]
    [int]$Port = 5000
)

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

# Function to start the server
function Start-DevServer {
    param (
        [int]$Port
    )
    
    Write-ColorOutput Green "`nStarting server on port $Port..."
    
    # Check if port is already in use
    try {
        $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        if ($connections) {
            $processId = $connections[0].OwningProcess
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                Write-ColorOutput Yellow "Port $Port is already in use by process $($process.Name) (PID: $processId)"
                Write-ColorOutput Yellow "Stopping existing process before starting server..."
                Stop-DevServer -Port $Port
                Start-Sleep -Seconds 2
            }
        }
    }
    catch {
        # Continue even if we can't check existing connections
    }
    
    # Start the server using npm script
    $processInfo = Start-Process -FilePath "npm" -ArgumentList "run", "dev:serve", "--", "--port", "$Port" -PassThru -NoNewWindow
    
    # Store the process ID for later use
    $processInfo.Id | Out-File -FilePath ".server-pid" -Encoding utf8 -Force
    
    Write-ColorOutput Green "Server started with PID $($processInfo.Id)"
    Write-ColorOutput Green "Server running at: http://localhost:$Port"
    
    # Open in default browser
    Start-Process "http://localhost:$Port"
}

# Function to stop the server
function Stop-DevServer {
    param (
        [int]$Port
    )
    
    Write-ColorOutput Green "`nStopping server..."
    
    $stopped = $false
    
    # Try to get PID from file first
    if (Test-Path ".server-pid") {
        $savedPid = Get-Content ".server-pid" -Raw
        try {
            $process = Get-Process -Id $savedPid -ErrorAction SilentlyContinue
            if ($process) {
                Write-ColorOutput Green "Stopping server with PID $savedPid"
                Stop-Process -Id $savedPid -Force
                $stopped = $true
            }
        }
        catch {
            Write-ColorOutput Yellow "Could not find process with saved PID $savedPid"
        }
        
        # Clean up PID file
        Remove-Item ".server-pid" -Force -ErrorAction SilentlyContinue
    }
    
    # Fallback: Find by port
    if (-not $stopped) {
        try {
            $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
            if ($connections) {
                foreach ($conn in $connections) {
                    $processId = $conn.OwningProcess
                    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
                    if ($process) {
                        Write-ColorOutput Green "Stopping server with PID $processId using port $Port"
                        Stop-Process -Id $processId -Force
                        $stopped = $true
                    }
                }
            }
        }
        catch {
            Write-ColorOutput Yellow "Could not find process using port $Port"
        }
    }
    
    # If all else fails, try to find npm serve process
    if (-not $stopped) {
        try {
            $processes = Get-Process | Where-Object { $_.Name -eq "node" -and $_.CommandLine -like "*serve*" }
            if ($processes) {
                foreach ($proc in $processes) {
                    Write-ColorOutput Green "Stopping Node.js server with PID $($proc.Id)"
                    Stop-Process -Id $proc.Id -Force
                    $stopped = $true
                }
            }
        }
        catch {
            Write-ColorOutput Yellow "Could not find Node.js server processes"
        }
    }
    
    if ($stopped) {
        Write-ColorOutput Green "Server stopped successfully"
    }
    else {
        Write-ColorOutput Yellow "No running server found to stop"
    }
}

# Main execution
switch ($Action) {
    "start" {
        Start-DevServer -Port $Port
    }
    "stop" {
        Stop-DevServer -Port $Port
    }
    "restart" {
        Stop-DevServer -Port $Port
        Start-Sleep -Seconds 2
        Start-DevServer -Port $Port
    }
} 