// DTO de envíos y pedidos según la API (Swagger: CotizarEnvioDto,
// CotizacionEnvioDto, DireccionDto, CreatePedidoDto y PedidoResponseDto)
export type Region =
  | "XV"
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "RM"
  | "VI"
  | "VII"
  | "XVI"
  | "VIII"
  | "IX"
  | "XIV"
  | "X"
  | "XI"
  | "XII";

export type MetodoEnvioApi = "DESPACHO" | "RETIRO";
export type EstadoPedido = "PENDIENTE_PAGO" | "PAGADO" | "CANCELADO";

// Request de POST /envios/cotizar
export type CotizarEnvioRequestDto = {
  metodoEnvio: MetodoEnvioApi;
  region?: Region;
  comuna?: string;
  subtotal: number;
};

// Response de POST /envios/cotizar
export type CotizacionEnvioDto = {
  metodoEnvio: MetodoEnvioApi;
  costo: number;
  diasEstimados: number;
  gratis: boolean;
  regla: string;
};

// Dirección de despacho (obligatoria si metodoEnvio es DESPACHO)
export type DireccionDto = {
  nombreReceptor: string;
  calle: string;
  comuna: string;
  region: Region;
  // Celular chileno, por ejemplo +56912345678
  telefono: string;
};

// Request de POST /pedidos (el pedido se arma con el carrito de la cuenta)
export type CrearPedidoRequestDto = {
  metodoEnvio: MetodoEnvioApi;
  direccion?: DireccionDto;
  codigoDescuento?: string;
};

// Request de POST /pedidos/invitado (sin cuenta: los libros van en el body)
export type CrearPedidoInvitadoRequestDto = CrearPedidoRequestDto & {
  email: string;
  nombre: string;
  items: { libroId: string; cantidad: number }[];
};

// Response de POST /pedidos/invitado. tokenPedido permite consultar y pagar
// el pedido sin sesión (header X-Pedido-Token)
export type PedidoInvitadoResponseDto = {
  pedido: PedidoResponseDto;
  tokenPedido: string;
};

// Request de POST /cupones/validar (no consume el cupón)
export type ValidarCuponRequestDto = {
  codigo: string;
  subtotal: number;
  email?: string;
};

export type TipoCupon = "PORCENTAJE" | "MONTO_FIJO";

// Response de POST /cupones/validar
export type CuponAplicadoDto = {
  codigo: string;
  descripcion: string;
  tipo: TipoCupon;
  // Porcentaje o monto en pesos, según el tipo
  valor: number;
  subtotal: number;
  descuento: number;
  subtotalConDescuento: number;
};

export type PedidoItemResponseDto = {
  libroId: string;
  titulo: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
};

// Response de POST /pedidos y GET /pedidos/:id
export type PedidoResponseDto = {
  id: string;
  numero: string;
  estado: EstadoPedido;
  metodoEnvio: MetodoEnvioApi;
  items: PedidoItemResponseDto[];
  subtotal: number;
  descuento: number;
  codigoDescuento: string | null;
  costoEnvio: number;
  total: number;
  diasEstimados: number;
  direccion: DireccionDto | null;
  codigoSeguimiento: string | null;
  creadoEn: string;
  pagadoEn: string | null;
  canceladoEn: string | null;
};
