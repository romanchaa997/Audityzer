/**
 * Main Integration Test Suite
 *
 * Comprehensive tests to verify all components work together seamlessly.
 */

const { expect } = require('chai');
const path = require('path');
const fs = require('fs-extra');

// Import core modules
const core = require('../src/core');
const { SandboxExecutionEnvironment } = require('../src/core/sandbox');
const {
  VulnerabilityGenerator,
} = require('../src/core/ai-vulnerability-detection/model-development/vulnerability-generator');
const { NFTStandardsTester } = require('../src/core/defi-testing/nft-marketplace-standards');
const { GovernanceProtocolTester } = require('../src/core/defi-testing/governance-protocol-tester');
const {
  SecurityResearchWorkflow,
} = require('../src/core/collaboration/security-researcher-workflow');
const { TutorialManager } = require('../src/core/education/tutorial-manager');

describe('Web3 Security Test Kit Integration Tests', function () {
  // Set longer timeout for integration tests
  this.timeout(60000);

  // Test data
  const testDir = path.join(__dirname, 'test-data');
  fs.ensureDirSync(testDir);

  // Sample vulnerability data
  const sampleVulnerability = {
    id: 'TEST-001',
    classification: 'reentrancy',
    description: 'A reentrancy vulnerability in the withdraw function',
    contractName: 'VulnerableContract',
    functionName: 'withdraw',
    code: 'function withdraw() public {\n  uint amount = balances[msg.sender];\n  (bool success, ) = msg.sender.call{value: amount}("");\n  require(success);\n  balances[msg.sender] = 0;\n}',
  };

  // Initialize components for testing
  let sandboxEnv;
  let vulnGenerator;
  let nftTester;
  let govTester;
  let workflow;
  let tutorialManager;

  before(async function () {
    // Initialize components
    sandboxEnv = new SandboxExecutionEnvironment({
      mode: 'local',
      workingDir: path.join(testDir, 'sandbox'),
    });

    vulnGenerator = new VulnerabilityGenerator({
      templatesDir: path.join(testDir, 'templates'),
      outputDir: path.join(testDir, 'exploits'),
    });

    nftTester = new NFTStandardsTester({
      providerUrl: 'http://localhost:8545',
      resultsDir: path.join(testDir, 'nft-results'),
    });

    govTester = new GovernanceProtocolTester({
      providerUrl: 'http://localhost:8545',
      resultsDir: path.join(testDir, 'gov-results'),
    });

    workflow = new SecurityResearchWorkflow({
      workflowDir: path.join(testDir, 'workflow'),
    });

    tutorialManager = new TutorialManager({
      tutorialsDir: path.join(testDir, 'tutorials'),
      userDataDir: path.join(testDir, 'user-data'),
    });

    // Initialize sandbox
    await sandboxEnv.initialize();
  });

  after(async function () {
    // Cleanup
    await sandboxEnv.cleanup();
  });

  describe('Vulnerability Detection & Sandbox Integration', function () {
    it('should generate exploits for vulnerabilities', async function () {
      const exploit = await vulnGenerator.generateExploit(sampleVulnerability);
      expect(exploit).to.have.property('code');
      expect(exploit).to.have.property('id');
      expect(exploit.vulnerabilityType).to.equal(sampleVulnerability.classification);
    });

    it('should execute generated exploits in sandbox', async function () {
      // Create sandbox environment
      const env = await sandboxEnv.createEnvironment();

      // Generate exploit
      const exploit = await vulnGenerator.generateExploit(sampleVulnerability);

      // Execute in sandbox
      const result = await sandboxEnv.runExploit(
        {
          code: exploit.code,
          language: exploit.language,
        },
        env.id
      );

      expect(result).to.have.property('exploitId');
      expect(result).to.have.property('environmentId').that.equals(env.id);

      // Cleanup environment
      await sandboxEnv.stopEnvironment(env.id);
    });
  });

  describe('Protocol Testing & Research Workflow Integration', function () {
    it('should create finding from protocol test results', async function () {
      // Simulate protocol test results
      const testResults = {
        address: '0x1234567890123456789012345678901234567890',
        tokenId: 1,
        metadataCompliance: {
          compliant: false,
          missingRequiredFields: ['description'],
        },
        timestamp: new Date().toISOString(),
      };

      // Create finding from test results
      const finding = workflow.createFinding({
        title: 'NFT Metadata Compliance Issues',
        description: `NFT contract ${testResults.address} has incomplete metadata`,
        severity: 'medium',
        vulnerabilityType: 'NFT Standard Compliance',
        impact: 'Poor marketplace compatibility and user experience',
      });

      expect(finding).to.have.property('id');
      expect(finding).to.have.property('title').that.equals('NFT Metadata Compliance Issues');
      expect(finding).to.have.property('severity').that.equals('medium');
    });
  });

  describe('Education & Collaboration Integration', function () {
    it('should create tutorial based on research findings', async function () {
      // First create a finding
      const finding = workflow.createFinding({
        title: 'Reentrancy Vulnerability Example',
        description: 'An example of a reentrancy vulnerability',
        severity: 'high',
        vulnerabilityType: 'reentrancy',
        impact: 'Potential theft of funds',
        codeSnippets: [
          {
            code: sampleVulnerability.code,
            language: 'solidity',
          },
        ],
      });

      // Create tutorial based on finding
      const tutorial = tutorialManager.createTutorial({
        title: 'Understanding Reentrancy Attacks',
        description: 'Learn how to identify and prevent reentrancy vulnerabilities',
        difficulty: 'intermediate',
        categories: ['smart-contract-security', 'common-vulnerabilities'],
        sections: [
          {
            title: 'Introduction to Reentrancy',
            type: 'content',
            content:
              'Reentrancy is a vulnerability that occurs when external contract calls are allowed to make new calls back to the calling contract before the first execution is complete.',
          },
          {
            title: 'Vulnerable Code Example',
            type: 'code',
            content: finding.codeSnippets[0].code,
            language: 'solidity',
          },
          {
            title: 'Fixed Implementation',
            type: 'code',
            content:
              'function withdraw() public {\n  uint amount = balances[msg.sender];\n  balances[msg.sender] = 0;\n  (bool success, ) = msg.sender.call{value: amount}("");\n  require(success);\n}',
            language: 'solidity',
          },
        ],
      });

      expect(tutorial).to.have.property('id');
      expect(tutorial).to.have.property('title').that.equals('Understanding Reentrancy Attacks');
      expect(tutorial.sections).to.have.length(3);
    });
  });
});
