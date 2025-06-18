/**
 * Simple Visualization Demo Script
 * 
 * This script demonstrates how to generate a simple visualization dashboard
 * for Account Abstraction test results.
 */

const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.resolve(__dirname, '../reports/dashboards');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Sample test results
const results = {
  success: true,
  timestamp: new Date().toISOString(),
  chain: 'ethereum',
  target: 'example-dapp',
  addon: 'social-recovery',
  tests: {
    'social-recovery': {
      success: true,
      tests: {
        'setup': { success: true, notes: 'Successfully set up guardians' },
        'recovery': { success: true, notes: 'Successfully executed recovery flow' },
        'thresholdChange': { success: false, notes: 'Failed to change threshold', error: 'Insufficient permissions' },
        'guardianManagement': { success: true, notes: 'Successfully managed guardians' }
      },
      summary: { pass: 3, total: 4, passRate: '75%' }
    }
  },
  vulnerabilities: [
    { type: 'RECOVERY_BYPASS', severity: 'high', description: 'Recovery function does not use a timelock' },
    { type: 'THRESHOLD_VERIFICATION', severity: 'medium', description: 'Threshold verification has an off-by-one error' },
    { type: 'GUARDIAN_REMOVAL', severity: 'low', description: 'Removed guardians can still approve recovery' }
  ],
  recommendations: [
    'Implement a timelock for recovery operations',
    'Fix threshold verification logic',
    'Add a delay period before guardian removals take effect'
  ]
};

// Available themes
const themes = ['light', 'dark'];

// Generate dashboards

for (const theme of themes) {
  
  // Color settings based on theme
  const colors = theme === 'dark' 
    ? { bg: '#1a1a1a', text: '#ffffff', primary: '#3498db', success: '#2ecc71', danger: '#e74c3c' }
    : { bg: '#ffffff', text: '#333333', primary: '#2980b9', success: '#27ae60', danger: '#c0392b' };
  
  // Generate simple HTML dashboard
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Account Abstraction Test Dashboard (${theme})</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: ${colors.bg};
        color: ${colors.text};
      }
      
      h1, h2, h3 {
        color: ${colors.primary};
      }
      
      .card {
        background-color: ${theme === 'dark' ? '#2c2c2c' : '#f8f9fa'};
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }
      
      .success { color: ${colors.success}; }
      .failure { color: ${colors.danger}; }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      table th,
      table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
      }
      
      .badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        color: white;
        font-size: 12px;
      }
      
      .badge-high { background-color: #e74c3c; }
      .badge-medium { background-color: #f39c12; }
      .badge-low { background-color: #3498db; }
      
      footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
        text-align: center;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <h1>Account Abstraction Test Dashboard</h1>
    <p>Generated on: ${new Date().toLocaleString()}</p>
    
    <div class="card">
      <h2>Test Summary</h2>
      <p><strong>Target:</strong> ${results.target}</p>
      <p><strong>Chain:</strong> ${results.chain}</p>
      <p><strong>Status:</strong> <span class="${results.success ? 'success' : 'failure'}">${results.success ? 'Passed' : 'Failed'}</span></p>
      <p><strong>Addon:</strong> ${results.addon}</p>
    </div>
    
    <div class="card">
      <h2>Test Results</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(results.tests['social-recovery'].tests).map(([test, data]) => `
            <tr>
              <td>${test}</td>
              <td><span class="${data.success ? 'success' : 'failure'}">${data.success ? '✓ Pass' : '✗ Fail'}</span></td>
              <td>${data.notes}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="card">
      <h2>Vulnerabilities</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Severity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${results.vulnerabilities.map(vuln => `
            <tr>
              <td>${vuln.type}</td>
              <td><span class="badge badge-${vuln.severity}">${vuln.severity}</span></td>
              <td>${vuln.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="card">
      <h2>Recommendations</h2>
      <ul>
        ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    </div>
    
    <footer>
      Generated by Audityzer Dashboard Demo | ${new Date().getFullYear()}
    </footer>
  </body>
  </html>
  `;
  
  // Write the HTML file
  const htmlPath = path.join(outputDir, `dashboard-${theme}.html`);
  fs.writeFileSync(htmlPath, html);
  
}

// Save the results as JSON
const jsonPath = path.join(outputDir, 'test-results.json');
fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

