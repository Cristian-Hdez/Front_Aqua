import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { Pipa } from '../../../modelos/models';

@Component({ selector: 'app-pipa-dialogo', imports: [FormsModule, Dialogo], templateUrl: './pipa-dialogo.html' })
export class PipaDialogo {
  ref = inject(MatDialogRef<PipaDialogo>);
  f: Pipa = { ...(inject<Pipa | null>(MAT_DIALOG_DATA) ?? { id: 0, pipa: '', capacidad: 0, fechaEntrega: '', hora: '', costo: 0, recibio: '' }) };
}
