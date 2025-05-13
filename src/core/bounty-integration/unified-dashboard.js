/**
 * Unified Bounty Dashboard
 *
 * A centralized dashboard for tracking bug bounty submissions across multiple platforms.
 */

const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const chalk = require('chalk');

class UnifiedBountyDashboard {
  /**
   * Initialize the unified bounty dashboard
   * @param {Object} options - Dashboard options
   */
  constructor(options = {}) {
    this.options = {
      dataDir: options.dataDir || './data/bounty-dashboard',
      port: options.port || 3030,
      autoUpdateInterval: options.autoUpdateInterval || 3600000, // 1 hour
      enabledPlatforms: options.enabledPlatforms || [
        'immunefi',
        'code4rena',
        'sherlock',
        'hackenproof',
      ],
      apiKeys: options.apiKeys || {},
    };

    this.platforms = {
      immunefi: {
        name: 'Immunefi',
        color: '#2196F3',
        apiBaseUrl: 'https://api.immunefi.com/v1',
        enabled: this.options.enabledPlatforms.includes('immunefi'),
      },
      code4rena: {
        name: 'Code4rena',
        color: '#4CAF50',
        apiBaseUrl: 'https://api.code4rena.com/api',
        enabled: this.options.enabledPlatforms.includes('code4rena'),
      },
      sherlock: {
        name: 'Sherlock',
        color: '#FFC107',
        apiBaseUrl: 'https://api.sherlock.xyz/api/v1',
        enabled: this.options.enabledPlatforms.includes('sherlock'),
      },
      hackenproof: {
        name: 'HackenProof',
        color: '#9C27B0',
        apiBaseUrl: 'https://hackenproof.com/api/v1',
        enabled: this.options.enabledPlatforms.includes('hackenproof'),
      },
    };

    // Server instances
    this.app = null;
    this.server = null;
    this.io = null;

    // Track submissions
    this.submissions = {};
    this.stats = {
      total: 0,
      accepted: 0,
      rejected: 0,
      pending: 0,
      byPlatform: {},
      bySeverity: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        informational: 0,
      },
    };

