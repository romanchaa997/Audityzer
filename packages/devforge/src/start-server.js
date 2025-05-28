const { spawn, execSync } = require('child_process');
const findAvailablePort = require('./find-available-port');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
try {
  dotenv.config({ path: path.join(__dirname, '..', '.env') });
} catch (err) {
  // Continue if .env doesn't exist
}

// Configuration
const DEFAULT_PORT = process.env.SERVER_PORT || 5050;
const PUBLIC_DIR = process.env.PUBLIC_DIR || 'public';
const LOG_FILE = path.join(__dirname, '..', 'server.log');

// Logger
const logger = {
  log: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    
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

// Save PID to file for later cleanup
const savePid = (pid, port) => {
  const data = JSON.stringify({
    pid,
    port,
    startTime: Date.now(),
  });
  fs.writeFileSync(path.join(__dirname, '..', '.server-pid'), data);
  logger.log(`Server started with PID: ${pid} on port ${port}`);
};

// Check if server is already running and kill it
const killExistingServer = () => {
  const pidFile = path.join(__dirname, '..', '.server-pid');
  
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
    } catch (err) {
      logger.error(`Error killing existing server: ${err.message}`);
      // Continue anyway
    }
  }
};

// Create health endpoint
const createHealthEndpoint = (port) => {
  const http = require('http');
  const healthPort = port + 1;
  
  const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/status') {
      const pidFile = path.join(__dirname, '..', '.server-pid');
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
};

// Start server with the given port
const startServer = (port) => {
  logger.log(`Starting server on port ${port}...`);
  
  // Use cross-platform command
  const isWindows = process.platform === 'win32';
  const serveModule = path.join(__dirname, '..', 'node_modules', '.bin', isWindows ? 'serve.cmd' : 'serve');
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(__dirname, '..', PUBLIC_DIR);
  if (!fs.existsSync(publicDir)) {
    logger.log(`Creating public directory: ${publicDir}`);
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Prepare args
  const args = ['--listen', port, '--single', PUBLIC_DIR];
  
  // Add config if it exists
  const configPath = path.join(__dirname, '..', '.serverconfigrc.json');
  if (fs.existsSync(configPath)) {
    args.push('--config', '.serverconfigrc.json');
  }
  
  // Start server with the specified port
  const serverProcess = spawn(serveModule, args, {
    stdio: 'inherit',
    shell: true,
    detached: true,
    cwd: path.join(__dirname, '..')
  });
  
  // Save PID and handle exit
  savePid(serverProcess.pid, port);
  
  serverProcess.on('error', (err) => {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  });
  
  // Create health endpoint on port+1
  createHealthEndpoint(port);
  
  // Unref so the parent process can exit independently
  serverProcess.unref();
};

// Kill any existing server
killExistingServer();

// Check for forced port in .env
if (process.env.SERVER_PORT) {
  logger.log(`Using environment-specified port: ${process.env.SERVER_PORT}`);
  startServer(process.env.SERVER_PORT);
} else {
  // Find available port and start server
  logger.log(`Finding available port starting from ${DEFAULT_PORT}...`);
  findAvailablePort(DEFAULT_PORT, (port) => {
    if (port) {
      if (port !== DEFAULT_PORT) {
        logger.log(`Port ${DEFAULT_PORT} is unavailable, using port ${port} instead`);
      }
      startServer(port);
    } else {
      logger.error('Failed to find an available port. Please free up ports or specify a different range.');
      process.exit(1);
    }
  });
} 