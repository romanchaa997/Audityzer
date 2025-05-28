module.exports = async function scrapeDOM(page) {
    return await page.evaluate(() => {
        return Array.from(document.querySelectorAll('*')).map(el => ({
            tag: el.tagName,
            id: el.id,
            class: el.className,
        }));
    });
};
