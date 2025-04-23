"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPlaywrightPage = void 0;
const elements_1 = require("./elements");
class DPlaywrightPage {
    constructor(page, browserSource) {
        this.page = page;
        this.browserSource = browserSource;
    }
    async screenshot(path) {
        await this.page.screenshot({
            path: path,
            fullPage: true,
        });
    }
    async $(selector) {
        return new elements_1.DPlaywrightElementHandle((await this.page.$(selector)));
    }
    $eval(selector, evalFn) {
        return this.page.$eval(selector, evalFn);
    }
    $$eval(selector, evalFn) {
        return this.page.$$eval(selector, evalFn);
    }
    async $$(selector) {
        return (await this.page.$$(selector)).map((e) => new elements_1.DPlaywrightElementHandle(e));
    }
    getSource() {
        return this.page;
    }
    url() {
        return this.page.url();
    }
    browser() {
        return this.browserSource;
    }
    bringToFront() {
        return this.page.bringToFront();
    }
    async goto(url, options) {
        await this.page.goto(url, options);
    }
    title() {
        return this.page.title();
    }
    close(options) {
        return this.page.close(options);
    }
    async reload() {
        await this.page.reload({ waitUntil: "networkidle" });
    }
    setViewport(opts) {
        return this.page.setViewportSize(opts);
    }
    waitForResponse(urlOrPredicate, options) {
        return this.page.waitForResponse(urlOrPredicate, options);
    }
    async waitForSelector(selector, opts) {
        return new elements_1.DPlaywrightElementHandle((await this.page.waitForSelector(selector, {
            timeout: opts?.timeout,
            state: opts?.visible ? "visible" : opts?.hidden ? "hidden" : "attached",
        })));
    }
    async waitForSelectorIsGone(selector, opts) {
        await this.page.waitForSelector(selector, {
            timeout: opts?.timeout,
            state: "hidden",
        });
    }
    waitForXPath(xpath, opts) {
        return this.waitForSelector(xpath, opts);
    }
    waitForTimeout(timeout) {
        return this.page.waitForTimeout(timeout);
    }
    evaluate(evaluateFn, params) {
        //@ts-expect-error
        return this.page.evaluate(evaluateFn, params);
    }
    async waitForFunction(pageFunction, params) {
        await this.page.waitForFunction(pageFunction, {}, params);
    }
    exposeFunction(name, callback) {
        return this.page.exposeFunction(name, callback);
    }
    async waitForNavigation(options) {
        return this.page.waitForNavigation(options);
    }
    type(selector, text, options) {
        return this.page.type(selector, text, options);
    }
}
exports.DPlaywrightPage = DPlaywrightPage;
