import { useEffect, type ReactNode } from "react";
import { useAutenticacionStore } from "../estado/autenticacionStore";
import { useSesionStore } from "../estado/sesionStore";
import type { Rol } from "../tipos/auth";
import { PaginaEnConstruccion } from "./PaginaEnConstruccion";

type RutaProtegidaProps = {
  children: ReactNode;
  // Perfiles que pueden ver la ruta. Sin indicar, basta con tener sesión.
  roles?: Rol[];
};

// Envuelve una ruta privada. Sin sesión, abre el inicio de sesión y, al
// iniciarla, muestra la página. Con un perfil que no está en "roles", muestra
// el aviso de acceso denegado. Debe coincidir con las reglas de Backend: la
// API responde 401 sin token y 403 con un perfil sin permiso.
export function RutaProtegida({ children, roles }: RutaProtegidaProps) {
  const usuario = useSesionStore((estado) => estado.usuario);
  const abrirAutenticacion = useAutenticacionStore((estado) => estado.abrir);

  // Solo al entrar a la ruta: si después se cierra la sesión, no se reabre
  useEffect(() => {
    if (!useSesionStore.getState().usuario) abrirAutenticacion();
  }, [abrirAutenticacion]);

  if (!usuario) {
    return (
      <PaginaEnConstruccion
        titulo="Inicia sesión para continuar"
        mensaje="Esta sección es solo para lectores con una cuenta en Leeconnos."
        enlace={{ texto: "Volver al inicio", ruta: "/" }}
      />
    );
  }

  // Sin API la sesión dummy no trae perfil: se trata como cliente
  if (roles && !roles.includes(usuario.rol ?? "CLIENTE")) return <AccesoDenegado />;

  return children;
}

// Aviso para un perfil sin permiso (equivale al 403 PERMISO_DENEGADO de la API)
export function AccesoDenegado() {
  return (
    <PaginaEnConstruccion
      titulo="Acceso denegado"
      mensaje="No tienes permiso para ver esta página."
      enlace={{ texto: "Volver al inicio", ruta: "/" }}
    />
  );
}
