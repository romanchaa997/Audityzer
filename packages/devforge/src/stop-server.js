/**
 * Stop Server Script
 * 
 * This script stops the running development server by:
 * 1. Reading the PID from the .server-pid file
 * 2. Killing the process with the appropriate command for the platform
 * 3. Removing the PID file
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Stopping development server...');

// Path to the PID file
const pidFile = path.join(__dirname, '..', '.server-pid');

// Check if server is running
if (!fs.existsSync(pidFile)) {
  console.log('No running server detected.');
  process.exit(0);
}

// Read PID file
try {
  let pid, port;

  try {
    // Try to parse as JSON (new format)
    const data = JSON.parse(fs.readFileSync(pidFile, 'utf8'));
    pid = data.pid;
    port = data.port;
    console.log(`Found server running with PID: ${pid} on port ${port}`);
  } catch (err) {
    // Fall back to old format (just PID)
    pid = fs.readFileSync(pidFile, 'utf8').trim();
    console.log(`Found server running with PID: ${pid} (legacy format)`);
  }

  // Kill process based on platform
  const isWindows = process.platform === 'win32';

  if (isWindows) {
    try {
      execSync(`taskkill /PID ${pid} /F /T`);
      console.log('✅ Successfully stopped server');
    } catch (err) {
      console.log('Server was not running or already stopped');
    }
  } else {
    try {
      process.kill(Number(pid), 'SIGTERM');
      console.log('✅ Successfully stopped server');
    } catch (err) {
      console.log('Server was not running or already stopped');
    }
  }

  // Remove PID file
  fs.unlinkSync(pidFile);
  console.log('✅ Removed server PID file');

  // Check if health endpoint server might be running on port+1
  if (port) {
    const healthPort = parseInt(port) + 1;
    console.log(`Note: Health endpoint on port ${healthPort} should also be stopped`);
  }

} catch (err) {
  console.error(`Error stopping server: ${err.message}`);
  process.exit(1);
}

console.log('✅ Server shutdown complete');