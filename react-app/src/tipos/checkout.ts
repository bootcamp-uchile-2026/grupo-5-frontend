import type { Rol } from "./auth";
import type { CarritoItemDto } from "./carrito";
import type { EstadoPedido, TipoCupon } from "./pedido";

export type MetodoEnvio = "despacho" | "retiro";
export type MetodoPago = "onepay" | "webpay" | "mercadopago" | "transferencia";

// Datos de los formularios de inicio de sesión y registro (los DTO de la API
// están en tipos/auth.ts; authServicio.ts los convierte)
export type LoginRequest = { email: string; password: string };
export type RegistroRequest = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  recibirNovedades: boolean;
};
export type DireccionGuardada = {
  direccion: string;
  numero: string;
  depto: string;
  region: string;
  comuna: string;
  telefono: string;
};
// Sesión del usuario (se guarda en sesionStore). "token" es el accessToken
// de la API y "refreshToken" sirve para renovarlo; id, rol y refreshToken
// solo existen con la API.
export type LoginResponse = {
  id?: string;
  rol?: Rol;
  email: string;
  nombre: string;
  apellido: string;
  token: string;
  refreshToken?: string;
  direccionGuardada?: DireccionGuardada;
};

// Código de descuento validado. Se guarda el tipo y el valor para recalcular
// el monto si cambia el subtotal (por ejemplo, al quitar un libro)
export type DescuentoResponse = {
  codigo: string;
  descripcion: string;
  tipo: TipoCupon;
  valor: number;
};

export type CheckoutRequest = {
  email: string;
  // Nombre de quien compra (obligatorio para comprar como invitado)
  nombre?: string;
  // Quien recibe el despacho y su celular (obligatorios en la API al despachar)
  nombreReceptor?: string;
  telefono?: string;
  metodoEnvio: MetodoEnvio;
  direccion?: string;
  numero?: string;
  depto?: string;
  region?: string;
  comuna?: string;
  metodoPago: MetodoPago;
  codigoDescuento?: string;
  items: { idLibro: string; cantidad: number }[];
};

// idPedido es el número visible del pedido (con la API, "numero" de
// PedidoResponseDto). Estado y montos solo existen con la API: son los que
// calculó Backend y los muestra la confirmación.
export type CheckoutResponse = {
  idPedido: string;
  estado?: EstadoPedido;
  montos?: { subtotal: number; descuento: number; envio: number; total: number };
};

// Costo de envío para el resumen del checkout
export type CotizacionEnvio = { costo: number; diasEstimados: number; gratis: boolean };

export type ConfirmacionPedido = {
  idPedido: string;
  nombreComprador: string;
  emailComprador: string;
  fecha: string;
  metodoEnvio: MetodoEnvio;
  direccionEntrega?: Pick<
    DireccionGuardada,
    "direccion" | "numero" | "depto" | "region" | "comuna"
  >;
  metodoPago: MetodoPago;
  items: CarritoItemDto[];
  totalItems: number;
  subtotal: number;
  envio: number;
  descuento: number;
  total: number;
};
