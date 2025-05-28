/**
 * Risk Scoring Engine for Smart Contracts
 * 
 * This module implements a comprehensive risk scoring system based on the CVSS framework
 * to evaluate smart contracts based on the severity of detected vulnerabilities and their
 * exploit likelihood.
 */

const fs = require('fs');
const path = require('path');

// CVSS scoring constants
const CVSS_SEVERITY = {
    NONE: { min: 0.0, max: 0.0, label: 'None', color: '#009900' },
    LOW: { min: 0.1, max: 3.9, label: 'Low', color: '#ffcc00' },
    MEDIUM: { min: 4.0, max: 6.9, label: 'Medium', color: '#ff9900' },
    HIGH: { min: 7.0, max: 8.9, label: 'High', color: '#ff0000' },
    CRITICAL: { min: 9.0, max: 10.0, label: 'Critical', color: '#990000' }
};

// Vulnerability types and their base scores
const VULNERABILITY_BASE_SCORES = {
    reentrancy: 8.6,
    overflow: 7.5,
    frontrunning: 6.8,
    accessControl: 9.0,
    oracleManipulation: 8.2,
    flashloanAttack: 7.8,
    uncheckedReturn: 5.5,
    txOrigin: 7.2,
    delegatecall: 8.8,
    defaultVisibility: 6.5,
    gasLimitation: 4.2,
    blockTimestamp: 5.0,
    shadowingState: 4.8,
    randomness: 6.2,
    denial: 5.8,
    race: 6.5,
    other: 5.0
};

// Historical exploit data (simplified for demonstration)
const HISTORICAL_EXPLOIT_DATA = {
    reentrancy: { occurrences: 42, successRate: 0.75 },
    overflow: { occurrences: 38, successRate: 0.65 },
    frontrunning: { occurrences: 25, successRate: 0.55 },
    accessControl: { occurrences: 50, successRate: 0.85 },
    oracleManipulation: { occurrences: 20, successRate: 0.70 },
    flashloanAttack: { occurrences: 15, successRate: 0.60 },
    uncheckedReturn: { occurrences: 30, successRate: 0.40 },
    txOrigin: { occurrences: 22, successRate: 0.50 },
    delegatecall: { occurrences: 18, successRate: 0.80 },
    defaultVisibility: { occurrences: 45, successRate: 0.45 },
    gasLimitation: { occurrences: 12, successRate: 0.30 },
    blockTimestamp: { occurrences: 28, successRate: 0.35 },
    shadowingState: { occurrences: 15, successRate: 0.25 },
    randomness: { occurrences: 32, successRate: 0.60 },
    denial: { occurrences: 20, successRate: 0.40 },
    race: { occurrences: 18, successRate: 0.45 },
    other: { occurrences: 10, successRate: 0.30 }
};

class RiskScoringEngine {
    constructor (options = {}) {
        this.options = {
            // Default weights for the scoring algorithm
            weights: {
                severity: 0.6,
                likelihood: 0.4,
                ...options.weights
            },
            // Default risk thresholds
            thresholds: {
                low: 3.9,
                medium: 6.9,
                high: 8.9,
                ...options.thresholds
            },
            // Database path for historical vulnerability data
            dbPath: options.dbPath || path.join(__dirname, 'vulnerability-db.json')
        };

        // Initialize or load vulnerability database
        this.vulnerabilityDb = this._loadVulnerabilityDb();
    }

    /**
     * Calculate risk score for a single vulnerability
     * @param {Object} vulnerability - The vulnerability object
     * @returns {Object} - Risk score details
     */
    calculateVulnerabilityRiskScore(vulnerability) {
        // Get base score for vulnerability type
        const baseScore = VULNERABILITY_BASE_SCORES[vulnerability.type] || VULNERABILITY_BASE_SCORES.other;

        // Get historical data for likelihood calculation
        const historicalData = HISTORICAL_EXPLOIT_DATA[vulnerability.type] || HISTORICAL_EXPLOIT_DATA.other;

        // Calculate likelihood score (0-10 scale)
        const likelihoodScore = this._calculateLikelihoodScore(vulnerability, historicalData);

        // Calculate final weighted score
        const finalScore = (
            baseScore * this.options.weights.severity +
            likelihoodScore * this.options.weights.likelihood
        );

        // Determine severity level based on final score
        const severityLevel = this._determineSeverityLevel(finalScore);

        // Generate remediation suggestions
        const remediation = this._generateRemediationSuggestions(vulnerability);

        return {
            originalVulnerability: vulnerability,
            baseScore,
            likelihoodScore,
            finalScore: parseFloat(finalScore.toFixed(1)),
            severityLevel,
            remediation,
            explanation: this._generateScoreExplanation(baseScore, likelihoodScore, finalScore, vulnerability)
        };
    }

