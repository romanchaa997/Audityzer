/**
 * Audityzer - Enhanced Test Report Generator
 * 
 * This module generates interactive visual reports for security testing results.
 * It shows vulnerabilities, test coverage, and provides recommendations.
 */

const fs = require('fs');
const path = require('path');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const mermaid = require('mermaid-cli');

// Test result severity levels
const SEVERITY = {
  CRITICAL: 'critical',
  HIGH: 'high', 
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info'
};

// Get colors for different severity levels
function getSeverityColor(severity) {
  const colors = {
    [SEVERITY.CRITICAL]: '#ff0000',
    [SEVERITY.HIGH]: '#ff6600',
    [SEVERITY.MEDIUM]: '#ffcc00',
    [SEVERITY.LOW]: '#00cc66',
    [SEVERITY.INFO]: '#0099ff'
  };
  return colors[severity] || '#999999';
}

/**
 * Creates a vulnerability summary chart
 * @param {Object} testResults - The test results to visualize
 * @returns {Promise<Buffer>} - Chart image buffer
 */
async function createVulnerabilitySummaryChart(testResults) {
  // Configure chart
  const width = 800;
  const height = 500;
  const chartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };
  
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
  
  // Count vulnerabilities by severity
  const vulnerabilityCounts = {
    [SEVERITY.CRITICAL]: 0,
    [SEVERITY.HIGH]: 0,
    [SEVERITY.MEDIUM]: 0,
    [SEVERITY.LOW]: 0,
    [SEVERITY.INFO]: 0
  };
  
  testResults.tests.forEach(test => {
    if (test.vulnerabilities) {
      test.vulnerabilities.forEach(vuln => {
        vulnerabilityCounts[vuln.severity] = (vulnerabilityCounts[vuln.severity] || 0) + 1;
      });
    }
  });
  
  // Create chart configuration
  const configuration = {
    type: 'bar',
    data: {
      labels: Object.keys(vulnerabilityCounts).map(s => s.toUpperCase()),
      datasets: [{
        label: 'Vulnerabilities by Severity',
        data: Object.values(vulnerabilityCounts),
        backgroundColor: Object.keys(vulnerabilityCounts).map(getSeverityColor)
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Security Vulnerabilities by Severity',
          font: { size: 18 }
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Vulnerabilities'
          },
          ticks: {
            precision: 0
          }
        },
        x: {
          title: {
            display: true,
            text: 'Severity Level'
          }
        }
      }
    }
  };
  
  // Generate chart
  return await chartJSNodeCanvas.renderToBuffer(configuration);
}

/**
 * Creates a test coverage chart
 * @param {Object} testResults - The test results to visualize
 * @returns {Promise<Buffer>} - Chart image buffer
 */
