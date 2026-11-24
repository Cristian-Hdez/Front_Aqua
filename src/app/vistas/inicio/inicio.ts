import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Store } from '../../controladores/store';
import { Grafica } from '../../componentes/grafica/grafica';

@Component({ selector: 'app-inicio', imports: [CurrencyPipe, Grafica], templateUrl: './inicio.html', styleUrl: './inicio.scss' })
export class Inicio {
  store = inject(Store);

  porcentaje = computed(() => Math.round((this.store.tanque().litros / this.store.tanque().capacidad) * 100));
  /** Altura del agua dentro de la imagen del tanque (la tapa ocupa ~7% superior, por eso el 0.92). */
  nivelAgua = computed(() => Math.round(this.porcentaje() * 0.92) + '%');

  ventasHoy = computed(() => {
    const hoy = new Date().toISOString().slice(0, 10);
    return this.store.ventas().filter(v => v.fecha.startsWith(hoy)).reduce((s, v) => s + v.total, 0);
  });
  stockBajo = computed(() => this.store.productos().filter(p => p.disponibilidad === 'Disponible' && p.stock <= p.stockMinimo).length);

  /** Ventas sumadas por día (dd/MM/yyyy), en orden cronológico. */
  porDia = computed(() => this.agrupar(10, k => `${k.slice(8, 10)}/${k.slice(5, 7)}/${k.slice(0, 4)}`));
  /** Ventas sumadas por mes (MM/yyyy), en orden cronológico. */
  porMes = computed(() => this.agrupar(7, k => `${k.slice(5, 7)}/${k.slice(0, 4)}`));

  masVendidos = computed(() => {
    const m = new Map<string, number>();
    for (const v of this.store.ventas()) for (const l of v.lineas) m.set(l.nombre, (m.get(l.nombre) ?? 0) + l.cantidad);
    return [...m].map(([nombre, cantidad]) => ({ nombre, cantidad })).sort((a, b) => b.cantidad - a.cantidad);
  });

  private agrupar(largo: number, etiqueta: (k: string) => string) {
    const m = new Map<string, number>();
    for (const v of this.store.ventas()) { const k = v.fecha.slice(0, largo); m.set(k, (m.get(k) ?? 0) + v.total); }
    const claves = [...m.keys()].sort();
    return { etiquetas: claves.map(etiqueta), valores: claves.map(k => m.get(k)!) };
  }
}
