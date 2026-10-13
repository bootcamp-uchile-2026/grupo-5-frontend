import { create } from "zustand";
import { persist } from "zustand/middleware";
import { configurarSesion } from "../servicios/api";
import type { LoginResponse } from "../tipos/checkout";
import { useAutenticacionStore } from "./autenticacionStore";

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

// El cliente de la API envía el token de la sesión y, si la API responde 401
// (token vencido o inválido), se cierra la sesión y se abre el inicio de sesión
configurarSesion({
  obtenerToken: () => useSesionStore.getState().usuario?.token,
  alVencerSesion: () => {
    useSesionStore.getState().cerrar();
    useAutenticacionStore.getState().abrir();
  },
});
