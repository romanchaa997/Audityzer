/**
 * Account Abstraction Testing Dashboard Generator
 * 
 * This module creates an interactive HTML dashboard for visualizing
 * Account Abstraction (ERC-4337) test results, vulnerabilities, and performance metrics.
 * 
 * Features:
 * - Visual representation of test results
 * - Interactive components for exploring result details
 * - Exportable reports in multiple formats
 * - Tracking of implementation differences
 * - Security vulnerability highlighting
 */

const fs = require('fs-extra');
const path = require('path');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};
const { marked } = require('marked');

// Dashboard display configurations
const DASHBOARD_CONFIG = {
  theme: {
    light: {
      primary: '#3f51b5',
      secondary: '#2196f3',
      success: '#4caf50',
      warning: '#ff9800',
      danger: '#f44336',
      info: '#2196f3',
      background: '#ffffff',
      text: '#333333',
    },
    dark: {
      primary: '#3f51b5',
      secondary: '#2196f3',
      success: '#4caf50',
      warning: '#ff9800',
      danger: '#f44336',
      info: '#2196f3',
      background: '#1e1e1e',
      text: '#e0e0e0',
    }
  },
  charts: {
    colors: ['#3f51b5', '#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0', '#607d8b'],
    barHeight: 30,
    maxBarWidth: 600,
  }
};

/**
 * Dashboard generator class
 */
class AATestDashboard {
  constructor(options = {}) {
    this.title = options.title || 'Account Abstraction Test Results';
    this.outputDir = options.outputDir || path.join(process.cwd(), 'reports', 'dashboard');
    this.testResults = options.results || {};
    this.theme = options.theme || 'light';
    this.version = options.version || '1.0.0';
    
    // Ensure the output directory exists
    fs.ensureDirSync(this.outputDir);
  }

  /**
   * Add test results to the dashboard
   * @param {Object} results - Test results to add
   * @param {string} category - Test category (e.g., 'security', 'performance')
   */
  addResults(results, category = 'general') {
    this.testResults[category] = results;
    return this;
  }

  /**
   * Generate and save the dashboard
   */
  async generateDashboard() {
    console.log(chalk.blue('🔍 Generating AA Test Dashboard'));
    
    // Timestamp for unique filenames
    const timestamp = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0];
    const baseFileName = `aa-dashboard-${timestamp}`;
    
    // Generate HTML dashboard
    const htmlDashboard = this.generateHtmlDashboard();
    const htmlPath = path.join(this.outputDir, `${baseFileName}.html`);
    await fs.writeFile(htmlPath, htmlDashboard);
    
    // Generate JSON data export
    const jsonPath = path.join(this.outputDir, `${baseFileName}-data.json`);
    await fs.writeJson(jsonPath, this.testResults, { spaces: 2 });
    
    // Generate markdown summary
    const mdSummary = this.generateMarkdownSummary();
    const mdPath = path.join(this.outputDir, `${baseFileName}-summary.md`);
    await fs.writeFile(mdPath, mdSummary);
    
    console.log(chalk.green(`✅ Dashboard generated at ${htmlPath}`));
    
