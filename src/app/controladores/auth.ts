import { Injectable, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from './store';
import { Usuario } from '../modelos/models';

@Injectable({ providedIn: 'root' })
export class Auth {
  private store = inject(Store);
  private router = inject(Router);
  usuario = signal<Usuario | null>(null);

  /** Mock: cualquier usuario activo del Store con contraseña = nombre de usuario. */
  login(user: string, pass: string): boolean {
    const u = this.store.usuarios().find(x => x.usuario === user.trim() && x.estado === 'activo');
    if (u && pass === u.usuario) { this.usuario.set(u); return true; }
    return false;
  }

  logout(): void { this.usuario.set(null); this.router.navigate(['/login']); }
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  return auth.usuario() ? true : inject(Router).createUrlTree(['/login']);
};
