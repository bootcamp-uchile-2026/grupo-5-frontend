import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import facebook from "../assets/iconos/01-facebook-negative.svg";
import instagram from "../assets/iconos/02-instagram-negative.svg";
import x from "../assets/iconos/03-x-negative.svg";
import youtube from "../assets/iconos/04-youtube-negative.svg";
import whatsapp from "../assets/iconos/05-whatsapp-negative.svg";

import "../estilos/index.css";
import "../estilos/base.css";
import "../estilos/carrito.css";

function Index() {
  return (
    <>
      {/* ENCABEZADO */}
      <body>
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
                <a href="index.html" aria-current="page">
                  Inicio
                </a>
                <a href="paginas/catalogo.html">Catálogo</a>
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

        {/* HERO */}
        <section className="hero">
          {/* HERO CONTENEDOR */}
          <div className="hero-contenedor">
            {/* HERO CONTENIDO */}
            <div className="hero-contenido">
              {/* HERO TÍTULO */}
              <div className="hero-titulo">
                <h2>Encuentra ese libro que aún no conoces</h2>
              </div>

              {/* HERO PIE */}
              <div className="hero-pie">
                <p>
                  Descubre tu próxima lectura y conecta con una comunidad de
                  lectores como tú
                </p>
              </div>

              {/* HERO BOTONES */}
              <div className="hero-botones">
                <button className="boton">Botón 1</button>
                <button className="boton">Botón 2</button>
              </div>

              {/* HERO CARACTERÍSTICAS */}
              <div className="hero-caracteristicas">
                <div className="hero-caracteristicas-contenedor">
                  <i
                    className="bi bi-circle-fill hero-caracteristica-icono"
                    aria-hidden="true"
                  ></i>
                  <h3>Libros</h3>
                  <p>Encuentra tu próximo favorito</p>
                </div>

                <div className="hero-caracteristicas-contenedor">
                  <i
                    className="bi bi-circle-fill hero-caracteristica-icono"
                    aria-hidden="true"
                  ></i>
                  <h3>Curadores Expertos</h3>
                  <p>Encuentra tu próximo favorito</p>
                </div>

                <div className="hero-caracteristicas-contenedor">
                  <i
                    className="bi bi-circle-fill hero-caracteristica-icono"
                    aria-hidden="true"
                  ></i>
                  <h3>Comunidad</h3>
                  <p>Encuentra tu próximo favorito</p>
                </div>
              </div>
            </div>

            {/* HERO IMAGEN */}
            <div className="hero-imagen">
              <img src="https://placehold.co/600x400" alt="placehold" />
            </div>
          </div>
        </section>

        {/* CARRUSEL RECOMENDACIONES LIBRERO */}
        <section className="carrusel-recomendaciones">
          {/* ENCABEZADO */}
          <header className="carrusel-recomendaciones-encabezado">
            <h3 className="carrusel-recomendaciones-titulo">
              Recomendados por Nuestros Libreros
            </h3>

            <div className="carrusel-recomendaciones-acciones">
              <a href="">Ver más</a>

              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </header>

          {/* CONTENEDOR RECOMENDACIONES */}
          <div className="carrusel-recomendaciones-contenedor">
            {/* CONTENEDOR TARJETAS */}
            <div className="coleccion-tarjetas">
              {/* TARJETA 1 */}
              <article className="carrusel-recomendaciones-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Luciano H.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">El Principito</div>

                  <div className="tarjeta-libro-info-autor">
                    Antoine de Saint-Exupéry
                  </div>

                  <div className="tarjeta-libro-info-precio">$13.200</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 2 */}
              <article className="carrusel-recomendaciones-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Tania G.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Cien años de soledad
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Gabriel García Márquez
                  </div>

                  <div className="tarjeta-libro-info-precio">$22.900</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 3 */}
              <article className="carrusel-recomendaciones-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Daniela C.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Don Quijote de la Mancha
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Miguel de Cervantes
                  </div>

                  <div className="tarjeta-libro-info-precio">$25.600</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 4 */}
              <article className="carrusel-recomendaciones-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Alexis M.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">1984</div>

                  <div className="tarjeta-libro-info-autor">George Orwell</div>

                  <div className="tarjeta-libro-info-precio">$14.400</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>
            </div>

            {/* CONTROLES CARRUSEL */}
            <div className="controles-carrusel">
              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </div>
        </section>

        {/* COMUNIDAD LECTORA */}
        <section className="comunidad-lectora">
          {/* CONTENEDOR */}
          <div className="comunidad-lectora-contenedor">
            {/* COMUNIDAD LECTORA CONTENIDO */}
            <div className="comunidad-lectora-contenido">
              {/* COMUNIDAD LECTORA TÍTULO */}
              <div className="comunidad-lectora-titulo">
                <h2>Únete a nuestra comunidad lectora</h2>
              </div>

              {/* COMUNIDAD LECTORA PIE */}
              <div className="comunidad-lectora-pie">
                <p>
                  Comparte reseñas y descubre recomendaciones de la comunidad
                </p>
              </div>

              {/* COMUNIDAD LECTORA BOTONES */}
              <div className="comunidad-lectora-botones">
                <button className="boton">Botón 3</button>
              </div>
            </div>

            {/* COMUNIDAD LECTORA IMAGEN */}
            <div className="comunidad-lectora-imagen">
              <img src="https://placehold.co/600x300" alt="placehold" />
            </div>
          </div>
        </section>

        {/* CARRUSEL MÁS VENDIDOS */}
        <section className="carrusel-mas-vendidos">
          {/* ENCABEZADO */}
          <header className="carrusel-mas-vendidos-encabezado">
            <h3 className="carrusel-mas-vendidos-titulo">Más Vendidos</h3>

            <div className="carrusel-mas-vendidos-acciones">
              <a href="">Ver más</a>

              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </header>

          {/* CONTENEDOR */}
          <div className="carrusel-mas-vendidos-contenedor">
            {/* COLECCIÓN DE TARJETAS */}
            <div className="coleccion-tarjetas">
              {/* TARJETA 1 */}
              <article className="carrusel-mas-vendidos-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Luciano H.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">El Principito</div>

                  <div className="tarjeta-libro-info-autor">
                    Antoine de Saint-Exupéry
                  </div>

                  <div className="tarjeta-libro-info-precio">$13.200</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 2 */}
              <article className="carrusel-mas-vendidos-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Tania G.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Cien años de soledad
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Gabriel García Márquez
                  </div>

                  <div className="tarjeta-libro-info-precio">$22.900</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 3 */}
              <article className="carrusel-mas-vendidos-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Daniela C.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Don Quijote de la Mancha
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Miguel de Cervantes
                  </div>

                  <div className="tarjeta-libro-info-precio">$25.600</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 4 */}
              <article className="carrusel-mas-vendidos-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Alexis M.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">1984</div>

                  <div className="tarjeta-libro-info-autor">George Orwell</div>

                  <div className="tarjeta-libro-info-precio">$14.400</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>
            </div>

            {/* CONTROLES */}
            <div className="controles-carrusel">
              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </div>
        </section>

        {/* CARRUSEL NUEVOS LANZAMIENTOS */}
        <section className="carrusel-lanzamiento">
          {/* ENCABEZADO */}
          <header className="carrusel-lanzamiento-encabezado">
            <h3 className="carrusel-lanzamiento-titulo">Nuevos Lanzamientos</h3>

            <div className="carrusel-lanzamiento-acciones">
              <a href="">Ver más</a>

              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </header>

          {/* CONTENEDOR */}
          <div className="carrusel-lanzamiento-contenedor">
            {/* COLECCIÓN DE TARJETAS */}
            <div className="coleccion-tarjetas">
              {/* TARJETA 1 */}
              <article className="carrusel-lanzamiento-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Luciano H.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">El Principito</div>

                  <div className="tarjeta-libro-info-autor">
                    Antoine de Saint-Exupéry
                  </div>

                  <div className="tarjeta-libro-info-precio">$13.200</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 2 */}
              <article className="carrusel-lanzamiento-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Tania G.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Cien años de soledad
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Gabriel García Márquez
                  </div>

                  <div className="tarjeta-libro-info-precio">$22.900</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 3 */}
              <article className="carrusel-lanzamiento-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Daniela C.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Don Quijote de la Mancha
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Miguel de Cervantes
                  </div>

                  <div className="tarjeta-libro-info-precio">$25.600</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 4 */}
              <article className="carrusel-lanzamiento-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Alexis M.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">1984</div>

                  <div className="tarjeta-libro-info-autor">George Orwell</div>

                  <div className="tarjeta-libro-info-precio">$14.400</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>
            </div>

            {/* CONTROLES */}
            <div className="controles-carrusel">
              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </div>
        </section>

        {/* CARRUSEL MÁS COMENTADOS DE LA COMUNIDAD */}
        <section className="carrusel-comentados">
          {/* ENCABEZADO */}
          <header className="carrusel-comentados-encabezado">
            <h3 className="carrusel-comentados-titulo">
              Más Comentados por la Comunidad
            </h3>

            <div className="carrusel-comentados-acciones">
              <a href="">Ver más</a>

              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </header>

          {/* CONTENEDOR */}
          <div className="carrusel-comentados-contenedor">
            {/* COLECCIÓN DE TARJETAS */}
            <div className="coleccion-tarjetas">
              {/* TARJETA 1 */}
              <article className="carrusel-comentados-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Luciano H.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">El Principito</div>

                  <div className="tarjeta-libro-info-autor">
                    Antoine de Saint-Exupéry
                  </div>

                  <div className="tarjeta-libro-info-precio">$13.200</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 2 */}
              <article className="carrusel-comentados-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Tania G.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Cien años de soledad
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Gabriel García Márquez
                  </div>

                  <div className="tarjeta-libro-info-precio">$22.900</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 3 */}
              <article className="carrusel-comentados-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Daniela C.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">
                    Don Quijote de la Mancha
                  </div>

                  <div className="tarjeta-libro-info-autor">
                    Miguel de Cervantes
                  </div>

                  <div className="tarjeta-libro-info-precio">$25.600</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>

              {/* TARJETA 4 */}
              <article className="carrusel-comentados-tarjeta">
                <div className="tarjeta-header-curador">
                  <img
                    className="tarjeta-imagen-curador"
                    src="https://placehold.co/30/000000/ffffff"
                    alt="miniatura del librero"
                  />

                  <div className="tarjeta-nombre-curador">Alexis M.</div>
                </div>

                <div className="tarjeta-libro-portada">
                  <img
                    className="tarjeta-portada-imagen"
                    src="https://placehold.co/250x200"
                    alt="imagen de portada del libro"
                  />
                </div>

                <div className="tarjeta-libro-info">
                  <div className="tarjeta-libro-info-titulo">1984</div>

                  <div className="tarjeta-libro-info-autor">George Orwell</div>

                  <div className="tarjeta-libro-info-precio">$14.400</div>

                  <div className="tarjeta-libro-info-favorito">
                    <i className="bi bi-heart" aria-hidden="true"></i>
                  </div>
                </div>
              </article>
            </div>

            {/* CONTROLES */}
            <div className="controles-carrusel">
              <button type="button" aria-label="anterior">
                &lt;
              </button>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              <button type="button" aria-label="siguiente">
                &gt;
              </button>
            </div>
          </div>
        </section>

        {/* FORMULARIO INICIO DE SESIÓN */}
        <div className="modal-overlay" id="modal-inicio-sesion">
          <section
            className="modal-inicio-sesion"
            aria-labelledby="titulo-login"
          >
            <header className="modal-inicio-sesion-encabezado">
              <h2 id="titulo-login">Iniciar sesión</h2>

              <p className="modal-inicio-sesion-registro">
                ¿Nuevo en LeeConNos? <a href="#">Crear cuenta</a>
              </p>
            </header>

            <form className="modal-inicio-sesion-form">
              <div className="campo-formulario">
                <label htmlFor="correo">Correo electrónico</label>

                <input
                  id="correo"
                  type="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  required
                />

                <label htmlFor="contrasena">Contraseña</label>

                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  placeholder="Contraseña"
                  required
                />

                <button className="boton-login" type="submit">
                  Iniciar sesión
                </button>

                <button className="boton-crear-cuenta" type="button">
                  Crear una cuenta
                </button>

                <a className="recuperar-contrasena" href="#">
                  Olvidé mi contraseña
                </a>

                <div className="separador-login">
                  <span>o continuar con</span>
                </div>

                <div className="opciones-login-social">
                  <button
                    className="boton-social"
                    type="button"
                    aria-label="Continuar con Google"
                  >
                    Gmail
                  </button>

                  <button
                    className="boton-social"
                    type="button"
                    aria-label="Continuar con otra cuenta"
                  >
                    Cuenta
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

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
      </body>

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

      {/* PIE DE PÁGINA */}
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

export default Index;
