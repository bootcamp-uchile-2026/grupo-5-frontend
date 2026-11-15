import { create } from "zustand";
import { persist } from "zustand/middleware";

// Libros marcados con el corazón. Con sesión y API es una copia de la lista
// "Favoritos" de la cuenta, que actualiza servicios/favoritosServicio.ts.
// Sin API se guarda solo en este navegador.
type FavoritosState = {
  ids: string[];
  // Libro que se está guardando o quitando (deshabilita su corazón)
  actualizando: string | null;
  reemplazar: (ids: string[]) => void;
  setActualizando: (idLibro: string | null) => void;
  alternar: (idLibro: string) => void;
};

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set) => ({
      ids: [],
      actualizando: null,
      reemplazar: (ids) => set({ ids }),
      setActualizando: (actualizando) => set({ actualizando }),
      alternar: (idLibro) =>
        set((estado) => ({
          ids: estado.ids.includes(idLibro)
            ? estado.ids.filter((id) => id !== idLibro)
            : [...estado.ids, idLibro],
        })),
    }),
    { name: "leeconnos-favoritos", partialize: (estado) => ({ ids: estado.ids }) },
  ),
);
