import { DappeteerPage } from "../page";
export declare const clickOnSettingsSwitch: (page: DappeteerPage, text: string) => Promise<void>;
declare type Section = "General" | "Advanced" | "Contacts" | "Snaps" | "Security & privacy" | "Alerts" | "Networks" | "Experimental" | "About";
export declare const openSettingsScreen: (page: DappeteerPage, section?: Section) => Promise<void>;
export declare const openNetworkDropdown: (page: DappeteerPage) => Promise<void>;
export declare const profileDropdownClick: (page: DappeteerPage) => Promise<void>;
export declare const accountOptionsDropdownClick: (page: DappeteerPage, expectToClose?: boolean) => Promise<void>;
export declare const clickOnElement: (page: DappeteerPage, text: string, type?: string) => Promise<void>;
export declare const clickOnButton: (page: DappeteerPage, text: string, options?: {
    timeout?: number;
    visible?: boolean;
}) => Promise<void>;
export declare const clickOnNavigationButton: (metaMaskPage: DappeteerPage, text: string) => Promise<void>;
export declare const clickOnLogo: (page: DappeteerPage) => Promise<void>;
export declare const goToHomePage: (page: DappeteerPage) => Promise<void>;
/**
 *
 * @param page
 * @param label
 * @param text
 * @param clear
 * @param excludeSpan
 * @param optional
 * @returns true if found and updated, false otherwise
 */
export declare const typeOnInputField: (page: DappeteerPage, label: string, text: string, clear?: boolean, excludeSpan?: boolean, optional?: boolean) => Promise<boolean>;
export declare function waitForOverlay(page: DappeteerPage): Promise<void>;
/**
 *
 * @param page
 */
export declare const clickOnLittleDownArrowIfNeeded: (page: DappeteerPage) => Promise<void>;
export declare const evaluateElementClick: (page: DappeteerPage, selector: string) => Promise<void>;
export {};
