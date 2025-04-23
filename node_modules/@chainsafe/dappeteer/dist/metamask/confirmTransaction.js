"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTransaction = void 0;
const helpers_1 = require("../helpers");
const confirmTransaction = (page, getSingedIn) => async (options) => {
    await page.bringToFront();
    if (!(await getSingedIn())) {
        throw new Error("You haven't signed in yet");
    }
    //retry till we get prompt
    await (0, helpers_1.retry)(async () => {
        await page.bringToFront();
        await page.reload();
        await (0, helpers_1.waitForOverlay)(page);
        await (0, helpers_1.getElementByTestId)(page, "edit-gas-fee-button", {
            timeout: 500,
        });
    }, 15);
    if (options) {
        await (0, helpers_1.clickOnButton)(page, "edit-gas-fee-button");
        await (0, helpers_1.clickOnButton)(page, "edit-gas-fee-item-custom");
        //non EIP1559 networks don't have priority fee. TODO: run separate Ganache with older hardfork to test this
        if (options.priority)
            await (0, helpers_1.typeOnInputField)(page, "Priority Fee", // priority-fee-input
            String(options.priority), true, true, true);
        if (options.gas)
            await (0, helpers_1.typeOnInputField)(page, "Max base fee", // base-fee-input
            String(options.priority), true, true, true);
        if (options.gasLimit) {
            await (0, helpers_1.clickOnButton)(page, "advanced-gas-fee-edit");
            await (0, helpers_1.typeOnInputField)(page, "Gas limit", // gas-limit-input
            String(options.priority), true, true, true);
        }
        await (0, helpers_1.clickOnButton)(page, "Save");
    }
    await page.waitForSelector('[data-testid="page-container-footer-next"]:not([disabled])');
    await (0, helpers_1.clickOnButton)(page, "Confirm");
};
exports.confirmTransaction = confirmTransaction;
