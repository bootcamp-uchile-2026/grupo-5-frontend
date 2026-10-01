import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import { Banner } from "./Banner";
import { NavLink } from "react-router-dom";

const enlaces = [
  { id: "inicio", texto: "Inicio", href: "/" },
  { id: "catalogo", texto: "Catálogo", href: "/catalogo" },
  { id: "comunidad", texto: "Comunidad", href: "/comunidad" },
  { id: "descubrir", texto: "Descubrir", href: "/descubrir" },
  {
    id: "recomendaciones",
    texto: "Recomendaciones",
    href: "/recomendaciones",
  },
  { id: "biblioteca", texto: "Biblioteca", href: "/biblioteca" },
  { id: "mi-cuenta", texto: "Mi Cuenta", href: "/mi-cuenta" },
] as const;

export function BarraNavegacion() {
  return (
    <section className="barra-navegacion">
      <header>
        <Banner />

        <nav aria-label="Navegación principal">
          <div className="header-logo">
            <NavLink to="/" aria-label="Librería, inicio">
              <img src={logo} alt="Logo de la marca" />
            </NavLink>
          </div>

          <div className="header-nav">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.id}
                to={enlace.href}
                end={enlace.href === "/"}
              >
                {enlace.texto}
              </NavLink>
            ))}
          </div>

          <div className="header-acciones">
            <form className="header-busqueda" role="search" action="/catalogo">
              <input
                type="search"
                name="q"
                placeholder="Buscar libros ..."
                aria-label="Buscar libros"
              />
              <button type="submit" aria-label="Buscar">
                <i className="bi bi-search" aria-hidden="true"></i>
              </button>
            </form>

            <button
              id="boton-iniciar-sesion"
              className="header-icono"
              type="button"
              aria-label="Mi cuenta"
            >
              <i className="bi bi-person-circle" aria-hidden="true"></i>
            </button>

            <button
              className="header-icono"
              type="button"
              aria-label="Favoritos"
            >
              <i className="bi bi-heart" aria-hidden="true"></i>
            </button>

            <button
              id="boton-carrito"
              className="header-icono"
              type="button"
              aria-label="Bolsa de compras"
            >
              <i className="bi bi-bag" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </header>
    </section>
  );
}