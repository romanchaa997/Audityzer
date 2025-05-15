/**
 * Account Abstraction Dashboard Visualization
 * 
 * Creates interactive dashboards for visualizing AA test results,
 * including metrics, flow diagrams, and comparative analysis.
 */

const fs = require('fs-extra');
const path = require('path');
const { createCanvas } = require('canvas');

/**
 * Class for generating AA visualization dashboards
 */
class AADashboardGenerator {
  /**
   * @param {Object} options Configuration options
   * @param {string} options.outputDir Directory to output dashboard files
   * @param {string} options.theme Theme to use (light or dark)
   * @param {Object} options.branding Custom branding options
   */
  constructor(options = {}) {
    this.outputDir = options.outputDir || path.resolve(process.cwd(), 'reports', 'dashboards');
    this.theme = options.theme || 'light';
    this.branding = options.branding || {
      primaryColor: this.theme === 'light' ? '#3498db' : '#2980b9',
      secondaryColor: this.theme === 'light' ? '#2ecc71' : '#27ae60',
      dangerColor: this.theme === 'light' ? '#e74c3c' : '#c0392b',
      textColor: this.theme === 'light' ? '#333333' : '#ecf0f1',
      backgroundColor: this.theme === 'light' ? '#ffffff' : '#2c3e50',
    };
  }

  /**
   * Generate a dashboard from test results
   * @param {Object} results Test results
   * @param {Object} options Additional options
   * @returns {Promise<Object>} Dashboard output paths
   */
  async generateDashboard(results, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputName = options.name || `aa-dashboard-${timestamp}`;
    
    // Ensure output directory exists
    await fs.ensureDir(this.outputDir);
    
    // Generate dashboard assets
    const assets = await this.generateAssets(results);
    
    // Generate HTML dashboard
    const htmlPath = path.join(this.outputDir, `${outputName}.html`);
    const htmlContent = this.generateHtml(results, assets, options);
    await fs.writeFile(htmlPath, htmlContent);
    
    // Generate JSON data
    const jsonPath = path.join(this.outputDir, `${outputName}.json`);
    await fs.writeJson(jsonPath, {
      results,
      metadata: {
        generated: new Date().toISOString(),
        version: options.version || '1.0.0',
      },
      assets: Object.keys(assets).reduce((acc, key) => {
        acc[key] = { 
          generated: true,
          path: assets[key].file || null 
        };
        return acc;
      }, {})
    }, { spaces: 2 });
    
    return {
      html: htmlPath,
      json: jsonPath,
      assets: assets
    };
  }

  /**
   * Generate visualization assets for the dashboard
   * @param {Object} results Test results
   * @returns {Promise<Object>} Generated assets
   */
  async generateAssets(results) {
    const assets = {};
    
    // 1. Generate summary chart
    assets.summaryChart = await this.generateSummaryChart(results);
    
    // 2. Generate gas usage chart if available
    if (results.gasData) {
      assets.gasChart = await this.generateGasChart(results.gasData);
    }
    
    // 3. Generate implementation comparison chart if available
    if (results.addon) {
      assets.addonChart = await this.generateAddonChart(results);
    }
    
    // 4. Generate vulnerability chart if available
    if (results.vulnerabilities && results.vulnerabilities.length > 0) {
      assets.vulnerabilityChart = await this.generateVulnerabilityChart(results.vulnerabilities);
    }
    
    return assets;
  }

