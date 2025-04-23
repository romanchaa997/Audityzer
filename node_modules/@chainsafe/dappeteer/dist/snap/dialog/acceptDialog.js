"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptDialog = void 0;
const helpers_1 = require("../../helpers");
const helpers_2 = require("./helpers");
const acceptDialog = (page) => async () => {
    await (0, helpers_1.retry)(async () => {
        await (0, helpers_2.ensureIsInDialog)(page);
        await Promise.race([
            (0, helpers_1.clickOnButton)(page, "Approve", { timeout: 1000 }),
            (0, helpers_1.clickOnButton)(page, "Ok", { timeout: 1000 }),
            (0, helpers_1.clickOnButton)(page, "OK", { timeout: 1000 }),
            (0, helpers_1.clickOnButton)(page, "Submit", { timeout: 1000 }),
        ]);
    }, 5);
};
exports.acceptDialog = acceptDialog;