    // Ensure data directory exists
    fs.ensureDirSync(this.options.dataDir);
  }

  /**
   * Start the dashboard server
   * @returns {Promise<Object>} Server info
   */
  async start() {
    // Create Express app
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);

    // Configure middleware
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'dashboard', 'public')));

    // Set up routes
    this._setupRoutes();

    // Set up WebSocket
    this._setupWebSocket();

    // Load existing data
    await this._loadData();

    // Start update interval
    this._startAutoUpdate();

    // Start server
    return new Promise((resolve, reject) => {
      this.server.listen(this.options.port, () => {
        console.log(
          chalk.green(`Unified Bounty Dashboard running on http://localhost:${this.options.port}`)
        );
        resolve({
          port: this.options.port,
          url: `http://localhost:${this.options.port}`,
        });
      });

      this.server.on('error', error => {
        reject(error);
      });
    });
  }

  /**
   * Stop the dashboard server
   */
  async stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    if (this.server) {
      return new Promise(resolve => {
        this.server.close(() => {
          console.log(chalk.yellow('Unified Bounty Dashboard stopped'));
          resolve();
        });
      });
    }
  }

  /**
   * Set up Express routes
   */
  _setupRoutes() {
    // API routes
    this.app.get('/api/submissions', (req, res) => {
      res.json({
        success: true,
        submissions: this.submissions,
      });
    });

    this.app.get('/api/stats', (req, res) => {
      res.json({
        success: true,
        stats: this.stats,
      });
    });

    this.app.get('/api/platforms', (req, res) => {
      res.json({
        success: true,
        platforms: Object.entries(this.platforms)
          .filter(([_, p]) => p.enabled)
          .map(([key, p]) => ({
            id: key,
            name: p.name,
            color: p.color,
          })),
      });
    });

    // Serve dashboard HTML
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'dashboard', 'index.html'));
    });
  }

  /**
   * Set up WebSocket for real-time updates
   */
  _setupWebSocket() {
    this.io.on('connection', socket => {
      console.log(chalk.blue('Client connected to dashboard'));

      // Send initial data
      socket.emit('init', {
        submissions: this.submissions,
        stats: this.stats,
        platforms: Object.entries(this.platforms)
          .filter(([_, p]) => p.enabled)
          .map(([key, p]) => ({
            id: key,
            name: p.name,
            color: p.color,
          })),
      });

      // Handle refresh request
      socket.on('refresh', async () => {
        await this._fetchSubmissions();
        this._calculateStats();
        this._saveData();

        socket.emit('update', {
          submissions: this.submissions,
          stats: this.stats,
        });
      });
    });
  }

  /**
   * Start auto-update interval
   */
  _startAutoUpdate() {
    if (this.options.autoUpdateInterval > 0) {
      this.updateInterval = setInterval(async () => {
        try {
          await this._fetchSubmissions();
          this._calculateStats();
          this._saveData();

          if (this.io) {
            this.io.emit('update', {
              submissions: this.submissions,
              stats: this.stats,
            });
          }
        } catch (error) {
          console.error('Error during auto-update:', error);
        }
      }, this.options.autoUpdateInterval);
    }
  }

  /**
   * Load existing data from files
   */
  async _loadData() {
    try {
      const submissionsPath = path.join(this.options.dataDir, 'submissions.json');
      const statsPath = path.join(this.options.dataDir, 'stats.json');

      if (fs.existsSync(submissionsPath)) {
        this.submissions = await fs.readJson(submissionsPath);
      }

      if (fs.existsSync(statsPath)) {
        this.stats = await fs.readJson(statsPath);
      }

      console.log(
        chalk.blue(`Loaded ${Object.keys(this.submissions).length} submissions from file`)
      );
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }

  /**
   * Save data to files
   */
  async _saveData() {
    try {
      const submissionsPath = path.join(this.options.dataDir, 'submissions.json');
      const statsPath = path.join(this.options.dataDir, 'stats.json');

      await fs.writeJson(submissionsPath, this.submissions, { spaces: 2 });
      await fs.writeJson(statsPath, this.stats, { spaces: 2 });
    } catch (error) {
      console.error('Error saving dashboard data:', error);
    }
  }

  /**
   * Fetch submissions from all enabled platforms
   */
  async _fetchSubmissions() {
    console.log(chalk.blue('Fetching submissions from all platforms...'));

    for (const [platformId, platform] of Object.entries(this.platforms)) {
      if (platform.enabled) {
        try {
          const apiKey = this.options.apiKeys[platformId];
          if (!apiKey) {
            console.warn(chalk.yellow(`No API key provided for ${platform.name}`));
            continue;
          }

          console.log(chalk.blue(`Fetching submissions from ${platform.name}...`));

          // Fetch submissions (implementation depends on platform API)
          const platformSubmissions = await this._fetchPlatformSubmissions(
            platformId,
            platform,
            apiKey
          );

          // Update submissions
          for (const sub of platformSubmissions) {
            this.submissions[sub.id] = {
              ...sub,
              platform: platformId,
            };
          }

          console.log(
            chalk.green(`Fetched ${platformSubmissions.length} submissions from ${platform.name}`)
          );
        } catch (error) {
          console.error(`Error fetching submissions from ${platform.name}:`, error);
        }
      }
    }
  }

  /**
   * Fetch submissions from a specific platform
   * @param {string} platformId - Platform ID
   * @param {Object} platform - Platform config
   * @param {string} apiKey - API key
   * @returns {Promise<Array>} Submissions
   */
  async _fetchPlatformSubmissions(platformId, platform, apiKey) {
    // Implementation depends on platform API
    // This is a placeholder that would need to be customized for each platform

    try {
      switch (platformId) {
        case 'immunefi':
          return await this._fetchImmunefiSubmissions(platform, apiKey);
        case 'code4rena':
          return await this._fetchCode4renaSubmissions(platform, apiKey);
        case 'sherlock':
          return await this._fetchSherlockSubmissions(platform, apiKey);
        case 'hackenproof':
          return await this._fetchHackenproofSubmissions(platform, apiKey);
        default:
          return [];
      }
    } catch (error) {
      console.error(`Error fetching ${platformId} submissions:`, error);
      return [];
    }
  }

  /**
   * Fetch submissions from Immunefi
   * @param {Object} platform - Platform config
   * @param {string} apiKey - API key
   * @returns {Promise<Array>} Submissions
   */
  async _fetchImmunefiSubmissions(platform, apiKey) {
    // This would be implemented based on Immunefi's API
    // Placeholder implementation
    try {
      const response = await axios.get(`${platform.apiBaseUrl}/reports`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.reports.map(report => ({
        id: `immunefi-${report.id}`,
        title: report.title,
        severity: report.severity,
        status: report.status,
        submittedAt: report.submittedAt,
        updatedAt: report.updatedAt,
        url: report.url,
        project: report.project,
        reward: report.reward,
      }));
    } catch (error) {
      console.error('Error fetching Immunefi submissions:', error);
      return [];
    }
  }

  /**
   * Calculate statistics from submissions
   */
  _calculateStats() {
    // Reset stats
    this.stats = {
      total: 0,
      accepted: 0,
      rejected: 0,
      pending: 0,
      byPlatform: {},
      bySeverity: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        informational: 0,
      },
    };

    // Initialize platform stats
    for (const platformId of Object.keys(this.platforms)) {
      if (this.platforms[platformId].enabled) {
        this.stats.byPlatform[platformId] = {
          total: 0,
          accepted: 0,
          rejected: 0,
          pending: 0,
        };
      }
    }

    // Calculate stats
    for (const submission of Object.values(this.submissions)) {
      this.stats.total++;

      // Status stats
      if (submission.status === 'accepted' || submission.status === 'valid') {
        this.stats.accepted++;
        if (this.stats.byPlatform[submission.platform]) {
          this.stats.byPlatform[submission.platform].accepted++;
        }
      } else if (submission.status === 'rejected' || submission.status === 'invalid') {
        this.stats.rejected++;
        if (this.stats.byPlatform[submission.platform]) {
          this.stats.byPlatform[submission.platform].rejected++;
        }
      } else {
        this.stats.pending++;
        if (this.stats.byPlatform[submission.platform]) {
          this.stats.byPlatform[submission.platform].pending++;
        }
      }

      // Platform stats
      if (this.stats.byPlatform[submission.platform]) {
        this.stats.byPlatform[submission.platform].total++;
      }

      // Severity stats
      const severity = submission.severity?.toLowerCase();
      if (severity && this.stats.bySeverity[severity] !== undefined) {
        this.stats.bySeverity[severity]++;
      }
    }
  }

  /**
   * Add a submission to the dashboard
   * @param {Object} submission - Submission data
   * @returns {Object} Added submission
   */
  async addSubmission(submission) {
    if (!submission.id) {
      submission.id = `manual-${Date.now()}`;
    }

    this.submissions[submission.id] = submission;

    // Recalculate stats
    this._calculateStats();

    // Save data
    await this._saveData();

    // Send update to clients
    if (this.io) {
      this.io.emit('update', {
        submissions: this.submissions,
        stats: this.stats,
      });
    }

    return submission;
  }

  /**
   * Update a submission in the dashboard
   * @param {string} id - Submission ID
   * @param {Object} updates - Fields to update
   * @returns {Object} Updated submission
   */
  async updateSubmission(id, updates) {
    if (!this.submissions[id]) {
      throw new Error(`Submission ${id} not found`);
    }

    this.submissions[id] = {
      ...this.submissions[id],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Recalculate stats
    this._calculateStats();

    // Save data
    await this._saveData();

    // Send update to clients
    if (this.io) {
      this.io.emit('update', {
        submissions: this.submissions,
        stats: this.stats,
      });
    }

    return this.submissions[id];
  }
}

exports.UnifiedBountyDashboard = UnifiedBountyDashboard;
