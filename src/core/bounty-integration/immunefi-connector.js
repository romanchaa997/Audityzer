/**
 * Immunefi Platform Connector
 *
 * Connects the security testing toolkit to the Immunefi bug bounty platform,
 * enabling automated submission of vulnerabilities and tracking of reports.
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const FormData = require('form-data');
const { createHmac } = require('crypto');

class ImmunefiConnector {
  /**
   * Create a new Immunefi connector
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.immunefi.com/v1',
      apiKey: config.apiKey || process.env.IMMUNEFI_API_KEY,
      apiSecret: config.apiSecret || process.env.IMMUNEFI_API_SECRET,
      reportTemplateDir:
        config.reportTemplateDir || path.join(process.cwd(), 'templates', 'bounty-reports'),
      submissionStorageDir:
        config.submissionStorageDir || path.join(process.cwd(), 'data', 'submissions', 'immunefi'),
      debugMode: config.debugMode || false,
      ...config,
    };

    if (!this.config.apiKey || !this.config.apiSecret) {
      console.warn('Immunefi API credentials not provided. Limited functionality available.');
    }

    // Ensure directories exist
    fs.ensureDirSync(this.config.reportTemplateDir);
    fs.ensureDirSync(this.config.submissionStorageDir);

    this.authenticated = false;
    this.tokenExpiry = null;
    this.accessToken = null;
  }

  /**
   * Log a message with timestamp
   * @param {string} message - Message to log
   * @param {string} level - Log level
   * @private
   */
  _log(message, level = 'info') {
    if (this.config.debugMode || level === 'error') {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [Immunefi] [${level.toUpperCase()}] ${message}`);
    }
  }

  /**
   * Generate authentication signature
   * @param {string} path - API path
   * @param {string} method - HTTP method
   * @param {Object} body - Request body
   * @returns {Object} Headers with signature
   * @private
   */
  _generateSignature(path, method, body = null) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const bodyString = body ? JSON.stringify(body) : '';

    const message = `${timestamp}${method}${path}${bodyString}`;
    const signature = createHmac('sha256', this.config.apiSecret).update(message).digest('hex');

    return {
      'X-Api-Key': this.config.apiKey,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    };
  }

  /**
   * Authenticate with the Immunefi API
   * @returns {Promise<boolean>} Authentication success
   */
  async authenticate() {
    if (this.authenticated && this.tokenExpiry > Date.now()) {
      this._log('Using existing authentication token');
      return true;
    }

    try {
      const path = '/auth/token';
      const method = 'POST';
      const headers = this._generateSignature(path, method);

      const response = await axios({
        method,
        url: `${this.config.baseUrl}${path}`,
        headers,
      });

      if (response.data && response.data.token) {
        this.accessToken = response.data.token;
        // Set expiry to 1 hour from now (or use actual expiry from response if available)
        this.tokenExpiry = response.data.expires_at || Date.now() + 3600000;
        this.authenticated = true;
        this._log('Successfully authenticated with Immunefi');
        return true;
      } else {
        this._log('Failed to authenticate: Invalid response', 'error');
        return false;
      }
    } catch (error) {
      this._log(`Authentication error: ${error.message}`, 'error');
      if (error.response) {
        this._log(`Response status: ${error.response.status}`, 'error');
        this._log(`Response data: ${JSON.stringify(error.response.data)}`, 'error');
      }
      return false;
    }
  }

  /**
   * Make an authenticated API request
   * @param {string} path - API endpoint path
   * @param {string} method - HTTP method
   * @param {Object} data - Request data
   * @returns {Promise<Object>} API response
   * @private
   */
  async _makeApiRequest(path, method = 'GET', data = null) {
    // Ensure we're authenticated
    if (!this.authenticated) {
      const authSuccess = await this.authenticate();
      if (!authSuccess) {
        throw new Error('Authentication required');
      }
    }

    try {
      const headers = {
        ...this._generateSignature(path, method, data),
        Authorization: `Bearer ${this.accessToken}`,
      };

      const response = await axios({
        method,
        url: `${this.config.baseUrl}${path}`,
        headers,
        data: data || undefined,
      });

      return response.data;
    } catch (error) {
      // If token expired, try to re-authenticate once
      if (error.response && error.response.status === 401) {
        this.authenticated = false;
        const authSuccess = await this.authenticate();
        if (authSuccess) {
          return this._makeApiRequest(path, method, data);
        }
      }

      throw error;
    }
  }

  /**
   * Get a list of projects on Immunefi
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} List of projects
   */
  async getProjects(filters = {}) {
    try {
      const path = '/projects';
      const response = await this._makeApiRequest(path);

      if (!response.projects) {
        throw new Error('Invalid response from Immunefi API');
      }

      let projects = response.projects;

      // Apply filters if provided
      if (filters.name) {
        projects = projects.filter(p => p.name.toLowerCase().includes(filters.name.toLowerCase()));
      }

      if (filters.chain) {
        projects = projects.filter(p =>
          p.chains.some(c => c.toLowerCase() === filters.chain.toLowerCase())
        );
      }

      return projects;
    } catch (error) {
      this._log(`Error getting projects: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Get detailed information about a specific project
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Project details
   */
  async getProjectDetails(projectId) {
    try {
      const path = `/projects/${projectId}`;
      return await this._makeApiRequest(path);
    } catch (error) {
      this._log(`Error getting project details: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Submit a vulnerability report to Immunefi
   * @param {Object} reportData - Vulnerability report data
   * @returns {Promise<Object>} Submission result
   */
  async submitVulnerability(reportData) {
    try {
      // Validate required fields
      if (!reportData.projectId) {
        throw new Error('Project ID is required');
      }

      if (!reportData.title) {
        throw new Error('Report title is required');
      }

      if (!reportData.description) {
        throw new Error('Vulnerability description is required');
      }

      // Prepare submission data
      const submissionData = {
        project_id: reportData.projectId,
        title: reportData.title,
        description: reportData.description,
        severity: reportData.severity || 'medium',
        vulnerability_type: reportData.vulnerabilityType || 'Smart Contract',
        impact: reportData.impact || '',
        reproduction: reportData.reproduction || '',
        fix: reportData.fix || '',
        target_urls: reportData.targetUrls || [],
        target_code: reportData.targetCode || [],
      };

      // Create a submission record locally
      const submissionId = `immunefi-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      const submissionPath = path.join(this.config.submissionStorageDir, `${submissionId}.json`);

      // Save submission data locally regardless of API result
      fs.writeJsonSync(submissionPath, {
        id: submissionId,
        platform: 'immunefi',
        submissionData,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });

      // Submit to Immunefi API
      const path = '/reports';
      const response = await this._makeApiRequest(path, 'POST', submissionData);

      // Update local record with API response
      fs.writeJsonSync(submissionPath, {
        id: submissionId,
        platform: 'immunefi',
        submissionData,
        apiResponse: response,
        createdAt: new Date().toISOString(),
        reportId: response.report_id,
        status: 'submitted',
      });

      return {
        success: true,
        reportId: response.report_id,
        submissionId,
        message: response.message || 'Vulnerability report submitted successfully',
      };
    } catch (error) {
      this._log(`Error submitting vulnerability: ${error.message}`, 'error');

      // Save failed submission
      if (reportData) {
        const failedSubmissionId = `immunefi-failed-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
        const failedSubmissionPath = path.join(
          this.config.submissionStorageDir,
          `${failedSubmissionId}.json`
        );

        fs.writeJsonSync(failedSubmissionPath, {
          id: failedSubmissionId,
          platform: 'immunefi',
          submissionData: reportData,
          createdAt: new Date().toISOString(),
          error: error.message,
          status: 'failed',
        });
      }

      throw error;
    }
  }

  /**
   * Upload an attachment for a report
   * @param {string} reportId - Report ID
   * @param {string} filePath - Path to file
   * @param {string} description - File description
   * @returns {Promise<Object>} Upload result
   */
  async uploadAttachment(reportId, filePath, description = '') {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Authenticate first
      await this.authenticate();

      // Create form data
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      form.append('description', description);

      // Generate signature
      const apiPath = `/reports/${reportId}/attachments`;
      const headers = {
        ...this._generateSignature(apiPath, 'POST'),
        Authorization: `Bearer ${this.accessToken}`,
        ...form.getHeaders(),
      };

      // Upload file
      const response = await axios.post(`${this.config.baseUrl}${apiPath}`, form, { headers });

      return {
        success: true,
        attachmentId: response.data.attachment_id,
        message: response.data.message || 'Attachment uploaded successfully',
      };
    } catch (error) {
      this._log(`Error uploading attachment: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Get the status of a submitted report
   * @param {string} reportId - Report ID
   * @returns {Promise<Object>} Report status
   */
  async getReportStatus(reportId) {
    try {
      const path = `/reports/${reportId}`;
      return await this._makeApiRequest(path);
    } catch (error) {
      this._log(`Error getting report status: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Add a comment to a report
   * @param {string} reportId - Report ID
   * @param {string} comment - Comment text
   * @returns {Promise<Object>} Comment result
   */
  async addComment(reportId, comment) {
    try {
      const path = `/reports/${reportId}/comments`;
      const data = { comment };
      return await this._makeApiRequest(path, 'POST', data);
    } catch (error) {
      this._log(`Error adding comment: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Generate a vulnerability report from findings
   * @param {Array} findings - Vulnerability findings
   * @param {Object} options - Report options
   * @returns {Object} Generated report
   */
  generateReportFromFindings(findings, options = {}) {
    this._log(`Generating report from ${findings.length} findings`);

    // Start with the report template
    let reportTemplate = '';
    const templatePath = path.join(
      this.config.reportTemplateDir,
      options.templateFile || 'immunefi-template.md'
    );

    if (fs.existsSync(templatePath)) {
      reportTemplate = fs.readFileSync(templatePath, 'utf8');
    } else {
      reportTemplate = `# {{TITLE}}

## Vulnerability Details

**Severity:** {{SEVERITY}}

**Type:** {{VULNERABILITY_TYPE}}

### Description
{{DESCRIPTION}}

### Impact
{{IMPACT}}

### Proof of Concept
{{REPRODUCTION}}

### Recommended Fix
{{FIX}}
`;
    }

    // Get the most severe finding
    findings.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, informational: 4 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

    const primaryFinding = findings[0];

    // Fill in template
    const report = reportTemplate
      .replace('{{TITLE}}', options.title || primaryFinding.title || 'Vulnerability Report')
      .replace('{{SEVERITY}}', primaryFinding.severity || 'medium')
      .replace(
        '{{VULNERABILITY_TYPE}}',
        primaryFinding.vulnerabilityType || options.vulnerabilityType || 'Smart Contract'
      )
      .replace('{{DESCRIPTION}}', this._generateDescriptionFromFindings(findings, options))
      .replace('{{IMPACT}}', this._generateImpactFromFindings(findings, options))
      .replace('{{REPRODUCTION}}', this._generateReproductionStepsFromFindings(findings, options))
      .replace('{{FIX}}', this._generateFixFromFindings(findings, options));

    return {
      title: options.title || primaryFinding.title || 'Vulnerability Report',
      description: report,
      severity: primaryFinding.severity || 'medium',
      vulnerabilityType:
        primaryFinding.vulnerabilityType || options.vulnerabilityType || 'Smart Contract',
    };
  }

  /**
   * Generate a description section from findings
   * @param {Array} findings - Vulnerability findings
   * @param {Object} options - Generation options
   * @returns {string} Generated description
   * @private
   */
  _generateDescriptionFromFindings(findings, options) {
    let description = options.descriptionIntro || '';

    // Add each finding description
    findings.forEach((finding, index) => {
      if (finding.description) {
        description += `\n\n${index + 1}. **${finding.title || 'Issue ' + (index + 1)}**\n\n`;
        description += finding.description;
      }
    });

    return description || 'No detailed description provided.';
  }

  /**
   * Generate an impact section from findings
   * @param {Array} findings - Vulnerability findings
   * @param {Object} options - Generation options
   * @returns {string} Generated impact
   * @private
   */
  _generateImpactFromFindings(findings, options) {
    let impact = options.impactIntro || '';

    // Add each finding impact
    findings.forEach((finding, index) => {
      if (finding.impact) {
        impact += `\n\n${index + 1}. **${finding.title || 'Issue ' + (index + 1)} Impact**\n\n`;
        impact += finding.impact;
      }
    });

    return impact || 'No detailed impact analysis provided.';
  }

  /**
   * Generate reproduction steps from findings
   * @param {Array} findings - Vulnerability findings
   * @param {Object} options - Generation options
   * @returns {string} Generated reproduction steps
   * @private
   */
  _generateReproductionStepsFromFindings(findings, options) {
    let reproduction = options.reproductionIntro || 'Steps to reproduce:';

    // Add each finding reproduction steps
    findings.forEach((finding, index) => {
      if (finding.reproduction || finding.proofOfConcept) {
        reproduction += `\n\n### Issue ${index + 1}: ${finding.title || 'Vulnerability ' + (index + 1)}\n\n`;
        reproduction += finding.reproduction || finding.proofOfConcept || '';

        // Add code snippets if available
        if (finding.codeSnippets && finding.codeSnippets.length > 0) {
          reproduction += '\n\n**Relevant Code:**\n\n';
          finding.codeSnippets.forEach(snippet => {
            reproduction += `\`\`\`${snippet.language || ''}\n${snippet.code}\n\`\`\`\n\n`;
          });
        }
      }
    });

    return reproduction;
  }

  /**
   * Generate fix recommendations from findings
   * @param {Array} findings - Vulnerability findings
   * @param {Object} options - Generation options
   * @returns {string} Generated fix recommendations
   * @private
   */
  _generateFixFromFindings(findings, options) {
    let fix = options.fixIntro || 'Recommended fixes:';

    // Add each finding fix recommendation
    findings.forEach((finding, index) => {
      if (finding.recommendation || finding.fix) {
        fix += `\n\n### Issue ${index + 1}: ${finding.title || 'Vulnerability ' + (index + 1)}\n\n`;
        fix += finding.recommendation || finding.fix || '';

        // Add code snippets for fixes if available
        if (finding.fixCodeSnippets && finding.fixCodeSnippets.length > 0) {
          fix += '\n\n**Suggested Code Change:**\n\n';
          finding.fixCodeSnippets.forEach(snippet => {
            fix += `\`\`\`${snippet.language || ''}\n${snippet.code}\n\`\`\`\n\n`;
          });
        }
      }
    });

    return fix;
  }
}

module.exports = ImmunefiConnector;
