const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const fs = require('fs');
const path = require('path');

(async () => {
  // Launch Chrome using Puppeteer
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Get a page to use for the audit
  const page = await browser.newPage();
  
  // Prepare the browser session for auditing
  const { port } = new URL(browser.wsEndpoint());
  
  const options = {
    logLevel: 'info',
    output: 'html',
    port: port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    }
  };

  // Navigate to the local server
  console.log('Navigating to the local test page...');
  await page.goto('http://localhost:5000/audit-test.html');
  
  console.log('Running Lighthouse audit...');
  const runnerResult = await lighthouse.default('http://localhost:5000/audit-test.html', options);

  // Save the report
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lighthouse-report.html', reportHtml);

  console.log('Audit complete. Report saved to lighthouse-report.html');
  
  // Log scores to console
  const scores = Object.keys(runnerResult.lhr.categories).map(key => {
    return {
      name: runnerResult.lhr.categories[key].title,
      score: runnerResult.lhr.categories[key].score * 100
    };
  });
  
  console.log('Lighthouse scores:');
  scores.forEach(score => {
    const color = score.score >= 90 ? '\x1b[32m' : score.score >= 50 ? '\x1b[33m' : '\x1b[31m';
    console.log(`${color}${score.name}: ${score.score.toFixed(0)}\x1b[0m`);
  });

  // Close the browser
  await browser.close();
})(); 