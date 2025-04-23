"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FLASK_USERDATA = exports.DEFAULT_METAMASK_USERDATA = exports.RECOMMENDED_METAMASK_VERSION = exports.setupBootstrappedMetaMask = exports.setupMetaMask = exports.launch = exports.initSnapEnv = exports.bootstrap = exports.getMetaMaskWindow = exports.getMetaMask = void 0;
// re-export
var metamask_1 = require("./metamask");
Object.defineProperty(exports, "getMetaMask", { enumerable: true, get: function () { return metamask_1.getMetaMask; } });
Object.defineProperty(exports, "getMetaMaskWindow", { enumerable: true, get: function () { return metamask_1.getMetaMaskWindow; } });
var setup_1 = require("./setup");
Object.defineProperty(exports, "bootstrap", { enumerable: true, get: function () { return setup_1.bootstrap; } });
Object.defineProperty(exports, "initSnapEnv", { enumerable: true, get: function () { return setup_1.initSnapEnv; } });
Object.defineProperty(exports, "launch", { enumerable: true, get: function () { return setup_1.launch; } });
Object.defineProperty(exports, "setupMetaMask", { enumerable: true, get: function () { return setup_1.setupMetaMask; } });
Object.defineProperty(exports, "setupBootstrappedMetaMask", { enumerable: true, get: function () { return setup_1.setupBootstrappedMetaMask; } });
// default constants
var constants_1 = require("./constants");
Object.defineProperty(exports, "RECOMMENDED_METAMASK_VERSION", { enumerable: true, get: function () { return constants_1.RECOMMENDED_METAMASK_VERSION; } });
Object.defineProperty(exports, "DEFAULT_METAMASK_USERDATA", { enumerable: true, get: function () { return constants_1.DEFAULT_METAMASK_USERDATA; } });
Object.defineProperty(exports, "DEFAULT_FLASK_USERDATA", { enumerable: true, get: function () { return constants_1.DEFAULT_FLASK_USERDATA; } });
