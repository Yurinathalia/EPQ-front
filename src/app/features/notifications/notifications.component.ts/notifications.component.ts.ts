import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.ts.html',
  styleUrls: ['./notifications.component.ts.scss']
})
export class NotificationsComponent {

  notifications = [

    {
      employeeName: 'Jazmin Nathalia Garcia Ocampo',
      type: 'BIRTHDAY',
      date: '2026-11-15',
      status: 'SENT'
    },

    {
      employeeName: 'Luis Fernando Ramirez',
      type: 'BIRTHDAY',
      date: '2026-11-20',
      status: 'PENDING'
    }

  ];

}

