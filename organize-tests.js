const fs = require('fs');
const path = require('path');

// Create playwright-tests directory if it doesn't exist
const playwrightDir = path.join(__dirname, 'playwright-tests');
if (!fs.existsSync(playwrightDir)) {
  fs.mkdirSync(playwrightDir, { recursive: true });
}

// Directories to search for Playwright tests
const dirsToSearch = [
  'tests',
  'autotests',
  'examples',
  'web3fuzzforge-community-tests'
];

// Patterns that identify Playwright tests
const playwrightPatterns = [
  'test.describe(',
  'test(',
  '@playwright/test',
  'import { test, expect'
];

// Move files that match patterns
dirsToSearch.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) {
    scanDir(fullDir);
  }
});

function scanDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
        return;
      }
      
      // Only check JS/TS files
      if (!(file.endsWith('.js') || file.endsWith('.ts'))) {
        return;
      }
      
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check if file contains Playwright patterns
        if (playwrightPatterns.some(pattern => content.includes(pattern))) {
          // Create target directory with same structure
          const relativePath = path.relative(__dirname, dir);
          const targetDir = path.join(playwrightDir, relativePath);
          
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          
          // Copy file to new location
          const targetPath = path.join(targetDir, file);
          fs.copyFileSync(fullPath, targetPath);
          
          console.log(`Copied Playwright test: ${fullPath} -> ${targetPath}`);
        }
      } catch (err) {
        console.error(`Error reading file ${fullPath}:`, err);
      }
    });
  } catch (err) {
    console.error(`Error scanning directory ${dir}:`, err);
  }
}

console.log('Done organizing Playwright tests!');