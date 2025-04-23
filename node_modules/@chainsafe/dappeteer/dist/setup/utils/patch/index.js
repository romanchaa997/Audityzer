"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchMetaMask = void 0;
const addKeyToMetaMaskManifest_1 = require("./addKeyToMetaMaskManifest");
const disableScuttleGlobalThis_1 = require("./disableScuttleGlobalThis");
const patchMetaMask = (metamaskPath, options) => {
    (0, addKeyToMetaMaskManifest_1.addKeyToMetaMaskManifest)(metamaskPath, options.key);
    (0, disableScuttleGlobalThis_1.disableScuttleGlobalThis)(metamaskPath);
};
exports.patchMetaMask = patchMetaMask;
