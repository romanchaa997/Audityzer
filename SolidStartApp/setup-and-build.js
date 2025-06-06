
/**
 * SolidStart App Setup and Build Script
 */

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const projectDir = process.cwd();
const solidStartDir = path.join(projectDir, 'SolidStartApp');

async function setupSolidStart() {
  try {
    console.log('Setting up SolidStart application...');
    
    // Ensure directory exists
    await fs.ensureDir(solidStartDir);
    
    // Install dependencies if needed
    if (!fs.existsSync(path.join(solidStartDir, 'node_modules'))) {
      console.log('Installing SolidStart dependencies...');
      execSync('npm install', { cwd: solidStartDir, stdio: 'inherit' });
    }
    
    console.log('SolidStart setup completed successfully!');
  } catch (error) {
    console.error('Error setting up SolidStart:', error);
    process.exit(1);
  }
}

async function buildSolidStart() {
  try {
    console.log('Building SolidStart application...');
    execSync('npm run build', { cwd: solidStartDir, stdio: 'inherit' });
    console.log('SolidStart build completed successfully!');
  } catch (error) {
    console.error('Error building SolidStart:', error);
    process.exit(1);
  }
}

// Run setup and build
if (import.meta.url === `file://${process.argv[1]}`) {
  setupSolidStart().then(() => buildSolidStart());
}

export { setupSolidStart, buildSolidStart };
