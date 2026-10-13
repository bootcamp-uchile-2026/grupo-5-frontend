import { create } from "zustand";

// Visibilidad del modal de inicio de sesión / registro. Está en un store para
// poder abrirlo desde cualquier parte, por ejemplo cuando la sesión vence.
type AutenticacionState = {
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
};

export const useAutenticacionStore = create<AutenticacionState>()((set) => ({
  abierto: false,
  abrir: () => set({ abierto: true }),
  cerrar: () => set({ abierto: false }),
}));
