/**
 * TypeScript Error Check Script
 *
 * This script runs the TypeScript compiler in check mode to verify
 * that there are no type errors in the project.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};


try {
  // Run TypeScript compiler in noEmit mode to just check types
  const output = execSync('npx tsc --noEmit', { encoding: 'utf8' });
} catch (error) {
  console.error(`${colors.red}TypeScript check failed with errors:${colors.reset}\n`);

  // Parse and display errors in a more readable format
  const errorOutput = error.stdout.toString();
  const errorLines = errorOutput.split('\n').filter(line => line.trim() !== '');

  // Group errors by file
  const fileErrors = {};
  let currentFile = null;

  for (const line of errorLines) {
    if (line.includes('.ts(')) {
      // This is a file line
      const match = line.match(/([^(]+)\((\d+),(\d+)\):/);
      if (match) {
        currentFile = match[1].trim();
        if (!fileErrors[currentFile]) {
          fileErrors[currentFile] = [];
        }
        const lineNumber = match[2];
        const errorMessage = line.substring(line.indexOf(':') + 1).trim();
        fileErrors[currentFile].push({ line: lineNumber, message: errorMessage });
      }
    } else if (currentFile && line.trim() !== '') {
      // Add to the previous error message
      const lastError = fileErrors[currentFile][fileErrors[currentFile].length - 1];
      lastError.message += ' ' + line.trim();
    }
  }

  // Display errors grouped by file
  for (const file in fileErrors) {
    for (const error of fileErrors[file]) {
    }
  }

  // Display summary
  const totalFiles = Object.keys(fileErrors).length;
  const totalErrors = Object.values(fileErrors).reduce((sum, errors) => sum + errors.length, 0);

  // Suggest fixes for common errors
    "1. For 'window.ethereum' type errors: Use '(window.ethereum as any)' to bypass type checking."
  );
    '2. For incompatible modifiers: Make sure all declarations of the same property use identical modifiers.'
  );
    "3. For 'Parameter implicitly has an any type': Add explicit type annotations (e.g., 'parameter: any')."
  );
    '4. For extension interface conflicts: Fix the type definitions in your provider types.'
  );

  process.exit(1);
}
