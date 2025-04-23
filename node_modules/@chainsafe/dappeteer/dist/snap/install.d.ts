import { DappeteerPage } from "../page";
export declare type InstallStep = (page: DappeteerPage) => Promise<void>;
export declare type InstallSnapOptions = {
    customSteps?: InstallStep[];
    version?: string;
    installationSnapUrl?: string;
};
export declare const installSnap: (flaskPage: DappeteerPage) => (snapIdOrLocation: string, opts?: InstallSnapOptions) => Promise<string>;
export declare function isSnapInstalled(flaskPage: DappeteerPage, snapId: string): Promise<boolean>;
