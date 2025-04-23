import { Dappeteer, DappeteerLaunchOptions, MetaMaskOptions } from "..";
import { DappeteerBrowser } from "../browser";
import { DappeteerPage } from "../page";
declare global {
    namespace NodeJS {
        interface Global {
            page: DappeteerPage;
            browser: DappeteerBrowser;
            metaMask: Dappeteer;
        }
    }
}
export declare type DapeteerJestConfig = Partial<{
    dappeteer: DappeteerLaunchOptions;
    metaMask: MetaMaskOptions;
}>;
