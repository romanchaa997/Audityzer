"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPuppeteerBrowser = void 0;
const events_1 = require("events");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../helpers/utils");
const page_1 = require("./page");
class DPuppeteerBrowser extends events_1.EventEmitter {
    constructor(browser, userDataDir, flask = false) {
        super();
        this.browser = browser;
        this.userDataDir = userDataDir;
        this.flask = flask;
        this.browser.on("targetcreated", (page) => this.emit("targetcreated", page));
    }
    wsEndpoint() {
        return this.browser.wsEndpoint();
    }
    async close() {
        await this.browser.close();
        fs_1.default.rmSync(this.userDataDir, { recursive: true, force: true });
    }
    async pages() {
        return (await this.browser.pages()).map((p) => {
            return new page_1.DPupeteerPage(p, this);
        });
    }
    async newPage() {
        return new page_1.DPupeteerPage(await this.browser.newPage(), this);
    }
    getSource() {
        return this.browser;
    }
    isMetaMaskFlask() {
        return this.flask;
    }
    getUserDataDirPath() {
        return this.userDataDir;
    }
    storeUserData(destination) {
        const location = path_1.default.resolve(destination);
        try {
            (0, utils_1.copyUserDataFiles)(this.userDataDir, location);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
exports.DPuppeteerBrowser = DPuppeteerBrowser;
