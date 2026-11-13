import { Component } from '@angular/core';

@Component({
  selector: 'app-birthday-templates',
  standalone: false,
  templateUrl: './birthday-templates.html',
  styleUrls: ['./birthday-templates.scss']
})
export class BirthdayTemplatesComponent {

  templates = [

    {
      id: 1,
      name: 'Plantilla de cumpleaños 1',
      message: '¡Feliz cumpleaños!',
      imageUrl: ''
    }

  ];

}
