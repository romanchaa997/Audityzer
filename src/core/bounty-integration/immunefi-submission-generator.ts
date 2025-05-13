/**
 * Immunefi Submission Generator
 *
 * This module generates submission templates for the Immunefi bug bounty platform
 * based on vulnerabilities detected by the Web3FuzzForge toolkit.
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { marked } from 'marked';
import { execSync } from 'child_process';

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
}

interface TestResult {
  securityIssues: VulnerabilityIssue[];
  metadata: {
    protocol: string;
    timestamp: string;
    version: string;
    tester: string;
  };
}

interface ImmunefiSubmission {
  projectSlug: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  vulnerabilityType: string;
  testEnvironment?: {
    type: 'testnet' | 'mainnet' | 'local';
    network?: string;
    contractAddresses?: string[];
  };
  proofOfConcept?: string;
  impact: string;
  attackScenario?: string;
  remediationSteps?: string;
  metadata?: Record<string, any>;
  attachments?: string[];
}

interface VulnerabilityFinding {
  id?: string;
  testName: string;
  component: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  type?: string;
  impact?: string;
  details?: Record<string, any>;
  steps?: Array<{ description: string }>;
  recommendation?: string;
  contractAddresses?: string[];
  network?: string;
  cwe?: string;
  testScripts?: string[];
  testEnvironment?: {
    type: 'testnet' | 'mainnet' | 'local';
    network?: string;
  };
}

/**
 * Immunefi Submission Generator
 * Automatically generates and submits security vulnerabilities to the Immunefi platform
 */
export class ImmunefiSubmissionGenerator {
  private apiKey: string;
  private baseUrl: string;
  private defaultProjectSlug: string;
  private templateDir: string;
  private outputDir: string;
  private writeFileAsync = promisify(fs.writeFile);
  private readFileAsync = promisify(fs.readFile);

