/**
 * Fix Vulnerabilities Script
 * 
 * This script helps fix npm audit vulnerabilities by:
 * 1. Running npm audit to identify vulnerabilities
 * 2. Adding overrides to package.json for vulnerable packages
 * 3. Creating .npmrc with security settings
 * 4. Running npm audit fix to resolve issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting vulnerability fix process...');

// Function to run npm audit and parse results
function runAudit() {
  try {
    const auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
    return JSON.parse(auditOutput);
  } catch (error) {
    // npm audit returns non-zero exit code when vulnerabilities are found
    if (error.stdout) {
      try {
        return JSON.parse(error.stdout);
      } catch (parseError) {
        console.error('Error parsing npm audit output:', parseError.message);
      }
    }
    console.error('Error running npm audit:', error.message);
    return { vulnerabilities: {} };
  }
}

// Function to fix vulnerabilities
function fixVulnerabilities() {
  console.log('Running npm audit to identify vulnerabilities...');

  const auditResults = runAudit();
  const vulnerabilities = auditResults.vulnerabilities || {};

  if (Object.keys(vulnerabilities).length === 0) {
    console.log('u2705 No vulnerabilities found!');
    return;
  }

  console.log(`Found ${Object.keys(vulnerabilities).length} vulnerable packages.`);

  // Create overrides in package.json
  updatePackageJsonOverrides(vulnerabilities);

  // Create .npmrc with overrides
  createNpmrcWithOverrides();

  // Try to fix vulnerabilities
  console.log('\nAttempting to fix vulnerabilities with npm audit fix...');
  try {
    execSync('npm audit fix --force', { stdio: 'inherit' });
    console.log('u2705 Completed npm audit fix');
  } catch (error) {
    console.warn('u26a0ufe0f Some vulnerabilities could not be fixed automatically.');
  }

  // Run a final check
  runFinalCheck();
}

// Function to update package.json overrides
function updatePackageJsonOverrides(vulnerabilities) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure overrides exists
    packageJson.overrides = packageJson.overrides || {};

    // Add overrides for vulnerable packages
    let updatedCount = 0;

    Object.entries(vulnerabilities).forEach(([pkgName, details]) => {
      if (details.fixAvailable && details.fixAvailable.name) {
        const fixVersion = details.fixAvailable.version || 'latest';
        packageJson.overrides[pkgName] = fixVersion;
        console.log(`Adding override for ${pkgName}@${fixVersion}`);
        updatedCount++;
      }
    });

    // Add known security fixes
    const knownFixes = {
      'semver': '7.6.0',
      'tough-cookie': '4.1.3',
      '@babel/traverse': '7.24.8',
      'follow-redirects': '1.15.6',
      'tar-fs': '3.0.5',
      'ws': '8.17.1',
      'cookie': '0.7.0',
      'lodash.set': '4.3.2',
      'json5': '2.2.3',
      'minimatch': '3.1.2',
      'glob-parent': '6.0.2',
      'node-fetch': '2.7.0',
      'minimist': '1.2.8',
      'word-wrap': '1.2.5',
      '@npmcli/fs': '3.1.0',
      '@npmcli/move-file': '3.0.0',
      'cacache': '18.0.0'
    };

    Object.entries(knownFixes).forEach(([pkgName, version]) => {
      if (!packageJson.overrides[pkgName]) {
        packageJson.overrides[pkgName] = version;
        console.log(`Adding known security fix for ${pkgName}@${version}`);
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      // Write updated package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`u2705 Updated package.json with ${updatedCount} security overrides`);
    } else {
      console.log('No new overrides added to package.json');
    }
  } catch (error) {
    console.error('Error updating package.json:', error.message);
  }
}

// Function to create .npmrc with overrides
function createNpmrcWithOverrides() {
  const npmrcPath = path.join(process.cwd(), '.npmrc');

  try {
    const npmrcContent = `# NPM configuration for security and stability
audit-level=moderate
legacy-peer-deps=true
fund=false
loglevel=warn
`;

    fs.writeFileSync(npmrcPath, npmrcContent);
    console.log('u2705 Created/updated .npmrc with security settings');
  } catch (error) {
    console.error('Error creating .npmrc:', error.message);
  }
}

// Function to run a final check after fixes
function runFinalCheck() {
  console.log('\nRunning final vulnerability check...');

  try {
    execSync('npm audit --omit=dev', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    console.log('u2705 No production vulnerabilities found!');
  } catch (error) {
    if (error.stdout && error.stdout.includes('found 0 vulnerabilities')) {
      console.log('u2705 No production vulnerabilities found!');
    } else {
      console.warn('u26A0uFE0F Some vulnerabilities still exist in production dependencies.');
      console.log('Consider running "npm audit --omit=dev" to see remaining issues.');
    }
  }
}

// Run the fix
fixVulnerabilities();

console.log('\nu2705 Vulnerability fix process completed!');
console.log('You may need to run "npm install" again to apply all fixes.');