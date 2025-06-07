/**
 * Security Checker Module
 * 
 * Performs security checks on smart contracts and dApps
 */

import fs from 'fs-extra';
import path from 'path';

class SecurityChecker {
  constructor (options = {}) {
    this.options = {
      riskScoringOptions: {
        thresholds: {
          low: 3.9,
          medium: 6.9,
          high: 8.9
        }
      },
      ...options
    };

    this.contractContext = new Map();
  }

  /**
   * Set context information for a contract
   * @param {string} address - Contract address
   * @param {Object} context - Context information
   */
  setContractContext(address, context) {
    this.contractContext.set(address, {
      tvl: 0,
      age: 0,
      auditCount: 0,
      complexity: 5,
      ...context
    });
  }

  /**
   * Run all security checks on a contract
   * @param {string} address - Contract address
   * @returns {Object} Risk assessment results
   */
  async runAllChecks(address) {
    console.log(`Running security checks on contract: ${address}`);

    // Get contract context or use defaults
    const context = this.contractContext.get(address) || {
      tvl: 0,
      age: 0,
      auditCount: 0,
      complexity: 5
    };

    // Sample vulnerabilities for demonstration
    const vulnerabilities = [
      {
        id: 'VULN-001',
        name: 'Reentrancy Vulnerability',
        description: 'The contract may be vulnerable to reentrancy attacks',
        severity: 'high',
        baseScore: 8.5,
        type: 'reentrancy',
        location: `${address}:transferFunds()`
      },
      {
        id: 'VULN-002',
        name: 'Unchecked Return Value',
        description: 'The contract does not check return values from external calls',
        severity: 'medium',
        baseScore: 5.2,
        type: 'uncheckedReturn',
        location: `${address}:externalCall()`
      },
      {
        id: 'VULN-003',
        name: 'Front-Running Vulnerability',
        description: 'The contract may be vulnerable to front-running attacks',
        severity: 'medium',
        baseScore: 6.0,
        type: 'frontrunning',
        location: `${address}:executeSwap()`
      }
    ];

    // Calculate risk scores for each vulnerability
    const vulnerabilityScores = vulnerabilities.map(vuln => {
      // Adjust score based on context
      let adjustedScore = vuln.baseScore;

      // Higher TVL increases risk
      if (context.tvl > 1000000) {
        adjustedScore += 0.5;
      }

      // Newer contracts are riskier
      if (context.age < 30) {
        adjustedScore += 0.3;
      }

      // More audits reduce risk
      if (context.auditCount > 0) {
        adjustedScore -= 0.2 * context.auditCount;
      }

      // Higher complexity increases risk
      if (context.complexity > 7) {
        adjustedScore += 0.4;
      }

      // Ensure score is within bounds
      const finalScore = Math.max(0, Math.min(10, adjustedScore));

      // Determine severity level
      const severityLevel = this.getSeverityLevel(finalScore);

      // Generate remediation steps
      const remediation = this.getRemediationSteps(vuln.type);

      return {
        originalVulnerability: vuln,
        finalScore,
        severityLevel,
        remediation
      };
    });

    // Calculate overall risk score
    const overallScore = this.calculateOverallScore(vulnerabilityScores);

    return {
      contractAddress: address,
      context,
      vulnerabilityScores,
      overallScore,
      severityLevel: this.getSeverityLevel(overallScore),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate overall risk score from individual vulnerability scores
   * @param {Array} vulnerabilityScores - Array of vulnerability scores
   * @returns {number} Overall risk score
   */
  calculateOverallScore(vulnerabilityScores) {
    if (vulnerabilityScores.length === 0) {
      return 0;
    }

    // Use a weighted average, giving more weight to higher scores
    const totalWeight = vulnerabilityScores.reduce((sum, score) => sum + score.finalScore, 0);
    const weightedSum = vulnerabilityScores.reduce((sum, score) => sum + (score.finalScore * score.finalScore), 0);

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  /**
   * Get severity level based on score
   * @param {number} score - Risk score
   * @returns {Object} Severity level object
   */
  getSeverityLevel(score) {
    const { thresholds } = this.options.riskScoringOptions;

    if (score >= thresholds.high) {
      return { level: 'high', label: 'Critical', color: '#ff0000' };
    } else if (score >= thresholds.medium) {
      return { level: 'medium', label: 'High', color: '#ff9900' };
    } else if (score >= thresholds.low) {
      return { level: 'low', label: 'Medium', color: '#ffcc00' };
    } else {
      return { level: 'info', label: 'Low', color: '#00cc00' };
    }
  }

  /**
   * Get remediation steps for a vulnerability type
   * @param {string} vulnType - Vulnerability type
   * @returns {Array} Array of remediation steps
   */
  getRemediationSteps(vulnType) {
    const remediationMap = {
      reentrancy: [
        'Implement checks-effects-interactions pattern',
        'Use ReentrancyGuard from OpenZeppelin',
        'Consider using a pull payment pattern instead of push'
      ],
      uncheckedReturn: [
        'Always check return values from external calls',
        'Use SafeERC20 for token transfers',
        'Implement proper error handling for all external calls'
      ],
      frontrunning: [
        'Implement commit-reveal schemes for sensitive operations',
        'Use a minimum/maximum price with expiration time',
        'Consider using a private mempool or flashbots'
      ],
      accessControl: [
        'Implement role-based access control',
        'Use OpenZeppelin AccessControl',
        'Add time locks for sensitive operations'
      ],
      oracleManipulation: [
        'Use multiple data sources',
        'Implement price deviation checks',
        'Consider using Chainlink or other decentralized oracles'
      ],
      flashloanAttack: [
        'Implement proper slippage protection',
        'Use secure price feeds',
        'Add checks for large price movements in a single transaction'
      ],
      timestampDependence: [
        'Avoid relying on block.timestamp for critical logic',
        'Use block numbers instead of timestamps when possible',
        'Allow for some time variance in timestamp-dependent code'
      ],
      signatureReplay: [
        'Include nonces in all signatures',
        'Add expiration timestamps to signatures',
        'Verify signature uniqueness on-chain'
      ]
    };

    return remediationMap[vulnType] || [
      'Review the code for security issues',
      'Consider getting a professional audit',
      'Implement comprehensive testing'
    ];
  }

  /**
   * Generate a risk dashboard HTML
   * @param {Object} riskAssessment - Risk assessment results
   * @returns {string} HTML content for the dashboard
   */
  generateRiskDashboard(riskAssessment) {
    const { contractAddress, overallScore, severityLevel, vulnerabilityScores } = riskAssessment;

    // Generate HTML for the dashboard
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Risk Dashboard - ${contractAddress}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
    .dashboard { max-width: 1000px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 30px; }
    .risk-score { font-size: 24px; font-weight: bold; color: ${severityLevel.color}; }
    .vulnerabilities { margin-top: 30px; }
    .vulnerability { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
    .vulnerability-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .vulnerability-name { font-weight: bold; }
    .vulnerability-score { font-weight: bold; }
    .remediation { margin-top: 10px; }
    .remediation-item { margin-bottom: 5px; }
  </style>
</head>
<body>
  <div class="dashboard">
    <div class="header">
      <h1>Security Risk Dashboard</h1>
      <p>Contract: ${contractAddress}</p>
      <p>Overall Risk Score: <span class="risk-score">${overallScore.toFixed(1)} (${severityLevel.label})</span></p>
    </div>
    
    <div class="vulnerabilities">
      <h2>Identified Vulnerabilities</h2>
      ${vulnerabilityScores.map(score => `
        <div class="vulnerability">
          <div class="vulnerability-header">
            <span class="vulnerability-name">${score.originalVulnerability.name}</span>
            <span class="vulnerability-score" style="color: ${this.getSeverityLevel(score.finalScore).color}">
              ${score.finalScore.toFixed(1)} (${score.severityLevel.label})
            </span>
          </div>
          <p>${score.originalVulnerability.description}</p>
          <p>Location: ${score.originalVulnerability.location}</p>
          
          <div class="remediation">
            <h3>Remediation Steps:</h3>
            <ul>
              ${score.remediation.map(step => `<li class="remediation-item">${step}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Export risk report in different formats
   * @param {Object} riskAssessment - Risk assessment results
   * @param {string} format - Output format (json, markdown, html)
   * @param {string} outputPath - Output file path
   */
  exportRiskReport(riskAssessment, format, outputPath) {

    // Ensure directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    switch (format.toLowerCase()) {
      case 'json':
        fs.writeJsonSync(outputPath, riskAssessment, { spaces: 2 });
        break;
      case 'markdown':
        const markdown = this.generateMarkdownReport(riskAssessment);
        fs.writeFileSync(outputPath, markdown);
        break;
      case 'html':
        const html = this.generateRiskDashboard(riskAssessment);
        fs.writeFileSync(outputPath, html);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  /**
   * Generate a markdown report
   * @param {Object} riskAssessment - Risk assessment results
   * @returns {string} Markdown content
   */
  generateMarkdownReport(riskAssessment) {
    const { contractAddress, overallScore, severityLevel, vulnerabilityScores } = riskAssessment;

    let markdown = `# Security Risk Assessment

## Contract: ${contractAddress}

**Overall Risk Score:** ${overallScore.toFixed(1)} (${severityLevel.label})

## Identified Vulnerabilities

`;

    vulnerabilityScores.forEach(score => {
      markdown += `### ${score.originalVulnerability.name}

`;
      markdown += `- **Severity:** ${score.severityLevel.label} (${score.finalScore.toFixed(1)})
`;
      markdown += `- **Description:** ${score.originalVulnerability.description}
`;
      markdown += `- **Location:** ${score.originalVulnerability.location}

`;

      markdown += `#### Remediation Steps:

`;
      score.remediation.forEach(step => {
        markdown += `- ${step}
`;
      });

      markdown += `
`;
    });

    return markdown;
  }
}

export default SecurityChecker;