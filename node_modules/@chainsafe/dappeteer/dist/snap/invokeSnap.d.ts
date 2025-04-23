import { DappeteerPage, Serializable } from "../page";
export declare function invokeSnap<R = unknown, P extends Serializable = Serializable>(page: DappeteerPage, snapId: string, method: string, params?: P): ReturnType<typeof window.ethereum.request<R>>;
