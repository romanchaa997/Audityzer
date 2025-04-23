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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDirectory = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
const fs = __importStar(require("fs"));
const https_1 = require("https");
const path = __importStar(require("path"));
const node_stream_zip_1 = __importDefault(require("node-stream-zip"));
exports.defaultDirectory = path.resolve("node_modules", ".cache", ".metamask");
exports.default = async (version, options) => {
    const location = options.location;
    const metaMaskDirectory = typeof location === "string"
        ? location
        : location?.extract || exports.defaultDirectory;
    const downloadDirectory = typeof location === "string"
        ? location
        : location?.download || path.resolve(exports.defaultDirectory, "download");
    console.log(`Getting MetaMask ${options.flask ? "flask" : ""} extension version: ${version}`);
    console.log(`extension stored in directory: ${metaMaskDirectory}`);
    console.log(`downloaded files stored in: ${downloadDirectory}`, "\n");
    if (version !== "latest") {
        let filename = version.replace(/\./g, "_");
        if (options?.flask) {
            filename = "flask_" + filename;
        }
        const extractDestination = path.resolve(metaMaskDirectory, filename);
        if (fs.existsSync(extractDestination)) {
            console.log("Found already available extension files - skipping download");
            return extractDestination;
        }
    }
    const { filename, downloadUrl, tag } = await getMetaMaskReleases(version, options?.flask ?? false);
    let destFilename = tag.replace(/\./g, "_");
    if (options?.flask) {
        destFilename = "flask_" + destFilename;
    }
    const extractDestination = path.resolve(metaMaskDirectory, destFilename);
    if (!fs.existsSync(extractDestination)) {
        const downloadedFile = await downloadMetaMaskReleases(filename, downloadUrl, downloadDirectory);
        console.log("Unpacking release");
        const zip = new node_stream_zip_1.default.async({ file: downloadedFile });
        fs.mkdirSync(extractDestination);
        await zip.extract(null, extractDestination);
        console.log("Unpack successful");
    }
    else {
        console.log("Found already available extension files - skipping download");
    }
    return extractDestination;
};
const request = (url) => new Promise((resolve) => {
    const request = (0, https_1.get)(url, (response) => {
        if (response.statusCode == 302) {
            const redirectRequest = (0, https_1.get)(response.headers.location, resolve);
            redirectRequest.on("error", (error) => {
                console.warn("request redirected error:", error.message);
                throw error;
            });
        }
        else {
            resolve(response);
        }
    });
    request.on("error", (error) => {
        console.warn("request error:", error.message);
        throw error;
    });
});
const downloadMetaMaskReleases = (name, url, location) => 
// eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
new Promise(async (resolve) => {
    if (!fs.existsSync(location)) {
        fs.mkdirSync(location, { recursive: true });
    }
    console.log("Downloading MetaMask release");
    const fileLocation = path.join(location, name);
    const file = fs.createWriteStream(fileLocation);
    const stream = await request(url);
    stream.pipe(file);
    stream.on("end", () => {
        console.log("Download successful");
        resolve(fileLocation);
    });
});
const metaMaskReleasesUrl = "https://api.github.com/repos/metamask/metamask-extension/releases";
const getMetaMaskReleases = (version, flask) => new Promise((resolve, reject) => {
    console.log("Searching for MetaMask release");
    const request = (0, https_1.get)(metaMaskReleasesUrl, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
        let body = "";
        response.on("data", (chunk) => {
            body += chunk;
        });
        response.on("end", () => {
            const data = JSON.parse(body);
            if (data.message)
                return reject(data.message);
            for (const result of data) {
                if (result.draft)
                    continue;
                if (version === "latest" ||
                    result.name.includes(version) ||
                    result.tag_name.includes(version)) {
                    for (const asset of result.assets) {
                        if ((!flask && asset.name.includes("chrome")) ||
                            (flask &&
                                asset.name.includes("flask") &&
                                asset.name.includes("chrome"))) {
                            console.log("Found requested MetaMask release");
                            resolve({
                                downloadUrl: asset.browser_download_url,
                                filename: asset.name,
                                tag: result.tag_name,
                            });
                        }
                    }
                }
            }
            reject(`Version ${version} (flask: ${String(flask)}) not found!`);
        });
    });
    request.on("error", (error) => {
        console.warn("getMetaMaskReleases error:", error.message);
        throw error;
    });
});
