import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import {
  AppNotification,
  NotificationService
} from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification-bell',
  standalone: false,
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.scss'
})
export class NotificationBellComponent implements OnInit {

  notificaciones: AppNotification[] = [];
  abierto = false;
  cargando = false;

  private readonly lastSeenKey = 'epq_notifications_last_seen';

  constructor(
    private readonly service: NotificationService,
    private readonly elemento: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  /** Novedades posteriores a la última vez que se marcaron leídas. */
  get noLeidas(): number {
    const limite = this.ultimaVista();
    return this.notificaciones.filter(
      (n) => new Date(n.date).getTime() > limite
    ).length;
  }

  toggle(): void {
    this.abierto = !this.abierto;
  }

  @HostListener('document:click', ['$event'])
  cerrarSiFuera(event: MouseEvent): void {
    if (!this.elemento.nativeElement.contains(event.target as Node)) {
      this.abierto = false;
    }
  }

  cargar(): void {
    this.cargando = true;
    this.service.cargar().subscribe({
      next: (items) => {
        this.notificaciones = items;
        this.cargando = false;
      },
      error: () => {
        this.notificaciones = [];
        this.cargando = false;
      }
    });
  }

  marcarLeidas(): void {
    try {
      localStorage.setItem(this.lastSeenKey, new Date().toISOString());
    } catch {
      // modo privado / almacenamiento bloqueado
    }
  }

  private ultimaVista(): number {
    try {
      const valor = localStorage.getItem(this.lastSeenKey);
      if (valor) {
        const tiempo = new Date(valor).getTime();
        if (!isNaN(tiempo)) return tiempo;
      }
    } catch {
      // sin localStorage (SSR): caemos al límite por defecto
    }
    return Date.now() - 7 * 24 * 60 * 60 * 1000;
  }
}
