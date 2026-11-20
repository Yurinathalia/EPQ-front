import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  identificador = '';
  password = '';
  username = '';
  email = '';
  registrationPassword = '';
  isRegistering = false;
  showPassword = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  submit(): void {
    if (this.loading) return;

    if (this.isRegistering) {
      this.register();
      return;
    }

    if (!this.identificador.trim() || !this.password) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.authService.login({
      identificador: this.identificador.trim(),
      password: this.password
    }).subscribe({
      next: () => this.navigateAfterLogin(),
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(
          error,
          'No fue posible iniciar sesión. Verifica que el servidor esté disponible.'
        );
      }
    });
  }

  toggleMode(): void {
    if (this.loading) return;

    this.isRegistering = !this.isRegistering;
    this.showPassword = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private register(): void {
    const username = this.username.trim();
    const email = this.email.trim();

    if (!username || !email || this.registrationPassword.length < 6) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register({
      username,
      email,
      password: this.registrationPassword
    }).subscribe({
      next: () => {
        this.authService.login({
          identificador: username,
          password: this.registrationPassword
        }).subscribe({
          next: () => this.navigateAfterLogin(),
          error: () => {
            this.loading = false;
            this.isRegistering = false;
            this.identificador = username;
            this.password = '';
            this.registrationPassword = '';
            this.successMessage =
              'La cuenta se creó correctamente. Inicia sesión con tu usuario y contraseña.';
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(
          error,
          'No fue posible crear la cuenta. Verifica los datos e inténtalo de nuevo.'
        );
      }
    });
  }

  private navigateAfterLogin(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    void this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/dashboard');
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    if (error.status === 401) return 'Usuario o contraseña incorrectos.';
    if (error.status === 403) return 'No tienes permiso para acceder a esta aplicación.';
    if (error.status === 409) return 'El usuario o el correo electrónico ya están registrados.';
    if (error.status === 0) return 'No se pudo conectar con el servidor. Inténtalo más tarde.';

    const body: unknown = error.error;
    if (body && typeof body === 'object') {
      if ('mensaje' in body && typeof body.mensaje === 'string') {
        return body.mensaje;
      }

      const validationMessage = Object.values(body)
        .find((message): message is string => typeof message === 'string');
      if (validationMessage) return validationMessage;
    }

    return fallback;
  }

  verificationCode = '';

  emailVerified = false;

  sendVerificationCode(): void {

  if (!this.email) {

    this.errorMessage =
      'Debe ingresar un correo electrónico';

    return;

  }

  this.successMessage =
    'Código enviado al correo correctamente';

}

}
