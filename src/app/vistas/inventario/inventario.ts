import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionesFila } from '../../componentes/acciones-fila/acciones-fila';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';
import { Store } from '../../controladores/store';
import { Pipa, Producto } from '../../modelos/models';
import { PipaDialogo } from './pipa-dialogo/pipa-dialogo';
import { ProductoDialogo } from './producto-dialogo/producto-dialogo';

@Component({
  selector: 'app-inventario',
  imports: [EncabezadoPagina, AccionesFila, CurrencyPipe, DatePipe],
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss',
})
export class Inventario {
  store = inject(Store);
  private dialog = inject(MatDialog);
  q = signal(''); qPipas = signal('');
  filtrados = computed(() => this.store.productos().filter(p => (p.nombre + p.tipo).toLowerCase().includes(this.q().toLowerCase())));
  pipasFiltradas = computed(() => this.store.pipas().filter(p => (p.pipa + p.recibio).toLowerCase().includes(this.qPipas().toLowerCase())));

  toggle(p: Producto) { this.store.guardar(this.store.productos, { ...p, activo: !p.activo }); }

  editarProducto(p?: Producto) {
    this.dialog.open(ProductoDialogo, { data: p ?? null, maxWidth: '95vw' }).afterClosed()
      .subscribe((r?: Producto) => r && this.store.guardar(this.store.productos, r));
  }

  editarPipa(p?: Pipa) {
    this.dialog.open(PipaDialogo, { data: p ?? null, maxWidth: '95vw' }).afterClosed().subscribe((r?: Pipa) => {
      if (!r) return;
      const nueva = !r.id;
      this.store.guardar(this.store.pipas, r);
      if (nueva) this.store.tanque.update(t => ({ ...t, litros: Math.min(t.capacidad, t.litros + r.capacidad) }));
    });
  }
}
