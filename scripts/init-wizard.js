#!/usr/bin/env node

/**
 * Interactive Audityzer Init Wizard
 * Guides users through setting up their first security testing project
 */

const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

class AudityzerInitWizard {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.config = {
      projectName: '',
      template: '',
      chain: '',
      testTypes: [],
      wallet: '',
      outputFormat: '',
      setupFirebase: false,
      setupCI: false,
      aaMode: false,
      aaAddon: null
    };
  }

  async start() {

    try {
      await this.askProjectName();
      await this.askTemplate();
      await this.askChain();
      await this.askTestTypes();
      await this.askWallet();
      await this.askOutputFormat();
      await this.askFirebaseSetup();
      await this.askCISetup();
      
      if (this.config.template === 'aa') {
        await this.askAAAddon();
      }

      await this.generateProject();
      await this.showNextSteps();
    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}`));
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  async askProjectName() {
    const answer = await this.question(
      chalk.cyan('📁 What is your project name? ') + chalk.gray('(my-audit-project): ')
    );
    this.config.projectName = answer.trim() || 'my-audit-project';
  }

  async askTemplate() {

    const answer = await this.question(chalk.cyan('Choose (1-5): '));
    
    const templates = {
      '1': 'defi',
      '2': 'wallet', 
      '3': 'bridge',
      '4': 'aa',
      '5': 'general'
    };

    this.config.template = templates[answer] || 'defi';
    this.config.aaMode = this.config.template === 'aa';
  }

  async askChain() {

    const answer = await this.question(chalk.cyan('Choose (1-6): '));
    
    const chains = {
      '1': 'ethereum',
      '2': 'polygon',
      '3': 'arbitrum', 
      '4': 'optimism',
      '5': 'base',
      '6': 'local'
    };

    this.config.chain = chains[answer] || 'ethereum';
  }

  async askTestTypes() {
    
    const answer = await this.question(chalk.cyan('Test types: ') + chalk.gray('(reentrancy,oracle): '));
    
    if (answer.trim()) {
      this.config.testTypes = answer.split(',').map(t => t.trim());
    } else {
      this.config.testTypes = ['reentrancy', 'oracle'];
    }
  }

  async askWallet() {

    const answer = await this.question(chalk.cyan('Choose (1-4): '));
    
    const wallets = {
      '1': 'metamask',
      '2': 'coinbase',
      '3': 'walletconnect',
      '4': 'mock'
    };

    this.config.wallet = wallets[answer] || 'metamask';
  }

  async askOutputFormat() {

    const answer = await this.question(chalk.cyan('Choose (1-3): '));
    
    const formats = {
      '1': 'json',
      '2': 'html',
      '3': 'md'
    };

    this.config.outputFormat = formats[answer] || 'json';
  }

  async askFirebaseSetup() {
    const answer = await this.question(
      chalk.cyan('🔥 Set up Firebase for result storage? ') + chalk.gray('(y/N): ')
    );
    this.config.setupFirebase = answer.toLowerCase().startsWith('y');
  }

  async askCISetup() {
    const answer = await this.question(
      chalk.cyan('🔄 Set up CI/CD integration? ') + chalk.gray('(y/N): ')
    );
    this.config.setupCI = answer.toLowerCase().startsWith('y');
  }

  async askAAAddon() {

    const answer = await this.question(chalk.cyan('Choose (1-6): '));
    
    const addons = {
      '1': 'social-recovery',
      '2': 'counterfactual',
      '3': 'session-keys',
      '4': 'token-gating',
      '5': 'all',
      '6': null
    };

    this.config.aaAddon = addons[answer];
  }

  async generateProject() {

    // Create project directory
    const projectDir = path.resolve(this.config.projectName);
    await fs.ensureDir(projectDir);

    // Generate package.json
    await this.generatePackageJson(projectDir);

    // Generate configuration files
    await this.generateConfigFiles(projectDir);

    // Generate test templates
    await this.generateTestTemplates(projectDir);

    // Generate documentation
    await this.generateDocumentation(projectDir);

    // Setup Firebase if requested
    if (this.config.setupFirebase) {
      await this.setupFirebase(projectDir);
    }

    // Setup CI if requested
    if (this.config.setupCI) {
      await this.setupCI(projectDir);
    }

  }

  async generatePackageJson(projectDir) {
    const packageJson = {
      name: this.config.projectName,
      version: "1.0.0",
      description: `Security testing project for ${this.config.template} protocols`,
      main: "index.js",
      scripts: {
        "test": "audityzer run target",
        "test:mock": "audityzer run target --mock",
        "test:ci": "audityzer run target --ci",
        "benchmark": "audityzer benchmark",
        "report": "audityzer run target --report",
        "dashboard": "audityzer run target --dashboard"
      },
      dependencies: {
        "audityzer": "^1.1.2"
      },
      devDependencies: {
        "@playwright/test": "^1.41.2",
        "ethers": "^5.7.2"
      },
      keywords: ["security", "testing", "web3", this.config.template],
      author: "Generated by Audityzer",
      license: "MIT"
    };

    // Add AA-specific scripts if in AA mode
    if (this.config.aaMode) {
      packageJson.scripts["test:aa"] = "audityzer run target --aa";
      packageJson.scripts["test:aa:pimlico"] = "audityzer run target --pimlico";
      packageJson.scripts["aa:flow"] = "audityzer aa --flow";
      packageJson.scripts["aa:dashboard"] = "audityzer aa --dashboard";
      
      if (this.config.aaAddon && this.config.aaAddon !== 'all') {
        packageJson.scripts[`test:aa:${this.config.aaAddon}`] = `audityzer run target --aa --addon ${this.config.aaAddon}`;
      }
    }

    await fs.writeJSON(path.join(projectDir, 'package.json'), packageJson, { spaces: 2 });
  }

  async generateConfigFiles(projectDir) {
    // Generate audityzer.config.js
    const config = `module.exports = {
  // Project configuration
  projectName: '${this.config.projectName}',
  template: '${this.config.template}',
  
  // Testing configuration
  defaultChain: '${this.config.chain}',
  defaultWallet: '${this.config.wallet}',
  outputFormat: '${this.config.outputFormat}',
  
  // Test types to run by default
  testTypes: ${JSON.stringify(this.config.testTypes, null, 2)},
  
  // Account Abstraction configuration
  aa: {
    enabled: ${this.config.aaMode},
    addon: ${this.config.aaAddon ? `'${this.config.aaAddon}'` : 'null'},
    bundler: 'pimlico'
  },
  
  // Output configuration
  output: {
    directory: './reports',
    format: '${this.config.outputFormat}',
    includeTimestamp: true
  },
  
  // CI/CD configuration
  ci: {
    enabled: ${this.config.setupCI},
    platform: 'github', // or 'gitlab', 'circleci'
    reportFormat: 'json'
  }
};`;

    await fs.writeFile(path.join(projectDir, 'audityzer.config.js'), config);

    // Generate .env template
    const envTemplate = `# Audityzer Configuration
# Copy this to .env and fill in your values

# RPC URLs
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
ARBITRUM_RPC_URL=https://arbitrum-mainnet.infura.io/v3/YOUR_PROJECT_ID

# API Keys
INFURA_PROJECT_ID=your_infura_project_id
ALCHEMY_API_KEY=your_alchemy_api_key
${this.config.aaMode ? 'PIMLICO_API_KEY=your_pimlico_api_key' : ''}

# Wallet Configuration
PRIVATE_KEY=your_test_wallet_private_key
MNEMONIC=your_test_wallet_mnemonic

${this.config.setupFirebase ? `# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_API_KEY=your_firebase_api_key` : ''}

# Bug Bounty Platform Keys (optional)
IMMUNEFI_API_KEY=your_immunefi_api_key
HACKENPROOF_API_KEY=your_hackenproof_api_key
`;

    await fs.writeFile(path.join(projectDir, '.env.example'), envTemplate);
  }

  async generateTestTemplates(projectDir) {
    const testsDir = path.join(projectDir, 'tests');
    await fs.ensureDir(testsDir);

    // Generate basic test template
    const basicTest = `const { test, expect } = require('@playwright/test');

/**
 * ${this.config.template.toUpperCase()} Security Tests for ${this.config.projectName}
 * Generated by Audityzer Init Wizard
 */

test.describe('${this.config.projectName} Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Setup test environment
  });

  ${this.config.testTypes.map(testType => `
  test('${testType} vulnerability test', async ({ page }) => {
    // Test for ${testType} vulnerabilities
    
    // Add your test logic here
    expect(true).toBe(true); // Placeholder
  });`).join('')}

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});`;

    await fs.writeFile(path.join(testsDir, `${this.config.template}-security.test.js`), basicTest);

    // Generate AA-specific tests if in AA mode
    if (this.config.aaMode) {
      await this.generateAATests(testsDir);
    }
  }

  async generateAATests(testsDir) {
    const aaDir = path.join(testsDir, 'aa');
    await fs.ensureDir(aaDir);

    const aaTest = `const { test, expect } = require('@playwright/test');

