/**
 * Web3FuzzForge - Immunefi Bounty Submission Automation
 * 
 * This module automates the submission of vulnerabilities to the Immunefi bug bounty platform.
 * It processes test results, formats them according to Immunefi requirements, and submits 
 * reports via the Immunefi API.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { SEVERITY } = require('../visualization/generate-test-report');

// Immunefi API configuration
const API_CONFIG = {
  baseUrl: process.env.IMMUNEFI_API_URL || 'https://api.immunefi.com/v1',
  apiKey: process.env.IMMUNEFI_API_KEY || null,
  defaultTimeout: 30000 // 30 seconds
};

// Maps our severity levels to Immunefi severity levels
const SEVERITY_MAP = {
  [SEVERITY.CRITICAL]: 'critical',
  [SEVERITY.HIGH]: 'high',
  [SEVERITY.MEDIUM]: 'medium',
  [SEVERITY.LOW]: 'low',
  [SEVERITY.INFO]: 'informational'
};

/**
 * Formats test results into Immunefi's required submission format
 * @param {Object} testResults - The parsed test results object
 * @param {Object} projectMetadata - Additional project metadata
 * @returns {Object} - Formatted submission data
 */
function formatImmunefiSubmission(testResults, projectMetadata) {
  // Extract all vulnerability data
  const vulnerabilities = [];
  
  testResults.tests.forEach(test => {
    if (test.vulnerabilities && test.vulnerabilities.length > 0) {
      test.vulnerabilities.forEach(vuln => {
        vulnerabilities.push({
          name: vuln.name,
          severity: vuln.severity,
          description: vuln.description,
          recommendation: vuln.recommendation,
          testName: test.name,
          evidence: vuln.evidence || null,
          impact: vuln.impact || null
        });
      });
    }
  });
  
  // Organize by severity for reporting
  const criticalVulns = vulnerabilities.filter(v => v.severity === SEVERITY.CRITICAL);
  const highVulns = vulnerabilities.filter(v => v.severity === SEVERITY.HIGH);
  const mediumVulns = vulnerabilities.filter(v => v.severity === SEVERITY.MEDIUM);
  
  // Only submit if there are critical, high, or medium vulnerabilities
  if (criticalVulns.length === 0 && highVulns.length === 0 && mediumVulns.length === 0) {
    return null;
  }
  
  // Generate vulnerability sections for the report
  let vulnSections = '';
  
  // Function to format each vulnerability section
  const formatVulnSection = (vuln, index) => {
    return `
## Vulnerability ${index + 1}: ${vuln.name}

**Severity**: ${SEVERITY_MAP[vuln.severity] || vuln.severity}

**Description**:
${vuln.description}

**Impact**:
${vuln.impact || 'Not specified'}

**Steps to Reproduce**:
1. Run the test case: \`${vuln.testName}\`
2. Observe the vulnerability being triggered
${vuln.evidence ? `\n**Evidence**:\n${vuln.evidence}` : ''}

**Recommendation**:
${vuln.recommendation || 'No specific recommendation provided.'}

---
`;
  };
  
  // Add critical vulnerabilities first
  if (criticalVulns.length > 0) {
    vulnSections += '# Critical Vulnerabilities\n\n';
    criticalVulns.forEach((vuln, index) => {
      vulnSections += formatVulnSection(vuln, index);
    });
  }
  
  // Add high vulnerabilities
  if (highVulns.length > 0) {
    vulnSections += '# High Vulnerabilities\n\n';
    highVulns.forEach((vuln, index) => {
      vulnSections += formatVulnSection(vuln, index);
    });
  }
  
  // Add medium vulnerabilities
  if (mediumVulns.length > 0) {
    vulnSections += '# Medium Vulnerabilities\n\n';
    mediumVulns.forEach((vuln, index) => {
      vulnSections += formatVulnSection(vuln, index);
    });
  }
  
  // Get the highest severity for title
  let highestSeverity = SEVERITY.INFO;
  if (criticalVulns.length > 0) highestSeverity = SEVERITY.CRITICAL;
  else if (highVulns.length > 0) highestSeverity = SEVERITY.HIGH;
  else if (mediumVulns.length > 0) highestSeverity = SEVERITY.MEDIUM;
  
  // Create summary of vulnerabilities
  const vulnSummary = `
- Critical: ${criticalVulns.length}
- High: ${highVulns.length}
- Medium: ${mediumVulns.length}
- Total: ${criticalVulns.length + highVulns.length + mediumVulns.length}
`;
  
  // Build the full report
  const report = `
# Vulnerability Report: ${projectMetadata.projectName || 'Web3 Application'} 

## Project Details
- Project Name: ${projectMetadata.projectName || 'Not specified'}
- Smart Contract Address(es): ${projectMetadata.contractAddresses || 'Not specified'}
- Website URL: ${projectMetadata.websiteUrl || 'Not specified'}
- Contact Information: ${projectMetadata.contactInfo || 'Not specified'}

## Summary
During the security assessment conducted on ${new Date().toISOString().split('T')[0]}, the following vulnerabilities were identified:
${vulnSummary}

These findings were discovered through automated security testing using the Web3FuzzForge security testing framework.

## Vulnerability Details
${vulnSections}

## Testing Methodology
The security assessment was performed using automated testing tools focusing on common Web3 vulnerabilities including:
- Smart contract vulnerabilities
- Frontend security issues
- Transaction handling problems
- Authentication and authorization weaknesses
- MEV protection issues

The tests were executed in a controlled environment against the target application.

## Additional Information
This report was generated automatically by the Web3FuzzForge security testing kit. All findings have been validated to ensure they represent actual security issues.
`;

  // Format the submission data according to Immunefi's requirements
  return {
    title: `[${SEVERITY_MAP[highestSeverity].toUpperCase()}] Multiple vulnerabilities in ${projectMetadata.projectName || 'target application'}`,
    description: report,
    severity: SEVERITY_MAP[highestSeverity],
    projectId: projectMetadata.immunefiProjectId || null,
    vulnerabilityType: determineVulnerabilityType(vulnerabilities),
    metadata: {
      test_date: new Date().toISOString(),
      test_framework: 'Web3FuzzForge',
      vulnerability_count: vulnerabilities.length,
      critical_count: criticalVulns.length,
      high_count: highVulns.length,
      medium_count: mediumVulns.length
    }
  };
}

