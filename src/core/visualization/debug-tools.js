/**
 * Debug Tools Module
 *
 * Provides interactive debugging tools for Web3 transactions and test execution.
 * Features include:
 * - Real-time transaction logging and visualization
 * - Step-by-step test execution replay
 * - Interactive transaction inspection
 * - Error analysis and suggestion generation
 */

const fs = require('fs-extra');
const path = require('path');
const transactionFlowVisualizer = require('./transaction-flow-visualizer');

// Default configuration
const DEFAULT_CONFIG = {
  logLevel: 'info', // none, error, warn, info, debug, trace
  outputDir: path.join(process.cwd(), 'reports', 'debug'),
  maxTransactions: 1000,
  autoVisualize: true,
  captureStackTraces: true,
  visualizationTheme: 'light',
  autoSaveInterval: 60000, // 1 minute
};

/**
 * Initialize the debug tools module
 * @param {Object} options Configuration options
 * @returns {Object} Initialized debug tools configuration
 */
function initialize(options = {}) {
  const config = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  // Ensure output directory exists
  fs.ensureDirSync(config.outputDir);

  return { config };
}

/**
 * Create a new debugging session
 * @param {Object} testContext Test context for debugging
 * @param {Object} options Debugging options
 * @returns {Object} Debug session instance
 */
function createSession(testContext, options = {}) {
  const sessionConfig = options.config || initialize().config;
  const sessionId = options.sessionId || `debug-${Date.now()}`;
  const sessionDir = path.join(sessionConfig.outputDir, sessionId);

  // Ensure session directory exists
  fs.ensureDirSync(sessionDir);

  // Initialize session state
  const session = {
    id: sessionId,
    config: sessionConfig,
    testContext: testContext || {},
    transactions: [],
    steps: [],
    logs: [],
    errors: [],
    startTime: Date.now(),
    lastSaveTime: Date.now(),
    outputDir: sessionDir,
    isActive: true,
  };

  // Create initial session file
  saveSession(session);

  // Set up auto-save if enabled
  if (sessionConfig.autoSaveInterval > 0) {
    session.saveInterval = setInterval(() => {
      if (session.isActive) {
        saveSession(session);
      } else {
        clearInterval(session.saveInterval);
      }
    }, sessionConfig.autoSaveInterval);
  }

  // Return session API
  return {
    // Log methods
    log: (message, level = 'info') => logMessage(session, message, level),
    error: (error, context) => logError(session, error, context),
    warn: message => logMessage(session, message, 'warn'),
    debug: message => logMessage(session, message, 'debug'),
    trace: message => logMessage(session, message, 'trace'),

    // Transaction tracking
    trackTransaction: transaction => trackTransaction(session, transaction),
    updateTransaction: (txId, updatedProps) => updateTransaction(session, txId, updatedProps),

    // Test step tracking
    startStep: (stepName, params) => startStep(session, stepName, params),
    endStep: (stepId, result) => endStep(session, stepId, result),

    // Visualization
    visualize: options => visualizeSession(session, options),
    visualizeTransactions: options => visualizeTransactions(session, options),

    // Session management
    save: () => saveSession(session),
    end: () => endSession(session),

    // Data access
    getTransactions: () => session.transactions,
    getSteps: () => session.steps,
    getLogs: () => session.logs,
    getErrors: () => session.errors,
    getSessionInfo: () => getSessionInfo(session),

    // Session ID for reference
    id: sessionId,
  };
}

/**
 * Log a message to the debug session
 * @param {Object} session Debug session
 * @param {string} message Message to log
 * @param {string} level Log level
 * @returns {Object} Created log entry
 */
function logMessage(session, message, level = 'info') {
  // Check if log level is enabled
  const logLevels = { none: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 };
  const configLevel = logLevels[session.config.logLevel] || 3;
  const messageLevel = logLevels[level] || 3;

  if (messageLevel > configLevel) {
    return null; // Log level not enabled
  }

  // Create log entry
  const log = {
    id: `log-${session.logs.length + 1}`,
    timestamp: Date.now(),
    level,
    message: typeof message === 'string' ? message : JSON.stringify(message),
  };

  // Add to session logs
  session.logs.push(log);

  // Console output if needed
  if (session.config.consoleOutput !== false) {
    const logFn = console[level] || console.log;
    logFn(`[${level.toUpperCase()}] ${log.message}`);
  }

  return log;
}

