"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTypedData = void 0;
const helpers_1 = require("../helpers");
const signTypedData = (page, getSingedIn) => async () => {
    await page.bringToFront();
    if (!(await getSingedIn())) {
        throw new Error("You haven't signed in yet");
    }
    await page.reload();
    await (0, helpers_1.clickOnLittleDownArrowIfNeeded)(page);
    await (0, helpers_1.clickOnButton)(page, "Sign");
    // wait for MM to be back in a stable state
    await page.waitForSelector(".multichain-app-header", {
        visible: true,
    });
};
exports.signTypedData = signTypedData;
