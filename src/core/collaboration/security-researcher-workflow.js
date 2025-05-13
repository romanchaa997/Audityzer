/**
 * Security Researcher Collaboration Module
 *
 * Provides tools for collaborative security research workflows, allowing teams
 * to coordinate vulnerability research, track findings, and share results securely.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Security severity levels
const SEVERITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFORMATIONAL: 'informational',
};

// Finding status options
const FINDING_STATUS = {
  DRAFT: 'draft',
  IN_REVIEW: 'in_review',
  CONFIRMED: 'confirmed',
  DUPLICATE: 'duplicate',
  INVALID: 'invalid',
  FIXED: 'fixed',
  PUBLISHED: 'published',
};

class SecurityResearchWorkflow {
  /**
   * Create a new Security Research Workflow instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.config = {
      // Storage configuration
      projectDir: config.projectDir || process.cwd(),
      workflowDir: config.workflowDir || path.join(process.cwd(), 'security-workflow'),
      findingsDir: config.findingsDir || path.join(process.cwd(), 'security-workflow', 'findings'),
      reportsDir: config.reportsDir || path.join(process.cwd(), 'security-workflow', 'reports'),

      // Collaboration options
      teamMembers: config.teamMembers || [],
      encryptFindings: config.encryptFindings !== false,
      encryptionKeys: config.encryptionKeys || {},
      signFindings: config.signFindings || false,

      // Integration options
      enableGithubIntegration: config.enableGithubIntegration || false,
      githubOptions: config.githubOptions || {},
      enableBountyPlatformIntegration: config.enableBountyPlatformIntegration || false,
      bountyPlatformOptions: config.bountyPlatformOptions || {},

      // Workflow options
      requireApproval: config.requireApproval || false,
      minReviewers: config.minReviewers || 1,
      logLevel: config.logLevel || 'info',

      ...config,
    };

    // Create necessary directories
    fs.ensureDirSync(this.config.workflowDir);
    fs.ensureDirSync(this.config.findingsDir);
    fs.ensureDirSync(this.config.reportsDir);

    // Initialize workflow metadata
    this.metadata = {
      project: path.basename(this.config.projectDir),
      creator: this.config.creator || 'Unknown',
      teamMembers: this.config.teamMembers,
      created: new Date().toISOString(),
      findings: {},
      reports: {},
    };

    // Load existing metadata if available
    this._loadMetadata();
  }

  /**
   * Load workflow metadata
   * @private
   */
  _loadMetadata() {
    const metadataPath = path.join(this.config.workflowDir, 'metadata.json');

    if (fs.existsSync(metadataPath)) {
      try {
        const savedMetadata = fs.readJsonSync(metadataPath);
        this.metadata = { ...this.metadata, ...savedMetadata };
      } catch (error) {
        console.error('Error loading workflow metadata:', error);
      }
    } else {
      // Create initial metadata file
      this._saveMetadata();
    }
  }

  /**
   * Save workflow metadata
   * @private
   */
  _saveMetadata() {
    const metadataPath = path.join(this.config.workflowDir, 'metadata.json');

    try {
      fs.writeJsonSync(metadataPath, this.metadata, { spaces: 2 });
    } catch (error) {
      console.error('Error saving workflow metadata:', error);
    }
  }

  /**
   * Create a new security finding
   * @param {Object} finding - Finding details
   * @returns {Object} Created finding
   */
  createFinding(finding) {
    // Validate required fields
    if (!finding.title) {
      throw new Error('Finding title is required');
    }

    if (!finding.description) {
      throw new Error('Finding description is required');
    }

    if (!finding.severity || !Object.values(SEVERITY_LEVELS).includes(finding.severity)) {
      throw new Error('Valid severity level is required');
    }

    // Generate unique ID for finding
    const findingId = finding.id || `FINDING-${uuidv4()}`;

    // Create finding object with metadata
    const newFinding = {
      id: findingId,
      title: finding.title,
      description: finding.description,
      severity: finding.severity,
      status: finding.status || FINDING_STATUS.DRAFT,
      created: new Date().toISOString(),
      createdBy: finding.createdBy || this.config.creator || 'Unknown',
      updated: new Date().toISOString(),
      updatedBy: finding.createdBy || this.config.creator || 'Unknown',
      affectedComponents: finding.affectedComponents || [],
      vulnerabilityType: finding.vulnerabilityType || 'Unknown',
      impact: finding.impact || '',
      recommendation: finding.recommendation || '',
      codeSnippets: finding.codeSnippets || [],
      proofOfConcept: finding.proofOfConcept || '',
      references: finding.references || [],
      reviewers: [],
      comments: [],
      history: [
        {
          action: 'created',
          timestamp: new Date().toISOString(),
          user: finding.createdBy || this.config.creator || 'Unknown',
        },
      ],
    };

    // Save finding to file
    const findingPath = path.join(this.config.findingsDir, `${findingId}.json`);

    if (this.config.encryptFindings) {
      this._encryptAndSaveFinding(newFinding, findingPath);
    } else {
      fs.writeJsonSync(findingPath, newFinding, { spaces: 2 });
    }

    // Update metadata
    this.metadata.findings[findingId] = {
      id: findingId,
      title: finding.title,
      severity: finding.severity,
      status: newFinding.status,
      created: newFinding.created,
      createdBy: newFinding.createdBy,
      updated: newFinding.updated,
    };

    this._saveMetadata();

    return newFinding;
  }

  /**
   * Encrypt and save a finding
   * @param {Object} finding - Finding to encrypt
   * @param {string} filepath - Path to save to
   * @private
   */
  _encryptAndSaveFinding(finding, filepath) {
    try {
      // Simple encryption for demonstration
      // In a real implementation, use strong encryption with proper key management
      const encryptionKey = this.config.encryptionKey || 'default-encryption-key';
      const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);

      let encrypted = cipher.update(JSON.stringify(finding), 'utf8', 'hex');
      encrypted += cipher.final('hex');

      fs.writeFileSync(filepath, encrypted);
    } catch (error) {
      console.error('Error encrypting finding:', error);
      // Fallback to unencrypted save
      fs.writeJsonSync(filepath, finding, { spaces: 2 });
    }
  }

  /**
   * Decrypt and load a finding
   * @param {string} filepath - Path to encrypted finding
   * @returns {Object} Decrypted finding
   * @private
   */
  _decryptAndLoadFinding(filepath) {
    try {
      // Simple decryption for demonstration
      const encryptionKey = this.config.encryptionKey || 'default-encryption-key';
      const encrypted = fs.readFileSync(filepath, 'utf8');

      const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Error decrypting finding:', error);
      // Try to load as unencrypted JSON
      return fs.readJsonSync(filepath);
    }
  }

  /**
   * Get a specific finding by ID
   * @param {string} findingId - ID of the finding to retrieve
   * @returns {Object} Retrieved finding
   */
  getFinding(findingId) {
    const findingPath = path.join(this.config.findingsDir, `${findingId}.json`);

    if (!fs.existsSync(findingPath)) {
      throw new Error(`Finding with ID ${findingId} not found`);
    }

    if (this.config.encryptFindings) {
      return this._decryptAndLoadFinding(findingPath);
    } else {
      return fs.readJsonSync(findingPath);
    }
  }

  /**
   * Update an existing finding
   * @param {string} findingId - ID of the finding to update
   * @param {Object} updates - Updated fields
   * @param {string} updatedBy - User making the update
   * @returns {Object} Updated finding
   */
  updateFinding(findingId, updates, updatedBy) {
    // Get existing finding
    const finding = this.getFinding(findingId);

    // Track what was updated
    const updatedFields = [];

    // Update fields
    for (const [key, value] of Object.entries(updates)) {
      if (
        key !== 'id' &&
        key !== 'created' &&
        key !== 'createdBy' &&
        key !== 'history' &&
        finding[key] !== value
      ) {
        finding[key] = value;
        updatedFields.push(key);
      }
    }

    // Only update if there were changes
    if (updatedFields.length > 0) {
      // Update metadata
      finding.updated = new Date().toISOString();
      finding.updatedBy = updatedBy || this.config.creator || 'Unknown';

      // Add to history
      finding.history.push({
        action: 'updated',
        fields: updatedFields,
        timestamp: finding.updated,
        user: finding.updatedBy,
      });

      // Save updated finding
      const findingPath = path.join(this.config.findingsDir, `${findingId}.json`);

      if (this.config.encryptFindings) {
        this._encryptAndSaveFinding(finding, findingPath);
      } else {
        fs.writeJsonSync(findingPath, finding, { spaces: 2 });
      }

      // Update metadata
      this.metadata.findings[findingId] = {
        ...this.metadata.findings[findingId],
        title: finding.title,
        severity: finding.severity,
        status: finding.status,
        updated: finding.updated,
        updatedBy: finding.updatedBy,
      };

      this._saveMetadata();
    }

    return finding;
  }

  /**
   * Add a comment to a finding
   * @param {string} findingId - Finding ID
   * @param {Object} comment - Comment to add
   * @returns {Object} Updated finding
   */
  addComment(findingId, comment) {
    if (!comment.text) {
      throw new Error('Comment text is required');
    }

    const finding = this.getFinding(findingId);

    const newComment = {
      id: `comment-${uuidv4()}`,
      text: comment.text,
      user: comment.user || this.config.creator || 'Unknown',
      timestamp: new Date().toISOString(),
      private: comment.private || false,
    };

    finding.comments = finding.comments || [];
    finding.comments.push(newComment);

    // Add to history
    finding.history.push({
      action: 'comment_added',
      commentId: newComment.id,
      timestamp: newComment.timestamp,
      user: newComment.user,
    });

    // Save updated finding
    const findingPath = path.join(this.config.findingsDir, `${findingId}.json`);

    if (this.config.encryptFindings) {
      this._encryptAndSaveFinding(finding, findingPath);
    } else {
      fs.writeJsonSync(findingPath, finding, { spaces: 2 });
    }

    return finding;
  }

  /**
   * Review a finding
   * @param {string} findingId - Finding ID
   * @param {Object} review - Review details
   * @returns {Object} Updated finding
   */
  reviewFinding(findingId, review) {
    const finding = this.getFinding(findingId);

    const reviewer = review.reviewer || this.config.creator || 'Unknown';

    // Check if this reviewer has already reviewed
    const existingReviewIndex = finding.reviewers.findIndex(r => r.user === reviewer);

    const reviewData = {
      user: reviewer,
      approved: review.approved,
      timestamp: new Date().toISOString(),
      comments: review.comments || '',
    };

    if (existingReviewIndex >= 0) {
      // Update existing review
      finding.reviewers[existingReviewIndex] = reviewData;
    } else {
      // Add new review
      finding.reviewers.push(reviewData);
    }

    // Add to history
    finding.history.push({
      action: review.approved ? 'approved' : 'rejected',
      timestamp: reviewData.timestamp,
      user: reviewer,
      comments: review.comments,
    });

    // Check if review status should change
    if (this.config.requireApproval) {
      const approvals = finding.reviewers.filter(r => r.approved).length;

      if (approvals >= this.config.minReviewers && finding.status === FINDING_STATUS.IN_REVIEW) {
        finding.status = FINDING_STATUS.CONFIRMED;

        finding.history.push({
          action: 'status_changed',
          from: FINDING_STATUS.IN_REVIEW,
          to: FINDING_STATUS.CONFIRMED,
          timestamp: new Date().toISOString(),
          user: 'SYSTEM',
          reason: `Received ${approvals} approvals (minimum: ${this.config.minReviewers})`,
        });
      }
    }

    // Save updated finding
    const findingPath = path.join(this.config.findingsDir, `${findingId}.json`);

    if (this.config.encryptFindings) {
      this._encryptAndSaveFinding(finding, findingPath);
    } else {
      fs.writeJsonSync(findingPath, finding, { spaces: 2 });
    }

    // Update metadata
    this.metadata.findings[findingId] = {
      ...this.metadata.findings[findingId],
      status: finding.status,
      updated: new Date().toISOString(),
      updatedBy: reviewer,
    };

    this._saveMetadata();

    return finding;
  }

  /**
   * Change the status of a finding
   * @param {string} findingId - Finding ID
   * @param {string} newStatus - New status
   * @param {string} user - User making the change
   * @param {string} reason - Reason for the change
   * @returns {Object} Updated finding
   */
  changeStatus(findingId, newStatus, user, reason = '') {
    if (!Object.values(FINDING_STATUS).includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const finding = this.getFinding(findingId);
    const oldStatus = finding.status;

    if (oldStatus === newStatus) {
      return finding; // No change needed
    }

    finding.status = newStatus;
    finding.updated = new Date().toISOString();
    finding.updatedBy = user || this.config.creator || 'Unknown';

    // Add to history
    finding.history.push({
      action: 'status_changed',
      from: oldStatus,
      to: newStatus,
      timestamp: finding.updated,
      user: finding.updatedBy,
      reason,
    });

    // Save updated finding
    const findingPath = path.join(this.config.findingsDir, `${findingId}.json`);

    if (this.config.encryptFindings) {
      this._encryptAndSaveFinding(finding, findingPath);
    } else {
      fs.writeJsonSync(findingPath, finding, { spaces: 2 });
    }

    // Update metadata
    this.metadata.findings[findingId] = {
      ...this.metadata.findings[findingId],
      status: finding.status,
      updated: finding.updated,
      updatedBy: finding.updatedBy,
    };

    this._saveMetadata();

    return finding;
  }

  /**
   * List all findings with optional filtering
   * @param {Object} filters - Optional filters
   * @returns {Array} Filtered findings
   */
  listFindings(filters = {}) {
    const findings = [];

    // Get all finding IDs from metadata
    const findingIds = Object.keys(this.metadata.findings);

    for (const id of findingIds) {
      try {
        const finding = this.getFinding(id);

        // Apply filters
        let include = true;

        if (filters.status && finding.status !== filters.status) {
          include = false;
        }

        if (filters.severity && finding.severity !== filters.severity) {
          include = false;
        }

        if (filters.createdBy && finding.createdBy !== filters.createdBy) {
          include = false;
        }

        if (filters.vulnerabilityType && finding.vulnerabilityType !== filters.vulnerabilityType) {
          include = false;
        }

        if (include) {
          findings.push(finding);
        }
      } catch (error) {
        console.error(`Error loading finding ${id}:`, error);
      }
    }

    // Sort by severity and then date
    findings.sort((a, b) => {
      const severityOrder = {
        [SEVERITY_LEVELS.CRITICAL]: 0,
        [SEVERITY_LEVELS.HIGH]: 1,
        [SEVERITY_LEVELS.MEDIUM]: 2,
        [SEVERITY_LEVELS.LOW]: 3,
        [SEVERITY_LEVELS.INFORMATIONAL]: 4,
      };

      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }

      return new Date(b.created) - new Date(a.created);
    });

    return findings;
  }

  /**
   * Generate a security report from findings
   * @param {Object} options - Report options
   * @returns {Object} Generated report
   */
  generateReport(options = {}) {
    // Generate unique ID for report
    const reportId = options.id || `REPORT-${uuidv4()}`;

    // Get findings to include in report
    let findings;

    if (options.findingIds) {
      // Include only specified findings
      findings = options.findingIds.map(id => this.getFinding(id));
    } else {
      // Include all findings matching status filter
      const statusFilter = options.statusFilter || [FINDING_STATUS.CONFIRMED, FINDING_STATUS.FIXED];

      findings = this.listFindings({
        status: Array.isArray(statusFilter) ? undefined : statusFilter,
      }).filter(finding => {
        return Array.isArray(statusFilter) ? statusFilter.includes(finding.status) : true;
      });
    }

    // Create report object
    const report = {
      id: reportId,
      title: options.title || `Security Report - ${new Date().toISOString().split('T')[0]}`,
      introduction:
        options.introduction ||
        'This report contains security findings identified during the security review.',
      executive_summary: options.executive_summary || this._generateExecutiveSummary(findings),
      methodology:
        options.methodology ||
        'The security review was conducted using a combination of manual code review and automated analysis tools.',
      scope: options.scope || {
        in_scope: ['Smart contracts', 'Web3 interfaces'],
        out_of_scope: ['Centralized infrastructure', 'Client applications'],
      },
      findings: findings.map(finding => ({
        id: finding.id,
        title: finding.title,
        severity: finding.severity,
        status: finding.status,
        description: finding.description,
        impact: finding.impact,
        recommendation: finding.recommendation,
        affected_components: finding.affectedComponents,
      })),
      conclusion: options.conclusion || this._generateConclusion(findings),
      created: new Date().toISOString(),
      createdBy: options.createdBy || this.config.creator || 'Unknown',
      version: options.version || '1.0',
      confidentiality: options.confidentiality || 'Confidential',
    };

    // Save report to file
    const reportPath = path.join(this.config.reportsDir, `${reportId}.json`);
    fs.writeJsonSync(reportPath, report, { spaces: 2 });

    // Update metadata
    this.metadata.reports[reportId] = {
      id: reportId,
      title: report.title,
      created: report.created,
      createdBy: report.createdBy,
      version: report.version,
      findingCount: report.findings.length,
    };

    this._saveMetadata();

    return report;
  }

  /**
   * Generate an executive summary from findings
   * @param {Array} findings - Findings to summarize
   * @returns {string} Executive summary
   * @private
   */
  _generateExecutiveSummary(findings) {
    // Count findings by severity
    const severityCounts = findings.reduce((counts, finding) => {
      counts[finding.severity] = (counts[finding.severity] || 0) + 1;
      return counts;
    }, {});

    // Generate summary
    let summary = `This security review identified ${findings.length} findings in total:\n\n`;

    for (const severity of Object.values(SEVERITY_LEVELS)) {
      if (severityCounts[severity]) {
        summary += `- ${severityCounts[severity]} ${severity.toUpperCase()} severity issue${severityCounts[severity] > 1 ? 's' : ''}\n`;
      }
    }

    // Add risk assessment
    if (severityCounts[SEVERITY_LEVELS.CRITICAL] || severityCounts[SEVERITY_LEVELS.HIGH] > 2) {
      summary += '\nOverall risk assessment: HIGH RISK';
    } else if (severityCounts[SEVERITY_LEVELS.HIGH] || severityCounts[SEVERITY_LEVELS.MEDIUM] > 3) {
      summary += '\nOverall risk assessment: MEDIUM RISK';
    } else {
      summary += '\nOverall risk assessment: LOW RISK';
    }

    return summary;
  }

  /**
   * Generate a conclusion from findings
   * @param {Array} findings - Findings to conclude
   * @returns {string} Conclusion
   * @private
   */
  _generateConclusion(findings) {
    // Count fixed vs open issues
    const fixedCount = findings.filter(f => f.status === FINDING_STATUS.FIXED).length;
    const openCount = findings.length - fixedCount;

    let conclusion = `Of the ${findings.length} identified issues, ${fixedCount} have been fixed and ${openCount} remain open.\n\n`;

    if (openCount > 0) {
      conclusion +=
        'It is recommended to address all outstanding issues before deploying to production.';
    } else {
      conclusion +=
        'All identified issues have been addressed. Regular security monitoring is recommended as the project evolves.';
    }

    return conclusion;
  }

  /**
   * Export workflow data for external sharing
   * @param {Object} options - Export options
   * @returns {Object} Exported data
   */
  exportWorkflow(options = {}) {
    const exportData = {
      project: this.metadata.project,
      creator: this.metadata.creator,
      created: this.metadata.created,
      exported: new Date().toISOString(),
      exportedBy: options.exportedBy || this.config.creator || 'Unknown',
      findings: [],
      reports: [],
    };

    // Export findings
    if (options.includeFindings !== false) {
      const findingIds = options.findingIds || Object.keys(this.metadata.findings);

      for (const id of findingIds) {
        try {
          const finding = this.getFinding(id);

          // Optionally filter out private comments
          if (options.includePrivateComments === false) {
            finding.comments = finding.comments.filter(c => !c.private);
          }

          exportData.findings.push(finding);
        } catch (error) {
          console.error(`Error exporting finding ${id}:`, error);
        }
      }
    }

    // Export reports
    if (options.includeReports !== false) {
      const reportIds = options.reportIds || Object.keys(this.metadata.reports);

      for (const id of reportIds) {
        try {
          const reportPath = path.join(this.config.reportsDir, `${id}.json`);
          const report = fs.readJsonSync(reportPath);
          exportData.reports.push(report);
        } catch (error) {
          console.error(`Error exporting report ${id}:`, error);
        }
      }
    }

    // Save export file if requested
    if (options.exportPath) {
      fs.writeJsonSync(options.exportPath, exportData, { spaces: 2 });
    }

    return exportData;
  }

  /**
   * Import workflow data from external source
   * @param {Object} importData - Data to import
   * @param {Object} options - Import options
   * @returns {Object} Import results
   */
  importWorkflow(importData, options = {}) {
    const results = {
      imported: {
        findings: [],
        reports: [],
      },
      errors: [],
    };

    // Import findings
    if (importData.findings && Array.isArray(importData.findings)) {
      for (const finding of importData.findings) {
        try {
          // Check if finding already exists
          const existingFinding = this.metadata.findings[finding.id];

          if (existingFinding && !options.overwrite) {
            results.errors.push(`Finding ${finding.id} already exists and overwrite not enabled`);
            continue;
          }

          // Create or update finding
          if (existingFinding) {
            this.updateFinding(finding.id, finding, options.importedBy || 'IMPORT');
            results.imported.findings.push(finding.id);
          } else {
            const newFinding = this.createFinding({
              ...finding,
              createdBy: finding.createdBy || options.importedBy || 'IMPORT',
            });
            results.imported.findings.push(newFinding.id);
          }
        } catch (error) {
          results.errors.push(`Error importing finding ${finding.id}: ${error.message}`);
        }
      }
    }

    // Import reports
    if (importData.reports && Array.isArray(importData.reports)) {
      for (const report of importData.reports) {
        try {
          // Check if report already exists
          const existingReport = this.metadata.reports[report.id];

          if (existingReport && !options.overwrite) {
            results.errors.push(`Report ${report.id} already exists and overwrite not enabled`);
            continue;
          }

          // Save report
          const reportPath = path.join(this.config.reportsDir, `${report.id}.json`);
          fs.writeJsonSync(reportPath, report, { spaces: 2 });

          // Update metadata
          this.metadata.reports[report.id] = {
            id: report.id,
            title: report.title,
            created: report.created,
            createdBy: report.createdBy,
            version: report.version,
            findingCount: report.findings.length,
            imported: new Date().toISOString(),
            importedBy: options.importedBy || 'IMPORT',
          };

          results.imported.reports.push(report.id);
        } catch (error) {
          results.errors.push(`Error importing report ${report.id}: ${error.message}`);
        }
      }
    }

    // Save metadata
    this._saveMetadata();

    return results;
  }
}

module.exports = {
  SecurityResearchWorkflow,
  SEVERITY_LEVELS,
  FINDING_STATUS,
};
