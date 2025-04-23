"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const utils_1 = require("../helpers/utils");
const playwright_1 = require("./playwright");
const puppeteer_1 = require("./puppeteer");
const isNewerVersion_1 = require("./utils/isNewerVersion");
const metaMaskDownloader_1 = __importDefault(require("./utils/metaMaskDownloader"));
const getTemporaryUserDataDir_1 = require("./utils/getTemporaryUserDataDir");
const patch_1 = require("./utils/patch");
/**
 * Launch Puppeteer chromium instance with MetaMask plugin installed
 * */
async function launch(options = {}) {
    if (!options.metaMaskVersion && !options.metaMaskPath) {
        options.metaMaskVersion = __1.RECOMMENDED_METAMASK_VERSION;
    }
    if (options.headless === undefined) {
        options.headless = true;
    }
    let metamaskPath;
    if (options.metaMaskVersion) {
        const { metaMaskVersion, metaMaskLocation } = options;
        if (metaMaskVersion === "latest")
            console.warn("\x1b[33m%s\x1b[0m", `It is not recommended to run MetaMask with "latest" version. Use it at your own risk or set to the recommended version "${__1.RECOMMENDED_METAMASK_VERSION}".`);
        else if ((0, isNewerVersion_1.isNewerVersion)(__1.RECOMMENDED_METAMASK_VERSION, metaMaskVersion))
            console.warn("\x1b[33m%s\x1b[0m", `Seems you are running newer version of MetaMask that recommended by dappeteer team.
      Use it at your own risk or set to the recommended version "${__1.RECOMMENDED_METAMASK_VERSION}".`);
        else if ((0, isNewerVersion_1.isNewerVersion)(metaMaskVersion, __1.RECOMMENDED_METAMASK_VERSION))
            console.warn("\x1b[33m%s\x1b[0m", `Seems you are running older version of MetaMask that recommended by dappeteer team.
      Use it at your own risk or set the recommended version "${__1.RECOMMENDED_METAMASK_VERSION}".`);
        else
            console.log(`
        Running tests on MetaMask version ${metaMaskVersion} 
        Flask version: ${String(options.metaMaskFlask ?? false)}, 
        Headless: ${String(options.headless)}
        `);
        console.log(); // new line
        metamaskPath = await (0, metaMaskDownloader_1.default)(metaMaskVersion, {
            location: metaMaskLocation,
            flask: options.metaMaskFlask,
        });
    }
    else {
        console.log(`Running tests on local MetaMask build`);
        metamaskPath = options.metaMaskPath;
    }
    (0, patch_1.patchMetaMask)(metamaskPath, { key: options.key });
    const userDataDir = (0, getTemporaryUserDataDir_1.getTemporaryUserDataDir)();
    if (options.userDataDir)
        (0, utils_1.copyUserDataFiles)(path_1.default.resolve(options.userDataDir), userDataDir);
    if (options.automation) {
        switch (options.automation) {
            case "custom":
                console.warn("Custom automation in use. Proceed at own risk.");
                if (!options.customAutomation) {
                    fs_1.default.rmSync(userDataDir, { recursive: true, force: true });
                    throw new Error("Missing customBootstrap method in options");
                }
                return await options.customAutomation(metamaskPath, userDataDir, options);
            case "playwright":
                return await (0, playwright_1.launchPlaywright)(metamaskPath, userDataDir, options);
            case "puppeteer":
                return await (0, puppeteer_1.launchPuppeteer)(metamaskPath, userDataDir, options);
            default:
                fs_1.default.rmSync(userDataDir, { recursive: true, force: true });
                throw new Error("Unsupported automation tool. Use playwright or puppeteer");
        }
    }
    else {
        try {
            return await (0, playwright_1.launchPlaywright)(metamaskPath, userDataDir, options);
            // eslint-disable-next-line no-empty
        }
        catch (ignored) { }
        try {
            return await (0, puppeteer_1.launchPuppeteer)(metamaskPath, userDataDir, options);
        }
        catch (error) {
            fs_1.default.rmSync(userDataDir, { recursive: true, force: true });
            throw new Error("Failed to launch both playwright and puppeteer");
        }
    }
}
exports.launch = launch;
