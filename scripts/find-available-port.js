const net = require('net');

function findAvailablePort(startPort, callback) {
  const server = net.createServer();
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // Port is in use, try the next one
      findAvailablePort(startPort + 1, callback);
    } else {
      // Some other error occurred
      console.error(`Error checking port ${startPort}:`, err);
      callback(null);
    }
  });
  
  server.listen(startPort, () => {
    // Port is available, close server and return port
    server.close(() => {
      callback(startPort);
    });
  });
}

// Export the function for use in other scripts
module.exports = findAvailablePort;

// If run directly, find and print an available port starting from 5050
if (require.main === module) {
  findAvailablePort(5050, (port) => {
    if (port) {
      process.exit(0);
    } else {
      console.error('Failed to find an available port');
      process.exit(1);
    }
  });
} 