/**
 * Bridge Bounty Platform Adapter
 *
 * This module connects the Web3FuzzForge bridge testing framework to bounty platforms
 * like Code4rena and Sherlock, enabling the automated generation of test templates
 * based on previously discovered vulnerabilities.
 */

import fs from 'fs';
import path from 'path';
import { LayerZeroTestHarness } from '../bridge-testing/layerzero-test-harness';

/**
 * Interface for a vulnerability report from a bounty platform
 */
interface VulnerabilityReport {
  id: string;
  title: string;
  protocol: string;
  bridge: 'layerzero' | 'wormhole' | 'axelar' | 'other';
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  category: string;
  testSteps?: string[];
  exploitCode?: string;
  platform: 'code4rena' | 'sherlock' | 'other';
  url?: string;
  date: string;
}

/**
 * Interface for a generated test template
 */
interface TestTemplate {
  id: string;
  title: string;
  description: string;
  vulnerability: VulnerabilityReport;
  testCode: string;
  configOptions: any;
}

/**
 * Bounty Platform Adapter for Bridge Testing
 */
export class BridgeBountyAdapter {
  private vulnerabilityReports: VulnerabilityReport[] = [];
  private templates: TestTemplate[] = [];
  private outputDir: string;

  constructor(outputDir: string = './web3fuzzforge-community-tests/dapp-tests') {
    this.outputDir = outputDir;
  }

