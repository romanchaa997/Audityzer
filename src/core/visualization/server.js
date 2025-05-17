/**
 * Visualization Server
 *
 * Provides a web server for real-time visualization of test results,
 * transaction flows, and interactive debugging.
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs-extra');
const dashboardRenderer = require('./dashboard-renderer');
const transactionFlowVisualizer = require('./transaction-flow-visualizer');
const debugTools = require('./debug-tools');

// Configuration
const DEFAULT_PORT = 3000;
const DEFAULT_HOST = 'localhost';

/**
 * Start the visualization server
 * @param {Object} options Server configuration options
 * @returns {Object} Server instance
 */
function startServer(options = {}) {
  const config = {
    port: options.port || process.env.VIZ_PORT || DEFAULT_PORT,
    host: options.host || process.env.VIZ_HOST || DEFAULT_HOST,
    reportsDir: options.reportsDir || path.join(process.cwd(), 'reports'),
    enableRealtime: options.enableRealtime !== false,
    theme: options.theme || 'light',
    ...options,
  };

  // Create Express app
  const app = express();
  const server = http.createServer(app);

  // Set up Socket.io for real-time updates if enabled
  let io;
  if (config.enableRealtime) {
    io = socketIo(server);
    setupSocketIO(io, config);
  }

  // Serve static assets
  app.use('/static', express.static(path.join(__dirname, '../../web-ui')));

  // Enable JSON parsing for API endpoints
  app.use(express.json());

  // API routes
  setupApiRoutes(app, config);

  // Home page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../web-ui/index.html'));
  });

  // Dashboard page
  app.get('/dashboard', (req, res) => {
    const testResults = loadLatestTestResults(config.reportsDir);
    const dashboard = dashboardRenderer.generateDashboardHTML(testResults, {
      title: 'Audityzer Test Results',
      theme: config.theme,
    });
    res.send(dashboard);
  });

  // Flow diagram page
  app.get('/flow', (req, res) => {
    const transactions = loadLatestTransactions(config.reportsDir);
    if (!transactions || transactions.length === 0) {
      return res.send(`
        <html>
          <body>
            <h1>No Transaction Data</h1>
            <p>No transaction data available to visualize.</p>
            <p><a href="/">Back to Home</a></p>
          </body>
        </html>
      `);
    }

    const result = transactionFlowVisualizer.generate(transactions, {
      title: 'Transaction Flow Diagram',
      theme: config.theme,
      generateFile: false,
    });

    res.send(result.html);
  });

  // Debug dashboard page
  app.get('/debug/:sessionId?', (req, res) => {
    const sessionId = req.params.sessionId;
    let sessionData;

    if (sessionId) {
      // Load specific session
      const sessionPath = path.join(config.reportsDir, 'debug', sessionId, 'session.json');
      if (fs.existsSync(sessionPath)) {
        sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
      } else {
        return res.status(404).send(`
          <html>
            <body>
              <h1>Session Not Found</h1>
              <p>Debug session with ID "${sessionId}" not found.</p>
              <p><a href="/">Back to Home</a></p>
            </body>
          </html>
        `);
      }
    } else {
      // Find latest session
      sessionData = findLatestDebugSession(config.reportsDir);
      if (!sessionData) {
        return res.send(`
          <html>
            <body>
              <h1>No Debug Sessions</h1>
              <p>No debug sessions available to visualize.</p>
              <p><a href="/">Back to Home</a></p>
            </body>
          </html>
        `);
      }
    }

    // Create a debug session and visualize it
    const tools = debugTools.initialize();
    const session = recreateDebugSession(tools, sessionData);
    const result = session.visualize({
      title: `Debug Session: ${sessionData.id}`,
      theme: config.theme,
      generateFile: false,
    });

    res.send(result.dashboard.html);
  });

  // Start the server
  server.listen(config.port, config.host, () => {
    console.log(`Visualization server running at http://${config.host}:${config.port}`);
  });

  return { app, server, io, config };
}

/**
 * Set up API routes
 * @param {Object} app Express app
 * @param {Object} config Server configuration
 */
