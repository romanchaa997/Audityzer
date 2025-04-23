"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchNetwork = void 0;
const helpers_1 = require("../helpers");
// TODO: validate - for now works fine as it is.
const switchNetwork = (page) => async (network = "mainnet") => {
    await page.bringToFront();
    await (0, helpers_1.openNetworkDropdown)(page);
    const networkIndex = await page.evaluate((network) => {
        const elements = document.querySelectorAll(".multichain-network-list-item__network-name");
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.innerText
                .toLowerCase()
                .includes(network.toLowerCase())) {
                return i;
            }
        }
        return 0;
    }, network);
    const networkFullName = await page.evaluate((index) => {
        const elements = document.querySelectorAll(`.multichain-network-list-item__network-name`);
        return elements[index].innerText;
    }, networkIndex);
    const networkButton = (await page.$$(".multichain-network-list-item__network-name"))[networkIndex];
    await networkButton.click();
    await page.waitForXPath(`//*[text() = '${networkFullName}']`);
};
exports.switchNetwork = switchNetwork;
