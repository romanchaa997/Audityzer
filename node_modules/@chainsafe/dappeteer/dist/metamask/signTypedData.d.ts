import { DappeteerPage } from "../page";
import { GetSingedIn } from ".";
export declare const signTypedData: (page: DappeteerPage, getSingedIn: GetSingedIn) => () => Promise<void>;
