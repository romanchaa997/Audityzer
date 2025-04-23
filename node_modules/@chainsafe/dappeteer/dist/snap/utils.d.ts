import { DappeteerPage } from "../page";
export declare function flaskOnly(page: DappeteerPage): void;
export declare function isMetaMaskErrorObject(e: unknown): boolean;
export declare function isElementVisible(page: DappeteerPage, selector: string, timeout?: number): Promise<boolean>;
interface IsFirstElementAppearsFirstParams {
    selectorOrXpath1: string;
    selectorOrXpath2: string;
    timeout?: number;
    page: DappeteerPage;
}
export declare function isFirstElementAppearsFirst({ selectorOrXpath1, selectorOrXpath2, page, timeout, }: IsFirstElementAppearsFirstParams): Promise<boolean>;
export {};
