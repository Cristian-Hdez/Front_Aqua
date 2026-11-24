import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccionesFila } from '../../componentes/acciones-fila/acciones-fila';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';
import { Store } from '../../controladores/store';

@Component({ selector: 'app-usuarios', imports: [EncabezadoPagina, AccionesFila, RouterLink], templateUrl: './usuarios.html' })
export class Usuarios {
  store = inject(Store);
  /** Provisional: el diseño no define el formulario de edición de usuarios. */
  alternarEstado(id: number) {
    const u = this.store.usuarios().find(x => x.id === id);
    if (u) this.store.guardar(this.store.usuarios, { ...u, estado: u.estado === 'activo' ? 'inactivo' : 'activo' });
  }
}
