/**
 * Audityzer Server
 *
 * This server provides endpoints for the Audityzer testing framework,
 * including MetaMask fuzzing tests and other security test infrastructure.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

// Get current file directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(bodyParser.json({ limit: '10mb' }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build/client')));

// Serve the fuzzer test file
app.get('/fuzzer-test.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../reports/metamask-security/fuzzer-test.html'));
});

// Endpoint to serve metamask-fuzzer.js
app.get('/metamask-fuzzer.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/metamask-fuzzer.js'));
});

// Save fuzzing results
app.post('/save-results', (req, res) => {
  const results = req.body;

  try {
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '../reports/metamask-security');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save results to file
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const outputPath = path.join(outputDir, `fuzzing-results-${timestamp}.json`);

    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    // Log results summary
    const total = results.results ? results.results.length : 0;
    console.log(`Saved ${total} fuzzing test results to ${outputPath}`);

    res.status(200).json({ success: true, message: 'Results saved successfully' });
  } catch (error) {
    console.error('Error saving fuzzing results:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Audityzer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Audityzer Testing Platform</h1>
        
        <div class="card">
          <h2>MetaMask Fuzzer</h2>
          <p>Run security testing against the MetaMask extension with automated fuzzing.</p>
          <a href="/fuzzer-test.html" class="button">Launch MetaMask Fuzzer</a>
        </div>
        
        <div class="card">
          <h2>Available Test Routes</h2>
          <ul>
            <li><code>/fuzzer-test.html</code> - MetaMask fuzzing test page</li>
            <li><code>/metamask-fuzzer.js</code> - MetaMask fuzzer module</li>
            <li><code>/save-results</code> - API endpoint to save test results</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Audityzer server running at http://localhost:${port}`);

  // Check for command line arguments
  const args = process.argv.slice(2);
  const routeArgIndex = args.findIndex(arg => arg.startsWith('--route='));

  if (routeArgIndex !== -1) {
    const route = args[routeArgIndex].split('=')[1];
    console.log(`Route specified: ${route}`);

    if (route === 'metamask-fuzzer') {
      console.log(`MetaMask fuzzer available at: http://localhost:${port}/fuzzer-test.html`);
    }
  }
});
