import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogo } from '../../../componentes/dialogo/dialogo';
import { pdfReporte } from '../../../util/pdf';

export interface ResumenData { titulo: string; resumen: [string, string][]; head: string[]; filas: string[][]; }

@Component({ selector: 'app-reporte-vista-previa', imports: [Dialogo], templateUrl: './reporte-vista-previa.html' })
export class ReporteVistaPrevia {
  ref = inject(MatDialogRef<ReporteVistaPrevia>);
  d = inject<ResumenData>(MAT_DIALOG_DATA);
  pdf() { pdfReporte(this.d.titulo, this.d.resumen, this.d.head, this.d.filas); this.ref.close(); }
}
