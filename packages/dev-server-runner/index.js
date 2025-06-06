/**
 * Audityzer
 * Intelligent development server with auto port management for Web3 security testing, process tracking,
 * and health monitoring capabilities.
 */

const path = require('path');
const fs = require('fs');
const { spawn, execSync } = require('child_process');
const dotenv = require('dotenv');

// Default configuration
const defaults = {
  port: 5050,
  publicDir: 'public',
  logLevel: 'info',
  logFile: 'server.log'
};

// Load environment variables
function loadEnv(options = {}) {
  try {
    const envPath = options.envPath || '.env';
    dotenv.config({ path: envPath });
  } catch (err) {
    // Continue if .env doesn't exist
  }
  
  return {
    port: process.env.SERVER_PORT || options.port || defaults.port,
    publicDir: process.env.PUBLIC_DIR || options.publicDir || defaults.publicDir,
    logLevel: process.env.LOG_LEVEL || options.logLevel || defaults.logLevel,
    logFile: process.env.LOG_FILE || options.logFile || defaults.logFile
  };
}

// Logger
function createLogger(logFile) {
  return {
    log: (message) => {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] ${message}\n`;
      console.log(message);
      
      // Append to log file
      try {
        fs.appendFileSync(logFile, logMessage);
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
        fs.appendFileSync(logFile, logMessage);
      } catch (err) {
        // Silent fail on log write error
      }
    }
  };
}

// Find available port
function findAvailablePort(startPort, callback) {
  const net = require('net');
  const server = net.createServer();
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // Port is in use, try the next one
      findAvailablePort(startPort + 1, callback);
    } else {
      // Some other error occurred
      callback(null, err);
    }
  });
  
  server.listen(startPort, () => {
    // Port is available, close server and return port
    server.close(() => {
      callback(startPort);
    });
  });
}

// Save PID to file for later cleanup
function savePid(pidFile, pid, port) {
  const data = JSON.stringify({
    pid,
    port,
    startTime: Date.now(),
  });
  fs.writeFileSync(pidFile, data);
  return { pid, port };
}

// Check if server is already running and kill it
function killExistingServer(pidFile, logger) {
  if (fs.existsSync(pidFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(pidFile, 'utf8'));
      const pid = data.pid;
      const port = data.port;
      
      logger.log(`Detected existing server (PID: ${pid}, Port: ${port}). Stopping it before starting a new one...`);
      
      // Use different kill command based on platform
      const isWindows = process.platform === 'win32';
      
      if (isWindows) {
        try {
          execSync(`taskkill /PID ${pid} /F /T`);
          logger.log('Successfully stopped existing server');
        } catch (err) {
          logger.log('Server was not running or already stopped');
        }
      } else {
        try {
          process.kill(Number(pid), 'SIGTERM');
          logger.log('Successfully stopped existing server');
        } catch (err) {
          logger.log('Server was not running or already stopped');
        }
      }
      
      // Remove PID file
      fs.unlinkSync(pidFile);
      return true;
    } catch (err) {
      logger.error(`Error killing existing server: ${err.message}`);
      // Continue anyway
      return false;
    }
  }
  return false;
}

// Create health endpoint
function createHealthEndpoint(port, pidFile, logger) {
  const http = require('http');
  const healthPort = port + 1;
  
  const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/status') {
      let serverInfo = { status: 'unknown' };
      
      try {
        if (fs.existsSync(pidFile)) {
          const data = JSON.parse(fs.readFileSync(pidFile, 'utf8'));
          const uptime = (Date.now() - data.startTime) / 1000; // seconds
          
          serverInfo = {
            status: 'running',
            pid: data.pid,
            port: data.port,
            uptime: `${uptime.toFixed(2)} seconds`,
            startTime: new Date(data.startTime).toISOString()
          };
        } else {
          serverInfo = { status: 'not running' };
        }
      } catch (err) {
        serverInfo = { status: 'error', message: err.message };
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(serverInfo, null, 2));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  
  server.listen(healthPort, () => {
    logger.log(`Health endpoint available at: http://localhost:${healthPort}/health`);
  });
  
  server.on('error', (err) => {
    logger.error(`Could not start health endpoint: ${err.message}`);
  });
  
  return server;
}

