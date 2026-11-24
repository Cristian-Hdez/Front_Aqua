import { Injectable, WritableSignal, signal } from '@angular/core';
import { Contacto, Encargo, Pipa, Producto, Usuario, Venta } from '../modelos/models';

/** Datos de ejemplo tomados del mockup. Después se reemplaza por HttpClient + API. */
@Injectable({ providedIn: 'root' })
export class Store {
  tanque = signal({ capacidad: 5000, litros: 3750 });

  productos = signal<Producto[]>([
    { id: 1, nombre: 'Garrafon 20LTS', tipo: 'Garrafon 20LTS', precio: 150, stock: 118, stockMinimo: 10, disponibilidad: 'Disponible', activo: true },
    { id: 2, nombre: 'Garrafon 10LTS', tipo: 'Garrafon 10LTS', precio: 140, stock: 100, stockMinimo: 10, disponibilidad: 'Disponible', activo: true },
    { id: 3, nombre: 'Tapas', tipo: 'Insumo - Tapa', precio: 0, stock: 495, stockMinimo: 50, disponibilidad: 'Disponible', activo: true },
    { id: 4, nombre: 'Sellos', tipo: 'Insumo - Sello', precio: 0, stock: 495, stockMinimo: 50, disponibilidad: 'Disponible', activo: true },
    { id: 5, nombre: 'Cloro', tipo: 'Prod. Limpieza', precio: 25, stock: 100, stockMinimo: 10, disponibilidad: 'Disponible', activo: true },
    { id: 6, nombre: 'Llenado 20LTS', tipo: 'Llenado 20LTS', precio: 20, stock: 0, stockMinimo: 0, disponibilidad: 'Servicio', activo: true },
    { id: 7, nombre: 'Llenado 10LTS', tipo: 'Llenado 10LTS', precio: 15, stock: 0, stockMinimo: 0, disponibilidad: 'Servicio', activo: true },
    { id: 8, nombre: 'Tabletas Purificadoras', tipo: 'Prod. Limpieza', precio: 50, stock: 100, stockMinimo: 10, disponibilidad: 'Disponible', activo: true },
    { id: 9, nombre: 'Agua purificada', tipo: 'Agua', precio: 0, stock: 9920, stockMinimo: 500, disponibilidad: 'Disponible', activo: true },
  ]);

  pipas = signal<Pipa[]>([]);

  ventas = signal<Venta[]>([
    { id: 1, cliente: 'Publico general', fecha: '2026-09-28T10:15', total: 380, lineas: [
      { productoId: 1, nombre: 'Garrafon 20LTS', cantidad: 2, subtotal: 300 },
      { productoId: 6, nombre: 'Llenado 20LTS', cantidad: 4, subtotal: 80 } ] },
    { id: 2, cliente: 'Publico general', fecha: '2026-06-03T12:00', total: 750, lineas: [{ productoId: 1, nombre: 'Garrafon 20LTS', cantidad: 5, subtotal: 750 }] },
    { id: 3, cliente: 'Publico general', fecha: '2026-05-29T09:30', total: 20, lineas: [{ productoId: 6, nombre: 'Llenado 20LTS', cantidad: 1, subtotal: 20 }] },
  ]);

  contactos = signal<Contacto[]>([
    { id: 1, nombre: 'Publico', apellido: 'General', telefono: '', referencia: '', notas: '' },
  ]);

  encargos = signal<Encargo[]>([
    { id: 1, contactoId: null, nombre: 'Pablo', apellido: 'Pedro', telefono: '9514566788', tipo: 'Llenado 20LTS', cantidad: 1, descripcion: '', estado: 'Pendiente', fechaRecepcion: '2026-05-29', fechaEntrega: '2026-05-29', notas: '' },
    { id: 2, contactoId: null, nombre: 'José', apellido: 'Carlos', telefono: '9513692541', tipo: 'Garrafon 20LTS', cantidad: 2, descripcion: '', estado: 'Pendiente', fechaRecepcion: '2026-06-15', fechaEntrega: '2026-06-16', notas: '' },
    { id: 3, contactoId: null, nombre: 'Alvin', apellido: 'Yakitori', telefono: '9548742358', tipo: 'Garrafon 20LTS', cantidad: 1, descripcion: '', estado: 'Entregado', fechaRecepcion: '2026-07-02', fechaEntrega: '2026-07-05', notas: '' },
  ]);

  usuarios = signal<Usuario[]>([
    { id: 6, nombre: 'Pedro Lopez', usuario: 'pedrolopez', rol: 'empleado', estado: 'activo', resetSolicitado: false },
    { id: 2, nombre: 'Empleado', usuario: 'empleado', rol: 'empleado', estado: 'activo', resetSolicitado: false },
    { id: 1, nombre: 'Admin', usuario: 'admin', rol: 'admin', estado: 'activo', resetSolicitado: false },
  ]);

  siguienteId(lista: { id: number }[]): number {
    return lista.reduce((m, x) => Math.max(m, x.id), 0) + 1;
  }

  /** Inserta (id = 0) o actualiza un registro. */
  guardar<T extends { id: number }>(s: WritableSignal<T[]>, item: T): T {
    const nuevo = item.id ? item : { ...item, id: this.siguienteId(s()) };
    s.update(l => l.some(x => x.id === nuevo.id) ? l.map(x => (x.id === nuevo.id ? nuevo : x)) : [...l, nuevo]);
    return nuevo;
  }

  eliminar<T extends { id: number }>(s: WritableSignal<T[]>, id: number): void {
    s.update(l => l.filter(x => x.id !== id));
  }
}
