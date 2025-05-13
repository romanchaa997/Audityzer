/**
 * Dashboard Renderer Module for Web3FuzzForge
 * Generates interactive dashboards for security test results visualization
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const ChartJSNode = require('chartjs-node-canvas');

class DashboardRenderer {
  constructor(options = {}) {
    this.options = {
      outputDir: options.outputDir || './reports/dashboards',
      templateDir: options.templateDir || path.join(__dirname, '../../web-ui/templates'),
      darkMode: options.darkMode || false,
      interactive: options.interactive !== false,
      exportFormats: options.exportFormats || ['html', 'svg', 'png'],
      ...options,
    };

    this.chartJsNodeCanvas = new ChartJSNode.ChartJSNodeCanvas({
      width: 800,
      height: 500,
      backgroundColour: this.options.darkMode ? '#222' : '#fff',
    });

    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.options.outputDir)) {
      fs.mkdirSync(this.options.outputDir, { recursive: true });
    }
  }

  /**
   * Generate a test results dashboard
   * @param {Object} testResults - The test results data
   * @param {String} outputFilename - The output filename
   * @returns {Promise<String>} - Path to the generated dashboard
   */
  async generateTestResultsDashboard(testResults, outputFilename = 'test-results-dashboard') {
    try {
      // Load dashboard template
      const templatePath = path.join(this.options.templateDir, 'dashboard.html');
      let template = fs.existsSync(templatePath)
        ? fs.readFileSync(templatePath, 'utf8')
        : this._getDefaultTemplate();

      // Generate charts
      const vulnerabilityChart = await this._generateVulnerabilityChart(testResults);
      const coverageChart = await this._generateCoverageChart(testResults);
      const timelineChart = await this._generateTimelineChart(testResults);

      // Generate HTML content
      const content = this._generateDashboardContent(testResults);

      // Replace placeholders in template
      template = template
        .replace('{{TITLE}}', 'Web3FuzzForge Security Test Results')
        .replace('{{CONTENT}}', content)
        .replace('{{VULNERABILITY_CHART}}', vulnerabilityChart)
        .replace('{{COVERAGE_CHART}}', coverageChart)
        .replace('{{TIMELINE_CHART}}', timelineChart)
        .replace('{{DARK_MODE}}', this.options.darkMode ? 'dark-theme' : '');

      // Write dashboard to file
      const outputPath = path.join(this.options.outputDir, `${outputFilename}.html`);
      fs.writeFileSync(outputPath, template);

      // Generate additional export formats if needed
      if (this.options.exportFormats.includes('svg')) {
        await this._exportAsSvg(testResults, outputFilename);
      }

      if (this.options.exportFormats.includes('png')) {
        await this._exportAsPng(testResults, outputFilename);
      }

      return outputPath;
    } catch (error) {
      console.error('Error generating dashboard:', error);
      throw new Error(`Failed to generate dashboard: ${error.message}`);
    }
  }

  /**
   * Generate a transaction flow dashboard
   * @param {Object} flowData - The transaction flow data
   * @param {String} outputFilename - The output filename
   * @returns {Promise<String>} - Path to the generated dashboard
   */
  async generateTransactionFlowDashboard(flowData, outputFilename = 'transaction-flow-dashboard') {
    try {
      // Load dashboard template
      const templatePath = path.join(this.options.templateDir, 'flow-dashboard.html');
      let template = fs.existsSync(templatePath)
        ? fs.readFileSync(templatePath, 'utf8')
        : this._getDefaultFlowTemplate();

      // Generate flow diagram
      const flowDiagram = this._generateFlowDiagram(flowData);

      // Generate stats
      const stats = this._generateFlowStats(flowData);

      // Replace placeholders in template
      template = template
        .replace('{{TITLE}}', 'Web3FuzzForge Transaction Flow Analysis')
        .replace('{{FLOW_DIAGRAM}}', flowDiagram)
        .replace('{{STATS}}', stats)
        .replace('{{DARK_MODE}}', this.options.darkMode ? 'dark-theme' : '');

      // Write dashboard to file
      const outputPath = path.join(this.options.outputDir, `${outputFilename}.html`);
      fs.writeFileSync(outputPath, template);

      return outputPath;
    } catch (error) {
      console.error('Error generating transaction flow dashboard:', error);
      throw new Error(`Failed to generate transaction flow dashboard: ${error.message}`);
    }
  }

  /**
   * Export dashboard data as SVG
   * @private
   */
  async _exportAsSvg(data, filename) {
    // Implementation for SVG export
    const vulnerabilityChartSvg = await this.chartJsNodeCanvas.renderToDataURL({
      type: 'pie',
      data: this._getVulnerabilityChartData(data),
      options: this._getChartOptions(),
    });

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
      <image href="${vulnerabilityChartSvg}" width="800" height="500"/>
    </svg>`;

    const outputPath = path.join(this.options.outputDir, `${filename}.svg`);
    fs.writeFileSync(outputPath, svgContent);

    return outputPath;
  }

  /**
   * Export dashboard data as PNG
   * @private
   */
  async _exportAsPng(data, filename) {
    // Implementation for PNG export
    const buffer = await this.chartJsNodeCanvas.renderToBuffer({
      type: 'pie',
      data: this._getVulnerabilityChartData(data),
      options: this._getChartOptions(),
    });

    const outputPath = path.join(this.options.outputDir, `${filename}.png`);
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  }

  /**
   * Generate vulnerability chart
   * @private
   */
  async _generateVulnerabilityChart(testResults) {
    const chartData = this._getVulnerabilityChartData(testResults);
    const chartConfig = {
      type: 'pie',
      data: chartData,
      options: this._getChartOptions(),
    };

    const chartDataUrl = await this.chartJsNodeCanvas.renderToDataURL(chartConfig);
    return `<img src="${chartDataUrl}" alt="Vulnerability Distribution" class="chart-img">`;
  }

  /**
   * Generate coverage chart
   * @private
   */
  async _generateCoverageChart(testResults) {
    // Implementation for coverage chart
    const chartData = {
      labels: ['Wallets', 'Transactions', 'Networks', 'Error Handlers'],
      datasets: [
        {
          label: 'Coverage %',
          data: [
            testResults.coverage?.wallets || 0,
            testResults.coverage?.transactions || 0,
            testResults.coverage?.networks || 0,
            testResults.coverage?.errorHandlers || 0,
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    };

    const chartDataUrl = await this.chartJsNodeCanvas.renderToDataURL(chartConfig);
    return `<img src="${chartDataUrl}" alt="Test Coverage" class="chart-img">`;
  }

  /**
   * Generate timeline chart
   * @private
   */
  async _generateTimelineChart(testResults) {
    // Implementation for timeline chart
    // Create example timeline data if not available
    const timelineData = testResults.timeline || [
      { timestamp: Date.now() - 50000, event: 'Test Started' },
      { timestamp: Date.now() - 40000, event: 'Wallet Connected' },
      { timestamp: Date.now() - 30000, event: 'Transaction Sent' },
      { timestamp: Date.now() - 20000, event: 'Error Detected' },
      { timestamp: Date.now() - 10000, event: 'Test Completed' },
    ];

    const labels = timelineData.map(item => {
      const date = new Date(item.timestamp);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Test Timeline',
          data: timelineData.map((_, index) => index + 1),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: false,
          tension: 0.1,
        },
      ],
    };

    const chartConfig = {
      type: 'line',
      data: chartData,
    };

    const chartDataUrl = await this.chartJsNodeCanvas.renderToDataURL(chartConfig);
    return `<img src="${chartDataUrl}" alt="Test Timeline" class="chart-img">`;
  }

  /**
   * Generate flow diagram for transaction visualization
   * @private
   */
  _generateFlowDiagram(flowData) {
    // Basic flow diagram as HTML
    const steps = flowData.steps || [];
    let diagram = '<div class="flow-diagram">';

    steps.forEach((step, index) => {
      diagram += `
        <div class="flow-step ${step.error ? 'error' : ''}">
          <div class="step-number">${index + 1}</div>
          <div class="step-content">
            <h3>${step.name || `Step ${index + 1}`}</h3>
            <p>${step.description || ''}</p>
            ${step.error ? `<div class="error-message">${step.error}</div>` : ''}
          </div>
          ${index < steps.length - 1 ? '<div class="flow-arrow">→</div>' : ''}
        </div>
      `;
    });

    diagram += '</div>';
    return diagram;
  }

  /**
   * Generate statistics for flow data
   * @private
   */
  _generateFlowStats(flowData) {
    const totalSteps = flowData.steps?.length || 0;
    const errorSteps = flowData.steps?.filter(step => step.error)?.length || 0;
    const successRate =
      totalSteps > 0 ? (((totalSteps - errorSteps) / totalSteps) * 100).toFixed(2) : 0;

    return `
      <div class="stats-container">
        <div class="stat-box">
          <h3>Total Steps</h3>
          <p class="stat-value">${totalSteps}</p>
        </div>
        <div class="stat-box">
          <h3>Errors</h3>
          <p class="stat-value">${errorSteps}</p>
        </div>
        <div class="stat-box">
          <h3>Success Rate</h3>
          <p class="stat-value">${successRate}%</p>
        </div>
        <div class="stat-box">
          <h3>Duration</h3>
          <p class="stat-value">${flowData.duration || 'N/A'}</p>
        </div>
      </div>
    `;
  }

  /**
   * Generate dashboard content HTML
   * @private
   */
  _generateDashboardContent(testResults) {
    const { summary, vulnerabilities, recommendations } = testResults;

    let content = `
      <div class="dashboard-container">
        <section class="summary-section">
          <h2>Test Summary</h2>
          <div class="summary-grid">
            <div class="summary-item">
              <h3>Total Tests</h3>
              <p class="summary-value">${summary?.totalTests || 0}</p>
            </div>
            <div class="summary-item">
              <h3>Passed</h3>
              <p class="summary-value passed">${summary?.passed || 0}</p>
            </div>
            <div class="summary-item">
              <h3>Failed</h3>
              <p class="summary-value failed">${summary?.failed || 0}</p>
            </div>
            <div class="summary-item">
              <h3>Duration</h3>
              <p class="summary-value">${summary?.duration || '0s'}</p>
            </div>
          </div>
        </section>
        
        <section class="vulnerabilities-section">
          <h2>Detected Vulnerabilities</h2>
          <div class="vulnerabilities-list">
    `;

    // Add vulnerabilities
    if (vulnerabilities && vulnerabilities.length > 0) {
      vulnerabilities.forEach(vuln => {
        content += `
          <div class="vulnerability-item severity-${vuln.severity.toLowerCase()}">
            <div class="vuln-header">
              <h3>${vuln.title}</h3>
              <span class="severity-badge ${vuln.severity.toLowerCase()}">${vuln.severity}</span>
            </div>
            <p>${vuln.description}</p>
            <div class="vuln-details">
              <div class="vuln-location">${vuln.location || 'N/A'}</div>
              <div class="vuln-id">${vuln.id || ''}</div>
            </div>
          </div>
        `;
      });
    } else {
      content += '<p class="no-items">No vulnerabilities detected</p>';
    }

    content += `
        </div>
      </section>
      
      <section class="recommendations-section">
        <h2>Security Recommendations</h2>
        <div class="recommendations-list">
    `;

    // Add recommendations
    if (recommendations && recommendations.length > 0) {
      recommendations.forEach(rec => {
        content += `
          <div class="recommendation-item priority-${rec.priority.toLowerCase()}">
            <div class="rec-header">
              <h3>${rec.title}</h3>
              <span class="priority-badge ${rec.priority.toLowerCase()}">${rec.priority}</span>
            </div>
            <p>${rec.description}</p>
            ${rec.code ? `<pre class="code-example"><code>${rec.code}</code></pre>` : ''}
          </div>
        `;
      });
    } else {
      content += '<p class="no-items">No recommendations available</p>';
    }

    content += `
        </div>
      </section>
    </div>
    `;

    return content;
  }

  /**
   * Get vulnerability chart data
   * @private
   */
  _getVulnerabilityChartData(testResults) {
    // Count vulnerabilities by severity
    const counts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    };

    if (testResults.vulnerabilities && testResults.vulnerabilities.length > 0) {
      testResults.vulnerabilities.forEach(vuln => {
        const severity = vuln.severity.toLowerCase();
        if (counts[severity] !== undefined) {
          counts[severity]++;
        }
      });
    }

    return {
      labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
      datasets: [
        {
          label: 'Vulnerabilities by Severity',
          data: [counts.critical, counts.high, counts.medium, counts.low, counts.info],
          backgroundColor: [
            'rgba(220, 53, 69, 0.8)', // Critical - Red
            'rgba(255, 128, 0, 0.8)', // High - Orange
            'rgba(255, 193, 7, 0.8)', // Medium - Yellow
            'rgba(40, 167, 69, 0.8)', // Low - Green
            'rgba(0, 123, 255, 0.8)', // Info - Blue
          ],
          borderColor: [
            'rgba(220, 53, 69, 1)',
            'rgba(255, 128, 0, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(40, 167, 69, 1)',
            'rgba(0, 123, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  /**
   * Get chart options
   * @private
   */
  _getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: this.options.darkMode ? '#fff' : '#333',
          },
        },
        title: {
          display: true,
          text: 'Vulnerability Distribution',
          color: this.options.darkMode ? '#fff' : '#333',
        },
      },
    };
  }

  /**
   * Get default dashboard template
   * @private
   */
  _getDefaultTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <style>
    :root {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --info-color: #3498db;
      --dark-color: #34495e;
      --light-color: #ecf0f1;
      --text-color: #333;
      --bg-color: #fff;
    }
    
    body.dark-theme {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --info-color: #3498db;
      --dark-color: #34495e;
      --light-color: #2c3e50;
      --text-color: #ecf0f1;
      --bg-color: #1a1a1a;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background-color: var(--primary-color);
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    .dashboard-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    
    section {
      background-color: var(--bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    
    h2 {
      color: var(--primary-color);
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-top: 0;
    }
    
    .chart-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .chart-box {
      flex: 1;
      min-width: 300px;
      background-color: var(--bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      padding: 15px;
    }
    
    .chart-img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .summary-item {
      background-color: rgba(52, 152, 219, 0.1);
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    
    .summary-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 10px 0;
    }
    
    .summary-value.passed {
      color: var(--secondary-color);
    }
    
    .summary-value.failed {
      color: var(--danger-color);
    }
    
    .vulnerabilities-list, .recommendations-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
    }
    
    .vulnerability-item, .recommendation-item {
      border-radius: 8px;
      padding: 15px;
      background-color: rgba(52, 152, 219, 0.05);
      border-left: 5px solid var(--primary-color);
    }
    
    .vulnerability-item.severity-critical {
      border-left-color: var(--danger-color);
      background-color: rgba(231, 76, 60, 0.05);
    }
    
    .vulnerability-item.severity-high {
      border-left-color: #e67e22;
      background-color: rgba(230, 126, 34, 0.05);
    }
    
    .vulnerability-item.severity-medium {
      border-left-color: var(--warning-color);
      background-color: rgba(243, 156, 18, 0.05);
    }
    
    .vulnerability-item.severity-low {
      border-left-color: var(--secondary-color);
      background-color: rgba(46, 204, 113, 0.05);
    }
    
    .vuln-header, .rec-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .severity-badge, .priority-badge {
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      color: white;
    }
    
    .severity-badge.critical, .priority-badge.high {
      background-color: var(--danger-color);
    }
    
    .severity-badge.high, .priority-badge.medium {
      background-color: #e67e22;
    }
    
    .severity-badge.medium {
      background-color: var(--warning-color);
    }
    
    .severity-badge.low, .priority-badge.low {
      background-color: var(--secondary-color);
    }
    
    .severity-badge.info {
      background-color: var(--info-color);
    }
    
    .vuln-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #777;
      margin-top: 10px;
    }
    
    .code-example {
      background-color: #f7f9fb;
      border-radius: 4px;
      padding: 10px;
      overflow-x: auto;
      margin: 10px 0;
    }
    
    body.dark-theme .code-example {
      background-color: #2c3e50;
      color: #ecf0f1;
    }
    
    .no-items {
      color: #777;
      font-style: italic;
      text-align: center;
      padding: 20px;
    }
    
    .flow-diagram {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0;
    }
    
    .flow-step {
      display: flex;
      align-items: center;
      background-color: rgba(52, 152, 219, 0.1);
      border-radius: 8px;
      padding: 15px;
    }
    
    .flow-step.error {
      background-color: rgba(231, 76, 60, 0.1);
    }
    
    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      margin-right: 15px;
    }
    
    .flow-step.error .step-number {
      background-color: var(--danger-color);
    }
    
    .step-content {
      flex: 1;
    }
    
    .step-content h3 {
      margin: 0 0 5px 0;
    }
    
    .error-message {
      color: var(--danger-color);
      font-weight: bold;
      margin-top: 5px;
    }
    
    .flow-arrow {
      font-size: 1.5rem;
      margin: 0 10px;
      color: var(--primary-color);
    }
    
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
    .stat-box {
      background-color: rgba(52, 152, 219, 0.1);
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    
    .stat-box h3 {
      margin: 0 0 10px 0;
      font-size: 1rem;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .chart-container {
        flex-direction: column;
      }
      
      .chart-box {
        width: 100%;
      }
    }
  </style>
</head>
<body class="{{DARK_MODE}}">
  <div class="container">
    <header>
      <h1>Web3FuzzForge Security Dashboard</h1>
    </header>
    
    <div class="chart-container">
      <div class="chart-box">
        <h3>Vulnerability Distribution</h3>
        {{VULNERABILITY_CHART}}
      </div>
      <div class="chart-box">
        <h3>Test Coverage</h3>
        {{COVERAGE_CHART}}
      </div>
    </div>
    
    <div class="chart-container">
      <div class="chart-box">
        <h3>Test Timeline</h3>
        {{TIMELINE_CHART}}
      </div>
    </div>
    
    {{CONTENT}}
  </div>
</body>
</html>`;
  }

  /**
   * Get default flow dashboard template
   * @private
   */
  _getDefaultFlowTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <style>
    /* Same styles as default template */
    :root {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --info-color: #3498db;
      --dark-color: #34495e;
      --light-color: #ecf0f1;
      --text-color: #333;
      --bg-color: #fff;
    }
    
    body.dark-theme {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --info-color: #3498db;
      --dark-color: #34495e;
      --light-color: #2c3e50;
      --text-color: #ecf0f1;
      --bg-color: #1a1a1a;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background-color: var(--primary-color);
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    section {
      background-color: var(--bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    
    h2 {
      color: var(--primary-color);
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-top: 0;
    }
    
    .flow-diagram {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0;
    }
    
    .flow-step {
      display: flex;
      align-items: center;
      background-color: rgba(52, 152, 219, 0.1);
      border-radius: 8px;
      padding: 15px;
    }
    
    .flow-step.error {
      background-color: rgba(231, 76, 60, 0.1);
    }
    
    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      margin-right: 15px;
    }
    
    .flow-step.error .step-number {
      background-color: var(--danger-color);
    }
    
    .step-content {
      flex: 1;
    }
    
    .step-content h3 {
      margin: 0 0 5px 0;
    }
    
    .error-message {
      color: var(--danger-color);
      font-weight: bold;
      margin-top: 5px;
    }
    
    .flow-arrow {
      font-size: 1.5rem;
      margin: 0 10px;
      color: var(--primary-color);
    }
    
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
    .stat-box {
      background-color: rgba(52, 152, 219, 0.1);
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    
    .stat-box h3 {
      margin: 0 0 10px 0;
      font-size: 1rem;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }
  </style>
</head>
<body class="{{DARK_MODE}}">
  <div class="container">
    <header>
      <h1>Transaction Flow Analysis</h1>
    </header>
    
    <section>
      <h2>Flow Diagram</h2>
      {{FLOW_DIAGRAM}}
    </section>
    
    <section>
      <h2>Flow Statistics</h2>
      {{STATS}}
    </section>
  </div>
</body>
</html>`;
  }
}

module.exports = DashboardRenderer;