function setupApiRoutes(app, config) {
  // Get test results
  app.get('/api/results', (req, res) => {
    try {
      const results = loadAllTestResults(config.reportsDir);
      res.json(results);
    } catch (error) {
      console.error('Error loading test results:', error);
      res.status(500).json({ error: 'Failed to load test results' });
    }
  });

  // Get latest test results
  app.get('/api/results/latest', (req, res) => {
    try {
      const results = loadLatestTestResults(config.reportsDir);
      res.json(results);
    } catch (error) {
      console.error('Error loading latest test results:', error);
      res.status(500).json({ error: 'Failed to load latest test results' });
    }
  });

  // Get transactions
  app.get('/api/transactions', (req, res) => {
    try {
      const transactions = loadAllTransactions(config.reportsDir);
      res.json(transactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
      res.status(500).json({ error: 'Failed to load transactions' });
    }
  });

  // Get debug sessions
  app.get('/api/debug/sessions', (req, res) => {
    try {
      const sessions = findAllDebugSessions(config.reportsDir);
      res.json(sessions);
    } catch (error) {
      console.error('Error loading debug sessions:', error);
      res.status(500).json({ error: 'Failed to load debug sessions' });
    }
  });

  // Get specific debug session
  app.get('/api/debug/sessions/:sessionId', (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const sessionPath = path.join(config.reportsDir, 'debug', sessionId, 'session.json');

      if (!fs.existsSync(sessionPath)) {
        return res.status(404).json({ error: 'Session not found' });
      }

      const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
      res.json(sessionData);
    } catch (error) {
      console.error('Error loading debug session:', error);
      res.status(500).json({ error: 'Failed to load debug session' });
    }
  });

  // Generate dashboard
  app.post('/api/generate/dashboard', (req, res) => {
    try {
      const options = req.body || {};
      const testResults = options.testResults || loadLatestTestResults(config.reportsDir);
      const outputDir = options.outputDir || path.join(config.reportsDir, 'dashboards');

      const dashboard = dashboardRenderer.initialize({ outputDir });
      const result = dashboardRenderer.render(testResults, {
        title: options.title || 'Audityzer Test Results',
        theme: options.theme || config.theme,
        filename: options.filename || `dashboard-${Date.now()}.html`,
      });

      res.json({ success: true, path: result });
    } catch (error) {
      console.error('Error generating dashboard:', error);
      res.status(500).json({ error: 'Failed to generate dashboard' });
    }
  });

  // Generate flow diagram
  app.post('/api/generate/flow', (req, res) => {
    try {
      const options = req.body || {};
      const transactions = options.transactions || loadLatestTransactions(config.reportsDir);
      const outputDir = options.outputDir || path.join(config.reportsDir, 'diagrams');

      if (!transactions || transactions.length === 0) {
        return res.status(400).json({ error: 'No transaction data available' });
      }

      const visualizer = transactionFlowVisualizer.initialize({ outputDir });
      const result = transactionFlowVisualizer.generate(transactions, {
        title: options.title || 'Transaction Flow Diagram',
        theme: options.theme || config.theme,
        diagramType: options.diagramType || 'sequence',
        filename: options.filename || `flow-${Date.now()}.html`,
      });

      res.json({ success: true, path: result.path });
    } catch (error) {
      console.error('Error generating flow diagram:', error);
      res.status(500).json({ error: 'Failed to generate flow diagram' });
    }
  });
}

/**
 * Set up Socket.IO for real-time updates
 * @param {Object} io Socket.IO instance
 * @param {Object} config Server configuration
 */
