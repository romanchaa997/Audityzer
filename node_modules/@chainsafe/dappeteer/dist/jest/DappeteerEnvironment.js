"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_environment_node_1 = __importDefault(require("jest-environment-node"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const index_1 = require("../index");
const puppeteer_2 = require("../puppeteer");
const getTemporaryUserDataDir_1 = require("../setup/utils/getTemporaryUserDataDir");
class DappeteerEnvironment extends jest_environment_node_1.default {
    constructor(config) {
        super(config);
    }
    async setup() {
        await super.setup();
        // get the wsEndpoint
        const wsEndpoint = process.env.DAPPETEER_WS_ENDPOINT;
        if (!wsEndpoint) {
            throw new Error("wsEndpoint not found");
        }
        const userData = process.env.DAPPETEER_USER_DATA_PATH || (0, getTemporaryUserDataDir_1.getTemporaryUserDataDir)();
        // connect to puppeteer
        const browser = await puppeteer_1.default.connect({
            browserWSEndpoint: wsEndpoint,
        });
        this.global.browser = browser;
        this.global.metamask = await (0, index_1.getMetaMaskWindow)(new puppeteer_2.DPuppeteerBrowser(browser, userData, false));
        this.global.page = await browser.newPage();
    }
}
module.exports = DappeteerEnvironment;
