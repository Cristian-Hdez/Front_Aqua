import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionesFila } from '../../componentes/acciones-fila/acciones-fila';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';
import { Store } from '../../controladores/store';
import { Encargo, EstadoEncargo } from '../../modelos/models';
import { EncargoDialogo } from './encargo-dialogo/encargo-dialogo';
import { EncargoVistaPrevia } from './encargo-vista-previa/encargo-vista-previa';

@Component({ selector: 'app-encargos', imports: [EncabezadoPagina, AccionesFila, DatePipe], templateUrl: './encargos.html', styleUrl: './encargos.scss' })
export class Encargos {
  store = inject(Store);
  private dialog = inject(MatDialog);
  q = signal('');
  filtrados = computed(() => this.store.encargos().filter(e => `${e.nombre} ${e.apellido} ${e.telefono}`.toLowerCase().includes(this.q().toLowerCase())));
  cuenta = (estado: EstadoEncargo) => this.store.encargos().filter(e => e.estado === estado).length;
  entregadosHoy = computed(() => { const h = new Date().toISOString().slice(0, 10); return this.store.encargos().filter(e => e.estado === 'Entregado' && e.fechaEntrega === h).length; });

  editar(e?: Encargo) {
    this.dialog.open(EncargoDialogo, { data: e ?? null, maxWidth: '95vw' }).afterClosed().subscribe((r?: Encargo) => {
      if (!r) return;
      const guardado = this.store.guardar(this.store.encargos, r);
      this.dialog.open(EncargoVistaPrevia, { data: guardado, maxWidth: '95vw' });
    });
  }
}
