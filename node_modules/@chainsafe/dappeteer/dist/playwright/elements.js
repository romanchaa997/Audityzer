"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPlaywrightElementHandle = void 0;
class DPlaywrightElementHandle {
    constructor(element) {
        this.element = element;
    }
    async $$(selector) {
        return (await this.element.$$(selector)).map((e) => new DPlaywrightElementHandle(e));
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
    type(value) {
        if (value === "") {
            return this.element.fill("");
        }
        return this.element.type(value);
    }
    click() {
        return this.element.click({
            force: true,
        });
    }
}
exports.DPlaywrightElementHandle = DPlaywrightElementHandle;
