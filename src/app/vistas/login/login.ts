import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../controladores/auth';

@Component({ selector: 'app-login', imports: [FormsModule], templateUrl: './login.html', styleUrl: './login.scss' })
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  usuario = ''; clave = '';
  error = signal(false);

  entrar() {
    if (this.auth.login(this.usuario, this.clave)) this.router.navigate(['/inicio']);
    else this.error.set(true);
  }
}
