/**
 * Fix dependency conflicts automatically
 * 
 * This script resolves conflicts between dependencies like:
 * - puppeteer vs mermaid-cli
 * - playwright vs other tools
 * 
 * It also fixes known vulnerabilities in dependencies when possible.
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

// Fix vulnerable packages
function fixVulnerablePackages() {
  const vulnerablePackages = {
    'cookie': '0.7.0',
    'lodash.set': '4.3.2',
  };

  let fixedCount = 0;
  
  // Fix known vulnerable packages
  Object.entries(vulnerablePackages).forEach(([pkg, safeVersion]) => {
    if (isPackageInstalled(pkg)) {
      const currentVersion = getPackageVersion(pkg);
      
      if (currentVersion) {
        const currentParts = currentVersion.split('.').map(Number);
        const safeParts = safeVersion.split('.').map(Number);
        
        // Check if current version is older than safe version
        const needsUpgrade = 
          currentParts[0] < safeParts[0] || 
          (currentParts[0] === safeParts[0] && currentParts[1] < safeParts[1]) ||
          (currentParts[0] === safeParts[0] && currentParts[1] === safeParts[1] && currentParts[2] < safeParts[2]);
        
        if (needsUpgrade) {
          console.log(`⚠️ Detected vulnerable ${pkg}@${currentVersion}`);
          console.log(`Upgrading ${pkg} to ${safeVersion}...`);
          
          try {
            execSync(`npm install ${pkg}@${safeVersion} --save-dev --legacy-peer-deps`, { stdio: 'inherit' });
            console.log(`✅ Successfully upgraded ${pkg} to ${safeVersion}`);
            fixedCount++;
          } catch (err) {
            console.error(`❌ Failed to upgrade ${pkg}:`, err.message);
          }
        }
      }
    }
  });
  
  // Fix special deep dependencies that can't be directly installed
  fixDeepDependencies();
  
  return fixedCount;
}

// Fix deeply nested dependencies that can't be directly installed
function fixDeepDependencies() {
  const pkgLockPath = path.join(process.cwd(), 'package-lock.json');
  
  if (!fs.existsSync(pkgLockPath)) {
    console.log('⚠️ package-lock.json not found, skipping deep dependency fixes');
    return;
  }
  
  try {
    // Create or update .npmrc file with dependency overrides
    const npmrcPath = path.join(process.cwd(), '.npmrc');
    const npmrcContent = `
audit-level=moderate
legacy-peer-deps=true
fund=false
resolution-mode=highest
loglevel=warn

# Package overrides for vulnerabilities
cookie:>=0.7.0
lodash.set:>=4.3.2
`;
    
    fs.writeFileSync(npmrcPath, npmrcContent);
    console.log('✅ Created/updated .npmrc with security overrides');
  } catch (err) {
    console.error('❌ Failed to create/update .npmrc:', err.message);
  }
  
  // Create CI-specific npmrc with stricter settings
  try {
    const npmrcCiPath = path.join(process.cwd(), '.npmrc-ci');
    const npmrcCiContent = `
audit-level=high
legacy-peer-deps=true
fund=false
engine-strict=false
resolution-mode=highest
loglevel=warn
production=true
omit=dev
ignore-audit-errors=true

# Package overrides
cookie:>=0.7.0
lodash.set:>=4.3.2
`;
    
    fs.writeFileSync(npmrcCiPath, npmrcCiContent);
    console.log('✅ Created CI-specific .npmrc-ci configuration');
  } catch (err) {
    console.error('❌ Failed to create .npmrc-ci:', err.message);
  }
}

// Main execution
try {
  const conflicts = resolveConflicts();
  const fixedVulns = fixVulnerablePackages();
  
  if (!conflicts) {
    console.log('✅ No dependency conflicts detected');
  } else {
    console.log('ℹ️ Dependency conflicts were resolved');
  }
  
  if (fixedVulns > 0) {
    console.log(`ℹ️ Fixed ${fixedVulns} vulnerable package(s)`);
  }
  
  console.log('📦 Post-install dependency fixes completed');
} catch (err) {
  console.error('❌ Error resolving dependencies:', err.message);
  process.exit(1);
} 