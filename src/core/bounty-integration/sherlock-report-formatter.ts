/**
 * Sherlock Audit Report Formatter
 *
 * This module formats security testing results for submission to Sherlock audit contests.
 * It follows Sherlock's submission guidelines and creates standardized report files.
 */

import fs from 'fs';
import path from 'path';

interface VulnerabilityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'informational';
  category: string;
  impact: string;
  steps?: string[];
  code?: string;
  affected_files?: string[];
  proof_of_concept?: string;
  recommendation?: string;
  network?: string; // Added network field
  layer?: 'l1' | 'l2'; // Added layer field
}

interface TestResult {
  securityIssues: VulnerabilityIssue[];
  metadata: {
    protocol: string;
    timestamp: string;
    version: string;
    tester: string;
    network?: string;
    layer?: 'l1' | 'l2';
  };
}

interface SherlockSubmission {
  title: string;
  severity: string;
  description: string;
  impact: string;
  vulnerability_detail: string;
  mitigation: string;
  markdown: string;
  network?: string;
  l2_specific?: boolean;
}

/**
 * Sherlock severity ratings
 */
enum SherlockSeverity {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  INFORMATIONAL = 'Informational',
}

/**
 * Supported L2 networks
 */
enum L2Networks {
  ZKSYNC_ERA = 'zksync_era',
  LINEA = 'linea',
  POLYGON_ZKEVM = 'polygon_zkevm',
  OPTIMISM = 'optimism',
  ARBITRUM = 'arbitrum',
  BASE = 'base',
}

/**
 * Sherlock Audit Report Formatter class
 */
export class SherlockReportFormatter {
  private outputDir: string;
  private testResults: TestResult | null = null;
  private contestName: string;
  private judging: boolean;

  constructor(
    contestName: string = 'sherlock-contest',
    outputDir: string = './test-results/sherlock-submissions',
    judging: boolean = false
  ) {
    this.contestName = contestName;
    this.outputDir = outputDir;
    this.judging = judging; // Set to true to use the judging format

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Load test results from a JSON file
   */
  loadTestResults(filePath: string): boolean {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      this.testResults = JSON.parse(data);
      return true;
    } catch (error) {
      console.error(`Error loading test results from ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Set test results directly from an object
   */
  setTestResults(results: TestResult): void {
    this.testResults = results;
  }

  /**
   * Check if a network is an L2
   */
  private isL2Network(network: string): boolean {
    const l2Networks = Object.values(L2Networks);
    return l2Networks.some(l2 => network.toLowerCase().includes(l2));
  }

  /**
   * Get L2-specific information for a network
   */
  private getL2Info(network: string): { name: string; description: string } {
    const networkLower = network.toLowerCase();

    if (networkLower.includes(L2Networks.ZKSYNC_ERA)) {
      return {
        name: 'zkSync Era',
        description:
          'This vulnerability specifically affects zkSync Era and involves zkSync-specific account abstraction or validity proof mechanisms.',
      };
    } else if (networkLower.includes(L2Networks.LINEA)) {
      return {
        name: 'Linea',
        description:
          'This vulnerability specifically affects Linea and may involve Linea-specific state proof verification or messaging protocol.',
      };
    } else if (networkLower.includes(L2Networks.POLYGON_ZKEVM)) {
      return {
        name: 'Polygon zkEVM',
        description:
          'This vulnerability specifically affects Polygon zkEVM and may involve zkEVM-specific proof generation or validation mechanism.',
      };
    } else if (networkLower.includes(L2Networks.OPTIMISM)) {
      return {
        name: 'Optimism',
        description:
          'This vulnerability specifically affects Optimism and involves fault proof or message passing mechanisms.',
      };
    } else if (networkLower.includes(L2Networks.ARBITRUM)) {
      return {
        name: 'Arbitrum',
        description:
          'This vulnerability specifically affects Arbitrum and involves challenge protocol or ArbOS-specific mechanisms.',
      };
    } else if (networkLower.includes(L2Networks.BASE)) {
      return {
        name: 'Base',
        description:
          'This vulnerability specifically affects Base and involves Base-specific mechanisms.',
      };
    } else {
      return {
        name: 'Unknown L2',
        description:
          'This vulnerability affects an L2 network and may involve layer-specific mechanisms.',
      };
    }
  }

  /**
   * Map Audityzer severity to Sherlock severity
   */
  private mapSeverity(severity: string): string {
    const severityMap: Record<string, string> = {
      critical: SherlockSeverity.HIGH,
      high: SherlockSeverity.HIGH,
      medium: SherlockSeverity.MEDIUM,
      low: SherlockSeverity.LOW,
      informational: SherlockSeverity.INFORMATIONAL,
    };

    return severityMap[severity.toLowerCase()] || SherlockSeverity.MEDIUM;
  }

  /**
   * Generate Sherlock submission for a vulnerability
   */
  generateSubmission(issue: VulnerabilityIssue): SherlockSubmission {
    if (!this.testResults?.metadata) {
      throw new Error('Test results metadata is missing');
    }

    // Format vulnerability details
    let vulnerabilityDetail = '';
    vulnerabilityDetail += `${issue.description}\n\n`;

    // Add L2-specific information if applicable
    const network = issue.network || this.testResults.metadata.network;
    const isL2: boolean = !!(
      issue.layer === 'l2' ||
      this.testResults.metadata.layer === 'l2' ||
      (network && this.isL2Network(network))
    );

    if (isL2 && network) {
      const l2Info = this.getL2Info(network);
      vulnerabilityDetail += `**L2-Specific Information (${l2Info.name}):**\n${l2Info.description}\n\n`;
    }

    if (issue.affected_files && issue.affected_files.length > 0) {
      vulnerabilityDetail += '**Affected code:**\n\n';
      issue.affected_files.forEach(file => {
        vulnerabilityDetail += `\`${file}\`\n`;
      });
      vulnerabilityDetail += '\n';
    }

