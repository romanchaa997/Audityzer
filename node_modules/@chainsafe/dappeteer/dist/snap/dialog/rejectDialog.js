"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectDialog = void 0;
const helpers_1 = require("../../helpers");
const helpers_2 = require("./helpers");
const rejectDialog = (page) => async () => {
    await (0, helpers_1.retry)(async () => {
        await (0, helpers_2.ensureIsInDialog)(page);
        await Promise.race([
            (0, helpers_1.clickOnButton)(page, "Reject", { timeout: 1000 }),
            (0, helpers_1.clickOnButton)(page, "Cancel", { timeout: 1000 }),
        ]);
    }, 5);
};
exports.rejectDialog = rejectDialog;
