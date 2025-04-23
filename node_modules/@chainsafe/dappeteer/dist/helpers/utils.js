"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyUserDataFiles = exports.getDappateerPath = exports.retry = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
async function retry(fn, count) {
    let error;
    for (let i = 0; i < count; i++) {
        try {
            return await fn();
        }
        catch (e) {
            error = e;
        }
    }
    throw error;
}
exports.retry = retry;
function getDappateerPath() {
    try {
        return path_1.default.dirname(require.resolve("@chainsafe/dappeteer/package.json"));
    }
    catch {
        return path_1.default.resolve();
    }
}
exports.getDappateerPath = getDappateerPath;
// blacklisted words for copy
const copyUserDataFilesExclude = ["LOCK", "Cache", "SingletonLock"];
function copyUserDataFiles(from, to) {
    (0, fs_extra_1.copySync)(path_1.default.resolve(from), to, {
        overwrite: true,
        recursive: true,
        filter: (src) => !copyUserDataFilesExclude.some((word) => src.includes(word)),
    });
}
exports.copyUserDataFiles = copyUserDataFiles;