  /**
   * Generate a summary chart for test results
   * @param {Object} results Test results
   * @returns {Promise<Object>} Chart details
   */
  async generateSummaryChart(results) {
    // Calculate test pass rates
    let passed = 0;
    let failed = 0;
    
    // Process test results
    if (results.tests) {
      Object.values(results.tests).forEach(test => {
        if (test.success) passed++;
        else failed++;
      });
    }
    
    // Create canvas for chart
    const width = 400;
    const height = 200;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw chart background
    ctx.fillStyle = this.branding.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw chart title
    ctx.fillStyle = this.branding.textColor;
    ctx.font = '14px Arial';
    ctx.fillText('Test Results Summary', 10, 20);
    
    // Draw chart
    const total = passed + failed;
    if (total > 0) {
      const passedWidth = Math.round((passed / total) * (width - 20));
      const failedWidth = width - 20 - passedWidth;
      
      // Draw passed bar
      ctx.fillStyle = this.branding.secondaryColor;
      ctx.fillRect(10, 40, passedWidth, 30);
      
      // Draw failed bar
      ctx.fillStyle = this.branding.dangerColor;
      ctx.fillRect(10 + passedWidth, 40, failedWidth, 30);
      
      // Draw labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      
      if (passedWidth > 50) {
        ctx.fillText(`Passed: ${passed}`, 20, 60);
      }
      
      if (failedWidth > 50) {
        ctx.fillText(`Failed: ${failed}`, 10 + passedWidth + 10, 60);
      }
      
      // Draw legend
      const legendY = 100;
      const legendSpacing = 20;
      
      ctx.fillStyle = this.branding.secondaryColor;
      ctx.fillRect(10, legendY, 15, 15);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Passed Tests', 30, legendY + 12);
      
      ctx.fillStyle = this.branding.dangerColor;
      ctx.fillRect(10, legendY + legendSpacing, 15, 15);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Failed Tests', 30, legendY + legendSpacing + 12);
      
      // Show pass rate
      const passRate = Math.round((passed / total) * 100);
      ctx.fillStyle = this.branding.textColor;
      ctx.font = '16px Arial';
      ctx.fillText(`Pass Rate: ${passRate}%`, 10, 160);
    } else {
      // No test data
      ctx.fillStyle = this.branding.textColor;
      ctx.font = '16px Arial';
      ctx.fillText('No test data available', 10, 100);
    }
    
    // Save the chart to a file
    const filename = `summary-chart-${Date.now()}.png`;
    const filePath = path.join(this.outputDir, filename);
    
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(filePath, buffer);
    
    return {
      file: filename,
      path: filePath,
      width,
      height,
    };
  }

  /**
   * Generate a chart visualizing gas usage
   * @param {Object} gasData Gas usage data
   * @returns {Promise<Object>} Chart details
   */
  async generateGasChart(gasData) {
    // Create canvas for chart
    const width = 400;
    const height = 200;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw chart background
    ctx.fillStyle = this.branding.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw chart title
    ctx.fillStyle = this.branding.textColor;
    ctx.font = '14px Arial';
    ctx.fillText('Gas Usage By Operation Type', 10, 20);
    
    // Check if we have standard vs fast gas prices
    if (gasData.standard && gasData.fast) {
      // Draw comparison bars for standard vs fast
      const barHeight = 30;
      const barSpacing = 20;
      const startY = 50;
      const maxWidth = width - 150;
      
      // Convert to wei for comparison
      const standardMax = parseInt(gasData.standard.maxFeePerGas || '0');
      const fastMax = parseInt(gasData.fast.maxFeePerGas || '0');
      const maxGas = Math.max(standardMax, fastMax);
      
      // Standard gas
      const standardWidth = maxGas > 0 ? Math.round((standardMax / maxGas) * maxWidth) : 0;
      ctx.fillStyle = this.branding.secondaryColor;
      ctx.fillRect(130, startY, standardWidth, barHeight);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Standard', 10, startY + 20);
      ctx.fillText(`${Math.round(standardMax / 1e9)} Gwei`, standardWidth + 140, startY + 20);
      
      // Fast gas
      const fastWidth = maxGas > 0 ? Math.round((fastMax / maxGas) * maxWidth) : 0;
      ctx.fillStyle = this.branding.primaryColor;
      ctx.fillRect(130, startY + barHeight + barSpacing, fastWidth, barHeight);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Fast', 10, startY + barHeight + barSpacing + 20);
      ctx.fillText(`${Math.round(fastMax / 1e9)} Gwei`, fastWidth + 140, startY + barHeight + barSpacing + 20);
      
      // Add legend
      const legendY = 150;
      ctx.fillStyle = this.branding.secondaryColor;
      ctx.fillRect(10, legendY, 15, 15);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Standard Gas', 30, legendY + 12);
      
      ctx.fillStyle = this.branding.primaryColor;
      ctx.fillRect(150, legendY, 15, 15);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Fast Gas', 170, legendY + 12);
    } else {
      // Simple gas data display
      ctx.fillStyle = this.branding.textColor;
      ctx.font = '12px Arial';
      ctx.fillText('Gas Data:', 10, 50);
      
      let yPos = 70;
      Object.entries(gasData).forEach(([key, value]) => {
        if (typeof value === 'object') {
          ctx.fillText(`${key}:`, 20, yPos);
          yPos += 20;
          
          Object.entries(value).forEach(([subKey, subValue]) => {
            ctx.fillText(`  ${subKey}: ${subValue}`, 30, yPos);
            yPos += 20;
          });
        } else {
          ctx.fillText(`${key}: ${value}`, 20, yPos);
          yPos += 20;
        }
      });
    }
    
    // Save the chart to a file
    const filename = `gas-chart-${Date.now()}.png`;
    const filePath = path.join(this.outputDir, filename);
    
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(filePath, buffer);
    
    return {
      file: filename,
      path: filePath,
      width,
      height,
    };
  }
  
