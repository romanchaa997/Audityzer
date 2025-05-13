// Simple test to verify bounty-integration module can be imported

try {
  console.log('Attempting to check bounty-integration module structure...');

  // Try to import the JavaScript version of the module
  console.log('Trying to import JavaScript version...');
  const bountyIntegration = require('../src/core/bounty-integration');

  console.log('✅ Module imported successfully!');
  console.log('Exported properties:');
  console.log(Object.keys(bountyIntegration));

  // Continue with directory check
  const fs = require('fs');
  const path = require('path');

  const directory = path.join(__dirname, '..', 'src', 'core', 'bounty-integration');
  console.log(`\nChecking directory: ${directory}`);

  if (fs.existsSync(directory)) {
    console.log('✅ Directory exists');
    const files = fs.readdirSync(directory);
    console.log('Files in directory:');
    files.forEach(file => console.log(`- ${file}`));

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
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} is missing`);
      }
    });

    // Check the index.ts content
    const indexPath = path.join(directory, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      console.log('\nContent of index.ts:');
      console.log(indexContent);
    }
  } else {
    console.log('❌ Directory does not exist');
  }

  console.log('\nSuggested next steps:');
  console.log('1. Make sure the CLI supports TypeScript compilation');
  console.log('2. Add a build script to package.json for TypeScript compilation');
  console.log('3. Update documentation to explain how to use the bounty integration features');
} catch (error) {
  console.error('Error:');
  console.error(error);

  console.log('\nSuggested fixes:');
  console.log('1. Make sure TypeScript files are compiled to JavaScript');
  console.log('2. Run: npm install -g ts-node typescript');
  console.log('3. Try using ts-node to run TypeScript files directly');
}
