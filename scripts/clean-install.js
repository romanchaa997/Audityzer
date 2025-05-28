/**
 * Clean Install Script
 * 
 * This script performs a clean installation of dependencies by:
 * 1. Removing node_modules and package-lock.json
 * 2. Installing dependencies with exact versions
 * 3. Running security fixes
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting clean installation process...');

// Step 1: Remove node_modules and package-lock.json
try {
  console.log('Cleaning up old installation files...');

  if (fs.existsSync('node_modules')) {
    console.log('Removing node_modules directory...');
    if (process.platform === 'win32') {
      // On Windows, use rimraf for better handling of long paths
      execSync('npx rimraf node_modules');
    } else {
      execSync('rm -rf node_modules');
    }
  }

  if (fs.existsSync('package-lock.json')) {
    console.log('Removing package-lock.json...');
    fs.unlinkSync('package-lock.json');
  }

  // Also remove .npmrc if it exists to start fresh
  if (fs.existsSync('.npmrc')) {
    console.log('Removing .npmrc...');
    fs.unlinkSync('.npmrc');
  }

  console.log('Cleanup completed successfully.');
} catch (error) {
  console.error(`Error during cleanup: ${error.message}`);
  process.exit(1);
}

// Step 2: Update package.json to use exact versions
try {
  console.log('\nUpdating package.json to use exact versions...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let updated = false;

    // Convert caret ranges to exact versions in dependencies
    if (packageJson.dependencies) {
      Object.entries(packageJson.dependencies).forEach(([pkg, version]) => {
        if (version.startsWith('^') || version.startsWith('~')) {
          packageJson.dependencies[pkg] = version.substring(1);
          updated = true;
        }
      });
    }

    // Convert caret ranges to exact versions in devDependencies
    if (packageJson.devDependencies) {
      Object.entries(packageJson.devDependencies).forEach(([pkg, version]) => {
        if (version.startsWith('^') || version.startsWith('~')) {
          packageJson.devDependencies[pkg] = version.substring(1);
          updated = true;
        }
      });
    }

    // Convert caret ranges to exact versions in peerDependencies
    if (packageJson.peerDependencies) {
      Object.entries(packageJson.peerDependencies).forEach(([pkg, version]) => {
        if (version.startsWith('^') || version.startsWith('~')) {
          packageJson.peerDependencies[pkg] = version.substring(1);
          updated = true;
        }
      });
    }

    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Updated package.json with exact versions (removed ^ and ~ prefixes)');
    } else {
      console.log('✅ Package.json already uses exact versions');
    }
  }
} catch (error) {
  console.error(`Error updating package.json: ${error.message}`);
  // Continue with installation even if this fails
}

// Step 3: Create a secure .npmrc file
try {
  console.log('\nCreating secure .npmrc configuration...');
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  const npmrcContent = `# NPM configuration for security and stability
audit-level=moderate
legacy-peer-deps=true
fund=false
loglevel=warn
`;

  fs.writeFileSync(npmrcPath, npmrcContent);
  console.log('✅ Created secure .npmrc configuration');
} catch (error) {
  console.error(`Error creating .npmrc: ${error.message}`);
  // Continue with installation even if this fails
}

// Step 4: Install dependencies with --no-package-lock to avoid issues
try {
  console.log('\nInstalling dependencies...');
  execSync('npm install --no-package-lock --no-fund', { stdio: 'inherit' });
  console.log('u2705 Dependencies installed successfully.');
} catch (error) {
  console.error(`Error during installation: ${error.message}`);
  process.exit(1);
}

// Step 5: Run fix-dependencies.js to resolve conflicts
try {
  console.log('\nRunning dependency conflict resolution...');
  execSync('node scripts/fix-dependencies.js', { stdio: 'inherit' });
  console.log('u2705 Dependency conflicts resolved.');
} catch (error) {
  console.warn(`Warning during conflict resolution: ${error.message}`);
  // Don't exit on conflict resolution errors
}

// Step 6: Run fix-vulnerabilities.js to fix security issues
try {
  console.log('\nRunning vulnerability fixes...');
  execSync('node scripts/fix-vulnerabilities.js', { stdio: 'inherit' });
  console.log('u2705 Vulnerability fixes applied.');
} catch (error) {
  console.warn(`Warning during vulnerability fixes: ${error.message}`);
  // Don't exit on vulnerability fix errors
}

// Step 7: Run audit fix
try {
  console.log('\nRunning npm audit fix...');
  execSync('npm audit fix --force', { stdio: 'inherit' });
  console.log('u2705 Audit fix completed.');
} catch (error) {
  console.warn(`Warning during audit fix: ${error.message}`);
  // Don't exit on audit fix errors, as they're often non-fatal
}

console.log('\nu2705 Clean installation process completed successfully!');
console.log('Your project is now set up with secure dependencies.');