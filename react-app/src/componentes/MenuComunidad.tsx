import { Link } from "react-router-dom";
import { Icono } from "./Icono";
import { useDesplegable } from "./useDesplegable";
import "../estilos/menu-comunidad.css";

// Contenido del desplegable (Figma: Wireframes Desktop, node 1547:6136)
const opciones = ["Conversaciones", "Reseñas Comunidad", "Club de Lectura"];

// Por ahora todas las opciones llevan a la página de comunidad que existe
const RUTA_COMUNIDAD = "/comunidad";

export function MenuComunidad() {
  const { abierto, alternar, cerrar, contenedorRef } = useDesplegable();

  return (
    <div ref={contenedorRef} className="menu-comunidad">
      <button
        type="button"
        className="header-nav-boton"
        aria-expanded={abierto}
        aria-controls="menu-comunidad-panel"
        onClick={alternar}
      >
        <Icono nombre="abajo" />
        Comunidad
      </button>

      {abierto && (
        <ul id="menu-comunidad-panel" className="menu-comunidad-panel">
          {opciones.map((opcion) => (
            <li key={opcion}>
              <Link to={RUTA_COMUNIDAD} onClick={cerrar}>
                {opcion}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
