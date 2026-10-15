import type { Rol } from "./auth";
import type { CarritoItemDto } from "./carrito";
import type { EstadoPedido } from "./pedido";

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
// de la API; id y rol solo existen con la API.
export type LoginResponse = {
  id?: string;
  rol?: Rol;
  email: string;
  nombre: string;
  apellido: string;
  token: string;
  direccionGuardada?: DireccionGuardada;
};

export type DescuentoResponse = { codigo: string; porcentaje: number };

export type CheckoutRequest = {
  email: string;
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
// PedidoResponseDto); estado solo existe con la API
export type CheckoutResponse = { idPedido: string; estado?: EstadoPedido };

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
