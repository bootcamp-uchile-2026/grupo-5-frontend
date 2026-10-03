import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse } from "../tipos/checkout";

type SesionState = {
  usuario: LoginResponse | null;
  invitado: boolean;
  iniciar: (usuario: LoginResponse) => void;
  continuarComoInvitado: () => void;
  cerrar: () => void;
};

export const useSesionStore = create<SesionState>()(
  persist(
    (set) => ({
      usuario: null,
      invitado: false,
      iniciar: (usuario) => set({ usuario, invitado: false }),
      continuarComoInvitado: () => set({ invitado: true }),
      cerrar: () => set({ usuario: null, invitado: false }),
    }),
    { name: "sesion" },
  ),
);