  constructor(options: {
    apiKey?: string;
    baseUrl?: string;
    defaultProjectSlug?: string;
    templateDir?: string;
    outputDir?: string;
  }) {
    this.apiKey = options.apiKey || process.env.IMMUNEFI_API_KEY || '';
    this.baseUrl = options.baseUrl || 'https://api.immunefi.com/v1';
    this.defaultProjectSlug = options.defaultProjectSlug || '';
    this.templateDir = options.templateDir || path.join(__dirname, '../../templates/bounty');
    this.outputDir = options.outputDir || path.join(process.cwd(), 'reports/submissions');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Convert a vulnerability finding to an Immunefi submission
   * 
   * @param finding The vulnerability finding
   * @param options Additional options for the submission
   * @returns The formatted Immunefi submission
   */
  public formatSubmission(
    finding: VulnerabilityFinding,
    options: {
      projectSlug?: string;
      includeSteps?: boolean;
      includePOC?: boolean;
    } = {}
  ): ImmunefiSubmission {
    const projectSlug = options.projectSlug || this.defaultProjectSlug;
    
    if (!projectSlug) {
      throw new Error('Project slug is required for Immunefi submission');
    }
    
    // Generate title from test name and severity
    const title = this._generateTitle(finding);
    
    // Format description in markdown
    const description = this._formatDescription(finding);
    
    // Format impact
    const impact = finding.impact || this._generateImpact(finding);
    
    // Format vulnerability type
    const vulnerabilityType = finding.type || this._determineVulnerabilityType(finding);
    
    // Format proof of concept
    let proofOfConcept: string | undefined;
    if (options.includePOC && finding.testScripts && finding.testScripts.length > 0) {
      proofOfConcept = this._formatProofOfConcept(finding);
    }
    
    // Format remediation steps
    const remediationSteps = finding.recommendation || 
      'No specific remediation steps provided. Consider reviewing the affected component for security issues.';
    
    // Format test environment
    const testEnvironment = finding.testEnvironment || {
      type: 'local' as const,
      network: finding.network || 'ethereum',
      contractAddresses: finding.contractAddresses
    };
    
    // Format attack scenario
    const attackScenario = this._formatAttackScenario(finding);
    
    // Format metadata
    const metadata: Record<string, any> = {
      cwe: finding.cwe || 'Not classified',
      testName: finding.testName,
      component: finding.component,
      ...finding.details
    };
    
    return {
      projectSlug,
      title,
      description,
      severity: finding.severity === 'info' ? 'low' : finding.severity,
      vulnerabilityType,
      testEnvironment,
      proofOfConcept,
      impact,
      attackScenario,
      remediationSteps,
      metadata
    };
  }
  
  /**
   * Generate a submission from a template
   * 
   * @param finding The vulnerability finding
   * @param templateName The name of the template to use
   * @param options Additional options
   * @returns The formatted submission
   */
  public async generateFromTemplate(
    finding: VulnerabilityFinding,
    templateName: string,
    options: {
      projectSlug?: string;
      variables?: Record<string, string>;
    } = {}
  ): Promise<ImmunefiSubmission> {
    const templatePath = path.join(this.templateDir, `${templateName}.md`);
    
    try {
      const templateContent = await this.readFileAsync(templatePath, 'utf-8');
      const renderedTemplate = this._renderTemplate(templateContent, {
        finding,
        ...options.variables
      });
      
      return {
        projectSlug: options.projectSlug || this.defaultProjectSlug,
        title: this._generateTitle(finding),
        description: renderedTemplate,
        severity: finding.severity === 'info' ? 'low' : finding.severity,
        vulnerabilityType: finding.type || this._determineVulnerabilityType(finding),
        impact: finding.impact || this._generateImpact(finding),
        remediationSteps: finding.recommendation || ''
      };
    } catch (error) {
      console.error(`Error generating from template: ${error.message}`);
      // Fall back to standard format
      return this.formatSubmission(finding, { projectSlug: options.projectSlug });
    }
  }
  
  /**
   * Submit a vulnerability to Immunefi
   * 
   * @param submission The formatted submission
   * @returns The response from the Immunefi API
   */
  public async submitToImmunefi(submission: ImmunefiSubmission): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Immunefi API key is required for submission');
    }
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/submissions`,
        submission,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error submitting to Immunefi:');
      if (error.response) {
        console.error(`Status: ${error.response.status}`);
        console.error(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
  
  /**
   * Save a submission to a file
   * 
   * @param submission The formatted submission
   * @param options File output options
   * @returns The path to the saved file
   */
  public async saveSubmission(
    submission: ImmunefiSubmission,
    options: {
      format?: 'json' | 'markdown';
      filename?: string;
    } = {}
  ): Promise<string> {
    const format = options.format || 'json';
    const filename = options.filename || 
      `immunefi-submission-${submission.projectSlug}-${Date.now()}.${format === 'json' ? 'json' : 'md'}`;
    const outputPath = path.join(this.outputDir, filename);
    
    try {
      if (format === 'json') {
        await this.writeFileAsync(outputPath, JSON.stringify(submission, null, 2));
      } else {
        // Format as markdown
        const markdown = this._submissionToMarkdown(submission);
        await this.writeFileAsync(outputPath, markdown);
      }
      
      console.log(`Submission saved to: ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error(`Error saving submission: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Process a batch of findings and generate submissions
   * 
   * @param findings Array of vulnerability findings
   * @param options Processing options
   * @returns Array of processed submissions
   */
  public async processBatch(
    findings: VulnerabilityFinding[],
    options: {
      projectSlug?: string;
      autoSubmit?: boolean;
      saveFiles?: boolean;
      templateName?: string;
      variablesByFinding?: Record<string, Record<string, string>>;
      minSeverity?: 'critical' | 'high' | 'medium' | 'low' | 'info';
    } = {}
  ): Promise<Array<{ finding: VulnerabilityFinding; submission: ImmunefiSubmission; response?: any }>> {
    const results: Array<{ finding: VulnerabilityFinding; submission: ImmunefiSubmission; response?: any }> = [];
    const projectSlug = options.projectSlug || this.defaultProjectSlug;
    const minSeverity = options.minSeverity || 'low';
    
    // Create a map of severity levels for filtering
    const severityLevels = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
      info: 0
    };
    
    const minSeverityLevel = severityLevels[minSeverity];
    
    // Filter findings by severity
    const filteredFindings = findings.filter(finding => 
      severityLevels[finding.severity] >= minSeverityLevel
    );
    
    console.log(`Processing ${filteredFindings.length} findings (from ${findings.length} total)`);
    
    for (const finding of filteredFindings) {
      try {
        // Generate submission
        let submission: ImmunefiSubmission;
        
        if (options.templateName) {
          // Get variables for this finding
          const variables = options.variablesByFinding?.[finding.id || finding.testName] || {};
          
          submission = await this.generateFromTemplate(finding, options.templateName, {
            projectSlug,
            variables
          });
        } else {
          submission = this.formatSubmission(finding, { projectSlug });
        }
        
        // Save submission to file if requested
        if (options.saveFiles) {
          const filename = `${finding.testName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}`;
          await this.saveSubmission(submission, { filename });
        }
        
        // Submit to Immunefi if requested
        let response: any;
        if (options.autoSubmit) {
          response = await this.submitToImmunefi(submission);
          console.log(`Submitted finding "${finding.testName}" to Immunefi`);
        }
        
        results.push({ finding, submission, response });
      } catch (error) {
        console.error(`Error processing finding "${finding.testName}": ${error.message}`);
      }
    }
    
    return results;
  }
  
  /**
   * Connect a local test script to the vulnerability finding to provide proof of concept
   * 
   * @param finding The vulnerability finding
   * @param scriptPath Path to the test script
   * @returns Updated finding with test script included
   */
  public async attachTestScript(
    finding: VulnerabilityFinding,
    scriptPath: string
  ): Promise<VulnerabilityFinding> {
    try {
      if (!fs.existsSync(scriptPath)) {
        throw new Error(`Test script not found: ${scriptPath}`);
      }
      
      const scriptContent = await this.readFileAsync(scriptPath, 'utf-8');
      
      // Update finding with test script
      return {
        ...finding,
        testScripts: [...(finding.testScripts || []), scriptPath],
        details: {
          ...finding.details,
          testScriptContent: scriptContent
        }
      };
    } catch (error) {
      console.error(`Error attaching test script: ${error.message}`);
      return finding;
    }
  }
  
  /**
   * Analyze and enhance a vulnerability finding with metadata
   * 
   * @param finding The vulnerability finding
   * @returns Enhanced finding with additional metadata
   */
  public async analyzeFinding(finding: VulnerabilityFinding): Promise<VulnerabilityFinding> {
    // Determine CWE if not provided
    if (!finding.cwe) {
      finding.cwe = this._determineCWE(finding);
    }
    
    // Enhance description with more details if needed
    if (finding.description.length < 100) {
      finding.description = this._enhanceDescription(finding);
    }
    
    // Add vulnerability classification
    const enhancedDetails = {
      ...finding.details,
      classification: this._classifyVulnerability(finding),
      estimatedBounty: this._estimateBounty(finding)
    };
    
    return {
      ...finding,
      details: enhancedDetails
    };
  }
  
  // Private helper methods
  
  private _generateTitle(finding: VulnerabilityFinding): string {
    // Format: "[SEVERITY] Issue in COMPONENT: Brief description"
    const severityPrefix = finding.severity.toUpperCase();
    const component = finding.component || 'Unknown component';
    
    // Extract a brief description (first sentence or first 50 chars)
    let briefDescription = finding.description.split('.')[0];
    if (briefDescription.length > 50) {
      briefDescription = briefDescription.substring(0, 47) + '...';
    }
    
    return `[${severityPrefix}] Issue in ${component}: ${briefDescription}`;
  }
  
  private _formatDescription(finding: VulnerabilityFinding): string {
    // Format description in markdown
    let markdown = `## Vulnerability Description\n\n${finding.description}\n\n`;
    
    // Add vulnerability details
    if (finding.details && Object.keys(finding.details).length > 0) {
      markdown += '## Additional Details\n\n';
      
      for (const [key, value] of Object.entries(finding.details)) {
        if (typeof value === 'string') {
          markdown += `**${key}**: ${value}\n\n`;
        } else if (value !== null && typeof value === 'object') {
          markdown += `**${key}**:\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\`\n\n`;
        }
      }
    }
    
    // Add reproduction steps
    if (finding.steps && finding.steps.length > 0) {
      markdown += '## Reproduction Steps\n\n';
      
      finding.steps.forEach((step, index) => {
        markdown += `${index + 1}. ${step.description}\n`;
      });
      
      markdown += '\n';
    }
    
    return markdown;
  }
  