    if (issue.code) {
      vulnerabilityDetail += '**Vulnerable code:**\n\n';
      vulnerabilityDetail += '```solidity\n' + issue.code + '\n```\n\n';
    }

    if (issue.proof_of_concept) {
      vulnerabilityDetail += '**Proof of Concept:**\n\n';
      vulnerabilityDetail += '```solidity\n' + issue.proof_of_concept + '\n```\n\n';
    } else if (issue.steps && issue.steps.length > 0) {
      vulnerabilityDetail += '**Steps to reproduce:**\n\n';
      issue.steps.forEach((step, index) => {
        vulnerabilityDetail += `${index + 1}. ${step}\n`;
      });
      vulnerabilityDetail += '\n';
    }

    // Format for Sherlock's preferred submission style
    let markdown;
    if (this.judging) {
      // Judging format
      markdown = `# ${issue.title}

## Summary
${issue.description}

## Vulnerability Detail
${vulnerabilityDetail}

## Impact
${issue.impact}

## Code Snippet
\`\`\`solidity
${issue.code || 'No specific code snippet provided'}
\`\`\`

## Tool used
Audityzer automatic security testing

## Recommendation
${issue.recommendation || 'Consider implementing proper validation and access controls to address this vulnerability.'}
`;
    } else {
      // Standard format
      markdown = `## Title
${issue.title}

## Severity
${this.mapSeverity(issue.severity)}

## Description
${issue.description}

## Impact
${issue.impact}

## Vulnerability Detail
${vulnerabilityDetail}

## Mitigation
${issue.recommendation || 'Consider implementing proper validation and access controls to address this vulnerability.'}

---
*Generated by Audityzer Security Testing Toolkit*
*Protocol: ${this.testResults.metadata.protocol}*
*Test Execution: ${this.testResults.metadata.timestamp}*
`;
    }

    // Create submission object with proper types
    const submission: SherlockSubmission = {
      title: issue.title,
      severity: this.mapSeverity(issue.severity),
      description: issue.description,
      impact: issue.impact,
      vulnerability_detail: vulnerabilityDetail,
      mitigation: issue.recommendation || '',
      markdown,
    };

    // Only add network and l2_specific if they exist
    if (network) {
      submission.network = network;
    }

    submission.l2_specific = isL2;

