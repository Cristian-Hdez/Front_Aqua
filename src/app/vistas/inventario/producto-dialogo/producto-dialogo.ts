import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { Producto } from '../../../modelos/models';

export const TIPOS_PRODUCTO = ['Garrafon 20LTS', 'Garrafon 10LTS', 'Insumo - Tapa', 'Insumo - Sello', 'Prod. Limpieza', 'Llenado 20LTS', 'Llenado 10LTS', 'Agua'];

@Component({ selector: 'app-producto-dialogo', imports: [FormsModule, Dialogo], templateUrl: './producto-dialogo.html' })
export class ProductoDialogo {
  ref = inject(MatDialogRef<ProductoDialogo>);
  tipos = TIPOS_PRODUCTO;
  f: Producto = { ...(inject<Producto | null>(MAT_DIALOG_DATA) ?? { id: 0, nombre: '', tipo: TIPOS_PRODUCTO[0], precio: 0, stock: 0, stockMinimo: 0, disponibilidad: 'Disponible', activo: true }) };

  guardar() {
    if (!this.f.nombre.trim()) return;
    this.f.disponibilidad = this.f.tipo.startsWith('Llenado') ? 'Servicio' : 'Disponible';
    this.ref.close(this.f);
  }
}
