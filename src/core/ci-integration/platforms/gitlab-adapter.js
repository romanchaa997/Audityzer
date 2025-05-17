/**
 * @fileoverview GitLab CI/CD platform adapter for Audityzer
 *
 * This module provides GitLab-specific integration functionality including
 * GitLab CI pipeline integration, Security Dashboard reporting,
 * and Pipeline Visualization capabilities.
 */

const fs = require('fs');
const path = require('path');

class GitLabAdapter {
  constructor(config = {}) {
    this.config = config;
    this.projectInfo = this.getProjectInfo();
  }

  /**
   * Get GitLab project information from environment variables
   * @returns {Object} Project information
   */
  getProjectInfo() {
    return {
      projectId: process.env.CI_PROJECT_ID || '',
      projectUrl: process.env.CI_PROJECT_URL || '',
      pipelineId: process.env.CI_PIPELINE_ID || '',
      jobId: process.env.CI_JOB_ID || '',
      jobUrl: process.env.CI_JOB_URL || '',
      sha: process.env.CI_COMMIT_SHA || '',
      ref: process.env.CI_COMMIT_REF_NAME || '',
    };
  }

  /**
   * Format test results for GitLab CI
   * @param {Object} results - Test results to format
   * @returns {Object} GitLab-specific formatted results
   */
  formatResults(results) {
    if (!results) return null;

    // Create JUnit XML for GitLab
    this.generateJUnitReport(results);

    // Create GitLab CI format
    return {
      ...results,
      gitlab_formatted: true,
      summary: {
        total: (results.passed || 0) + (results.failed || 0) + (results.skipped || 0),
        passed: results.passed || 0,
        failed: results.failed || 0,
        skipped: results.skipped || 0,
        duration: results.duration || 0,
      },
      status: results.failed > 0 ? 'failed' : 'success',
    };
  }

  /**
   * Generate a JUnit XML report for GitLab CI integration
   * @param {Object} results - Test results to include in report
   * @param {string} outputPath - Path to write JUnit report
   * @returns {boolean} Success status
   */
  generateJUnitReport(results, outputPath = './test-results/junit-report.xml') {
    try {
      if (!results || !results.tests) {
        console.error('No test results to generate JUnit report from');
        return false;
      }

      // Create JUnit XML content
      let junitContent = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Audityzer Security Tests" tests="${results.tests.length}" failures="${results.failed || 0}" errors="0" time="${(results.duration || 0) / 1000}">
  <testsuite name="Security Tests" tests="${results.tests.length}" failures="${results.failed || 0}" errors="0" time="${(results.duration || 0) / 1000}">
`;

      // Add test cases
      results.tests.forEach(test => {
        const testDuration = (test.duration || 0) / 1000;
        const testName = test.title.replace(/[<>&'"]/g, c => {
          switch (c) {
            case '<':
              return '&lt;';
            case '>':
              return '&gt;';
            case '&':
              return '&amp;';
            case "'":
              return '&apos;';
            case '"':
              return '&quot;';
          }
        });

        if (test.status === 'failed') {
          const errorMessage = test.error || 'Test failed';
          junitContent += `    <testcase name="${testName}" classname="Audityzer.SecurityTests" time="${testDuration}">
      <failure message="${errorMessage.replace(/[<>&'"]/g, c => {
        switch (c) {
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case '&':
            return '&amp;';
          case "'":
            return '&apos;';
          case '"':
            return '&quot;';
        }
      })}">${errorMessage.replace(/[<>&'"]/g, c => {
        switch (c) {
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case '&':
            return '&amp;';
          case "'":
            return '&apos;';
          case '"':
            return '&quot;';
        }
      })}</failure>
    </testcase>
`;
        } else if (test.status === 'skipped') {
          junitContent += `    <testcase name="${testName}" classname="Audityzer.SecurityTests" time="0">
      <skipped/>
    </testcase>
`;
        } else {
          junitContent += `    <testcase name="${testName}" classname="Audityzer.SecurityTests" time="${testDuration}"/>
