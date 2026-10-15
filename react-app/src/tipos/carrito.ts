// Ítem del carrito como lo usan las pantallas (store, panel y checkout)
export type CarritoItemDto = {
  idLibro: string;
  titulo: string;
  autor?: string;
  precioUnitario: number;
  cantidad: number;
  portada?: string;
  // Solo con la API: stock vigente y si la cantidad pedida está disponible
  stockDisponible?: number;
  disponible?: boolean;
};

// Datos para agregar un libro (tarjeta de producto y ficha)
export type AgregarAlCarritoRequest = {
  idLibro: string;
  titulo: string;
  autor?: string;
  precioUnitario: number;
  cantidad: number;
  portada?: string;
};

export type CarritoResponse = {
  items: CarritoItemDto[];
  totalItems: number;
  subtotal: number;
};

// DTO de la API (Swagger: AgregarItemDto, ActualizarItemDto,
// CarritoItemResponseDto y CarritoResponseDto)

// Request de POST /carrito/items
export type AgregarItemRequestDto = { libroId: string; cantidad?: number };

// Request de PATCH /carrito/items/:libroId
export type ActualizarItemRequestDto = { cantidad: number };

export type CarritoItemResponseDto = {
  libroId: string;
  titulo: string;
  autor: string;
  portadaUrl: string | null;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
  stockDisponible: number;
  // false si la cantidad supera el stock actual o el libro fue retirado
  disponible: boolean;
};

// Response de GET /carrito, POST /carrito/items y PATCH/DELETE /carrito/items/:libroId
export type CarritoResponseDto = {
  items: CarritoItemResponseDto[];
  totalItems: number;
  subtotal: number;
};
