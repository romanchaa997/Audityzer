"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBootstrappedMetaMask = exports.setupMetaMask = void 0;
const metamask_1 = require("../metamask");
const helpers_1 = require("../helpers");
const setupActions_1 = require("./setupActions");
const defaultMetaMaskSteps = [
    setupActions_1.importAccount,
    setupActions_1.closeWhatsNewModal,
    setupActions_1.showTestNets,
    setupActions_1.enableEthSign,
];
const flaskMetaMaskSteps = [
    setupActions_1.acceptTheRisks,
    setupActions_1.importAccount,
    setupActions_1.closeWhatsNewModal,
    setupActions_1.showTestNets,
    setupActions_1.enableEthSign,
];
const MM_HOME_REGEX = "chrome-extension://[a-z]+/home.html";
function getDefaultSteps(browser) {
    if (browser.isMetaMaskFlask()) {
        return flaskMetaMaskSteps;
    }
    return defaultMetaMaskSteps;
}
async function setupMetaMask(browser, options, steps) {
    const page = await getMetaMaskPage(browser);
    steps = steps ?? getDefaultSteps(browser);
    await page.setViewport({ width: 1920, height: 1080 });
    // goes through the installation steps required by MetaMask
    for (const step of steps) {
        await step(page, options);
    }
    return (0, metamask_1.getMetaMask)(page);
}
exports.setupMetaMask = setupMetaMask;
async function setupBootstrappedMetaMask(browser, password) {
    const page = await getMetaMaskPage(browser);
    const metaMask = await (0, metamask_1.getMetaMask)(page);
    await metaMask.page.evaluate(() => {
        window.signedIn = false;
    });
    await page.waitForTimeout(100);
    await (0, helpers_1.waitForOverlay)(page);
    if (browser.isMetaMaskFlask())
        await (0, helpers_1.waitForOverlay)(page);
    await (0, helpers_1.retry)(() => metaMask.unlock(password), 3);
    await (0, helpers_1.waitForOverlay)(page);
    return metaMask;
}
exports.setupBootstrappedMetaMask = setupBootstrappedMetaMask;
async function getMetaMaskPage(browser) {
    const pages = await browser.pages();
    for (const page of pages) {
        if (page.url().match(MM_HOME_REGEX)) {
            return page;
        }
    }
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        browser.on("targetcreated", async (target) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            if (target.url().match(MM_HOME_REGEX)) {
                try {
                    const pages = await browser.pages();
                    for (const page of pages) {
                        if (page.url().match(MM_HOME_REGEX)) {
                            resolve(page);
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    });
}
