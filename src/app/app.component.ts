import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-epq';

  constructor(private router: Router) {}

  get isLoginRoute(): boolean {
    return this.router.url.split('?')[0] === '/login';
  }
}
