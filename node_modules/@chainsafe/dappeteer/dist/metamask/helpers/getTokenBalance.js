"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenBalance = void 0;
const helpers_1 = require("../../helpers");
const getTokenBalance = (page) => async (tokenSymbol) => {
    await page.bringToFront();
    await (0, helpers_1.clickOnButton)(page, "Tokens");
    const assetListItems = await page.$$(`[data-testid="multichain-token-list-item-value"]`);
    for (let index = 0; index < assetListItems.length; index++) {
        const assetListItem = assetListItems[index];
        const tokenText = await page.evaluate((assetListItem) => {
            return assetListItem.innerText;
        }, assetListItem.getSource());
        if (tokenText.split(" ")[1].toUpperCase() === tokenSymbol.toUpperCase()) {
            const balance = tokenText.split(" ")[0];
            return parseFloat(balance);
        }
    }
    return 0;
};
exports.getTokenBalance = getTokenBalance;
