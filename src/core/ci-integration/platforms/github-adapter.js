/**
 * @fileoverview GitHub CI/CD platform adapter for Audityzer
 *
 * This module provides GitHub-specific integration functionality including
 * GitHub Actions workflow integration, SARIF reporting for GitHub Security,
 * and GitHub Issues creation for security violations.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitHubAdapter {
  constructor(config = {}) {
    this.config = config;
    this.repositoryInfo = this.getRepositoryInfo();
    this.annotations = [];
  }

  /**
   * Get GitHub repository information from environment variables
   * @returns {Object} Repository information
   */
  getRepositoryInfo() {
    return {
      owner: process.env.GITHUB_REPOSITORY_OWNER || '',
      repo: process.env.GITHUB_REPOSITORY?.split('/')[1] || '',
      sha: process.env.GITHUB_SHA || '',
      runId: process.env.GITHUB_RUN_ID || '',
      token: process.env.GITHUB_TOKEN || '',
    };
  }

  /**
   * Format test results for GitHub Actions
   * @param {Object} results - Test results to format
   * @returns {Object} GitHub-specific formatted results
   */
  formatResults(results) {
    if (!results) return null;

    this.annotations = results.tests
      .filter(test => test.status === 'failed')
      .map(test => ({
        path: test.file || 'unknown',
        start_line: test.line || 1,
        end_line: test.line || 1,
        annotation_level: 'failure',
        message: test.error || 'Test failed',
        title: `Failed: ${test.title}`,
        raw_details: JSON.stringify(test, null, 2),
      }));

    return {
      ...results,
      annotations: this.annotations,
      conclusion: results.failed > 0 ? 'failure' : 'success',
      summary: `${results.passed} passed, ${results.failed} failed, ${results.skipped} skipped`,
      github_formatted: true,
    };
  }

  /**
   * Create GitHub check annotations using GitHub Actions
   * @param {Array} annotations - The annotations to create
   * @returns {boolean} Success status
   */
  createCheckAnnotations(annotations = this.annotations) {
    if (!annotations || annotations.length === 0) {
      return true;
    }

    try {
      const maxAnnotationsPerStep = 10; // GitHub has a limit of annotations per step

      // Split annotations into batches to avoid hitting GitHub limits
      for (let i = 0; i < annotations.length; i += maxAnnotationsPerStep) {
        const batch = annotations.slice(i, i + maxAnnotationsPerStep);

        // Using GitHub Actions Workflow Commands syntax
        // https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
        batch.forEach(annotation => {
          const { path, start_line, end_line, annotation_level, message, title } = annotation;

          // Output the annotation in GitHub Actions format
          console.log(
            `::[${annotation_level} file=${path},line=${start_line},endLine=${end_line},title=${title}]::${message}`
          );
        });
      }

      return true;
    } catch (error) {
      console.error('Error creating GitHub check annotations:', error);
      return false;
    }
  }

  /**
   * Generate a SARIF report for GitHub Security Analysis
   * @param {Array} securityIssues - Security issues to include in report
   * @param {string} outputPath - Path to write SARIF report
   * @returns {boolean} Success status
   */
  generateSarifReport(securityIssues, outputPath = './test-results/security-results.sarif') {
    try {
      // Create SARIF report structure
      const sarifReport = {
        $schema:
          'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
        version: '2.1.0',
        runs: [
          {
            tool: {
              driver: {
                name: 'Audityzer',
                version: '1.1.0',
                informationUri: 'https://github.com/romanchaa997/Audityzer',
                rules: [],
              },
            },
            results: [],
          },
        ],
      };

      // Add rules and results for each security issue
      const addedRuleIds = new Set();

      securityIssues.forEach(issue => {
        const ruleId =
          issue.ruleId || `Audityzer-${issue.category}-${Math.floor(Math.random() * 1000)}`;

        // Add rule definition if not already added
        if (!addedRuleIds.has(ruleId)) {
          sarifReport.runs[0].tool.driver.rules.push({
            id: ruleId,
            shortDescription: {
              text: issue.title || 'Security Issue',
            },
            fullDescription: {
              text: issue.description || 'Web3 Security Issue',
            },
            helpUri: issue.references?.[0]?.url || 'https://github.com/romanchaa997/Audityzer',
            properties: {
              category: issue.category || 'security',
              tags: [issue.category, `severity-${issue.severity}`],
            },
            defaultConfiguration: {
              level: this.mapSeverityToLevel(issue.severity),
            },
            help: {
              text: issue.remediation || 'No remediation information available.',
              markdown: issue.remediation
                ? `## Remediation\n\n${issue.remediation}`
                : 'No remediation information available.',
            },
          });

          addedRuleIds.add(ruleId);
        }

        // Add result (finding)
        sarifReport.runs[0].results.push({
          ruleId,
          level: this.mapSeverityToLevel(issue.severity),
          message: {
            text: issue.description || issue.title || 'Security issue detected',
          },
          locations: [
            {
              physicalLocation: {
                artifactLocation: {
                  uri: issue.location || 'unknown',
                },
                region: {
                  startLine: issue.line || 1,
                  startColumn: issue.column || 1,
                },
              },
            },
          ],
          properties: {
            category: issue.category,
            severity: issue.severity,
          },
        });
      });

      // Write SARIF report to file
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, JSON.stringify(sarifReport, null, 2));
      console.log(`SARIF report generated at: ${outputPath}`);

      // If running in GitHub Actions, upload the SARIF file
      if (process.env.GITHUB_ACTIONS) {
        console.log(
          `::warning::GitHub Security Analysis integration is available. Upload the SARIF file at ${outputPath} using the github/codeql-action/upload-sarif action.`
        );
      }

      return true;
    } catch (error) {
      console.error('Error generating SARIF report:', error);
      return false;
    }
  }

  /**
   * Map Audityzer severity levels to SARIF levels
   * @param {string} severity - Audityzer severity level
   * @returns {string} SARIF severity level
   */
  mapSeverityToLevel(severity) {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'note';
      case 'info':
        return 'none';
      default:
        return 'warning';
    }
  }

  /**
   * Create GitHub issues for security violations
   * @param {Array} securityIssues - Security issues to create GitHub issues for
   * @param {Object} options - Options for issue creation
   * @returns {Promise<Array>} Created issue URLs
   */
  async createIssues(securityIssues, options = {}) {
    // This would require GitHub API access, typically via Octokit
    // For this implementation, we'll just log that issues would be created
    // In a real implementation, you would use Octokit to create the issues

    const issueUrls = [];

    console.log('GitHub issue creation would create the following issues:');
    securityIssues.forEach((issue, index) => {
      // Only create issues for issues configured to do so
      if (issue.ciConfig?.autoCreateIssue) {
        const issueTitle = `[${issue.severity?.toUpperCase()}] ${issue.title || 'Security Issue'}`;

        console.log(`${index + 1}. ${issueTitle} (${issue.category})`);

        // In a real implementation with Octokit:
        // const createdIssue = await octokit.issues.create({
        //   owner: this.repositoryInfo.owner,
        //   repo: this.repositoryInfo.repo,
        //   title: issueTitle,
        //   body: this.formatIssueBody(issue),
        //   labels: ['security', `severity:${issue.severity}`, issue.category]
        // });
        // issueUrls.push(createdIssue.data.html_url);

        // For now, create a placeholder URL
        issueUrls.push(
          `https://github.com/${this.repositoryInfo.owner}/${this.repositoryInfo.repo}/issues/new`
        );
      }
    });

    return issueUrls;
  }

  /**
   * Format an issue body for GitHub issues
   * @param {Object} issue - Security issue to format
   * @returns {string} Formatted issue body in Markdown
   */
  formatIssueBody(issue) {
    return `
## Security Issue: ${issue.title}

**Severity:** ${issue.severity}
**Category:** ${issue.category}
**Rule ID:** ${issue.ruleId}

### Description
${issue.description || 'No description provided.'}

### Location
${issue.location || 'Not specified'}

### Remediation
${issue.remediation || 'No remediation steps provided.'}

### References
${(issue.references || []).map(ref => `- [${ref.title}](${ref.url})`).join('\n') || 'No references provided.'}

---
*This issue was automatically created by Audityzer Security Testing.*
    `;
  }
}

module.exports = GitHubAdapter;
