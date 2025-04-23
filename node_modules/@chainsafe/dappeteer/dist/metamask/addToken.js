"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectAddToken = exports.acceptAddToken = void 0;
const helpers_1 = require("../helpers");
const acceptAddToken = (page) => async () => {
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await (0, helpers_1.clickOnButton)(page, "Add token", { timeout: 500 });
    }, 5);
};
exports.acceptAddToken = acceptAddToken;
const rejectAddToken = (page) => async () => {
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await (0, helpers_1.clickOnButton)(page, "Cancel", { timeout: 500 });
    }, 5);
};
exports.rejectAddToken = rejectAddToken;
