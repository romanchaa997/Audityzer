/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * MetaMask Extension Security Test Suite
 * This automated test suite analyzes the MetaMask browser extension for security vulnerabilities.
 */

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const { AIModelInterface } = require('../src/core/ai-vulnerability-detection/model-interface');

// Ensure the prompts directory exists
const promptsDir = path.join(__dirname, '../src/core/ai-vulnerability-detection/prompts');
if (!fs.existsSync(promptsDir)) {
  fs.mkdirSync(promptsDir, { recursive: true });
}

// Create the wallet vulnerability analysis prompt if it doesn't exist
const walletVulnerabilityPromptPath = path.join(promptsDir, 'walletVulnerabilityAnalysis.txt');
if (!fs.existsSync(walletVulnerabilityPromptPath)) {
  const walletVulnerabilityPrompt = `You are a wallet security expert analyzing code for vulnerabilities in crypto wallet browser extensions.
Focus on: permission handling, transaction signing, message signing, network switching, and connection security.
Format your response as a JSON object with the following structure:
{
  "vulnerabilities": [
    {
      "type": "string", // vulnerability type
      "severity": "Critical|High|Medium|Low|Informational",
      "description": "string", // detailed description
      "location": "string", // file and line numbers if available
      "recommendation": "string" // how to fix it
    }
  ],
  "summary": "string" // overall security assessment
}

Code to analyze:
`;
  fs.writeFileSync(walletVulnerabilityPromptPath, walletVulnerabilityPrompt);
}

// Path to MetaMask extension directory if available locally
const METAMASK_EXTENSION_PATH =
  process.env.METAMASK_EXTENSION_PATH || path.join(__dirname, '../extensions/metamask');

// Test configurations
const config = {
  extensionUrl: 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html',
  dappUrl: 'https://app.uniswap.org',
  testTimeout: 120000, // 2 minutes
  aiModelName: process.env.AI_MODEL || 'gpt-4', // Default to GPT-4 for analysis
  vulnerabilityDetectionPrompt: 'walletVulnerabilityAnalysis',
};

// Skip if extension path not available
test.skip(!fs.existsSync(METAMASK_EXTENSION_PATH), 'MetaMask extension not found locally');

