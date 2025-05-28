const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());



const browser = await puppeteer.launch({
    headless: "new", // краще для обходу
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled'
    ],
});

async function scrapePage(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    // Extract all script URLs from the page
    const scriptUrls = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        return scripts.map(script => script.src);
    });

    await browser.close();

    // Write script URLs to a JSON file
    const outputFilePath = path.join(__dirname, 'script_urls.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(scriptUrls, null, 2));

    console.log(`Script URLs saved to ${outputFilePath}`);
}

// Example usage
scrapePage('https://parik-24.io');
