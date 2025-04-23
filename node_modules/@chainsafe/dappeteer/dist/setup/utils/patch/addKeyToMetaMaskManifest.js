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
exports.addKeyToMetaMaskManifest = void 0;
const path = __importStar(require("path"));
const fs_extra_1 = require("fs-extra");
const DEFAULT_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjamYPwVQXybbRpzu+eIfPAy6WGb0dLqIEemi9CKTshabZg03Nqe7kqaMEWkHMWAk5MFgIhApMV7axEoidyWAlx/Vp5F9lNczfF8Nb1FaujNZKNnhkq98y2O6/PKK5oeHZAc/qwx3JFRBPRGdSE/cEeQzNGXRycnZucR3VAVMt3NI7DoGevCj+CYbqTITdVr7SqmiG8wfeIvIBOPJXo5jrNhjZ5de31mRYG8utDDd5cZN9dAG2ijKDnTTrvUBT3DomiuzzRhWAtSldvpQ0EJ/5rNEIkoStC1o5jKu5E7LQWqe+92My7YoaRPdIOjHmStlw6HKzjBfIloKFjv+9QIKqQIDAQAB";
const addKeyToMetaMaskManifest = (metaMaskPath, key = DEFAULT_KEY) => {
    const manifestPath = path.resolve(metaMaskPath, "manifest.json");
    const json = (0, fs_extra_1.readJsonSync)(manifestPath);
    json.key = key;
    (0, fs_extra_1.writeJsonSync)(manifestPath, json, { spaces: 2 });
};
exports.addKeyToMetaMaskManifest = addKeyToMetaMaskManifest;
