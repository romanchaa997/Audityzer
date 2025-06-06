/**
 * Audityzer Visualization Demo
 *
 * This script demonstrates the visualization capabilities of Audityzer.
 * It generates:
 * 1. Test results dashboard
 * 2. Transaction flow visualization
 * 3. Interactive debugging view
 */

const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Import visualization components
const {
  DashboardRenderer,
  TransactionFlowVisualizer,
  DebugTools,
  generateDashboard,
  visualizeTransactionFlow,
} = require('../src/core/visualization');

// Sample test results data
const sampleTestResults = {
  summary: {
    totalTests: 42,
    passed: 37,
    failed: 5,
    duration: '2m 15s',
  },
  vulnerabilities: [
    {
      id: 'VULN-001',
      title: 'Unprotected Wallet Connection',
      description:
        'The wallet connection function does not properly validate the origin, which could lead to phishing attacks.',
      severity: 'High',
      location: 'src/wallet-connector.js:45',
    },
    {
      id: 'VULN-002',
      title: 'Unchecked Transaction Parameters',
      description:
        'Transaction parameters are not properly validated before sending to the wallet.',
      severity: 'Critical',
      location: 'src/transaction-handler.js:78',
    },
    {
      id: 'VULN-003',
      title: 'Insufficient Error Handling',
      description: 'Error cases from wallet connection are not properly handled.',
      severity: 'Medium',
      location: 'src/error-handler.js:23',
    },
  ],
  recommendations: [
    {
      title: 'Implement Origin Validation',
      description: 'Add proper origin validation to prevent phishing attacks.',
      priority: 'High',
      code: `// Add this to wallet-connector.js
function validateOrigin(origin) {
  const allowedOrigins = ['https://yourdapp.com', 'https://app.yourdapp.com'];
  return allowedOrigins.includes(origin);
}`,
    },
    {
      title: 'Add Transaction Parameter Validation',
      description: 'Implement thorough validation for all transaction parameters.',
      priority: 'Critical',
      code: `// Add validation to transaction-handler.js
function validateTransactionParams(params) {
  if (!params.to || !ethers.utils.isAddress(params.to)) {
    throw new Error('Invalid recipient address');
  }
  
  if (params.value && !ethers.BigNumber.from(params.value).gte(0)) {
    throw new Error('Invalid transaction value');
  }
  
  // Additional validation...
}`,
    },
  ],
  coverage: {
    wallets: 85,
    transactions: 72,
    networks: 90,
    errorHandlers: 65,
  },
  timeline: [
    { timestamp: Date.now() - 135000, event: 'Test Suite Started' },
    { timestamp: Date.now() - 120000, event: 'Wallet Connection Tests Started' },
    { timestamp: Date.now() - 90000, event: 'Transaction Tests Started' },
    { timestamp: Date.now() - 60000, event: 'Error Handling Tests Started' },
    { timestamp: Date.now() - 30000, event: 'Network Switching Tests Started' },
    { timestamp: Date.now() - 5000, event: 'Test Suite Completed' },
  ],
};

// Sample transaction flow data
const sampleTransactionFlow = {
  title: 'Token Transfer Flow',
  description: 'Flow of a token transfer transaction from initiation to confirmation',
  steps: [
    {
      name: 'Connect Wallet',
      description: 'User connects MetaMask wallet to the dApp',
      status: 'success',
    },
    {
      name: 'Approve Token',
      description: 'User approves the token for transfer',
      status: 'success',
    },
    {
      name: 'Initiate Transfer',
      description: 'User initiates token transfer',
      status: 'success',
    },
    {
      name: 'Sign Transaction',
      description: 'User signs the transaction in MetaMask',
      status: 'success',
    },
    {
      name: 'Submit Transaction',
      description: 'Transaction submitted to network',
      status: 'warning',
      warning: 'High gas price detected',
    },
    {
      name: 'Confirm Transaction',
      description: 'Transaction confirmed on the blockchain',
      status: 'error',
      error: 'Confirmation took longer than expected (30+ seconds)',
    },
  ],
  duration: '45.2s',
  gasUsed: '85,420',
  networkInfo: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    blockNumber: 19250348,
  },
};

