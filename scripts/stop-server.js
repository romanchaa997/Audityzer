/**
 * Cross-platform script to stop the development server
 * Works on Windows, macOS, and Linux
 */

const fs = require('fs');
const path = require('path');
const LOG_FILE = path.join(__dirname, '..', 'server.log');

// Logger
const logger = {
  log: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    // Append to log file
    try {
      fs.appendFileSync(LOG_FILE, logMessage);
    } catch (err) {
      // Silent fail on log write error
    }
  },
  error: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}\n`;
    console.error(message);
    
    // Append to log file
    try {
      fs.appendFileSync(LOG_FILE, logMessage);
    } catch (err) {
      // Silent fail on log write error
    }
  }
};

try {
  const pidFile = path.join(__dirname, '..', '.server-pid');
  
  // Check if PID file exists
  if (fs.existsSync(pidFile)) {
    // Read PID file content
    const fileContent = fs.readFileSync(pidFile, 'utf8').trim();
    
    // Try parsing as JSON first
    let pid, port;
    try {
      const data = JSON.parse(fileContent);
      pid = data.pid;
      port = data.port;
      
      const uptime = (Date.now() - data.startTime) / 1000; // seconds
      logger.log(`Stopping server with PID: ${pid}, Port: ${port}, Uptime: ${uptime.toFixed(2)} seconds`);
    } catch (err) {
      // Fallback to old format (just the PID as string)
      pid = fileContent;
      logger.log(`Stopping server with PID: ${pid} (using legacy format)`);
    }
    
    // Use different kill command based on platform
    const isWindows = process.platform === 'win32';
    if (isWindows) {
      // Windows-specific process termination
      const { execSync } = require('child_process');
      try {
        execSync(`taskkill /PID ${pid} /F /T`);
        logger.log('Server stopped successfully');
      } catch (err) {
        logger.log('Server was not running or already stopped');
      }
    } else {
      // Unix-like systems
      try {
        process.kill(Number(pid), 'SIGTERM');
        logger.log('Server stopped successfully');
      } catch (err) {
        logger.log('Server was not running or already stopped');
      }
    }
    
    // Stop the health endpoint if it exists
    if (port) {
      const healthPort = Number(port) + 1;
      if (isWindows) {
        try {
          const { execSync } = require('child_process');
          execSync(`powershell -Command "Get-NetTCPConnection -LocalPort ${healthPort} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | ForEach-Object { taskkill /F /PID $_ }"`);
        } catch (err) {
          // Ignore errors
        }
      } else {
        try {
          const { execSync } = require('child_process');
          const output = execSync(`lsof -t -i:${healthPort}`);
          const pids = output.toString().trim().split('\n').filter(Boolean);
          for (const p of pids) {
            process.kill(Number(p), 'SIGTERM');
          }
        } catch (err) {
          // Ignore errors
        }
      }
    }
    
    // Remove PID file
    fs.unlinkSync(pidFile);
  } else {
    logger.log('No running server found');
  }
} catch (err) {
  logger.error(`Error stopping server: ${err.message}`);
} 