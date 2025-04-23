import { DappeteerElementHandle } from "../element";
import { DappeteerPage } from "../page";
export declare const getElementByContent: (page: DappeteerPage, text: string, type?: string, options?: {
    timeout?: number;
    visible?: boolean;
}) => Promise<DappeteerElementHandle | null>;
export declare const getElementByTestId: (page: DappeteerPage, testId: string, options?: {
    visible?: boolean;
    detached?: boolean;
    hidden?: boolean;
    timeout?: number;
}) => Promise<DappeteerElementHandle | null>;
export declare const getInputByLabel: (page: DappeteerPage, text: string, excludeSpan?: boolean, timeout?: number) => Promise<DappeteerElementHandle>;
export declare const getSettingsSwitch: (page: DappeteerPage, text: string) => Promise<DappeteerElementHandle | null>;
export declare const getErrorMessage: (page: DappeteerPage) => Promise<string | false>;
export declare const getButton: (page: DappeteerPage, text: string, options?: {
    timeout?: number;
    visible?: boolean;
}) => Promise<DappeteerElementHandle>;
