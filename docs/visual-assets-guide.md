# Creating Visual Assets for Audityzer

This guide provides instructions for creating high-quality visual assets for your Audityzer documentation and interface.

## Required Visual Assets

For a complete Audityzer implementation, you should create the following visual assets:

1. **Project Banner** - A branded banner image for the top of your README
2. **Demo GIF** - An animated demonstration of your tool in action
3. **Interface Screenshots** - Images showing your testing interface
4. **Workflow Diagrams** - Visual explanations of testing processes
5. **Result Visualizations** - Examples of test results and reports

## Creating Screenshots

### Testing Interface Screenshots

Capture clear screenshots of:

- Wallet connection interfaces
- Transaction testing forms
- Error testing interfaces
- Test results dashboards

**Recommended tools:**

- Windows: [Snipping Tool](https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b)
- macOS: [Screenshot utility](https://support.apple.com/en-us/HT201361)
- Cross-platform: [Snagit](https://www.techsmith.com/screen-capture.html)

### Best Practices for Screenshots

1. Use a clean, professional browser window (hide unnecessary toolbars)
2. Ensure test data is realistic but not sensitive
3. Capture at standard resolutions (1920x1080 or 1366x768)
4. Use PNG format for interface screenshots
5. Compress images for web using tools like [TinyPNG](https://tinypng.com/)

## Creating Diagrams

### Workflow Diagrams

Create diagrams to illustrate:

- Test generation process
- Vulnerability detection workflow
- CI/CD integration
- Bridge security testing flow

**Recommended tools:**

- [draw.io](https://app.diagrams.net/) (free, web-based)
- [Lucidchart](https://www.lucidchart.com/) (freemium)
- [Mermaid](https://mermaid.js.org/) (code-based diagrams)

### Design Guidelines for Diagrams

1. Use consistent color scheme (match your project branding)
2. Keep diagrams simple and focused on key concepts
3. Use clear labels and explanatory text
4. Export at 1200-1500px width for optimal display
5. Use PNG format with transparent backgrounds

## Creating Demo GIFs

A good demo GIF shows:

1. Generating a security test
2. Running the test against a dApp
3. Viewing and interpreting results

**Recommended tools:**

- Windows: [ScreenToGif](https://www.screentogif.com/)
- macOS: [Gifox](https://gifox.io/) or [Kap](https://getkap.co/)
- Cross-platform: [Peek](https://github.com/phw/peek) (Linux)

### Best Practices for Demo GIFs

1. Keep under 30 seconds in length
2. Focus on key functionality
3. Use smooth movements and adequate pacing
4. Add captions if needed for clarity
5. Optimize file size (under 5MB if possible)
6. If needed, create multiple targeted GIFs rather than one long one

## Visualization Tools for Test Results

For creating compelling test result visualizations:

1. **Charts and Graphs:**

   - [Chart.js](https://www.chartjs.org/)
   - [D3.js](https://d3js.org/)

2. **Report Styling:**
   - Use consistent color coding for severity levels
   - Create clear visual hierarchies for information
   - Include summary visualizations at the top of reports

## Replacing Placeholder Images

After creating your visual assets:

1. Replace all placeholder files in the `assets/` directory
2. Maintain the existing filenames to preserve documentation links
3. Update any dimensions in the README if your images have different aspect ratios

## Automated Screenshot Capture

You can automate the capture of interface screenshots during test runs:

```javascript
// Example Playwright code for capturing screenshots
test('Capture wallet connection interface', async ({ page }) => {
  await page.goto('https://your-dapp.com');
  await page.click('#connect-wallet-button');

  // Wait for wallet interface to appear
  await page.waitForSelector('.wallet-selection-modal', { state: 'visible' });

  // Capture screenshot
  await page.screenshot({
    path: 'assets/img/screenshots/wallet-connection.png',
    fullPage: false,
  });
});
```

Remember, high-quality visual assets significantly improve the user experience and adoption of your Audityzer implementation!