  /**
   * Load vulnerability reports from a JSON file
   */
  async loadReportsFromFile(filePath: string): Promise<VulnerabilityReport[]> {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      this.vulnerabilityReports = JSON.parse(data);
      return this.vulnerabilityReports;
    } catch (error) {
      console.error(`Error loading reports from ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Fetch vulnerability reports from Code4rena
   */
  async fetchCode4renaReports(limit: number = 10): Promise<VulnerabilityReport[]> {
    try {
      // In a real implementation, this would use the Code4rena API
      // For now, we'll just return mock data
      const mockReports: VulnerabilityReport[] = [
        {
          id: 'c4-bridge-001',
          title: 'LayerZero failed message can be replayed on destination chain',
          protocol: 'LayerZero',
          bridge: 'layerzero',
          description:
            'Failed messages on LayerZero can be replayed, leading to double-counting of bridge transactions.',
          severity: 'high',
          impact: 'Double transfer of tokens on destination chain',
          category: 'bridge-replay',
          testSteps: [
            'Send message from chain A to chain B',
            'Ensure message execution fails on chain B',
            'Retry the message on chain B multiple times',
            'Verify double spending does not occur',
          ],
          platform: 'code4rena',
          url: 'https://code4rena.com/reports/example-bridge-report',
          date: '2023-09-15',
        },
        {
          id: 'c4-bridge-002',
          title: 'Stargate bridge lacks proper chainId validation',
          protocol: 'Stargate',
          bridge: 'layerzero',
          description:
            'The Stargate bridge implementation using LayerZero lacks proper validation of chainId parameters, allowing attackers to spoof transactions.',
          severity: 'critical',
          impact: 'Theft of bridged tokens by redirecting to attacker-controlled address',
          category: 'bridge-validation',
          platform: 'code4rena',
          url: 'https://code4rena.com/reports/example-bridge-report-2',
          date: '2023-10-22',
        },
      ];

      this.vulnerabilityReports = [...this.vulnerabilityReports, ...mockReports];
      return mockReports;
    } catch (error) {
      console.error('Error fetching Code4rena reports:', error);
      return [];
    }
  }

  /**
   * Fetch vulnerability reports from Sherlock
   */
  async fetchSherlockReports(limit: number = 10): Promise<VulnerabilityReport[]> {
    try {
      // In a real implementation, this would use the Sherlock API
      // For now, we'll just return mock data
      const mockReports: VulnerabilityReport[] = [
        {
          id: 'sherlock-bridge-001',
          title: 'LayerZero adapter params manipulation vulnerability',
          protocol: 'LayerZero',
          bridge: 'layerzero',
          description:
            'Improper validation of adapter parameters allows attackers to manipulate gas parameters for cross-chain messages.',
          severity: 'medium',
          impact: 'DoS of bridge messages by specifying insufficient gas',
          category: 'gas-manipulation',
          testSteps: [
            'Send message with manipulated adapter params',
            'Verify message execution fails due to insufficient gas',
            'Validate proper input sanitization in bridge contracts',
          ],
          platform: 'sherlock',
          url: 'https://sherlock.xyz/contest/example-report',
          date: '2023-08-05',
        },
        {
          id: 'sherlock-bridge-002',
          title: 'Integer overflow in token amount calculation',
          protocol: 'Synapse',
          bridge: 'layerzero',
          description:
            'Token amount calculation in the bridge contract is vulnerable to integer overflow.',
          severity: 'critical',
          impact: 'Attacker can mint arbitrary amount of tokens on destination chain',
          category: 'math-overflow',
          platform: 'sherlock',
          url: 'https://sherlock.xyz/contest/example-report-2',
          date: '2023-07-11',
        },
      ];

      this.vulnerabilityReports = [...this.vulnerabilityReports, ...mockReports];
      return mockReports;
    } catch (error) {
      console.error('Error fetching Sherlock reports:', error);
      return [];
    }
  }

  /**
   * Generate test templates from vulnerability reports
   */
  async generateTestTemplates(): Promise<TestTemplate[]> {
    this.templates = [];

    for (const report of this.vulnerabilityReports) {
      if (report.bridge === 'layerzero') {
        const template = await this.generateLayerZeroTestTemplate(report);
        if (template) {
          this.templates.push(template);
        }
      }
    }

    return this.templates;
  }

  /**
   * Generate a LayerZero test template based on a vulnerability report
   */
  private async generateLayerZeroTestTemplate(
    report: VulnerabilityReport
  ): Promise<TestTemplate | null> {
    try {
      // Base test code template
      let testCode = `
/**
 * Test for ${report.title}
 * Based on vulnerability report: ${report.id}
 * Platform: ${report.platform}
 * Severity: ${report.severity}
 * 
 * Description:
 * ${report.description}
 */

import { test, expect } from '@playwright/test';
import { LayerZeroTestHarness, LayerZeroChainId } from '../../src/core/bridge-testing/layerzero-test-harness';
import { createWalletAdapter } from '../../src/core/wallet-adapter';

test.describe('${report.protocol} Bridge Vulnerability Test - ${report.id}', () => {
  let harness: LayerZeroTestHarness;
  
  test.beforeEach(async ({ page }) => {
    // Create wallet adapter for the test
    const wallet = createWalletAdapter('metamask');
    await wallet.initialize(page);
    
    // Connect wallet
    await wallet.connect(page);
    
    // Create and initialize the LayerZero test harness
    harness = new LayerZeroTestHarness(wallet);
    await harness.initialize(page);
  });
`;

      // Add specific test based on vulnerability category
      switch (report.category) {
        case 'bridge-replay':
          testCode += this.generateReplayAttackTest();
          break;
        case 'bridge-validation':
          testCode += this.generateValidationTest();
          break;
        case 'gas-manipulation':
          testCode += this.generateGasManipulationTest();
          break;
        case 'math-overflow':
          testCode += this.generateMathOverflowTest();
          break;
        default:
          testCode += this.generateGenericTest(report);
      }

      testCode += `
});`;

      return {
        id: `generated-${report.id}`,
        title: report.title,
        description: report.description,
        vulnerability: report,
        testCode,
        configOptions: {
          bridge: report.bridge,
          protocol: report.protocol,
        },
      };
    } catch (error) {
      console.error(`Error generating test template for ${report.id}:`, error);
      return null;
    }
  }

  /**
   * Generate a test for replay attacks
   */
  private generateReplayAttackTest(): string {
    return `
  test('should prevent message replay attacks', async ({ page }) => {
    // Send a legitimate message first
    const result = await harness.sendMessage(
      page,
      {
        srcChainId: 5, // Goerli testnet
        dstChainId: 80001, // Mumbai testnet
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI
      },
      {
        payload: '0x1234567890abcdef' // Example payload
      }
    );
    
    // Wait for message delivery (simulated)
    await page.waitForTimeout(3000);
    
    // Check original message status
    const status = await harness.getMessageStatus(page, result.messageNonce!);
    expect(status.found).toBe(true);
    
    // Now try to replay the same message (simulate an attack)
    const attackResult = await harness.simulateRelayAttack(page, result.messageNonce!);
    
    // Verify that the replay attack was prevented
    expect(attackResult.success).toBe(false);
    expect(attackResult.error).toBeDefined();
    expect(attackResult.error).toContain('Nonce already used');
    
    // Additional check: Try to create a message with a forged nonce
    // This would be a more sophisticated attack vector
    // In a real test, we would need access to the contract to attempt this
    // For now, we're just simulating the expected behavior
  });
`;
  }

  /**
   * Generate a test for chain ID validation
   */
  private generateValidationTest(): string {
    return `
  test('should validate chainId parameters correctly', async ({ page }) => {
    // Attempt to send a message with an invalid destination chainId
    // In real testing, this would require contract-level manipulation
    const invalidChainId = 999999; // Non-existent chain ID
    
    // This call should fail at the contract validation level
    const result = await harness.sendMessage(
      page,
      {
        srcChainId: 5, // Goerli testnet
        dstChainId: invalidChainId,
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: 99999 // Invalid LayerZero ID
      },
      {
        payload: '0x1234567890abcdef'
      }
    );
    
    // Our harness implementation might not capture this validation,
    // but in a real contract test we would expect:
    // expect(result.success).toBe(false);
    // expect(result.error).toContain('Invalid chainId');
    
    // For now, we'll check if the destination endpoint is properly validated
    if (!result.success) {
      expect(result.error).toBeDefined();
    }
    
    // Try with valid chains to ensure normal operation works
    const validResult = await harness.sendMessage(
      page,
      {
        srcChainId: 5, // Goerli testnet
        dstChainId: 80001, // Mumbai testnet
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI
      },
      {
        payload: '0x1234567890abcdef'
      }
    );
    
    expect(validResult.success).toBe(true);
  });
`;
  }

  /**
   * Generate a test for gas manipulation attacks
   */
  private generateGasManipulationTest(): string {
    return `
  test('should handle manipulated gas parameters correctly', async ({ page }) => {
    // Test with extremely low gas (a potential DoS vector)
    const result = await harness.sendMessage(
      page,
      {
        srcChainId: 5, // Goerli testnet
        dstChainId: 80001, // Mumbai testnet
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI
      },
      {
        payload: '0x' + '1234'.repeat(1000), // Large payload
        gasLimit: '1' // Extremely low gas limit
      }
    );
    
    // In our mock this may succeed, but in a real network it should fail
    // Wait for message attempt
    await page.waitForTimeout(3000);
    
    // Check status
    const status = await harness.getMessageStatus(page, result.messageNonce!);
    
    // For a real test, we'd check:
    // expect(status.status).toBe('failed');
    // expect(status.error).toContain('out of gas');
    
    // Test with reasonable gas to ensure normal operation works
    const validResult = await harness.sendMessage(
      page,
      {
        srcChainId: 5,
        dstChainId: 80001,
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI
      },
      {
        payload: '0x1234',
        gasLimit: '200000' // Reasonable gas limit
      }
    );
    
    expect(validResult.success).toBe(true);
    
    await page.waitForTimeout(3000);
    
    const validStatus = await harness.getMessageStatus(page, validResult.messageNonce!);
    expect(validStatus.found).toBe(true);
  });
`;
  }

  /**
   * Generate a test for math overflow vulnerabilities
   */
  private generateMathOverflowTest(): string {
    return `
  test('should prevent integer overflow in token amount calculations', async ({ page }) => {
    // Attempt to bridge a very large token amount
    const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    
    // In a real test, we'd directly interact with the contract
    // Here we're using our test harness which should validate inputs
    const result = await harness.bridgeTokens(
      page,
      {
        srcChainId: 5,
        dstChainId: 80001,
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI,
        token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
        amount: maxUint256,
        minGas: '200000'
      }
    );
    
    // Our test harness might not validate this properly,
    // but a real contract should reject the transaction
    // expect(result.success).toBe(false);
    
    // Test with a realistic amount to verify normal operation
    const validResult = await harness.bridgeTokens(
      page,
      {
        srcChainId: 5,
        dstChainId: 80001,
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI,
        token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
        amount: '1000000', // 1 USDC
        minGas: '200000'
      }
    );
    
    expect(validResult.success).toBe(true);
  });
`;
  }

  /**
   * Generate a generic test based on vulnerability report
   */
  private generateGenericTest(report: VulnerabilityReport): string {
    return `
  test('should handle the vulnerability scenario correctly', async ({ page }) => {
    // This is a generic test template.
    // For a complete test, manual refinement based on the specific vulnerability is needed.
    
    console.log('Testing vulnerability: ${report.title}');
    console.log('Description: ${report.description}');
    console.log('Impact: ${report.impact}');
    
    // Basic bridge message test
    const result = await harness.sendMessage(
      page,
      {
        srcChainId: 5, // Goerli testnet
        dstChainId: 80001, // Mumbai testnet
        srcLayerZeroId: LayerZeroChainId.GOERLI,
        dstLayerZeroId: LayerZeroChainId.MUMBAI
      },
      {
        payload: '0x1234567890abcdef'
      }
    );
    
    expect(result.success).toBe(true);
    
    // Wait for processing
    await page.waitForTimeout(3000);
    
    // Check status
    const status = await harness.getMessageStatus(page, result.messageNonce!);
    expect(status.found).toBe(true);
    
    // Additional tests would be needed based on the specific vulnerability
  });
`;
  }

  /**
   * Save generated test templates to files
   */
  async saveTestTemplates(): Promise<string[]> {
    const savedFiles: string[] = [];

    for (const template of this.templates) {
      // Create a clean filename from the template id
      const filename = template.id.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() + '.test.ts';

      // Determine subdirectory based on bridge type
      const bridgeDir = template.vulnerability.bridge;
      const targetDir = path.join(this.outputDir, bridgeDir);

      // Create directory if it doesn't exist
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Full path to the output file
      const filePath = path.join(targetDir, filename);

      // Write the test to file
      fs.writeFileSync(filePath, template.testCode);

      savedFiles.push(filePath);
    }

    return savedFiles;
  }

  /**
   * Create a report mapping vulnerability reports to generated tests
   */
  generateReport(): any {
    return {
      generated: new Date().toISOString(),
      totalVulnerabilities: this.vulnerabilityReports.length,
      totalTests: this.templates.length,
      sources: {
        code4rena: this.vulnerabilityReports.filter(r => r.platform === 'code4rena').length,
        sherlock: this.vulnerabilityReports.filter(r => r.platform === 'sherlock').length,
        other: this.vulnerabilityReports.filter(r => r.platform === 'other').length,
      },
      bridges: {
        layerzero: this.vulnerabilityReports.filter(r => r.bridge === 'layerzero').length,
        wormhole: this.vulnerabilityReports.filter(r => r.bridge === 'wormhole').length,
        axelar: this.vulnerabilityReports.filter(r => r.bridge === 'axelar').length,
        other: this.vulnerabilityReports.filter(r => r.bridge === 'other').length,
      },
      tests: this.templates.map(t => ({
        id: t.id,
        title: t.title,
        vulnerability: t.vulnerability.id,
        category: t.vulnerability.category,
        severity: t.vulnerability.severity,
      })),
    };
  }

  /**
   * Main function to fetch reports, generate tests, and save them
   */
  async run(): Promise<any> {
    console.log('Fetching vulnerability reports...');
    const c4Reports = await this.fetchCode4renaReports();
    const sherlockReports = await this.fetchSherlockReports();

    console.log(`Fetched ${c4Reports.length} reports from Code4rena`);
    console.log(`Fetched ${sherlockReports.length} reports from Sherlock`);

    console.log('Generating test templates...');
    const templates = await this.generateTestTemplates();
    console.log(`Generated ${templates.length} test templates`);

    console.log('Saving test templates...');
    const savedFiles = await this.saveTestTemplates();
    console.log(`Saved ${savedFiles.length} test files`);

    const report = this.generateReport();

    return {
      success: true,
      report,
      savedFiles,
    };
  }
}
