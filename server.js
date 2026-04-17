/**
 * Audityzer Web Server
 * Express server for Render deployment
 * Provides endpoints for the Audityzer testing framework,
 * including MetaMask fuzzing tests and other security test infrastructure.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Health check endpoint for K8s liveness/readiness probes (before all other middleware)
const healthResponse = (req, res) => {
  res.json({
    status: 'ok',
    version: '1.1.3',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};
app.get('/health', healthResponse);
app.get('/api/health', healthResponse);

// Parse JSON request bodies
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Serve static files from the public directory (directories may not exist in Docker)
const publicDir = path.join(__dirname, 'public');
const buildClientDir = path.join(__dirname, 'build/client');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}
if (fs.existsSync(buildClientDir)) {
  app.use(express.static(buildClientDir));
}

// Serve the fuzzer test file
app.get('/fuzzer-test.html', (req, res) => {
  const filePath = path.join(__dirname, '../reports/metamask-security/fuzzer-test.html');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Fuzzer test file not found' });
  }
});

// Endpoint to serve metamask-fuzzer.js
app.get('/metamask-fuzzer.js', (req, res) => {
  const filePath = path.join(__dirname, 'public/metamask-fuzzer.js');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Fuzzer file not found' });
  }
});

// Save fuzzing results
app.post('/save-results', (req, res) => {
  const results = req.body;

  try {
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save results to a JSON file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(outputDir, `results-${timestamp}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

    res.json({ success: true, message: 'Results saved successfully', file: outputFile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Audityzer',
    description: 'Comprehensive Web3 Security Analysis Toolkit for DeFi applications and smart contracts',
    version: '1.1.3',
    endpoints: {
      health: '/health',
      api: '/api',
      reports: '/api/reports',
      fuzzer: '/fuzzer-test.html'
    },
    status: 'running'
  });
});

// API routes
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.json({
    message: 'Audityzer API v1',
    endpoints: [
      'GET /api/reports - List all security reports',
      'POST /api/reports - Create a new security report',
      'GET /api/reports/:id - Get a specific report'
    ]
  });
});

// Reports endpoints (with Firebase optional)
apiRouter.get('/reports', async (req, res) => {
  try {
    const reportService = require('./src/core/services/report-service');
    const reports = await reportService.getAllReports();
    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/reports', async (req, res) => {
  try {
    const reportService = require('./src/core/services/report-service');
    const reportId = await reportService.saveReport(req.body);
    res.json({ success: true, reportId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/reports/:id', async (req, res) => {
  try {
    const reportService = require('./src/core/services/report-service');
    const report = await reportService.getReportById(req.params.id);
    res.json({ success: true, report });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

app.use('/api', apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Audityzer Web Service running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`API: http://localhost:${port}/api`);
});

module.exports = app;
