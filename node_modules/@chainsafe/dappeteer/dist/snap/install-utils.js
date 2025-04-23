"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSnapServer = exports.toUrl = void 0;
const http_1 = __importDefault(require("http"));
const serve_handler_1 = __importDefault(require("serve-handler"));
function toUrl(address) {
    if (typeof address === "string") {
        return address;
    }
    return `http://localhost:${address.port}`;
}
exports.toUrl = toUrl;
async function startSnapServer(snapDist) {
    const server = http_1.default.createServer((req, res) => {
        void (0, serve_handler_1.default)(req, res, {
            public: snapDist,
            headers: [
                {
                    source: "**/*",
                    headers: [
                        {
                            key: "Cache-Control",
                            value: "no-cache",
                        },
                        {
                            key: "Access-Control-Allow-Origin",
                            value: "*",
                        },
                    ],
                },
            ],
        });
    });
    await new Promise((resolve) => {
        server.listen(0, () => {
            resolve();
        });
    });
    return server;
}
exports.startSnapServer = startSnapServer;
