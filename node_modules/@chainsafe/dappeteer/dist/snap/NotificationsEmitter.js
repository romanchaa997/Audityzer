"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strict_event_emitter_1 = require("strict-event-emitter");
const helpers_1 = require("../helpers");
class NotificationsEmitter extends strict_event_emitter_1.StrictEventEmitter {
    constructor(page, notificationTimeout = 30000) {
        super();
        this.page = page;
        this.notificationTimeout = notificationTimeout;
    }
    async exposeEmitNotificationToWindow() {
        await this.notificationsTab.exposeFunction("emitNotification", (notification) => {
            this.emit("notification", notification);
        });
    }
    async openNotificationPage() {
        const newPage = await this.page.browser().newPage();
        await newPage.goto(this.page.url());
        await (0, helpers_1.accountOptionsDropdownClick)(newPage);
        await (0, helpers_1.clickOnElement)(newPage, "Notifications");
        await newPage.waitForSelector(".notifications__container", {
            timeout: this.notificationTimeout,
        });
        this.notificationsTab = newPage;
    }
    async observeNotificationsMutation() {
        await this.notificationsTab.evaluate(() => {
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.addedNodes.length) {
                        const element = mutation.addedNodes[0];
                        window.emitNotification({ message: element.innerText });
                        observer.disconnect();
                    }
                }
            });
            observer.observe(document.querySelector(".notifications__container"), {
                childList: true,
            });
        });
    }
    async setup() {
        await this.openNotificationPage();
        await this.exposeEmitNotificationToWindow();
        await this.observeNotificationsMutation();
    }
    async cleanup() {
        this.removeAllListeners("notification");
        await this.notificationsTab.close();
    }
    async waitForNotification() {
        return (await NotificationsEmitter.once(this, "notification"));
    }
}
exports.default = NotificationsEmitter;
