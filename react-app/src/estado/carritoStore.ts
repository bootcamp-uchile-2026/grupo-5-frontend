import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AgregarAlCarritoRequest,
  CarritoItemDto,
  CarritoResponse,
} from "../tipos/carrito";

export const CANTIDAD_MAXIMA = 10;

// Estado del carrito que muestran las pantallas. Sin sesión es el carrito
// local del invitado; con sesión es una copia del carrito de la API, que
// actualiza servicios/carritoServicio.ts.
type CarritoState = {
  items: CarritoItemDto[];
  abierto: boolean;
  // Mientras se guarda un cambio en la API (deshabilita los botones)
  actualizando: boolean;
  // Mensaje para el usuario en el panel (p. ej. sin stock)
  aviso: string;
  abrir: () => void;
  cerrar: () => void;
  reemplazar: (items: CarritoItemDto[]) => void;
  setActualizando: (actualizando: boolean) => void;
  setAviso: (aviso: string) => void;
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
      actualizando: false,
      aviso: "",
      abrir: () => set({ abierto: true }),
      cerrar: () => set({ abierto: false, aviso: "" }),
      reemplazar: (items) => set({ items }),
      setActualizando: (actualizando) => set({ actualizando }),
      setAviso: (aviso) => set({ aviso }),
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

// Máximo de unidades que se pueden pedir de un ítem (stock vigente o 10)
export const cantidadMaximaDe = (item: CarritoItemDto) =>
  Math.min(CANTIDAD_MAXIMA, item.stockDisponible ?? CANTIDAD_MAXIMA);
