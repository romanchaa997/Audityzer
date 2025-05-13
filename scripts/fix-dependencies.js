/**
 * Fix dependency conflicts automatically
 * 
 * This script resolves conflicts between dependencies like:
 * - puppeteer vs mermaid-cli
 * - playwright vs other tools
 * 
 * It runs after npm install and ensures compatible versions
 * are used to prevent errors.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Running dependency conflict resolution...');

// Function to check if a package is installed
function isPackageInstalled(packageName) {
  try {
    const modulePath = path.join(process.cwd(), 'node_modules', packageName);
    return fs.existsSync(modulePath);
  } catch (err) {
    return false;
  }
}

// Function to check package version
function getPackageVersion(packageName) {
  try {
    const packageJsonPath = path.join(process.cwd(), 'node_modules', packageName, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return packageJson.version;
    }
  } catch (err) {
    console.error(`Error getting version for ${packageName}:`, err.message);
  }
  return null;
}

// Check for conflicts and resolve them
function resolveConflicts() {
  let hasConflicts = false;
  
  // Check puppeteer vs mermaid-cli conflict
  if (isPackageInstalled('puppeteer') && isPackageInstalled('@mermaid-js/mermaid-cli')) {
    const puppeteerVersion = getPackageVersion('puppeteer');
    
    if (puppeteerVersion) {
      const majorVersion = parseInt(puppeteerVersion.split('.')[0], 10);
      
      // If puppeteer is v23+, it can cause conflicts with mermaid-cli
      if (majorVersion >= 23) {
        console.log('⚠️ Detected puppeteer v23+ which conflicts with mermaid-cli');
        console.log('Downgrading puppeteer to v21.10.0 for compatibility...');
        
        try {
          execSync('npm install puppeteer@21.10.0 --save-dev --legacy-peer-deps', { stdio: 'inherit' });
          console.log('✅ Successfully downgraded puppeteer to v21.10.0');
          hasConflicts = true;
        } catch (err) {
          console.error('❌ Failed to downgrade puppeteer:', err.message);
        }
      }
    }
  }
  
  // Check if mermaid-cli version is compatible
  if (isPackageInstalled('@mermaid-js/mermaid-cli')) {
    const mermaidVersion = getPackageVersion('@mermaid-js/mermaid-cli');
    
    if (mermaidVersion) {
      const majorVersion = parseInt(mermaidVersion.split('.')[0], 10);
      
      // If mermaid-cli is v11+, downgrade to v10
      if (majorVersion >= 11) {
        console.log('⚠️ Detected mermaid-cli v11+ which may cause compatibility issues');
        console.log('Downgrading mermaid-cli to v10.6.1 for better compatibility...');
        
        try {
          execSync('npm install @mermaid-js/mermaid-cli@10.6.1 --save --legacy-peer-deps', { stdio: 'inherit' });
          console.log('✅ Successfully downgraded mermaid-cli to v10.6.1');
          hasConflicts = true;
        } catch (err) {
          console.error('❌ Failed to downgrade mermaid-cli:', err.message);
        }
      }
    }
  }
  
  return hasConflicts;
}

// Main execution
try {
  const conflicts = resolveConflicts();
  
  if (!conflicts) {
    console.log('✅ No dependency conflicts detected');
  } else {
    console.log('ℹ️ Dependency conflicts were resolved');
  }
  
  console.log('📦 Post-install dependency fixes completed');
} catch (err) {
  console.error('❌ Error resolving dependencies:', err.message);
  process.exit(1);
} 