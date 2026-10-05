export type MetodoEnvio = "despacho" | "retiro";
export type MetodoPago = "onepay" | "webpay" | "mercadopago" | "transferencia";

export type LoginRequest = { email: string; password: string };
export type DireccionGuardada = {
  direccion: string;
  numero: string;
  depto: string;
  region: string;
  comuna: string;
  telefono: string;
};
export type LoginResponse = {
  email: string;
  nombre: string;
  apellido: string;
  token: string;
  direccionGuardada?: DireccionGuardada;
};

export type DescuentoResponse = { codigo: string; porcentaje: number };

export type CheckoutRequest = {
  email: string;
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

export type CheckoutResponse = { idPedido: string };