    /**
     * Calculate risk scores for multiple vulnerabilities
     * @param {Array} vulnerabilities - Array of vulnerability objects
     * @returns {Object} - Overall risk assessment and individual scores
     */
    calculateContractRiskScore(vulnerabilities, contractAddress) {
        if (!vulnerabilities || vulnerabilities.length === 0) {
            return {
                contractAddress,
                overallScore: 0,
                severityLevel: CVSS_SEVERITY.NONE.label,
                vulnerabilityScores: [],
                summary: 'No vulnerabilities detected.'
            };
        }

        // Calculate individual vulnerability scores
        const vulnerabilityScores = vulnerabilities.map(vuln =>
            this.calculateVulnerabilityRiskScore(vuln)
        );

        // Calculate overall contract risk score (using max-risk approach)
        const maxRiskScore = Math.max(...vulnerabilityScores.map(score => score.finalScore));

        // Alternative: weighted average approach
        const weightedSum = vulnerabilityScores.reduce((sum, score) => sum + score.finalScore, 0);
        const weightedAvg = vulnerabilityScores.length > 0 ?
            weightedSum / vulnerabilityScores.length : 0;

        // Use max risk as the primary indicator, but include weighted average in the report
        const overallScore = parseFloat(maxRiskScore.toFixed(1));
        const severityLevel = this._determineSeverityLevel(overallScore);

        // Generate summary
        const summary = this._generateRiskSummary(vulnerabilityScores, overallScore, severityLevel);

        return {
            contractAddress,
            overallScore,
            severityLevel,
            weightedAverageScore: parseFloat(weightedAvg.toFixed(1)),
            vulnerabilityScores: vulnerabilityScores.sort((a, b) => b.finalScore - a.finalScore),
            summary,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Calculate likelihood score based on historical data and context
     * @private
     */
    _calculateLikelihoodScore(vulnerability, historicalData) {
        // Base likelihood from historical data
        const baseLikelihood = historicalData.successRate * 10;

        // Adjust based on contract context if available
        let contextMultiplier = 1.0;

        if (vulnerability.context) {
            // Adjust based on contract value/TVL if available
            if (vulnerability.context.tvl) {
                // Higher TVL means higher likelihood of being targeted
                contextMultiplier *= this._calculateTvlFactor(vulnerability.context.tvl);
            }

            // Adjust based on contract age/maturity
            if (vulnerability.context.age) {
                // Newer contracts might have more undiscovered vulnerabilities
                contextMultiplier *= this._calculateAgeFactor(vulnerability.context.age);
            }

            // Adjust based on audit history
            if (vulnerability.context.auditCount) {
                // More audits generally reduce likelihood
                contextMultiplier *= this._calculateAuditFactor(vulnerability.context.auditCount);
            }
        }

        // Calculate final likelihood score (capped at 10)
        return Math.min(10, baseLikelihood * contextMultiplier);
    }

    /**
     * Calculate TVL (Total Value Locked) factor for likelihood adjustment
     * @private
     */
    _calculateTvlFactor(tvl) {
        // Higher TVL means higher likelihood of being targeted
        if (tvl > 10000000) return 1.5;      // >$10M
        if (tvl > 1000000) return 1.3;       // >$1M
        if (tvl > 100000) return 1.1;        // >$100K
        return 0.9;                          // <$100K
    }

    /**
     * Calculate contract age factor for likelihood adjustment
     * @private
     */
    _calculateAgeFactor(ageInDays) {
        // Newer contracts might have more undiscovered vulnerabilities
        if (ageInDays < 30) return 1.3;      // <1 month
        if (ageInDays < 90) return 1.1;      // <3 months
        if (ageInDays < 365) return 1.0;     // <1 year
        return 0.9;                          // >1 year
    }

    /**
     * Calculate audit factor for likelihood adjustment
     * @private
     */
    _calculateAuditFactor(auditCount) {
        // More audits generally reduce likelihood
        if (auditCount === 0) return 1.5;    // No audits
        if (auditCount === 1) return 1.2;    // 1 audit
        if (auditCount < 3) return 1.0;      // 2 audits
        return 0.8;                          // 3+ audits
    }

    /**
     * Determine severity level based on CVSS score
     * @private
     */
    _determineSeverityLevel(score) {
        if (score >= CVSS_SEVERITY.CRITICAL.min) return CVSS_SEVERITY.CRITICAL;
        if (score >= CVSS_SEVERITY.HIGH.min) return CVSS_SEVERITY.HIGH;
        if (score >= CVSS_SEVERITY.MEDIUM.min) return CVSS_SEVERITY.MEDIUM;
        if (score >= CVSS_SEVERITY.LOW.min) return CVSS_SEVERITY.LOW;
        return CVSS_SEVERITY.NONE;
    }

    /**
     * Generate remediation suggestions based on vulnerability type
     * @private
     */
    _generateRemediationSuggestions(vulnerability) {
        const remediations = {
            reentrancy: [
                'Implement checks-effects-interactions pattern',
                'Use ReentrancyGuard from OpenZeppelin',
                'Ensure all state changes happen before external calls'
            ],
            overflow: [
                'Use SafeMath library for Solidity <0.8.0',
                'Upgrade to Solidity 0.8.0+ for built-in overflow checks',
                'Add explicit bounds checking for critical calculations'
            ],
            frontrunning: [
                'Implement commit-reveal schemes',
                'Use a private mempool or flashbots',
                'Add minimum/maximum acceptable price parameters'
            ],
            accessControl: [
                'Implement role-based access control using OpenZeppelin AccessControl',
                'Use multi-signature for critical functions',
                'Implement time locks for sensitive operations'
            ],
            oracleManipulation: [
                'Use multiple data sources and take median values',
                'Implement circuit breakers for extreme price movements',
                'Consider using Chainlink or other decentralized oracles'
            ],
            flashloanAttack: [
                'Check for price manipulation in a single transaction',
                'Implement per-block or per-transaction rate limiting',
                'Use time-weighted average prices (TWAP)'
            ],
            uncheckedReturn: [
                'Always check return values of external calls',
                'Use require statements to validate return values',
                'Consider using OpenZeppelin SafeERC20 for token transfers'
            ],
            txOrigin: [
                'Use msg.sender instead of tx.origin for authentication',
                'Implement additional authentication mechanisms',
                'Add multi-factor authentication for critical operations'
            ],
            delegatecall: [
                'Avoid delegatecall to untrusted contracts',
                'Implement strict validation for delegatecall targets',
                'Use proxy patterns like OpenZeppelin's Transparent or UUPS proxies'
            ],
            defaultVisibility: [
                'Explicitly declare visibility for all functions and state variables',
                'Use private or internal by default, only expose what's necessary',
                'Conduct regular security audits to catch visibility issues'
            ],
            gasLimitation: [
                'Optimize gas usage in loops and expensive operations',
                'Implement pagination for large data sets',
                'Consider using off-chain computation where appropriate'
            ],
            blockTimestamp: [
                'Avoid relying on block.timestamp for precise timing',
                'Use block numbers instead of timestamps when possible',
                'Allow for reasonable timestamp variance in time-sensitive operations'
            ],
            shadowingState: [
                'Avoid variable names that shadow inherited contract state',
                'Use unique naming conventions for different scopes',
                'Consider using OpenZeppelin contracts as a base'
            ],
            randomness: [
                'Use Chainlink VRF for secure randomness',
                'Avoid using block.timestamp or blockhash as randomness sources',
                'Consider commit-reveal schemes for randomness'
            ],
            denial: [
                'Implement rate limiting for resource-intensive operations',
                'Set appropriate gas limits for external calls',
                'Use pull payment patterns instead of push'
            ],
            race: [
                'Implement mutex patterns for critical sections',
                'Use OpenZeppelin's ReentrancyGuard',
                'Consider using atomic transactions where possible'
            ],
            other: [
                'Conduct regular security audits',
                'Follow smart contract security best practices',
                'Consider formal verification for critical contracts'
            ]
        };

        return remediations[vulnerability.type] || remediations.other;
    }

    /**
     * Generate detailed explanation of how the score was calculated
     * @private
     */
    _generateScoreExplanation(baseScore, likelihoodScore, finalScore, vulnerability) {
        return {
            baseScoreExplanation: `Base severity score of ${baseScore.toFixed(1)} assigned based on the ${vulnerability.type} vulnerability type.`,
            likelihoodExplanation: `Exploit likelihood score of ${likelihoodScore.toFixed(1)} calculated based on historical data and contract context.`,
            weightingExplanation: `Final score calculated using weights: ${this.options.weights.severity * 100}% severity + ${this.options.weights.likelihood * 100}% likelihood.`,
            finalScoreExplanation: `Final risk score: ${finalScore.toFixed(1)} (${this._determineSeverityLevel(finalScore).label})`
        };
    }

    /**
     * Generate overall risk summary for the contract
     * @private
     */
    _generateRiskSummary(vulnerabilityScores, overallScore, severityLevel) {
        const criticalCount = vulnerabilityScores.filter(v => v.severityLevel.label === 'Critical').length;
        const highCount = vulnerabilityScores.filter(v => v.severityLevel.label === 'High').length;
        const mediumCount = vulnerabilityScores.filter(v => v.severityLevel.label === 'Medium').length;
        const lowCount = vulnerabilityScores.filter(v => v.severityLevel.label === 'Low').length;

        let summary = `This contract has an overall risk score of ${overallScore.toFixed(1)} (${severityLevel.label}). `;

        if (criticalCount > 0) {
            summary += `Found ${criticalCount} critical, `;
        }

        if (highCount > 0) {
            summary += `${highCount} high, `;
        }

        if (mediumCount > 0) {
            summary += `${mediumCount} medium, `;
        }

        if (lowCount > 0) {
            summary += `${lowCount} low severity issues. `;
        }

        if (criticalCount > 0 || highCount > 0) {
            summary += 'Immediate attention is required to address these vulnerabilities.';
        } else if (mediumCount > 0) {
            summary += 'Remediation should be planned in the near term.';
        } else if (lowCount > 0) {
            summary += 'These issues should be addressed as part of regular maintenance.';
        } else {
            summary += 'No significant issues were detected.';
        }

        return summary;
    }

    /**
     * Load vulnerability database from file or initialize with defaults
     * @private
     */
    _loadVulnerabilityDb() {
        try {
            if (fs.existsSync(this.options.dbPath)) {
                return JSON.parse(fs.readFileSync(this.options.dbPath, 'utf8'));
            }
        } catch (error) {
            console.warn(`Could not load vulnerability database: ${error.message}`);
        }

        // Return default database if file doesn't exist or can't be parsed
        return {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            vulnerabilities: HISTORICAL_EXPLOIT_DATA
        };
    }

    /**
     * Save vulnerability database to file
     * @private
     */
    _saveVulnerabilityDb() {
        try {
            const dbDir = path.dirname(this.options.dbPath);
            if (!fs.existsSync(dbDir)) {
                fs.mkdirSync(dbDir, { recursive: true });
            }

            fs.writeFileSync(
                this.options.dbPath,
                JSON.stringify(this.vulnerabilityDb, null, 2)
            );

            return true;
        } catch (error) {
            console.error(`Could not save vulnerability database: ${error.message}`);
            return false;
        }
    }

    /**
     * Update vulnerability database with new data
     * @param {Object} newData - New vulnerability data to incorporate
     */
    updateVulnerabilityDatabase(newData) {
        if (!newData || typeof newData !== 'object') {
            throw new Error('Invalid data format for vulnerability database update');
        }

        // Merge new data with existing database
        this.vulnerabilityDb = {
            ...this.vulnerabilityDb,
            ...newData,
            lastUpdated: new Date().toISOString()
        };

        // Save updated database
        return this._saveVulnerabilityDb();
    }

    /**
     * Get current risk thresholds
     */
    getRiskThresholds() {
        return this.options.thresholds;
    }

    /**
     * Update risk thresholds based on user preferences
     * @param {Object} newThresholds - New threshold values
     */
    updateRiskThresholds(newThresholds) {
        if (!newThresholds || typeof newThresholds !== 'object') {
            throw new Error('Invalid threshold format');
        }

        this.options.thresholds = {
            ...this.options.thresholds,
            ...newThresholds
        };

        return this.options.thresholds;
    }
}

module.exports = RiskScoringEngine;