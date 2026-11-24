import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { LineaVenta } from '../../../modelos/models';
import { pdfTicket } from '../../../util/pdf';

export interface TicketData { cliente: string; fecha: string; lineas: LineaVenta[]; total: number; }

@Component({ selector: 'app-ticket-dialogo', imports: [CurrencyPipe, DatePipe, Dialogo], templateUrl: './ticket-dialogo.html' })
export class TicketDialogo {
  ref = inject(MatDialogRef<TicketDialogo>);
  t = inject<TicketData>(MAT_DIALOG_DATA);

  async generar() {
    await pdfTicket({ ...this.t, fecha: new Date(this.t.fecha).toLocaleString('es-MX') });
    this.ref.close();
  }
}
