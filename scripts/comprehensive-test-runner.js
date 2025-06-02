/* global describe, it, expect, beforeEach, afterEach, jest */
#!/usr/bin/env node

/**
 * Comprehensive test runner that checks and fixes test files
 */

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

// Handle chalk import for both CommonJS and ES modules
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`
  };
}

class ComprehensiveTestRunner {
  constructor() {
    this.testDirs = [
      'test',
      'tests',
      'test/core',
      'test/core/ai-vulnerability-detection-tests',
      'test/integration'
    ];
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      fixed: 0,
      errors: []
    };
  }

  async run() {
    console.log(chalk.blue('🚀 Starting comprehensive test runner...\n'));

    // Step 1: Check syntax of all test files
    await this.checkSyntax();

    // Step 2: Run basic tests
    await this.runBasicTests();

    // Step 3: Run Jest tests
    await this.runJestTests();

    // Step 4: Generate report
    this.generateReport();
  }

  async checkSyntax() {
    console.log(chalk.blue('📋 Step 1: Checking test file syntax...\n'));

    for (const testDir of this.testDirs) {
      const fullPath = path.join(__dirname, '..', testDir);
      
      if (!await fs.pathExists(fullPath)) {
        console.log(chalk.gray(`Skipping ${testDir} - directory not found`));
        continue;
      }

      await this.checkDirectorySyntax(fullPath, testDir);
    }
  }

  async checkDirectorySyntax(dirPath, dirName) {
    try {
      const files = await fs.readdir(dirPath);
      const testFiles = files.filter(file => file.endsWith('.test.js') || file.endsWith('.spec.js'));

      console.log(chalk.gray(`Checking ${dirName} (${testFiles.length} test files)...`));

      for (const file of testFiles) {
        const filePath = path.join(dirPath, file);
        await this.checkFileSyntax(filePath, file);
      }
    } catch (error) {
      console.log(chalk.red(`❌ Error reading directory ${dirName}: ${error.message}`));
    }
  }

  async checkFileSyntax(filePath, fileName) {
    try {
      // Try to require the file to check for syntax errors
      delete require.cache[require.resolve(filePath)];
      require(filePath);
      
      console.log(chalk.green(`  ✅ ${fileName} - Syntax OK`));
      this.results.passed++;
    } catch (error) {
      console.log(chalk.red(`  ❌ ${fileName} - Syntax Error: ${error.message}`));
      this.results.failed++;
      this.results.errors.push({
        file: fileName,
        error: error.message,
        type: 'syntax'
      });

      // Try to fix common issues
      await this.attemptSyntaxFix(filePath, fileName, error);
    }
    
    this.results.total++;
  }

  async attemptSyntaxFix(filePath, fileName, error) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      let fixedContent = content;
      let wasFixed = false;

      // Common fixes
      const fixes = [
        // Fix missing semicolons
        {
          pattern: /(\w+)\s*$/gm,
          replacement: '$1;',
          description: 'Add missing semicolons'
        },
        // Fix missing commas in objects
        {
          pattern: /(\w+:\s*[^,}\n]+)\s*\n\s*(\w+:)/g,
          replacement: '$1,\n  $2',
          description: 'Add missing commas'
        },
        // Fix unclosed brackets
        {
          pattern: /describe\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*\(\s*\)\s*=>\s*\{([^}]*)\s*$/,
          replacement: 'describe(\'$1\', () => {\n$2\n});',
          description: 'Fix unclosed describe blocks'
        }
      ];

      for (const fix of fixes) {
        if (fix.pattern.test(fixedContent)) {
          fixedContent = fixedContent.replace(fix.pattern, fix.replacement);
          wasFixed = true;
          console.log(chalk.yellow(`  🔧 Applied fix: ${fix.description}`));
        }
      }

      if (wasFixed) {
        await fs.writeFile(filePath, fixedContent);
        
        // Test the fix
        try {
          delete require.cache[require.resolve(filePath)];
          require(filePath);
          console.log(chalk.green(`  ✅ ${fileName} - Fixed successfully!`));
          this.results.fixed++;
        } catch (fixError) {
          console.log(chalk.red(`  ❌ ${fileName} - Fix failed: ${fixError.message}`));
        }
      }
    } catch (fixError) {
      console.log(chalk.red(`  ❌ Error attempting to fix ${fileName}: ${fixError.message}`));
    }
  }

  async runBasicTests() {
    console.log(chalk.blue('\n📋 Step 2: Running basic tests...\n'));

    const basicTestFiles = [
      'test/basic.test.js',
      'test-quick.js'
    ];

    for (const testFile of basicTestFiles) {
      const fullPath = path.join(__dirname, '..', testFile);
      
      if (await fs.pathExists(fullPath)) {
        await this.runSingleTest(fullPath, testFile);
      } else {
        console.log(chalk.gray(`Skipping ${testFile} - file not found`));
      }
    }
  }

  async runSingleTest(filePath, fileName) {
    return new Promise((resolve) => {
      console.log(chalk.gray(`Running ${fileName}...`));
      
      const child = spawn('node', [filePath], {
        stdio: 'pipe',
        cwd: path.dirname(filePath)
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green(`  ✅ ${fileName} - Passed`));
        } else {
          console.log(chalk.red(`  ❌ ${fileName} - Failed (exit code: ${code})`));
          if (errorOutput) {
            console.log(chalk.red(`     Error: ${errorOutput.slice(0, 200)}...`));
          }
        }
        resolve();
      });

      child.on('error', (error) => {
        console.log(chalk.red(`  ❌ ${fileName} - Error: ${error.message}`));
        resolve();
      });
    });
  }

  async runJestTests() {
    console.log(chalk.blue('\n📋 Step 3: Running Jest tests...\n'));

    return new Promise((resolve) => {
      const child = spawn('npm', ['test'], {
        stdio: 'pipe',
        cwd: path.join(__dirname, '..')
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        const text = data.toString();
        output += text;
        // Show real-time output for important messages
        if (text.includes('PASS') || text.includes('FAIL') || text.includes('Test Suites')) {
          console.log(text.trim());
        }
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green('\n✅ Jest tests completed successfully'));
        } else {
          console.log(chalk.red('\n❌ Jest tests failed'));
          if (errorOutput) {
            console.log(chalk.red(`Error output: ${errorOutput.slice(0, 500)}...`));
          }
        }
        resolve();
      });

      child.on('error', (error) => {
        console.log(chalk.red(`❌ Error running Jest: ${error.message}`));
        resolve();
      });
    });
  }

  generateReport() {
    console.log(chalk.blue('\n📊 Test Results Summary\n'));
    console.log(chalk.gray('=' .repeat(50)));
    console.log(`Total test files checked: ${this.results.total}`);
    console.log(chalk.green(`✅ Passed: ${this.results.passed}`));
    console.log(chalk.red(`❌ Failed: ${this.results.failed}`));
    console.log(chalk.yellow(`🔧 Fixed: ${this.results.fixed}`));
    console.log(chalk.gray('=' .repeat(50)));

    if (this.results.errors.length > 0) {
      console.log(chalk.red('\n🚨 Errors found:'));
      this.results.errors.forEach((error, index) => {
        console.log(chalk.red(`${index + 1}. ${error.file}: ${error.error.slice(0, 100)}...`));
      });
    }

    const successRate = this.results.total > 0 ? 
      ((this.results.passed + this.results.fixed) / this.results.total * 100).toFixed(1) : 0;
    
    console.log(chalk.blue(`\n📈 Success Rate: ${successRate}%`));
    
    if (successRate >= 80) {
      console.log(chalk.green('\n🎉 Great! Most tests are working correctly.'));
    } else if (successRate >= 60) {
      console.log(chalk.yellow('\n⚠️  Some tests need attention.'));
    } else {
      console.log(chalk.red('\n🚨 Many tests need fixing.'));
    }
  }
}

// Run the comprehensive test runner
if (require.main === module) {
  const runner = new ComprehensiveTestRunner();
  runner.run().catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = ComprehensiveTestRunner;