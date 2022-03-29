import { Component } from '@angular/core';
import { NotificationService } from 'src/app/models/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(public notificationService: NotificationService) { }

}
