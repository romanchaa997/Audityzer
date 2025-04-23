import { DappeteerPage } from "../page";
import { GetSingedIn, SetSignedIn } from ".";
export declare const unlock: (page: DappeteerPage, setSignedIn: SetSignedIn, getSingedIn: GetSingedIn) => (password?: string) => Promise<void>;
