import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import { Banner } from "./Banner";
import { NavLink } from "react-router-dom";
import { useCarritoStore } from "../estado/carritoStore";

const enlaces = [
  { id: "inicio", texto: "Inicio", href: "/" },
  { id: "catalogo", texto: "Catálogo", href: "/catalogo" },
  { id: "comunidad", texto: "Comunidad", href: "/comunidad" },
  { id: "descubrir", texto: "Descubrir", href: "/descubrir" },
  { id: "curaduria", texto: "Curaduría", href: "/perfil-librero" },
  {
    id: "recomendaciones",
    texto: "Recomendaciones",
    href: "/recomendaciones",
  },
  { id: "biblioteca", texto: "Biblioteca", href: "/biblioteca" },
  { id: "mi-cuenta", texto: "Mi Cuenta", href: "/mi-cuenta" },
] as const;

type BarraNavegacionProps = {
  onAbrirAutenticacion: () => void;
};

export function BarraNavegacion({ onAbrirAutenticacion }: BarraNavegacionProps) {
  const abrirCarrito = useCarritoStore((s) => s.abrir);
  const carritoAbierto = useCarritoStore((s) => s.abierto);
  const totalItems = useCarritoStore((s) =>
    s.items.reduce((total, item) => total + item.cantidad, 0),
  );

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
              aria-haspopup="dialog"
              onClick={onAbrirAutenticacion}
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
              aria-label={
                totalItems > 0
                  ? `Bolsa de compras, ${totalItems} en el carrito`
                  : "Bolsa de compras"
              }
              aria-expanded={carritoAbierto}
              onClick={abrirCarrito}
            >
              <i className="bi bi-bag" aria-hidden="true"></i>
              {totalItems > 0 && (
                <span className="header-carrito-contador" aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>
    </section>
  );
}