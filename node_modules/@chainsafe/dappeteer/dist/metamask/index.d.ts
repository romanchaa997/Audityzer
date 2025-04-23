import { Dappeteer } from "..";
import { DappeteerBrowser } from "../browser";
import { DappeteerPage } from "../page";
export declare type SetSignedIn = (state: boolean) => Promise<void>;
export declare type GetSingedIn = () => Promise<boolean>;
export declare const getMetaMask: (page: DappeteerPage) => Promise<Dappeteer>;
/**
 * Return MetaMask instance
 * */
export declare function getMetaMaskWindow(browser: DappeteerBrowser): Promise<Dappeteer>;
