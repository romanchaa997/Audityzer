/**
 * Auto Submission Service
 *
 * Automates the submission of vulnerabilities to bug bounty platforms.
 */

const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { ImmunefiSubmissionGenerator } = require('./immunefi-submission-generator');
const { Code4renaIntegration } = require('./code4rena-integration');
const { SherlockReportFormatter } = require('./sherlock-report-formatter');
const { HackenProofSubmission } = require('./hackenproof-submission');

class AutoSubmissionService {
  /**
   * Initialize the auto submission service
   * @param {Array<string>} platforms - Platforms to enable auto-submission for
   * @param {Object} options - Submission options
   */
  constructor(platforms = [], options = {}) {
    this.options = {
      dataDir: options.dataDir || './data/auto-submission',
      apiKeys: options.apiKeys || {},
      platforms:
        platforms && platforms.length > 0
          ? platforms
          : ['immunefi', 'code4rena', 'sherlock', 'hackenproof'],
      retryLimit: options.retryLimit || 3,
      dryRun: options.dryRun !== undefined ? options.dryRun : false,
    };

    // Initialize platform generators
    this.platformGenerators = {
      immunefi: new ImmunefiSubmissionGenerator(path.join(this.options.dataDir, 'immunefi')),
      code4rena: new Code4renaIntegration(
        options.contestId,
        path.join(this.options.dataDir, 'code4rena')
      ),
      sherlock: new SherlockReportFormatter(
        options.contestName,
        path.join(this.options.dataDir, 'sherlock')
      ),
      hackenproof: new HackenProofSubmission(path.join(this.options.dataDir, 'hackenproof')),
    };

    // Ensure data directory exists
    fs.ensureDirSync(this.options.dataDir);

    // Track submission history
    this.submissionHistory = this._loadSubmissionHistory();
  }

  /**
   * Load submission history
   * @returns {Object} Submission history
   */
  _loadSubmissionHistory() {
    const historyPath = path.join(this.options.dataDir, 'submission-history.json');

    if (fs.existsSync(historyPath)) {
      try {
        return fs.readJsonSync(historyPath);
      } catch (error) {
        console.error('Error reading submission history:', error);
      }
    }

    return {
      submissions: [],
      platforms: {},
      lastRun: null,
    };
  }

  /**
   * Save submission history
   */
  _saveSubmissionHistory() {
    const historyPath = path.join(this.options.dataDir, 'submission-history.json');

    try {
      fs.writeJsonSync(historyPath, this.submissionHistory, { spaces: 2 });
    } catch (error) {
      console.error('Error saving submission history:', error);
    }
  }

