import { resumenCarrito, useCarritoStore } from "../estado/carritoStore";
import type {
  AgregarAlCarritoRequest,
  CarritoResponse,
} from "../tipos/carrito";

// Servicio dummy: reemplazar por llamadas HTTP/REST cuando Backend exponga /carrito.
export async function agregarAlCarrito(
  solicitud: AgregarAlCarritoRequest,
): Promise<CarritoResponse> {
  const { agregar, abrir } = useCarritoStore.getState();
  agregar(solicitud);
  abrir();
  return resumenCarrito(useCarritoStore.getState().items);
}

export async function obtenerCarrito(): Promise<CarritoResponse> {
  return resumenCarrito(useCarritoStore.getState().items);
}
