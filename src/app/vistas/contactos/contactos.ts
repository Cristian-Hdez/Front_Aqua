import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionesFila } from '../../componentes/acciones-fila/acciones-fila';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';
import { Store } from '../../controladores/store';
import { Contacto } from '../../modelos/models';
import { ContactoDialogo } from './contacto-dialogo/contacto-dialogo';

@Component({ selector: 'app-contactos', imports: [EncabezadoPagina, AccionesFila], templateUrl: './contactos.html' })
export class Contactos {
  store = inject(Store);
  private dialog = inject(MatDialog);
  q = signal('');
  filtrados = computed(() => this.store.contactos().filter(c => `${c.nombre} ${c.apellido} ${c.telefono}`.toLowerCase().includes(this.q().toLowerCase())));

  editar(c?: Contacto) {
    this.dialog.open(ContactoDialogo, { data: c ?? null, maxWidth: '95vw' }).afterClosed()
      .subscribe((r?: Contacto) => r && this.store.guardar(this.store.contactos, r));
  }
}
