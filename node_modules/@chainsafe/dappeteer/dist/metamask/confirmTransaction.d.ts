import { TransactionOptions } from "..";
import { DappeteerPage } from "../page";
import { GetSingedIn } from "./index";
export declare const confirmTransaction: (page: DappeteerPage, getSingedIn: GetSingedIn) => (options?: TransactionOptions) => Promise<void>;
