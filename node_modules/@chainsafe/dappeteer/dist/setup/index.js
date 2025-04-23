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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSnapEnv = exports.bootstrap = void 0;
const launch_1 = require("./launch");
const setupMetaMask_1 = require("./setupMetaMask");
__exportStar(require("./launch"), exports);
__exportStar(require("./setupMetaMask"), exports);
/**
 * Launches browser and installs required metamask version along with setting up initial account
 */
const bootstrap = async ({ seed, password, showTestNets, ...launchOptions }) => {
    const browser = await (0, launch_1.launch)(launchOptions);
    const metaMask = await (launchOptions.userDataDir
        ? (0, setupMetaMask_1.setupBootstrappedMetaMask)(browser, password)
        : (0, setupMetaMask_1.setupMetaMask)(browser, {
            seed,
            password,
            showTestNets,
        }));
    return {
        metaMask,
        browser,
        metaMaskPage: metaMask.page,
    };
};
exports.bootstrap = bootstrap;
/**
 * Used to quickly bootstrap dappeteer testing environment with installed snap
 */
const initSnapEnv = async (opts) => {
    const browser = await (0, launch_1.launch)({
        ...opts,
        metaMaskFlask: true,
    });
    const { snapIdOrLocation, seed, password, showTestNets } = opts;
    const metaMask = await (0, setupMetaMask_1.setupMetaMask)(browser, {
        seed,
        password,
        showTestNets,
    });
    const metaMaskPage = metaMask.page;
    const snapId = await metaMask.snaps.installSnap(snapIdOrLocation, opts);
    return {
        metaMask,
        browser,
        metaMaskPage,
        snapId,
    };
};
exports.initSnapEnv = initSnapEnv;