/**
 * Account Abstraction Security Tests
 * Generated by Audityzer Init Wizard
 */

test.describe('Account Abstraction Security Tests', () => {
  test('UserOperation validation test', async ({ page }) => {
    // Add UserOp validation logic
    expect(true).toBe(true);
  });

  test('Paymaster security test', async ({ page }) => {
    // Add Paymaster security logic
    expect(true).toBe(true);
  });

  test('Bundler integration test', async ({ page }) => {
    // Add Bundler integration logic
    expect(true).toBe(true);
  });

  ${this.config.aaAddon && this.config.aaAddon !== 'all' ? `
  test('${this.config.aaAddon} addon test', async ({ page }) => {
    // Add ${this.config.aaAddon} specific logic
    expect(true).toBe(true);
  });` : ''}
});`;

    await fs.writeFile(path.join(aaDir, 'aa-security.test.js'), aaTest);
  }

  async generateDocumentation(projectDir) {
    const readme = `# ${this.config.projectName}

Security testing project generated by Audityzer Init Wizard.

## Configuration

- **Template**: ${this.config.template}
- **Primary Chain**: ${this.config.chain}
- **Test Types**: ${this.config.testTypes.join(', ')}
- **Wallet**: ${this.config.wallet}
- **Output Format**: ${this.config.outputFormat}
${this.config.aaMode ? `- **AA Mode**: Enabled${this.config.aaAddon ? ` (${this.config.aaAddon})` : ''}` : ''}

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Copy environment configuration:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Edit \`.env\` with your configuration values

4. Run your first test:
   \`\`\`bash
   npm test
   \`\`\`

## Available Scripts

- \`npm test\` - Run security tests
- \`npm run test:mock\` - Run tests in mock mode
- \`npm run test:ci\` - Run tests with CI output
- \`npm run benchmark\` - Run performance benchmarks
- \`npm run report\` - Generate detailed reports
- \`npm run dashboard\` - Generate interactive dashboard

${this.config.aaMode ? `
## Account Abstraction Scripts

