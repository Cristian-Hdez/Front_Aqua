import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { Store } from '../../../controladores/store';
import { Encargo } from '../../../modelos/models';

@Component({ selector: 'app-encargo-vista-previa', imports: [CurrencyPipe, DatePipe, Dialogo], templateUrl: './encargo-vista-previa.html' })
export class EncargoVistaPrevia {
  ref = inject(MatDialogRef<EncargoVistaPrevia>);
  e = inject<Encargo>(MAT_DIALOG_DATA);
  total = (inject(Store).productos().find(p => p.nombre === this.e.tipo)?.precio ?? 0) * this.e.cantidad;
}