  private _generateImpact(finding: VulnerabilityFinding): string {
    // Generate impact based on severity and vulnerability type
    const severityImpacts = {
      critical: 'This vulnerability can lead to complete system compromise, including theft of funds, unauthorized access to sensitive data, or permanent denial of service.',
      high: 'This vulnerability can result in significant financial loss, exposure of sensitive user data, or severe disruption of system functionality.',
      medium: 'This vulnerability may lead to limited information disclosure, moderate financial impact, or temporary denial of service conditions.',
      low: 'This vulnerability presents minimal risk but should be addressed as part of security best practices.',
      info: 'This finding represents an informational note about potential security improvements.'
    };
    
    return finding.severity in severityImpacts ? 
      severityImpacts[finding.severity] : 
      'The impact of this vulnerability depends on the specific exploitation context.';
  }
  
  private _determineVulnerabilityType(finding: VulnerabilityFinding): string {
    // Try to determine vulnerability type from description and details
    const description = finding.description.toLowerCase();
    const testName = finding.testName.toLowerCase();
    
    if (description.includes('reentrancy') || testName.includes('reentrancy')) {
      return 'Smart Contract: Reentrancy';
    } else if (description.includes('overflow') || description.includes('underflow') || 
               testName.includes('overflow') || testName.includes('underflow')) {
      return 'Smart Contract: Integer Overflow/Underflow';
    } else if (description.includes('access control') || testName.includes('access control') ||
               description.includes('permission') || testName.includes('permission')) {
      return 'Smart Contract: Access Control';
    } else if (description.includes('flash loan') || testName.includes('flash loan')) {
      return 'Smart Contract: Flash Loan Attack';
    } else if (description.includes('oracle') || testName.includes('oracle')) {
      return 'Smart Contract: Oracle Manipulation';
    } else if (description.includes('signature') || testName.includes('signature')) {
      return 'Smart Contract: Signature Verification';
    } else if (description.includes('bridge') || testName.includes('bridge')) {
      return 'Smart Contract: Cross-Chain Bridge';
    } else {
      return 'Smart Contract: Logic Error';
    }
  }
  
