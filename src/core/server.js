/**
 * Server Management Module
 * 
 * Handles starting, stopping, and managing the development server.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Server process tracking
const servers = new Map();

/**
 * Start a development server
 * 
 * @param {number} port - The port to start the server on
 * @param {string} directory - The directory to serve
 * @param {string} configPath - Path to config file
 */
export function startServer(port = 5050, directory = './public', configPath) {
  try {
    // Check if server is already running
    if (servers.has(port)) {
      console.log(chalk.yellow(`Server is already running on port ${port}`));
      return;
    }

    // Ensure directory exists
    if (!fs.existsSync(directory)) {
      console.log(chalk.yellow(`Directory ${directory} does not exist. Creating it...`));
      fs.mkdirSync(directory, { recursive: true });
    }

    // Create server
    const server = createServer((req, res) => {
      // Basic request handler
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'running',
        port,
        directory,
        time: new Date().toISOString()
      }));
    });

    // Start server
    server.listen(port, () => {
      console.log(chalk.green(`Server started on port ${port}`));
      console.log(chalk.blue(`Serving directory: ${directory}`));
      
      // Store server reference
      servers.set(port, server);
    });

    // Handle errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        const newPort = port + 1;
        console.log(chalk.yellow(`Port ${port} is in use, trying ${newPort}...`));
        startServer(newPort, directory, configPath);
      } else {
        console.error(chalk.red(`Server error: ${err.message}`));
      }
    });
  } catch (error) {
    console.error(chalk.red(`Failed to start server: ${error.message}`));
  }
}

/**
 * Stop a running server
 * 
 * @param {number} port - The port of the server to stop
 */
export function stopServer(port = 5050) {
  try {
    const server = servers.get(port);
    
    if (!server) {
      console.log(chalk.yellow(`No server running on port ${port}`));
      return;
    }

    server.close(() => {
      console.log(chalk.green(`Server on port ${port} stopped`));
      servers.delete(port);
    });
  } catch (error) {
    console.error(chalk.red(`Failed to stop server: ${error.message}`));
  }
}

/**
 * Restart a running server
 * 
 * @param {number} port - The port of the server to restart
 * @param {string} directory - The directory to serve
 * @param {string} configPath - Path to config file
 */
export function restartServer(port = 5050, directory = './public', configPath) {
  try {
    stopServer(port);
    
    // Wait a moment for the port to be released
    setTimeout(() => {
      startServer(port, directory, configPath);
    }, 1000);
  } catch (error) {
    console.error(chalk.red(`Failed to restart server: ${error.message}`));
  }
}

/**
 * Get the status of a server
 * 
 * @param {number} port - The port of the server to check
 */
export function getServerStatus(port = 5050) {
  try {
    const server = servers.get(port);
    
    if (!server) {
      console.log(chalk.yellow(`No server running on port ${port}`));
      return false;
    }

    console.log(chalk.green(`Server is running on port ${port}`));
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to get server status: ${error.message}`));
    return false;
  }
}