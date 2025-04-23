"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchPlaywright = void 0;
async function launchPlaywright(metamaskPath, userDataDir, options) {
    const browser = await (await Promise.resolve().then(() => __importStar(require("playwright")))).chromium.launchPersistentContext(userDataDir, {
        ...(options.playwrightOptions ?? {}),
        headless: options.headless,
        args: [
            "--accept-lang=en",
            "--window-size=1920,1080",
            `--disable-extensions-except=${metamaskPath}`,
            `--load-extension=${metamaskPath}`,
            ...(options.playwrightOptions?.args || []),
            ...(options.headless ? ["--headless=new"] : []),
        ],
    });
    const { DPlaywrightBrowser } = await Promise.resolve().then(() => __importStar(require("../playwright")));
    return new DPlaywrightBrowser(browser, userDataDir, options.metaMaskFlask);
}
exports.launchPlaywright = launchPlaywright;