/**
 * Log an error to the debug session
 * @param {Object} session Debug session
 * @param {Error|string} error Error to log
 * @param {Object} context Additional context
 * @returns {Object} Created error entry
 */
function logError(session, error, context = {}) {
  // Create error entry
  const errorEntry = {
    id: `error-${session.errors.length + 1}`,
    timestamp: Date.now(),
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error && session.config.captureStackTraces ? error.stack : null,
    context,
  };

  // Add to session errors and logs
  session.errors.push(errorEntry);

  // Also add to general logs
  logMessage(session, errorEntry.message, 'error');

  return errorEntry;
}

/**
 * Track a transaction in the debug session
 * @param {Object} session Debug session
 * @param {Object} transaction Transaction to track
 * @returns {Object} Tracked transaction
 */
function trackTransaction(session, transaction) {
  // Enforce maximum transactions limit
  if (session.transactions.length >= session.config.maxTransactions) {
    logMessage(
      session,
      `Reached maximum transaction limit (${session.config.maxTransactions})`,
      'warn'
    );
    return null;
  }

  // Create transaction entry
  const tx = {
    id: transaction.id || `tx-${session.transactions.length + 1}`,
    timestamp: transaction.timestamp || Date.now(),
    ...transaction,
  };

  // Add to session transactions
  session.transactions.push(tx);

  // Create visualization if auto-visualize is enabled
  if (session.config.autoVisualize && session.transactions.length > 0) {
    visualizeTransactions(session, { generateFile: true });
  }

  return tx;
}

/**
 * Update an existing transaction
 * @param {Object} session Debug session
 * @param {string} txId Transaction ID to update
 * @param {Object} updatedProps Updated properties
 * @returns {Object} Updated transaction
 */
function updateTransaction(session, txId, updatedProps) {
  // Find transaction
  const txIndex = session.transactions.findIndex(tx => tx.id === txId);
  if (txIndex === -1) {
    logMessage(session, `Transaction not found: ${txId}`, 'warn');
    return null;
  }

  // Update transaction
  session.transactions[txIndex] = {
    ...session.transactions[txIndex],
    ...updatedProps,
    lastUpdated: Date.now(),
  };

  return session.transactions[txIndex];
}

/**
 * Start a test step in the debug session
 * @param {Object} session Debug session
 * @param {string} stepName Name of the step
 * @param {Object} params Step parameters
 * @returns {Object} Created step
 */
function startStep(session, stepName, params = {}) {
  // Create step entry
  const step = {
    id: `step-${session.steps.length + 1}`,
    name: stepName,
    params,
    startTime: Date.now(),
    status: 'running',
    endTime: null,
    duration: null,
    result: null,
  };

  // Add to session steps
  session.steps.push(step);

  // Log step start
  logMessage(session, `Starting step: ${stepName}`, 'debug');

  return step;
}

/**
 * End a test step in the debug session
 * @param {Object} session Debug session
 * @param {string} stepId Step ID to end
 * @param {Object} result Step result
 * @returns {Object} Updated step
 */
function endStep(session, stepId, result = {}) {
  // Find step
  const stepIndex = session.steps.findIndex(step => step.id === stepId);
  if (stepIndex === -1) {
    logMessage(session, `Step not found: ${stepId}`, 'warn');
    return null;
  }

  // Update step
  const endTime = Date.now();
  const startTime = session.steps[stepIndex].startTime;

  session.steps[stepIndex] = {
    ...session.steps[stepIndex],
    endTime,
    duration: endTime - startTime,
    result,
    status: result.error ? 'failed' : 'completed',
  };

  // Log step end
  const step = session.steps[stepIndex];
  logMessage(session, `Step ${step.name} ${step.status} in ${step.duration}ms`, 'debug');

  // If there was an error, log it
  if (result.error) {
    logError(session, result.error, { stepId, stepName: step.name });
  }

  return session.steps[stepIndex];
}

/**
 * Visualize the current debug session
 * @param {Object} session Debug session
 * @param {Object} options Visualization options
 * @returns {Object} Visualization result
 */
function visualizeSession(session, options = {}) {
  const results = {};

  // Generate transaction flow visualization
  if (session.transactions.length > 0) {
    results.transactions = visualizeTransactions(session, options);
  }

  // Generate debug dashboard
  results.dashboard = generateDebugDashboard(session, options);

  return results;
}

