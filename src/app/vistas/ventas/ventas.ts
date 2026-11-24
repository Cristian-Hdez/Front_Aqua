import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionesFila } from '../../componentes/acciones-fila/acciones-fila';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';
import { Store } from '../../controladores/store';
import { Venta } from '../../modelos/models';
import { TicketData, TicketDialogo } from './ticket-dialogo/ticket-dialogo';
import { VentaDialogo } from './venta-dialogo/venta-dialogo';

@Component({ selector: 'app-ventas', imports: [EncabezadoPagina, AccionesFila, CurrencyPipe, DatePipe], templateUrl: './ventas.html' })
export class Ventas {
  store = inject(Store);
  private dialog = inject(MatDialog);
  q = signal('');
  filtradas = computed(() => this.store.ventas().filter(v => this.nombres(v).toLowerCase().includes(this.q().toLowerCase())));
  nombres = (v: Venta) => v.lineas.map(l => l.nombre).join(', ');
  cantidad = (v: Venta) => v.lineas.reduce((s, l) => s + l.cantidad, 0);

  nueva() {
    this.dialog.open(VentaDialogo, { maxWidth: '95vw' }).afterClosed().subscribe((v?: Venta) => {
      if (!v) return;
      this.store.guardar(this.store.ventas, v);
      // Descuenta stock de productos físicos (no de servicios como "Llenado").
      this.store.productos.update(ps => ps.map(p => {
        const l = v.lineas.find(x => x.productoId === p.id);
        return l && p.disponibilidad === 'Disponible' ? { ...p, stock: Math.max(0, p.stock - l.cantidad) } : p;
      }));
    });
  }

  /** "Editar" abre la vista previa del ticket de la venta. */
  ver(v: Venta) {
    this.dialog.open(TicketDialogo, { maxWidth: '95vw', data: { cliente: v.cliente, fecha: v.fecha, lineas: v.lineas, total: v.total } satisfies TicketData });
  }
}
