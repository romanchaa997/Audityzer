/**
 * HackenProof Submission Generator
 *
 * Formats and prepares security vulnerability reports for submission to the HackenProof platform.
 */

const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

class HackenProofSubmission {
  /**
   * Initialize the HackenProof submission generator
   * @param {string} outputDir - Output directory for generated submissions
   */
  constructor(outputDir = './reports/hackenproof') {
    this.outputDir = outputDir;
    this.apiKey = process.env.HACKENPROOF_API_KEY || null;
    this.apiUrl = process.env.HACKENPROOF_API_URL || 'https://hackenproof.com/api/v1';
    this.templateDir = path.join(__dirname, 'templates', 'hackenproof');

    // Ensure output directory exists
    fs.ensureDirSync(this.outputDir);

    // Create templates directory if it doesn't exist
    fs.ensureDirSync(this.templateDir);
  }

  /**
   * Format a vulnerability report for HackenProof
   * @param {Object} vulnerability - Vulnerability data
   * @returns {Object} Formatted vulnerability report
   */
  formatVulnerability(vulnerability) {
    // Map severity to HackenProof severity
    const severityMap = {
      critical: 'critical',
      high: 'high',
      medium: 'medium',
      low: 'low',
      informational: 'informational',
    };

    // Create a more detailed and structured report
    return {
      title: this._formatTitle(vulnerability.title, vulnerability.category || vulnerability.type),
      vulnerability_type: this._mapVulnerabilityType(vulnerability.category || vulnerability.type),
      severity: severityMap[vulnerability.severity?.toLowerCase()] || 'medium',
      description: this._formatDescription(vulnerability),
      impact: this._formatImpact(vulnerability),
      steps_to_reproduce: this._formatSteps(vulnerability),
      proof_of_concept: vulnerability.poc || vulnerability.proof_of_concept || '',
      affected_urls: vulnerability.affected_urls || [],
      affected_assets: vulnerability.affected_files || [],
      remediation: this._formatRemediation(vulnerability),
    };
  }

  /**
   * Format title with standardized structure
   * @param {string} title - Original title
   * @param {string} type - Vulnerability type
   * @returns {string} Formatted title
   */
  _formatTitle(title, type) {
    if (!title) {
      return `${this._mapVulnerabilityType(type)} Vulnerability`;
    }

    // If title already includes vulnerability type, return as is
    if (title.toLowerCase().includes(type?.toLowerCase())) {
      return title;
    }

    // Otherwise, add the type for context
    return `${title} - ${this._mapVulnerabilityType(type)}`;
  }

  /**
   * Format description with additional context
   * @param {Object} vulnerability - Vulnerability data
   * @returns {string} Formatted description
   */
  _formatDescription(vulnerability) {
    let description = vulnerability.description || '';

    // Add context about vulnerability type if not included
    if (
      vulnerability.category &&
      !description.toLowerCase().includes(vulnerability.category.toLowerCase())
    ) {
      const vulnType = this._mapVulnerabilityType(vulnerability.category);
      description = `**Vulnerability Type**: ${vulnType}\n\n${description}`;
    }

    // Add technical details section if available
    if (vulnerability.technical_details) {
      description += `\n\n## Technical Details\n${vulnerability.technical_details}`;
    }

    return description;
  }

  /**
   * Format impact section with severity context
   * @param {Object} vulnerability - Vulnerability data
   * @returns {string} Formatted impact
   */
  _formatImpact(vulnerability) {
    let impact = vulnerability.impact || 'Not specified';

    // Add severity context
    if (vulnerability.severity) {
      impact = `**Severity**: ${vulnerability.severity.toUpperCase()}\n\n${impact}`;
    }

    // Add financial impact if available
    if (vulnerability.financial_impact) {
      impact += `\n\n**Potential Financial Impact**: ${vulnerability.financial_impact}`;
    }

    return impact;
  }

  /**
   * Format steps to reproduce as numbered list
   * @param {Object} vulnerability - Vulnerability data
   * @returns {string} Formatted steps
   */
  _formatSteps(vulnerability) {
    if (!vulnerability.steps) {
      return 'No reproduction steps provided';
    }

    if (Array.isArray(vulnerability.steps)) {
      // Format as numbered list
      return vulnerability.steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
    }

    return vulnerability.steps;
  }