/**
 * Visualize transactions in the debug session
 * @param {Object} session Debug session
 * @param {Object} options Visualization options
 * @returns {Object} Visualization result
 */
function visualizeTransactions(session, options = {}) {
  // Set default options
  const visualizationOptions = {
    title: options.title || `${session.testContext.name || 'Debug Session'} - Transactions`,
    filename: options.filename || `transactions-${session.id}.html`,
    outputDir: options.outputDir || session.outputDir,
    theme: options.theme || session.config.visualizationTheme,
    generateFile: options.generateFile !== false,
    ...options,
  };

  // Generate visualization using transactionFlowVisualizer
  return transactionFlowVisualizer.generate(session.transactions, visualizationOptions);
}

/**
 * Generate a debug dashboard for the session
 * @param {Object} session Debug session
 * @param {Object} options Dashboard options
 * @returns {string} Path to the generated dashboard HTML
 */
function generateDebugDashboard(session, options = {}) {
  // Set default options
  const dashboardOptions = {
    title: options.title || `${session.testContext.name || 'Debug Session'} - Dashboard`,
    filename: options.filename || `dashboard-${session.id}.html`,
    outputDir: options.outputDir || session.outputDir,
    theme: options.theme || session.config.visualizationTheme,
    ...options,
  };

  // Generate HTML content
  const html = generateDebugDashboardHTML(session, dashboardOptions);

  // Write to file if needed
  let outputPath = null;
  if (dashboardOptions.generateFile !== false) {
    outputPath = path.join(dashboardOptions.outputDir, dashboardOptions.filename);
    fs.ensureDirSync(dashboardOptions.outputDir);
    fs.writeFileSync(outputPath, html);
    logMessage(session, `Debug dashboard generated at: ${outputPath}`, 'info');
  }

  return {
    html,
    path: outputPath,
  };
}

/**
 * Save the debug session to disk
 * @param {Object} session Debug session to save
 * @returns {string} Path to the saved session file
 */
function saveSession(session) {
  // Update lastSaveTime
  session.lastSaveTime = Date.now();

  // Prepare session data for saving
  const sessionData = {
    id: session.id,
    testContext: session.testContext,
    transactions: session.transactions,
    steps: session.steps,
    logs: session.logs,
    errors: session.errors,
    startTime: session.startTime,
    lastSaveTime: session.lastSaveTime,
    isActive: session.isActive,
  };

  // Save session data
  const sessionFile = path.join(session.outputDir, 'session.json');
  fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));

  return sessionFile;
}

/**
 * End the debug session
 * @param {Object} session Debug session to end
 * @returns {Object} Final session info
 */
function endSession(session) {
  // Update session status
  session.isActive = false;
  session.endTime = Date.now();
  session.duration = session.endTime - session.startTime;

  // Log session end
  logMessage(session, `Debug session ended after ${session.duration}ms`, 'info');

  // Save final session state
  saveSession(session);

  // Clean up interval if exists
  if (session.saveInterval) {
    clearInterval(session.saveInterval);
  }

  // Generate final visualizations
  visualizeSession(session, { generateFile: true });

  return getSessionInfo(session);
}

/**
 * Get session summary information
 * @param {Object} session Debug session
 * @returns {Object} Session info
 */
function getSessionInfo(session) {
  return {
    id: session.id,
    startTime: session.startTime,
    endTime: session.endTime || null,
    duration: session.endTime
      ? session.endTime - session.startTime
      : Date.now() - session.startTime,
    isActive: session.isActive,
    transactionCount: session.transactions.length,
    stepCount: session.steps.length,
    logCount: session.logs.length,
    errorCount: session.errors.length,
    outputDir: session.outputDir,
  };
}

/**
 * Generate debug dashboard HTML
 * @param {Object} session Debug session
 * @param {Object} options Dashboard options
 * @returns {string} HTML content
 */
