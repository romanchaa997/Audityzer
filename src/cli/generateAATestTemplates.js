/**
 * Account Abstraction Test Template Generator
 * Generates template files for testing ERC-4337 implementations
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Generate Account Abstraction test templates
 * @param {Object} options Options for template generation
 * @param {string} options.addon Optional addon type (social-recovery, counterfactual, session-keys, token-gating)
 * @returns {Object} Generated templates information
 */
function generateAATestTemplates(options = {}) {
  const templates = [
    {
      name: 'aa-userop-basic.test.js',
      content: `
// Fuzzing malformed UserOperation inputs
describe('UserOperation Validation', () => {
  it('should revert on invalid signature format', async () => {
    const malformedUserOp = {
      sender: user.address,
      nonce: 999,
      callData: "0xdeadbeef",
      signature: "0x1234", // Invalid
      // ...
    };
    await expect(entryPoint.handleOps([malformedUserOp], beneficiary)).to.be.reverted;
  });
});
      `,
    },
    {
      name: 'aa-paymaster-gas.test.js',
      content: `
// Fuzzing Paymaster gas sponsorship logic
describe('Paymaster Abuse', () => {
  it('should fail under underpriced sponsorship', async () => {
    const op = await createSponsoredUserOp({ gasLimit: 10000 }); // Underpriced
    await expect(entryPoint.handleOps([op], beneficiary)).to.be.reverted;
  });
});
      `,
    },
    {
      name: 'aa-bundler-attack.test.js',
      content: `
// Bundler queue manipulation test
describe('Bundler Attack Simulation', () => {
  it('should detect replayed or spammed UserOps', async () => {
    for (let i = 0; i < 100; i++) {
      const op = await createValidUserOp({ nonce: 123 }); // Same nonce
      await entryPoint.handleOps([op], beneficiary);
    }
    // Check logs for bundler overload or replays
  });
});
      `,
    }
  ];

  // Create target directories
  const targetDir = path.join(process.cwd(), 'tests', 'aa');
  fs.ensureDirSync(targetDir);
  
  // For examples directory (where our detailed implementations already exist)
  const examplesDir = path.join(process.cwd(), 'examples', 'security-bug-tests');
  fs.ensureDirSync(examplesDir);

  // Generate basic templates for tests/aa
  templates.forEach(({ name, content }) => {
    const filePath = path.join(targetDir, name);
    // Only write if file doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim());
      console.log(chalk.green(` Created template: ${name}`));
    } else {
      console.log(chalk.yellow(` Template already exists: ${name}`));
    }
  });

  // Copy more comprehensive implementations to examples/security-bug-tests if they don't exist
  const detailedTemplates = [
    {
      src: path.join(__dirname, '../../examples/security-bug-tests/aa-userop-basic.test.js'),
      dest: path.join(examplesDir, 'aa-userop-basic.test.js'),
      fallback: path.join(__dirname, '../../templates/aa-tests/aa-userop-basic.test.js')
    },
    {
      src: path.join(__dirname, '../../examples/security-bug-tests/aa-paymaster-gas.test.js'),
      dest: path.join(examplesDir, 'aa-paymaster-gas.test.js'),
      fallback: path.join(__dirname, '../../templates/aa-tests/aa-paymaster-gas.test.js')
    },
    {
      src: path.join(__dirname, '../../examples/security-bug-tests/aa-bundler-attack.test.js'),
      dest: path.join(examplesDir, 'aa-bundler-attack.test.js'),
      fallback: path.join(__dirname, '../../templates/aa-tests/aa-bundler-attack.test.js')
    },
    {
      src: path.join(__dirname, '../../examples/security-bug-tests/aa-simulation-mode.test.js'),
      dest: path.join(examplesDir, 'aa-simulation-mode.test.js'),
      fallback: path.join(__dirname, '../../templates/aa-tests/aa-simulation-mode.test.js')
    }
  ];

  detailedTemplates.forEach(({ src, dest, fallback }) => {
    if (fs.existsSync(src)) {
      if (!fs.existsSync(dest)) {
        fs.copySync(src, dest);
        console.log(chalk.green(` Copied detailed implementation: ${path.basename(dest)}`));
      } else {
        console.log(chalk.yellow(` Detailed implementation already exists: ${path.basename(dest)}`));
      }
    } else if (fs.existsSync(fallback)) {
      if (!fs.existsSync(dest)) {
        fs.copySync(fallback, dest);
        console.log(chalk.green(` Used fallback template for: ${path.basename(dest)}`));
      } else {
        console.log(chalk.yellow(` Detailed implementation already exists: ${path.basename(dest)}`));
      }
    } else {
      console.log(chalk.red(` Missing template for: ${path.basename(dest)}`));
    }
  });

  // Handle addon templates if requested
  let addonInfo = null;
  if (options && options.addon) {
    const addon = options.addon.toLowerCase();
    const validAddons = ['social-recovery', 'counterfactual', 'session-keys', 'token-gating'];
    
    if (validAddons.includes(addon)) {
      // Map addon to filename
      const addonMap = {
        'social-recovery': 'aa-social-recovery.test.js',
        'counterfactual': 'aa-counterfactual-wallets.test.js',
        'session-keys': 'aa-session-keys.test.js',
        'token-gating': 'aa-token-gating.test.js'
      };
      
      const addonTemplateFile = path.join(__dirname, '../../templates/aa-tests', addonMap[addon]);
      const targetFile = path.join(targetDir, addonMap[addon]);
      
      if (fs.existsSync(addonTemplateFile)) {
        if (!fs.existsSync(targetFile)) {
          fs.copySync(addonTemplateFile, targetFile);
          console.log(chalk.green(` Created ${addon} addon template: ${addonMap[addon]}`));
          
          // Also copy to examples directory
          const exampleFile = path.join(examplesDir, addonMap[addon]);
          if (!fs.existsSync(exampleFile)) {
            fs.copySync(addonTemplateFile, exampleFile);
            console.log(chalk.green(` Copied ${addon} addon to examples: ${addonMap[addon]}`));
          }
        } else {
          console.log(chalk.yellow(` ${addon} addon template already exists: ${addonMap[addon]}`));
        }
        
        addonInfo = {
          type: addon,
          filename: addonMap[addon]
        };
      } else {
        console.log(chalk.red(` Missing addon template for: ${addon}`));
      }
    } else {
      console.log(chalk.yellow(` Unknown addon: ${addon}. Valid values are: ${validAddons.join(', ')}`));
    }
  }

  console.log(chalk.blue('\n AA Test templates ready. Run them with:'));
  console.log(chalk.yellow(' npm run test:security "examples/security-bug-tests/aa-*.test.js"\n'));
  
  return { addonInfo };
}