  /**
   * Format remediation with detailed recommendations
   * @param {Object} vulnerability - Vulnerability data
   * @returns {string} Formatted remediation
   */
  _formatRemediation(vulnerability) {
    let remediation =
      vulnerability.recommendation || vulnerability.remediation || 'No remediation provided';

    // Add code sample if available
    if (vulnerability.fix_code) {
      remediation += `\n\n### Suggested Fix\n\`\`\`solidity\n${vulnerability.fix_code}\n\`\`\``;
    }

    // Add references if available
    if (
      vulnerability.references &&
      Array.isArray(vulnerability.references) &&
      vulnerability.references.length > 0
    ) {
      remediation += '\n\n### References\n';
      vulnerability.references.forEach(ref => {
        remediation += `- ${ref}\n`;
      });
    }

    return remediation;
  }

  /**
   * Map internal vulnerability type to HackenProof category
   * @param {string} type - Internal vulnerability type
   * @returns {string} HackenProof vulnerability type
   */
  _mapVulnerabilityType(type) {
    const typeMap = {
      // Access Control
      'access-control': 'Access Control',
      authentication: 'Authentication',
      authorization: 'Authorization Bypass',
      'improper-access-control': 'Access Control',
      'missing-access-control': 'Access Control',

      // Common Web Vulnerabilities
      csrf: 'CSRF',
      xss: 'Cross-Site Scripting',
      sqli: 'SQL Injection',

      // Smart Contract Vulnerabilities
      dos: 'Denial of Service',
      'front-running': 'Front-Running',
      logic: 'Business Logic',
      reentrancy: 'Reentrancy',
      'integer-overflow': 'Integer Overflow/Underflow',
      'unchecked-return': 'Unchecked Return Values',

      // DeFi Specific
      'oracle-manipulation': 'Oracle Manipulation',
      'flash-loan': 'Flash Loan Attack',
      'price-manipulation': 'Price Manipulation',
      mev: 'MEV Vulnerability',

      // L2 & Cross-chain
      'bridge-vulnerability': 'Bridge Vulnerability',
      'l2-vulnerability': 'L2 Specific Vulnerability',
      'cross-chain': 'Cross-Chain Vulnerability',
    };

    return typeMap[type?.toLowerCase()] || 'Other';
  }

  /**
   * Generate HackenProof submissions from test results
   * @param {string|Object} input - Path to test results file or test results object
   * @returns {Array} Generated submissions
   */
  run(input) {
    try {
      // Load test results
      let testResults;
      if (typeof input === 'string') {
        if (!fs.existsSync(input)) {
          throw new Error(`Test results file not found: ${input}`);
        }
        testResults = fs.readJsonSync(input);
      } else {
        testResults = input;
      }

      // Validate test results
      if (!testResults) {
        throw new Error('Invalid test results: No data found');
      }

      // Look for security issues in multiple possible locations in the results object
      const securityIssues =
        testResults.securityIssues ||
        testResults.issues ||
        testResults.vulnerabilities ||
        (testResults.results && testResults.results.issues) ||
        [];

      if (securityIssues.length === 0) {
        console.warn('No security issues found in test results');
        return [];
      }

      // Generate submissions for each security issue
      const submissions = [];
      for (const issue of securityIssues) {
        const formatted = this.formatVulnerability(issue);

        // Generate unique ID for this submission
        const id = crypto.randomBytes(4).toString('hex');
        const outputPath = path.join(this.outputDir, `hackenproof-submission-${id}.json`);

        // Save submission to file
        fs.writeJsonSync(outputPath, formatted, { spaces: 2 });

        submissions.push({
          id,
          path: outputPath,
          title: formatted.title,
          severity: formatted.severity,
          type: formatted.vulnerability_type,
        });
      }

      // Generate index file
      const indexPath = path.join(this.outputDir, 'index.json');
      fs.writeJsonSync(
        indexPath,
        {
          timestamp: new Date().toISOString(),
          count: submissions.length,
          submissions,
        },
        { spaces: 2 }
      );

      // Generate markdown summary
      this._generateMarkdownSummary(submissions);

      return submissions.map(s => s.path);
    } catch (error) {
      console.error('Error generating HackenProof submissions:', error);
      throw error;
    }
  }

