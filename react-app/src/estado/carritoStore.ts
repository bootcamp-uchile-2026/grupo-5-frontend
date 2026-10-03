import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AgregarAlCarritoRequest,
  CarritoItemDto,
  CarritoResponse,
} from "../tipos/carrito";

const CANTIDAD_MAXIMA = 10;

type CarritoState = {
  items: CarritoItemDto[];
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
  agregar: (solicitud: AgregarAlCarritoRequest) => void;
  cambiarCantidad: (idLibro: string, delta: number) => void;
  eliminar: (idLibro: string) => void;
  vaciar: () => void;
};

export const useCarritoStore = create<CarritoState>()(
  persist(
    (set) => ({
      items: [],
      abierto: false,
      abrir: () => set({ abierto: true }),
      cerrar: () => set({ abierto: false }),
      agregar: (solicitud) =>
        set((estado) => {
          const existente = estado.items.find(
            (item) => item.idLibro === solicitud.idLibro,
          );
          if (!existente) {
            return {
              items: [
                ...estado.items,
                {
                  ...solicitud,
                  cantidad: Math.min(solicitud.cantidad, CANTIDAD_MAXIMA),
                },
              ],
            };
          }
          return {
            items: estado.items.map((item) =>
              item.idLibro === solicitud.idLibro
                ? {
                    ...item,
                    cantidad: Math.min(
                      item.cantidad + solicitud.cantidad,
                      CANTIDAD_MAXIMA,
                    ),
                  }
                : item,
            ),
          };
        }),
      cambiarCantidad: (idLibro, delta) =>
        set((estado) => ({
          items: estado.items
            .map((item) =>
              item.idLibro === idLibro
                ? {
                    ...item,
                    cantidad: Math.min(item.cantidad + delta, CANTIDAD_MAXIMA),
                  }
                : item,
            )
            .filter((item) => item.cantidad > 0),
        })),
      eliminar: (idLibro) =>
        set((estado) => ({
          items: estado.items.filter((item) => item.idLibro !== idLibro),
        })),
      vaciar: () => set({ items: [] }),
    }),
    {
      name: "carrito",
      partialize: (estado) => ({ items: estado.items }),
    },
  ),
);

export function resumenCarrito(items: CarritoItemDto[]): CarritoResponse {
  return {
    items,
    totalItems: items.reduce((total, item) => total + item.cantidad, 0),
    subtotal: items.reduce(
      (total, item) => total + item.cantidad * item.precioUnitario,
      0,
    ),
  };
}
