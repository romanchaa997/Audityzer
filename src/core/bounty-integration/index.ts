/**
 * Bounty Integration Modules
 *
 * This module exports all bounty platform integrations for the Audityzer toolkit.
 */

// Import all bounty integration classes
import { BridgeBountyAdapter } from './bridge-bounty-adapter.js';
import { ImmunefiSubmissionGenerator } from './immunefi-submission-generator.js';
import { Code4renaIntegration } from './code4rena-integration.js';
import { SherlockReportFormatter } from './sherlock-report-formatter.js';

// Export all bounty integration classes
export { BridgeBountyAdapter } from './bridge-bounty-adapter.js';
export { ImmunefiSubmissionGenerator } from './immunefi-submission-generator.js';
export { Code4renaIntegration } from './code4rena-integration.js';
export { SherlockReportFormatter } from './sherlock-report-formatter.js';

// Common interfaces
export interface VulnerabilityIssue {
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
}

export interface TestResult {
  securityIssues: VulnerabilityIssue[];
  metadata: {
    protocol: string;
    timestamp: string;
    version: string;
    tester: string;
  };
}

/**
 * Factory function to create the appropriate bounty platform submission generator
 * based on the platform name
 */
export function createBountySubmissionGenerator(
  platform: 'immunefi' | 'code4rena' | 'sherlock' | 'bridge',
  options: any = {}
) {
  switch (platform) {
    case 'immunefi':
      return new ImmunefiSubmissionGenerator(options.outputDir);

    case 'code4rena':
      return new Code4renaIntegration(options.contestId, options.outputDir);

    case 'sherlock':
      return new SherlockReportFormatter(
        options.contestName,
        options.outputDir,
        options.judging || false
      );

    case 'bridge':
      return new BridgeBountyAdapter(options.outputDir);

    default:
      throw new Error(`Unsupported bounty platform: ${platform}`);
  }
}
