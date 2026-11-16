import { create } from "zustand";

// Modal de inicio de sesión / registro. Está en un store para poder abrirlo
// desde cualquier parte, por ejemplo cuando la sesión vence o al volver del
// enlace de verificación del correo.
//
// Vistas del modal (Figma, alta fidelidad):
// - "formulario": iniciar sesión o crear cuenta (login-card, node 3408:8870)
// - "verificacion-enviada": "¡Ya casi estás dentro!" (node 3263:40035)
// - "cuenta-lista": "¡Tu cuenta ya está lista!" (node 3262:39965)
// - "verificacion-fallida": "No hemos podido verificar tu cuenta" (node 3263:39974)
export type VistaAutenticacion =
  | "formulario"
  | "verificacion-enviada"
  | "cuenta-lista"
  | "verificacion-fallida";

type AutenticacionState = {
  abierto: boolean;
  vista: VistaAutenticacion;
  // Correo al que se envió la verificación (se muestra enmascarado)
  correo: string;
  abrir: () => void;
  mostrar: (vista: VistaAutenticacion, correo?: string) => void;
  cerrar: () => void;
};

export const useAutenticacionStore = create<AutenticacionState>()((set) => ({
  abierto: false,
  vista: "formulario",
  correo: "",
  abrir: () => set({ abierto: true, vista: "formulario" }),
  mostrar: (vista, correo) =>
    set((estado) => ({ abierto: true, vista, correo: correo ?? estado.correo })),
  cerrar: () => set({ abierto: false, vista: "formulario" }),
}));
