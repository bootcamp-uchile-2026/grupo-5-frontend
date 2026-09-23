import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import facebook from "../assets/iconos/01-facebook-negative.svg";
import instagram from "../assets/iconos/02-instagram-negative.svg";
import x from "../assets/iconos/03-x-negative.svg";
import youtube from "../assets/iconos/04-youtube-negative.svg";
import whatsapp from "../assets/iconos/05-whatsapp-negative.svg";

import "../estilos/carrito.css";

function Descubrir() {
  return (
    <>
      <section className="barra-navegacion">
        <header>
          {/* BANNER */}

          <div className="banner-contenedor">
            <p className="banner">
              &lt;&lt; Noticias destacadas, anuncios, ofertas &gt;&gt;
            </p>
          </div>

          {/* BARRA DE NAVEGACIÓN */}

          <nav>
            {/* LOGO */}

            <div className="header-logo">
              <a href="index.html">
                <img src={logo} alt="Logo de la marca" />
              </a>
            </div>

            {/* NAVEGACIÓN */}

            <div className="header-nav">
              <a href="index.html">Inicio</a>
              <a href="paginas/catalogo.html">Catálogo</a>
              <a href="paginas/comunidad.html">Comunidad</a>
              <a href="paginas/descubrir.html" aria-current="page">Descubrir</a>
              <a href="paginas/recomendaciones.html">Recomendaciones</a>
              <a href="paginas/biblioteca.html">Biblioteca</a>
              <a href="paginas/mi-cuenta.html">Mi Cuenta</a>
            </div>

            <div className="header-acciones">
              <form className="header-busqueda" role="search">
                <input
                  type="search"
                  placeholder="Buscar libros ..."
                  aria-label="Buscar libros"
                />

                <button type="submit" aria-label="Buscar">
                  <i className="bi bi-search" aria-hidden="true"></i>
                </button>
              </form>

              <a
                className="header-icono"
                href="mi-cuenta.html"
                aria-label="Inicio de sesión"
              >
                <i className="bi bi-person-circle" aria-hidden="true"></i>
              </a>

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
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="carrito-overlay"
                aria-label="Bolsa de compras"
              >
                <i className="bi bi-bag" aria-hidden="true"></i>
              </button>
            </div>
          </nav>
        </header>
      </section>

      {/* HERO */}
      <section className="hero">
        {/* HERO CONTENEDOR */}
        <div className="hero-contenedor">
          {/* HERO CENTENIDO */}
          <div className="hero-contenido">
            {/* HERO TÍTULO */}
            <div className="hero-titulo">
              <h2>Descubrir</h2>
            </div>
          </div>
        </div>
      </section>

      {/* CARRITO (VISTA SUPERPUESTA) */}
      <div className="carrito-overlay" id="carrito-overlay" hidden>
        <aside className="carrito-panel" aria-label="Carrito de compras">
          <div className="carrito-encabezado">
            <h3>Carrito</h3>

            <button
              className="carrito-cerrar"
              id="carrito-cerrar"
              type="button"
              aria-label="Cerrar carrito"
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>

          <div className="carrito-item">
            <div className="carrito-item-foto">
              Foto
              <br />
              libro
            </div>

            <div className="carrito-item-datos">
              <div className="carrito-item-fila">
                <span className="carrito-item-titulo">Título del libro</span>

                <div className="carrito-item-cantidad">
                  <button type="button" aria-label="Disminuir cantidad">
                    -
                  </button>

                  <span>1</span>

                  <button type="button" aria-label="Aumentar cantidad">
                    +
                  </button>
                </div>

                <button
                  className="carrito-item-eliminar"
                  type="button"
                  aria-label="Eliminar producto"
                >
                  <i className="bi bi-x" aria-hidden="true"></i>
                </button>
              </div>

              <span className="carrito-item-precio">$99.999</span>
            </div>
          </div>

          <hr className="carrito-separador" />

          <div className="carrito-sumario">
            <div className="carrito-sumario-fila">
              <span>Sumario:</span>
              <span>1 Item</span>
            </div>

            <div className="carrito-sumario-fila">
              <span>Subtotal:</span>
              <span>$99.999</span>
            </div>
          </div>

          <a className="carrito-pago" href="paginas/checkout.html">
            Pago seguro
          </a>

          <p className="carrito-envio-nota">
            El envío se calcula en el checkout
          </p>
        </aside>
      </div>

      <footer className="footer">
        {/* CONTENEDOR GENERAL */}
        <div className="footer-contenedor">
          {/* LOGO */}
          <section className="footer-logo">
            <img
              className="imagen-logo"
              src={logo}
              alt="Nombre y logo de la librería."
            />
          </section>

          {/* INFORMACIÓN */}
          <section className="footer-columna">
            <h3 className="columna-encabezado">Información</h3>

            <div className="columna-lista">
              <a href="">Contáctanos</a>
              <a href="">FAQ's</a>
              <a href="">Devoluciones y garantía</a>
              <a href="">Políticas de despacho</a>
              <a href="">Políticas de retiro en tienda</a>
            </div>
          </section>

          {/* LEECONNOS */}
          <section className="footer-columna">
            <h3 className="columna-encabezado">LeeConNos</h3>

            <div className="columna-lista">
              <a href="">Mi Cuenta</a>
              <a href="">Biblioteca</a>
              <a href="">Gift Cards</a>
              <a href="">Nuestro Equipo</a>
            </div>
          </section>

          {/* REDES SOCIALES */}
          <section className="footer-columna">
            <h3 className="columna-encabezado">Síguenos en</h3>

            <div className="iconos-contenedor">
              <img src={facebook} alt="Ícono de Facebook" />

              <img src={instagram} alt="Ícono de Instagram" />

              <img src={x} alt="Ícono de X" />

              <img src={youtube} alt="Ícono de YouTube" />

              <img src={whatsapp} alt="Ícono de Whatsapp" />
            </div>
          </section>
        </div>

        {/* LEGAL */}
        <div className="footer-legal">
          <p>
            (C)2026 leeconnos.cl - Todos los derechos reservados - Legión Atenea
            - Equipo 5 - Bootcamp Universidad de Chile
          </p>
        </div>
      </footer>
    </>
  );
}

export default Descubrir;
