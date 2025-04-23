/// <reference types="node" />
import { EventEmitter } from "events";
import { Browser, Page } from "puppeteer";
import { DappeteerBrowser } from "../browser";
import { DappeteerPage } from "../page";
export declare class DPuppeteerBrowser extends EventEmitter implements DappeteerBrowser<Browser, Page> {
    protected browser: Browser;
    protected userDataDir: string;
    protected flask: boolean;
    constructor(browser: Browser, userDataDir: string, flask?: boolean);
    wsEndpoint(): string;
    close(): Promise<void>;
    pages(): Promise<DappeteerPage<Page>[]>;
    newPage(): Promise<DappeteerPage<Page>>;
    getSource(): Browser;
    isMetaMaskFlask(): boolean;
    getUserDataDirPath(): string;
    storeUserData(destination: string): boolean;
}