- \`npm run test:aa\` - Run AA tests
- \`npm run test:aa:pimlico\` - Run AA tests with Pimlico
- \`npm run aa:flow\` - Generate UserOp flow diagrams
- \`npm run aa:dashboard\` - Generate AA dashboard
${this.config.aaAddon && this.config.aaAddon !== 'all' ? `- \`npm run test:aa:${this.config.aaAddon}\` - Run ${this.config.aaAddon} tests` : ''}
` : ''}

## Project Structure

\`\`\`
${this.config.projectName}/
├── tests/                 # Test files
${this.config.aaMode ? '│   └── aa/               # AA-specific tests' : ''}
├── reports/               # Generated reports
├── audityzer.config.js    # Audityzer configuration
├── .env.example           # Environment template
└── package.json           # Project dependencies
\`\`\`

## Next Steps

1. Review and customize the generated test files in \`tests/\`
2. Configure your RPC endpoints and API keys in \`.env\`
3. Run \`npm test\` to execute your first security audit
4. Check the \`reports/\` directory for results

## Documentation

- [Audityzer Documentation](https://github.com/Cyfrin/audityzer)
- [Security Testing Best Practices](https://github.com/Cyfrin/audityzer/docs)
${this.config.aaMode ? '- [Account Abstraction Testing Guide](https://github.com/Cyfrin/audityzer/docs/aa)' : ''}

## Support

If you need help, please check the [GitHub Issues](https://github.com/Cyfrin/audityzer/issues) or join our [Discord](https://discord.gg/audityzer).
`;

    await fs.writeFile(path.join(projectDir, 'README.md'), readme);
  }

  async setupFirebase(projectDir) {
    const firebaseConfig = {
      "projectId": "your-project-id",
      "apiKey": "your-api-key",
      "authDomain": "your-project-id.firebaseapp.com",
      "storageBucket": "your-project-id.appspot.com",
      "messagingSenderId": "123456789",
      "appId": "your-app-id"
    };

    await fs.writeJSON(path.join(projectDir, '.firebase-config.example.json'), firebaseConfig, { spaces: 2 });
    
  }

  async setupCI(projectDir) {
    const ciDir = path.join(projectDir, '.github', 'workflows');
    await fs.ensureDir(ciDir);

    const workflow = `name: Security Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run security tests
      run: npm run test:ci
      env:
        ETHEREUM_RPC_URL: \${{ secrets.ETHEREUM_RPC_URL }}
        ${this.config.aaMode ? 'PIMLICO_API_KEY: ${{ secrets.PIMLICO_API_KEY }}' : ''}
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: reports/
`;

    await fs.writeFile(path.join(ciDir, 'security-tests.yml'), workflow);
    
  }

  async showNextSteps() {
    
    
    if (this.config.aaMode) {
    }

    
    
    
    if (this.config.setupFirebase) {
    }
    
    
    
    if (this.config.aaMode) {
    }
    
    
  }

  question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }
}

// Run the wizard if called directly
if (require.main === module) {
  const wizard = new AudityzerInitWizard();
  wizard.start().catch(console.error);
}

module.exports = AudityzerInitWizard;
