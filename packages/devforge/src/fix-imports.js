/**
 * Script to fix import paths in Playwright tests
 * 
 * This script will search for paths like:
 * - ../../utils/wallet-helpers
 * - ../src/core/...
 * - ./utils/wallet-snapshot
 * 
 * And replace them with the correct paths.
 */

const fs = require('fs');
const path = require('path');

// Function to walk through directory recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  // Skip non-JavaScript/TypeScript files
  if (!filePath.match(/\.(js|ts)$/)) {
    return;
  }

  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file has import statements that need fixing
  const needsFix = (
    content.includes('../../utils/wallet-helpers') ||
    content.includes('../src/core/') ||
    content.includes('./utils/wallet-snapshot') ||
    content.includes('../utils/wallet-helpers')
  );
  
  if (!needsFix) {
    console.log(`  No imports to fix in: ${filePath}`);
    return;
  }
  
  // Replace imports
  let updatedContent = content;
  
  // Fix wallet helpers imports
  updatedContent = updatedContent.replace(
    /require\(['"]\.\.\/\.\.\/utils\/wallet-helpers['"]\)/g, 
    "require('../../utils')"
  );
  updatedContent = updatedContent.replace(
    /require\(['"]\.\.\/utils\/wallet-helpers['"]\)/g, 
    "require('../utils')"
  );
  updatedContent = updatedContent.replace(
    /import\s+\{[^}]+\}\s+from\s+['"]\.\.\/\.\.\/utils\/wallet-helpers['"]/g,
    "import { connectWallet, setupWalletState } from '../../utils'"
  );
  updatedContent = updatedContent.replace(
    /import\s+\{[^}]+\}\s+from\s+['"]\.\.\/utils\/wallet-helpers['"]/g,
    "import { connectWallet, setupWalletState } from '../utils'"
  );
  
  // Fix wallet snapshot imports
  updatedContent = updatedContent.replace(
    /require\(['"]\.\/utils\/wallet-snapshot['"]\)/g, 
    "require('./utils')"
  );
  updatedContent = updatedContent.replace(
    /import\s+\{[^}]+\}\s+from\s+['"]\.\/utils\/wallet-snapshot['"]/g,
    "import { saveWalletState, restoreWalletState } from './utils'"
  );
  
  // Fix debug logger imports
  updatedContent = updatedContent.replace(
    /require\(['"]\.\.\/\.\.\/utils\/debug-logger['"]\)/g, 
    "require('../../utils')"
  );
  updatedContent = updatedContent.replace(
    /import\s+\{[^}]+\}\s+from\s+['"]\.\.\/\.\.\/utils\/debug-logger['"]/g,
    "import { DebugLogger, DEBUG_LEVELS } from '../../utils'"
  );
  
  // Fix contributor tracker imports
  updatedContent = updatedContent.replace(
    /require\(['"]\.\.\/\.\.\/utils\/contributor-tracker['"]\)/g, 
    "require('../../utils')"
  );
  
  // Fix src/core imports
  updatedContent = updatedContent.replace(
    /require\(['"]\.\.\/src\/core\/([^'"]+)['"]\)/g, 
    "require('../src/core/$1')"
  );
  updatedContent = updatedContent.replace(
    /import\s+\{[^}]+\}\s+from\s+['"]\.\.\/src\/core\/([^'"]+)['"]/g,
    "import { $1 } from '../src/core/$1'"
  );
  
  // Save updated content if it was modified
  if (updatedContent !== content) {
    console.log(`  Updated imports in: ${filePath}`);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }
}

// Main function
function main() {
  const playwrightDir = path.join(__dirname, 'playwright-tests');
  console.log(`Fixing imports in ${playwrightDir}...`);
  
  walkDir(playwrightDir, fixImportsInFile);
  
  console.log('Done fixing imports!');
}

main(); 