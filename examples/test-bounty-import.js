// Simple test to verify bounty-integration module can be imported

try {

  // Try to import the JavaScript version of the module
  const bountyIntegration = require('../src/core/bounty-integration');


  // Continue with directory check
  const fs = require('fs');
  const path = require('path');

  const directory = path.join(__dirname, '..', 'src', 'core', 'bounty-integration');

  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);

    // Check specific files
    const filesToCheck = [
      'index.ts',
      'immunefi-submission-generator.ts',
      'code4rena-integration.ts',
      'sherlock-report-formatter.ts',
      'bridge-bounty-adapter.ts',
    ];

    filesToCheck.forEach(file => {
      const filePath = path.join(directory, file);
      if (fs.existsSync(filePath)) {
      } else {
      }
    });

    // Check the index.ts content
    const indexPath = path.join(directory, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
    }
  } else {
  }

} catch (error) {
  console.error('Error:');
  console.error(error);

}