// Test: Generate test results dashboard
test('Generate test results dashboard', async () => {
  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, '../reports/dashboards');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create dashboard renderer
  const dashboardRenderer = new DashboardRenderer({
    outputDir,
    darkMode: true,
    exportFormats: ['html', 'svg', 'png'],
  });

  // Generate dashboard
  const dashboardPath = await dashboardRenderer.generateTestResultsDashboard(
    sampleTestResults,
    'visualization-demo-dashboard'
  );

  console.log(`Dashboard generated at: ${dashboardPath}`);

  // Also demonstrate the simplified function
  const simpleDashboardPath = await generateDashboard(sampleTestResults, {
    outputDir,
    outputFilename: 'simple-visualization-demo-dashboard',
    darkMode: false,
  });

  console.log(`Simple dashboard generated at: ${simpleDashboardPath}`);
});

// Test: Generate transaction flow visualization
test('Generate transaction flow visualization', async () => {
  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, '../reports/dashboards');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create flow visualizer
  const flowVisualizer = new TransactionFlowVisualizer({
    outputDir,
    darkMode: true,
  });

  // Generate flow visualization
  const flowPath = await flowVisualizer.visualizeFlow(
    sampleTransactionFlow,
    'visualization-demo-flow'
  );

  console.log(`Flow visualization generated at: ${flowPath}`);

  // Also demonstrate the simplified function
  const simpleFlowPath = await visualizeTransactionFlow(sampleTransactionFlow, {
    outputDir,
    outputFilename: 'simple-visualization-demo-flow',
    darkMode: false,
  });

  console.log(`Simple flow visualization generated at: ${simpleFlowPath}`);
});

// Test: Generate debug visualization
test('Generate debug visualization', async () => {
  // Create debug tools instance
  const debugTools = new DebugTools({
    outputDir: path.join(__dirname, '../reports/debugger'),
    captureScreenshots: true,
    logLevel: 'verbose',
  });

  // Start debug session
  await debugTools.startSession('debug-demo-session');

  // Log some debug events
  await debugTools.logEvent('Wallet Connection', 'Started wallet connection process');
  await debugTools.logEvent('Wallet Connection', 'MetaMask detected', 'info');
  await debugTools.logEvent('Wallet Connection', 'Connection successful', 'success');

  await debugTools.logEvent('Transaction', 'Started transaction preparation');
  await debugTools.logEvent('Transaction', 'Gas estimation successful', 'info');

  // Log an error with stack trace
  try {
    throw new Error('Transaction parameter validation failed');
  } catch (error) {
    await debugTools.logError('Transaction', error);
  }

  // Add custom data
  await debugTools.addData('Transaction Parameters', {
    from: '0x1234...5678',
    to: '0xabcd...ef01',
    value: '0.1 ETH',
    gasLimit: 21000,
    chainId: 1,
  });

  // End debug session and generate report
  const reportPath = await debugTools.endSession();
  console.log(`Debug report generated at: ${reportPath}`);
});

// This test demonstrates how to use the visualization tools during actual test runs
test('Integrated visualization example with wallet testing', async ({ page }) => {
  // Create debug tools for this test
  const debugTools = new DebugTools({
    outputDir: path.join(__dirname, '../reports/debugger'),
    captureScreenshots: true,
    logLevel: 'verbose',
  });

  // Start debug session
  await debugTools.startSession('wallet-test-debug');

  try {
    // Your actual test code would go here...
    await debugTools.logEvent('Test', 'Navigating to test dApp');
    // await page.goto('https://example.com');

    await debugTools.logEvent('Test', 'Clicking connect wallet button');
    // await page.click('#connect-wallet');

    await debugTools.logEvent('Test', 'Wallet popup detected', 'info');
    // Handle wallet popup...

    // Simulate some test activity
    await debugTools.logEvent('Test', 'Connected to wallet', 'success');
    await debugTools.addData('Wallet Info', {
      address: '0x1234...5678',
      chainId: 1,
      balance: '1.5 ETH',
    });

    // At the end of your test, you would have real transaction flow data to visualize
    const flowData = {
      /* This would be real data from your test */
      title: 'Token Transfer Flow (from test)',
      steps: [
        { name: 'Connect Wallet', status: 'success' },
        { name: 'Approve Token', status: 'success' },
        { name: 'Transfer Token', status: 'success' },
      ],
    };

    // Generate flow visualization
    const flowVisualizer = new TransactionFlowVisualizer();
    await flowVisualizer.visualizeFlow(flowData, 'test-flow-visualization');
  } catch (error) {
    // Log any errors
    await debugTools.logError('Test', error);
    throw error;
  } finally {
    // Always end the debug session
    const reportPath = await debugTools.endSession();
    console.log(`Debug report generated at: ${reportPath}`);
  }
});
