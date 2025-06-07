#!/usr/bin/env node

/**
 * Cleanup script to remove conflicting package manager lockfiles
 * Ensures npm is the exclusive package manager
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up package manager conflicts...');

// List of lockfiles to remove (keeping package-lock.json for npm)
const lockfilesToRemove = [
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lockb'
];

let removedFiles = 0;
let backedUpFiles = 0;

for (const lockfile of lockfilesToRemove) {
  const lockfilePath = path.resolve(lockfile);

  if (fs.existsSync(lockfilePath)) {
    try {
      // Create backup before removing
      const backupPath = `${lockfilePath}.backup-${Date.now()}`;
      fs.copyFileSync(lockfilePath, backupPath);
      backedUpFiles++;

      // Remove the original
      fs.unlinkSync(lockfilePath);
      removedFiles++;

      console.log(`✅ Removed ${lockfile} (backed up to ${path.basename(backupPath)})`);
    } catch (error) {
      console.log(`❌ Failed to remove ${lockfile}: ${error.message}`);
    }
  }
}

// Ensure package-lock.json exists
const packageLockPath = path.resolve('package-lock.json');
if (!fs.existsSync(packageLockPath)) {
  console.log('📦 package-lock.json not found - will be created on next npm install');
}

console.log(`\n📊 Summary:`);
console.log(`   Removed: ${removedFiles} conflicting lockfiles`);
console.log(`   Backed up: ${backedUpFiles} files`);
console.log(`   Package manager: npm (exclusive)`);

if (removedFiles > 0) {
  console.log('\n✨ Package manager conflicts resolved!');
  console.log('💡 Run "npm install" to regenerate package-lock.json if needed');
} else {
  console.log('\n✅ No conflicts found - npm is already the exclusive package manager');
}