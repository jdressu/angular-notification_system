export class Notification {
    
    id: number = 0;
    type!: NotificationType;
    message!: string;
    autoClose: boolean = false;
    keepAfterRouteChange: boolean = false;
    fade: boolean = false;

}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning
}
