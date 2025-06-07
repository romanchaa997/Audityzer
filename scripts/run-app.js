/**
 * Run App Script
 * 
 * This script runs the application by:
 * 1. Running fix-all.js to fix all issues
 * 2. Starting the development server
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting the application...');

try {
  console.log('\nStep 1: Running fix-all script to fix issues...');
  execSync('node scripts/fix-all.js', { stdio: 'inherit' });
  console.log('\n✅ Fixed all issues.');
} catch (error) {
  console.error(`Error during fix-all: ${error.message}`);
  // Continue anyway
}

try {
  console.log('\nStep 2: Starting the development server...');
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.error(`Error starting development server: ${error.message}`);
  process.exit(1);
}