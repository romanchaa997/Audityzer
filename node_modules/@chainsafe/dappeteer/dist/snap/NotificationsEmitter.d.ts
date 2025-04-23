import { StrictEventEmitter } from "strict-event-emitter";
import { DappeteerPage } from "../page";
import { NotificationItem, NotificationList } from "./types";
interface EventsMap {
    notification: (notification: NotificationItem) => void;
}
declare class NotificationsEmitter extends StrictEventEmitter<EventsMap> {
    private page;
    private notificationTimeout;
    private notificationsTab;
    constructor(page: DappeteerPage, notificationTimeout?: number);
    private exposeEmitNotificationToWindow;
    private openNotificationPage;
    private observeNotificationsMutation;
    setup(): Promise<void>;
    cleanup(): Promise<void>;
    waitForNotification(): Promise<NotificationList>;
}
export default NotificationsEmitter;
