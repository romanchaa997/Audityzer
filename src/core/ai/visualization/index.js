/**
 * Phase 5: Visualization
 *
 * This module provides visualization capabilities for security vulnerability data,
 * including charts, graphs, and comprehensive reports.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Default configuration
let config = {
  dataStoragePath: null,
  visualizationStoragePath: null,
  reportOutputPath: null,
  enabledVisualizations: ['vulnerabilityTypes', 'severityDistribution', 'timelineTrends'],
  reportConfig: {
    includeCharts: true,
    includeRawData: false,
    includeRemediation: true,
    maxVulnerabilities: 50,
    format: 'html', // 'html', 'pdf', 'json'
  },
  chartStyles: {
    colorPalette: [
      '#FF5733',
      '#33FF57',
      '#3357FF',
      '#F3FF33',
      '#FF33F3',
      '#33FFF3',
      '#FF8C33',
      '#8C33FF',
      '#FF3333',
      '#33FF99',
    ],
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
  },
};

// Track initialization state
let initialized = false;

/**
 * Initialize the visualization module
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Update configuration with user settings
    config = {
      ...config,
      ...userConfig,
      visualizationStoragePath:
        userConfig.visualizationStoragePath ||
        path.join(userConfig.dataStoragePath || '', 'visualizations'),
      reportOutputPath:
        userConfig.reportOutputPath || path.join(userConfig.dataStoragePath || '', 'reports'),
    };

    // Merge nested configs
    if (userConfig.reportConfig) {
      config.reportConfig = { ...config.reportConfig, ...userConfig.reportConfig };
    }

    if (userConfig.chartStyles) {
      config.chartStyles = { ...config.chartStyles, ...userConfig.chartStyles };
    }

    // Ensure required directories exist
    await fs.ensureDir(config.visualizationStoragePath);
    await fs.ensureDir(config.reportOutputPath);
    await fs.ensureDir(path.join(config.visualizationStoragePath, 'charts'));
    await fs.ensureDir(path.join(config.visualizationStoragePath, 'reports'));
    await fs.ensureDir(path.join(config.visualizationStoragePath, 'data'));

    initialized = true;
    console.log('Visualization module initialized successfully');

    return true;
  } catch (error) {
    console.error('Failed to initialize visualization module:', error);
    return false;
  }
}

/**
 * Generate visualization for vulnerability data
 * @param {Object} options - Visualization options
 * @returns {Promise<Object>} Visualization result
 */