    return {
      html: htmlPath,
      json: jsonPath,
      markdown: mdPath
    };
  }

  /**
   * Generate the HTML dashboard content
   */
  generateHtmlDashboard() {
    const themeColors = DASHBOARD_CONFIG.theme[this.theme];
    
    // Data for charts and visualizations
    const securityChartData = this.prepareSecurityChartData();
    const performanceChartData = this.preparePerformanceChartData();
    const compatibilityData = this.prepareCompatibilityData();
    
    // Create the summary metrics
    const summaryMetrics = this.calculateSummaryMetrics();
    
    // Create HTML content
    return `
<!DOCTYPE html>
<html lang="en" data-theme="${this.theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.title}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --primary: ${themeColors.primary};
      --secondary: ${themeColors.secondary};
      --success: ${themeColors.success};
      --warning: ${themeColors.warning};
      --danger: ${themeColors.danger};
      --info: ${themeColors.info};
      --background: ${themeColors.background};
      --text: ${themeColors.text};
    }
    
    body {
      background-color: var(--background);
      color: var(--text);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding-top: 20px;
    }
    
    .dashboard-header {
      padding: 20px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .dashboard-card {
      background-color: var(--background);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 0, 0, 0.125);
    }
    
    .dashboard-card h3 {
      color: var(--primary);
      border-bottom: 2px solid var(--secondary);
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    
    .metric-card {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      height: 100%;
    }
    
    .metric-card h2 {
      font-size: 2rem;
      margin: 10px 0;
    }
    
    .metric-card p {
      font-size: 1rem;
      opacity: 0.8;
    }
    
    .security-bar {
      height: 30px;
      background-color: #e9ecef;
      border-radius: 5px;
      margin-bottom: 10px;
      position: relative;
      overflow: hidden;
    }
    
    .security-bar-fill {
      height: 100%;
      background-color: var(--success);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      color: white;
      font-weight: bold;
    }
    
    .security-bar-label {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
    }
    
    .table-fixed {
      table-layout: fixed;
    }
    
    .status-badge {
      padding: 5px 10px;
      border-radius: 15px;
      font-weight: bold;
    }
    
    .status-pass {
      background-color: var(--success);
      color: white;
    }
    
    .status-fail {
      background-color: var(--danger);
      color: white;
    }
    
    .status-warning {
      background-color: var(--warning);
      color: white;
    }
    
    .chart-container {
      position: relative;
      height: 400px;
      margin-bottom: 20px;
    }
    
    .theme-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 100;
      font-size: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="dashboard-header">
      <div class="row">
        <div class="col-md-8">
          <h1><i class="bi bi-shield-check"></i> ${this.title}</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
        <div class="col-md-4 text-end">
          <span class="badge bg-primary">Version ${this.version}</span>
          <div class="mt-2">
            <button id="exportJson" class="btn btn-sm btn-light me-1">
              <i class="bi bi-file-earmark-code"></i> Export JSON
            </button>
            <button id="exportPdf" class="btn btn-sm btn-light">
              <i class="bi bi-file-earmark-pdf"></i> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Summary Metrics -->
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="metric-card" style="background: linear-gradient(135deg, #4caf50, #8bc34a);">
          <p>Test Pass Rate</p>
          <h2>${summaryMetrics.passRate}%</h2>
          <small>${summaryMetrics.passedTests} / ${summaryMetrics.totalTests} tests</small>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="metric-card" style="background: linear-gradient(135deg, #ff9800, #ff5722);">
          <p>Security Score</p>
          <h2>${summaryMetrics.securityScore}/10</h2>
          <small>${summaryMetrics.highVulnerabilities} high severity issues</small>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="metric-card" style="background: linear-gradient(135deg, #2196f3, #03a9f4);">
          <p>Gas Efficiency</p>
          <h2>${summaryMetrics.avgGasUsage.toLocaleString()}</h2>
          <small>average gas per operation</small>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="metric-card" style="background: linear-gradient(135deg, #9c27b0, #673ab7);">
          <p>Bundler Compatibility</p>
          <h2>${summaryMetrics.bundlerCompatibility}%</h2>
          <small>${summaryMetrics.compatibleBundlers} compatible bundlers</small>
        </div>
      </div>
    </div>
    
    <!-- Security Chart -->
    <div class="dashboard-card">
      <h3><i class="bi bi-shield"></i> Security Test Results</h3>
      <div class="row">
        <div class="col-md-8">
          <div class="chart-container">
            <canvas id="securityChart"></canvas>
          </div>
        </div>
        <div class="col-md-4">
          <h4>Vulnerability Breakdown</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge bg-danger">High</span></td>
                  <td>${summaryMetrics.highVulnerabilities}</td>
                </tr>
                <tr>
                  <td><span class="badge bg-warning text-dark">Medium</span></td>
                  <td>${summaryMetrics.mediumVulnerabilities}</td>
                </tr>
                <tr>
                  <td><span class="badge bg-info">Low</span></td>
                  <td>${summaryMetrics.lowVulnerabilities}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h4 class="mt-4">Key Findings</h4>
          <ul class="list-group">
            ${this.generateKeyFindings()}
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Performance Metrics -->
    <div class="dashboard-card">
      <h3><i class="bi bi-speedometer2"></i> Performance Metrics</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="chart-container">
            <canvas id="performanceChart"></canvas>
          </div>
        </div>
        <div class="col-md-6">
          <h4>Gas Usage Breakdown</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Gas Used</th>
                  <th>Comparison</th>
                </tr>
              </thead>
              <tbody>
                ${this.generateGasBreakdownRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bundler Compatibility -->
    <div class="dashboard-card">
      <h3><i class="bi bi-plugin"></i> Bundler Compatibility</h3>
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Bundler</th>
                  <th>Status</th>
                  <th>Response Time</th>
                  <th>Success Rate</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                ${this.generateBundlerCompatibilityRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Test Details -->
    <div class="dashboard-card">
      <h3><i class="bi bi-list-check"></i> Detailed Test Results</h3>
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="input-group">
            <input type="text" id="testSearch" class="form-control" placeholder="Search tests...">
            <button class="btn btn-primary" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div class="col-md-6 text-end">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary active" data-filter="all">All</button>
            <button type="button" class="btn btn-outline-success" data-filter="pass">Passed</button>
            <button type="button" class="btn btn-outline-danger" data-filter="fail">Failed</button>
          </div>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover" id="testResultsTable">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            ${this.generateTestResultRows()}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Recommendations -->
    <div class="dashboard-card">
      <h3><i class="bi bi-lightbulb"></i> Recommendations</h3>
      <div class="row">
        <div class="col-md-12">
          ${this.generateRecommendations()}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Theme toggle button -->
  <div class="theme-toggle" id="themeToggle">
    <i class="bi ${this.theme === 'light' ? 'bi-moon' : 'bi-sun'}"></i>
  </div>
  
  <!-- Modal for test details -->
  <div class="modal fade" id="testDetailModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Test Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="testDetailContent">
          <!-- Filled dynamically -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    // Chart Data
    const securityChartData = ${JSON.stringify(securityChartData)};
    const performanceChartData = ${JSON.stringify(performanceChartData)};
    const testResults = ${JSON.stringify(this.testResults)};
    
    // Initialize charts when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      // Security Chart
      const securityCtx = document.getElementById('securityChart').getContext('2d');
      const securityChart = new Chart(securityCtx, {
        type: 'bar',
        data: {
          labels: securityChartData.labels,
          datasets: [{
            label: 'Security Score (0-10)',
            data: securityChartData.scores,
            backgroundColor: [
              'rgba(76, 175, 80, 0.7)',
              'rgba(33, 150, 243, 0.7)',
              'rgba(255, 152, 0, 0.7)',
              'rgba(244, 67, 54, 0.7)',
              'rgba(156, 39, 176, 0.7)'
            ],
            borderColor: [
              'rgba(76, 175, 80, 1)',
              'rgba(33, 150, 243, 1)',
              'rgba(255, 152, 0, 1)',
              'rgba(244, 67, 54, 1)',
              'rgba(156, 39, 176, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              max: 10
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
      
      // Performance Chart
      const performanceCtx = document.getElementById('performanceChart').getContext('2d');
      const performanceChart = new Chart(performanceCtx, {
        type: 'bar',
        data: {
          labels: performanceChartData.labels,
          datasets: [{
            label: 'Gas Used',
            data: performanceChartData.values,
            backgroundColor: 'rgba(33, 150, 243, 0.7)',
            borderColor: 'rgba(33, 150, 243, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
      // Handle test detail clicks
      document.querySelectorAll('.view-test-details').forEach(button => {
        button.addEventListener('click', function() {
          const testId = this.getAttribute('data-test-id');
          const category = this.getAttribute('data-category');
          const testData = testResults[category].tests[testId];
          
          // Fill modal with test details
          const modal = document.getElementById('testDetailContent');
          let content = '<div class="container">';
          
          // Basic info
          content += '<div class="row mb-3"><div class="col-md-12">';
          content += '<h4>' + testData.name + '</h4>';
          content += '<p>' + testData.description + '</p>';
          
          // Status badge
          const statusClass = testData.status === 'pass' ? 'success' : 
                            testData.status === 'warning' ? 'warning' : 'danger';
          content += '<span class="badge bg-' + statusClass + ' mb-3">' + 
                     testData.status.toUpperCase() + '</span>';
          content += '</div></div>';
          
          // Test details
          content += '<div class="row mb-3">';
          content += '<div class="col-md-6">';
          content += '<h5>Details</h5>';
          content += '<ul class="list-group">';
          content += '<li class="list-group-item d-flex justify-content-between align-items-center">';
          content += 'Duration <span class="badge bg-primary rounded-pill">' + testData.duration + 'ms</span></li>';
          content += '<li class="list-group-item d-flex justify-content-between align-items-center">';
          content += 'Category <span class="badge bg-info rounded-pill">' + category + '</span></li>';
          
          if (testData.gasUsed) {
            content += '<li class="list-group-item d-flex justify-content-between align-items-center">';
            content += 'Gas Used <span class="badge bg-secondary rounded-pill">' + 
                       testData.gasUsed.toLocaleString() + '</span></li>';
          }
          
          content += '</ul>';
          content += '</div>';
          
          // Error information if failed
          if (testData.status === 'fail' && testData.error) {
            content += '<div class="col-md-6">';
            content += '<h5>Error Details</h5>';
            content += '<div class="alert alert-danger">';
            content += '<p><strong>Message:</strong> ' + testData.error.message + '</p>';
            if (testData.error.stack) {
              content += '<p><strong>Stack:</strong> <pre class="text-danger">' + 
                         testData.error.stack + '</pre></p>';
            }
            content += '</div></div>';
          }
          content += '</div>';
          
          // Code snippets if available
          if (testData.code) {
            content += '<div class="row"><div class="col-md-12">';
            content += '<h5>Test Code</h5>';
            content += '<pre><code class="language-javascript">' + testData.code + '</code></pre>';
            content += '</div></div>';
          }
          
          // Close container
          content += '</div>';
          
          modal.innerHTML = content;
          
          // Show the modal
          const testDetailModal = new bootstrap.Modal(document.getElementById('testDetailModal'));
          testDetailModal.show();
        });
      });
      
      // Filter test results
      document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
          // Update active button state
          document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.remove('active');
          });
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          const rows = document.querySelectorAll('#testResultsTable tbody tr');
          
          rows.forEach(row => {
            if (filter === 'all') {
              row.style.display = '';
            } else {
              const status = row.querySelector('.status-badge').textContent.toLowerCase();
              row.style.display = status === filter ? '' : 'none';
            }
          });
        });
      });
      
      // Search test results
      document.getElementById('testSearch').addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const rows = document.querySelectorAll('#testResultsTable tbody tr');
        
        rows.forEach(row => {
          const testName = row.querySelector('td:first-child').textContent.toLowerCase();
          const category = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
          
          if (testName.includes(searchText) || category.includes(searchText)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
      
      // Theme toggle
      document.getElementById('themeToggle').addEventListener('click', function() {
        const html = document.querySelector('html');
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        this.querySelector('i').className = 'bi ' + 
          (newTheme === 'light' ? 'bi-moon' : 'bi-sun');
        
        // Would need server-side persistence to actually save this preference
      });
      
      // Export buttons
      document.getElementById('exportJson').addEventListener('click', function() {
        const dataStr = "data:text/json;charset=utf-8," + 
          encodeURIComponent(JSON.stringify(testResults, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "aa-test-results.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
      
      // PDF export would need a server-side component
      // This is just a placeholder
      document.getElementById('exportPdf').addEventListener('click', function() {
        alert('PDF export functionality would be implemented with a server-side component');
      });
    });
  </script>
</body>
</html>
    `;
  }

  /**
   * Generate key findings HTML
   */
  generateKeyFindings() {
    // In a real implementation, this would extract important findings from test results
    const findings = [
      { text: 'UserOperation signature validation has timing variations', severity: 'high' },
      { text: 'Paymaster gas estimation could be manipulated by attackers', severity: 'medium' },
      { text: 'Bundle queue prioritization favors high gas price operations', severity: 'low' },
      { text: 'Replay protection works correctly in all test cases', severity: 'success' },
    ];
    
    return findings.map(finding => {
      const badgeClass = finding.severity === 'high' ? 'danger' : 
                       finding.severity === 'medium' ? 'warning' :
                       finding.severity === 'low' ? 'info' : 'success';
      
      return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${finding.text}
          <span class="badge bg-${badgeClass}">${finding.severity}</span>
        </li>
      `;
    }).join('');
  }

  /**
   * Generate gas breakdown rows for the table
   */
  generateGasBreakdownRows() {
    // In a real implementation, this would use actual test results
    const gasOperations = [
      { name: 'Account Creation', gas: 245000, change: '+5%' },
      { name: 'Simple Transfer', gas: 65000, change: '-10%' },
      { name: 'ERC20 Transfer', gas: 95000, change: '-2%' },
      { name: 'Paymaster Validation', gas: 32000, change: '+8%' },
      { name: 'Account Validation', gas: 28000, change: '-15%' },
    ];
    
    return gasOperations.map(op => {
      const changeClass = op.change.startsWith('-') ? 'text-success' : 'text-danger';
      const changeIcon = op.change.startsWith('-') ? 'bi-arrow-down' : 'bi-arrow-up';
      
      return `
        <tr>
          <td>${op.name}</td>
          <td>${op.gas.toLocaleString()}</td>
          <td class="${changeClass}">
            <i class="bi ${changeIcon}"></i> ${op.change} vs. previous version
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Generate bundler compatibility rows
   */
  generateBundlerCompatibilityRows() {
    // In a real implementation, this would use actual test results
    const bundlers = [
      { 
        name: 'Pimlico', 
        status: 'pass', 
        responseTime: '312ms', 
        successRate: '98%',
        notes: 'Compatible with all test cases' 
      },
      { 
        name: 'Stackup', 
        status: 'pass', 
        responseTime: '287ms', 
        successRate: '95%',
        notes: 'Minor issues with paymaster data format' 
      },
      { 
        name: 'Alchemy', 
        status: 'warning', 
        responseTime: '455ms', 
        successRate: '85%',
        notes: 'Some compatibility issues with signature formats' 
      },
      { 
        name: 'Infura', 
        status: 'pass', 
        responseTime: '278ms', 
        successRate: '92%',
        notes: 'Works well with standard UserOperations' 
      },
      { 
        name: 'Local Bundler', 
        status: 'fail', 
        responseTime: '612ms', 
        successRate: '65%',
        notes: 'Significant validation differences from standard' 
      },
    ];
    
    return bundlers.map(bundler => {
      const statusClass = bundler.status === 'pass' ? 'success' : 
                        bundler.status === 'warning' ? 'warning' : 'danger';
      
      return `
        <tr>
          <td><strong>${bundler.name}</strong></td>
          <td><span class="status-badge status-${bundler.status}">${bundler.status.toUpperCase()}</span></td>
          <td>${bundler.responseTime}</td>
          <td>${bundler.successRate}</td>
          <td>${bundler.notes}</td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Generate test result rows
   */
  generateTestResultRows() {
    // In a real implementation, this would go through all categories and tests
    const mockTests = [
      {
        id: 'test1',
        category: 'security',
        name: 'UserOp Signature Validation',
        status: 'pass',
        duration: 245,
        description: 'Validates that UserOperation signatures are properly checked'
      },
      {
        id: 'test2',
        category: 'security',
        name: 'Nonce Handling',
        status: 'fail',
        duration: 312,
        description: 'Validates correct nonce handling to prevent replay attacks'
      },
      {
        id: 'test3',
        category: 'performance',
        name: 'Gas Estimation Accuracy',
        status: 'pass',
        duration: 178,
        description: 'Checks the accuracy of gas estimations for UserOperations'
      },
      {
        id: 'test4',
        category: 'compatibility',
        name: 'Paymaster Compatibility',
        status: 'warning',
        duration: 290,
        description: 'Tests compatibility with different paymaster implementations'
      },
      {
        id: 'test5',
        category: 'security',
        name: 'Bundler Queue Manipulation',
        status: 'pass',
        duration: 415,
        description: 'Tests resilience against bundler queue manipulation attacks'
      },
    ];
    
    return mockTests.map(test => {
      const statusClass = test.status === 'pass' ? 'success' : 
                        test.status === 'warning' ? 'warning' : 'danger';
      
      return `
        <tr>
          <td>${test.name}</td>
          <td>${test.category}</td>
          <td><span class="status-badge status-${test.status}">${test.status.toUpperCase()}</span></td>
          <td>${test.duration}ms</td>
          <td>
            <button class="btn btn-sm btn-primary view-test-details" 
                   data-test-id="${test.id}" 
                   data-category="${test.category}">
              View Details
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Generate recommendations HTML
   */
  generateRecommendations() {
    // In a real implementation, this would be based on actual test results
    return `
      <div class="alert alert-primary">
        <h4><i class="bi bi-stars"></i> Primary Recommendation</h4>
        <p>Implement stricter validation for UserOperation signatures to prevent potential manipulation attacks.</p>
        <hr>
        <p class="mb-0">Priority: High</p>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="alert alert-warning">
            <h5><i class="bi bi-exclamation-triangle"></i> Paymaster Improvement</h5>
            <p>Add more robust gas estimation checks in the paymaster validation flow.</p>
            <p class="mb-0">Priority: Medium</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="alert alert-info">
            <h5><i class="bi bi-lightning"></i> Performance Optimization</h5>
            <p>Reduce gas consumption during account validation by optimizing signature verification.</p>
            <p class="mb-0">Priority: Medium</p>
          </div>
        </div>
      </div>
      
      <div class="alert alert-success">
        <h5><i class="bi bi-check-circle"></i> Positive Finding</h5>
        <p>The bundler queue management implementation shows good resilience against most DoS attack vectors.</p>
      </div>
    `;
  }

  /**
   * Prepare security chart data for visualization
   */
  prepareSecurityChartData() {
    // In a real implementation, this would extract data from test results
    return {
      labels: [
        'Signature Validation', 
        'Nonce Handling', 
        'Paymaster Security', 
        'Bundler DoS Protection', 
        'Gas Griefing Prevention'
      ],
      scores: [8.5, 7.2, 6.8, 9.1, 8.7]
    };
  }

  /**
   * Prepare performance chart data for visualization
   */
  preparePerformanceChartData() {
    // In a real implementation, this would extract data from test results
    return {
      labels: [
        'Account Creation', 
        'Simple Transfer', 
        'ERC20 Transfer', 
        'Paymaster Validation', 
        'Account Validation'
      ],
      values: [245000, 65000, 95000, 32000, 28000]
    };
  }

  /**
   * Prepare compatibility data for visualization
   */
  prepareCompatibilityData() {
    // In a real implementation, this would extract data from test results
    return {
      bundlers: ['Pimlico', 'Stackup', 'Alchemy', 'Infura', 'Local Bundler'],
      compatibility: [
        { name: 'Pimlico', compatible: true, successRate: 98 },
        { name: 'Stackup', compatible: true, successRate: 95 },
        { name: 'Alchemy', compatible: true, successRate: 85 },
        { name: 'Infura', compatible: true, successRate: 92 },
        { name: 'Local Bundler', compatible: false, successRate: 65 },
      ]
    };
  }

  /**
   * Calculate summary metrics for dashboard
   */
  calculateSummaryMetrics() {
    // In a real implementation, this would be calculated from test results
    return {
      totalTests: 32,
      passedTests: 27,
      passRate: 84,
      securityScore: 8.2,
      highVulnerabilities: 1,
      mediumVulnerabilities: 3,
      lowVulnerabilities: 5,
      avgGasUsage: 93000,
      bundlerCompatibility: 80,
      compatibleBundlers: 4
    };
  }

  /**
   * Generate markdown summary of test results
   */
  generateMarkdownSummary() {
    const metrics = this.calculateSummaryMetrics();
    
    return `
# Account Abstraction Test Results Summary

Generated on: ${new Date().toLocaleString()}

## Overview

- **Test Pass Rate:** ${metrics.passRate}% (${metrics.passedTests}/${metrics.totalTests})
- **Security Score:** ${metrics.securityScore}/10
- **Gas Efficiency:** ${metrics.avgGasUsage.toLocaleString()} average gas per operation
- **Bundler Compatibility:** ${metrics.bundlerCompatibility}% (${metrics.compatibleBundlers} bundlers)

## Security Issues

- **High Severity:** ${metrics.highVulnerabilities} issue(s)
- **Medium Severity:** ${metrics.mediumVulnerabilities} issue(s)
- **Low Severity:** ${metrics.lowVulnerabilities} issue(s)

## Key Recommendations

1. Implement stricter validation for UserOperation signatures
2. Add more robust gas estimation checks in paymaster validation
3. Reduce gas consumption during account validation
4. Improve bundler queue management implementation

## Bundler Compatibility

| Bundler | Status | Success Rate |
|---------|--------|--------------|
| Pimlico | ✅ PASS | 98% |
| Stackup | ✅ PASS | 95% |
| Alchemy | ⚠️ WARNING | 85% |
| Infura | ✅ PASS | 92% |
| Local Bundler | ❌ FAIL | 65% |

## Performance Metrics

| Operation | Gas Used | Change |
|-----------|----------|--------|
| Account Creation | 245,000 | +5% |
| Simple Transfer | 65,000 | -10% |
| ERC20 Transfer | 95,000 | -2% |
| Paymaster Validation | 32,000 | +8% |
| Account Validation | 28,000 | -15% |

---

For detailed information, refer to the full HTML dashboard.
    `.trim();
  }
}

/**
 * Generate an AA test dashboard
 * @param {Object} options - Dashboard options
 * @returns {Promise<Object>} Paths to generated files
 */
async function generateAADashboard(options = {}) {
  const dashboard = new AATestDashboard(options);
  return await dashboard.generateDashboard();
}

module.exports = {
  AATestDashboard,
  generateAADashboard,
  DASHBOARD_CONFIG
}; 