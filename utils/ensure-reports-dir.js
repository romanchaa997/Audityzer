const fs = require('fs-extra')
const path = require('path')

/**
 * Ensures the reports directory exists with the necessary structure
 */
function ensureReportsDirectory() {
  const reportsDir = path.join(process.cwd(), 'reports')

  // Ensure the reports directory exists
  fs.ensureDirSync(reportsDir)

  // Create a placeholder index.html if it doesn't exist
  const indexPath = path.join(reportsDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(
      indexPath, `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Web3 Security Test Reports</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .info {
      background-color: #f4f4f4;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .note {
      color: #666;
      font-style: italic;
    }
  </style>
</head>
<body>
  <h1>Web3 Security Test Reports</h1>
  <div class="info">
    <p>No test reports available yet. Run tests using one of the following commands:</p>
    <pre>npm test</pre>
    <pre>npm run test:report</pre>
  </div>
  <p class="note">This placeholder will be replaced with actual test reports when tests are run.</p>
</body>
</html>`
    )
  }

  console.log(`Reports directory structure ensured at: ${reportsDir}`)
}

// Run if script is executed directly
if (require.main === module) {
  ensureReportsDirectory()
}

module.exports = { ensureReportsDirectory }
