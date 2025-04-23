"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeSnap = void 0;
const utils_1 = require("./utils");
async function invokeSnap(page, snapId, method, params) {
    (0, utils_1.flaskOnly)(page);
    const result = await page.evaluate(async (opts) => {
        try {
            return await window.ethereum.request({
                method: "wallet_invokeSnap",
                params: {
                    request: {
                        method: opts.method,
                        params: opts.params,
                    },
                    snapId: opts.snapId,
                },
            });
        }
        catch (e) {
            return e;
        }
    }, { snapId, method, params });
    if (result instanceof Error || (0, utils_1.isMetaMaskErrorObject)(result)) {
        throw result;
    }
    else {
        return result;
    }
}
exports.invokeSnap = invokeSnap;
