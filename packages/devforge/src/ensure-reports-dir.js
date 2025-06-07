/**
 * ensure-reports-dir.js
 *
 * Simple utility to make sure the reports directory exists
 * before running tests. This helps prevent errors from
 * test reporters trying to write to non-existent directories.
 */

const fs = require('fs-extra');
const path = require('path');

// Directories to ensure exist
const directories = ['./reports', './coverage', './test-results'];

/**
 * Ensures report directories exist
 */
function ensureReportDirectories() {
  console.log('Ensuring report directories exist...');

  directories.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir);

    if (!fs.existsSync(dirPath)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dirPath, { recursive: true });
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  });

  console.log('Report directories checked successfully.');
}

// Run if script is executed directly
if (require.main === module) {
  ensureReportDirectories();
}

module.exports = { ensureReportDirectories };
