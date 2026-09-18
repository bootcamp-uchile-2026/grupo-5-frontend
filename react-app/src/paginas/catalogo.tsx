import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import facebook from "../assets/iconos/01-facebook-negative.svg";
import instagram from "../assets/iconos/02-instagram-negative.svg";
import x from "../assets/iconos/03-x-negative.svg";
import youtube from "../assets/iconos/04-youtube-negative.svg";
import whatsapp from "../assets/iconos/05-whatsapp-negative.svg";

import "../estilos/catalogo.css";
import "../estilos/carrito.css";

function Catalogo() {
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
              <a href="paginas/catalogo.html" aria-current="page">
                Catálogo
              </a>
              <a href="paginas/comunidad.html">Comunidad</a>
              <a href="paginas/descubrir.html">Descubrir</a>
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

      <main className="catalogo">
        <div className="catalogo-filtros">
          <div className="catalogo-filtros-grupo">
            <label>Filtrar:</label>
            <select aria-label="Filtrar por categorías">
              <option>Categorías</option>
            </select>
            <select aria-label="Filtrar por descuento">
              <option>% Descuento</option>
            </select>
            <select aria-label="Filtrar por precio">
              <option>% Precio</option>
            </select>
            <select aria-label="Filtrar por autor">
              <option>Autor</option>
            </select>
            <select aria-label="Filtrar por editorial">
              <option>Editorial</option>
            </select>
          </div>
          <div className="catalogo-orden">
            <label htmlFor="orden">Ordenar por:</label>
            <select id="orden" aria-label="Ordenar catálogo">
              <option>Relevancia</option>
              <option>Precio menor</option>
              <option>Precio mayor</option>
            </select>
          </div>
          <span className="catalogo-resultados">67 resultados</span>
        </div>

        <section className="catalogo-grilla" aria-label="Libros del catálogo">
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg"
              alt="Portada de El principito"
            />
            <h2 className="catalogo-titulo">El principito</h2>
            <p className="catalogo-autor">Antoine de Saint-Exupéry</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$20.150</span>
              <span className="catalogo-precio-anterior">$26.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg"
              alt="Portada de Cien años de soledad"
            />
            <h2 className="catalogo-titulo">Cien años de soledad</h2>
            <p className="catalogo-autor">Gabriel García Márquez</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$22.900</span>
              <span className="catalogo-precio-anterior">$26.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg"
              alt="Portada de Don Quijote de la Mancha"
            />
            <h2 className="catalogo-titulo">Don Quijote de la Mancha</h2>
            <p className="catalogo-autor">Miguel de Cervantes</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$25.600</span>
              <span className="catalogo-precio-anterior">$31.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780394757681-L.jpg"
              alt="Portada de Rayuela"
            />
            <h2 className="catalogo-titulo">Rayuela</h2>
            <p className="catalogo-autor">Julio Cortázar</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$19.990</span>
              <span className="catalogo-precio-anterior">$24.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg"
              alt="Portada de La metamorfosis"
            />
            <h2 className="catalogo-titulo">La metamorfosis</h2>
            <p className="catalogo-autor">Franz Kafka</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$15.500</span>
              <span className="catalogo-precio-anterior">$18.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg"
              alt="Portada de Orgullo y prejuicio"
            />
            <h2 className="catalogo-titulo">Orgullo y prejuicio</h2>
            <p className="catalogo-autor">Jane Austen</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$21.300</span>
              <span className="catalogo-precio-anterior">$27.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780802130303-L.jpg"
              alt="Portada de Ficciones"
            />
            <h2 className="catalogo-titulo">Ficciones</h2>
            <p className="catalogo-autor">Jorge Luis Borges</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$18.700</span>
              <span className="catalogo-precio-anterior">$22.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg"
              alt="Portada de 1984"
            />
            <h2 className="catalogo-titulo">1984</h2>
            <p className="catalogo-autor">George Orwell</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$17.800</span>
              <span className="catalogo-precio-anterior">$23.500</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button className="catalogo-carrito" type="button">
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
        </section>
      </main>
        {/* NEWSLETTER */}
        <section className="newsletter">
          <h2 className="newsletter-titulo">Suscríbete a nuestro newsletter</h2>

          <p className="newsletter-pie">
            Entérate de recomendaciones,
            <br />
            novedades y más
          </p>

          <form className="newsletter-formulario">
            <input
              type="email"
              placeholder="Ingresa tu e-mail"
              aria-label="Ingresa tu e-mail"
              required
            />

            <button className="newsletter-boton" type="submit">
              Suscribirme
            </button>
          </form>
        </section>

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
              (C)2026 leeconnos.cl - Todos los derechos reservados - Legión
              Atenea - Equipo 5 - Bootcamp Universidad de Chile
            </p>
          </div>
        </footer>

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
    </>
  );
}

export default Catalogo;
