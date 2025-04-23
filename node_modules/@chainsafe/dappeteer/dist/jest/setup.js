"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const config_1 = require("./config");
async function default_1() {
    const { dappeteer, metaMask } = await (0, config_1.getDappeteerConfig)();
    const browser = await (0, index_1.launch)(dappeteer);
    try {
        await (0, index_1.setupMetaMask)(browser, metaMask);
        global.browser = browser;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw error;
    }
    process.env.DAPPETEER_WS_ENDPOINT = browser.wsEndpoint();
    process.env.DAPPETEER_USER_DATA_PATH = browser.getUserDataDirPath();
}
exports.default = default_1;