  /**
   * Generate a chart for addon test results
   * @param {Object} results Test results with addon data
   * @returns {Promise<Object>} Chart details
   */
  async generateAddonChart(results) {
    // Create canvas for chart
    const width = 400;
    const height = 300;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw chart background
    ctx.fillStyle = this.branding.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Get addon test results
    const addonType = results.addon;
    const addonTests = results.tests[addonType] || {};
    
    // Draw chart title
    ctx.fillStyle = this.branding.textColor;
    ctx.font = '14px Arial';
    ctx.fillText(`${addonType} Test Results`, 10, 20);
    
    // Determine test categories and counts
    const testCategories = {};
    let totalTests = 0;
    
    if (addonTests.tests) {
      Object.entries(addonTests.tests).forEach(([testName, result]) => {
        const category = testName.split('.')[0] || 'general';
        if (!testCategories[category]) {
          testCategories[category] = { passed: 0, failed: 0 };
        }
        
        if (result.success) {
          testCategories[category].passed++;
        } else {
          testCategories[category].failed++;
        }
        
        totalTests++;
      });
    }
    
    // Draw test categories
    if (totalTests > 0) {
      const categorySpacing = 30;
      const barHeight = 20;
      let yPos = 50;
      
      ctx.font = '12px Arial';
      
      Object.entries(testCategories).forEach(([category, stats]) => {
        // Draw category name
        ctx.fillStyle = this.branding.textColor;
        ctx.fillText(category, 10, yPos);
        
        // Total for this category
        const totalForCategory = stats.passed + stats.failed;
        
        // Draw passed bar
        const passedWidth = Math.round((stats.passed / totalForCategory) * (width - 150));
        ctx.fillStyle = this.branding.secondaryColor;
        ctx.fillRect(150, yPos - 15, passedWidth, barHeight);
        
        // Draw failed bar
        const failedWidth = Math.round((stats.failed / totalForCategory) * (width - 150));
        ctx.fillStyle = this.branding.dangerColor;
        ctx.fillRect(150 + passedWidth, yPos - 15, failedWidth, barHeight);
        
        // Draw percentage
        const passPercent = Math.round((stats.passed / totalForCategory) * 100);
        ctx.fillStyle = this.branding.textColor;
        ctx.fillText(`${passPercent}%`, width - 40, yPos);
        
        yPos += categorySpacing;
      });
      
      // Draw summary
      yPos += 20;
      ctx.font = '14px Arial';
      ctx.fillStyle = this.branding.textColor;
      
      const totalPassed = Object.values(testCategories).reduce((sum, stats) => sum + stats.passed, 0);
      const passRate = Math.round((totalPassed / totalTests) * 100);
      
      ctx.fillText(`Overall Pass Rate: ${passRate}%`, 10, yPos);
      yPos += 20;
      ctx.fillText(`Total Tests: ${totalTests}`, 10, yPos);
      yPos += 20;
      ctx.fillText(`Passed: ${totalPassed}`, 10, yPos);
      yPos += 20;
      ctx.fillText(`Failed: ${totalTests - totalPassed}`, 10, yPos);
      
      // Draw legend
      const legendY = 250;
      const legendSpacing = 20;
      
      ctx.fillStyle = this.branding.secondaryColor;
      ctx.fillRect(10, legendY, 15, 15);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Passed Tests', 30, legendY + 12);
      
      ctx.fillStyle = this.branding.dangerColor;
      ctx.fillRect(10, legendY + legendSpacing, 15, 15);
      ctx.fillStyle = this.branding.textColor;
      ctx.fillText('Failed Tests', 30, legendY + legendSpacing + 12);
    } else {
      // No test data
      ctx.fillStyle = this.branding.textColor;
      ctx.font = '16px Arial';
      ctx.fillText('No test data available for this addon', 10, 100);
    }
    
    // Save the chart to a file
    const filename = `addon-chart-${Date.now()}.png`;
    const filePath = path.join(this.outputDir, filename);
    
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(filePath, buffer);
    
    return {
      file: filename,
      path: filePath,
      width,
      height,
    };
  }
  
