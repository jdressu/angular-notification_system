import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notification, NotificationType } from 'src/app/models/notification/notification.model';
import { NotificationService } from 'src/app/models/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  @Input() fade = true;

	overlayRef: any;

  // TODO: change into a local indexedDB table
  notificationSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private overlay: Overlay,
		private viewContainerRef: ViewContainerRef,
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.notificationSubscription = this.notificationService
      .onNotification()
      .subscribe((notification) => {
        // clear notifications when an empty notification is received
        if (!notification.message) {
          // filter out notifications without 'keepAfterRouteChange' flag
          this.notificationService.notifications = this.notificationService.notifications.filter((x) => x.keepAfterRouteChange === true);

          // remove 'keepAfterRouteChange' flag on the rest
          this.notificationService.notifications.forEach((x) => { x.keepAfterRouteChange = false; });
          return;
        }

        // add notification to array
        this.notificationService.notifications.push(notification);

        // auto close notification if required
        if (notification.autoClose) {
          setTimeout(() => this.removeNotification(notification), 3000);
        }
      });

    // clear notifications on location change
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.notificationService.clear();
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.notificationSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

	ngAfterViewInit(): void {
		this.openNotifications();
	}

	openNotifications(): void {
		this.overlayRef = this.overlay.create({
			panelClass: 'notifications-container'
		});
		this.overlayRef.attach(
			new TemplatePortal(this.template, this.viewContainerRef)
		);
	}

  removeNotification(notification: Notification) {
    // check if already removed to prevent error on auto close
    if (!this.notificationService.notifications.includes(notification)) return;

    if (this.fade) {
      // fade out notification
      const fadeOutNotification = this.notificationService.notifications.find((x) => x === notification);
      if (fadeOutNotification) { fadeOutNotification.fade = true; }      

      // remove notification after faded out
      setTimeout(() => {
        this.notificationService.notifications = this.notificationService.notifications.filter((x) => x !== notification);
      }, 250);
    } else {
      this.notificationService.notifications = this.notificationService.notifications.filter((x) => x !== notification);
    }
  }

  cssClass(notification: Notification) {
    if (!notification) return;

    const classes = ['notification', 'notification-dismissable'];

    const notificationTypeClass = {
      [NotificationType.Success]: 'notification notification-success',
      [NotificationType.Error]: 'notification notification-danger',
      [NotificationType.Info]: 'notification notification-info',
      [NotificationType.Warning]: 'notification notification-warning',
    };

    classes.push(notificationTypeClass[notification.type]);

    if (notification.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

}
