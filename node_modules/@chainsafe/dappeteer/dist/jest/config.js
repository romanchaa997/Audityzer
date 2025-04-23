"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDappeteerConfig = exports.DAPPETEER_DEFAULT_CONFIG = void 0;
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
const node_process_1 = require("node:process");
const index_1 = require("../index");
exports.DAPPETEER_DEFAULT_CONFIG = {
    metaMaskVersion: index_1.RECOMMENDED_METAMASK_VERSION,
};
async function getDappeteerConfig() {
    const configPath = "dappeteer.config.js";
    const filePath = path_1.default.resolve((0, node_process_1.cwd)(), configPath);
    if (!(0, node_fs_1.existsSync)(filePath))
        return {
            dappeteer: exports.DAPPETEER_DEFAULT_CONFIG,
            metaMask: {},
        };
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    const config = await require(filePath);
    return {
        dappeteer: {
            ...exports.DAPPETEER_DEFAULT_CONFIG,
            ...config.dappeteer,
        },
        metaMask: {
            ...config.metaMask,
        },
    };
}
exports.getDappeteerConfig = getDappeteerConfig;
