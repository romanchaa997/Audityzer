/**
 * MCP Status
 * 
 * This script checks the status of all Model Context Protocol (MCP) servers.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { logger } from '../src/mcp/utils/logger.js';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PID directory
const pidDir = path.join(__dirname, '..', '.pids');

// Check if a server is running
const checkServerStatus = async (serverName, pidData) => {
  try {
    const data = JSON.parse(pidData);
    const pid = data.pid;
    const port = data.port;
    const startTime = data.startTime;
    const uptime = (Date.now() - startTime) / 1000; // seconds

    // Check if process is running
    let isRunning = false;

    try {
      // Different check based on platform
      const isWindows = process.platform === 'win32';

      if (isWindows) {
        const { execSync } = await import('child_process');
        const result = execSync(`tasklist /FI "PID eq ${pid}" /NH`, { encoding: 'utf8' });
        isRunning = result.includes(pid.toString());
      } else {
        process.kill(Number(pid), 0); // Doesn't actually kill the process
        isRunning = true;
      }
    } catch (err) {
      isRunning = false;
    }

    // Try to connect to health endpoint if it's the main server
    let healthStatus = 'unknown';

    if (serverName === 'mcp-main' && isRunning) {
      try {
        const response = await axios.get(`http://localhost:${port}/health`, {
          timeout: 2000 // 2 seconds timeout
        });

        healthStatus = response.data?.status || 'unknown';
      } catch (err) {
        healthStatus = 'unreachable';
      }
    }

    return {
      name: serverName,
      pid,
      port,
      isRunning,
      healthStatus: serverName === 'mcp-main' ? healthStatus : 'N/A',
      startTime: new Date(startTime).toISOString(),
      uptime: `${uptime.toFixed(2)} seconds`
    };
  } catch (err) {
    return {
      name: serverName,
      error: err.message,
      isRunning: false
    };
  }
};

// Check status of all MCP servers
const checkAllServers = async () => {
  try {
    // Check if PID directory exists
    if (!fs.existsSync(pidDir)) {
      console.log('No MCP servers are running (PID directory not found)');
      return [];
    }

    // Read all PID files
    const pidFiles = fs.readdirSync(pidDir).filter(file => file.endsWith('.pid'));

    if (pidFiles.length === 0) {
      console.log('No MCP servers are running (no PID files found)');
      return [];
    }

    // Check each server
    const statusPromises = pidFiles.map(async (pidFile) => {
      const serverName = pidFile.replace('.pid', '');
      const pidData = fs.readFileSync(path.join(pidDir, pidFile), 'utf8');

      return await checkServerStatus(serverName, pidData);
    });

    const statuses = await Promise.all(statusPromises);

    // Display status information
    console.log('MCP Servers Status:');
    console.log('====================');

    statuses.forEach(status => {
      console.log(`\n${status.name}:`);

      if (status.error) {
        console.log(`  Error: ${status.error}`);
        return;
      }

      console.log(`  Running: ${status.isRunning ? 'Yes' : 'No'}`);
      console.log(`  PID: ${status.pid}`);
      console.log(`  Port: ${status.port}`);

      if (status.healthStatus !== 'N/A') {
        console.log(`  Health: ${status.healthStatus}`);
      }

      console.log(`  Started: ${status.startTime}`);
      console.log(`  Uptime: ${status.uptime}`);
    });

    return statuses;
  } catch (error) {
    logger.error(`Error checking MCP servers status: ${error.message}`);
    console.error(`Error: ${error.message}`);
    return [];
  }
};

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAllServers();
}

export {
  checkServerStatus,
  checkAllServers
};