"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDialog = void 0;
const helpers_1 = require("../../helpers");
const helpers_2 = require("./helpers");
const typeDialog = (page) => async (value) => {
    await (0, helpers_1.retry)(async () => {
        await (0, helpers_2.ensureIsInDialog)(page);
        await page.type(".snap-prompt input", value);
    }, 5);
};
exports.typeDialog = typeDialog;
