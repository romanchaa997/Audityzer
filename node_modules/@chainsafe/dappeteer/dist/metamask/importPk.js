"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPk = void 0;
const helpers_1 = require("../helpers");
const importPk = (page) => async (privateKey) => {
    await page.bringToFront();
    await (0, helpers_1.profileDropdownClick)(page);
    await (0, helpers_1.clickOnElement)(page, "Import account");
    await (0, helpers_1.typeOnInputField)(page, "Enter your private key string here:", privateKey);
    await (0, helpers_1.clickOnButton)(page, "import-account-confirm-button");
    const errorMessage = await (0, helpers_1.getErrorMessage)(page);
    if (errorMessage)
        throw new SyntaxError(errorMessage);
};
exports.importPk = importPk;
