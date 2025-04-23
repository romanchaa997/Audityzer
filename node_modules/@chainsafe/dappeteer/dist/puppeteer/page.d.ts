import { Browser, ElementHandle, EvaluateFunc, NodeFor, Page, WaitForOptions } from "puppeteer";
import { DappeteerBrowser } from "../browser";
import { DappeteerElementHandle } from "../element";
import { DappeteerPage, Response, Serializable } from "../page";
export declare class DPupeteerPage implements DappeteerPage<Page> {
    protected page: Page;
    protected browserSource: DappeteerBrowser<Browser, Page>;
    constructor(page: Page, browserSource: DappeteerBrowser<Browser, Page>);
    screenshot(path: string): Promise<void>;
    $(selector: string): Promise<DappeteerElementHandle<ElementHandle>>;
    $eval<Selector extends string, Params extends unknown[], Func extends EvaluateFunc<[ElementHandle<NodeFor<Selector>>, ...Params]>>(selector: Selector, evalFn: Func): Promise<any>;
    $$eval<T>(selector: string, evalFn: (e: HTMLElement[]) => T[] | Promise<T[]>): Promise<T[]>;
    $$(selector: string): Promise<DappeteerElementHandle<ElementHandle>[]>;
    getSource(): Page;
    url(): string;
    browser(): DappeteerBrowser<Browser, Page>;
    bringToFront(): Promise<void>;
    goto(url: string, options?: {
        timeout?: number;
        waitUntil?: "load" | "domcontentloaded" | "networkidle2" | "networkidle" | "commit";
    }): Promise<void>;
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
    }>): Promise<DappeteerElementHandle<ElementHandle<Element>>>;
    waitForSelectorIsGone(selector: string, opts?: Partial<{
        timeout: number;
    }>): Promise<void>;
    waitForXPath(xpath: string, opts?: Partial<{
        visible: boolean;
        timeout: number;
    }>): Promise<DappeteerElementHandle<ElementHandle<Node>>>;
    waitForTimeout(timeout: number): Promise<void>;
    evaluate<Params, Result>(evaluateFn: (params?: Params) => Result | string, params?: Params): Promise<Result>;
    waitForFunction<Params extends Serializable>(pageFunction: () => {} | string, params?: Params): Promise<void>;
    exposeFunction(name: string, callback: Function): Promise<void>;
    waitForNavigation(options: WaitForOptions): Promise<Response | null>;
    type(selector: string, text: string, options?: {
        delay: number;
    }): Promise<void>;
}
