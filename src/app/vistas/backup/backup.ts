import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';

@Component({ selector: 'app-backup', imports: [EncabezadoPagina, FormsModule], templateUrl: './backup.html', styleUrl: './backup.scss' })
export class Backup {
  tablas = ['Tabla USERS', 'Tabla PRODUCTOS', 'Tabla VENTAS', 'Tabla ENCARGOS', 'Tabla CONTACTOS'];
  tabla = this.tablas[0];
}
