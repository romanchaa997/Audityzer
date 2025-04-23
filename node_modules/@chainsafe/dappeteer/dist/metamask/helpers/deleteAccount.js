"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = void 0;
const helpers_1 = require("../../helpers");
const deleteAccount = (page) => async (accountNumber) => {
    await page.bringToFront();
    if (accountNumber === 1)
        throw new SyntaxError("Account 1 cannot be deleted");
    await (0, helpers_1.profileDropdownClick)(page);
    const optionsButtons = await page.$$(`[data-testid="account-list-item-menu-button"]`);
    const targetAccountButton = optionsButtons[accountNumber - 1];
    await targetAccountButton.click();
    try {
        await (0, helpers_1.clickOnElement)(page, "Remove account");
        await (0, helpers_1.clickOnButton)(page, "Remove");
    }
    catch (e) {
        throw new SyntaxError("Only imported accounts can be deleted");
    }
    await page.reload();
};
exports.deleteAccount = deleteAccount;
