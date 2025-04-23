"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lock = void 0;
const helpers_1 = require("../helpers");
const lock = (page, setSignedIn, getSingedIn) => async () => {
    if (!(await getSingedIn())) {
        throw new Error("You can't sign out because you haven't signed in yet");
    }
    await page.bringToFront();
    await (0, helpers_1.accountOptionsDropdownClick)(page);
    await (0, helpers_1.clickOnButton)(page, "global-menu-lock");
    await setSignedIn(false);
};
exports.lock = lock;
