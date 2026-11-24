import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { Contacto } from '../../../modelos/models';

@Component({ selector: 'app-contacto-dialogo', imports: [FormsModule, Dialogo], templateUrl: './contacto-dialogo.html' })
export class ContactoDialogo {
  ref = inject(MatDialogRef<ContactoDialogo>);
  f: Contacto = { ...(inject<Contacto | null>(MAT_DIALOG_DATA) ?? { id: 0, nombre: '', apellido: '', telefono: '', referencia: '', notas: '' }) };
  guardar() { if (this.f.nombre.trim()) this.ref.close(this.f); }
}
