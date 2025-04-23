/// <reference types="node" />
import { EventEmitter } from "events";
import { BrowserContext, Page } from "playwright";
import { DappeteerBrowser } from "../browser";
import { DappeteerPage } from "../page";
export declare class DPlaywrightBrowser extends EventEmitter implements DappeteerBrowser<BrowserContext, Page> {
    protected browser: BrowserContext;
    protected userDataDir: string;
    protected flask: boolean;
    constructor(browser: BrowserContext, userDataDir: string, flask?: boolean);
    wsEndpoint(): string;
    close(): Promise<void>;
    pages(): Promise<DappeteerPage<Page>[]>;
    newPage(): Promise<DappeteerPage<Page>>;
    getSource(): BrowserContext;
    isMetaMaskFlask(): boolean;
    getUserDataDirPath(): string;
    storeUserData(destination: string): boolean;
}
