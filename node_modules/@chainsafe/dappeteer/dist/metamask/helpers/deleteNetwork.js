"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNetwork = void 0;
const helpers_1 = require("../../helpers");
const deleteNetwork = (page) => async (name) => {
    await page.bringToFront();
    await (0, helpers_1.openNetworkDropdown)(page);
    const network = await (0, helpers_1.getElementByContent)(page, name);
    await network.hover();
    const deleteButton = await page.waitForXPath(`//*[contains(text(), '${name}')]/following-sibling::i`);
    await deleteButton.click();
    await (0, helpers_1.clickOnButton)(page, "Delete");
    await (0, helpers_1.clickOnLogo)(page);
};
exports.deleteNetwork = deleteNetwork;
