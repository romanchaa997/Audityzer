"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemporaryUserDataDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const getTemporaryUserDataDir = () => fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), `dappeteer-temporary-user-data-dir-`));
exports.getTemporaryUserDataDir = getTemporaryUserDataDir;
