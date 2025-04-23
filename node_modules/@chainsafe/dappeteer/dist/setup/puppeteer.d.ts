import { DappeteerBrowser } from "../browser";
import { DappeteerLaunchOptions } from "../types";
export declare function launchPuppeteer(metamaskPath: string, userDataDir: string, options: DappeteerLaunchOptions): Promise<DappeteerBrowser>;