function generateDebugDashboardHTML(session, options) {
  const { title, theme = 'light' } = options;
  const sessionInfo = getSessionInfo(session);

  // Generate step execution timeline
  const timelineItems = session.steps
    .map(step => {
      const startOffset = step.startTime - session.startTime;
      const duration =
        step.duration || (step.status === 'running' ? Date.now() - step.startTime : 0);
      const width = Math.max(0.5, Math.min(100, (duration / sessionInfo.duration) * 100));
      const left = Math.min(100, (startOffset / sessionInfo.duration) * 100);

      return `
      <div class="timeline-item ${step.status}" style="left: ${left}%; width: ${width}%;" title="${step.name} (${step.status})">
        <div class="timeline-item-label">${step.name}</div>
      </div>
    `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        :root {
          --bg-color: ${theme === 'dark' ? '#121212' : '#ffffff'};
          --text-color: ${theme === 'dark' ? '#e0e0e0' : '#333333'};
          --border-color: ${theme === 'dark' ? '#444' : '#ddd'};
          --card-bg: ${theme === 'dark' ? '#1e1e1e' : '#f8f9fa'};
          --heading-color: ${theme === 'dark' ? '#81a1c1' : '#0066cc'};
          --success-color: #40c057;
          --error-color: #fa5252;
          --warning-color: #fab005;
          --info-color: #15aabf;
          --running-color: #4c6ef5;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.5;
          color: var(--text-color);
          background-color: var(--bg-color);
          margin: 0;
          padding: 20px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .header {
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 15px;
        }
        
        .header h1 {
          margin: 0;
          color: var(--heading-color);
        }
        
        .card {
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .card h2 {
          margin-top: 0;
          margin-bottom: 15px;
          color: var(--heading-color);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 10px;
        }
        
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }
        
        .stat-card {
          text-align: center;
          padding: 15px;
          background: ${theme === 'dark' ? '#252525' : '#ffffff'};
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          color: ${theme === 'dark' ? '#aaa' : '#666'};
        }
        
        .timeline-container {
          position: relative;
          height: 100px;
          background: ${theme === 'dark' ? '#252525' : '#f8f9fa'};
          border-radius: 6px;
          overflow: hidden;
          margin-top: 20px;
        }
        
        .timeline-item {
          position: absolute;
          height: 20px;
          top: 30px;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 2px 6px;
          box-sizing: border-box;
        }
        
        .timeline-item.completed {
          background-color: var(--success-color);
          color: white;
        }
        
        .timeline-item.failed {
          background-color: var(--error-color);
          color: white;
        }
        
        .timeline-item.running {
          background-color: var(--running-color);
          color: white;
          animation: pulse 2s infinite;
        }
        
        .timeline-item-label {
          font-size: 10px;
          position: absolute;
          top: 100%;
          left: 0;
          transform: rotate(-30deg);
          transform-origin: top left;
          margin-top: 5px;
        }
        
        .log-container {
          max-height: 300px;
          overflow-y: auto;
          background: ${theme === 'dark' ? '#252525' : '#ffffff'};
          border-radius: 6px;
          padding: 10px;
        }
        
        .log-entry {
          margin-bottom: 5px;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--border-color);
          font-family: monospace;
          font-size: 13px;
        }
        
        .log-timestamp {
          color: ${theme === 'dark' ? '#aaa' : '#666'};
          margin-right: 10px;
        }
        
        .log-level {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 11px;
          margin-right: 10px;
        }
        
        .log-level.error {
          background-color: rgba(250, 82, 82, 0.2);
          color: var(--error-color);
        }
        
        .log-level.warn {
          background-color: rgba(250, 176, 5, 0.2);
          color: var(--warning-color);
        }
        
        .log-level.info {
          background-color: rgba(21, 170, 191, 0.2);
          color: var(--info-color);
        }
        
        .log-level.debug, .log-level.trace {
          background-color: rgba(76, 110, 245, 0.2);
          color: var(--running-color);
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 20px;
        }
        
        .tab {
          padding: 10px 20px;
          cursor: pointer;
          border: none;
          background: none;
          color: var(--text-color);
        }
        
        .tab.active {
          border-bottom: 3px solid var(--heading-color);
          color: var(--heading-color);
        }
        
        .tab-content {
          display: none;
        }
        
        .tab-content.active {
          display: block;
        }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          color: ${theme === 'dark' ? '#777' : '#888'};
          font-size: 0.9em;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        
        th {
          font-weight: 600;
          background-color: ${theme === 'dark' ? '#252525' : '#f1f3f5'};
        }
        
        .error-card {
          background-color: rgba(250, 82, 82, 0.1);
          border-left: 4px solid var(--error-color);
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 4px;
        }
        
        .error-message {
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .error-stack {
          font-family: monospace;
          font-size: 12px;
          white-space: pre-wrap;
          background: ${theme === 'dark' ? '#252525' : '#f8f9fa'};
          padding: 10px;
          border-radius: 4px;
          overflow-x: auto;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
          <p>Session ID: ${session.id}</p>
          <p>Started: ${new Date(session.startTime).toLocaleString()}</p>
          <p>Status: ${session.isActive ? 'Active' : 'Completed'}</p>
        </div>
        
        <div class="card">
          <h2>Session Overview</h2>
          <div class="stats-container">
            <div class="stat-card">
              <div class="stat-value">${sessionInfo.transactionCount}</div>
              <div class="stat-label">Transactions</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${sessionInfo.stepCount}</div>
              <div class="stat-label">Steps</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${sessionInfo.errorCount}</div>
              <div class="stat-label">Errors</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${sessionInfo.logCount}</div>
              <div class="stat-label">Log Entries</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${formatDuration(sessionInfo.duration)}</div>
              <div class="stat-label">Duration</div>
            </div>
          </div>
          
          <h3>Execution Timeline</h3>
          <div class="timeline-container">
            ${timelineItems}
          </div>
        </div>
        
        <div class="tabs">
          <button class="tab active" data-tab="steps">Steps</button>
          <button class="tab" data-tab="transactions">Transactions</button>
          <button class="tab" data-tab="errors">Errors</button>
          <button class="tab" data-tab="logs">Logs</button>
        </div>
        
        <div class="tab-content active" id="steps-tab">
          <div class="card">
            <h2>Test Steps</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${session.steps
                  .map(
                    step => `
                  <tr>
                    <td>${step.name}</td>
                    <td>${step.status}</td>
                    <td>${new Date(step.startTime).toLocaleString()}</td>
                    <td>${step.duration ? formatDuration(step.duration) : 'Running...'}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="tab-content" id="transactions-tab">
          <div class="card">
            <h2>Transactions</h2>
            ${
              session.transactions.length > 0
                ? `<table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  ${session.transactions
                    .map(
                      tx => `
                    <tr>
                      <td>${tx.id}</td>
                      <td>${tx.from || '-'}</td>
                      <td>${tx.to || '-'}</td>
                      <td>${tx.value || '0'} ${tx.token || ''}</td>
                      <td>${tx.status || 'pending'}</td>
                      <td>${new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                  `
                    )
                    .join('')}
                </tbody>
              </table>`
                : '<p>No transactions recorded in this session.</p>'
            }
          </div>
        </div>
        
        <div class="tab-content" id="errors-tab">
          <div class="card">
            <h2>Errors</h2>
            ${
              session.errors.length > 0
                ? session.errors
                    .map(
                      error => `
                <div class="error-card">
                  <div class="error-message">${error.message}</div>
                  <div>Timestamp: ${new Date(error.timestamp).toLocaleString()}</div>
                  ${error.context ? `<div>Context: ${JSON.stringify(error.context)}</div>` : ''}
                  ${error.stack ? `<div class="error-stack">${error.stack}</div>` : ''}
                </div>
              `
                    )
                    .join('')
                : '<p>No errors recorded in this session.</p>'
            }
          </div>
        </div>
        
        <div class="tab-content" id="logs-tab">
          <div class="card">
            <h2>Logs</h2>
            <div class="log-container">
              ${session.logs
                .map(
                  log => `
                <div class="log-entry">
                  <span class="log-timestamp">${new Date(log.timestamp).toLocaleTimeString()}</span>
                  <span class="log-level ${log.level}">${log.level.toUpperCase()}</span>
                  <span class="log-message">${log.message}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Web3FuzzForge Debug Tools</p>
        </div>
      </div>
      
      <script>
        // Tab switching functionality
        document.querySelectorAll('.tab').forEach(tab => {
          tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
          });
        });
        
        // Auto-refresh for active sessions
        ${
          session.isActive
            ? `
        const isActive = ${session.isActive};
        
        if (isActive) {
          setInterval(() => {
            location.reload();
          }, 10000); // Refresh every 10 seconds
        }
        `
            : ''
        }
      </script>
    </body>
    </html>
  `;
}

/**
 * Format duration in milliseconds to a readable string
 * @param {number} ms Duration in milliseconds
 * @returns {string} Formatted duration
 */
function formatDuration(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(1);
    return `${minutes}m ${seconds}s`;
  }
}

module.exports = {
  initialize,
  createSession,
};
