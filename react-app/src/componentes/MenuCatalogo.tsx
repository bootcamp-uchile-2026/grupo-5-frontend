import { useState } from "react";
import { Link } from "react-router-dom";
import { Icono } from "./Icono";
import { useDesplegable } from "./useDesplegable";
import "../estilos/menu-catalogo.css";

type Columna = { titulo: string; opciones: string[] };
type Seccion = "generos" | "tematicas";

// Contenido del desplegable (Figma: Componentes Global, nodes 2294:20831 y 2294:20860)
const generos: Columna[] = [
  {
    titulo: "Ficción",
    opciones: [
      "Literatura contemporánea",
      "Misterio y thriller",
      "Fantasía",
      "Ciencia ficción",
      "Romance",
      "Terror",
      "Clásicos",
      "Distopía",
    ],
  },
  {
    titulo: "No ficción",
    opciones: [
      "Historia",
      "Filosofía",
      "Ciencia",
      "Sociedad",
      "Biografías",
      "Ensayo",
      "Crónica",
      "Naturaleza",
    ],
  },
  {
    titulo: "Arte y Diseño",
    opciones: [
      "Arte",
      "Diseño",
      "Fotografía",
      "Cine",
      "Música",
      "Arquitectura",
      "Ilustración",
      "Moda",
    ],
  },
  {
    titulo: "Bienestar",
    opciones: [
      "Psicología",
      "Desarrollo personal",
      "Esoterismo",
      "Tarot y oráculos",
      "Vida Saludable",
      "Nutrición",
      "Familia",
      "Autoayuda",
    ],
  },
  {
    titulo: "Negocios",
    opciones: [
      "Emprendimiento",
      "Finanzas",
      "Economía",
      "Liderazgo",
      "Marketing",
      "Innovación",
      "Productividad",
      "Tecnología",
    ],
  },
];

const tematicas: Columna[] = [
  {
    titulo: "Para cada momento",
    opciones: [
      "Enamorarse",
      "Llorar",
      "Reír",
      "Emocionarse",
      "Sentirse acompañado",
      "Inquietarse",
    ],
  },
  {
    titulo: "Para pensar",
    opciones: [
      "Darle vueltas",
      "Cuestionarlo todo",
      "Cambiar de perspectiva",
      "Entender el mundo",
      "Conocerse mejor",
      "Aprender algo nuevo",
    ],
  },
  {
    titulo: "Para descubrir",
    opciones: [
      "Joyas escondidas",
      "Más allá del hype",
      "Autores por descubrir",
      "Historias que sorprenden",
      "Favoritos inesperados",
      "Merecen más atención",
    ],
  },
  {
    titulo: "Para compartir",
    opciones: [
      "Regalos",
      "Lecturas compartidas",
      "Para conversar",
      "Para alguien especial",
    ],
  },
];

const columnasPorSeccion: Record<Seccion, Columna[]> = { generos, tematicas };

// Por ahora todas las opciones llevan al catálogo completo
const RUTA_CATALOGO = "/catalogo";

export function MenuCatalogo() {
  const { abierto, alternar, cerrar, contenedorRef } = useDesplegable();
  const [seccion, setSeccion] = useState<Seccion | null>(null);
  const expandido = abierto && seccion !== null;

  const alternarMenu = () => {
    // Al abrir se muestra solo la columna izquierda
    if (!abierto) setSeccion(null);
    alternar();
  };

  const alternarSeccion = (nueva: Seccion) =>
    setSeccion((actual) => (actual === nueva ? null : nueva));

  const botonSeccion = (id: Seccion, texto: string) => (
    <button
      type="button"
      className={`menu-catalogo-opcion menu-catalogo-seccion${seccion === id ? " menu-catalogo-seccion-activa" : ""}`}
      aria-expanded={seccion === id}
      aria-controls="menu-catalogo-columnas"
      onClick={() => alternarSeccion(id)}
    >
      {texto}
      <Icono nombre={seccion === id ? "abajo" : "siguiente"} />
    </button>
  );

  const enlace = (texto: string) => (
    <Link
      to={RUTA_CATALOGO}
      className="menu-catalogo-opcion"
      onClick={cerrar}
    >
      {texto}
    </Link>
  );

  return (
    <div
      ref={contenedorRef}
      className={`menu-catalogo${expandido ? " menu-catalogo-expandido" : ""}`}
    >
      <button
        type="button"
        className="header-nav-boton"
        aria-expanded={abierto}
        aria-controls="menu-catalogo-panel"
        onClick={alternarMenu}
      >
        <Icono nombre="abajo" />
        Catálogo
      </button>

      {abierto && (
        <div id="menu-catalogo-panel" className="menu-catalogo-panel">
          <div className="menu-catalogo-contenido">
            <ul className="menu-catalogo-lista">
              <li>{botonSeccion("generos", "Géneros")}</li>
              <li>{enlace("Destacados")}</li>
              <li>{botonSeccion("tematicas", "Temáticas")}</li>
              <li>{enlace("Ofertas")}</li>
              <li>{enlace("Preventas")}</li>
            </ul>

            {seccion && (
              <div
                id="menu-catalogo-columnas"
                className="menu-catalogo-columnas"
              >
                {columnasPorSeccion[seccion].map((columna) => (
                  <section key={columna.titulo} className="menu-catalogo-columna">
                    <h3>{columna.titulo}</h3>
                    <ul>
                      {columna.opciones.map((opcion) => (
                        <li key={opcion}>
                          <Link to={RUTA_CATALOGO} onClick={cerrar}>
                            {opcion}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to={RUTA_CATALOGO}
                          className="menu-catalogo-ver-todo"
                          onClick={cerrar}
                        >
                          Ver todo [+]
                        </Link>
                      </li>
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
