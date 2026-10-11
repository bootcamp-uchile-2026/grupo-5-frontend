// DTO del carrito (request/response del servicio, hoy simulado en el store)
export type CarritoItemDto = {
  idLibro: string;
  titulo: string;
  autor?: string;
  precioUnitario: number;
  cantidad: number;
  portada?: string;
};

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