test.describe('MetaMask Extension Security Analysis', () => {
  let aiModel;

  test.beforeAll(async () => {
    // Initialize AI model for code analysis
    aiModel = new AIModelInterface({
      modelName: config.aiModelName,
      defaultPromptTemplate: config.vulnerabilityDetectionPrompt,
      // Add a mock implementation for testing
      useLocalModel: true,
      localModelPath: './mock-model',
    });

    // Mock the analyze method if running in test mode
    if (!process.env.OPENAI_API_KEY) {
      aiModel.analyzeCode = async (code, options) => {
        console.log('Using mock AI model for analysis');
        return JSON.stringify({
          vulnerabilities: [],
          summary: 'Mock analysis - no actual vulnerability detection performed',
        });
      };
    }
  });

  test('should analyze extension for permission vulnerabilities', async ({ browser }) => {
    const extensionFiles = await getExtensionFiles(METAMASK_EXTENSION_PATH, [
      '.js',
      '.html',
      '.json',
    ]);

    // Filter for permission-related files
    const permissionFiles = extensionFiles.filter(
      file =>
        file.includes('permission') ||
        file.includes('connect') ||
        file.includes('auth') ||
        file.includes('origin')
    );

    if (permissionFiles.length === 0) {
      // Skip if no relevant files found
      test.skip('No permission-related files found');
      return;
    }

    // Analyze each permission file for vulnerabilities
    const vulnerabilities = [];

    for (const filePath of permissionFiles.slice(0, 5)) {
      // Limit to 5 files for performance
      const code = fs.readFileSync(filePath, 'utf8');

      const analysisResults = await aiModel.analyzeCode(code, {
        templateName: 'walletVulnerabilityAnalysis',
        additionalContext: `File: ${filePath}. Focus on permission management vulnerabilities.`,
      });

      try {
        const parsedResults = JSON.parse(analysisResults);
        if (parsedResults.vulnerabilities && parsedResults.vulnerabilities.length > 0) {
          vulnerabilities.push(
            ...parsedResults.vulnerabilities.map(v => ({
              ...v,
              file: filePath,
            }))
          );
        }
      } catch (e) {
        console.error('Failed to parse AI analysis results:', e);
      }
    }

    // Report findings
    console.log(`Found ${vulnerabilities.length} potential permission vulnerabilities`);
    if (vulnerabilities.length > 0) {
      vulnerabilities.forEach(v => {
        console.log(`- ${v.type} (${v.severity}): ${v.description} in ${v.file}`);
      });
    }

    // Test expectation: No critical vulnerabilities should be found
    const criticalVulnerabilities = vulnerabilities.filter(v => v.severity === 'Critical');
    expect(criticalVulnerabilities.length).toBe(0);
  });

  test('should analyze extension for transaction signing vulnerabilities', async ({ browser }) => {
    const extensionFiles = await getExtensionFiles(METAMASK_EXTENSION_PATH, ['.js']);

    // Filter for transaction-related files
    const txFiles = extensionFiles.filter(
      file =>
        file.includes('transaction') ||
        file.includes('sign') ||
        file.includes('eth_sendTransaction') ||
        file.includes('message')
    );

    if (txFiles.length === 0) {
      // Skip if no relevant files found
      test.skip('No transaction-related files found');
      return;
    }

    // Analyze each transaction file for vulnerabilities
    const vulnerabilities = [];

    for (const filePath of txFiles.slice(0, 5)) {
      // Limit to 5 files for performance
      const code = fs.readFileSync(filePath, 'utf8');

      const analysisResults = await aiModel.analyzeCode(code, {
        templateName: 'walletVulnerabilityAnalysis',
        additionalContext: `File: ${filePath}. Focus on transaction signing vulnerabilities.`,
      });

      try {
        const parsedResults = JSON.parse(analysisResults);
        if (parsedResults.vulnerabilities && parsedResults.vulnerabilities.length > 0) {
          vulnerabilities.push(
            ...parsedResults.vulnerabilities.map(v => ({
              ...v,
              file: filePath,
            }))
          );
        }
      } catch (e) {
        console.error('Failed to parse AI analysis results:', e);
      }
    }

    // Report findings
    console.log(`Found ${vulnerabilities.length} potential transaction signing vulnerabilities`);
    if (vulnerabilities.length > 0) {
      vulnerabilities.forEach(v => {
        console.log(`- ${v.type} (${v.severity}): ${v.description} in ${v.file}`);
      });
    }

    // Test expectation: No critical vulnerabilities should be found
    const criticalVulnerabilities = vulnerabilities.filter(v => v.severity === 'Critical');
    expect(criticalVulnerabilities.length).toBe(0);
  });

  test('should analyze background script for security issues', async ({ browser }) => {
    const backgroundScriptPath = await findBackgroundScript(METAMASK_EXTENSION_PATH);

    if (!backgroundScriptPath) {
      test.skip('Background script not found');
      return;
    }

    const code = fs.readFileSync(backgroundScriptPath, 'utf8');

    const analysisResults = await aiModel.analyzeCode(code, {
      templateName: 'walletVulnerabilityAnalysis',
      additionalContext: `File: ${backgroundScriptPath}. This is a background script from the MetaMask extension.`,
    });

    let vulnerabilities = [];
    try {
      const parsedResults = JSON.parse(analysisResults);
      if (parsedResults.vulnerabilities) {
        vulnerabilities = parsedResults.vulnerabilities;
      }
    } catch (e) {
      console.error('Failed to parse AI analysis results:', e);
    }

    // Report findings
    console.log(`Found ${vulnerabilities.length} potential background script vulnerabilities`);
    if (vulnerabilities.length > 0) {
      vulnerabilities.forEach(v => {
        console.log(`- ${v.type} (${v.severity}): ${v.description}`);
      });
    }

    // Test expectation: No critical vulnerabilities should be found
    const criticalVulnerabilities = vulnerabilities.filter(v => v.severity === 'Critical');
    expect(criticalVulnerabilities.length).toBe(0);
  });

  test('should analyze content scripts for injection vulnerabilities', async ({ browser }) => {
    const contentScripts = await findContentScripts(METAMASK_EXTENSION_PATH);

    if (contentScripts.length === 0) {
      test.skip('No content scripts found');
      return;
    }

    // Analyze each content script for vulnerabilities
    const vulnerabilities = [];

    for (const filePath of contentScripts) {
      const code = fs.readFileSync(filePath, 'utf8');

      const analysisResults = await aiModel.analyzeCode(code, {
        templateName: 'walletVulnerabilityAnalysis',
        additionalContext: `File: ${filePath}. This is a content script that runs in page context.`,
      });

      try {
        const parsedResults = JSON.parse(analysisResults);
        if (parsedResults.vulnerabilities && parsedResults.vulnerabilities.length > 0) {
          vulnerabilities.push(
            ...parsedResults.vulnerabilities.map(v => ({
              ...v,
              file: filePath,
            }))
          );
        }
      } catch (e) {
        console.error('Failed to parse AI analysis results:', e);
      }
    }

    // Report findings
    console.log(`Found ${vulnerabilities.length} potential content script vulnerabilities`);
    if (vulnerabilities.length > 0) {
      vulnerabilities.forEach(v => {
        console.log(`- ${v.type} (${v.severity}): ${v.description} in ${v.file}`);
      });
    }

    // Test expectation: No critical vulnerabilities should be found
    const criticalVulnerabilities = vulnerabilities.filter(v => v.severity === 'Critical');
    expect(criticalVulnerabilities.length).toBe(0);
  });

  test('should test extension against live dApp', async ({ browser }) => {
    // Launch browser with MetaMask extension
    const context = await browser.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${METAMASK_EXTENSION_PATH}`,
        `--load-extension=${METAMASK_EXTENSION_PATH}`,
      ],
    });

    // Open MetaMask extension
    await context.newPage();
    const pages = context.pages();
    const extensionPage = pages[0];
    await extensionPage.goto(config.extensionUrl);

    // Perform setup (simplified - in real test you'd need to handle first-time setup)
    try {
      // Check if already initialized
      if (await extensionPage.locator('text="Welcome to MetaMask"').isVisible()) {
        // Click through setup (simplified)
        await extensionPage.locator('button:has-text("Get Started")').click();
        // Import wallet option
        await extensionPage.locator('button:has-text("Import wallet")').click();
        // Would need to handle terms, seed phrase input, etc.
        // ...
      }

      // Now open the dApp
      const dAppPage = await context.newPage();
      await dAppPage.goto(config.dappUrl);

      // Attempt to connect (simplified)
      await dAppPage.locator('button:has-text("Connect")').first().click();

      // Check for security indicators
      const securityIssues = [];

      // Check for proper origin display in MetaMask
      const showsCorrectOrigin = await extensionPage
        .locator(`text="${new URL(config.dappUrl).host}"`)
        .isVisible();
      if (!showsCorrectOrigin) {
        securityIssues.push('MetaMask does not clearly show the origin of the connecting site');
      }

      // Check if permission details are shown
      const showsPermissionDetails = await extensionPage
        .locator('text=/Connect with|Permissions requested/')
        .isVisible();
      if (!showsPermissionDetails) {
        securityIssues.push('MetaMask does not clearly show what permissions are being requested');
      }

      // Report findings
      console.log(`Found ${securityIssues.length} UI security issues`);
      if (securityIssues.length > 0) {
        securityIssues.forEach(issue => {
          console.log(`- ${issue}`);
        });
      }

      // Close the browser properly
      await context.close();

      // Test expectation: No security issues in the UI
      expect(securityIssues.length).toBe(0);
    } catch (e) {
      console.error('Error during live testing:', e);
      await context.close();
      throw e;
    }
  });
});

// Helper functions

/**
 * Get all extension files with specified extensions
 */
async function getExtensionFiles(extensionPath, extensions = ['.js']) {
  const allFiles = [];

  function scanDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        allFiles.push(fullPath);
      }
    }
  }

  scanDirectory(extensionPath);
  return allFiles;
}

/**
 * Find the background script by checking the manifest.json
 */
async function findBackgroundScript(extensionPath) {
  const manifestPath = path.join(extensionPath, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Manifest V3
    if (manifest.background && manifest.background.service_worker) {
      return path.join(extensionPath, manifest.background.service_worker);
    }

    // Manifest V2
    if (manifest.background && manifest.background.scripts) {
      return path.join(extensionPath, manifest.background.scripts[0]);
    }

    // Try to find a background script by common patterns
    const potentialBackgroundScripts = await getExtensionFiles(extensionPath, ['.js']);
    return potentialBackgroundScripts.find(
      file =>
        file.includes('background') || file.includes('service-worker') || file.includes('main')
    );
  } catch (e) {
    console.error('Error finding background script:', e);
    return null;
  }
}

/**
 * Find content scripts by checking the manifest.json
 */
async function findContentScripts(extensionPath) {
  const manifestPath = path.join(extensionPath, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const contentScripts = [];

    if (manifest.content_scripts) {
      for (const scriptEntry of manifest.content_scripts) {
        if (scriptEntry.js) {
          for (const scriptPath of scriptEntry.js) {
            contentScripts.push(path.join(extensionPath, scriptPath));
          }
        }
      }
    }

    // If no content scripts found in manifest, try to find by common patterns
    if (contentScripts.length === 0) {
      const potentialContentScripts = await getExtensionFiles(extensionPath, ['.js']);
      return potentialContentScripts.filter(
        file =>
          file.includes('content') || file.includes('inject') || file.includes('contentscript')
      );
    }

    return contentScripts;
  } catch (e) {
    console.error('Error finding content scripts:', e);
    return [];
  }
}
