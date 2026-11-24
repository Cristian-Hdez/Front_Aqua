import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

/** Gráfica sencilla en SVG (sin librerías): líneas o barras. */
@Component({
  selector: 'app-grafica',
  imports: [CurrencyPipe],
  templateUrl: './grafica.html',
  styleUrl: './grafica.scss',
})
export class Grafica {
  tipo = input<'linea' | 'barras'>('linea');
  titulo = input('');
  ejeX = input('');
  serie = input('Ventas');
  etiquetas = input<string[]>([]);
  valores = input<number[]>([]);

  readonly W = 520; readonly H = 215;
  readonly izq = 46; readonly der = 14; readonly arr = 10; readonly abajo = 30;

  /** Escala "bonita" (0, 200, 400...) con unas 4 marcas. */
  geom = computed(() => {
    const vals = this.valores();
    const max = Math.max(...vals, 1);
    const raw = max / 4, pot = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / pot;
    const paso = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pot;
    const tope = paso * Math.ceil(max / paso);
    const ancho = this.W - this.izq - this.der, alto = this.H - this.arr - this.abajo;
    const y = (v: number) => this.arr + alto - (v / tope) * alto;
    const banda = vals.length ? ancho / vals.length : ancho;
    const marcas = Array.from({ length: Math.round(tope / paso) + 1 }, (_, i) => ({ y: y(i * paso), texto: String(i * paso) }));
    const puntos = vals.map((v, i) => ({ x: this.izq + banda * (i + 0.5), y: y(v), v, etq: this.etiquetas()[i] ?? '' }));
    const barras = puntos.map(p => ({ ...p, w: Math.min(banda * 0.7, 140), x0: p.x - Math.min(banda * 0.7, 140) / 2, h: this.arr + alto - p.y }));
    return { marcas, puntos, barras, linea: puntos.map(p => `${p.x},${p.y}`).join(' '), ancho, alto };
  });
}