  /**
   * Process and submit vulnerabilities to all enabled platforms
   * @param {string|Object} input - Path to security report file or report object
   * @returns {Promise<Object>} Submission results
   */
  async submitToAllPlatforms(input) {
    // Load report data
    let reportData;
    if (typeof input === 'string') {
      if (!fs.existsSync(input)) {
        throw new Error(`Report file not found: ${input}`);
      }
      reportData = fs.readJsonSync(input);
    } else {
      reportData = input;
    }

    // Initialize results
    const results = {
      timestamp: new Date().toISOString(),
      totalSubmissions: 0,
      successfulSubmissions: 0,
      failedSubmissions: 0,
      dryRun: this.options.dryRun,
      platforms: {},
    };

    // Process for each enabled platform
    for (const platform of this.options.platforms) {
      if (!this.platformGenerators[platform]) {
        console.warn(`Platform ${platform} not supported. Skipping.`);
        continue;
      }

      try {
        console.log(`Generating submissions for ${platform}...`);

        // Initialize platform results
        results.platforms[platform] = {
          submissions: [],
          success: 0,
          failed: 0,
        };

        // Generate submissions
        const generator = this.platformGenerators[platform];
        const platformSubmissions = await this._generateSubmissionsForPlatform(
          platform,
          generator,
          reportData
        );

        console.log(`Generated ${platformSubmissions.length} submissions for ${platform}`);

        // Submit to platform API if not a dry run
        if (!this.options.dryRun) {
          for (const submission of platformSubmissions) {
            try {
              const apiResult = await this._submitToPlatformApi(platform, generator, submission);

              if (apiResult.success) {
                results.platforms[platform].success++;
                results.successfulSubmissions++;

                // Add to submission history
                this.submissionHistory.submissions.push({
                  id: apiResult.reportId || `${platform}-${Date.now()}`,
                  platform,
                  title: submission.title,
                  severity: submission.severity,
                  submittedAt: new Date().toISOString(),
                  status: 'submitted',
                  url: apiResult.url,
                });

                // Update platform stats
                if (!this.submissionHistory.platforms[platform]) {
                  this.submissionHistory.platforms[platform] = {
                    totalSubmissions: 0,
                    acceptedSubmissions: 0,
                    rejectedSubmissions: 0,
                    pendingSubmissions: 0,
                  };
                }

                this.submissionHistory.platforms[platform].totalSubmissions++;
                this.submissionHistory.platforms[platform].pendingSubmissions++;
              } else {
                results.platforms[platform].failed++;
                results.failedSubmissions++;
              }

              results.platforms[platform].submissions.push({
                title: submission.title,
                severity: submission.severity,
                success: apiResult.success,
                reportId: apiResult.reportId,
                url: apiResult.url,
                error: apiResult.error,
              });
            } catch (error) {
              console.error(`Error submitting to ${platform}:`, error);

              results.platforms[platform].failed++;
              results.failedSubmissions++;

              results.platforms[platform].submissions.push({
                title: submission.title,
                severity: submission.severity,
                success: false,
                error: error.message,
              });
            }
          }
        } else {
          console.log(
            `[DRY RUN] Would submit ${platformSubmissions.length} submissions to ${platform}`
          );

          // For dry run, just count all as "successful"
          results.platforms[platform].success += platformSubmissions.length;
          results.successfulSubmissions += platformSubmissions.length;

          for (const submission of platformSubmissions) {
            results.platforms[platform].submissions.push({
              title: submission.title || 'No title',
              severity: submission.severity || 'unknown',
              success: true,
              dryRun: true,
            });
          }
        }

        results.totalSubmissions += platformSubmissions.length;
      } catch (error) {
        console.error(`Error processing ${platform}:`, error);

        results.platforms[platform] = {
          error: error.message,
          submissions: [],
          success: 0,
          failed: 0,
        };
      }
    }

    // Update submission history
    this.submissionHistory.lastRun = new Date().toISOString();
    this._saveSubmissionHistory();

    // Write results to file
    const resultsPath = path.join(this.options.dataDir, `submission-results-${Date.now()}.json`);
    fs.writeJsonSync(resultsPath, results, { spaces: 2 });

    console.log(`Submission complete. Results saved to ${resultsPath}`);
    return results;
  }

