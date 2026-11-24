export interface Producto { id: number; nombre: string; tipo: string; precio: number; stock: number; stockMinimo: number; disponibilidad: 'Disponible' | 'Servicio'; activo: boolean; }
export interface Pipa { id: number; pipa: string; capacidad: number; fechaEntrega: string; hora: string; costo: number; recibio: string; }
export interface LineaVenta { productoId: number; nombre: string; cantidad: number; subtotal: number; }
export interface Venta { id: number; cliente: string; fecha: string; lineas: LineaVenta[]; total: number; }
export interface Contacto { id: number; nombre: string; apellido: string; telefono: string; referencia: string; notas: string; }
export type EstadoEncargo = 'Pendiente' | 'Pagado' | 'Entregado';
export interface Encargo { id: number; contactoId: number | null; nombre: string; apellido: string; telefono: string; tipo: string; cantidad: number; descripcion: string; estado: EstadoEncargo; fechaRecepcion: string; fechaEntrega: string; notas: string; }
export interface Usuario { id: number; nombre: string; usuario: string; rol: 'admin' | 'empleado'; estado: 'activo' | 'inactivo'; resetSolicitado: boolean; }
