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
    {
      name: "sesion",
      // Versión 1: la sesión viaja en cookies HttpOnly y el navegador ya no
      // guarda tokens. Se borran los que dejó la versión anterior.
      version: 1,
      migrate: (guardado) => {
        const estado = guardado as { usuario?: Record<string, unknown> | null };
        if (estado.usuario) {
          delete estado.usuario.token;
          delete estado.usuario.refreshToken;
        }
        return estado as SesionState;
      },
    },
  ),
);

// Con un usuario en el store, el cliente de la API intenta renovar la sesión
// ante un 401; si no puede, se cierra la sesión y se abre el inicio de sesión
configurarSesion({
  haySesion: () => Boolean(useSesionStore.getState().usuario),
  alVencerSesion: () => {
    useSesionStore.getState().cerrar();
    useAutenticacionStore.getState().abrir();
  },
});
