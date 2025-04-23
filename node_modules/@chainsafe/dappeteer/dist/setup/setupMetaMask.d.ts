import { DappeteerBrowser } from "../browser";
import { DappeteerPage } from "../page";
import { Dappeteer, MetaMaskOptions } from "../types";
/**
 * Setup MetaMask with base account
 * */
declare type Step<Options> = (page: DappeteerPage, options?: Options) => void | Promise<void>;
export declare function setupMetaMask<Options = MetaMaskOptions>(browser: DappeteerBrowser, options?: Options, steps?: Step<Options>[]): Promise<Dappeteer>;
export declare function setupBootstrappedMetaMask(browser: DappeteerBrowser, password: string): Promise<Dappeteer>;
export {};
