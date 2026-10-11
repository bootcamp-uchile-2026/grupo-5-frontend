import logoImagen from "../assets/logos/05-Imagen-2-colores.svg";
import logoTexto from "../assets/logos/04-Horizontal-Texto.svg";
import type { FormEvent } from "react";
import { Banner } from "./Banner";
import { NavLink, useNavigate } from "react-router-dom";
import { useCarritoStore } from "../estado/carritoStore";
import { useSesionStore } from "../estado/sesionStore";
import { Icono } from "./Icono";
import { MenuCatalogo } from "./MenuCatalogo";
import { MenuComunidad } from "./MenuComunidad";
import { MenuDescubre } from "./MenuDescubre";
import "../estilos/barra-navegacion.css";

type BarraNavegacionProps = {
  onAbrirAutenticacion: () => void;
};

export function BarraNavegacion({ onAbrirAutenticacion }: BarraNavegacionProps) {
  const usuario = useSesionStore((s) => s.usuario);
  const abrirCarrito = useCarritoStore((s) => s.abrir);
  const carritoAbierto = useCarritoStore((s) => s.abierto);
  const totalItems = useCarritoStore((s) =>
    s.items.reduce((total, item) => total + item.cantidad, 0),
  );
  const navegar = useNavigate();

  // Búsqueda con React Router (sin recargar la página); ignora textos vacíos
  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datosFormulario = new FormData(evento.currentTarget);
    const consulta = String(datosFormulario.get("q") ?? "").trim();
    if (!consulta) return;
    navegar(`/catalogo?q=${encodeURIComponent(consulta)}`);
  }

  return (
    <section className="barra-navegacion">
      <header>
        <Banner />

        <nav aria-label="Navegación principal">
          <div className="header-logo">
            <NavLink to="/" aria-label="Leeconnos, inicio">
              <img src={logoImagen} alt="" />
              <img src={logoTexto} alt="" />
            </NavLink>
          </div>

          <div className="header-nav">
            <MenuCatalogo />
            <MenuDescubre />
            <MenuComunidad />
          </div>

          <div className="header-acciones">
            <form className="header-busqueda" role="search" onSubmit={buscar}>
              <input
                type="search"
                name="q"
                placeholder="Buscar libros, autores, géneros..."
                aria-label="Buscar libros, autores o géneros"
                required
              />
              <button type="submit" aria-label="Buscar">
                <Icono nombre="busqueda" />
              </button>
            </form>

            <div className="header-perfil">
              {usuario && (
                <span className="header-saludo">Hola, {usuario.nombre}</span>
              )}

              <button
                id="boton-iniciar-sesion"
                className={`header-icono header-icono-usuario${usuario ? " header-icono-usuario-activo" : ""}`}
                type="button"
                aria-label="Mi cuenta"
                aria-haspopup="dialog"
                onClick={onAbrirAutenticacion}
              >
                <Icono nombre="usuario" />
              </button>
            </div>

            <button
              id="boton-carrito"
              className="header-icono header-icono-carrito"
              type="button"
              aria-label={
                totalItems > 0
                  ? `Carrito de compras, ${totalItems} en el carrito`
                  : "Carrito de compras"
              }
              aria-expanded={carritoAbierto}
              onClick={abrirCarrito}
            >
              <Icono nombre="carro" />
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