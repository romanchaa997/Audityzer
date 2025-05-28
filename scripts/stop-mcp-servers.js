/**
 * Stop MCP Servers
 * 
 * This script stops all running Model Context Protocol (MCP) servers.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { logger } from '../src/mcp/utils/logger.js';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PID directory
const pidDir = path.join(__dirname, '..', '.pids');

// Stop a server by PID
const stopServer = (serverName, pidData) => {
  try {
    const data = JSON.parse(pidData);
    const pid = data.pid;
    const port = data.port;
    
    logger.info(`Stopping ${serverName} (PID: ${pid}, Port: ${port})...`);
    
    // Use different kill command based on platform
    const isWindows = process.platform === 'win32';
    
    if (isWindows) {
      try {
        execSync(`taskkill /PID ${pid} /F /T`);
        logger.info(`Successfully stopped ${serverName}`);
      } catch (err) {
        logger.info(`${serverName} was not running or already stopped`);
      }
    } else {
      try {
        process.kill(Number(pid), 'SIGTERM');
        logger.info(`Successfully stopped ${serverName}`);
      } catch (err) {
        logger.info(`${serverName} was not running or already stopped`);
      }
    }
    
    // Remove PID file
    fs.unlinkSync(path.join(pidDir, `${serverName}.pid`));
    
    return true;
  } catch (err) {
    logger.error(`Error stopping ${serverName}: ${err.message}`);
    return false;
  }
};

// Stop all MCP servers
const stopAllServers = () => {
  try {
    // Check if PID directory exists
    if (!fs.existsSync(pidDir)) {
      logger.info('No MCP servers are running (PID directory not found)');
      return true;
    }
    
    // Read all PID files
    const pidFiles = fs.readdirSync(pidDir).filter(file => file.endsWith('.pid'));
    
    if (pidFiles.length === 0) {
      logger.info('No MCP servers are running (no PID files found)');
      return true;
    }
    
    // Stop each server
    let allStopped = true;
    
    for (const pidFile of pidFiles) {
      const serverName = pidFile.replace('.pid', '');
      const pidData = fs.readFileSync(path.join(pidDir, pidFile), 'utf8');
      
      const stopped = stopServer(serverName, pidData);
      allStopped = allStopped && stopped;
    }
    
    if (allStopped) {
      logger.info('All MCP servers stopped successfully');
    } else {
      logger.warn('Some MCP servers could not be stopped');
    }
    
    return allStopped;
  } catch (error) {
    logger.error(`Error stopping MCP servers: ${error.message}`);
    return false;
  }
};

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = stopAllServers();
  process.exit(success ? 0 : 1);
}

export {
  stopServer,
  stopAllServers
};