/**
 * @fileoverview Enterprise Security Notification System
 *
 * This module provides notification capabilities for security alerts,
 * including email, Slack, and webhook integrations.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const nodemailer = require('nodemailer');

class NotificationSystem {
  constructor(config = {}) {
    this.config = {
      enabled: config.enabled !== false,
      channels: {
        email: {
          enabled: config.channels?.email?.enabled || false,
          smtpConfig: config.channels?.email?.smtpConfig || {},
          from: config.channels?.email?.from || 'Audityzer@example.com',
          to: config.channels?.email?.to || [],
          subject: config.channels?.email?.subject || 'Audityzer Security Alert',
        },
        slack: {
          enabled: config.channels?.slack?.enabled || false,
          webhookUrl: config.channels?.slack?.webhookUrl || '',
          channel: config.channels?.slack?.channel || '#security-alerts',
          username: config.channels?.slack?.username || 'Audityzer Security',
        },
        webhook: {
          enabled: config.channels?.webhook?.enabled || false,
          url: config.channels?.webhook?.url || '',
          method: config.channels?.webhook?.method || 'POST',
          headers: config.channels?.webhook?.headers || {},
        },
      },
      alertThreshold: {
        severity: config.alertThreshold?.severity || 'high', // minimum severity to trigger alerts
        count: config.alertThreshold?.count || 1, // minimum number of issues to trigger alerts
      },
      ...config,
    };

    this.notificationHistory = [];
  }

  /**
   * Determine if an alert should be sent based on test results
   * @param {Object} results - Test or analysis results
   * @returns {boolean} True if the alert threshold is met
   */
  shouldSendAlert(results) {
    if (!this.config.enabled) {
      return false;
    }

    // Count issues that meet or exceed the severity threshold
    const severityLevels = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
      info: 0,
    };

    const thresholdLevel = severityLevels[this.config.alertThreshold.severity] || 3;
    let matchingIssuesCount = 0;

    // Process security issues
    if (results.securityIssues && Array.isArray(results.securityIssues)) {
      results.securityIssues.forEach(issue => {
        const issueSeverityLevel = severityLevels[issue.severity] || 0;
        if (issueSeverityLevel >= thresholdLevel) {
          matchingIssuesCount++;
        }
      });
    }

    // Process findings (static analysis)
    if (results.findings && Array.isArray(results.findings)) {
      results.findings.forEach(finding => {
        const findingSeverityLevel = severityLevels[finding.severity] || 0;
        if (findingSeverityLevel >= thresholdLevel) {
          matchingIssuesCount++;
        }
      });
    }

    // Process summary severity counts
    if (results.summary) {
      if (thresholdLevel >= severityLevels.critical && results.summary.criticalIssues) {
        matchingIssuesCount += results.summary.criticalIssues;
      }

      if (thresholdLevel >= severityLevels.high && results.summary.highIssues) {
        matchingIssuesCount += results.summary.highIssues;
      }

      if (thresholdLevel >= severityLevels.medium && results.summary.mediumIssues) {
        matchingIssuesCount += results.summary.mediumIssues;
      }

      if (thresholdLevel >= severityLevels.low && results.summary.lowIssues) {
        matchingIssuesCount += results.summary.lowIssues;
      }
    }

    return matchingIssuesCount >= this.config.alertThreshold.count;
  }

  /**
   * Send security alerts through all configured channels
   * @param {Object} results - Test or analysis results
   * @param {string} title - Alert title
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Notification results
   */
  async sendAlerts(results, title = 'Security Alert', options = {}) {
    if (!this.shouldSendAlert(results)) {
      console.log('No alerts sent - threshold not met or notifications disabled');
      return { sent: false, reason: 'threshold_not_met' };
    }

    const notificationResults = {
      email: null,
      slack: null,
      webhook: null,
      timestamp: new Date().toISOString(),
    };

    // Prepare notification content
    const content = this.prepareAlertContent(results, title, options);

    // Send through each enabled channel
    if (this.config.channels.email.enabled) {
      notificationResults.email = await this.sendEmailAlert(content);
    }

    if (this.config.channels.slack.enabled) {
      notificationResults.slack = await this.sendSlackAlert(content);
    }

    if (this.config.channels.webhook.enabled) {
      notificationResults.webhook = await this.sendWebhookAlert(content);
    }

    // Add to notification history
    this.notificationHistory.push({
      timestamp: notificationResults.timestamp,
      title,
      channels: {
        email: !!notificationResults.email?.success,
        slack: !!notificationResults.slack?.success,
        webhook: !!notificationResults.webhook?.success,
      },
      results: {
        email: notificationResults.email,
        slack: notificationResults.slack,
        webhook: notificationResults.webhook,
      },
    });

    return {
      sent: true,
      results: notificationResults,
    };
  }

  /**
   * Prepare alert content from test results
   * @param {Object} results - Test or analysis results
   * @param {string} title - Alert title
   * @param {Object} options - Additional options
   * @returns {Object} Formatted alert content
   */
  prepareAlertContent(results, title, options = {}) {
    // Get severity counts
    const severityCounts = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    };

    // Process security issues
    const securityIssues = [];
    if (results.securityIssues && Array.isArray(results.securityIssues)) {
      results.securityIssues.forEach(issue => {
        severityCounts[issue.severity] = (severityCounts[issue.severity] || 0) + 1;
        securityIssues.push(issue);
      });
    }

    // Process findings (static analysis)
    const staticIssues = [];
    if (results.findings && Array.isArray(results.findings)) {
      results.findings.forEach(finding => {
        severityCounts[finding.severity] = (severityCounts[finding.severity] || 0) + 1;
        staticIssues.push(finding);
      });
    }

    // Process summary severity counts
    if (results.summary) {
      if (results.summary.criticalIssues) severityCounts.critical += results.summary.criticalIssues;
      if (results.summary.highIssues) severityCounts.high += results.summary.highIssues;
      if (results.summary.mediumIssues) severityCounts.medium += results.summary.mediumIssues;
      if (results.summary.lowIssues) severityCounts.low += results.summary.lowIssues;
      if (results.summary.infoIssues) severityCounts.info += results.summary.infoIssues;
    }

    // Calculate total issues
    const totalIssues = Object.values(severityCounts).reduce((sum, count) => sum + count, 0);

    // Prepare content for all notification types
    return {
      title: title || 'Audityzer Security Alert',
      summary: `${totalIssues} security issues detected (${severityCounts.critical} critical, ${severityCounts.high} high, ${severityCounts.medium} medium)`,
      timestamp: new Date().toISOString(),
      project: options.project || process.env.PROJECT_NAME || 'Web3 Project',
      repository: options.repository || process.env.REPOSITORY_URL || '',
      buildUrl: options.buildUrl || process.env.BUILD_URL || '',
      commitId: options.commitId || process.env.COMMIT_ID || '',
      severityCounts,
      securityIssues,
      staticIssues,
      totalIssues,

      // Format functions for different channels
      formatEmail: () =>
        this.formatEmailContent({
          title,
          summary: `${totalIssues} security issues detected (${severityCounts.critical} critical, ${severityCounts.high} high, ${severityCounts.medium} medium)`,
          severityCounts,
          securityIssues,
          staticIssues,
          options,
        }),

      formatSlack: () =>
        this.formatSlackContent({
          title,
          summary: `${totalIssues} security issues detected (${severityCounts.critical} critical, ${severityCounts.high} high, ${severityCounts.medium} medium)`,
          severityCounts,
          securityIssues,
          staticIssues,
          options,
        }),

      formatWebhook: () => {
        return {
          title,
          summary: `${totalIssues} security issues detected (${severityCounts.critical} critical, ${severityCounts.high} high, ${severityCounts.medium} medium)`,
          timestamp: new Date().toISOString(),
          project: options.project || process.env.PROJECT_NAME || 'Web3 Project',
          repository: options.repository || process.env.REPOSITORY_URL || '',
          buildUrl: options.buildUrl || process.env.BUILD_URL || '',
          commitId: options.commitId || process.env.COMMIT_ID || '',
          severityCounts,
          securityIssues: securityIssues.map(issue => ({
            id: issue.id || issue.ruleId,
            name: issue.name || issue.title || 'Security Issue',
            description: issue.description,
            severity: issue.severity,
            category: issue.category,
          })),
          staticIssues: staticIssues.map(issue => ({
            id: issue.id || issue.ruleId,
            name: issue.name || issue.title || 'Security Issue',
            description: issue.description,
            severity: issue.severity,
            category: issue.category,
          })),
        };
      },
    };
  }

  /**
   * Format email content
   * @param {Object} data - Alert data
   * @returns {Object} Formatted email content
   */
  formatEmailContent(data) {
    const { title, summary, severityCounts, securityIssues, staticIssues, options } = data;

    // Create HTML content
    let htmlContent = `
      <h1>${title}</h1>
      <p><strong>${summary}</strong></p>
      <p>Project: ${options.project || process.env.PROJECT_NAME || 'Web3 Project'}</p>
      ${options.repository ? `<p>Repository: ${options.repository}</p>` : ''}
      ${options.buildUrl ? `<p>Build URL: <a href="${options.buildUrl}">${options.buildUrl}</a></p>` : ''}
      ${options.commitId ? `<p>Commit: ${options.commitId}</p>` : ''}
      
      <h2>Security Issues Summary</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Severity</th>
          <th>Count</th>
        </tr>
        <tr>
          <td style="color: #ff0000;"><strong>Critical</strong></td>
          <td>${severityCounts.critical || 0}</td>
        </tr>
        <tr>
          <td style="color: #ff6600;"><strong>High</strong></td>
          <td>${severityCounts.high || 0}</td>
        </tr>
        <tr>
          <td style="color: #ffcc00;"><strong>Medium</strong></td>
          <td>${severityCounts.medium || 0}</td>
        </tr>
        <tr>
          <td style="color: #999999;"><strong>Low</strong></td>
          <td>${severityCounts.low || 0}</td>
        </tr>
      </table>
    `;

    // Add security issues
    if (securityIssues && securityIssues.length > 0) {
      htmlContent += `
        <h2>Top Security Issues</h2>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>Issue</th>
            <th>Severity</th>
            <th>Description</th>
          </tr>
      `;

      // Show only top 5 issues
      const topIssues = [...securityIssues]
        .sort((a, b) => {
          const severityMap = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
          return (severityMap[b.severity] || 0) - (severityMap[a.severity] || 0);
        })
        .slice(0, 5);

      topIssues.forEach(issue => {
        const severityColor =
          {
            critical: '#ff0000',
            high: '#ff6600',
            medium: '#ffcc00',
            low: '#999999',
            info: '#cccccc',
          }[issue.severity] || '#000000';

        htmlContent += `
          <tr>
            <td>${issue.name || issue.title || 'Security Issue'}</td>
            <td style="color: ${severityColor};"><strong>${issue.severity}</strong></td>
            <td>${issue.description || 'No description provided.'}</td>
          </tr>
        `;
      });

      htmlContent += '</table>';
    }

    // Add static analysis issues
    if (staticIssues && staticIssues.length > 0) {
      htmlContent += `
        <h2>Top Static Analysis Issues</h2>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <th>Issue</th>
            <th>Severity</th>
            <th>Description</th>
          </tr>
      `;

      // Show only top 5 issues
      const topIssues = [...staticIssues]
        .sort((a, b) => {
          const severityMap = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
          return (severityMap[b.severity] || 0) - (severityMap[a.severity] || 0);
        })
        .slice(0, 5);

      topIssues.forEach(issue => {
        const severityColor =
          {
            critical: '#ff0000',
            high: '#ff6600',
            medium: '#ffcc00',
            low: '#999999',
            info: '#cccccc',
          }[issue.severity] || '#000000';

        htmlContent += `
          <tr>
            <td>${issue.name || issue.title || 'Security Issue'}</td>
            <td style="color: ${severityColor};"><strong>${issue.severity}</strong></td>
            <td>${issue.description || 'No description provided.'}</td>
          </tr>
        `;
      });

      htmlContent += '</table>';
    }

    htmlContent += `
      <p>This is an automated security alert from Audityzer Security Testing.</p>
      <p>For more details, please check the full reports in your CI/CD pipeline results.</p>
    `;

    // Create plain text content
    const textContent = `
${title}

${summary}

Project: ${options.project || process.env.PROJECT_NAME || 'Web3 Project'}
${options.repository ? `Repository: ${options.repository}` : ''}
${options.buildUrl ? `Build URL: ${options.buildUrl}` : ''}
${options.commitId ? `Commit: ${options.commitId}` : ''}

Security Issues Summary:
- Critical: ${severityCounts.critical || 0}
- High: ${severityCounts.high || 0}
- Medium: ${severityCounts.medium || 0}
- Low: ${severityCounts.low || 0}

This is an automated security alert from Audityzer Security Testing.
For more details, please check the full reports in your CI/CD pipeline results.
    `;

    return {
      html: htmlContent,
      text: textContent,
    };
  }

  /**
   * Format Slack content
   * @param {Object} data - Alert data
   * @returns {Object} Formatted Slack message
   */
  formatSlackContent(data) {
    const { title, summary, severityCounts, securityIssues, staticIssues, options } = data;

    // Create Slack message blocks
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: title,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${summary}*`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Project:*\n${options.project || process.env.PROJECT_NAME || 'Web3 Project'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Time:*\n${new Date().toLocaleString()}`,
          },
        ],
      },
    ];

    // Add repository and build info if available
    if (options.repository || options.buildUrl || options.commitId) {
      const fields = [];

      if (options.repository) {
        fields.push({
          type: 'mrkdwn',
          text: `*Repository:*\n${options.repository}`,
        });
      }

      if (options.buildUrl) {
        fields.push({
          type: 'mrkdwn',
          text: `*Build:*\n<${options.buildUrl}|View Build>`,
        });
      }

      if (options.commitId) {
        fields.push({
          type: 'mrkdwn',
          text: `*Commit:*\n${options.commitId.substring(0, 8)}`,
        });
      }

      blocks.push({
        type: 'section',
        fields,
      });
    }

    // Add severity summary
    blocks.push(
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Security Issues Summary:*',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Critical:*\n${severityCounts.critical || 0}`,
          },
          {
            type: 'mrkdwn',
            text: `*High:*\n${severityCounts.high || 0}`,
          },
          {
            type: 'mrkdwn',
            text: `*Medium:*\n${severityCounts.medium || 0}`,
          },
          {
            type: 'mrkdwn',
            text: `*Low:*\n${severityCounts.low || 0}`,
          },
        ],
      }
    );

    // Add top security issues
    if (securityIssues && securityIssues.length > 0) {
      // Show only top 3 issues
      const topIssues = [...securityIssues]
        .sort((a, b) => {
          const severityMap = { critical: 4, high: 3, medium: 2, low: 1, info: 0 };
          return (severityMap[b.severity] || 0) - (severityMap[a.severity] || 0);
        })
        .slice(0, 3);

      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Top Security Issues:*',
        },
      });

      topIssues.forEach(issue => {
        const severityEmoji =
          {
            critical: ':red_circle:',
            high: ':orange_circle:',
            medium: ':yellow_circle:',
            low: ':white_circle:',
            info: ':blue_circle:',
          }[issue.severity] || ':white_circle:';

        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${severityEmoji} *${issue.name || issue.title || 'Security Issue'}* (${issue.severity})\n${issue.description || 'No description provided.'}`,
          },
        });
      });
    }

    blocks.push({
      type: 'divider',
    });

    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'This is an automated security alert from Audityzer Security Testing.',
        },
      ],
    });

    return {
      blocks,
      text: summary, // Fallback text
    };
  }

  /**
   * Send an email alert
   * @param {Object} content - Prepared alert content
   * @returns {Promise<Object>} Email sending result
   */
  async sendEmailAlert(content) {
    if (!this.config.channels.email.enabled) {
      return { success: false, error: 'Email notifications not enabled' };
    }

    try {
      const { html, text } = content.formatEmail();

      // Create email transport
      const transporter = nodemailer.createTransport(this.config.channels.email.smtpConfig);

      // Send email
      const result = await transporter.sendMail({
        from: this.config.channels.email.from,
        to: this.config.channels.email.to.join(','),
        subject: `${this.config.channels.email.subject}: ${content.title}`,
        text,
        html,
      });

      console.log(`Email alert sent: ${result.messageId}`);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email alert:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send a Slack alert
   * @param {Object} content - Prepared alert content
   * @returns {Promise<Object>} Slack sending result
   */
  async sendSlackAlert(content) {
    if (!this.config.channels.slack.enabled) {
      return { success: false, error: 'Slack notifications not enabled' };
    }

    if (!this.config.channels.slack.webhookUrl) {
      return { success: false, error: 'Slack webhook URL not configured' };
    }

    try {
      const slackPayload = content.formatSlack();

      // Add channel and username if configured
      slackPayload.channel = this.config.channels.slack.channel;
      slackPayload.username = this.config.channels.slack.username;

      // Send to Slack webhook
      const result = await this.sendHttpRequest(
        this.config.channels.slack.webhookUrl,
        JSON.stringify(slackPayload),
        {
          'Content-Type': 'application/json',
        }
      );

      console.log('Slack alert sent successfully');
      return { success: true, response: result };
    } catch (error) {
      console.error('Error sending Slack alert:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send a webhook alert
   * @param {Object} content - Prepared alert content
   * @returns {Promise<Object>} Webhook sending result
   */
  async sendWebhookAlert(content) {
    if (!this.config.channels.webhook.enabled) {
      return { success: false, error: 'Webhook notifications not enabled' };
    }

    if (!this.config.channels.webhook.url) {
      return { success: false, error: 'Webhook URL not configured' };
    }

    try {
      const webhookPayload = content.formatWebhook();

      // Send to webhook
      const result = await this.sendHttpRequest(
        this.config.channels.webhook.url,
        JSON.stringify(webhookPayload),
        {
          'Content-Type': 'application/json',
          ...this.config.channels.webhook.headers,
        },
        this.config.channels.webhook.method
      );

      console.log('Webhook alert sent successfully');
      return { success: true, response: result };
    } catch (error) {
      console.error('Error sending webhook alert:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Helper function to send HTTP requests
   * @param {string} url - Target URL
   * @param {string} body - Request body
   * @param {Object} headers - Request headers
   * @param {string} method - HTTP method
   * @returns {Promise<string>} Response body
   */
  sendHttpRequest(url, body, headers = {}, method = 'POST') {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);

      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: `${urlObj.pathname}${urlObj.search}`,
        method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...headers,
        },
      };

      const req = https.request(options, res => {
        let responseBody = '';

        res.on('data', chunk => {
          responseBody += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseBody);
          } else {
            reject(new Error(`Request failed with status code ${res.statusCode}: ${responseBody}`));
          }
        });
      });

      req.on('error', error => {
        reject(error);
      });

      req.write(body);
      req.end();
    });
  }

  /**
   * Get notification history
   * @returns {Array} History of sent notifications
   */
  getNotificationHistory() {
    return this.notificationHistory;
  }

  /**
   * Save notification configuration to file
   * @param {string} configPath - Path to save configuration
   * @returns {boolean} Success status
   */
  saveConfiguration(configPath = './notification-config.json') {
    try {
      // Clone config and remove any sensitive information
      const configToSave = JSON.parse(JSON.stringify(this.config));

      // Remove sensitive SMTP info
      if (configToSave.channels?.email?.smtpConfig?.auth) {
        configToSave.channels.email.smtpConfig.auth = {
          user: configToSave.channels.email.smtpConfig.auth.user,
          pass: '********', // Mask password
        };
      }

      fs.writeFileSync(configPath, JSON.stringify(configToSave, null, 2));
      console.log(`Notification configuration saved to: ${configPath}`);
      return true;
    } catch (error) {
      console.error('Error saving notification configuration:', error);
      return false;
    }
  }

  /**
   * Load notification configuration from file
   * @param {string} configPath - Path to load configuration from
   * @returns {boolean} Success status
   */
  loadConfiguration(configPath = './notification-config.json') {
    try {
      if (!fs.existsSync(configPath)) {
        console.error(`Configuration file not found: ${configPath}`);
        return false;
      }

      const loadedConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

      // Update configuration
      this.config = {
        ...this.config,
        ...loadedConfig,
      };

      console.log(`Notification configuration loaded from: ${configPath}`);
      return true;
    } catch (error) {
      console.error('Error loading notification configuration:', error);
      return false;
    }
  }
}

module.exports = NotificationSystem;
