/**
 * Bridge Test Dashboard
 *
 * Provides an interactive web dashboard for visualizing bridge security test results.
 * Features:
 * - Summary of test results across protocols
 * - Detailed vulnerability findings
 * - Transaction flow visualization
 * - Risk classification
 */

// Import dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Dashboard configuration
const config = {
  port: process.env.DASHBOARD_PORT || 3000,
  dataDir: path.join(process.cwd(), 'reports'),
  refreshInterval: 60000, // 1 minute
};

// Initialize dashboard server
const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, 'assets')));

// Dashboard home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'dashboard.html'));
});

// API endpoint to get test results
app.get('/api/results', (req, res) => {
  try {
    // Load test results from reports directory
    const results = loadTestResults();
    res.json(results);
  } catch (error) {
    console.error('Error loading test results:', error);
    res.status(500).json({ error: 'Failed to load test results' });
  }
});

// API endpoint to get protocol-specific results
app.get('/api/results/:protocol', (req, res) => {
  try {
    const protocol = req.params.protocol;
    const results = loadTestResults(protocol);

    if (!results) {
      return res.status(404).json({ error: `No results found for protocol: ${protocol}` });
    }

    res.json(results);
  } catch (error) {
    console.error(`Error loading results for ${req.params.protocol}:`, error);
    res.status(500).json({ error: 'Failed to load protocol results' });
  }
});

// API endpoint to get sequence diagram data
app.get('/api/sequence/:testId', (req, res) => {
  try {
    const testId = req.params.testId;
    const sequenceData = loadSequenceDiagram(testId);

    if (!sequenceData) {
      return res.status(404).json({ error: `No sequence diagram found for test: ${testId}` });
    }

    res.json(sequenceData);
  } catch (error) {
    console.error(`Error loading sequence diagram for ${req.params.testId}:`, error);
    res.status(500).json({ error: 'Failed to load sequence diagram' });
  }
});

// Start the server
function startDashboard() {
  app.listen(config.port, () => {
  });
}

/**
 * Loads test results from the reports directory
 * @param {string} protocol Optional protocol name to filter results
 * @returns {Object} Test results data
 */
function loadTestResults(protocol = null) {
  // Create reports directory if it doesn't exist
  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
    return protocol ? null : { protocols: [], summary: { total: 0, vulnerabilities: 0 } };
  }

  // Read report files
  const files = fs
    .readdirSync(config.dataDir)
    .filter(file => file.endsWith('.json'))
    .filter(file => !protocol || file.startsWith(`${protocol}-`));

  if (files.length === 0) {
    return protocol ? null : { protocols: [], summary: { total: 0, vulnerabilities: 0 } };
  }

  // Parse report files
  const results = {
    protocols: [],
    summary: {
      total: 0,
      vulnerabilities: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
    tests: [],
  };

  for (const file of files) {
    const filePath = path.join(config.dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add protocol to list if not already included
    if (!results.protocols.includes(data.protocol)) {
      results.protocols.push(data.protocol);
    }

    // Update summary statistics
    results.summary.total += data.testCount || 0;
    results.summary.vulnerabilities += data.vulnerabilityCount || 0;
    results.summary.critical += data.criticalCount || 0;
    results.summary.high += data.highCount || 0;
    results.summary.medium += data.mediumCount || 0;
    results.summary.low += data.lowCount || 0;

    // Add test details
    results.tests.push(...(data.tests || []));
  }

  // If protocol-specific, just return the first result
  if (protocol && files.length > 0) {
    return JSON.parse(fs.readFileSync(path.join(config.dataDir, files[0]), 'utf8'));
  }

  return results;
}

/**
 * Loads sequence diagram data for a specific test
 * @param {string} testId Test ID to load diagram for
 * @returns {Object|null} Sequence diagram data or null if not found
 */
function loadSequenceDiagram(testId) {
  const sequencePath = path.join(config.dataDir, 'sequences', `${testId}.json`);

  if (!fs.existsSync(sequencePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(sequencePath, 'utf8'));
}

/**
 * Generates a sequence diagram for a test
 * @param {Object} test Test data
 * @returns {Object} Sequence diagram data
 */
function generateSequenceDiagram(test) {
  // Create a sequence diagram representation
  const sequence = {
    id: test.id,
    protocol: test.protocol,
    actors: ['User', 'Source Chain', 'Destination Chain', 'Bridge Contract'],
    messages: [],
  };

  // Add sequence steps based on test type
  if (test.type === 'bridge' && test.transactions) {
    let timeOffset = 0;

    for (const tx of test.transactions) {
      // Add message for transaction
      sequence.messages.push({
        from: tx.from || 'User',
        to: tx.to || 'Source Chain',
        message: tx.description || `Send ${tx.value} ${tx.token}`,
        time: timeOffset,
      });

      timeOffset += 2;

      // If cross-chain, add message for destination chain
      if (tx.crossChain) {
        sequence.messages.push({
          from: 'Source Chain',
          to: 'Bridge Contract',
          message: 'Initiate cross-chain transfer',
          time: timeOffset,
        });

        timeOffset += 3;

        sequence.messages.push({
          from: 'Bridge Contract',
          to: 'Destination Chain',
          message: `Receive ${tx.value} ${tx.token}`,
          time: timeOffset,
        });

        timeOffset += 2;
      }
    }
  }

  return sequence;
}

/**
 * Updates the dashboard with the latest test results
 */
function updateDashboard() {
  // This function would be called periodically to refresh data
  // For now, it just logs a message
}

// Export the dashboard module
module.exports = {
  start: startDashboard,
  update: updateDashboard,
  generateSequenceDiagram,
};

// Start the dashboard if this file is run directly
if (require.main === module) {
  startDashboard();

  // Set up periodic updates
  setInterval(updateDashboard, config.refreshInterval);
}
