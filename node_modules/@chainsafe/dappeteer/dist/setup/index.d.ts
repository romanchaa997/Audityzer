import { DappeteerBrowser } from "../browser";
import { DappeteerPage } from "../page";
import { InstallSnapOptions } from "../snap/install";
import { Dappeteer, DappeteerLaunchOptions, MetaMaskOptions } from "../types";
export * from "./launch";
export * from "./setupMetaMask";
/**
 * Launches browser and installs required metamask version along with setting up initial account
 */
export declare const bootstrap: ({ seed, password, showTestNets, ...launchOptions }: DappeteerLaunchOptions & MetaMaskOptions) => Promise<{
    metaMask: Dappeteer;
    browser: DappeteerBrowser;
    metaMaskPage: DappeteerPage;
}>;
/**
 * Used to quickly bootstrap dappeteer testing environment with installed snap
 */
export declare const initSnapEnv: (opts: DappeteerLaunchOptions & MetaMaskOptions & InstallSnapOptions & {
    snapIdOrLocation: string;
}) => Promise<{
    metaMask: Dappeteer;
    browser: DappeteerBrowser;
    metaMaskPage: DappeteerPage;
    snapId: string;
}>;
