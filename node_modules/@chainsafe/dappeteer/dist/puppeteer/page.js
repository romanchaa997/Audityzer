"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPupeteerPage = void 0;
const elements_1 = require("./elements");
class DPupeteerPage {
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
        return new elements_1.DPuppeteerElementHandle(await this.page.$(selector));
    }
    $eval(selector, evalFn) {
        return this.page.$eval(selector, evalFn);
    }
    $$eval(selector, evalFn) {
        return this.page.$$eval(selector, evalFn);
    }
    async $$(selector) {
        return (await this.page.$$(selector)).map((e) => new elements_1.DPuppeteerElementHandle(e));
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
        if (options?.waitUntil === "networkidle") {
            options.waitUntil = "networkidle2";
        }
        //@ts-expect-error
        await this.page.goto(url, options);
    }
    title() {
        return this.page.title();
    }
    close(options) {
        return this.page.close(options);
    }
    async reload() {
        await this.page.reload({ waitUntil: "networkidle0" });
    }
    setViewport(opts) {
        return this.page.setViewport(opts);
    }
    waitForResponse(urlOrPredicate, options) {
        return this.page.waitForResponse(urlOrPredicate, options);
    }
    async waitForSelector(selector, opts) {
        return new elements_1.DPuppeteerElementHandle(await this.page.waitForSelector(selector, opts));
    }
    async waitForSelectorIsGone(selector, opts) {
        await this.page.waitForSelector(selector, {
            hidden: true,
            ...opts,
        });
    }
    async waitForXPath(xpath, opts) {
        return new elements_1.DPuppeteerElementHandle((await this.page.waitForXPath(xpath, opts)));
    }
    waitForTimeout(timeout) {
        return this.page.waitForTimeout(timeout);
    }
    evaluate(evaluateFn, params) {
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
exports.DPupeteerPage = DPupeteerPage;