    return submission;
  }

  /**
   * Generate submissions for all vulnerabilities in test results
   */
  generateSubmissions(): SherlockSubmission[] {
    if (!this.testResults) {
      throw new Error('No test results loaded');
    }

    const submissions: SherlockSubmission[] = [];

    // Generate a submission for each security issue
    for (const issue of this.testResults.securityIssues) {
      const submission = this.generateSubmission(issue);
      submissions.push(submission);
    }

    return submissions;
  }

  /**
   * Save submissions to files
   */
  saveSubmissions(submissions: SherlockSubmission[]): string[] {
    const savedFiles: string[] = [];

    // Create contest directory
    const contestDir = path.join(this.outputDir, this.contestName);
    if (!fs.existsSync(contestDir)) {
      fs.mkdirSync(contestDir, { recursive: true });
    }

    // Group submissions by severity
    const grouped: Record<string, SherlockSubmission[]> = {
      [SherlockSeverity.HIGH]: [],
      [SherlockSeverity.MEDIUM]: [],
      [SherlockSeverity.LOW]: [],
      [SherlockSeverity.INFORMATIONAL]: [],
    };

    submissions.forEach(submission => {
      if (grouped[submission.severity]) {
        grouped[submission.severity].push(submission);
      } else {
        grouped[SherlockSeverity.MEDIUM].push(submission);
      }
    });

    // For judging format, save each issue as a separate file
    if (this.judging) {
      let issueCounter = 1;

      // Start with high severity issues
      for (const severity of Object.keys(grouped)) {
        const issues = grouped[severity];

        issues.forEach(submission => {
          const sanitizedTitle = submission.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

          const fileName = `${this.formatNumber(issueCounter)}-${sanitizedTitle}.md`;
          const filePath = path.join(contestDir, fileName);

          fs.writeFileSync(filePath, submission.markdown);
          savedFiles.push(filePath);

          console.log(`Saved Sherlock issue #${issueCounter} to ${filePath}`);
          issueCounter++;
        });
      }
    } else {
      // Standard format - one file per severity
      for (const severity of Object.keys(grouped)) {
        const issues = grouped[severity];

        if (issues.length > 0) {
          const severityContent = issues.map(s => s.markdown).join('\n\n---\n\n');

          const fileName = `${severity.toLowerCase()}.md`;
          const filePath = path.join(contestDir, fileName);

          fs.writeFileSync(filePath, severityContent);
          savedFiles.push(filePath);

          console.log(`Saved ${issues.length} ${severity} issues to ${filePath}`);
        }
      }
    }

    // Create a README with summary
    const readmePath = path.join(contestDir, 'README.md');
    fs.writeFileSync(readmePath, this.generateSummary(submissions));
    savedFiles.push(readmePath);

    return savedFiles;
  }

  /**
   * Format issue number for filenames
   */
  private formatNumber(num: number): string {
    return num.toString().padStart(3, '0');
  }

  /**
   * Generate a summary of all vulnerabilities
   */
  private generateSummary(submissions: SherlockSubmission[]): string {
    if (!this.testResults) {
      return '';
    }

    // Count issues by severity
    const severityCounts: Record<string, number> = {
      [SherlockSeverity.HIGH]: 0,
      [SherlockSeverity.MEDIUM]: 0,
      [SherlockSeverity.LOW]: 0,
      [SherlockSeverity.INFORMATIONAL]: 0,
    };

    submissions.forEach(submission => {
      severityCounts[submission.severity] = (severityCounts[submission.severity] || 0) + 1;
    });

    // Generate summary markdown
    let summary = '# Sherlock Audit Report\n\n';
    summary += `## ${this.contestName}\n\n`;
    summary += `Protocol: ${this.testResults.metadata.protocol}\n`;
    summary += `Generated: ${new Date().toISOString()}\n\n`;
    summary += '## Summary\n\n';
    summary += '| Severity | Issues Found |\n';
    summary += '|----------|-------------|\n';
    summary += `| High     | ${severityCounts[SherlockSeverity.HIGH]} |\n`;
    summary += `| Medium   | ${severityCounts[SherlockSeverity.MEDIUM]} |\n`;
    summary += `| Low      | ${severityCounts[SherlockSeverity.LOW]} |\n`;
    summary += `| Informational | ${severityCounts[SherlockSeverity.INFORMATIONAL]} |\n`;
    summary += `| **Total**    | **${submissions.length}** |\n\n`;

    // Add table of contents for all issues
    summary += '## Issues\n\n';

    if (this.judging) {
      // For judging format, list all issues by number
      let issueCounter = 1;

      for (const severity of Object.keys(severityCounts)) {
        if (severityCounts[severity] > 0) {
          summary += `### ${severity}\n\n`;

          const severityIssues = submissions.filter(s => s.severity === severity);
          severityIssues.forEach(submission => {
            const sanitizedTitle = submission.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');

            summary += `- [${this.formatNumber(issueCounter)} - ${submission.title}](./${this.formatNumber(issueCounter)}-${sanitizedTitle}.md)\n`;
            issueCounter++;
          });

          summary += '\n';
        }
      }
    } else {
      // For standard format, list issues by severity file
      for (const severity of Object.keys(severityCounts)) {
        if (severityCounts[severity] > 0) {
          summary += `- [${severity} Issues (./${severity.toLowerCase()}.md)](${severity.toLowerCase()}.md) - ${severityCounts[severity]} issues\n`;
        }
      }
    }

    summary += '\n---\n*Generated by Audityzer Security Testing Toolkit*\n';

    return summary;
  }

  /**
   * Run the full report generation process
   */
  run(resultsFilePath: string, contestName?: string): string[] {
    if (contestName) {
      this.contestName = contestName;
    }

    console.log(`Generating Sherlock audit report for ${this.contestName}...`);

    // Load test results
    const success = this.loadTestResults(resultsFilePath);
    if (!success) {
      console.error('Failed to generate Sherlock audit report.');
      return [];
    }

    // Generate and save submissions
    const submissions = this.generateSubmissions();
    const savedFiles = this.saveSubmissions(submissions);

    console.log(`Generated Sherlock audit report with ${submissions.length} issues.`);

    return savedFiles;
  }
}
