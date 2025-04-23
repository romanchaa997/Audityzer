"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPuppeteerElementHandle = void 0;
class DPuppeteerElementHandle {
    constructor(element) {
        this.element = element;
    }
    async $$(selector) {
        return (await this.element.$$(selector)).map((e) => new DPuppeteerElementHandle(e));
    }
    hover() {
        return this.element.hover();
    }
    evaluate(fn) {
        return this.element.evaluate(async (e) => await fn(e));
    }
    getSource() {
        return this.element;
    }
    async type(value) {
        if (value === "") {
            //hack as there is no clear method in puppeteer
            await this.element.click({ clickCount: 3 });
            await this.element.press("Backspace");
        }
        return this.element.type(value);
    }
    click() {
        return this.element.click();
    }
}
exports.DPuppeteerElementHandle = DPuppeteerElementHandle;
