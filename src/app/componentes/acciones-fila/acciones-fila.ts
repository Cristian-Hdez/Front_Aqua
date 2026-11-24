import { Component, output } from '@angular/core';

@Component({ selector: 'app-acciones-fila', templateUrl: './acciones-fila.html' })
export class AccionesFila {
  eliminar = output<void>();
  editar = output<void>();
}
