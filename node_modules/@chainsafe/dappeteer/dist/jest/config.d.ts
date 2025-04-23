import { DappeteerLaunchOptions } from "../index";
import { DapeteerJestConfig } from "./global";
export declare const DAPPETEER_DEFAULT_CONFIG: DappeteerLaunchOptions;
export declare function getDappeteerConfig(): Promise<DapeteerJestConfig>;
