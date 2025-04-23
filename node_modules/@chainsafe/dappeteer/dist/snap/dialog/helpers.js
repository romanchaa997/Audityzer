"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIsInDialog = void 0;
const helpers_1 = require("../../helpers");
const ensureIsInDialog = async (page) => {
    await page.bringToFront();
    if (await page
        .waitForSelector(".snap-delineator__wrapper", { timeout: 500 })
        .catch(() => false))
        return;
    await page.reload();
    await (0, helpers_1.waitForOverlay)(page);
};
exports.ensureIsInDialog = ensureIsInDialog;