/**
 * Determine the general vulnerability type based on the vulnerabilities found
 * @param {Array} vulnerabilities - List of vulnerabilities
 * @returns {string} - Vulnerability type for Immunefi
 */
function determineVulnerabilityType(vulnerabilities) {
  // Count different types of vulnerabilities
  const types = {
    'smart-contract': 0,
    'frontend': 0,
    'web3-integration': 0,
    'other': 0
  };
  
  // Simple keyword-based classification
  vulnerabilities.forEach(vuln => {
    const name = vuln.name.toLowerCase();
    const desc = vuln.description.toLowerCase();
    
    if (
      name.includes('contract') || 
      desc.includes('contract') ||
      name.includes('solidity') ||
      desc.includes('reentrancy') ||
      desc.includes('overflow')
    ) {
      types['smart-contract']++;
    } else if (
      name.includes('frontend') ||
      name.includes('ui') ||
      desc.includes('phishing') ||
      desc.includes('client-side')
    ) {
      types['frontend']++;
    } else if (
      name.includes('wallet') ||
      name.includes('signature') ||
      name.includes('transaction') ||
      desc.includes('metamask') ||
      desc.includes('web3')
    ) {
      types['web3-integration']++;
    } else {
      types['other']++;
    }
  });
  
  // Return the most common type
  return Object.entries(types)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])[0];
}

/**
 * Submits the formatted vulnerability report to Immunefi
 * @param {Object} submissionData - Formatted vulnerability data
 * @returns {Promise<Object>} - Submission response
 */
async function submitToImmunefi(submissionData) {
  if (!API_CONFIG.apiKey) {
    throw new Error('Immunefi API key not found. Please set the IMMUNEFI_API_KEY environment variable.');
  }
  
  if (!submissionData || 
      !submissionData.title || 
      !submissionData.description || 
      !submissionData.severity) {
    throw new Error('Invalid submission data format');
  }
  
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_CONFIG.baseUrl}/reports`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`
      },
      data: submissionData,
      timeout: API_CONFIG.defaultTimeout
    });
    
    return {
      success: true,
      reportId: response.data.reportId,
      submissionDate: new Date().toISOString(),
      status: response.data.status || 'submitted'
    };
  } catch (error) {
    console.error('Error submitting to Immunefi:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      errorCode: error.response?.status
    };
  }
}

/**
 * Process test results and submit vulnerabilities to Immunefi
 * @param {string} testResultsPath - Path to the test results JSON file
 * @param {Object} projectMetadata - Additional project metadata
 * @returns {Promise<Object>} - Submission status
 */
async function processAndSubmitToImmunefi(testResultsPath, projectMetadata = {}) {
  try {
    // Load test results
    const testResultsRaw = fs.readFileSync(testResultsPath, 'utf8');
    const testResults = JSON.parse(testResultsRaw);
    
    // Format the submission data
    const submissionData = formatImmunefiSubmission(testResults, projectMetadata);
    
    // Check if there are vulnerabilities to submit
    if (!submissionData) {
      console.log('No critical, high, or medium vulnerabilities found. Skipping submission.');
      return {
        success: false,
        reason: 'no-vulnerabilities',
        message: 'No critical, high, or medium vulnerabilities to report'
      };
    }
    
    // Submit to Immunefi
    console.log(`Submitting ${submissionData.metadata.vulnerability_count} vulnerabilities to Immunefi...`);
    const submissionResult = await submitToImmunefi(submissionData);
    
    // Save submission data for reference
    const outputDir = path.dirname(testResultsPath);
    const submissionLogPath = path.join(outputDir, 'immunefi-submission.json');
    
    fs.writeFileSync(submissionLogPath, JSON.stringify({
      submissionData,
      result: submissionResult,
      timestamp: new Date().toISOString()
    }, null, 2));
    
    console.log(`Submission log saved to: ${submissionLogPath}`);
    
    return submissionResult;
  } catch (error) {
    console.error('Error processing and submitting to Immunefi:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  formatImmunefiSubmission,
  submitToImmunefi,
  processAndSubmitToImmunefi
}; 