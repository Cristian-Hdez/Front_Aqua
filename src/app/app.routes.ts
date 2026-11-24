import { Routes } from '@angular/router';
import { MenuLateral } from './componentes/menu-lateral/menu-lateral';
import { authGuard } from './controladores/auth';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./vistas/login/login').then(m => m.Login) },
  {
    path: '', component: MenuLateral, canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', loadComponent: () => import('./vistas/inicio/inicio').then(m => m.Inicio) },
      { path: 'inventario', loadComponent: () => import('./vistas/inventario/inventario').then(m => m.Inventario) },
      { path: 'ventas', loadComponent: () => import('./vistas/ventas/ventas').then(m => m.Ventas) },
      { path: 'encargos', loadComponent: () => import('./vistas/encargos/encargos').then(m => m.Encargos) },
      { path: 'contactos', loadComponent: () => import('./vistas/contactos/contactos').then(m => m.Contactos) },
      { path: 'reportes', loadComponent: () => import('./vistas/reportes/reportes').then(m => m.Reportes) },
      { path: 'usuarios', loadComponent: () => import('./vistas/usuarios/usuarios').then(m => m.Usuarios) },
      { path: 'backup', loadComponent: () => import('./vistas/backup/backup').then(m => m.Backup) },
    ],
  },
  { path: '**', redirectTo: '' },
];
