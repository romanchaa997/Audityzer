"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FLASK_USERDATA = exports.DEFAULT_METAMASK_USERDATA = exports.RECOMMENDED_METAMASK_VERSION = exports.EXAMPLE_WEBSITE = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("./helpers/utils");
exports.EXAMPLE_WEBSITE = "http://example.org";
exports.RECOMMENDED_METAMASK_VERSION = "v11.0.0";
exports.DEFAULT_METAMASK_USERDATA = path_1.default.join((0, utils_1.getDappateerPath)(), "userData/chrome-mm");
exports.DEFAULT_FLASK_USERDATA = path_1.default.join((0, utils_1.getDappateerPath)(), "userData/chrome-flask");