/**
 * Generate an AA report with the specified test results
 * @param {Object} results - Test results
 * @param {Object} options - Report options
 * @param {boolean} options.pimlico - Whether Pimlico mode is enabled
 * @param {string} options.addon - Optional addon type used
 * @param {boolean} options.ci - Whether to output in CI-friendly format
 * @param {Object} options.pimlicoData - Optional Pimlico API data for report
 * @returns {Promise<Object>} Report information including path
 */
async function generateAAReport(results = {}, options = {}) {
  // Set up report filename
  const reportBase = options.ci ? 'report-aa' : 'report-aa.md';
  const reportExt = options.ci ? '.json' : '';
  const reportPath = path.join(process.cwd(), `${reportBase}${reportExt}`);
  
  // Determine addon section if present
  let addonSection = '';
  if (options.addon) {
    addonSection = `\n## ${options.addon.charAt(0).toUpperCase() + options.addon.slice(1).replace(/-/g, ' ')} Tests\n`;
    
    // Add appropriate section based on addon type
    switch(options.addon) {
      case 'social-recovery':
        addonSection += `- Guardian Management: ${results['social-recovery']?.status || 'Not tested'}\n`;
        addonSection += `- Recovery Process: ${results['social-recovery']?.status || 'Not tested'}\n`;
        addonSection += `- Security Verification: ${results['social-recovery']?.status || 'Not tested'}\n`;
        break;
      case 'counterfactual':
        addonSection += `- Address Derivation: ${results['counterfactual']?.status || 'Not tested'}\n`;
        addonSection += `- First-time Deployment: ${results['counterfactual']?.status || 'Not tested'}\n`;
        addonSection += `- Gas Optimization: ${results['counterfactual']?.status || 'Not tested'}\n`;
        break;
      case 'session-keys':
        addonSection += `- Session Key Registration: ${results['session-keys']?.status || 'Not tested'}\n`;
        addonSection += `- Session Key Operations: ${results['session-keys']?.status || 'Not tested'}\n`;
        addonSection += `- Security Boundaries: ${results['session-keys']?.status || 'Not tested'}\n`;
        break;
      case 'token-gating':
        addonSection += `- Token Verification: ${results['token-gating']?.status || 'Not tested'}\n`;
        addonSection += `- Access Control: ${results['token-gating']?.status || 'Not tested'}\n`;
        addonSection += `- NFT Integration: ${results['token-gating']?.status || 'Not tested'}\n`;
        break;
    }
  }
  
  // Add Pimlico API data section if available
  let pimlicoSection = '';
  if (options.pimlicoData) {
    pimlicoSection = `\n## Pimlico API Data\n`;
    pimlicoSection += `- Gas Parameters: ${options.pimlicoData.gasParams ? 'Available' : 'Not available'}\n`;
    pimlicoSection += `- EntryPoint Metadata: ${options.pimlicoData.entryPointMeta ? 'Available' : 'Not available'}\n`;
    
    if (options.pimlicoData.gasParams) {
      pimlicoSection += `\n### Suggested Gas Parameters\n`;
      pimlicoSection += `- Max Fee Per Gas: ${options.pimlicoData.gasParams.maxFeePerGas || 'N/A'}\n`;
      pimlicoSection += `- Max Priority Fee Per Gas: ${options.pimlicoData.gasParams.maxPriorityFeePerGas || 'N/A'}\n`;
      pimlicoSection += `- Verification Gas Limit: ${options.pimlicoData.gasParams.verificationGasLimit || 'N/A'}\n`;
    }
  }
  
  // Generate markdown report content
  const mdContent = `
# Account Abstraction Fuzz Report

- UserOperation Signature Validation: ${results.userop?.status || 'Not tested'}
- Paymaster Gas Sponsorship: ${results.paymaster?.status || 'Not tested'} 
- Bundler Queue Robustness: ${results.bundler?.status || 'Not tested'}
${addonSection}
**AA Compatibility**: ${options.pimlico ? 'Pimlico-compatible' : 'Standard ERC-4337'}
**Suggested Fixes**:
- Ensure valid signature formats
- Prevent abuse via strict Paymaster limits
- Use different nonces for UserOps
${options.addon ? `- Follow best practices for ${options.addon.replace(/-/g, ' ')}` : ''}
${pimlicoSection}
${results.vulnerabilities ? `
## Detected Vulnerabilities
${results.vulnerabilities.map(v => `- ${v.type}: ${v.description}`).join('\n')}
` : ''}

Generated by Web3FuzzForge --aa ${options.pimlico ? '--pimlico' : ''} ${options.addon ? `--addon ${options.addon}` : ''}
`;

  // For CI output, generate JSON format
  if (options.ci) {
    const jsonReport = {
      timestamp: new Date().toISOString(),
      tests: {
        userop: results.userop || { status: 'Not tested' },
        paymaster: results.paymaster || { status: 'Not tested' },
        bundler: results.bundler || { status: 'Not tested' }
      },
      compatibility: options.pimlico ? 'Pimlico-compatible' : 'Standard ERC-4337',
      vulnerabilities: results.vulnerabilities || [],
      summary: {
        status: results.vulnerabilities && results.vulnerabilities.length > 0 ? 'FAIL' : 'PASS',
        testedComponents: {
          userop: results.userop?.status === 'Tested',
          paymaster: results.paymaster?.status === 'Tested',
          bundler: results.bundler?.status === 'Tested'
        }
      }
    };
    
    // Add addon data if present
    if (options.addon) {
      jsonReport.tests[options.addon] = results[options.addon] || { status: 'Not tested' };
      jsonReport.summary.testedComponents[options.addon] = results[options.addon]?.status === 'Tested';
    }
    
    // Add Pimlico data if present
    if (options.pimlicoData) {
      jsonReport.pimlicoData = options.pimlicoData;
    }
    
    await fs.writeJSON(reportPath, jsonReport, { spaces: 2 });
    console.log(chalk.green('📄 AA JSON Report generated: ') + reportPath);
  } else {
    // Write markdown report
    await fs.writeFile(reportPath, mdContent);
    console.log(chalk.green('📄 AA Report generated: ') + reportPath);
  }
  
  return { 
    path: reportPath, 
    format: options.ci ? 'json' : 'markdown',
    addon: options.addon
  };
}

module.exports = { 
  generateAATestTemplates,
  generateAAReport
}; 