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
  costoEnvio: number;
  total: number;
  diasEstimados: number;
  direccion: DireccionDto | null;
  codigoSeguimiento: string | null;
  creadoEn: string;
  pagadoEn: string | null;
  canceladoEn: string | null;
};
