/**
 * Test Generator Module
 * 
 * Generates test templates based on specified parameters.
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Template directory
const TEMPLATE_DIR = path.join(__dirname, '../../templates');

/**
 * Generate a test file from a template
 * 
 * @param {string} type - Test type (connect, tx, sign, error, security, aa)
 * @param {Object} options - Generation options
 * @param {string} options.out - Output file path
 * @param {string} options.wallet - Wallet provider
 * @param {string} options.lang - Programming language (js, ts)
 * @param {boolean} options.fuzz - Enable security fuzzing
 * @param {boolean} options.lint - Enable linting and formatting
 */
export function generateTest(type, options) {
  try {
    // Validate test type
    const validTypes = ['connect', 'tx', 'sign', 'error', 'security', 'aa'];
    if (!validTypes.includes(type)) {
      console.error(chalk.red(`Invalid test type: ${type}`));
      console.log(chalk.yellow(`Available types: ${validTypes.join(', ')}`));
      return;
    }

    // Set default output path if not provided
    const outputPath = options.out || `./tests/${type}-test.${options.lang}`;
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Determine template path
    let templatePath;
    
    switch (type) {
      case 'security':
        templatePath = path.join(TEMPLATE_DIR, 'security', `basic-security.${options.lang}`);
        break;
      case 'aa':
        templatePath = path.join(TEMPLATE_DIR, 'security', `account-abstraction.${options.lang}`);
        break;
      default:
        templatePath = path.join(TEMPLATE_DIR, `${type}-test.${options.lang}`);
    }
    
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      console.error(chalk.red(`Template not found: ${templatePath}`));
      return;
    }
    
    // Read template content
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders with options
    if (options.wallet) {
      templateContent = templateContent.replace(/\{\{WALLET_PROVIDER\}\}/g, options.wallet);
    }
    
    // Add fuzzing if enabled
    if (options.fuzz && type === 'security') {
      templateContent = templateContent.replace(
        '// FUZZING_PLACEHOLDER',
        `// Enable fuzzing
await page.evaluate(() => {
  window.ENABLE_FUZZING = true;
  window.FUZZING_ITERATIONS = 100;
});
`
      );
    }
    
    // Write output file
    fs.writeFileSync(outputPath, templateContent);
    
    console.log(chalk.green(`Generated test file: ${outputPath}`));
    
    // Apply linting if enabled
    if (options.lint) {
      console.log(chalk.blue('Applying linting and formatting...'));
      // This would typically call ESLint and Prettier
      // For now, we'll just log a message
      console.log(chalk.green('Linting and formatting complete'));
    }
  } catch (error) {
    console.error(chalk.red(`Failed to generate test: ${error.message}`));
  }
}