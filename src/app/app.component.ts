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
  usuario = 'Mi cuenta';

  private readonly titulos: Record<string, string> = {
    '/dashboard': 'Panel principal',
    '/employees': 'Empleados',
    '/dependencies': 'Dependencias',
    '/activities': 'Actividades',
    '/activity-form': 'Nueva actividad',
    '/absences': 'Ausencias',
    '/absence-form': 'Nueva ausencia',
    '/history': 'Historial',
    '/statistics': 'Estadísticas',
    '/reports': 'Informes',
    '/birthdays': 'Cumpleaños',
    '/birthday-templates': 'Plantillas',
    '/birthday-template-form': 'Nueva plantilla'
  };

  constructor(private router: Router) {
    this.leerUsuario();
  }

  get isLoginRoute(): boolean {
    return this.router.url.split('?')[0] === '/login';
  }

  get tituloPagina(): string {
    const ruta = this.router.url.split('?')[0];
    if (this.titulos[ruta]) return this.titulos[ruta];
    if (ruta.startsWith('/dependency-detail/')) return 'Detalle de dependencia';
    if (ruta.startsWith('/activity-detail/')) return 'Detalle de actividad';
    return 'Panel principal';
  }

  /** Lee el nombre de usuario del token JWT ya guardado por AuthService. */
  private leerUsuario(): void {
    try {
      if (typeof localStorage === 'undefined') return;

      const token = localStorage.getItem('epq_access_token');
      if (!token) return;

      const payload = token.split('.')[1];
      if (!payload) return;

      const normalizado = payload.replace(/-/g, '+').replace(/_/g, '/');
      const relleno = '='.repeat((4 - (normalizado.length % 4)) % 4);
      const datos = JSON.parse(atob(normalizado + relleno));

      this.usuario = datos.username ?? datos.sub ?? 'Mi cuenta';
    } catch {
      this.usuario = 'Mi cuenta';
    }
  }
}
