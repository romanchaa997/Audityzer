import { DappeteerPage } from "../page";
import { GetSingedIn } from ".";
export declare const sign: (page: DappeteerPage, getSingedIn: GetSingedIn) => () => Promise<void>;
