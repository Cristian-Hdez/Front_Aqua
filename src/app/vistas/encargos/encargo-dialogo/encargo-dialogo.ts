import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { Store } from '../../../controladores/store';
import { Encargo, EstadoEncargo } from '../../../modelos/models';

@Component({ selector: 'app-encargo-dialogo', imports: [FormsModule, Dialogo], templateUrl: './encargo-dialogo.html' })
export class EncargoDialogo {
  ref = inject(MatDialogRef<EncargoDialogo>);
  store = inject(Store);
  estados: EstadoEncargo[] = ['Pendiente', 'Pagado', 'Entregado'];
  f: Encargo = { ...(inject<Encargo | null>(MAT_DIALOG_DATA) ?? { id: 0, contactoId: null, nombre: '', apellido: '', telefono: '', tipo: 'Llenado 20LTS', cantidad: 1, descripcion: '', estado: 'Pendiente', fechaRecepcion: new Date().toISOString().slice(0, 10), fechaEntrega: '', notas: '' }) };

  elegirContacto(id: number | null) {
    this.f.contactoId = id;
    const c = this.store.contactos().find(x => x.id === id);
    if (c) { this.f.nombre = c.nombre; this.f.apellido = c.apellido; this.f.telefono = c.telefono; }
  }
  guardar() { if (this.f.nombre.trim()) this.ref.close(this.f); }
}