function setupSocketIO(io, config) {
  io.on('connection', socket => {
    console.log('Client connected');

    // Send initial data
    sendInitialData(socket, config);

    // Handle debug session creation
    socket.on('create_debug_session', data => {
      try {
        const sessionOptions = data || {};
        const tools = debugTools.initialize();
        const session = tools.createSession(sessionOptions.testContext || {}, {
          config: {
            outputDir: path.join(config.reportsDir, 'debug'),
            visualizationTheme: sessionOptions.theme || config.theme,
          },
        });

        socket.emit('debug_session_created', {
          success: true,
          sessionId: session.id,
        });
      } catch (error) {
        console.error('Error creating debug session:', error);
        socket.emit('debug_session_created', {
          success: false,
          error: error.message,
        });
      }
    });

    // Handle tracking transaction
    socket.on('track_transaction', data => {
      try {
        const { sessionId, transaction } = data;
        if (!sessionId || !transaction) {
          return socket.emit('transaction_tracked', {
            success: false,
            error: 'Session ID and transaction are required',
          });
        }

        const sessionPath = path.join(config.reportsDir, 'debug', sessionId, 'session.json');
        if (!fs.existsSync(sessionPath)) {
          return socket.emit('transaction_tracked', {
            success: false,
            error: 'Session not found',
          });
        }

        const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
        const tools = debugTools.initialize();
        const session = recreateDebugSession(tools, sessionData);

        const result = session.trackTransaction(transaction);
        session.save();

        socket.emit('transaction_tracked', {
          success: true,
          transaction: result,
        });
      } catch (error) {
        console.error('Error tracking transaction:', error);
        socket.emit('transaction_tracked', {
          success: false,
          error: error.message,
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Set up watch for real-time updates
    if (config.enableRealtime) {
      setupFileWatchers(socket, config);
    }
  });
}

/**
 * Send initial data to a connected socket
 * @param {Object} socket Socket.IO socket
 * @param {Object} config Server configuration
 */
function sendInitialData(socket, config) {
  try {
    // Send latest test results
    const results = loadLatestTestResults(config.reportsDir);
    socket.emit('test_results', results);

    // Send latest transactions
    const transactions = loadLatestTransactions(config.reportsDir);
    socket.emit('transactions', transactions);

    // Send debug sessions
    const sessions = findAllDebugSessions(config.reportsDir);
    socket.emit('debug_sessions', sessions);
  } catch (error) {
    console.error('Error sending initial data:', error);
  }
}

/**
 * Set up file watchers for real-time updates
 * @param {Object} socket Socket.IO socket
 * @param {Object} config Server configuration
 */
function setupFileWatchers(socket, config) {
  // Placeholder for file watchers
  console.log('Real-time updates enabled');
}

/**
 * Load all test results from reports directory
 * @param {string} reportsDir Reports directory path
 * @returns {Object} All test results
 */
function loadAllTestResults(reportsDir) {
  const resultsDir = reportsDir;

  if (!fs.existsSync(resultsDir)) {
    return { tests: [] };
  }

  const files = fs
    .readdirSync(resultsDir)
    .filter(file => file.endsWith('.json') && !file.includes('config'))
    .map(file => path.join(resultsDir, file))
    .filter(file => fs.statSync(file).isFile());

  if (files.length === 0) {
    return { tests: [] };
  }

  // Load and combine all test results
  const allResults = { tests: [] };

  files.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(data)) {
        allResults.tests.push(...data);
      } else if (data.tests && Array.isArray(data.tests)) {
        allResults.tests.push(...data.tests);
      } else {
        // Try to convert to a test result
        allResults.tests.push({
          id: path.basename(file, '.json'),
          title: data.title || path.basename(file, '.json'),
          status: data.status || 'unknown',
          ...data,
        });
      }
    } catch (error) {
      console.warn(`Error loading test results from ${file}:`, error);
    }
  });

  return allResults;
}

/**
 * Load latest test results
 * @param {string} reportsDir Reports directory path
 * @returns {Object} Latest test results
 */
function loadLatestTestResults(reportsDir) {
  const resultsDir = reportsDir;

  if (!fs.existsSync(resultsDir)) {
    return { tests: [] };
  }

  const files = fs
    .readdirSync(resultsDir)
    .filter(file => file.endsWith('.json') && !file.includes('config'))
    .map(file => path.join(resultsDir, file))
    .filter(file => fs.statSync(file).isFile());

  if (files.length === 0) {
    return { tests: [] };
  }

  // Sort by modification time, newest first
  files.sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());

  // Load latest file
  try {
    const data = JSON.parse(fs.readFileSync(files[0], 'utf8'));
    if (Array.isArray(data)) {
      return { tests: data };
    } else if (data.tests && Array.isArray(data.tests)) {
      return data;
    } else {
      // Convert to test results format
      return {
        tests: [
          {
            id: path.basename(files[0], '.json'),
            title: data.title || path.basename(files[0], '.json'),
            status: data.status || 'unknown',
            ...data,
          },
        ],
      };
    }
  } catch (error) {
    console.error('Error loading latest test results:', error);
    return { tests: [] };
  }
}

/**
 * Load all transactions from reports directory
 * @param {string} reportsDir Reports directory path
 * @returns {Array} All transactions
 */
function loadAllTransactions(reportsDir) {
  const transactions = [];

  // Load transactions from test results
  const results = loadAllTestResults(reportsDir);
  if (results.tests && Array.isArray(results.tests)) {
    results.tests.forEach(test => {
      if (test.transactions && Array.isArray(test.transactions)) {
        transactions.push(...test.transactions);
      }
    });
  }

  // Look for dedicated transaction files
  const txFiles = fs
    .readdirSync(reportsDir)
    .filter(file => file.includes('transaction') && file.endsWith('.json'))
    .map(file => path.join(reportsDir, file))
    .filter(file => fs.statSync(file).isFile());

  txFiles.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(data)) {
        transactions.push(...data);
      } else if (data.transactions && Array.isArray(data.transactions)) {
        transactions.push(...data.transactions);
      }
    } catch (error) {
      console.warn(`Error loading transactions from ${file}:`, error);
    }
  });

  return transactions;
}

