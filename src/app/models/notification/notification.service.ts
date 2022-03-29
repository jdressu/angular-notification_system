import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Notification, NotificationType } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

	notifications: Notification[] = [];
  
  private subject = new Subject<Notification>();

  onNotification(): Observable<Notification> {
    return this.subject.asObservable();//.pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    const success = new Notification();
    success.type = NotificationType.Success;
    success.message = message;
    Object.assign(success, options);
    
    this.notify(success);
  }

  error(message: string, options?: any) {
    const error = new Notification();
    error.type = NotificationType.Error;
    error.message = message;
    Object.assign(error, options);
    
    this.notify(error);
  }

  info(message: string, options?: any) {
    const info = new Notification();
    info.type = NotificationType.Info;
    info.message = message;
    Object.assign(info, options);

    this.notify(info);
  }

  warn(message: string, options?: any) {
    const warn = new Notification();
    warn.type = NotificationType.Warning;
    warn.message = message;
    Object.assign(warn, options);

    this.notify(warn);
  }
  
  notify(notification: Notification) {
    this.subject.next(notification);
  }

  clear() {
    const clear = new Notification();
    this.subject.next(clear);
  }

}
