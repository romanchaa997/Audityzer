#!/usr/bin/env node

/**
 * DevForge Demo Generator
 * 
 * This script automates the creation of a demo GIF for DevForge
 * using Puppeteer to capture browser interactions.
 */

const puppeteer = require('puppeteer');
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(childProcess.exec);

// Configure demo settings
const outputDir = path.join(__dirname, '..', 'assets', 'demo');
const outputFile = path.join(outputDir, 'devforge-demo.gif');
const frameDir = path.join(outputDir, 'frames');

// Ensure directories exist
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(frameDir)) fs.mkdirSync(frameDir, { recursive: true });

// Demo steps
async function createDemo() {
  console.log('Starting DevForge demo creation...');
  
  // Step 1: Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
  });
  const page = await browser.newPage();
  
  // Step 2: Create an HTML file that simulates a terminal
  const terminalHtml = path.join(outputDir, 'terminal-demo.html');
  fs.writeFileSync(
    terminalHtml,
    `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>DevForge Demo</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #0f172a;
          color: #a4ffb0;
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 16px;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .terminal {
          background-color: #1b2432;
          border-radius: 8px;
          padding: 20px;
          margin: 40px;
          flex: 1;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .header {
          display: flex;
          margin-bottom: 20px;
        }
        .dots {
          display: flex;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .red { background-color: #ff5f56; }
        .yellow { background-color: #ffbd2e; }
        .green { background-color: #27c93f; }
        .title {
          flex: 1;
          text-align: center;
          margin-right: 80px;
          color: #f7f9fc;
          font-weight: bold;
        }
        .output {
          white-space: pre-wrap;
          line-height: 1.5;
        }
        .prompt {
          color: #6e42e5;
          font-weight: bold;
        }
        .cursor {
          display: inline-block;
          width: 10px;
          height: 16px;
          background-color: #a4ffb0;
          animation: blink 1s infinite;
          vertical-align: middle;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .command {
          color: #f7f9fc;
        }
        .highlight {
          color: #00ffcc;
          font-weight: bold;
        }
        .response {
          color: #a4ffb0;
          margin-top: 10px;
        }
        .error {
          color: #ff5f56;
        }
        .info {
          color: #ffbd2e;
        }
      </style>
    </head>
    <body>
      <div class="terminal">
        <div class="header">
          <div class="dots">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
          </div>
          <div class="title">Terminal - DevForge Demo</div>
        </div>
        <div class="output" id="output">
          <span class="prompt">user@devforge:~$</span> <span class="cursor" id="cursor"></span>
        </div>
      </div>
      <script>
        const output = document.getElementById('output');
        const cursor = document.getElementById('cursor');
        
        // Animation steps
        const steps = [
          { action: 'type', text: 'devforge start', delay: 1000 },
          { action: 'enter', delay: 500 },
          { action: 'response', text: '\\nFinding available port starting from 5050...\\nServer started with PID: 10324 on port 5050\\nHealth endpoint available at: http://localhost:5051/health\\n\\n--- SERVER INFO ---\\nStatus: Running\\nUptime: 0.5s\\nMemory: 24.8MB\\nOS: Windows\\nNode: v16.14.0\\n', delay: 2000 },
          { action: 'type', text: 'curl http://localhost:5051/health', delay: 1000 },
          { action: 'enter', delay: 500 },
          { action: 'response', text: '\\n{\\n  "status": "running",\\n  "uptime": 12.4,\\n  "pid": 10324,\\n  "port": 5050,\\n  "memory": "24.8MB",\\n  "os": "windows",\\n  "node": "v16.14.0",\\n  "timestamp": "2025-05-13T03:05:48.000Z"\\n}\\n', delay: 2000 },
          { action: 'type', text: 'devforge status', delay: 1000 },
          { action: 'enter', delay: 500 },
          { action: 'response', text: '\\nStatus: Running\\nPID: 10324\\nPort: 5050\\nHealth endpoint: http://localhost:5051/health\\nStart time: 2025-05-13T03:05:48.000Z\\nUptime: 25.42 seconds\\n', delay: 2000 },
          { action: 'type', text: 'devforge restart', delay: 1000 },
          { action: 'enter', delay: 500 },
          { action: 'response', text: '\\nStopping server with PID 10324...\\nServer stopped successfully\\nFinding available port starting from 5050...\\nPort 5050 is already in use, trying 5052...\\nServer started with PID: 10428 on port 5052\\nHealth endpoint available at: http://localhost:5053/health\\n', delay: 1000 },
          { action: 'type', text: 'devforge stop', delay: 1000 },
          { action: 'enter', delay: 500 },
          { action: 'response', text: '\\nStopping server with PID 10428...\\nServer stopped successfully\\n', delay: 1000 }
        ];
        
        let stepIndex = 0;
        let charIndex = 0;
        
        function animateStep() {
          if (stepIndex >= steps.length) return;
          
          const step = steps[stepIndex];
          
          if (step.action === 'type' && charIndex < step.text.length) {
            // Type character by character
            const currentChar = step.text[charIndex];
            const span = document.createElement('span');
            span.className = 'command';
            span.textContent = currentChar;
            cursor.parentNode.insertBefore(span, cursor);
            charIndex++;
            setTimeout(animateStep, 100);
          } 
          else if (step.action === 'type' && charIndex >= step.text.length) {
            // Finished typing
            setTimeout(() => {
              stepIndex++;
              charIndex = 0;
              animateStep();
            }, step.delay);
          }
          else if (step.action === 'enter') {
            // Create new prompt
            output.innerHTML += '\\n';
            setTimeout(() => {
              stepIndex++;
              charIndex = 0;
              animateStep();
            }, step.delay);
          }
          else if (step.action === 'response') {
            // Show response
            const response = document.createElement('span');
            response.className = 'response';
            response.innerHTML = step.text.replace(/\\n/g, '<br>').replace(/Port 5050 is already in use/g, '<span class="info">Port 5050 is already in use</span>').replace(/Server started with PID/g, '<span class="highlight">Server started with PID</span>').replace(/Server stopped successfully/g, '<span class="highlight">Server stopped successfully</span>');
            output.appendChild(response);
            
            // Add new prompt
            const newLine = document.createElement('div');
            newLine.innerHTML = '<span class="prompt">user@devforge:~$</span> ';
            output.appendChild(newLine);
            newLine.appendChild(cursor);
            
            setTimeout(() => {
              stepIndex++;
              charIndex = 0;
              animateStep();
            }, step.delay);
          }
        }
        
        // Start after a short delay
        setTimeout(animateStep, 1000);
      </script>
    </body>
    </html>`
  );
  
  // Step 3: Navigate to the HTML file
  await page.goto('file://' + terminalHtml.replace(/\\/g, '/'));
  
  // Step 4: Take screenshots
  console.log('Capturing frames...');
  
  // Clear any existing frames
  fs.readdirSync(frameDir).forEach(file => {
    fs.unlinkSync(path.join(frameDir, file));
  });
  
  // Capture frames for 20 seconds (200 frames at 10fps)
  for (let i = 0; i < 200; i++) {
    const frameNumber = String(i).padStart(5, '0');
    await page.screenshot({ 
      path: path.join(frameDir, `frame-${frameNumber}.png`),
      type: 'png'
    });
    await new Promise(r => setTimeout(r, 100)); // 100ms between frames
  }
  
  // Step 5: Create GIF
  console.log('Creating GIF...');
  try {
    // Check if ImageMagick is installed
    await exec('convert -version');
    
    // Create GIF using ImageMagick
    await exec(`convert -delay 10 -loop 0 "${frameDir}/frame-*.png" "${outputFile}"`);
    console.log(`Demo GIF created at: ${outputFile}`);
  } catch (error) {
    console.error('Error creating GIF:', error.message);
    console.log('Please install ImageMagick to create GIFs, or use a tool like ScreenToGif to convert the frames manually.');
  }
  
  // Cleanup
  await browser.close();
  console.log('Demo creation completed!');
}

// Run the demo creation
createDemo().catch(err => {
  console.error('Error creating demo:', err);
  process.exit(1);
}); 