  private _formatProofOfConcept(finding: VulnerabilityFinding): string {
    let poc = '## Proof of Concept\n\n';
    
    if (finding.testScripts && finding.testScripts.length > 0) {
      finding.testScripts.forEach((scriptPath, index) => {
        try {
          const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
          const extension = path.extname(scriptPath).substring(1);
          
          poc += `### Test Script ${index + 1}: ${path.basename(scriptPath)}\n\n`;
          poc += '```' + extension + '\n';
          poc += scriptContent;
          poc += '\n```\n\n';
          
          // Add execution instructions
          poc += 'To run this test:\n\n';
          
          if (extension === 'js' || extension === 'ts') {
            poc += '```bash\n';
            poc += `node ${scriptPath}\n`;
            poc += '```\n\n';
          } else if (extension === 'sol') {
            poc += '```bash\n';
            poc += 'npx hardhat test\n';
            poc += '```\n\n';
          } else if (extension === 'py') {
            poc += '```bash\n';
            poc += `python ${scriptPath}\n`;
            poc += '```\n\n';
          }
        } catch (error) {
          poc += `Error loading test script: ${error.message}\n\n`;
        }
      });
    } else if (finding.steps && finding.steps.length > 0) {
      poc += 'The vulnerability can be reproduced by following these steps:\n\n';
      
      finding.steps.forEach((step, index) => {
        poc += `${index + 1}. ${step.description}\n`;
      });
      
      poc += '\n';
    } else {
      poc += 'No detailed proof of concept provided. The vulnerability was detected through automated security testing.\n\n';
    }
    
    return poc;
  }
  
