/**
 * Risk Scoring Engine Test
 * 
 * This script demonstrates the functionality of the risk scoring engine.
 */

const { RiskScoringEngine, RiskDashboard, RiskReportExporter } = require('../../src/security/risk-scoring');
const fs = require('fs');
const path = require('path');

// Sample vulnerabilities for testing
const sampleVulnerabilities = [
    {
        title: 'Reentrancy Vulnerability',
        description: 'The contract is vulnerable to reentrancy attacks due to state changes after external calls.',
        severity: 'high',
        contractAddress: '0x1234567890123456789012345678901234567890',
        network: 'mainnet',
        details: 'Function withdraw() updates balances after making external calls.',
        type: 'reentrancy',
        context: {
            tvl: 5000000, // $5M TVL
            age: 45, // 45 days old
            auditCount: 1 // 1 previous audit
        }
    },
    {
        title: 'Integer Overflow Risk',
        description: 'The contract may be vulnerable to integer overflow in the calculateRewards function.',
        severity: 'medium',
        contractAddress: '0x1234567890123456789012345678901234567890',
        network: 'mainnet',
        details: 'Function calculateRewards() does not use SafeMath for multiplication.',
        type: 'overflow',
        context: {
            tvl: 5000000,
            age: 45,
            auditCount: 1
        }
    },
    {
        title: 'Insufficient Access Controls',
        description: 'The contract has functions that lack proper access controls.',
        severity: 'critical',
        contractAddress: '0x1234567890123456789012345678901234567890',
        network: 'mainnet',
        details: 'Function setFees() can be called by anyone.',
        type: 'accessControl',
        context: {
            tvl: 5000000,
            age: 45,
            auditCount: 1
        }
    }
];

// Create output directory
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Initialize risk scoring engine
const riskEngine = new RiskScoringEngine();

// Calculate risk scores for individual vulnerabilities
console.log('\nCalculating individual vulnerability risk scores:');
sampleVulnerabilities.forEach(vuln => {
    const score = riskEngine.calculateVulnerabilityRiskScore(vuln);
    console.log(`${vuln.title}: ${score.finalScore.toFixed(1)} (${score.severityLevel.label})`);
});

// Calculate overall contract risk score
console.log('\nCalculating overall contract risk score:');
const contractRisk = riskEngine.calculateContractRiskScore(
    sampleVulnerabilities,
    '0x1234567890123456789012345678901234567890'
);

console.log(`Overall Risk Score: ${contractRisk.overallScore.toFixed(1)} (${contractRisk.severityLevel.label})`);
console.log(`Weighted Average Score: ${contractRisk.weightedAverageScore.toFixed(1)}`);
console.log(`Summary: ${contractRisk.summary}`);

// Generate risk dashboard
console.log('\nGenerating risk dashboard...');
const dashboard = new RiskDashboard();
const htmlDashboard = dashboard.generateHtmlDashboard(contractRisk);
fs.writeFileSync(path.join(outputDir, 'risk-dashboard.html'), htmlDashboard);
console.log(`Dashboard saved to ${path.join(outputDir, 'risk-dashboard.html')}`);

// Export risk reports in different formats
console.log('\nExporting risk reports...');
const exporter = new RiskReportExporter();

const formats = ['json', 'csv', 'html', 'markdown'];
formats.forEach(format => {
    const outputPath = path.join(outputDir, `risk-report.${format}`);
    exporter.exportReport(contractRisk, format, outputPath);
    console.log(`${format.toUpperCase()} report saved to ${outputPath}`);
});

// Test custom risk thresholds
console.log('\nTesting custom risk thresholds:');
const originalThresholds = riskEngine.getRiskThresholds();
console.log('Original thresholds:', originalThresholds);

// Update to more stringent thresholds
const newThresholds = riskEngine.updateRiskThresholds({
    low: 2.0,  // More stringent low threshold
    medium: 5.0, // More stringent medium threshold
    high: 8.0    // More stringent high threshold
});
console.log('Updated thresholds:', newThresholds);

// Recalculate with new thresholds
const updatedContractRisk = riskEngine.calculateContractRiskScore(
    sampleVulnerabilities,
    '0x1234567890123456789012345678901234567890'
);

console.log(`Updated Overall Risk Score: ${updatedContractRisk.overallScore.toFixed(1)} (${updatedContractRisk.severityLevel.label})`);

console.log('\nRisk scoring test completed successfully!');