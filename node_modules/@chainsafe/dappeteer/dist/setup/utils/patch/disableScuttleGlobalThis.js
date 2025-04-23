"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableScuttleGlobalThis = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const disableScuttleGlobalThis = (metaMaskPath) => {
    const runtimeLavaMoatPath = path_1.default.resolve(metaMaskPath, "runtime-lavamoat.js");
    const file = (0, fs_1.readFileSync)(runtimeLavaMoatPath, "utf8");
    const patchedFile = file.replace(`"scuttleGlobalThis":{"enabled":true`, `"scuttleGlobalThis":{"enabled":false`);
    (0, fs_1.writeFileSync)(runtimeLavaMoatPath, patchedFile);
};
exports.disableScuttleGlobalThis = disableScuttleGlobalThis;