  /**
   * Generate submissions for a specific platform
   * @param {string} platform - Platform name
   * @param {Object} generator - Platform generator instance
   * @param {Object} reportData - Security report data
   * @returns {Promise<Array>} Generated submissions
   */
  async _generateSubmissionsForPlatform(platform, generator, reportData) {
    try {
      // Each platform has different methods and formats
      switch (platform) {
        case 'immunefi':
          return await this._generateImmunefiSubmissions(generator, reportData);
        case 'code4rena':
          return await this._generateCode4renaSubmissions(generator, reportData);
        case 'sherlock':
          return await this._generateSherlockSubmissions(generator, reportData);
        case 'hackenproof':
          return await this._generateHackenproofSubmissions(generator, reportData);
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Error generating submissions for ${platform}:`, error);
      return [];
    }
  }

  /**
   * Submit a vulnerability to a platform API
   * @param {string} platform - Platform name
   * @param {Object} generator - Platform generator instance
   * @param {Object} submission - Submission data
   * @returns {Promise<Object>} Submission result
   */
  async _submitToPlatformApi(platform, generator, submission) {
    // Get API key for platform
    const apiKey = this.options.apiKeys[platform];
    if (!apiKey) {
      return {
        success: false,
        error: `No API key provided for ${platform}`,
      };
    }

    try {
      switch (platform) {
        case 'immunefi':
          // Immunefi requires a program ID
          if (!this.options.immunefiProgramId) {
            return {
              success: false,
              error: 'Immunefi program ID not provided',
            };
          }

          return await generator.submitToApi(this.options.immunefiProgramId, submission, apiKey);

        case 'hackenproof':
          // HackenProof requires a program ID
          if (!this.options.hackenproofProgramId) {
            return {
              success: false,
              error: 'HackenProof program ID not provided',
            };
          }

          return await generator.submitToApi(this.options.hackenproofProgramId, submission);

        case 'code4rena':
          // Code4rena requires a contest ID
          if (!this.options.contestId) {
            return {
              success: false,
              error: 'Code4rena contest ID not provided',
            };
          }

          return await generator.submitToContest(this.options.contestId, submission, apiKey);

        case 'sherlock':
          // Sherlock requires a contest name
          if (!this.options.contestName) {
            return {
              success: false,
              error: 'Sherlock contest name not provided',
            };
          }

          return await generator.submitToContest(this.options.contestName, submission, apiKey);

        default:
          return {
            success: false,
            error: `Unsupported platform: ${platform}`,
          };
      }
    } catch (error) {
      console.error(`Error submitting to ${platform} API:`, error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate Immunefi submissions
   * @param {Object} generator - Immunefi generator
   * @param {Object} reportData - Security report data
   * @returns {Promise<Array>} Generated submissions
   */
  async _generateImmunefiSubmissions(generator, reportData) {
    // Call the generator's run method
    const submissions = await generator.run(reportData);

    // Load and return the generated submissions
    return submissions
      .map(submissionPath => {
        if (fs.existsSync(submissionPath)) {
          return fs.readJsonSync(submissionPath);
        }

        return null;
      })
      .filter(Boolean);
  }

  /**
   * Generate Code4rena submissions
   * @param {Object} generator - Code4rena generator
   * @param {Object} reportData - Security report data
   * @returns {Promise<Array>} Generated submissions
   */
  async _generateCode4renaSubmissions(generator, reportData) {
    // Call the generator's run method
    const submissions = await generator.run(reportData);

    // Code4rena generator might return direct objects or file paths
    if (
      Array.isArray(submissions) &&
      submissions.length > 0 &&
      typeof submissions[0] === 'string'
    ) {
      return submissions
        .map(submissionPath => {
          if (fs.existsSync(submissionPath)) {
            return fs.readJsonSync(submissionPath);
          }

          return null;
        })
        .filter(Boolean);
    }

    return submissions;
  }

  /**
   * Generate Sherlock submissions
   * @param {Object} generator - Sherlock generator
   * @param {Object} reportData - Security report data
   * @returns {Promise<Array>} Generated submissions
   */
  async _generateSherlockSubmissions(generator, reportData) {
    // Call the generator's run method
    const result = await generator.run(reportData);

    // Sherlock typically returns a report with multiple issues
    if (result.reportPath && fs.existsSync(result.reportPath)) {
      const reportContent = fs.readJsonSync(result.reportPath);

      // Convert report issues to individual submissions
      if (reportContent.issues && Array.isArray(reportContent.issues)) {
        return reportContent.issues.map(issue => ({
          ...issue,
          reportId: result.reportId,
        }));
      }

      return [reportContent];
    }

    return [];
  }

  /**
   * Generate HackenProof submissions
   * @param {Object} generator - HackenProof generator
   * @param {Object} reportData - Security report data
   * @returns {Promise<Array>} Generated submissions
   */
  async _generateHackenproofSubmissions(generator, reportData) {
    // Call the generator's run method
    const submissions = await generator.run(reportData);

    // Load and return the generated submissions
    return submissions
      .map(submissionPath => {
        if (fs.existsSync(submissionPath)) {
          return fs.readJsonSync(submissionPath);
        }

        return null;
      })
      .filter(Boolean);
  }

  /**
   * Check status of previous submissions
   * @returns {Promise<Object>} Status update results
   */
  async checkSubmissionStatus() {
    // Initialize results
    const results = {
      timestamp: new Date().toISOString(),
      updatedSubmissions: 0,
      platforms: {},
    };

    // Check for each platform
    for (const platform of this.options.platforms) {
      if (!this.platformGenerators[platform]) {
        continue;
      }

      const apiKey = this.options.apiKeys[platform];
      if (!apiKey) {
        continue;
      }

      try {
        console.log(`Checking submission status for ${platform}...`);

        results.platforms[platform] = {
          checked: 0,
          updated: 0,
          submissions: [],
        };

        // Get pending submissions for this platform
        const pendingSubmissions = this.submissionHistory.submissions.filter(
          s => s.platform === platform && s.status === 'submitted'
        );

        if (pendingSubmissions.length === 0) {
          console.log(`No pending submissions for ${platform}`);
          continue;
        }

        // Check status for each submission
        for (const submission of pendingSubmissions) {
          try {
            results.platforms[platform].checked++;

            // Skip if no reportId
            if (!submission.id) {
              continue;
            }

            // Get status from API
            const status = await this._checkSubmissionStatusFromApi(
              platform,
              submission.id,
              apiKey
            );

            // Update if status changed
            if (status && status.currentStatus !== submission.status) {
              submission.status = status.currentStatus;
              submission.updatedAt = new Date().toISOString();

              // Update platform stats
              if (status.currentStatus === 'accepted' || status.currentStatus === 'valid') {
                this.submissionHistory.platforms[platform].acceptedSubmissions++;
                this.submissionHistory.platforms[platform].pendingSubmissions--;
              } else if (
                status.currentStatus === 'rejected' ||
                status.currentStatus === 'invalid'
              ) {
                this.submissionHistory.platforms[platform].rejectedSubmissions++;
                this.submissionHistory.platforms[platform].pendingSubmissions--;
              }

              results.platforms[platform].updated++;
              results.updatedSubmissions++;

              results.platforms[platform].submissions.push({
                id: submission.id,
                title: submission.title,
                previousStatus: 'submitted',
                currentStatus: status.currentStatus,
                updatedAt: submission.updatedAt,
              });
            }
          } catch (error) {
            console.error(`Error checking status for submission ${submission.id}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error checking status for ${platform}:`, error);
        results.platforms[platform] = {
          error: error.message,
        };
      }
    }

    // Save updated history
    this._saveSubmissionHistory();

    return results;
  }

  /**
   * Check submission status from platform API
   * @param {string} platform - Platform name
   * @param {string} submissionId - Submission ID
   * @param {string} apiKey - API key
   * @returns {Promise<Object>} Status result
   */
  async _checkSubmissionStatusFromApi(platform, submissionId, apiKey) {
    try {
      let response;

      switch (platform) {
        case 'immunefi':
          // Example Immunefi API call
          response = await axios.get(`https://api.immunefi.com/v1/reports/${submissionId}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
          });

          return {
            currentStatus: response.data.status,
            details: response.data,
          };

        case 'hackenproof':
          // Example HackenProof API call
          response = await axios.get(`https://hackenproof.com/api/v1/reports/${submissionId}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
          });

          return {
            currentStatus: response.data.status,
            details: response.data,
          };

        case 'code4rena':
          // Code4rena doesn't have a status API, so we simulate it
          return {
            currentStatus: 'submitted', // Always "submitted" since we can't check
            details: {},
          };

        case 'sherlock':
          // Sherlock doesn't have a status API, so we simulate it
          return {
            currentStatus: 'submitted', // Always "submitted" since we can't check
            details: {},
          };

        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Error checking status from ${platform} API:`, error);
      return null;
    }
  }
}

exports.AutoSubmissionService = AutoSubmissionService;