  /**
   * Generate a markdown summary of all submissions
   * @param {Array} submissions - List of submission metadata
   */
  _generateMarkdownSummary(submissions) {
    try {
      const summaryPath = path.join(this.outputDir, 'summary.md');

      let content = '# HackenProof Vulnerability Submissions\n\n';
      content += `Generated: ${new Date().toISOString()}\n\n`;
      content += `Total submissions: ${submissions.length}\n\n`;

      // Group by severity
      const bySeverity = {};
      submissions.forEach(sub => {
        if (!bySeverity[sub.severity]) {
          bySeverity[sub.severity] = [];
        }
        bySeverity[sub.severity].push(sub);
      });

      // Add severity sections
      const severities = ['critical', 'high', 'medium', 'low', 'informational'];
      severities.forEach(severity => {
        if (bySeverity[severity] && bySeverity[severity].length > 0) {
          content += `## ${severity.toUpperCase()} Severity (${bySeverity[severity].length})\n\n`;

          bySeverity[severity].forEach(sub => {
            content += `- **${sub.title}** [${sub.id}]\n`;
          });

          content += '\n';
        }
      });

      fs.writeFileSync(summaryPath, content);
    } catch (error) {
      console.warn('Error generating markdown summary:', error);
    }
  }

  /**
   * Submit report to HackenProof API (if API key is provided)
   * @param {string} programId - HackenProof program ID
   * @param {string} filePath - Path to submission file
   * @returns {Promise<Object>} Submission result
   */
  async submitToApi(programId, filePath) {
    if (!this.apiKey) {
      throw new Error(
        'HackenProof API key not provided. Set HACKENPROOF_API_KEY environment variable.'
      );
    }

    if (!programId) {
      throw new Error('HackenProof program ID is required');
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`Submission file not found: ${filePath}`);
    }

    try {
      const submission = fs.readJsonSync(filePath);

      // Add retry logic with exponential backoff
      let retries = 0;
      const maxRetries = 3;
      let lastError = null;

      while (retries < maxRetries) {
        try {
          const response = await axios.post(
            `${this.apiUrl}/programs/${programId}/reports`,
            submission,
            {
              headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
              },
              timeout: 30000, // 30 second timeout
            }
          );

          // Log success and save response details
          const resultPath = path.join(this.outputDir, `submission-result-${Date.now()}.json`);
          fs.writeJsonSync(
            resultPath,
            {
              timestamp: new Date().toISOString(),
              submission: path.basename(filePath),
              response: response.data,
            },
            { spaces: 2 }
          );

          return {
            success: true,
            reportId: response.data.id,
            url: response.data.url,
            submission: submission.title,
          };
        } catch (error) {
          lastError = error;
          retries++;

          // Only retry on network errors or 5xx status codes
          if (!error.response || (error.response.status >= 500 && error.response.status < 600)) {
            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, retries - 1) * 1000;
            console.log(`API request failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            // Don't retry for 4xx errors
            break;
          }
        }
      }

      // If we got here, all retries failed
      console.error(
        'Error submitting to HackenProof API:',
        lastError.response?.data || lastError.message
      );
      return {
        success: false,
        error: lastError.response?.data?.message || lastError.message,
        statusCode: lastError.response?.status,
      };
    } catch (error) {
      console.error('Error submitting to HackenProof API:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Batch submit multiple reports to HackenProof
   * @param {string} programId - HackenProof program ID
   * @param {Array<string>} filePaths - Array of submission file paths
   * @returns {Promise<Object>} Submission results
   */
  async batchSubmit(programId, filePaths) {
    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      throw new Error('No submission files provided');
    }

    const results = {
      timestamp: new Date().toISOString(),
      total: filePaths.length,
      success: 0,
      failed: 0,
      submissions: [],
    };

    for (const filePath of filePaths) {
      try {
        const result = await this.submitToApi(programId, filePath);
        results.submissions.push(result);

        if (result.success) {
          results.success++;
        } else {
          results.failed++;
        }

        // Add a small delay between submissions to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.failed++;
        results.submissions.push({
          success: false,
          error: error.message,
          filePath,
        });
      }
    }

    // Save batch results
    const batchResultPath = path.join(this.outputDir, `batch-result-${Date.now()}.json`);
    fs.writeJsonSync(batchResultPath, results, { spaces: 2 });

    return results;
  }
}

exports.HackenProofSubmission = HackenProofSubmission;
