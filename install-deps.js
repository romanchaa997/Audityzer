#!/usr/bin/env node

/**
 * Install required dependencies for testing
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Installing required dependencies for testing...');

// Check if babel.config.json exists
if (!existsSync(join(__dirname, 'babel.config.json'))) {
  console.log('Creating babel.config.json...');
  const babelConfig = {
    "presets": [
      ["@babel/preset-env", { "targets": { "node": "current" } }]
    ],
    "plugins": [
      "@babel/plugin-transform-modules-commonjs"
    ]
  };

  writeFileSync(
    join(__dirname, 'babel.config.json'),
    JSON.stringify(babelConfig, null, 2)
  );
}

// Install dependencies
try {
  console.log('Installing Babel dependencies...');
  execSync('npm install --save-dev @babel/core@7.24.9 @babel/preset-env@7.24.9 @babel/plugin-transform-modules-commonjs@7.24.9 babel-jest@29.7.0', {
    stdio: 'inherit'
  });

  console.log('Dependencies installed successfully!');
  console.log('You can now run tests with: npm test');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}