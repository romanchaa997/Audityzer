import { DappeteerPage } from "../page";
import NotificationsEmitter from "./NotificationsEmitter";
export declare const getNotificationEmitter: (page: DappeteerPage) => () => Promise<NotificationsEmitter>;
