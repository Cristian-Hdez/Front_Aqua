import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../controladores/auth';

@Component({
  selector: 'app-menu-lateral',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.scss',
})
export class MenuLateral {
  auth = inject(Auth);
  nav = [
    { ruta: '/inicio', texto: 'Inicio', icono: '🏠' },
    { ruta: '/inventario', texto: 'Inventario', icono: '📦' },
    { ruta: '/ventas', texto: 'Ventas', icono: '🛒' },
    { ruta: '/encargos', texto: 'Encargos', icono: '📋' },
    { ruta: '/contactos', texto: 'Contactos', icono: '📒' },
    { ruta: '/reportes', texto: 'Reportes', icono: '📊' },
    { ruta: '/usuarios', texto: 'Usuarios', icono: '👥' },
  ];
}
