#!/usr/bin/env node

/**
 * Fix all chalk import issues across the project
 * Chalk v5+ is ES module only, so we need to use fallback colors for CommonJS
 */

const fs = require('fs');
const path = require('path');

// Simple console colors
const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

console.log(colors.blue('🔧 Fixing chalk import issues across the project...\n'));

// Fallback chalk implementation
const chalkFallback = `// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => \`\\x1b[34m\${text}\\x1b[0m\`,
  green: (text) => \`\\x1b[32m\${text}\\x1b[0m\`,
  red: (text) => \`\\x1b[31m\${text}\\x1b[0m\`,
  yellow: (text) => \`\\x1b[33m\${text}\\x1b[0m\`,
  gray: (text) => \`\\x1b[90m\${text}\\x1b[0m\`,
  cyan: (text) => \`\\x1b[36m\${text}\\x1b[0m\`
};`;

// Function to walk through directory recursively
function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && !f.startsWith('.') && f !== 'node_modules') {
      walkDir(dirPath, callback);
    } else if (f.endsWith('.js') && !f.includes('.min.')) {
      callback(path.join(dir, f));
    }
  });
}

// Function to fix chalk imports in a file
function fixChalkInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if file uses chalk
    if (content.includes("(() => { throw new Error("Use fallback colors instead"); })()") || content.includes('const chalk = require(')) {
      console.log(colors.gray(`  Fixing: ${filePath}`));

      // Replace chalk require with fallback
      content = content.replace(
        /const chalk = require\(['"]chalk['"]\);?/g,
        chalkFallback
      );

      // Replace any try-catch chalk imports
      content = content.replace(
        /let chalk;\s*try\s*{\s*chalk = require\(['"]chalk['"]\);\s*[^}]*\}\s*catch[^}]*\{[^}]*\}/gs,
        chalkFallback
      );

      // Replace any other chalk require patterns
      content = content.replace(
        /require\(['"]chalk['"]\)/g,
        '(() => { throw new Error("Use fallback colors instead"); })()'
      );

      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(colors.green(`  ✅ Fixed: ${filePath}`));
      return true;
    }
  } catch (error) {
    console.log(colors.red(`  ❌ Error fixing ${filePath}: ${error.message}`));
  }
  return false;
}

// Main function
function main() {
  let fixedFiles = 0;

  // Directories to check
  const directories = ['scripts', 'utils', 'src', 'test', '.'];

  directories.forEach(dir => {
    console.log(colors.cyan(`Checking directory: ${dir}`));
    walkDir(dir, (filePath) => {
      if (fixChalkInFile(filePath)) {
        fixedFiles++;
      }
    });
  });

  console.log(colors.blue(`\n🎉 Chalk fix completed! Fixed ${fixedFiles} files.`));

  // Test the fixes
  console.log(colors.blue('\n🧪 Testing fixes...'));
  
  try {
    // Test the syntax checker
    const { spawn } = require('child_process');
    const testProcess = spawn('node', ['test-syntax-check.js'], { stdio: 'inherit' });
    
    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log(colors.green('\n✅ All fixes verified successfully!'));
      } else {
        console.log(colors.yellow(`\n⚠️ Test completed with exit code: ${code}`));
      }
    });

    testProcess.on('error', (error) => {
      console.log(colors.red(`\n❌ Test error: ${error.message}`));
    });
  } catch (error) {
    console.log(colors.red(`\n❌ Could not run test: ${error.message}`));
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixChalkInFile, chalkFallback };