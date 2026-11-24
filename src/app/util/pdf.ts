import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { cargarImagen } from './imagen';

const money = (n: number) => '$' + n.toFixed(2);

/** Ticket de venta con el Logo 2 en la parte superior. */
export async function pdfTicket(t: { cliente: string; fecha: string; lineas: { nombre: string; cantidad: number; subtotal: number }[]; total: number }) {
  const doc = new jsPDF();
  let y = 14;
  try {
    const logo = await cargarImagen('img/logo2.png');
    const ancho = 55, alto = ancho * logo.h / logo.w;
    doc.addImage(logo.data, 'PNG', (210 - ancho) / 2, y, ancho, alto);
    y += alto + 8;
  } catch { /* si el logo no carga, el ticket se genera igual sin él */ }
  doc.setFontSize(16); doc.text('Ticket de venta', 14, y); y += 9;
  doc.setFontSize(10); doc.text(`Cliente: ${t.cliente}`, 14, y); y += 6; doc.text(`Fecha: ${t.fecha}`, 14, y);
  autoTable(doc, { startY: y + 6, head: [['Producto', 'Cantidad', 'Subtotal']], body: t.lineas.map(l => [l.nombre, String(l.cantidad), money(l.subtotal)]) });
  const fin = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12); doc.text(`Total: ${money(t.total)}`, 14, fin);
  doc.save('ticket.pdf');
}

export function pdfReporte(titulo: string, resumen: [string, string][], head: string[], filas: string[][]) {
  const doc = new jsPDF();
  doc.setFontSize(16); doc.text(titulo, 14, 18);
  autoTable(doc, { startY: 26, head: [['Concepto', 'Valor']], body: resumen });
  if (filas.length) autoTable(doc, { startY: (doc as any).lastAutoTable.finalY + 8, head: [head], body: filas });
  doc.save('reporte.pdf');
}
