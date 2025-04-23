import { DappeteerPage } from "../page";
export declare const acceptAddNetwork: (page: DappeteerPage) => (shouldSwitch?: boolean) => Promise<void>;
export declare const rejectAddNetwork: (page: DappeteerPage) => () => Promise<void>;
