import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EncabezadoPagina } from '../../componentes/encabezado-pagina/encabezado-pagina';
import { Store } from '../../controladores/store';
import { Venta } from '../../modelos/models';
import { ReporteVistaPrevia, ResumenData } from './reporte-vista-previa/reporte-vista-previa';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const dinero = (n: number) => '$' + n.toFixed(2);

@Component({ selector: 'app-reportes', imports: [EncabezadoPagina, FormsModule, CurrencyPipe, DatePipe], templateUrl: './reportes.html', styleUrl: './reportes.scss' })
export class Reportes {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  meses = MESES;
  anios = [2024, 2025, 2026, 2027];
  modo = signal<'fecha' | 'mensual'>('fecha');
  inicio = '2026-09-21'; fin = '2026-10-01'; mes = 10; anio = 2026;
  filas = signal<Venta[]>([]);

  cambiar(m: 'fecha' | 'mensual') { this.modo.set(m); this.filas.set([]); }

  generar() {
    const ventas = this.store.ventas();
    const sel = this.modo() === 'fecha'
      ? ventas.filter(v => v.fecha.slice(0, 10) >= this.inicio && v.fecha.slice(0, 10) <= this.fin)
      : ventas.filter(v => +v.fecha.slice(5, 7) === this.mes && +v.fecha.slice(0, 4) === this.anio);
    this.filas.set(sel);
    const ingresos = sel.reduce((s, v) => s + v.total, 0);
    const promedio = sel.length ? ingresos / sel.length : 0;
    const resumen: [string, string][] = this.modo() === 'fecha'
      ? [['Fecha inicio', this.inicio], ['Fecha fin', this.fin], ['Ingresos reportados', dinero(ingresos)], ['Ventas realizadas', String(sel.length)], ['Promedio por venta', dinero(promedio)]]
      : [['Mes', String(this.mes)], ['Año', String(this.anio)], ['Ingresos mensuales', dinero(ingresos)], ['Ventas realizadas', String(sel.length)], ['Promedio por venta', dinero(promedio)]];
    this.dialog.open(ReporteVistaPrevia, {
      maxWidth: '95vw',
      data: {
        titulo: this.modo() === 'fecha' ? 'Ingresos reportados' : 'Ingresos del mes', resumen,
        head: ['ID Venta', 'Cliente', 'Fecha', 'Total'],
        filas: sel.map(v => [String(v.id), v.cliente, v.fecha.slice(0, 10), dinero(v.total)]),
      } satisfies ResumenData,
    });
  }
}
