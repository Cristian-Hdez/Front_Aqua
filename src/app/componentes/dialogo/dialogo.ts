import { Component, inject, input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Marco común de TODAS las ventanas flotantes.
 * La cabecera (título + X) y el pie (botones) quedan fijos; solo el cuerpo hace scroll.
 * Uso:  <app-dialogo titulo="..."> contenido <button pie>Guardar</button> </app-dialogo>
 */
@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.html',
  styleUrl: './dialogo.scss',
  host: { '[style.width]': "'min(' + ancho() + ', 92vw)'" },
})
export class Dialogo {
  titulo = input.required<string>();
  subtitulo = input('');
  ancho = input('560px');
  private ref = inject(MatDialogRef, { optional: true });

  cerrar() { this.ref?.close(); }
}