  /**
   * Generate a chart for vulnerability findings
   * @param {Array} vulnerabilities List of vulnerabilities
   * @returns {Promise<Object>} Chart details
   */
  async generateVulnerabilityChart(vulnerabilities) {
    // Create canvas for chart
    const width = 400;
    const height = 200;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw chart background
    ctx.fillStyle = this.branding.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Draw chart title
    ctx.fillStyle = this.branding.textColor;
    ctx.font = '14px Arial';
    ctx.fillText('Vulnerabilities by Severity', 10, 20);
    
    // Count vulnerabilities by severity
    const severityCounts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    
    vulnerabilities.forEach(vuln => {
      const severity = (vuln.severity || 'medium').toLowerCase();
      if (severityCounts[severity] !== undefined) {
        severityCounts[severity]++;
      } else {
        severityCounts.medium++;
      }
    });
    
    // Draw bar chart
    const barHeight = 30;
    const barSpacing = 10;
    const startY = 50;
    const maxWidth = width - 150;
    
    const totalVulns = Object.values(severityCounts).reduce((sum, count) => sum + count, 0);
    let yPos = startY;
    
    // Define colors for severities
    const severityColors = {
      critical: '#e74c3c',
      high: '#e67e22',
      medium: '#f1c40f',
      low: '#3498db',
    };
    
    // Draw bars for each severity
    Object.entries(severityCounts).forEach(([severity, count]) => {
      if (count > 0) {
        const barWidth = Math.round((count / totalVulns) * maxWidth);
        
        // Draw bar
        ctx.fillStyle = severityColors[severity] || this.branding.primaryColor;
        ctx.fillRect(130, yPos, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = this.branding.textColor;
        ctx.fillText(`${severity[0].toUpperCase()}${severity.slice(1)}`, 10, yPos + 20);
        ctx.fillText(`${count}`, barWidth + 140, yPos + 20);
        
        yPos += barHeight + barSpacing;
      }
    });
    
    // Draw total vulnerabilities
    ctx.fillStyle = this.branding.textColor;
    ctx.font = '14px Arial';
    ctx.fillText(`Total Vulnerabilities: ${totalVulns}`, 10, 170);
    
    // Save the chart to a file
    const filename = `vuln-chart-${Date.now()}.png`;
    const filePath = path.join(this.outputDir, filename);
    
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(filePath, buffer);
    
    return {
      file: filename,
      path: filePath,
      width,
      height,
    };
  }
  
  /**
   * Generate HTML dashboard
   * @param {Object} results Test results
   * @param {Object} assets Generated visualization assets
   * @param {Object} options Additional options
   * @returns {string} HTML content
   */
  generateHtml(results, assets, options) {
    const title = options.title || 'Account Abstraction Test Dashboard';
    
    // Start HTML template
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        :root {
          --primary-color: ${this.branding.primaryColor};
          --secondary-color: ${this.branding.secondaryColor};
          --danger-color: ${this.branding.dangerColor};
          --text-color: ${this.branding.textColor};
          --bg-color: ${this.branding.backgroundColor};
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: var(--bg-color);
          color: var(--text-color);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        header {
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        h1, h2, h3, h4 {
          color: var(--primary-color);
        }
        
        .dashboard-section {
          margin: 30px 0;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .section-header .toggle-icon {
          font-size: 20px;
        }
        
        .section-content {
          transition: max-height 0.3s ease-out;
          overflow: hidden;
        }
        
        .section-content.collapsed {
          max-height: 0;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 15px;
          margin: 15px 0;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          grid-gap: 20px;
        }
        
        .chart {
          text-align: center;
          margin: 20px 0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        table th,
        table td {
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left;
        }
        
        table th {
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        
        table th:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
        
        table th::after {
          content: "\\2003"; /* Em space */
          display: inline-block;
          width: 1em;
        }
        
        table th.sort-asc::after {
          content: "\\2191"; /* Upward arrow */
        }
        
        table th.sort-desc::after {
          content: "\\2193"; /* Downward arrow */
        }
        
        .pass {
          color: var(--secondary-color);
        }
        
        .fail {
          color: var(--danger-color);
        }
        
        .badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
          margin-right: 5px;
        }
        
        .badge-critical {
          background-color: #e74c3c;
          color: white;
        }
        
        .badge-high {
          background-color: #e67e22;
          color: white;
        }
        
        .badge-medium {
          background-color: #f1c40f;
          color: black;
        }
        
        .badge-low {
          background-color: #3498db;
          color: white;
        }
        
        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .filter-controls select, .filter-controls input {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(0, 0, 0, 0.1);
          color: var(--text-color);
        }
        
        .highlight {
          background-color: rgba(255, 255, 0, 0.2);
          transition: background-color 0.3s;
        }
        
        footer {
          margin-top: 50px;
          padding: 20px 0;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>${title}</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          ${results.target ? `<p>Target: ${results.target}</p>` : ''}
          ${results.chain ? `<p>Chain: ${results.chain}</p>` : ''}
          ${results.addon ? `<p>Addon: ${results.addon}</p>` : ''}
        </header>
        
        <div class="dashboard-section">
          <div class="section-header" onclick="toggleSection('summary-section')">
            <h2>Summary</h2>
            <span class="toggle-icon">▼</span>
          </div>
          <div id="summary-section" class="section-content">
            ${assets.summaryChart ? 
              `<div class="chart">
                <img src="${assets.summaryChart.file}" alt="Summary Chart" width="${assets.summaryChart.width}" height="${assets.summaryChart.height}">
              </div>` : 
              ''}
            
            <div class="card">
              <h3>Test Results</h3>
    `;
    
    // Add test results table
    if (results.tests && Object.keys(results.tests).length > 0) {
      html += `
        <div class="filter-controls">
          <select id="test-status-filter" onchange="filterTestTable()">
            <option value="all">All Status</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
          <input type="text" id="test-search" placeholder="Search tests..." onkeyup="filterTestTable()">
        </div>
        <table id="test-results-table">
          <thead>
            <tr>
              <th onclick="sortTable('test-results-table', 0)">Test Suite</th>
              <th onclick="sortTable('test-results-table', 1)">Status</th>
              <th onclick="sortTable('test-results-table', 2)">Details</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      Object.entries(results.tests).forEach(([testName, testSuite]) => {
        const status = testSuite.success ? 
          '<span class="pass">✓ Pass</span>' : 
          '<span class="fail">✗ Fail</span>';
        
        const statusClass = testSuite.success ? 'pass' : 'fail';
          
        html += `
          <tr data-status="${statusClass}">
            <td>${testName}</td>
            <td>${status}</td>
            <td>${testSuite.summary?.passRate || (testSuite.success ? '100%' : '0%')}</td>
          </tr>
        `;
      });
      
      html += `
          </tbody>
        </table>
      `;
    } else {
      html += '<p>No test results available.</p>';
    }
    
    html += `
          </div>
        </div>
      </div>
    `;
    
    // Add Gas Usage section if available
    if (assets.gasChart) {
      html += `
        <div class="dashboard-section">
          <div class="section-header" onclick="toggleSection('gas-section')">
            <h2>Gas Usage</h2>
            <span class="toggle-icon">▼</span>
          </div>
          <div id="gas-section" class="section-content">
            <div class="chart">
              <img src="${assets.gasChart.file}" alt="Gas Usage Chart" width="${assets.gasChart.width}" height="${assets.gasChart.height}">
            </div>
            
            ${results.gasData ? `
            <div class="card">
              <h3>Gas Price Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>Speed</th>
                    <th>Max Fee (Gwei)</th>
                    <th>Priority Fee (Gwei)</th>
                  </tr>
                </thead>
                <tbody>
            ` : ''}
        `;
        
        // Add gas data details if available
        if (results.gasData) {
          if (results.gasData.standard) {
            const maxFee = Math.round(parseInt(results.gasData.standard.maxFeePerGas || '0') / 1e9);
            const priorityFee = Math.round(parseInt(results.gasData.standard.maxPriorityFeePerGas || '0') / 1e9);
            
            html += `
              <tr>
                <td>Standard</td>
                <td>${maxFee}</td>
                <td>${priorityFee}</td>
              </tr>
            `;
          }
          
          if (results.gasData.fast) {
            const maxFee = Math.round(parseInt(results.gasData.fast.maxFeePerGas || '0') / 1e9);
            const priorityFee = Math.round(parseInt(results.gasData.fast.maxPriorityFeePerGas || '0') / 1e9);
            
            html += `
              <tr>
                <td>Fast</td>
                <td>${maxFee}</td>
                <td>${priorityFee}</td>
              </tr>
            `;
          }
          
          html += `
                </tbody>
              </table>
            </div>
          `;
        }
        
        html += `
          </div>
        </div>
        `;
    }
    
    // Add Addon section if available
    if (assets.addonChart && results.addon) {
      html += `
        <div class="dashboard-section">
          <div class="section-header" onclick="toggleSection('addon-section')">
            <h2>${results.addon} Tests</h2>
            <span class="toggle-icon">▼</span>
          </div>
          <div id="addon-section" class="section-content">
            <div class="chart">
              <img src="${assets.addonChart.file}" alt="${results.addon} Test Chart" width="${assets.addonChart.width}" height="${assets.addonChart.height}">
            </div>
            
            ${results.tests[results.addon] ? `
            <div class="card">
              <h3>Detailed Test Results</h3>
              <div class="filter-controls">
                <select id="addon-status-filter" onchange="filterAddonTable()">
                  <option value="all">All Status</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
                <input type="text" id="addon-search" placeholder="Search tests..." onkeyup="filterAddonTable()">
              </div>
              <table id="addon-results-table">
                <thead>
                  <tr>
                    <th onclick="sortTable('addon-results-table', 0)">Test</th>
                    <th onclick="sortTable('addon-results-table', 1)">Status</th>
                    <th onclick="sortTable('addon-results-table', 2)">Notes</th>
                  </tr>
                </thead>
                <tbody>
            ` : ''}
        `;
        
        // Add addon test details if available
        if (results.tests[results.addon] && results.tests[results.addon].tests) {
          Object.entries(results.tests[results.addon].tests).forEach(([testName, test]) => {
            const status = test.success ? 
              '<span class="pass">✓ Pass</span>' : 
              '<span class="fail">✗ Fail</span>';
            
            const statusClass = test.success ? 'pass' : 'fail';
              
            html += `
              <tr data-status="${statusClass}">
                <td>${testName}</td>
                <td>${status}</td>
                <td>${test.notes || ''}</td>
              </tr>
            `;
          });
          
          html += `
                </tbody>
              </table>
            </div>
          `;
        }
        
        html += `
          </div>
        </div>
        `;
    }
    
    // Add Vulnerabilities section if available
    if (assets.vulnerabilityChart && results.vulnerabilities && results.vulnerabilities.length > 0) {
      html += `
        <div class="dashboard-section">
          <div class="section-header" onclick="toggleSection('vuln-section')">
            <h2>Vulnerabilities</h2>
            <span class="toggle-icon">▼</span>
          </div>
          <div id="vuln-section" class="section-content">
            <div class="chart">
              <img src="${assets.vulnerabilityChart.file}" alt="Vulnerabilities Chart" width="${assets.vulnerabilityChart.width}" height="${assets.vulnerabilityChart.height}">
            </div>
            
            <div class="card">
              <h3>Detailed Findings</h3>
              <div class="filter-controls">
                <select id="severity-filter" onchange="filterVulnTable()">
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <input type="text" id="vuln-search" placeholder="Search vulnerabilities..." onkeyup="filterVulnTable()">
              </div>
              <table id="vulnerabilities-table">
                <thead>
                  <tr>
                    <th onclick="sortTable('vulnerabilities-table', 0)">Type</th>
                    <th onclick="sortTable('vulnerabilities-table', 1)">Severity</th>
                    <th onclick="sortTable('vulnerabilities-table', 2)">Description</th>
                  </tr>
                </thead>
                <tbody>
        `;
        
        // Add vulnerability details
        results.vulnerabilities.forEach(vuln => {
          const severity = (vuln.severity || 'medium').toLowerCase();
          const severityBadge = `<span class="badge badge-${severity}">${severity}</span>`;
          
          html += `
            <tr data-severity="${severity}">
              <td>${vuln.type || vuln.name || 'Unknown'}</td>
              <td>${severityBadge}</td>
              <td>${vuln.description || ''}</td>
            </tr>
          `;
        });
        
        html += `
                </tbody>
              </table>
            </div>
          </div>
        </div>
        `;
    }
    
    // Add Recommendations section if available
    if (results.recommendations && results.recommendations.length > 0) {
      html += `
        <div class="dashboard-section">
          <div class="section-header" onclick="toggleSection('recs-section')">
            <h2>Recommendations</h2>
            <span class="toggle-icon">▼</span>
          </div>
          <div id="recs-section" class="section-content">
            <div class="card">
              <ul id="recommendations-list">
        `;
        
        results.recommendations.forEach((rec, index) => {
          const recText = typeof rec === 'string' ? rec : rec.description || rec.title;
          html += `<li onclick="highlightItem('recommendations-list', ${index})">${recText}</li>`;
        });
        
        html += `
              </ul>
            </div>
          </div>
        </div>
        `;
    }
    
    // Add JavaScript Functions
    html += `
        <script>
          // Toggle section visibility
          function toggleSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.classList.toggle('collapsed');
            const header = section.previousElementSibling;
            const icon = header.querySelector('.toggle-icon');
            icon.textContent = section.classList.contains('collapsed') ? '▶' : '▼';
          }
          
          // Sort table by column
          function sortTable(tableId, columnIndex) {
            const table = document.getElementById(tableId);
            const header = table.getElementsByTagName('th')[columnIndex];
            const headers = table.getElementsByTagName('th');
            const isAscending = !header.classList.contains('sort-asc');
            
            // Reset all headers
            for (let i = 0; i < headers.length; i++) {
              headers[i].classList.remove('sort-asc', 'sort-desc');
            }
            
            header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
            
            const rows = Array.from(table.rows).slice(1); // Skip header row
            const tbody = table.tBodies[0];
            
            // Sort the rows
            rows.sort((a, b) => {
              const cellA = a.cells[columnIndex].textContent.trim();
              const cellB = b.cells[columnIndex].textContent.trim();
              
              // Try numeric sort if both values are numbers
              const numA = parseFloat(cellA);
              const numB = parseFloat(cellB);
              
              if (!isNaN(numA) && !isNaN(numB)) {
                return isAscending ? numA - numB : numB - numA;
              }
              
              // Otherwise do string comparison
              return isAscending ? 
                cellA.localeCompare(cellB) : 
                cellB.localeCompare(cellA);
            });
            
            // Re-add rows in new order
            rows.forEach(row => tbody.appendChild(row));
          }
          
          // Filter tables
          function filterTestTable() {
            filterTable('test-results-table', 'test-status-filter', 'test-search', 'status');
          }
          
          function filterAddonTable() {
            filterTable('addon-results-table', 'addon-status-filter', 'addon-search', 'status');
          }
          
          function filterVulnTable() {
            filterTable('vulnerabilities-table', 'severity-filter', 'vuln-search', 'severity');
          }
          
          function filterTable(tableId, filterSelectId, searchInputId, dataAttribute) {
            const table = document.getElementById(tableId);
            if (!table) return;
            
            const rows = table.getElementsByTagName('tr');
            const filterSelect = document.getElementById(filterSelectId);
            const searchInput = document.getElementById(searchInputId);
            
            const filterValue = filterSelect ? filterSelect.value : 'all';
            const searchText = searchInput ? searchInput.value.toLowerCase() : '';
            
            // Loop through table rows (skip header)
            for (let i = 1; i < rows.length; i++) {
              let row = rows[i];
              let showRow = true;
              
              // Check filter
              if (filterValue !== 'all') {
                const attrValue = row.getAttribute('data-' + dataAttribute);
                if (attrValue !== filterValue) {
                  showRow = false;
                }
              }
              
              // Check search text
              if (showRow && searchText) {
                let found = false;
                const cells = row.getElementsByTagName('td');
                for (let j = 0; j < cells.length; j++) {
                  const cellText = cells[j].textContent.toLowerCase();
                  if (cellText.includes(searchText)) {
                    found = true;
                    break;
                  }
                }
                showRow = found;
              }
              
              // Show or hide the row
              row.style.display = showRow ? '' : 'none';
            }
          }
          
          // Highlight a specific item
          function highlightItem(listId, index) {
            const list = document.getElementById(listId);
            if (!list) return;
            
            const items = list.getElementsByTagName('li');
            
            // Remove highlight from all items
            for (let i = 0; i < items.length; i++) {
              items[i].classList.remove('highlight');
            }
            
            // Add highlight to the clicked item
            if (index >= 0 && index < items.length) {
              items[index].classList.add('highlight');
            }
          }
        </script>
    `;
    
    // Close HTML template
    html += `
        <footer>
          Generated by Audityzer v${options.version || '1.0.0'} | ${new Date().getFullYear()}
        </footer>
      </div>
    </body>
    </html>
    `;
    
    return html;
  }
}

module.exports = {
  AADashboardGenerator
}; 