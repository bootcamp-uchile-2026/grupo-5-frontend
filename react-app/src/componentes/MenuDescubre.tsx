import { Link } from "react-router-dom";
import iconoChat from "../assets/iconos/06-mensaje-chat.svg";
import { Icono } from "./Icono";
import { useDesplegable } from "./useDesplegable";
import "../estilos/menu-descubre.css";

// Contenido del desplegable (Figma: Wireframes Desktop, node 1547:6030)
const libreros = [
  "Gregorio Samsa",
  "Anna Karenina",
  "Aureliano Buendía",
  "Lisbeth Salander",
  "Tyler Durden",
  "Clara del Valle",
];

// Por ahora todas las opciones llevan al perfil de librero que existe
const RUTA_LIBREROS = "/perfil-librero";

export function MenuDescubre() {
  const { abierto, alternar, cerrar, contenedorRef } = useDesplegable();

  return (
    <div ref={contenedorRef} className="menu-descubre">
      <button
        type="button"
        className="header-nav-boton"
        aria-expanded={abierto}
        aria-controls="menu-descubre-panel"
        onClick={alternar}
      >
        <Icono nombre="abajo" />
        Descubre con nosotros
      </button>

      {abierto && (
        <div id="menu-descubre-panel" className="menu-descubre-panel">
          <ul className="menu-descubre-libreros">
            {libreros.map((librero) => (
              <li key={librero}>
                <Link to={RUTA_LIBREROS} onClick={cerrar}>
                  {librero}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={RUTA_LIBREROS}
                className="menu-descubre-ver-todos"
                onClick={cerrar}
              >
                Ver todos los libreros [+]
              </Link>
            </li>
          </ul>

          <Link
            to={RUTA_LIBREROS}
            className="menu-descubre-pregunta"
            onClick={cerrar}
          >
            <img src={iconoChat} alt="" />
            <span className="menu-descubre-pregunta-titulo">
              ¿No sabes qué leer?
            </span>
            <span className="menu-descubre-pregunta-texto">
              Pregúntale a un librero y recibe una recomendación personalizada
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
