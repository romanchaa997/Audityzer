/**
 * Mock dApp Server
 *
 * A simple Express server to serve the mock dApp for testing MetaMask integration.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the src directory
app.use(express.static(path.join(__dirname)));

// Default route serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Mock dApp server running at http://localhost:${port}`);
});
