"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationEmitter = void 0;
const NotificationsEmitter_1 = __importDefault(require("./NotificationsEmitter"));
const getNotificationEmitter = (page) => async () => {
    const emitter = new NotificationsEmitter_1.default(page);
    await emitter.setup();
    return emitter;
};
exports.getNotificationEmitter = getNotificationEmitter;
