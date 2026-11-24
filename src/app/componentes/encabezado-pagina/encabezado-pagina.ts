import { Component, input, model, output } from '@angular/core';

@Component({ selector: 'app-encabezado-pagina', templateUrl: './encabezado-pagina.html' })
export class EncabezadoPagina {
  titulo = input.required<string>();
  subtitulo = input('');
  buscable = input(true);
  busqueda = model('');
  agregar = output<void>();
}
