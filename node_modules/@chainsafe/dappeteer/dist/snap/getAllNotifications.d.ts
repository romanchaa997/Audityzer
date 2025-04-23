import { DappeteerPage } from "../page";
import { NotificationList } from "./types";
export declare const getAllNotifications: (page: DappeteerPage) => () => Promise<NotificationList>;
