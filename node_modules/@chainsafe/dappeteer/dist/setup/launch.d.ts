import { DappeteerBrowser } from "../browser";
import { DappeteerLaunchOptions } from "../types";
/**
 * Launch Puppeteer chromium instance with MetaMask plugin installed
 * */
export declare function launch(options?: DappeteerLaunchOptions): Promise<DappeteerBrowser>;
