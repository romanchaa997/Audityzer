import { DappeteerBrowser } from "../browser";
import { DappeteerLaunchOptions } from "../types";
export declare function launchPlaywright(metamaskPath: string, userDataDir: string, options: DappeteerLaunchOptions): Promise<DappeteerBrowser>;
