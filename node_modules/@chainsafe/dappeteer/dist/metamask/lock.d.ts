import { DappeteerPage } from "../page";
import { GetSingedIn, SetSignedIn } from "./index";
export declare const lock: (page: DappeteerPage, setSignedIn: SetSignedIn, getSingedIn: GetSingedIn) => () => Promise<void>;
