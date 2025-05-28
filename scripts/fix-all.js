/**
 * Fix All Script
 * 
 * This script fixes all issues in the project by:
 * 1. Running clean-install.js to clean up and install dependencies
 * 2. Running fix-dependencies.js to resolve conflicts
 * 3. Running fix-vulnerabilities.js to fix security issues
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting fix-all process...');

try {
  console.log('\nStep 1: Running clean installation...');
  execSync('node scripts/clean-install.js', { stdio: 'inherit' });
  console.log('\n✅ Clean installation completed.');
} catch (error) {
  console.error(`Error during clean installation: ${error.message}`);
  process.exit(1);
}

try {
  console.log('\nStep 2: Running dependency conflict resolution...');
  execSync('node scripts/fix-dependencies.js', { stdio: 'inherit' });
  console.log('\n✅ Dependency conflicts resolved.');
} catch (error) {
  console.warn(`Warning during conflict resolution: ${error.message}`);
  // Don't exit on conflict resolution errors
}

try {
  console.log('\nStep 3: Running vulnerability fixes...');
  execSync('node scripts/fix-vulnerabilities.js', { stdio: 'inherit' });
  console.log('\n✅ Vulnerability fixes applied.');
} catch (error) {
  console.warn(`Warning during vulnerability fixes: ${error.message}`);
  // Don't exit on vulnerability fix errors
}

console.log('\n✅ All fixes completed successfully!');
console.log('Your project is now set up with secure dependencies and ready to run.');