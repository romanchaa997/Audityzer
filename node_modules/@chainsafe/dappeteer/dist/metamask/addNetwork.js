"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectAddNetwork = exports.acceptAddNetwork = void 0;
const helpers_1 = require("../helpers");
const acceptAddNetwork = (page) => async (shouldSwitch = false) => {
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await page.waitForSelector(".confirmation-page", {
            timeout: 1000,
        });
        await (0, helpers_1.clickOnButton)(page, "Approve", { timeout: 500 });
    }, 5);
    if (shouldSwitch) {
        await (0, helpers_1.clickOnButton)(page, "Switch network");
        await page.waitForSelector(".new-network-info__wrapper", {
            visible: true,
        });
        await (0, helpers_1.clickOnButton)(page, "Got it");
    }
    else {
        await (0, helpers_1.clickOnButton)(page, "Cancel");
    }
};
exports.acceptAddNetwork = acceptAddNetwork;
const rejectAddNetwork = (page) => async () => {
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await (0, helpers_1.clickOnButton)(page, "Cancel", { timeout: 500 });
    }, 5);
};
exports.rejectAddNetwork = rejectAddNetwork;
