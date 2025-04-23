"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotifications = void 0;
const helpers_1 = require("../helpers");
const getAllNotifications = (page) => async () => {
    await page.bringToFront();
    await (0, helpers_1.accountOptionsDropdownClick)(page);
    await (0, helpers_1.clickOnElement)(page, "Notifications");
    await page.waitForSelector(".notifications__item__details__message");
    return await page.$$eval(".notifications__item__details__message", (elements) => elements.map((element) => ({ message: element.textContent })));
};
exports.getAllNotifications = getAllNotifications;
