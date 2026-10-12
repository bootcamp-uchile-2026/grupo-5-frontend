import { Link } from "react-router-dom";
import { useSesionStore } from "../estado/sesionStore";
import { Icono } from "./Icono";
import { useDesplegable } from "./useDesplegable";

// Ícono de usuario de la barra: sin sesión abre el modal de inicio de sesión;
// con sesión iniciada muestra un menú con "Mi cuenta" y "Cerrar sesión".
type MenuUsuarioProps = {
  onAbrirAutenticacion: () => void;
};

export function MenuUsuario({ onAbrirAutenticacion }: MenuUsuarioProps) {
  const usuario = useSesionStore((estado) => estado.usuario);
  const cerrarSesion = useSesionStore((estado) => estado.cerrar);
  const { abierto, alternar, cerrar, contenedorRef } = useDesplegable();

  if (!usuario) {
    return (
      <div className="header-perfil">
        <button
          id="boton-iniciar-sesion"
          className="header-icono header-icono-usuario"
          type="button"
          aria-label="Iniciar sesión"
          aria-haspopup="dialog"
          onClick={onAbrirAutenticacion}
        >
          <Icono nombre="usuario" />
        </button>
      </div>
    );
  }

  return (
    <div ref={contenedorRef} className="header-perfil">
      <span className="header-saludo">Hola, {usuario.nombre}</span>
      <button
        id="boton-iniciar-sesion"
        className="header-icono header-icono-usuario header-icono-usuario-activo"
        type="button"
        aria-label={`Menú de ${usuario.nombre}`}
        aria-expanded={abierto}
        aria-controls="menu-usuario-panel"
        onClick={alternar}
      >
        <Icono nombre="usuario" />
      </button>

      {abierto && (
        <ul id="menu-usuario-panel" className="menu-usuario-panel">
          <li>
            <Link to="/mi-cuenta" onClick={cerrar}>
              Mi cuenta
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                cerrarSesion();
                cerrar();
              }}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