`;
        }
      });

      // Close XML tags
      junitContent += '  </testsuite>\n</testsuites>';

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write JUnit report to file
      fs.writeFileSync(outputPath, junitContent);
      console.log(`JUnit report generated at: ${outputPath}`);

      // Emit GitLab CI job output
      console.log(`\nGitLab JUnit report available at: ${outputPath}`);
      if (process.env.CI_JOB_URL) {
        console.log(`View job results at: ${process.env.CI_JOB_URL}`);
      }

      return true;
    } catch (error) {
      console.error('Error generating JUnit report:', error);
      return false;
    }
  }

  /**
   * Generate a GitLab Security Dashboard compatible report
   * @param {Array} securityIssues - Security issues to include in report
   * @param {string} outputPath - Path to write security report
   * @returns {boolean} Success status
   */
  generateSecurityReport(securityIssues, outputPath = './test-results/gl-security-report.json') {
    try {
      // Create GitLab Security Report structure
      // Based on https://docs.gitlab.com/ee/user/application_security/secure_files_specification/
      const securityReport = {
        version: '2.0',
        vulnerabilities: [],
        scan: {
          scanner: {
            id: 'Audityzer',
            name: 'Audityzer',
            version: '1.1.0',
            vendor: {
              name: 'Audityzer',
            },
          },
          type: 'dast',
          start_time: new Date().toISOString(),
          end_time: new Date().toISOString(),
          status: 'success',
        },
      };

      // Add vulnerabilities for each security issue
      securityIssues.forEach(issue => {
        securityReport.vulnerabilities.push({
          id: issue.ruleId || `Audityzer-${Math.floor(Math.random() * 10000)}`,
          category: 'dast',
          name: issue.title || 'Security Issue',
          description: issue.description || 'Security issue detected by Audityzer',
          severity: this.mapSeverityToGitLabSeverity(issue.severity),
          confidence: 'high',
          solution: issue.remediation || 'No remediation provided',
          scanner: {
            id: 'Audityzer',
            name: 'Audityzer',
          },
          identifiers: [
            {
              type: 'Audityzer_rule_id',
              name: issue.ruleId || 'Unknown Rule',
              value: issue.ruleId || 'unknown',
            },
          ],
          location: {
            file: issue.location || 'unknown',
            start_line: issue.line || 1,
          },
          links: (issue.references || []).map(ref => ({
            url: ref.url,
            name: ref.title,
          })),
        });
      });

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write security report to file
      fs.writeFileSync(outputPath, JSON.stringify(securityReport, null, 2));
      console.log(`GitLab Security Report generated at: ${outputPath}`);

      // In GitLab CI, add job report information
      if (process.env.GITLAB_CI) {
        console.log(`\nGitLab Security Report available at: ${outputPath}`);
        console.log(
          "Make sure to configure the job with 'artifacts.reports.dast' to see these results in the Security Dashboard."
        );
      }

      return true;
    } catch (error) {
      console.error('Error generating GitLab Security Report:', error);
      return false;
    }
  }

  /**
   * Map Audityzer severity levels to GitLab severity levels
   * @param {string} severity - Audityzer severity level
   * @returns {string} GitLab severity level
   */
  mapSeverityToGitLabSeverity(severity) {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'critical';
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      case 'low':
        return 'low';
      case 'info':
        return 'info';
      default:
        return 'unknown';
    }
  }

  /**
   * Generate a GitLab pipeline visualization report
   * @param {Array} testResults - Test results to visualize
   * @param {string} outputPath - Path to write visualization report
   * @returns {boolean} Success status
   */
  generatePipelineVisualization(
    testResults,
    outputPath = './test-results/gl-pipeline-visualization.json'
  ) {
    try {
      // Create stages for the visualization
      const stages = [
        {
          name: 'Security Validation',
          groups: [
            {
              name: 'Security Rules',
              jobs: [
                {
                  name: 'Validate Security Rules',
                  size: 1,
                  status: testResults.rulesValidationSuccess ? 'success' : 'failed',
                },
              ],
            },
          ],
        },
        {
          name: 'Security Testing',
          groups: [],
        },
      ];

      // Group tests by category
      const testsByCategory = {};
      testResults.tests.forEach(test => {
        const category = test.category || 'general';
        if (!testsByCategory[category]) {
          testsByCategory[category] = {
            passed: 0,
            failed: 0,
            skipped: 0,
            tests: [],
          };
        }

        testsByCategory[category].tests.push(test);
        if (test.status === 'passed') testsByCategory[category].passed++;
        else if (test.status === 'failed') testsByCategory[category].failed++;
        else if (test.status === 'skipped') testsByCategory[category].skipped++;
      });

      // Create test groups for visualization
      Object.keys(testsByCategory).forEach(category => {
        const categoryStats = testsByCategory[category];
        const group = {
          name: this.formatCategoryName(category),
          jobs: [],
        };

        // Create a job for each test result status
        if (categoryStats.passed > 0) {
          group.jobs.push({
            name: `${this.formatCategoryName(category)} - Passed`,
            size: categoryStats.passed,
            status: 'success',
          });
        }

        if (categoryStats.failed > 0) {
          group.jobs.push({
            name: `${this.formatCategoryName(category)} - Failed`,
            size: categoryStats.failed,
            status: 'failed',
          });
        }

        if (categoryStats.skipped > 0) {
          group.jobs.push({
            name: `${this.formatCategoryName(category)} - Skipped`,
            size: categoryStats.skipped,
            status: 'pending',
          });
        }

        stages[1].groups.push(group);
      });

      // Create the visualization report
      const visualizationReport = {
        version: '1.0',
        stages,
      };

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write visualization report to file
      fs.writeFileSync(outputPath, JSON.stringify(visualizationReport, null, 2));
      console.log(`GitLab Pipeline Visualization report generated at: ${outputPath}`);

      return true;
    } catch (error) {
      console.error('Error generating GitLab Pipeline Visualization:', error);
      return false;
    }
  }

  /**
   * Format a category name for display
   * @param {string} category - Category name
   * @returns {string} Formatted category name
   */
  formatCategoryName(category) {
    return category
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

module.exports = GitLabAdapter;
