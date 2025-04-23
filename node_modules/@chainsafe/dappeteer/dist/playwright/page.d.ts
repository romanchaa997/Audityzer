import { BrowserContext, ElementHandle, Page } from "playwright";
import { DappeteerBrowser } from "../browser";
import { DappeteerElementHandle } from "../element";
import { DappeteerPage, Response, Unboxed } from "../page";
export declare class DPlaywrightPage implements DappeteerPage<Page> {
    protected page: Page;
    protected browserSource: DappeteerBrowser<BrowserContext, Page>;
    constructor(page: Page, browserSource: DappeteerBrowser<BrowserContext, Page>);
    screenshot(path: string): Promise<void>;
    $(selector: string): Promise<DappeteerElementHandle<ElementHandle>>;
    $eval<T>(selector: string, evalFn: (e: HTMLElement) => T | Promise<T>): Promise<T>;
    $$eval<T>(selector: string, evalFn: (e: HTMLElement[]) => T[] | Promise<T[]>): Promise<T[]>;
    $$(selector: string): Promise<DappeteerElementHandle<ElementHandle>[]>;
    getSource(): Page;
    url(): string;
    browser(): DappeteerBrowser<BrowserContext, Page>;
    bringToFront(): Promise<void>;
    goto(url: string, options: {}): Promise<void>;
    title(): Promise<string>;
    close(options?: {
        runBeforeUnload?: boolean;
    }): Promise<void>;
    reload(): Promise<void>;
    setViewport(opts: {
        height: number;
        width: number;
    }): Promise<void>;
    waitForResponse(urlOrPredicate: string | ((res: Response) => boolean | Promise<boolean>), options?: {
        timeout?: number;
    }): Promise<Response>;
    waitForSelector(selector: string, opts?: Partial<{
        visible: boolean;
        timeout: number;
        hidden: boolean;
    }>): Promise<DappeteerElementHandle<ElementHandle<HTMLElement>>>;
    waitForSelectorIsGone(selector: string, opts?: Partial<{
        timeout: number;
    }>): Promise<void>;
    waitForXPath(xpath: string, opts?: Partial<{
        visible: boolean;
        timeout: number;
    }>): Promise<DappeteerElementHandle<ElementHandle>>;
    waitForTimeout(timeout: number): Promise<void>;
    evaluate<Params, Result>(evaluateFn: (params?: Params) => Result | string, params?: Params): Promise<Result>;
    waitForFunction<Args>(pageFunction: (params?: Unboxed<Args>) => void | string, params?: Args): Promise<void>;
    exposeFunction(name: string, callback: Function | {
        default: Function;
    }): Promise<void>;
    waitForNavigation(options?: {
        timeout: number;
    }): Promise<Response | null>;
    type(selector: string, text: string, options?: {
        delay: number;
    }): Promise<void>;
}
