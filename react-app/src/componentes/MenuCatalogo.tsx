import { useState } from "react";
import { Link } from "react-router-dom";
import { Icono } from "./Icono";
import { useDesplegable } from "./useDesplegable";
import { usePeticion } from "./usePeticion";
import { generos, rutaDeGenero, tematicas } from "../datos/generos";
import { obtenerCategorias, type MenuCategorias } from "../servicios/catalogoServicio";
import "../estilos/menu-catalogo.css";

type Seccion = keyof MenuCategorias;

// Mientras carga GET /libros/categorias, o si falla, el menú usa las mismas
// columnas de UX guardadas en datos/generos.ts
const COLUMNAS_INICIALES: MenuCategorias = { generos, tematicas };

// Destacados, Ofertas, Preventas y "Ver todo" llevan al catálogo completo
const RUTA_CATALOGO = "/catalogo";

export function MenuCatalogo() {
  const { abierto, alternar, cerrar, contenedorRef } = useDesplegable();
  const categorias = usePeticion(obtenerCategorias, "categorias");
  const columnasPorSeccion = categorias.datos ?? COLUMNAS_INICIALES;
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
                          <Link to={rutaDeGenero(opcion)} onClick={cerrar}>
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