  private _formatAttackScenario(finding: VulnerabilityFinding): string | undefined {
    // Generate attack scenario if details are available
    if (finding.details?.attackVector || finding.details?.attackScenario) {
      return finding.details.attackScenario || finding.details.attackVector;
    }
    
    // Generate based on severity and type
    if (finding.severity === 'critical' || finding.severity === 'high') {
      const type = finding.type || this._determineVulnerabilityType(finding);
      
      if (type.includes('Reentrancy')) {
        return 'An attacker can exploit this vulnerability by creating a malicious contract that repeatedly calls back into the vulnerable function before the state is properly updated, draining funds or manipulating contract state.';
      } else if (type.includes('Access Control')) {
        return 'An attacker can bypass access controls to execute privileged functions, potentially leading to unauthorized fund transfers, parameter changes, or other administrative actions.';
      } else if (type.includes('Oracle')) {
        return 'An attacker can manipulate price data feeds to cause the contract to execute transactions at incorrect prices, leading to financial losses.';
      } else if (type.includes('Bridge')) {
        return 'An attacker can exploit weaknesses in the cross-chain bridge to steal locked assets or fabricate false transaction proofs.';
      }
    }
    
    return undefined;
  }
  
  private _renderTemplate(template: string, variables: Record<string, any>): string {
    // Simple template rendering with variable substitution
    return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, varName) => {
      const varPath = varName.trim().split('.');
      let value = variables;
      
      for (const key of varPath) {
        if (value === undefined || value === null) {
          return match; // Keep original if path doesn't exist
        }
        value = value[key];
      }
      
      return value !== undefined && value !== null ? String(value) : match;
    });
  }
  
  private _submissionToMarkdown(submission: ImmunefiSubmission): string {
    let markdown = `# ${submission.title}\n\n`;
    
    markdown += `**Severity:** ${submission.severity.toUpperCase()}\n`;
    markdown += `**Project:** ${submission.projectSlug}\n`;
    markdown += `**Vulnerability Type:** ${submission.vulnerabilityType}\n\n`;
    
    markdown += `## Description\n\n${submission.description}\n\n`;
    
    markdown += `## Impact\n\n${submission.impact}\n\n`;
    
    if (submission.attackScenario) {
      markdown += `## Attack Scenario\n\n${submission.attackScenario}\n\n`;
    }
    
    if (submission.proofOfConcept) {
      markdown += `## Proof of Concept\n\n${submission.proofOfConcept}\n\n`;
    }
    
    if (submission.remediationSteps) {
      markdown += `## Remediation Steps\n\n${submission.remediationSteps}\n\n`;
    }
    
    if (submission.testEnvironment) {
      markdown += `## Test Environment\n\n`;
      markdown += `- Type: ${submission.testEnvironment.type}\n`;
      
      if (submission.testEnvironment.network) {
        markdown += `- Network: ${submission.testEnvironment.network}\n`;
      }
      
      if (submission.testEnvironment.contractAddresses && submission.testEnvironment.contractAddresses.length > 0) {
        markdown += `- Contract Addresses:\n`;
        submission.testEnvironment.contractAddresses.forEach(address => {
          markdown += `  - ${address}\n`;
        });
      }
      
      markdown += '\n';
    }
    
    if (submission.metadata && Object.keys(submission.metadata).length > 0) {
      markdown += `## Metadata\n\n`;
      markdown += '```json\n';
      markdown += JSON.stringify(submission.metadata, null, 2);
      markdown += '\n```\n\n';
    }
    
    return markdown;
  }
  
  private _determineCWE(finding: VulnerabilityFinding): string {
    // Map common vulnerability types to CWE
    const description = finding.description.toLowerCase();
    const testName = finding.testName.toLowerCase();
    const type = finding.type?.toLowerCase() || '';
    
    if (type.includes('reentrancy') || description.includes('reentrancy') || testName.includes('reentrancy')) {
      return 'CWE-841: Improper Enforcement of Behavioral Workflow';
    } else if (type.includes('access control') || description.includes('access control') || testName.includes('access control')) {
      return 'CWE-284: Improper Access Control';
    } else if (type.includes('oracle') || description.includes('oracle') || testName.includes('oracle')) {
      return 'CWE-400: Uncontrolled Resource Consumption';
    } else if (description.includes('overflow') || description.includes('underflow') || 
               testName.includes('overflow') || testName.includes('underflow')) {
      return 'CWE-190: Integer Overflow or Wraparound';
    } else if (description.includes('signature') || testName.includes('signature')) {
      return 'CWE-347: Improper Verification of Cryptographic Signature';
    } else if (description.includes('logic') || testName.includes('logic')) {
      return 'CWE-691: Insufficient Control Flow Management';
    } else if (description.includes('front') && description.includes('run') || testName.includes('frontrun')) {
      return 'CWE-362: Concurrent Execution using Shared Resource with Improper Synchronization';
    } else if (description.includes('dos') || description.includes('denial of service') || testName.includes('dos')) {
      return 'CWE-400: Uncontrolled Resource Consumption';
    }
    
    return 'CWE-664: Improper Control of a Resource Through its Lifetime';
  }
  
  private _enhanceDescription(finding: VulnerabilityFinding): string {
    // Enhance short descriptions with more context
    let enhancedDescription = finding.description;
    
    if (finding.details) {
      // Add relevant details to the description
      for (const [key, value] of Object.entries(finding.details)) {
        if (typeof value === 'string' && 
            !['testScriptContent', 'code', 'raw'].includes(key) && 
            value.length < 200) {
          enhancedDescription += ` ${key}: ${value}.`;
        }
      }
    }
    
    if (finding.steps && finding.steps.length > 0) {
      // Add first step to description
      enhancedDescription += ` This issue can be reproduced by: ${finding.steps[0].description}`;
    }
    
    return enhancedDescription;
  }
  
  private _classifyVulnerability(finding: VulnerabilityFinding): string {
    // Classify vulnerability by type and severity
    const severity = finding.severity;
    const type = finding.type || this._determineVulnerabilityType(finding);
    
    if (severity === 'critical') {
      return 'Critical security vulnerability requiring immediate attention';
    } else if (severity === 'high') {
      return 'High-risk security vulnerability with significant impact';
    } else if (severity === 'medium') {
      return 'Medium-risk security vulnerability with moderate impact';
    } else if (severity === 'low') {
      return 'Low-risk security concern with minimal impact';
    } else {
      return 'Informational finding with security implications';
    }
  }
  
  private _estimateBounty(finding: VulnerabilityFinding): string {
    // Estimate potential bounty range based on severity
    switch (finding.severity) {
      case 'critical':
        return '$50,000 - $1,000,000+';
      case 'high':
        return '$10,000 - $50,000';
      case 'medium':
        return '$5,000 - $10,000';
      case 'low':
        return '$1,000 - $5,000';
      default:
        return 'No bounty expected';
    }
  }
}

export default ImmunefiSubmissionGenerator;
