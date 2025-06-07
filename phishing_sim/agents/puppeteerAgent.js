const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const url = process.argv[2];
    const scriptUrlsFile = path.join(__dirname, '../script_urls.json');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);
    const scriptElements = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        return scripts.map(script => script.src);
    });

    fs.writeFileSync(scriptUrlsFile, JSON.stringify(scriptElements, null, 2));

    await browser.close();
})();
