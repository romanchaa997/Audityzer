"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirstElementAppearsFirst = exports.isElementVisible = exports.isMetaMaskErrorObject = exports.flaskOnly = void 0;
function flaskOnly(page) {
    if (!page.browser().isMetaMaskFlask()) {
        throw new Error("This method is only available when running MetaMask Flask");
    }
}
exports.flaskOnly = flaskOnly;
function isMetaMaskErrorObject(e) {
    if (e == undefined)
        return false;
    if (!(e instanceof Object))
        return false;
    if (!("code" in e))
        return false;
    if (!("message" in e))
        return false;
    if (!("data" in e))
        return false;
    if (!("originalError" in e["data"]))
        return false;
    return true;
}
exports.isMetaMaskErrorObject = isMetaMaskErrorObject;
function isElementVisible(page, selector, timeout = 1000) {
    return new Promise((resolve) => {
        page
            .waitForSelector(selector, { visible: true, timeout })
            .then(() => {
            resolve(true);
        })
            .catch(() => {
            resolve(false);
        });
    });
}
exports.isElementVisible = isElementVisible;
function getWaitingPromise(page, selectorOrXpath, timeout) {
    if (selectorOrXpath.startsWith("//")) {
        return page.waitForXPath(selectorOrXpath, { timeout });
    }
    else {
        return page.waitForSelector(selectorOrXpath, { timeout });
    }
}
async function isFirstElementAppearsFirst({ selectorOrXpath1, selectorOrXpath2, page, timeout = 4000, }) {
    const promise1 = getWaitingPromise(page, selectorOrXpath1, timeout).then(() => true);
    const promise2 = getWaitingPromise(page, selectorOrXpath2, timeout).then(() => false);
    return await Promise.race([promise1, promise2]);
}
exports.isFirstElementAppearsFirst = isFirstElementAppearsFirst;
