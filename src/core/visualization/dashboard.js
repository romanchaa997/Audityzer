/**
 * Web3 Security Visualization Dashboard
 *
 * Provides a comprehensive dashboard for visualizing security test results,
 * vulnerability reports, and performance metrics.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs-extra');
const WebSocket = require('ws');
const open = require('open');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};
const { logger } = require('../utils/logger');

class SecurityDashboard {
  /**
   * Initialize the security dashboard
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      port: options.port || 3000,
      dataDir: options.dataDir || './data/dashboard',
      reportsDir: options.reportsDir || './test-results',
      autoOpen: options.autoOpen !== false,
      liveUpdates: options.liveUpdates !== false,
      host: options.host || 'localhost',
      assetsDir: path.join(__dirname, 'assets'),
      logLevel: options.logLevel || 'info',
      ...options,
    };

    // Initialize logger
    this.logger = logger.child({ module: 'SecurityDashboard' });
    this.logger.level = this.options.logLevel;

    // Create data directories
    fs.ensureDirSync(this.options.dataDir);
    fs.ensureDirSync(path.join(this.options.dataDir, 'cache'));

    // Initialize express app
    this.app = express();
    this.server = http.createServer(this.app);

    // Initialize WebSocket server for live updates
    this.wss = new WebSocket.Server({ server: this.server });
    this.clients = new Set();

    // Initialize data cache
    this.cache = {
      reports: [],
      vulnerabilities: [],
      metrics: {},
      summary: {},
      lastUpdated: Date.now(),
    };

    // Configure middleware and routes
    this._configureApp();

    // Set up WebSocket handlers
    this._setupWebSocketHandlers();
  }

  /**
   * Configure the Express application
   * @private
   */
  _configureApp() {
    // Static assets
    this.app.use('/assets', express.static(this.options.assetsDir));

    // JSON body parser
    this.app.use(express.json({ limit: '10mb' }));

    // CORS headers
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // API routes
    this._setupApiRoutes();

    // Main dashboard route
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(this.options.assetsDir, 'index.html'));
    });

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({ error: 'Not found' });
    });

    // Error handler
    this.app.use((err, req, res, next) => {
      this.logger.error(`API error: ${err.message}`);
      res.status(500).json({ error: err.message });
    });
  }

  /**
   * Set up API routes
   * @private
   */
  _setupApiRoutes() {
    // Get dashboard summary
    this.app.get('/api/summary', async (req, res) => {
      try {
        await this._loadData();
        res.json(this.cache.summary);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get all security reports
    this.app.get('/api/reports', async (req, res) => {
      try {
        await this._loadData();

        // Apply filters if provided
        let reports = this.cache.reports;

        if (req.query.status) {
          reports = reports.filter(r => r.status === req.query.status);
        }

        if (req.query.type) {
          reports = reports.filter(r => r.type === req.query.type);
        }

        if (req.query.search) {
          const search = req.query.search.toLowerCase();
          reports = reports.filter(
            r =>
              r.name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search)
          );
        }

        res.json(reports);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get a specific report by ID
    this.app.get('/api/reports/:id', async (req, res) => {
      try {
        await this._loadData();

        const report = this.cache.reports.find(r => r.id === req.params.id);

        if (!report) {
          return res.status(404).json({ error: 'Report not found' });
        }

        res.json(report);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get all vulnerabilities
    this.app.get('/api/vulnerabilities', async (req, res) => {
      try {
        await this._loadData();

        // Apply filters if provided
        let vulnerabilities = this.cache.vulnerabilities;

        if (req.query.severity) {
          vulnerabilities = vulnerabilities.filter(v => v.severity === req.query.severity);
        }

        if (req.query.status) {
          vulnerabilities = vulnerabilities.filter(v => v.status === req.query.status);
        }

        if (req.query.type) {
          vulnerabilities = vulnerabilities.filter(v => v.type === req.query.type);
        }

        if (req.query.search) {
          const search = req.query.search.toLowerCase();
          vulnerabilities = vulnerabilities.filter(
            v =>
              v.title.toLowerCase().includes(search) || v.description.toLowerCase().includes(search)
          );
        }

        res.json(vulnerabilities);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get performance metrics
    this.app.get('/api/metrics', async (req, res) => {
      try {
        await this._loadData();
        res.json(this.cache.metrics);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Trigger data refresh
    this.app.post('/api/refresh', async (req, res) => {
      try {
        await this._loadData(true);
        res.json({ success: true, timestamp: this.cache.lastUpdated });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get report types
    this.app.get('/api/reports/types', async (req, res) => {
      try {
        await this._loadData();

        const types = Array.from(new Set(this.cache.reports.map(r => r.type)));

        res.json(types);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get vulnerability types
    this.app.get('/api/vulnerabilities/types', async (req, res) => {
      try {
        await this._loadData();

        const types = Array.from(new Set(this.cache.vulnerabilities.map(v => v.type)));

        res.json(types);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  /**
   * Set up WebSocket handlers
   * @private
   */
  _setupWebSocketHandlers() {
    this.wss.on('connection', ws => {
      this.clients.add(ws);

      ws.on('message', message => {
        try {
          const data = JSON.parse(message);

          // Handle client messages
          if (data.type === 'refresh') {
            this._loadData(true)
              .then(() => this._broadcastUpdate())
              .catch(error => {
                this.logger.error(`Error refreshing data: ${error.message}`);
              });
          }
        } catch (error) {
          this.logger.error(`WebSocket error: ${error.message}`);
        }
      });

      ws.on('close', () => {
        this.clients.delete(ws);
      });

      // Send initial data
      this._loadData()
        .then(() => {
          ws.send(
            JSON.stringify({
              type: 'initial',
              data: {
                summary: this.cache.summary,
                lastUpdated: this.cache.lastUpdated,
              },
            })
          );
        })
        .catch(error => {
          this.logger.error(`Error loading initial data: ${error.message}`);
        });
    });
  }

  /**
   * Broadcast an update to all connected clients
   * @private
   */
  _broadcastUpdate() {
    const message = JSON.stringify({
      type: 'update',
      data: {
        summary: this.cache.summary,
        lastUpdated: this.cache.lastUpdated,
      },
    });

    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }

  /**
   * Load data from files
   * @private
   * @param {boolean} forceRefresh - Whether to force a refresh
   * @returns {Promise<void>}
   */
  async _loadData(forceRefresh = false) {
    // Check if cache is fresh (within 5 minutes) and not a forced refresh
    const cacheAge = Date.now() - this.cache.lastUpdated;
    if (!forceRefresh && cacheAge < 5 * 60 * 1000) {
      return;
    }

    try {
      this.logger.debug('Loading dashboard data...');

      // Load all report files
      const reports = await this._loadReports();

      // Extract vulnerabilities from reports
      const vulnerabilities = this._extractVulnerabilities(reports);

      // Generate metrics
      const metrics = this._generateMetrics(reports, vulnerabilities);

      // Generate summary
      const summary = this._generateSummary(reports, vulnerabilities, metrics);

      // Update cache
      this.cache = {
        reports,
        vulnerabilities,
        metrics,
        summary,
        lastUpdated: Date.now(),
      };

      // Save cache to file
      await fs.writeJSON(
        path.join(this.options.dataDir, 'cache', 'dashboard-data.json'),
        this.cache,
        { spaces: 2 }
      );

      this.logger.debug('Dashboard data loaded');
    } catch (error) {
      this.logger.error(`Error loading data: ${error.message}`);
      throw error;
    }
  }

  /**
   * Load all security reports
   * @private
   * @returns {Promise<Array<Object>>} Security reports
   */
  async _loadReports() {
    const reports = [];

    try {
      // Scan the reports directory for JSON files
      const reportDirs = [
        path.join(this.options.reportsDir, 'security'),
        path.join(this.options.reportsDir, 'bridge-tests'),
        path.join(this.options.reportsDir, 'bounty-submissions'),
      ];

      for (const dir of reportDirs) {
        if (!fs.existsSync(dir)) {
          continue;
        }

        const files = await fs.readdir(dir);

        for (const file of files) {
          if (!file.endsWith('.json')) {
            continue;
          }

          try {
            const report = await fs.readJSON(path.join(dir, file));

            // Add metadata
            report.id = report.id || file.replace('.json', '');
            report.filename = file;
            report.path = path.join(dir, file);

            // Determine report type based on directory or content
            if (dir.includes('bridge-tests')) {
              report.type = 'bridge';
            } else if (dir.includes('bounty-submissions')) {
              report.type = 'bounty';
            } else {
              report.type = report.type || 'security';
            }

            reports.push(report);
          } catch (error) {
            this.logger.warn(`Error parsing report file ${file}: ${error.message}`);
          }
        }
      }

      // Sort reports by timestamp (most recent first)
      reports.sort((a, b) => {
        const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return bTime - aTime;
      });

      return reports;
    } catch (error) {
      this.logger.error(`Error loading reports: ${error.message}`);
      throw error;
    }
  }

  /**
   * Extract vulnerabilities from reports
   * @private
   * @param {Array<Object>} reports - Security reports
   * @returns {Array<Object>} Vulnerabilities
   */
  _extractVulnerabilities(reports) {
    const vulnerabilities = [];

    for (const report of reports) {
      // Check various formats that vulnerabilities might be stored in
      const reportVulnerabilities =
        report.vulnerabilities || report.results?.vulnerabilities || report.findings || [];

      for (const vulnerability of reportVulnerabilities) {
        // Standardize vulnerability object
        const standardVulnerability = {
          id: vulnerability.id || `${report.id}-${vulnerabilities.length}`,
          reportId: report.id,
          title: vulnerability.title || vulnerability.name || 'Unnamed Vulnerability',
          description: vulnerability.description || '',
          severity: vulnerability.severity || 'Unknown',
          type: vulnerability.type || vulnerability.category || 'Unknown',
          status: vulnerability.status || 'Open',
          location: vulnerability.location || '',
          code_snippet: vulnerability.code_snippet || vulnerability.codeSnippet || '',
          recommendation: vulnerability.recommendation || vulnerability.remediation || '',
          metadata: { ...vulnerability },
        };

        vulnerabilities.push(standardVulnerability);
      }
    }

    return vulnerabilities;
  }

  /**
   * Generate metrics from reports and vulnerabilities
   * @private
   * @param {Array<Object>} reports - Security reports
   * @param {Array<Object>} vulnerabilities - Vulnerabilities
   * @returns {Object} Metrics
   */
  _generateMetrics(reports, vulnerabilities) {
    const metrics = {
      totalReports: reports.length,
      reportsByType: {},
      reportsByStatus: {},
      totalVulnerabilities: vulnerabilities.length,
      vulnerabilitiesBySeverity: {
        Critical: 0,
        High: 0,
        Medium: 0,
        Low: 0,
        Informational: 0,
        Unknown: 0,
      },
      vulnerabilitiesByType: {},
      vulnerabilitiesByStatus: {},
      timelineData: this._generateTimelineData(reports),
    };

    // Count reports by type
    for (const report of reports) {
      metrics.reportsByType[report.type] = (metrics.reportsByType[report.type] || 0) + 1;
      metrics.reportsByStatus[report.status] = (metrics.reportsByStatus[report.status] || 0) + 1;
    }

    // Count vulnerabilities by severity, type, and status
    for (const vulnerability of vulnerabilities) {
      // Count by severity
      const severity = vulnerability.severity || 'Unknown';
      metrics.vulnerabilitiesBySeverity[severity] =
        (metrics.vulnerabilitiesBySeverity[severity] || 0) + 1;

      // Count by type
      const type = vulnerability.type || 'Unknown';
      metrics.vulnerabilitiesByType[type] = (metrics.vulnerabilitiesByType[type] || 0) + 1;

      // Count by status
      const status = vulnerability.status || 'Open';
      metrics.vulnerabilitiesByStatus[status] = (metrics.vulnerabilitiesByStatus[status] || 0) + 1;
    }

    return metrics;
  }

  /**
   * Generate timeline data from reports
   * @private
   * @param {Array<Object>} reports - Security reports
   * @returns {Array<Object>} Timeline data
   */
  _generateTimelineData(reports) {
    const timelineData = [];

    // Group reports by day
    const reportsByDay = {};

    for (const report of reports) {
      if (!report.timestamp) {
        continue;
      }

      const date = new Date(report.timestamp);
      const day = date.toISOString().split('T')[0];

      if (!reportsByDay[day]) {
        reportsByDay[day] = [];
      }

      reportsByDay[day].push(report);
    }

    // Create timeline data points
    for (const [day, dayReports] of Object.entries(reportsByDay)) {
      timelineData.push({
        date: day,
        count: dayReports.length,
        vulnerabilities: dayReports.reduce((count, report) => {
          const vulns =
            report.vulnerabilities || report.results?.vulnerabilities || report.findings || [];
          return count + vulns.length;
        }, 0),
      });
    }

    // Sort by date
    timelineData.sort((a, b) => a.date.localeCompare(b.date));

    return timelineData;
  }

  /**
   * Generate summary from reports, vulnerabilities, and metrics
   * @private
   * @param {Array<Object>} reports - Security reports
   * @param {Array<Object>} vulnerabilities - Vulnerabilities
   * @param {Object} metrics - Metrics
   * @returns {Object} Summary
   */
  _generateSummary(reports, vulnerabilities, metrics) {
    const criticalCount = metrics.vulnerabilitiesBySeverity.Critical || 0;
    const highCount = metrics.vulnerabilitiesBySeverity.High || 0;

    const summary = {
      securityScore: this._calculateSecurityScore(vulnerabilities),
      criticalIssues: criticalCount,
      highIssues: highCount,
      totalIssues: vulnerabilities.length,
      recentReports: reports.slice(0, 5).map(r => ({
        id: r.id,
        name: r.name || r.id,
        type: r.type,
        timestamp: r.timestamp,
        vulnerabilityCount: (r.vulnerabilities || r.results?.vulnerabilities || r.findings || [])
          .length,
      })),
      topVulnerabilityTypes: Object.entries(metrics.vulnerabilitiesByType)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([type, count]) => ({ type, count })),
      securityStatus: this._determineSecurityStatus(criticalCount, highCount),
    };

    return summary;
  }

  /**
   * Calculate a security score based on vulnerabilities
   * @private
   * @param {Array<Object>} vulnerabilities - Vulnerabilities
   * @returns {number} Security score (0-100)
   */
  _calculateSecurityScore(vulnerabilities) {
    if (vulnerabilities.length === 0) {
      return 100;
    }

    // Assign weights to different severity levels
    const weights = {
      Critical: 10,
      High: 5,
      Medium: 2,
      Low: 1,
      Informational: 0.1,
      Unknown: 1,
    };

    // Calculate weighted sum of vulnerabilities
    let weightedSum = 0;

    for (const vulnerability of vulnerabilities) {
      const severity = vulnerability.severity || 'Unknown';
      weightedSum += weights[severity] || weights.Unknown;
    }

    // Calculate score (inverse of weighted sum, capped at 100)
    // Higher weightedSum means lower score
    const score = Math.max(0, 100 - Math.min(100, weightedSum));

    return Math.round(score);
  }

  /**
   * Determine the overall security status based on critical and high issues
   * @private
   * @param {number} criticalCount - Number of critical issues
   * @param {number} highCount - Number of high issues
   * @returns {string} Security status
   */
  _determineSecurityStatus(criticalCount, highCount) {
    if (criticalCount > 0) {
      return 'Critical';
    } else if (highCount > 0) {
      return 'Warning';
    } else {
      return 'Good';
    }
  }

  /**
   * Start the dashboard server
   * @returns {Promise<Object>} Server information
   */
  async start() {
    return new Promise((resolve, reject) => {
      try {
        // Start HTTP server
        this.server.listen(this.options.port, this.options.host, () => {
          const url = `http://${this.options.host}:${this.options.port}`;
          this.logger.info(`Dashboard running at ${url}`);

          // Open browser if autoOpen is true
          if (this.options.autoOpen) {
            open(url).catch(error => {
              this.logger.warn(`Failed to open browser: ${error.message}`);
            });
          }

          resolve({
            url,
            port: this.options.port,
            host: this.options.host,
          });
        });

        // Start data polling if liveUpdates is true
        if (this.options.liveUpdates) {
          this._startDataPolling();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Start polling for data updates
   * @private
   */
  _startDataPolling() {
    // Poll every minute
    this.pollingInterval = setInterval(() => {
      this._loadData()
        .then(() => {
          if (this.clients.size > 0) {
            this._broadcastUpdate();
          }
        })
        .catch(error => {
          this.logger.error(`Error polling for data: ${error.message}`);
        });
    }, 60000);
  }

  /**
   * Stop the dashboard server
   * @returns {Promise<void>}
   */
  async stop() {
    return new Promise((resolve, reject) => {
      try {
        // Stop data polling
        if (this.pollingInterval) {
          clearInterval(this.pollingInterval);
        }

        // Close all WebSocket connections
        for (const client of this.clients) {
          client.terminate();
        }

        // Close HTTP server
        this.server.close(() => {
          this.logger.info('Dashboard stopped');
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Generate a static HTML report
   * @param {string} outputPath - Path to save the report
   * @returns {Promise<string>} Path to the generated report
   */
  async generateStaticReport(outputPath) {
    try {
      // Load data
      await this._loadData(true);

      // Create output directory
      const outputDir = path.dirname(outputPath);
      fs.ensureDirSync(outputDir);

      // Copy assets
      const assetsOutputDir = path.join(outputDir, 'assets');
      fs.ensureDirSync(assetsOutputDir);
      fs.copySync(this.options.assetsDir, assetsOutputDir);

      // Generate HTML
      const htmlContent = this._generateReportHtml();

      // Write HTML to file
      fs.writeFileSync(outputPath, htmlContent);

      this.logger.info(`Static report generated at ${outputPath}`);

      return outputPath;
    } catch (error) {
      this.logger.error(`Error generating static report: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate HTML for static report
   * @private
   * @returns {string} HTML content
   */
  _generateReportHtml() {
    // This is a simplified template
    // In a real implementation, this would be a more sophisticated HTML template
    const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Web3 Security Report</title>
        <link rel="stylesheet" href="assets/css/styles.css">
      </head>
      <body>
        <header>
          <h1>Web3 Security Report</h1>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </header>
        
        <main>
          <section class="summary">
            <h2>Summary</h2>
            <div class="score">
              <span class="score-value">${this.cache.summary.securityScore}</span>
              <span class="score-label">Security Score</span>
            </div>
            
            <div class="stats">
              <div class="stat">
                <span class="stat-value">${this.cache.summary.criticalIssues}</span>
                <span class="stat-label">Critical Issues</span>
              </div>
              <div class="stat">
                <span class="stat-value">${this.cache.summary.highIssues}</span>
                <span class="stat-label">High Issues</span>
              </div>
              <div class="stat">
                <span class="stat-value">${this.cache.summary.totalIssues}</span>
                <span class="stat-label">Total Issues</span>
              </div>
            </div>
          </section>
          
          <section class="vulnerabilities">
            <h2>Vulnerabilities</h2>
            <table>
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${this.cache.vulnerabilities
                  .map(
                    v => `
                  <tr>
                    <td class="severity ${v.severity.toLowerCase()}">${v.severity}</td>
                    <td>${v.type}</td>
                    <td>${v.title}</td>
                    <td>${v.status}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </section>
          
          <section class="reports">
            <h2>Recent Reports</h2>
            <ul>
              ${this.cache.summary.recentReports
                .map(
                  r => `
                <li>
                  <strong>${r.name}</strong> (${r.type})
                  <span class="date">${new Date(r.timestamp).toLocaleDateString()}</span>
                  <span class="count">${r.vulnerabilityCount} vulnerabilities</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </section>
        </main>
        
        <footer>
          <p>Generated by Web3 Security Test Kit</p>
        </footer>
      </body>
      </html>
    `;

    return template;
  }
}

module.exports = SecurityDashboard;
