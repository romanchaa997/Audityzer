"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlock = void 0;
const helpers_1 = require("../helpers");
const unlock = (page, setSignedIn, getSingedIn) => async (password = "password1234") => {
    if (await getSingedIn()) {
        throw new Error("You can't sign in because you are already signed in");
    }
    await page.bringToFront();
    await (0, helpers_1.typeOnInputField)(page, "Password", password);
    await (0, helpers_1.clickOnButton)(page, "Unlock");
    await setSignedIn(true);
};
exports.unlock = unlock;
