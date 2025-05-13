// Test script for Web3FuzzForge templates
const path = require('path');
const fs = require('fs');

// Test the structure of the templates
try {
  console.log('Checking Web3FuzzForge template files...');

  // Define the template files to check
  const templates = {
    'uniswap-approval-overflow.fuzz.js': 'Uniswap Approval Overflow Tests',
    'airdrop-batch-loss.test.ts': 'Airdrop Batch Distribution Tests',
    'darkforest-zk-replay.fuzz.ts': 'Dark Forest ZK-SNARK Tests',
    'session-handling.test.js': 'Session Handling Tests',
    'index.js': 'Module Index',
    'README.md': 'Documentation',
  };

  // Check that all template files exist
  const exploitsDir = path.resolve('./examples/exploits');

  let allFilesExist = true;
  for (const [filename, description] of Object.entries(templates)) {
    const filePath = path.join(exploitsDir, filename);
    const exists = fs.existsSync(filePath);
    const fileSize = exists ? fs.statSync(filePath).size : 0;

    console.log(
      `${exists ? '✓' : '✗'} ${description} (${filename}): ${exists ? 'Found' : 'Missing'} ${fileSize > 0 ? `(${fileSize} bytes)` : ''}`
    );

    if (!exists || fileSize === 0) {
      allFilesExist = false;
    }
  }

  // Read index.js to check template definitions
  const indexPath = path.join(exploitsDir, 'index.js');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  // Check if all templates are defined in TEMPLATES object
  const templateNames = Object.keys(templates).filter(t => t !== 'index.js' && t !== 'README.md');
  let allTemplatesDefined = true;

  for (const template of templateNames) {
    const isDefinedInIndex = indexContent.includes(`'${template}'`);
    console.log(
      `${isDefinedInIndex ? '✓' : '✗'} Template "${template}" is ${isDefinedInIndex ? 'defined' : 'not defined'} in index.js`
    );

    if (!isDefinedInIndex) {
      allTemplatesDefined = false;
    }
  }

  // Mock TEMPLATES object for testing configureFuzzSuite function
  const TEMPLATES = {
    UNISWAP_APPROVAL: 'uniswap-approval-overflow.fuzz.js',
    AIRDROP_BATCH: 'airdrop-batch-loss.test.ts',
    DARKFOREST_ZK: 'darkforest-zk-replay.fuzz.ts',
    SESSION_HANDLING: 'session-handling.test.js',
  };

  // Mock configureFuzzSuite function from index.js
  function configureFuzzSuite(config = {}) {
    const suite = {
      dappUrl: config.dappUrl || process.env.DAPP_URL || 'http://localhost:3000',
      templates: [],
    };

    if (config.includeApprovalTests !== false) {
      suite.templates.push(TEMPLATES.UNISWAP_APPROVAL);
    }

    if (config.includeAirdropTests) {
      suite.templates.push(TEMPLATES.AIRDROP_BATCH);
    }

    if (config.includeZkTests) {
      suite.templates.push(TEMPLATES.DARKFOREST_ZK);
    }

    if (config.includeSessionTests !== false) {
      suite.templates.push(TEMPLATES.SESSION_HANDLING);
    }

    return suite;
  }

  // Test the configuration function
  const config = configureFuzzSuite({
    dappUrl: 'https://app.uniswap.org',
    includeApprovalTests: true,
    includeSessionTests: true,
    includeAirdropTests: false,
    includeZkTests: false,
  });

  console.log('Test configuration result:', JSON.stringify(config, null, 2));

  // Final result
  if (allFilesExist && allTemplatesDefined) {
    console.log('\n✓ All template files exist and are properly defined in index.js');
    console.log('✓ Test completed successfully!');
  } else {
    console.log('\n✗ There were issues with the template files or definitions');
    if (!allFilesExist) console.log('  - Some template files are missing or empty');
    if (!allTemplatesDefined)
      console.log('  - Some templates are not properly defined in index.js');
  }
} catch (error) {
  console.error('Error testing templates:', error);
}