async function generateVisualization(options = {}) {
  if (!initialized) {
    throw new Error('Visualization module has not been initialized');
  }

  const {
    visualizationType,
    vulnerabilityData,
    dataSource,
    title = 'Vulnerability Visualization',
    description = '',
    format = config.reportConfig.format,
    width = 800,
    height = 600,
  } = options;

  try {
    // Validate inputs
    if (!visualizationType) {
      throw new Error('Visualization type is required');
    }

    if (!vulnerabilityData && !dataSource) {
      throw new Error('Either vulnerability data or data source must be provided');
    }

    // Check if visualization type is enabled
    if (!config.enabledVisualizations.includes(visualizationType)) {
      throw new Error(`Visualization type "${visualizationType}" is not enabled`);
    }

    // Generate a unique ID for this visualization
    const visualizationId = `viz-${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    // Load data if source is provided but not the data itself
    let data = vulnerabilityData;
    if (!data && dataSource) {
      if (await fs.pathExists(dataSource)) {
        data = await fs.readJson(dataSource);
      } else {
        throw new Error(`Data source not found: ${dataSource}`);
      }
    }

    // Generate visualization (simulated for now)
    console.log(`Generating ${visualizationType} visualization...`);

    // Prepare visualization metadata
    const visualization = {
      id: visualizationId,
      timestamp,
      type: visualizationType,
      title,
      description,
      format,
      dimensions: {
        width,
        height,
      },
      dataSourceType: vulnerabilityData ? 'inline' : 'file',
      dataSource: vulnerabilityData ? null : dataSource,
      generatedFiles: {},
    };

    // Handle different visualization types
    switch (visualizationType) {
      case 'vulnerabilityTypes':
        visualization.generatedFiles = await generateVulnerabilityTypesChart(data, visualization);
        break;
      case 'severityDistribution':
        visualization.generatedFiles = await generateSeverityDistributionChart(data, visualization);
        break;
      case 'timelineTrends':
        visualization.generatedFiles = await generateTimelineTrendsChart(data, visualization);
        break;
      default:
        throw new Error(`Unsupported visualization type: ${visualizationType}`);
    }

    // Save visualization metadata
    const metadataPath = path.join(
      config.visualizationStoragePath,
      'metadata',
      `${visualizationId}.json`
    );

    await fs.ensureDir(path.dirname(metadataPath));
    await fs.writeJson(metadataPath, visualization, { spaces: 2 });

    return {
      success: true,
      visualizationId,
      type: visualizationType,
      title,
      files: visualization.generatedFiles,
    };
  } catch (error) {
    console.error('Error generating visualization:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate a report from vulnerability data
 * @param {Object} options - Report options
 * @returns {Promise<Object>} Report generation result
 */
async function generateReport(options = {}) {
  if (!initialized) {
    throw new Error('Visualization module has not been initialized');
  }

  const {
    vulnerabilityData,
    dataSources = [],
    title = 'Security Vulnerability Report',
    description = 'Comprehensive analysis of detected vulnerabilities',
    includeCharts = config.reportConfig.includeCharts,
    includeRawData = config.reportConfig.includeRawData,
    includeRemediation = config.reportConfig.includeRemediation,
    format = config.reportConfig.format,
  } = options;

  try {
    // Validate inputs
    if (!vulnerabilityData && dataSources.length === 0) {
      throw new Error('Either vulnerability data or data sources must be provided');
    }

    // Generate a unique ID for this report
    const reportId = `report-${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    // Load data if sources are provided but not the data itself
    let allData = [];
    if (vulnerabilityData) {
      allData = Array.isArray(vulnerabilityData) ? vulnerabilityData : [vulnerabilityData];
    }

    // Load data from sources
    for (const source of dataSources) {
      if (await fs.pathExists(source)) {
        const sourceData = await fs.readJson(source);
        if (Array.isArray(sourceData)) {
          allData.push(...sourceData);
        } else {
          allData.push(sourceData);
        }
      } else {
        console.warn(`Data source not found: ${source}`);
      }
    }

    // Generate report (simulated for now)
    console.log(`Generating ${format} report...`);

    // Prepare report metadata
    const report = {
      id: reportId,
      timestamp,
      title,
      description,
      format,
      dataSources: vulnerabilityData ? ['inline'] : dataSources,
      vulnerabilityCount: countVulnerabilities(allData),
      charts: [],
      generatedFiles: {},
    };

    // Generate charts if requested
    if (includeCharts) {
      if (config.enabledVisualizations.includes('vulnerabilityTypes')) {
        const chart = await generateVisualization({
          visualizationType: 'vulnerabilityTypes',
          vulnerabilityData: allData,
          title: 'Vulnerability Types',
          format,
        });

        if (chart.success) {
          report.charts.push({
            type: 'vulnerabilityTypes',
            id: chart.visualizationId,
            files: chart.files,
          });
        }
      }

      if (config.enabledVisualizations.includes('severityDistribution')) {
        const chart = await generateVisualization({
          visualizationType: 'severityDistribution',
          vulnerabilityData: allData,
          title: 'Severity Distribution',
          format,
        });

        if (chart.success) {
          report.charts.push({
            type: 'severityDistribution',
            id: chart.visualizationId,
            files: chart.files,
          });
        }
      }
    }

    // Generate the final report file
    let reportFilePath;

    switch (format) {
      case 'html':
        reportFilePath = await generateHtmlReport(report, allData, {
          includeRawData,
          includeRemediation,
        });
        break;
      case 'pdf':
        reportFilePath = await generatePdfReport(report, allData, {
          includeRawData,
          includeRemediation,
        });
        break;
      case 'json':
      default:
        reportFilePath = await generateJsonReport(report, allData, {
          includeRawData,
          includeRemediation,
        });
        break;
    }

    report.generatedFiles.report = reportFilePath;

    // Save report metadata
    const metadataPath = path.join(config.visualizationStoragePath, 'reports', `${reportId}.json`);

    await fs.ensureDir(path.dirname(metadataPath));
    await fs.writeJson(metadataPath, report, { spaces: 2 });

    return {
      success: true,
      reportId,
      title,
      vulnerabilityCount: report.vulnerabilityCount,
      format,
      reportPath: reportFilePath,
    };
  } catch (error) {
    console.error('Error generating report:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Count vulnerabilities in data
 * @param {Array} data - Vulnerability data
 * @returns {number} Vulnerability count
 */
function countVulnerabilities(data) {
  let count = 0;

  for (const item of data) {
    if (item.vulnerabilities && Array.isArray(item.vulnerabilities)) {
      count += item.vulnerabilities.length;
    } else if (item.vulnerabilityCount) {
      count += item.vulnerabilityCount;
    }
  }

  return count;
}

/**
 * Generate vulnerability types chart (placeholder)
 * @param {Object} data - Vulnerability data
 * @param {Object} visualization - Visualization metadata
 * @returns {Promise<Object>} Generated files
 */
async function generateVulnerabilityTypesChart(data, visualization) {
  // In a real implementation, this would generate actual chart files
  // For now, just simulate it

  // Prepare output paths
  const outputDir = path.join(config.visualizationStoragePath, 'charts', visualization.id);

  await fs.ensureDir(outputDir);

  // Simulate chart generation
  const dataPath = path.join(outputDir, 'data.json');
  const imagePath = path.join(
    outputDir,
    `chart.${visualization.format === 'html' ? 'svg' : 'png'}`
  );

  // Write simulated data file
  await fs.writeJson(
    dataPath,
    {
      type: 'vulnerabilityTypes',
      data: extractVulnerabilityTypesData(data),
    },
    { spaces: 2 }
  );

  // Simulate writing image file
  await fs.writeFile(imagePath, 'Simulated chart image content');

  return {
    data: dataPath,
    image: imagePath,
  };
}

/**
 * Generate severity distribution chart (placeholder)
 * @param {Object} data - Vulnerability data
 * @param {Object} visualization - Visualization metadata
 * @returns {Promise<Object>} Generated files
 */
async function generateSeverityDistributionChart(data, visualization) {
  // In a real implementation, this would generate actual chart files
  // For now, just simulate it

  // Prepare output paths
  const outputDir = path.join(config.visualizationStoragePath, 'charts', visualization.id);

  await fs.ensureDir(outputDir);

  // Simulate chart generation
  const dataPath = path.join(outputDir, 'data.json');
  const imagePath = path.join(
    outputDir,
    `chart.${visualization.format === 'html' ? 'svg' : 'png'}`
  );

  // Write simulated data file
  await fs.writeJson(
    dataPath,
    {
      type: 'severityDistribution',
      data: extractSeverityDistributionData(data),
    },
    { spaces: 2 }
  );

  // Simulate writing image file
  await fs.writeFile(imagePath, 'Simulated chart image content');

  return {
    data: dataPath,
    image: imagePath,
  };
}

/**
 * Generate timeline trends chart (placeholder)
 * @param {Object} data - Vulnerability data
 * @param {Object} visualization - Visualization metadata
 * @returns {Promise<Object>} Generated files
 */
async function generateTimelineTrendsChart(data, visualization) {
  // In a real implementation, this would generate actual chart files
  // For now, just simulate it

  // Prepare output paths
  const outputDir = path.join(config.visualizationStoragePath, 'charts', visualization.id);

  await fs.ensureDir(outputDir);

  // Simulate chart generation
  const dataPath = path.join(outputDir, 'data.json');
  const imagePath = path.join(
    outputDir,
    `chart.${visualization.format === 'html' ? 'svg' : 'png'}`
  );

  // Write simulated data file
  await fs.writeJson(
    dataPath,
    {
      type: 'timelineTrends',
      data: extractTimelineTrendsData(data),
    },
    { spaces: 2 }
  );

  // Simulate writing image file
  await fs.writeFile(imagePath, 'Simulated chart image content');

  return {
    data: dataPath,
    image: imagePath,
  };
}

/**
 * Extract vulnerability types data
 * @param {Array} data - Vulnerability data
 * @returns {Object} Extracted data
 */
function extractVulnerabilityTypesData(data) {
  const typeCount = {};

  // Process each data item
  for (const item of data) {
    if (item.vulnerabilities && Array.isArray(item.vulnerabilities)) {
      for (const vuln of item.vulnerabilities) {
        const type = vuln.type || 'unknown';
        typeCount[type] = (typeCount[type] || 0) + 1;
      }
    }
  }

  // Convert to array format for charting
  return Object.entries(typeCount).map(([type, count]) => ({
    type,
    count,
  }));
}

/**
 * Extract severity distribution data
 * @param {Array} data - Vulnerability data
 * @returns {Object} Extracted data
 */
function extractSeverityDistributionData(data) {
  const severityCount = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  };

  // Process each data item
  for (const item of data) {
    if (item.vulnerabilities && Array.isArray(item.vulnerabilities)) {
      for (const vuln of item.vulnerabilities) {
        const severity = vuln.severity || 'info';
        severityCount[severity] = (severityCount[severity] || 0) + 1;
      }
    }
  }

  // Convert to array format for charting
  return Object.entries(severityCount).map(([severity, count]) => ({
    severity,
    count,
  }));
}

/**
 * Extract timeline trends data
 * @param {Array} data - Vulnerability data
 * @returns {Object} Extracted data
 */
function extractTimelineTrendsData(data) {
  const timelineData = {};

  // Process each data item
  for (const item of data) {
    if (item.vulnerabilities && Array.isArray(item.vulnerabilities)) {
      for (const vuln of item.vulnerabilities) {
        // Try to extract timestamp
        const timestamp =
          vuln.timestamp ||
          vuln.detectedAt ||
          vuln.createdAt ||
          item.timestamp ||
          new Date().toISOString();

        // Use date only, not time
        const date = timestamp.split('T')[0];

        if (!timelineData[date]) {
          timelineData[date] = {
            count: 0,
            bySeverity: {
              critical: 0,
              high: 0,
              medium: 0,
              low: 0,
              info: 0,
            },
          };
        }

        timelineData[date].count += 1;

        const severity = vuln.severity || 'info';
        timelineData[date].bySeverity[severity] += 1;
      }
    }
  }

  // Convert to array format for charting
  return Object.entries(timelineData)
    .map(([date, data]) => ({
      date,
      count: data.count,
      bySeverity: data.bySeverity,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Generate HTML report (placeholder)
 * @param {Object} report - Report metadata
 * @param {Array} data - Vulnerability data
 * @param {Object} options - Report options
 * @returns {Promise<string>} Report file path
 */
async function generateHtmlReport(report, data, options) {
  // In a real implementation, this would generate an actual HTML report
  // For now, just simulate it

  const reportDir = path.join(config.reportOutputPath, report.id);

  await fs.ensureDir(reportDir);

  const reportPath = path.join(reportDir, 'report.html');

  // Generate simple HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${report.title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        h1 { color: #333; }
        .summary { margin-bottom: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 5px; }
        .chart { margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
        .vulnerabilities { margin-bottom: 20px; }
        .vulnerability { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        .critical { border-left: 5px solid #ff0000; }
        .high { border-left: 5px solid #ff6600; }
        .medium { border-left: 5px solid #ffcc00; }
        .low { border-left: 5px solid #00cc00; }
        .info { border-left: 5px solid #0066ff; }
      </style>
    </head>
    <body>
      <h1>${report.title}</h1>
      <div class="summary">
        <p>${report.description}</p>
        <p>Generated: ${report.timestamp}</p>
        <p>Total vulnerabilities: ${report.vulnerabilityCount}</p>
      </div>
      
      <!-- Charts would be included here -->
      <div class="charts">
        ${report.charts
          .map(
            chart => `
          <div class="chart">
            <h2>${chart.type}</h2>
            <p>Chart visualization would be embedded here</p>
          </div>
        `
          )
          .join('')}
      </div>
      
      <!-- Vulnerabilities would be listed here -->
      <div class="vulnerabilities">
        <h2>Detected Vulnerabilities</h2>
        ${options.includeRawData ? 'Vulnerability data would be listed here' : ''}
      </div>
      
      <!-- Remediation would be included here -->
      ${options.includeRemediation ? '<div class="remediation"><h2>Remediation Recommendations</h2><p>Remediation suggestions would be listed here</p></div>' : ''}
    </body>
    </html>
  `;

  await fs.writeFile(reportPath, htmlContent);

  return reportPath;
}

/**
 * Generate PDF report (placeholder)
 * @param {Object} report - Report metadata
 * @param {Array} data - Vulnerability data
 * @param {Object} options - Report options
 * @returns {Promise<string>} Report file path
 */
async function generatePdfReport(report, data, options) {
  // In a real implementation, this would generate an actual PDF report
  // For now, just simulate it with a placeholder text file

  const reportDir = path.join(config.reportOutputPath, report.id);

  await fs.ensureDir(reportDir);

  const reportPath = path.join(reportDir, 'report.pdf');

  // Write a placeholder text file
  await fs.writeFile(
    reportPath,
    `Simulated PDF report: ${report.title}\nVulnerability count: ${report.vulnerabilityCount}`
  );

  return reportPath;
}

/**
 * Generate JSON report
 * @param {Object} report - Report metadata
 * @param {Array} data - Vulnerability data
 * @param {Object} options - Report options
 * @returns {Promise<string>} Report file path
 */
async function generateJsonReport(report, data, options) {
  const reportDir = path.join(config.reportOutputPath, report.id);

  await fs.ensureDir(reportDir);

  const reportPath = path.join(reportDir, 'report.json');

  // Prepare JSON report
  const jsonReport = {
    ...report,
    generatedAt: new Date().toISOString(),
  };

  if (options.includeRawData) {
    jsonReport.vulnerabilityData = data;
  }

  if (options.includeRemediation) {
    jsonReport.remediationSuggestions = extractRemediationSuggestions(data);
  }

  await fs.writeJson(reportPath, jsonReport, { spaces: 2 });

  return reportPath;
}

/**
 * Extract remediation suggestions from vulnerability data
 * @param {Array} data - Vulnerability data
 * @returns {Array} Remediation suggestions
 */
function extractRemediationSuggestions(data) {
  const remediations = {};

  // Process each data item
  for (const item of data) {
    if (item.vulnerabilities && Array.isArray(item.vulnerabilities)) {
      for (const vuln of item.vulnerabilities) {
        if (vuln.remediation) {
          const type = vuln.type || 'unknown';
          if (!remediations[type]) {
            remediations[type] = {
              type,
              suggestion: vuln.remediation,
              count: 0,
            };
          }
          remediations[type].count += 1;
        }
      }
    }
  }

  return Object.values(remediations);
}

module.exports = {
  initialize,
  generateVisualization,
  generateReport,
};
