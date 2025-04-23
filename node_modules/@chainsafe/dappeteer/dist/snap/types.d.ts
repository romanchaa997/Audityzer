export interface InstallSnapResult {
    [id: string]: {
        blocked: boolean;
        enabled: boolean;
        permissionName: string;
        id: string;
        initialPermissions: Object;
        version: string;
    };
}
export declare type NotificationItem = {
    message: string;
};
export declare type NotificationList = NotificationItem[];
