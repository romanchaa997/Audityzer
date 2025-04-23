"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchAccount = void 0;
const helpers_1 = require("../helpers");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const switchAccount = (page) => async (accountNumber) => {
    await page.bringToFront();
    await (0, helpers_1.profileDropdownClick)(page);
    // TODO: use different approach? maybe change param to account name
    await (0, helpers_1.clickOnElement)(page, `Account ${accountNumber}`);
    await (0, helpers_1.clickOnLogo)(page);
};
exports.switchAccount = switchAccount;