/**
 * Load latest transactions
 * @param {string} reportsDir Reports directory path
 * @returns {Array} Latest transactions
 */
function loadLatestTransactions(reportsDir) {
  // First try dedicated transaction files
  const txFiles = fs
    .readdirSync(reportsDir)
    .filter(file => file.includes('transaction') && file.endsWith('.json'))
    .map(file => path.join(reportsDir, file))
    .filter(file => fs.statSync(file).isFile());

  if (txFiles.length > 0) {
    // Sort by modification time, newest first
    txFiles.sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());

    try {
      const data = JSON.parse(fs.readFileSync(txFiles[0], 'utf8'));
      if (Array.isArray(data)) {
        return data;
      } else if (data.transactions && Array.isArray(data.transactions)) {
        return data.transactions;
      }
    } catch (error) {
      console.warn(`Error loading transactions from ${txFiles[0]}:`, error);
    }
  }

  // If no dedicated transaction files, extract from latest test results
  const results = loadLatestTestResults(reportsDir);
  const transactions = [];

  if (results.tests && Array.isArray(results.tests)) {
    results.tests.forEach(test => {
      if (test.transactions && Array.isArray(test.transactions)) {
        transactions.push(...test.transactions);
      }
    });
  }

  return transactions;
}

/**
 * Find all debug sessions
 * @param {string} reportsDir Reports directory path
 * @returns {Array} All debug sessions info
 */
function findAllDebugSessions(reportsDir) {
  const debugDir = path.join(reportsDir, 'debug');

  if (!fs.existsSync(debugDir)) {
    return [];
  }

  const sessionDirs = fs
    .readdirSync(debugDir)
    .filter(dir => dir.startsWith('debug-'))
    .map(dir => path.join(debugDir, dir))
    .filter(dir => fs.statSync(dir).isDirectory());

  const sessions = [];

  sessionDirs.forEach(dir => {
    const sessionFile = path.join(dir, 'session.json');
    if (fs.existsSync(sessionFile)) {
      try {
        const sessionData = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
        sessions.push({
          id: sessionData.id,
          startTime: sessionData.startTime,
          endTime: sessionData.endTime,
          isActive: sessionData.isActive,
          transactionCount: (sessionData.transactions || []).length,
          stepCount: (sessionData.steps || []).length,
          errorCount: (sessionData.errors || []).length,
        });
      } catch (error) {
        console.warn(`Error loading debug session from ${sessionFile}:`, error);
      }
    }
  });

  // Sort by start time, newest first
  sessions.sort((a, b) => b.startTime - a.startTime);

  return sessions;
}

/**
 * Find latest debug session
 * @param {string} reportsDir Reports directory path
 * @returns {Object|null} Latest debug session or null if not found
 */
function findLatestDebugSession(reportsDir) {
  const sessions = findAllDebugSessions(reportsDir);

  if (sessions.length === 0) {
    return null;
  }

  const latestSessionId = sessions[0].id;
  const sessionFile = path.join(reportsDir, 'debug', latestSessionId, 'session.json');

  try {
    return JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
  } catch (error) {
    console.error('Error loading latest debug session:', error);
    return null;
  }
}

/**
 * Recreate a debug session from data
 * @param {Object} tools Debug tools instance
 * @param {Object} sessionData Session data
 * @returns {Object} Debug session instance
 */
function recreateDebugSession(tools, sessionData) {
  const session = tools.createSession(sessionData.testContext || {}, {
    sessionId: sessionData.id,
  });

  // Add transactions
  if (sessionData.transactions && Array.isArray(sessionData.transactions)) {
    sessionData.transactions.forEach(tx => {
      session.trackTransaction(tx);
    });
  }

  // Add steps
  if (sessionData.steps && Array.isArray(sessionData.steps)) {
    sessionData.steps.forEach(step => {
      // Only add completed steps
      if (step.status === 'completed' || step.status === 'failed') {
        const startedStep = session.startStep(step.name, step.params);
        session.endStep(startedStep.id, step.result || {});
      }
    });
  }

  // Add logs
  if (sessionData.logs && Array.isArray(sessionData.logs)) {
    sessionData.logs.forEach(log => {
      session.log(log.message, log.level);
    });
  }

  return session;
}

// Main function to start the server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = {
  startServer,
};