async function createTestCoverageChart(testResults) {
  // Configure chart
  const width = 600;
  const height = 600;
  const chartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };
  
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
  
  // Group tests by category
  const testCategories = {};
  testResults.tests.forEach(test => {
    const category = test.category || 'General';
    testCategories[category] = testCategories[category] || { total: 0, passed: 0, failed: 0 };
    testCategories[category].total += 1;
    if (test.status === 'passed') {
      testCategories[category].passed += 1;
    } else {
      testCategories[category].failed += 1;
    }
  });
  
  // Convert to chart data
  const labels = Object.keys(testCategories);
  const passedData = labels.map(label => testCategories[label].passed);
  const failedData = labels.map(label => testCategories[label].failed);
  
  // Create chart configuration
  const configuration = {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Test Coverage',
        data: labels.map(label => testCategories[label].total),
        backgroundColor: [
          '#4bc0c0', '#ff9f40', '#36a2eb', '#ffcd56', '#9966ff',
          '#c9cbcf', '#ff6384', '#4d5360', '#7cbb5f', '#80b1d3'
        ]
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Test Coverage by Category',
          font: { size: 18 }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = testResults.tests.length;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} tests (${percentage}%)`;
            }
          }
        }
      }
    }
  };
  
  // Generate chart
  return await chartJSNodeCanvas.renderToBuffer(configuration);
}

/**
 * Generates a Mermaid diagram showing vulnerability impact paths
 * @param {Object} testResults - The test results to visualize
 * @returns {string} - HTML with Mermaid diagram
 */
function generateVulnerabilityFlowchart(testResults) {
  // Extract critical and high vulnerabilities for the diagram
  const criticalVulns = [];
  
  testResults.tests.forEach(test => {
    if (test.vulnerabilities) {
      test.vulnerabilities.forEach(vuln => {
        if (vuln.severity === SEVERITY.CRITICAL || vuln.severity === SEVERITY.HIGH) {
          criticalVulns.push({
            id: `vuln${criticalVulns.length + 1}`,
            name: vuln.name || `Vulnerability ${criticalVulns.length + 1}`,
            description: vuln.description || '',
            testName: test.name,
            severity: vuln.severity,
            impact: vuln.impact || 'Unknown'
          });
        }
      });
    }
  });
  
  // Generate Mermaid flowchart markup
  let mermaidChart = 'graph TD\n';
  mermaidChart += '  User[User/Wallet] --> Dapp[DApp Interface]\n';
  
  criticalVulns.forEach(vuln => {
    const nodeColor = vuln.severity === SEVERITY.CRITICAL ? 'fill:#ff0000,color:white' : 'fill:#ff6600,color:white';
    mermaidChart += `  Dapp --> ${vuln.id}["${vuln.name}"]:::${vuln.severity}\n`;
    mermaidChart += `  ${vuln.id} --> Impact${vuln.id}["Impact: ${vuln.impact}"]:::impact\n`;
  });
  
  // Add styles
  mermaidChart += '  classDef critical fill:#ff0000,color:white\n';
  mermaidChart += '  classDef high fill:#ff6600,color:white\n';
  mermaidChart += '  classDef impact fill:#f9f9f9,stroke:#999\n';
  
  return `<div class="mermaid">${mermaidChart}</div>`;
}

/**
 * Enhanced Test Report Generator
 * 
 * Generates comprehensive security test reports with interactive visualizations,
 * vulnerability flowcharts, and detailed recommendations.
 */
class TestReportGenerator {
  constructor(options = {}) {
    this.options = {
      outputDir: options.outputDir || path.join(process.cwd(), 'reports'),
      templateDir: options.templateDir || path.join(__dirname, '../../templates/reports'),
      includeCharts: options.includeCharts !== undefined ? options.includeCharts : true,
      includeFlowcharts: options.includeFlowcharts !== undefined ? options.includeFlowcharts : true,
      chartWidth: options.chartWidth || 800,
      chartHeight: options.chartHeight || 400,
      theme: options.theme || 'light'
    };
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.options.outputDir)) {
      fs.mkdirSync(this.options.outputDir, { recursive: true });
    }
    
    // Initialize chart generator if charts are enabled
    if (this.options.includeCharts) {
      this.chartGenerator = new ChartJSNodeCanvas({
        width: this.options.chartWidth,
        height: this.options.chartHeight,
        backgroundColour: this.options.theme === 'dark' ? '#2d3748' : '#ffffff'
      });
    }
  }
  
  /**
   * Generates a comprehensive security test report
   * 
   * @param {Object} testResults - The results of security tests
   * @param {Object} options - Additional options for report generation
   * @returns {string} - Path to the generated report
   */
  async generateReport(testResults, options = {}) {
    const reportId = options.reportId || `security-report-${Date.now()}`;
    const reportTitle = options.title || 'Web3 Security Test Report';
    const reportPath = path.join(this.options.outputDir, `${reportId}.html`);
    
    // Process and categorize test results
    const processedResults = this._processTestResults(testResults);
    
    // Generate charts
    const chartImages = this.options.includeCharts ? await this._generateCharts(processedResults) : {};
    
    // Generate vulnerability flowcharts
    const flowcharts = this.options.includeFlowcharts ? await this._generateFlowcharts(processedResults) : {};
    
    // Build HTML report
    const htmlReport = this._buildHtmlReport(reportTitle, processedResults, chartImages, flowcharts, options);
    
    // Write report to file
    fs.writeFileSync(reportPath, htmlReport);
    
    // Generate JSON summary
    const jsonSummaryPath = path.join(this.options.outputDir, `${reportId}-summary.json`);
    fs.writeFileSync(jsonSummaryPath, JSON.stringify(processedResults.summary, null, 2));
    
    console.log(`Report generated at: ${reportPath}`);
    return reportPath;
  }
  
  /**
   * Process and categorize test results
   * 
   * @param {Object} testResults - Raw test results
   * @returns {Object} - Processed and categorized test results
   */
  _processTestResults(testResults) {
    // Initialize result categories
    const categories = {
      critical: [],
      high: [],
      medium: [],
      low: [],
      info: []
    };
    
    const vulnerabilityTypes = {};
    const componentScores = {};
    let totalVulnerabilities = 0;
    let totalTests = 0;
    
    // Process each test result
    Object.entries(testResults).forEach(([testName, result]) => {
      totalTests++;
      
      // Extract component name from test name
      const componentName = testName.split('/')[0] || 'Unknown';
      
      // Initialize component score if not exists
      if (!componentScores[componentName]) {
        componentScores[componentName] = {
          score: 100,
          vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
            info: 0
          },
          passedTests: 0,
          totalTests: 0
        };
      }
      
      componentScores[componentName].totalTests++;
      
      // Skip passed tests
      if (result.passed) {
        componentScores[componentName].passedTests++;
        return;
      }
      
      // Determine vulnerability severity
      const severity = result.severity || 
        (result.impact === 'critical' ? 'critical' : 
         result.impact === 'high' ? 'high' : 
         result.impact === 'medium' ? 'medium' : 
         result.impact === 'low' ? 'low' : 'info');
      
      // Categorize by severity
      categories[severity].push({
        testName,
        component: componentName,
        description: result.description || 'No description provided',
        details: result.details || {},
        steps: result.steps || [],
        recommendation: result.recommendation || 'No recommendation provided',
        cwe: result.cwe || 'Not classified',
        severity
      });
      
      // Track vulnerability type frequency
      const vulnType = result.type || 'Unknown';
      vulnerabilityTypes[vulnType] = (vulnerabilityTypes[vulnType] || 0) + 1;
      
      // Update component score
      componentScores[componentName].vulnerabilities[severity]++;
      
      // Reduce score based on severity
      switch (severity) {
        case 'critical':
          componentScores[componentName].score -= 30;
          break;
        case 'high':
          componentScores[componentName].score -= 15;
          break;
        case 'medium':
          componentScores[componentName].score -= 7;
          break;
        case 'low':
          componentScores[componentName].score -= 3;
          break;
        case 'info':
          componentScores[componentName].score -= 1;
          break;
      }
      
      // Ensure score doesn't go below 0
      componentScores[componentName].score = Math.max(0, componentScores[componentName].score);
      
      totalVulnerabilities++;
    });
    
    // Calculate overall security score
    const overallScore = Object.values(componentScores).reduce((sum, component) => sum + component.score, 0) / 
                         (Object.keys(componentScores).length || 1);
    
    // Generate summary
    const summary = {
      totalTests,
      totalVulnerabilities,
      vulnerabilitiesBySeverity: {
        critical: categories.critical.length,
        high: categories.high.length,
        medium: categories.medium.length,
        low: categories.low.length,
        info: categories.info.length
      },
      vulnerabilityTypes,
      componentScores,
      overallScore: Math.round(overallScore)
    };
    
    return {
      categories,
      summary,
      timestamp: new Date().toISOString()
    };
  }
  
  /**
   * Generate charts for visualization
   * 
   * @param {Object} processedResults - Processed test results
   * @returns {Object} - Paths to generated chart images
   */
  async _generateCharts(processedResults) {
    if (!this.options.includeCharts) {
      return {};
    }
    
    const { summary } = processedResults;
    const chartsDir = path.join(this.options.outputDir, 'charts');
    
    if (!fs.existsSync(chartsDir)) {
      fs.mkdirSync(chartsDir, { recursive: true });
    }
    
    const chartImages = {};
    
    // Severity Distribution Chart
    const severityDistributionConfig = {
      type: 'pie',
      data: {
        labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
        datasets: [{
          data: [
            summary.vulnerabilitiesBySeverity.critical,
            summary.vulnerabilitiesBySeverity.high,
            summary.vulnerabilitiesBySeverity.medium,
            summary.vulnerabilitiesBySeverity.low,
            summary.vulnerabilitiesBySeverity.info
          ],
          backgroundColor: [
            '#e53e3e', // red for critical
            '#ed8936', // orange for high
            '#ecc94b', // yellow for medium
            '#48bb78', // green for low
            '#4299e1'  // blue for info
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Vulnerability Severity Distribution',
            font: { size: 16 }
          },
          legend: {
            position: 'right'
          }
        }
      }
    };
    
    // Component Security Score Chart
    const componentNames = Object.keys(summary.componentScores);
    const componentScores = componentNames.map(name => summary.componentScores[name].score);
    
    const componentScoreConfig = {
      type: 'bar',
      data: {
        labels: componentNames,
        datasets: [{
          label: 'Security Score',
          data: componentScores,
          backgroundColor: componentScores.map(score => 
            score >= 80 ? '#48bb78' : // green for good scores
            score >= 60 ? '#ecc94b' : // yellow for medium scores
            score >= 40 ? '#ed8936' : // orange for concerning scores
            '#e53e3e'                // red for bad scores
          ),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Component Security Scores',
            font: { size: 16 }
          }
        }
      }
    };
    
    // Vulnerability Types Chart
    const vulnTypes = Object.keys(summary.vulnerabilityTypes);
    const vulnTypeCounts = vulnTypes.map(type => summary.vulnerabilityTypes[type]);
    
    const vulnerabilityTypesConfig = {
      type: 'doughnut',
      data: {
        labels: vulnTypes,
        datasets: [{
          data: vulnTypeCounts,
          backgroundColor: [
            '#e53e3e', '#ed8936', '#ecc94b', '#48bb78', '#4299e1',
            '#9f7aea', '#ed64a6', '#667eea', '#d69e2e', '#38b2ac'
          ].slice(0, vulnTypes.length)
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Vulnerability Types Distribution',
            font: { size: 16 }
          },
          legend: {
            position: 'right'
          }
        }
      }
    };
    
    // Generate and save charts
    try {
      const severityChartBuffer = await this.chartGenerator.renderToBuffer(severityDistributionConfig);
      const severityChartPath = path.join(chartsDir, 'severity-distribution.png');
      fs.writeFileSync(severityChartPath, severityChartBuffer);
      chartImages.severityDistribution = path.relative(this.options.outputDir, severityChartPath);
      
      const componentScoreBuffer = await this.chartGenerator.renderToBuffer(componentScoreConfig);
      const componentScorePath = path.join(chartsDir, 'component-scores.png');
      fs.writeFileSync(componentScorePath, componentScoreBuffer);
      chartImages.componentScores = path.relative(this.options.outputDir, componentScorePath);
      
      const vulnTypesBuffer = await this.chartGenerator.renderToBuffer(vulnerabilityTypesConfig);
      const vulnTypesPath = path.join(chartsDir, 'vulnerability-types.png');
      fs.writeFileSync(vulnTypesPath, vulnTypesBuffer);
      chartImages.vulnerabilityTypes = path.relative(this.options.outputDir, vulnTypesPath);
    } catch (error) {
      console.error('Error generating charts:', error);
    }
    
    return chartImages;
  }
  
  /**
   * Generate vulnerability flowcharts
   * 
   * @param {Object} processedResults - Processed test results
   * @returns {Object} - Paths to generated flowchart images
   */
  async _generateFlowcharts(processedResults) {
    if (!this.options.includeFlowcharts) {
      return {};
    }
    
    const flowchartsDir = path.join(this.options.outputDir, 'flowcharts');
    
    if (!fs.existsSync(flowchartsDir)) {
      fs.mkdirSync(flowchartsDir, { recursive: true });
    }
    
    const flowcharts = {};
    
    // Generate vulnerability path flowcharts for critical and high vulnerabilities
    const criticalAndHighVulns = [
      ...processedResults.categories.critical,
      ...processedResults.categories.high
    ];
    
    for (const vuln of criticalAndHighVulns) {
      if (!vuln.steps || vuln.steps.length === 0) {
        continue;
      }
      
      // Create mermaid flowchart definition
      let mermaidDef = 'graph TD;\n';
      
      // Add nodes and edges for each step
      vuln.steps.forEach((step, index) => {
        const nodeId = `s${index}`;
        const nextNodeId = `s${index + 1}`;
        
        // Add node with description
        mermaidDef += `${nodeId}["${step.description || `Step ${index + 1}`}"];\n`;
        
        // Add edge to next step if not the last one
        if (index < vuln.steps.length - 1) {
          mermaidDef += `${nodeId} --> ${nextNodeId};\n`;
        }
        
        // Add edge to vulnerability impact if last step
        if (index === vuln.steps.length - 1) {
          mermaidDef += `${nodeId} --> impact["IMPACT: ${vuln.severity.toUpperCase()}"];\n`;
        }
      });
      
      // Add styling
      mermaidDef += 'classDef critical fill:#e53e3e,color:white,stroke-width:2px;\n';
      mermaidDef += 'classDef high fill:#ed8936,color:white,stroke-width:2px;\n';
      mermaidDef += 'class impact critical;\n';
      
      // Generate flowchart
      try {
        const mermaidFilePath = path.join(flowchartsDir, `flow-${vuln.testName.replace(/\//g, '-')}.mmd`);
        const pngOutputPath = path.join(flowchartsDir, `flow-${vuln.testName.replace(/\//g, '-')}.png`);
        
        // Write mermaid definition to file
        fs.writeFileSync(mermaidFilePath, mermaidDef);
        
        // Convert to PNG using mermaid-cli
        await mermaid.run(mermaidFilePath, pngOutputPath);
        
        // Add to flowcharts object
        flowcharts[vuln.testName] = path.relative(this.options.outputDir, pngOutputPath);
      } catch (error) {
        console.error(`Error generating flowchart for ${vuln.testName}:`, error);
      }
    }
    
    return flowcharts;
  }
  
  /**
   * Build HTML report
   * 
   * @param {string} title - Report title
   * @param {Object} processedResults - Processed test results
   * @param {Object} chartImages - Paths to chart images
   * @param {Object} flowcharts - Paths to flowchart images
   * @param {Object} options - Additional options
   * @returns {string} - HTML content
   */
  _buildHtmlReport(title, processedResults, chartImages, flowcharts, options) {
    const { summary, categories, timestamp } = processedResults;
    
    // Helper to create vulnerability section
    const createVulnSection = (vulns, severity) => {
      if (vulns.length === 0) {
        return '';
      }
      
      let section = `
        <div class="vulnerability-section ${severity}">
          <h3>${severity.charAt(0).toUpperCase() + severity.slice(1)} Severity Vulnerabilities (${vulns.length})</h3>
          <div class="vulnerabilities">
      `;
      
      vulns.forEach(vuln => {
        section += `
          <div class="vulnerability-card">
            <div class="vulnerability-header">
              <h4>${vuln.testName}</h4>
              <span class="severity-badge ${severity}">${severity.toUpperCase()}</span>
            </div>
            <div class="vulnerability-body">
              <p><strong>Description:</strong> ${vuln.description}</p>
              <p><strong>Component:</strong> ${vuln.component}</p>
              ${vuln.cwe ? `<p><strong>CWE:</strong> ${vuln.cwe}</p>` : ''}
              <p><strong>Recommendation:</strong> ${vuln.recommendation}</p>
            </div>
        `;
        
        // Add flowchart if available
        if (flowcharts[vuln.testName]) {
          section += `
            <div class="vulnerability-flowchart">
              <h5>Vulnerability Path</h5>
              <img src="${flowcharts[vuln.testName]}" alt="Vulnerability flowchart">
            </div>
          `;
        }
        
        // Add steps if available
        if (vuln.steps && vuln.steps.length > 0) {
          section += `
            <div class="vulnerability-steps">
              <h5>Reproduction Steps</h5>
              <ol>
                ${vuln.steps.map(step => `<li>${step.description || 'No description'}</li>`).join('')}
              </ol>
            </div>
          `;
        }
        
        section += `
            </div>
          </div>
        `;
      });
      
      section += `
          </div>
        </div>
      `;
      
      return section;
    };
    
    // Build HTML content
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          :root {
            --color-critical: #e53e3e;
            --color-high: #ed8936;
            --color-medium: #ecc94b;
            --color-low: #48bb78;
            --color-info: #4299e1;
            --color-bg: ${this.options.theme === 'dark' ? '#1a202c' : '#ffffff'};
            --color-text: ${this.options.theme === 'dark' ? '#e2e8f0' : '#1a202c'};
            --color-border: ${this.options.theme === 'dark' ? '#2d3748' : '#e2e8f0'};
            --color-card-bg: ${this.options.theme === 'dark' ? '#2d3748' : '#f7fafc'};
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--color-text);
            background-color: var(--color-bg);
            margin: 0;
            padding: 0;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          
          .header {
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 1rem;
          }
          
          .security-score {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          
          .score-circle {
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: ${summary.overallScore >= 80 ? 'var(--color-low)' : 
                              summary.overallScore >= 60 ? 'var(--color-medium)' :
                              summary.overallScore >= 40 ? 'var(--color-high)' : 'var(--color-critical)'};
            color: white;
            text-align: center;
            line-height: 100px;
            font-size: 2rem;
            font-weight: bold;
            margin-right: 1rem;
          }
          
          .summary-section {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 2rem;
          }
          
          .summary-card {
            flex: 1;
            min-width: 250px;
            margin: 0.5rem;
            padding: 1rem;
            background-color: var(--color-card-bg);
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .charts-section {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 2rem;
          }
          
          .chart-container {
            flex: 1;
            min-width: 300px;
            margin: 0.5rem;
            background-color: var(--color-card-bg);
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .chart-container img {
            max-width: 100%;
            height: auto;
          }
          
          .vulnerability-section {
            margin-bottom: 2rem;
            padding: 1rem;
            border-radius: 0.5rem;
            border-left: 5px solid var(--color-critical);
          }
          
          .vulnerability-section.critical {
            border-left-color: var(--color-critical);
            background-color: ${this.options.theme === 'dark' ? 'rgba(229, 62, 62, 0.1)' : 'rgba(229, 62, 62, 0.05)'};
          }
          
          .vulnerability-section.high {
            border-left-color: var(--color-high);
            background-color: ${this.options.theme === 'dark' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(237, 137, 54, 0.05)'};
          }
          
          .vulnerability-section.medium {
            border-left-color: var(--color-medium);
            background-color: ${this.options.theme === 'dark' ? 'rgba(236, 201, 75, 0.1)' : 'rgba(236, 201, 75, 0.05)'};
          }
          
          .vulnerability-section.low {
            border-left-color: var(--color-low);
            background-color: ${this.options.theme === 'dark' ? 'rgba(72, 187, 120, 0.1)' : 'rgba(72, 187, 120, 0.05)'};
          }
          
          .vulnerability-section.info {
            border-left-color: var(--color-info);
            background-color: ${this.options.theme === 'dark' ? 'rgba(66, 153, 225, 0.1)' : 'rgba(66, 153, 225, 0.05)'};
          }
          
          .vulnerabilities {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
            gap: 1rem;
          }
          
          .vulnerability-card {
            background-color: var(--color-card-bg);
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .vulnerability-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            background-color: ${this.options.theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
            border-bottom: 1px solid var(--color-border);
          }
          
          .vulnerability-body {
            padding: 1rem;
          }
          
          .vulnerability-steps, .vulnerability-flowchart {
            padding: 0 1rem 1rem;
          }
          
          .severity-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
            color: white;
          }
          
          .severity-badge.critical {
            background-color: var(--color-critical);
          }
          
          .severity-badge.high {
            background-color: var(--color-high);
          }
          
          .severity-badge.medium {
            background-color: var(--color-medium);
            color: #1a202c;
          }
          
          .severity-badge.low {
            background-color: var(--color-low);
            color: #1a202c;
          }
          
          .severity-badge.info {
            background-color: var(--color-info);
          }
          
          .footer {
            margin-top: 2rem;
            border-top: 1px solid var(--color-border);
            padding-top: 1rem;
            text-align: center;
            font-size: 0.875rem;
            color: ${this.options.theme === 'dark' ? '#a0aec0' : '#718096'};
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
            <p>Generated on: ${new Date(timestamp).toLocaleString()}</p>
          </div>
          
          <div class="security-score">
            <div class="score-circle">${summary.overallScore}</div>
            <h2>Overall Security Score</h2>
          </div>
          
          <div class="summary-section">
            <div class="summary-card">
              <h3>Test Summary</h3>
              <p>Total Tests: ${summary.totalTests}</p>
              <p>Total Vulnerabilities: ${summary.totalVulnerabilities}</p>
              <p>Pass Rate: ${Math.round((summary.totalTests - summary.totalVulnerabilities) / summary.totalTests * 100)}%</p>
            </div>
            
            <div class="summary-card">
              <h3>Vulnerability Severity</h3>
              <p>Critical: ${summary.vulnerabilitiesBySeverity.critical}</p>
              <p>High: ${summary.vulnerabilitiesBySeverity.high}</p>
              <p>Medium: ${summary.vulnerabilitiesBySeverity.medium}</p>
              <p>Low: ${summary.vulnerabilitiesBySeverity.low}</p>
              <p>Info: ${summary.vulnerabilitiesBySeverity.info}</p>
            </div>
            
            <div class="summary-card">
              <h3>Key Recommendations</h3>
              <ul>
                ${categories.critical.length > 0 ? `<li>Address ${categories.critical.length} critical vulnerabilities immediately</li>` : ''}
                ${categories.high.length > 0 ? `<li>Resolve ${categories.high.length} high severity issues as soon as possible</li>` : ''}
                ${categories.medium.length > 0 ? `<li>Plan to fix ${categories.medium.length} medium severity vulnerabilities</li>` : ''}
                ${categories.critical.length === 0 && categories.high.length === 0 ? '<li>No critical or high vulnerabilities found</li>' : ''}
              </ul>
            </div>
          </div>
          
          <div class="charts-section">
            ${chartImages.severityDistribution ? `
              <div class="chart-container">
                <h3>Severity Distribution</h3>
                <img src="${chartImages.severityDistribution}" alt="Severity distribution chart">
              </div>
            ` : ''}
            
            ${chartImages.componentScores ? `
              <div class="chart-container">
                <h3>Component Security Scores</h3>
                <img src="${chartImages.componentScores}" alt="Component security scores chart">
              </div>
            ` : ''}
            
            ${chartImages.vulnerabilityTypes ? `
              <div class="chart-container">
                <h3>Vulnerability Types</h3>
                <img src="${chartImages.vulnerabilityTypes}" alt="Vulnerability types chart">
              </div>
            ` : ''}
          </div>
          
          <h2>Detailed Findings</h2>
          
          ${createVulnSection(categories.critical, 'critical')}
          ${createVulnSection(categories.high, 'high')}
          ${createVulnSection(categories.medium, 'medium')}
          ${createVulnSection(categories.low, 'low')}
          ${createVulnSection(categories.info, 'info')}
          
          <div class="footer">
            <p>Web3 Security Test Report - Generated by Web3 Security Test Kit</p>
            <p>Version: ${process.env.npm_package_version || '1.0.0'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    return html;
  }
}

module.exports = TestReportGenerator; 