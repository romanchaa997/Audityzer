/**
 * Audityzer /analyze Endpoint Implementation
 * Handles smart contract analysis requests
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { validateAnalysisRequest } = require('../middleware/validation');
const ContractAnalyzer = require('../../analyzer/contractAnalyzer');
const VulnerabilityDetector = require('../../detector/vulnerabilityDetector');
const Logger = require('../../utils/logger');

const logger = new Logger('AnalyzeEndpoint');

/**
 * POST /api/analyze
 * 
 * Analyzes a smart contract for vulnerabilities and provides security insights.
 * 
 * Request Body:
 * {
 *   "contractAddress": "0x...",  // Optional: for on-chain analysis
 *   "contractCode": "...",        // Optional: for source code analysis
 *   "contractName": "MyContract",  // Optional: contract name
 *   "analysisType": "full",        // full, quick, or specific
 *   "networkId": 1,               // Ethereum network ID
 *   "options": {                  // Optional analysis options
 *     "includeGasOptimization": true,
 *     "includePatternAnalysis": true,
 *     "includeDynamicAnalysis": false
 *   }
 * }
 * 
 * Response (200 OK):
 * {
 *   "status": "completed",
 *   "analysisId": "uuid-string",
 *   "contract": {
 *     "address": "0x...",
 *     "name": "MyContract",
 *     "compiler": "solc@0.8.0",
 *     "lines": 250
 *   },
 *   "findings": [
 *     {
 *       "id": "finding-1",
 *       "severity": "high",
 *       "type": "reentrancy",
 *       "description": "Potential reentrancy vulnerability",
 *       "location": { "line": 45, "column": 20 },
 *       "recommendation": "Use checks-effects-interactions pattern",
 *       "confidence": 0.95
 *     }
 *   ],
 *   "summary": {
 *     "critical": 1,
 *     "high": 2,
 *     "medium": 5,
 *     "low": 3,
 *     "informational": 2
 *   },
 *   "metrics": {
 *     "complexity": 7.5,
 *     "gasEstimate": 245000,
 *     "coverage": 0.85
 *   },
 *   "timestamp": "2025-12-25T22:00:00Z",
 *   "executionTime": 2450  // milliseconds
 * }
 */
router.post(
  '/',
  authenticateToken,
  validateAnalysisRequest,
  async (req, res) => {
    const analysisStartTime = Date.now();
    const { contractAddress, contractCode, contractName, analysisType = 'full', networkId = 1, options = {} } = req.body;
    
    try {
      logger.info(`Analysis request received: type=${analysisType}, network=${networkId}`);
      
      // Validate input
      if (!contractAddress && !contractCode) {
        return res.status(400).json({
          error: 'INVALID_INPUT',
          message: 'Either contractAddress or contractCode must be provided'
        });
      }

      // Retrieve contract code if address provided
      let code = contractCode;
      let contractMetadata = { name: contractName || 'Unknown', networkId };
      
      if (contractAddress && !contractCode) {
        try {
          const web3Integration = require('../../blockchain/web3Integration');
          code = await web3Integration.getContractCode(contractAddress, networkId);
          contractMetadata.address = contractAddress;
          contractMetadata.name = contractName || 'Contract';
          
          if (!code) {
            return res.status(404).json({
              error: 'CONTRACT_NOT_FOUND',
              message: `Contract not found at address: ${contractAddress}`
            });
          }
        } catch (error) {
          logger.error(`Failed to retrieve contract code: ${error.message}`);
          return res.status(500).json({
            error: 'BLOCKCHAIN_ERROR',
            message: 'Failed to retrieve contract from blockchain'
          });
        }
      } else if (contractCode) {
        contractMetadata.address = contractAddress || null;
      }

      // Initialize analyzers
      const contractAnalyzer = new ContractAnalyzer();
      const vulnerabilityDetector = new VulnerabilityDetector();
      
      // Step 1: Parse and analyze contract
      logger.info('Starting contract analysis phase...');
      const analysisResult = await contractAnalyzer.analyze(code, {
        name: contractMetadata.name,
        address: contractMetadata.address
      });

      if (!analysisResult.success) {
        return res.status(400).json({
          error: 'ANALYSIS_FAILED',
          message: 'Failed to analyze contract',
          details: analysisResult.errors
        });
      }

      // Step 2: Detect vulnerabilities
      logger.info('Starting vulnerability detection phase...');
      const vulnerabilities = await vulnerabilityDetector.detect(
        analysisResult.ast,
        analysisResult.bytecode,
        { analysisType, ...options }
      );

      // Step 3: Compile findings with severity levels
      const findings = vulnerabilities.map(vuln => ({
        id: vuln.id,
        severity: vuln.severity || 'medium',
        type: vuln.type,
        description: vuln.description,
        location: vuln.location,
        recommendation: vuln.recommendation,
        references: vuln.references || [],
        confidence: vuln.confidence || 0.8,
        code: vuln.codeSnippet || null
      }));

      // Step 4: Calculate summary statistics
      const summary = {
        critical: findings.filter(f => f.severity === 'critical').length,
        high: findings.filter(f => f.severity === 'high').length,
        medium: findings.filter(f => f.severity === 'medium').length,
        low: findings.filter(f => f.severity === 'low').length,
        informational: findings.filter(f => f.severity === 'informational').length
      };

      // Step 5: Calculate metrics
      const metrics = {
        complexity: analysisResult.complexity || 5.0,
        gasEstimate: analysisResult.gasEstimate || 100000,
        coverage: analysisResult.coverage || 0.75,
        lineCount: analysisResult.lines || 0,
        functionCount: analysisResult.functionCount || 0
      };

      // Generate analysis ID
      const analysisId = require('uuid').v4();
      const executionTime = Date.now() - analysisStartTime;

      // Store analysis result (optional: to database)
      logger.info(`Analysis completed in ${executionTime}ms, findings: ${findings.length}`);

      // Return comprehensive response
      res.status(200).json({
        status: 'completed',
        analysisId,
        contract: {
          address: contractMetadata.address,
          name: contractMetadata.name,
          compiler: analysisResult.compiler || 'unknown',
          lines: analysisResult.lines || 0,
          functions: analysisResult.functionCount || 0
        },
        findings: findings.sort((a, b) => {
          const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, informational: 4 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        }),
        summary,
        metrics,
        timestamp: new Date().toISOString(),
        executionTime
      });

    } catch (error) {
      logger.error(`Unexpected error during analysis: ${error.message}`, error);
      res.status(500).json({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred during analysis'
      });
    }
  }
);

/**
 * GET /api/analyze/:analysisId
 * Retrieves a previously completed analysis
 */
router.get('/:analysisId', authenticateToken, async (req, res) => {
  try {
    const { analysisId } = req.params;
    
    // Retrieve from database/cache
    logger.info(`Retrieving analysis: ${analysisId}`);
    
    // TODO: Implement database retrieval
    res.status(200).json({
      status: 'not_implemented',
      message: 'Analysis retrieval feature coming soon'
    });
  } catch (error) {
    logger.error(`Error retrieving analysis: ${error.message}`);
    res.status(500).json({
      error: 'RETRIEVAL_FAILED',
      message: 'Failed to retrieve analysis'
    });
  }
});

module.exports = router;