// Start server with the given port
function startServer(options = {}) {
  // Load configuration
  const config = loadEnv(options);
  const pidFile = options.pidFile || path.join(process.cwd(), '.server-pid');
  const logger = createLogger(path.join(process.cwd(), config.logFile));
  
  // Kill any existing server
  if (options.autoKill !== false) {
    killExistingServer(pidFile, logger);
  }
  
  // Function to start the actual server
  const launchServer = (port) => {
    logger.log(`Starting server on port ${port}...`);
    
    // Use cross-platform command
    const isWindows = process.platform === 'win32';
    let serveModule;
    
    // Try to find the serve binary
    try {
      serveModule = require.resolve('serve/bin/serve.js');
    } catch (err) {
      serveModule = path.join(process.cwd(), 'node_modules', '.bin', isWindows ? 'serve.cmd' : 'serve');
    }
    
    // Create public directory if it doesn't exist
    const publicDir = path.resolve(process.cwd(), config.publicDir);
    if (!fs.existsSync(publicDir)) {
      logger.log(`Creating public directory: ${publicDir}`);
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Prepare args
    const args = ['--listen', port, '--single', config.publicDir];
    
    // Add config if it exists
    const configPath = options.configFile || path.join(process.cwd(), '.serverconfigrc.json');
    if (fs.existsSync(configPath)) {
      args.push('--config', configPath);
    }
    
    // Start server with the specified port
    const serverProcess = spawn(serveModule, args, {
      stdio: 'inherit',
      shell: true,
      detached: true,
      cwd: process.cwd()
    });
    
    // Save PID and handle exit
    const serverInfo = savePid(pidFile, serverProcess.pid, port);
    logger.log(`Server started with PID: ${serverInfo.pid} on port ${serverInfo.port}`);
    
    serverProcess.on('error', (err) => {
      logger.error(`Failed to start server: ${err.message}`);
      process.exit(1);
    });
    
    // Create health endpoint on port+1
    const healthServer = createHealthEndpoint(port, pidFile, logger);
    
    // Unref so the parent process can exit independently
    serverProcess.unref();
    
    return { serverProcess, healthServer, port, pid: serverProcess.pid };
  };
  
  // Check for forced port in options or env
  const forcedPort = options.port || process.env.SERVER_PORT;
  
  return new Promise((resolve, reject) => {
    if (forcedPort) {
      logger.log(`Using specified port: ${forcedPort}`);
      try {
        const server = launchServer(forcedPort);
        resolve(server);
      } catch (err) {
        reject(err);
      }
    } else {
      // Find available port and start server
      logger.log(`Finding available port starting from ${config.port}...`);
      findAvailablePort(Number(config.port), (port, err) => {
        if (port) {
          if (port !== Number(config.port)) {
            logger.log(`Port ${config.port} is unavailable, using port ${port} instead`);
          }
          try {
            const server = launchServer(port);
            resolve(server);
          } catch (err) {
            reject(err);
          }
        } else {
          const errorMsg = 'Failed to find an available port. Please free up ports or specify a different range.';
          logger.error(errorMsg);
          reject(new Error(errorMsg));
        }
      });
    }
  });
}

// Stop the running server
function stopServer(options = {}) {
  const pidFile = options.pidFile || path.join(process.cwd(), '.server-pid');
  const logFile = options.logFile || path.join(process.cwd(), 'server.log');
  const logger = createLogger(logFile);
  
  return new Promise((resolve, reject) => {
    try {
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
              execSync(`powershell -Command "Get-NetTCPConnection -LocalPort ${healthPort} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | ForEach-Object { taskkill /F /PID $_ }"`);
            } catch (err) {
              // Ignore errors
            }
          } else {
            try {
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
        resolve(true);
      } else {
        logger.log('No running server found');
        resolve(false);
      }
    } catch (err) {
      logger.error(`Error stopping server: ${err.message}`);
      reject(err);
    }
  });
}

// Get server status
function getServerStatus(options = {}) {
  const pidFile = options.pidFile || path.join(process.cwd(), '.server-pid');
  
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(pidFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(pidFile, 'utf8').trim());
          const pid = data.pid;
          const port = data.port;
          const startTime = data.startTime;
          const uptime = (Date.now() - startTime) / 1000; // seconds
          
          resolve({
            status: 'running',
            pid,
            port,
            healthEndpoint: `http://localhost:${parseInt(port)+1}/health`,
            startTime: new Date(startTime).toISOString(),
            uptime: `${uptime.toFixed(2)} seconds`
          });
        } catch (err) {
          // Handle old format or corrupted file
          const pid = fs.readFileSync(pidFile, 'utf8').trim();
          resolve({
            status: 'running (legacy format)',
            pid,
            note: 'Server is running with an older version of the runner'
          });
        }
      } else {
        resolve({
          status: 'not running'
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// Export the API
module.exports = {
  startServer,
  stopServer,
  getServerStatus,
  findAvailablePort
}; 