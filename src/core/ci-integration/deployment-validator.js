/**
 * @fileoverview Contract Deployment Validator
 *
 * This module provides contract deployment validation, verification checking,
 * and monitoring for CI/CD pipelines.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { ethers } = require('ethers');

/**
 * Deployment Validator
 * Validates contract deployments and checks verification status on block explorers
 */
class DeploymentValidator {
  constructor(config = {}) {
    this.config = {
      networks: config.networks || ['mainnet', 'testnet'],
      contractsDir: config.contractsDir || './contracts',
      artifactsDir: config.artifactsDir || './artifacts',
      deploymentDir: config.deploymentDir || './deployments',
      etherscanApiKey: config.etherscanApiKey || process.env.ETHERSCAN_API_KEY,
      polygonscanApiKey: config.polygonscanApiKey || process.env.POLYGONSCAN_API_KEY,
      bscscanApiKey: config.bscscanApiKey || process.env.BSCSCAN_API_KEY,
      arbiscanApiKey: config.arbiscanApiKey || process.env.ARBISCAN_API_KEY,
      optimisticEtherscanApiKey:
        config.optimisticEtherscanApiKey || process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
      ftmscanApiKey: config.ftmscanApiKey || process.env.FTMSCAN_API_KEY,
      avalancheApiKey: config.avalancheApiKey || process.env.AVALANCHE_API_KEY,
      baseApiKey: config.baseApiKey || process.env.BASE_API_KEY,
      zkSyncApiKey: config.zkSyncApiKey || process.env.ZKSYNC_API_KEY,
      lineaApiKey: config.lineaApiKey || process.env.LINEA_API_KEY,
      polygonZkEvmApiKey: config.polygonZkEvmApiKey || process.env.POLYGON_ZKEVM_API_KEY,
      checkVerification: config.checkVerification !== false,
      outputDir: config.outputDir || './test-results/deployment',
      ...config,
    };

    this.results = {
      deployments: [],
      verification: [],
      securityIssues: [],
    };

    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }
  }

  /**
   * Scan for deployment files
   * @returns {Array} List of deployment files
   */
  scanDeployments() {
    const deployments = [];

    if (!fs.existsSync(this.config.deploymentDir)) {
      console.warn(`Deployment directory not found: ${this.config.deploymentDir}`);
      return deployments;
    }

    // Scan all subdirectories for deployment files
    const networks = fs.readdirSync(this.config.deploymentDir);

    for (const network of networks) {
      const networkPath = path.join(this.config.deploymentDir, network);

      if (fs.statSync(networkPath).isDirectory()) {
        const files = fs.readdirSync(networkPath);

        for (const file of files) {
          if (file.endsWith('.json')) {
            try {
              const filePath = path.join(networkPath, file);
              const deploymentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

              deployments.push({
                network,
                contractName: path.basename(file, '.json'),
                address: deploymentData.address,
                deployer: deploymentData.deployer || deploymentData.from,
                timestamp: deploymentData.timestamp || deploymentData.deployTime || null,
                transactionHash: deploymentData.transactionHash || deploymentData.txHash || null,
                filePath,
              });
            } catch (error) {
              console.error(
                `Error parsing deployment file ${path.join(networkPath, file)}:`,
                error
              );
            }
          }
        }
      }
    }

    this.results.deployments = deployments;
    return deployments;
  }

  /**
   * Check if contracts are verified on block explorers
   * @returns {Array} Verification results
   */
  async checkContractVerification() {
    const verification = [];

    if (!this.results.deployments || this.results.deployments.length === 0) {
      await this.scanDeployments();
    }

    for (const deployment of this.results.deployments) {
      const { network, contractName, address } = deployment;

      // Skip if empty address
      if (!address || address === '0x0000000000000000000000000000000000000000') {
        verification.push({
          ...deployment,
          verified: false,
          status: 'Invalid address',
          error: 'Deployment address is invalid or zero address',
        });
        continue;
      }

      try {
        // Determine the appropriate API key and endpoint based on the network
        let apiKey, apiUrl, chainName;

        switch (network.toLowerCase()) {
          case 'mainnet':
          case 'goerli':
          case 'sepolia':
            apiKey = this.config.etherscanApiKey;
            apiUrl =
              network.toLowerCase() === 'mainnet'
                ? 'https://api.etherscan.io/api'
                : `https://api-${network.toLowerCase()}.etherscan.io/api`;
            chainName =
              network.toLowerCase() === 'mainnet' ? 'Ethereum Mainnet' : `Ethereum ${network}`;
            break;

          case 'polygon':
          case 'mumbai':
            apiKey = this.config.polygonscanApiKey;
            apiUrl =
              network.toLowerCase() === 'polygon'
                ? 'https://api.polygonscan.com/api'
                : 'https://api-mumbai.polygonscan.com/api';
            chainName = network.toLowerCase() === 'polygon' ? 'Polygon Mainnet' : 'Polygon Mumbai';
            break;

          case 'bsc':
          case 'bsc_testnet':
            apiKey = this.config.bscscanApiKey;
            apiUrl =
              network.toLowerCase() === 'bsc'
                ? 'https://api.bscscan.com/api'
                : 'https://api-testnet.bscscan.com/api';
            chainName = network.toLowerCase() === 'bsc' ? 'BSC Mainnet' : 'BSC Testnet';
            break;

          case 'arbitrum':
          case 'arbitrum_goerli':
            apiKey = this.config.arbiscanApiKey;
            apiUrl =
              network.toLowerCase() === 'arbitrum'
                ? 'https://api.arbiscan.io/api'
                : 'https://api-goerli.arbiscan.io/api';
            chainName = network.toLowerCase() === 'arbitrum' ? 'Arbitrum One' : 'Arbitrum Goerli';
            break;

          case 'optimism':
          case 'optimism_goerli':
            apiKey = this.config.optimisticEtherscanApiKey;
            apiUrl =
              network.toLowerCase() === 'optimism'
                ? 'https://api-optimistic.etherscan.io/api'
                : 'https://api-goerli-optimistic.etherscan.io/api';
            chainName =
              network.toLowerCase() === 'optimism' ? 'Optimism Mainnet' : 'Optimism Goerli';
            break;

          case 'fantom':
          case 'fantom_testnet':
            apiKey = this.config.ftmscanApiKey;
            apiUrl =
              network.toLowerCase() === 'fantom'
                ? 'https://api.ftmscan.com/api'
                : 'https://api-testnet.ftmscan.com/api';
            chainName = network.toLowerCase() === 'fantom' ? 'Fantom Opera' : 'Fantom Testnet';
            break;

          case 'avalanche':
          case 'avalanche_fuji':
            apiKey = this.config.avalancheApiKey;
            apiUrl =
              network.toLowerCase() === 'avalanche'
                ? 'https://api.snowtrace.io/api'
                : 'https://api-testnet.snowtrace.io/api';
            chainName =
              network.toLowerCase() === 'avalanche' ? 'Avalanche C-Chain' : 'Avalanche Fuji';
            break;

          case 'base':
          case 'base_goerli':
            apiKey = this.config.baseApiKey;
            apiUrl =
              network.toLowerCase() === 'base'
                ? 'https://api.basescan.org/api'
                : 'https://api-goerli.basescan.org/api';
            chainName = network.toLowerCase() === 'base' ? 'Base Mainnet' : 'Base Goerli';
            break;

          case 'zksync':
          case 'zksync_era':
          case 'zksync_testnet':
          case 'zksync_era_testnet':
            apiKey = this.config.zkSyncApiKey;
            apiUrl = network.toLowerCase().includes('testnet')
              ? 'https://explorer.era.zksync.dev/api'
              : 'https://block-explorer-api.mainnet.zksync.io/api';
            chainName = network.toLowerCase().includes('testnet')
              ? 'zkSync Era Testnet'
              : 'zkSync Era Mainnet';
            break;

          case 'linea':
          case 'linea_testnet':
          case 'linea_goerli':
            apiKey = this.config.lineaApiKey;
            apiUrl =
              network.toLowerCase().includes('testnet') || network.toLowerCase().includes('goerli')
                ? 'https://explorer.goerli.linea.build/api'
                : 'https://api.lineascan.build/api';
            chainName =
              network.toLowerCase().includes('testnet') || network.toLowerCase().includes('goerli')
                ? 'Linea Testnet'
                : 'Linea Mainnet';
            break;

          case 'polygon_zkevm':
          case 'polygon_zkevm_testnet':
          case 'polygon_zkEvm':
          case 'polygon_zkEvm_testnet':
            apiKey = this.config.polygonZkEvmApiKey;
            apiUrl = network.toLowerCase().includes('testnet')
              ? 'https://api-testnet-zkevm.polygonscan.com/api'
              : 'https://api-zkevm.polygonscan.com/api';
            chainName = network.toLowerCase().includes('testnet')
              ? 'Polygon zkEVM Testnet'
              : 'Polygon zkEVM Mainnet';
            break;

          default:
            verification.push({
              ...deployment,
              verified: false,
              status: 'Unsupported network',
              error: `Network ${network} not supported for verification checks`,
            });
            continue;
        }

        if (!apiKey) {
          verification.push({
            ...deployment,
            verified: false,
            status: 'API key missing',
            error: `API key for ${chainName} is not configured`,
          });
          continue;
        }

        // Query the API to check if the contract is verified
        const response = await axios.get(apiUrl, {
          params: {
            module: 'contract',
            action: 'getsourcecode',
            address,
            apikey: apiKey,
          },
        });

        if (
          response.data.status === '1' &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          const contractData = response.data.result[0];
          const isVerified = contractData.SourceCode && contractData.SourceCode.length > 0;

          verification.push({
            ...deployment,
            verified: isVerified,
            status: isVerified ? 'Verified' : 'Not verified',
            contractName: contractData.ContractName || contractName,
            sourcecode: isVerified,
            abi: contractData.ABI && contractData.ABI !== 'Contract source code not verified',
            chain: chainName,
            compiler: contractData.CompilerVersion || null,
            optimizationUsed: contractData.OptimizationUsed || null,
            runs: contractData.Runs || null,
            constructorArguments: contractData.ConstructorArguments || null,
          });
        } else {
          verification.push({
            ...deployment,
            verified: false,
            status: 'API error',
            chain: chainName,
            error: response.data.message || 'Unknown error from block explorer API',
          });
        }
      } catch (error) {
        verification.push({
          ...deployment,
          verified: false,
          status: 'Error',
          error: error.message,
        });
      }
    }

    this.results.verification = verification;
    return verification;
  }

  /**
   * Check for security issues in deployed contracts
   * @returns {Array} Security issues
   */
  async checkSecurityIssues() {
    const securityIssues = [];

    if (!this.results.verification || this.results.verification.length === 0) {
      if (this.config.checkVerification) {
        await this.checkContractVerification();
      } else {
        if (!this.results.deployments || this.results.deployments.length === 0) {
          await this.scanDeployments();
        }
      }
    }

    // Check for unverified contracts
    const unverifiedContracts = this.results.verification.filter(v => !v.verified);
    if (unverifiedContracts.length > 0) {
      securityIssues.push({
        id: 'unverified-contracts',
        title: 'Unverified Contracts Detected',
        description:
          'Some contracts are not verified on block explorers, which reduces transparency and auditability.',
        severity: 'medium',
        category: 'transparency',
        impact:
          'Reduces transparency and makes it difficult for users and auditors to review the contract code.',
        affected_contracts: unverifiedContracts.map(c => ({
          name: c.contractName,
          address: c.address,
          network: c.network,
        })),
        recommendation:
          'Verify all deployed contracts on block explorers with matching source code and compiler settings.',
      });
    }

    // Check for mainnet deployments with recent testnet deployments
    const mainnetDeployments = this.results.deployments.filter(d =>
      ['mainnet', 'polygon', 'bsc', 'arbitrum', 'optimism', 'fantom', 'avalanche', 'base'].includes(
        d.network.toLowerCase()
      )
    );

    for (const mainnetDeploy of mainnetDeployments) {
      const testnetDeployments = this.results.deployments.filter(
        d =>
          d.contractName === mainnetDeploy.contractName &&
          ![
            'mainnet',
            'polygon',
            'bsc',
            'arbitrum',
            'optimism',
            'fantom',
            'avalanche',
            'base',
          ].includes(d.network.toLowerCase())
      );

      if (testnetDeployments.length === 0) {
        securityIssues.push({
          id: `no-testnet-deployment-${mainnetDeploy.contractName}`,
          title: `No Testnet Deployment Found for ${mainnetDeploy.contractName}`,
          description: `Contract ${mainnetDeploy.contractName} was deployed to ${mainnetDeploy.network} with no prior testnet deployment found.`,
          severity: 'low',
          category: 'deployment-process',
          impact: 'May indicate insufficient testing before mainnet deployment.',
          affected_contracts: [
            {
              name: mainnetDeploy.contractName,
              address: mainnetDeploy.address,
              network: mainnetDeploy.network,
            },
          ],
          recommendation:
            'Always deploy and thoroughly test contracts on testnets before mainnet deployment.',
        });
      }
    }

    this.results.securityIssues = securityIssues;
    return securityIssues;
  }

  /**
   * Generate a deployment validation report
   * @param {string} outputPath - Path to write the report
   * @returns {Object} Report data
   */
  async generateReport(outputPath = '') {
    // Ensure we have all the data
    if (!this.results.deployments || this.results.deployments.length === 0) {
      await this.scanDeployments();
    }

    if (
      this.config.checkVerification &&
      (!this.results.verification || this.results.verification.length === 0)
    ) {
      await this.checkContractVerification();
    }

    if (!this.results.securityIssues || this.results.securityIssues.length === 0) {
      await this.checkSecurityIssues();
    }

    // Create the report structure
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalDeployments: this.results.deployments.length,
        verifiedContracts: this.results.verification.filter(v => v.verified).length,
        unverifiedContracts: this.results.verification.filter(v => !v.verified).length,
        securityIssues: this.results.securityIssues.length,
      },
      deployments: this.results.deployments,
      verification: this.results.verification,
      securityIssues: this.results.securityIssues,
    };

    // Write the report to file if outputPath is provided
    if (outputPath) {
      const reportPath = outputPath;
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`Deployment validation report saved to ${reportPath}`);

      // Generate Markdown report
      const mdReportPath = outputPath.replace(/\.json$/, '.md');
      await this.generateMarkdownReport(mdReportPath);
    }

    return report;
  }

  /**
   * Generate a Markdown version of the deployment validation report
   * @param {string} outputPath - Path to write the Markdown report
   * @returns {string} Markdown report content
   */
  async generateMarkdownReport(outputPath = '') {
    // Ensure we have all data
    if (
      !this.results.deployments ||
      this.results.deployments.length === 0 ||
      !this.results.verification ||
      !this.results.securityIssues
    ) {
      await this.generateReport(); // This will collect all required data
    }

    // Generate markdown content
    let markdown = '# Deployment Validation Report\n\n';
    markdown += `Generated: ${new Date().toISOString()}\n\n`;

    // Summary section
    markdown += '## Summary\n\n';
    markdown += `- Total Deployments: ${this.results.deployments.length}\n`;
    markdown += `- Verified Contracts: ${this.results.verification.filter(v => v.verified).length}\n`;
    markdown += `- Unverified Contracts: ${this.results.verification.filter(v => !v.verified).length}\n`;
    markdown += `- Security Issues: ${this.results.securityIssues.length}\n\n`;

    // Security issues section
    if (this.results.securityIssues.length > 0) {
      markdown += '## Security Issues\n\n';

      this.results.securityIssues.forEach((issue, index) => {
        markdown += `### ${index + 1}. ${issue.title}\n\n`;
        markdown += `**Severity**: ${issue.severity}\n\n`;
        markdown += `**Description**: ${issue.description}\n\n`;
        markdown += `**Impact**: ${issue.impact}\n\n`;

        if (issue.affected_contracts && issue.affected_contracts.length > 0) {
          markdown += '**Affected Contracts**:\n\n';
          issue.affected_contracts.forEach(contract => {
            markdown += `- ${contract.name} (${contract.network}): \`${contract.address}\`\n`;
          });
          markdown += '\n';
        }

        markdown += `**Recommendation**: ${issue.recommendation}\n\n`;
        markdown += '---\n\n';
      });
    }

    // Deployments section
    markdown += '## Deployments\n\n';
    markdown += '| Contract | Network | Address | Deployer | Verified |\n';
    markdown += '|----------|---------|---------|----------|----------|\n';

    this.results.deployments.forEach(deployment => {
      const verification = this.results.verification.find(
        v => v.contractName === deployment.contractName && v.address === deployment.address
      );

      markdown += `| ${deployment.contractName} | ${deployment.network} | \`${deployment.address}\` | \`${deployment.deployer || 'Unknown'}\` | ${verification && verification.verified ? '✅' : '❌'} |\n`;
    });

    markdown += '\n';

    // Write the markdown report to file if outputPath is provided
    if (outputPath) {
      fs.writeFileSync(outputPath, markdown);
      console.log(`Markdown deployment validation report saved to ${outputPath}`);
    }

    return markdown;
  }

  /**
   * Run the full deployment validation process
   * @param {Object} options - Additional options for validation
   * @returns {Object} Report data
   */
  async run(options = {}) {
    console.log('Running deployment validation...');

    // Update config with any provided options
    this.config = {
      ...this.config,
      ...options,
    };

    // Scan for deployments
    console.log('Scanning for deployments...');
    const deployments = await this.scanDeployments();
    console.log(`Found ${deployments.length} deployments.`);

    // Check contract verification if enabled
    if (this.config.checkVerification) {
      console.log('Checking contract verification...');
      const verification = await this.checkContractVerification();
      console.log(
        `Verification complete. ${verification.filter(v => v.verified).length}/${verification.length} contracts verified.`
      );
    }

    // Check for security issues
    console.log('Checking for security issues...');
    const securityIssues = await this.checkSecurityIssues();
    console.log(`Found ${securityIssues.length} security issues.`);

    // Generate the report
    const outputPath =
      options.outputPath || path.join(this.config.outputDir, 'validation-report.json');
    const report = await this.generateReport(outputPath);

    console.log(`Deployment validation complete. Report saved to ${outputPath}`);
    return report;
  }
}

module.exports = { DeploymentValidator };
