import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { Store } from '../../../controladores/store';
import { LineaVenta, Venta } from '../../../modelos/models';
import { TicketData, TicketDialogo } from '../ticket-dialogo/ticket-dialogo';

@Component({ selector: 'app-venta-dialogo', imports: [FormsModule, CurrencyPipe, Dialogo], templateUrl: './venta-dialogo.html', styleUrl: './venta-dialogo.scss' })
export class VentaDialogo {
  ref = inject(MatDialogRef<VentaDialogo>);
  private store = inject(Store);
  private dialog = inject(MatDialog);

  disponibles = computed(() => this.store.productos().filter(p => p.activo));
  productoId = this.disponibles()[0]?.id ?? 0;
  cantidad = 1;
  lineas = signal<LineaVenta[]>([]);
  total = computed(() => this.lineas().reduce((s, l) => s + l.subtotal, 0));

  agregar() {
    const p = this.store.productos().find(x => x.id === this.productoId);
    if (!p || this.cantidad < 1) return;
    this.lineas.update(ls => {
      const ex = ls.find(l => l.productoId === p.id);
      if (ex) return ls.map(l => (l.productoId === p.id ? { ...l, cantidad: l.cantidad + this.cantidad, subtotal: (l.cantidad + this.cantidad) * p.precio } : l));
      return [...ls, { productoId: p.id, nombre: p.nombre, cantidad: this.cantidad, subtotal: this.cantidad * p.precio }];
    });
    this.cantidad = 1;
  }
  quitar(id: number) { this.lineas.update(ls => ls.filter(l => l.productoId !== id)); }

  ticket() {
    this.dialog.open(TicketDialogo, { maxWidth: '95vw', data: { cliente: 'Público general', fecha: new Date().toISOString(), lineas: this.lineas(), total: this.total() } satisfies TicketData });
  }
  finalizar() {
    this.ref.close({ id: 0, cliente: 'Publico general', fecha: new Date().toISOString().slice(0, 16), lineas: this.lineas(), total: this.total() } satisfies Venta);
  }
}
