"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDialogMethods = void 0;
const acceptDialog_1 = require("./acceptDialog");
const rejectDialog_1 = require("./rejectDialog");
const typeDialog_1 = require("./typeDialog");
const createDialogMethods = (page) => ({
    accept: (0, acceptDialog_1.acceptDialog)(page),
    reject: (0, rejectDialog_1.rejectDialog)(page),
    type: (0, typeDialog_1.typeDialog)(page),
});
exports.createDialogMethods = createDialogMethods;
