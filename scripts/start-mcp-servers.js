/**
 * Start MCP Servers
 * 
 * This script starts all the Model Context Protocol (MCP) servers required for
 * AI model integration with Audityzer.
 */

import { startMcpServer } from '../src/mcp/server.js';
import { MCP_CONFIG } from '../src/mcp/config.js';
import { logger } from '../src/mcp/utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create PID file directory if it doesn't exist
const pidDir = path.join(__dirname, '..', '.pids');
if (!fs.existsSync(pidDir)) {
  fs.mkdirSync(pidDir, { recursive: true });
}

// Save PID to file
const savePid = (serverName, pid, port) => {
  const data = JSON.stringify({
    pid,
    port,
    startTime: Date.now(),
    name: serverName
  });
  
  fs.writeFileSync(path.join(pidDir, `${serverName}.pid`), data);
  logger.info(`${serverName} started with PID: ${pid} on port ${port}`);
};

// Start the main MCP server
const startMainServer = async () => {
  try {
    const port = process.env.MCP_PORT || MCP_CONFIG.DEFAULT_PORT;
    const enableAuth = process.env.MCP_ENABLE_AUTH !== 'false';
    
    logger.info(`Starting main MCP server on port ${port}...`);
    
    const mcpServer = await startMcpServer({
      port,
      enableAuth
    });
    
    // Save PID information
    savePid('mcp-main', process.pid, port);
    
    logger.info(`Main MCP server started successfully on port ${port}`);
    logger.info(`Health endpoint: http://localhost:${port}/health`);
    
    return mcpServer;
  } catch (error) {
    logger.error(`Failed to start main MCP server: ${error.message}`);
    process.exit(1);
  }
};

// Start the file server
const startFileServer = async () => {
  // In a real implementation, you would start a separate file server
  // For this example, we're just logging that it would start
  const port = process.env.MCP_FILE_SERVER_PORT || MCP_CONFIG.FILE_SERVER_PORT;
  
  logger.info(`File server would start on port ${port}`);
  logger.info(`This is a placeholder - implement actual file server as needed`);
  
  // Mock server object
  return {
    port,
    start: async () => logger.info(`Mock file server started on port ${port}`),
    stop: async () => logger.info(`Mock file server stopped`)
  };
};

// Start the database server
const startDbServer = async () => {
  // In a real implementation, you would start a separate database server
  // For this example, we're just logging that it would start
  const port = process.env.MCP_DB_SERVER_PORT || MCP_CONFIG.DB_SERVER_PORT;
  
  logger.info(`Database server would start on port ${port}`);
  logger.info(`This is a placeholder - implement actual database server as needed`);
  
  // Mock server object
  return {
    port,
    start: async () => logger.info(`Mock database server started on port ${port}`),
    stop: async () => logger.info(`Mock database server stopped`)
  };
};

// Start all servers
const startAllServers = async () => {
  try {
    // Start main server
    const mainServer = await startMainServer();
    
    // Start file server
    const fileServer = await startFileServer();
    await fileServer.start();
    
    // Start database server
    const dbServer = await startDbServer();
    await dbServer.start();
    
    logger.info('All MCP servers started successfully');
    
    // Handle process termination
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT signal. Shutting down MCP servers...');
      
      try {
        await mainServer.stop();
        await fileServer.stop();
        await dbServer.stop();
        
        logger.info('All MCP servers stopped successfully');
        process.exit(0);
      } catch (error) {
        logger.error(`Error stopping MCP servers: ${error.message}`);
        process.exit(1);
      }
    });
    
    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM signal. Shutting down MCP servers...');
      
      try {
        await mainServer.stop();
        await fileServer.stop();
        await dbServer.stop();
        
        logger.info('All MCP servers stopped successfully');
        process.exit(0);
      } catch (error) {
        logger.error(`Error stopping MCP servers: ${error.message}`);
        process.exit(1);
      }
    });
    
    return {
      mainServer,
      fileServer,
      dbServer
    };
  } catch (error) {
    logger.error(`Error starting MCP servers: ${error.message}`);
    process.exit(1);
  }
};

// Start servers if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startAllServers();
}

export {
  startMainServer,
  startFileServer,
  startDbServer,
  startAllServers
};