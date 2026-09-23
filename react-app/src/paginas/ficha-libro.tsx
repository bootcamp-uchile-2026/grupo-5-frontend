import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import facebook from "../assets/iconos/01-facebook-negative.svg";
import instagram from "../assets/iconos/02-instagram-negative.svg";
import x from "../assets/iconos/03-x-negative.svg";
import youtube from "../assets/iconos/04-youtube-negative.svg";
import whatsapp from "../assets/iconos/05-whatsapp-negative.svg";

import "../estilos/carrito.css";
import "../estilos/ficha-libro.css";

function FichaLibro() {
  return (
    <>
      {/*ENCABEZADO*/}
      <section className="barra-navegacion">
        <header>
          {/*BANNER*/}
          <div className="banner-contenedor">
            <p className="banner">
              &lt;&lt; Noticias destacadas, anuncios, ofertas &gt;&gt;
            </p>
          </div>

          {/* BARRA DE NAVEGACIÓN */}
          <nav>
            {/*LOGO*/}
            <div className="header-logo">
              <a href="index.html">
                <img src={logo} alt="Logo de la marca" />
              </a>
            </div>

            {/*NAVEGACIÓN*/}
            <div className="header-nav">
              <a href="../index.html">Inicio</a>
              <a href="../paginas/catalogo.html">Catálogo</a>
              <a href="../paginas/comunidad.html">Comunidad</a>
              <a href="../paginas/descubrir.html">Descubrir</a>
              <a href="../paginas/recomendaciones.html">Recomendaciones</a>
              <a href="../paginas/biblioteca.html">Biblioteca</a>
              <a href="../paginas/mi-cuenta.html">Mi Cuenta</a>
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
                className="header-icono"
                id="boton-carrito"
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

      {/*--------------------------------------------------------------------------------------*/}

      {/*CONTENIDO FICHA LIBRO*/}
      <main className="contenido-libro">
        <div className="ruta-categoria">
          <a className="home" href="../index.html" aria-label="Volver al home">
            <img src="https://placehold.co/40x40" alt="Icono de casa" />
          </a>
          <p> &gt; Categoría &gt; Arte, Arquitectura y Diseño</p>
        </div>

        <section className="ficha-libro">
          <div className="galeria-libro">
            <div className="imagen_libro">
              <img
                src="https://placehold.co/1080x1350"
                alt="Portada del libro"
              />
              <button
                className="flecha flecha-anterior"
                type="button"
                aria-label="Imagen anterior"
              >
                &lt;
              </button>
              <button
                className="flecha flecha-siguiente"
                type="button"
                aria-label="Imagen siguiente"
              >
                &gt;
              </button>
            </div>

            <div className="miniaturas-libro">
              <div className="imagen_micro">
                <img
                  src="https://placehold.co/1080x1080"
                  alt="Imagen micro 1"
                />
              </div>

              <div className="imagen_micro">
                <img
                  src="https://placehold.co/1080x1080"
                  alt="Imagen micro 2"
                />
              </div>

              <div className="imagen_micro">
                <img
                  src="https://placehold.co/1080x1080"
                  alt="Imagen micro 3"
                />
              </div>
            </div>
          </div>

          <div className="datos-libro">
            <h1>Nombre del libro</h1>
            <h3>Nombre Editorial / Nombre Autor</h3>
            <p className="titulo-descripcion">Descripción del libro</p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
              imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
              ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
              tellus eget condimentum rhoncus, sem quam semper libero, sit amet
              adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
              pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
              tempus. Donec vitae sapien ut libero.,
            </p>
            <div className="precio">
              <h2>$27.990</h2>
              <div className="disponibilidad">
                <p className="stock">En stock online</p>
                <p>Ver disponibilidad en tienda</p>
              </div>
            </div>
            <div className="cantidad">
              <p className="titulo-cantidad">Cantidad</p>
              <div className="botones">
                <button
                  type="button"
                  id="menos-cantidad"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  min="1"
                  max="10"
                  defaultValue="1"
                />
                <button
                  type="button"
                  id="mas-cantidad"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                id="agregar-carrito"
                aria-label="Agregar al carrito"
              >
                Agregar al carrito
              </button>
            </div>
            <div className="especificaciones">
              <hr />
              <div className="titulo-especificaciones">
                <h3>Especificaciones</h3>
                <h3>&gt;</h3>
              </div>
              <hr />
              <div className="etiquetas">
                <button type="button" aria-label="Etiqueta 1">
                  #Etiqueta 1
                </button>
                <button type="button" aria-label="Etiqueta 2">
                  #Etiqueta 2
                </button>
                <button type="button" aria-label="Etiqueta 3">
                  #Etiqueta 3
                </button>
                <button type="button" aria-label="Etiqueta 4">
                  #Etiqueta 4
                </button>
              </div>
            </div>
          </div>
        </section>

        {/*CONTENIDO RECOMENDACION LEECONNOS*/}
        <section className="recomendacion-libro">
          <h2>Recomendación LeeConNos</h2>
          <h3>Nombre del curador</h3>
          <div className="contenido-recomendacion">
            <div className="video_recomendacion">
              <img
                src="https://placehold.co/1080x920"
                alt="video_recomendacion"
              />
            </div>
            <div className="texto-recomendacion">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante,
              </p>
              <div className="explora-mas">
                <p>Explora más</p>
              </div>
              <div className="imagenes-explora">
                <img
                  src="https://placehold.co/600x400"
                  alt="Libro recomendado 1"
                />
                <img
                  src="https://placehold.co/600x400"
                  alt="Libro recomendado 2"
                />
                <img
                  src="https://placehold.co/600x400"
                  alt="Libro recomendado 3"
                />
              </div>
            </div>
          </div>
        </section>

        {/*VALORACION LIBRO*/}
        <section className="valoracion-libro">
          <hr />
          <div className="puntaje-valoracion">
            <h1>4,99</h1>
            <h2>Favorito entre lectores</h2>
            <p>
              Este libro está en el 5% de los libros de arte mejor valorados,
              según las valoraciones, las reseñas y la confiabilidad.
            </p>
          </div>
          <hr />
        </section>

        {/*RESEÑAS LIBRO*/}
        <section className="reseñas-libro">
          <div className="reseñas-contenedor">
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
              <a className="mostrar-mas" href="#">
                Mostrar más
              </a>
            </div>
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
              <a className="mostrar-mas" href="#">
                Mostrar más
              </a>
            </div>
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
              <a className="mostrar-mas" href="#">
                Mostrar más
              </a>
            </div>
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
              <a className="mostrar-mas" href="#">
                Mostrar más
              </a>
            </div>
          </div>
        </section>
        <hr className="separador-reseñas-catalogo" />

        {/*MINI CATALOGO*/}
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
        </section>
      </main>

      {/*--------------------------------------------------------------------------------------*/}

      {/*CARRITO (VISTA SUPERPUESTA)*/}
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
          <a className="carrito-pago" href="checkout.html">
            Pago seguro
          </a>
          <p className="carrito-envio-nota">
            El envío se calcula en el checkout
          </p>
        </aside>
      </div>

      {/* PIE DE PÁGINA */}
      <footer className="footer">
        {/*Contenedor General para el diseño en columnas*/}
        <div className="footer-contenedor">
          {/*Contenedor del logo*/}
          <section className="footer-logo">
            <img
              className="imagen-logo"
              src={logo}
              alt="Nombre y logo de la librería."
            />
          </section>

          {/*Contenedor de Información*/}
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

          {/*Contenedor de LeeConNos*/}
          <section className="footer-columna">
            <h3 className="columna-encabezado">LeeConNos</h3>
            <div className="columna-lista">
              <a href="">Mi Cuenta</a>
              <a href="">Biblioteca</a>
              <a href="">Gift Cards</a>
              <a href="">Nuestro Equipo</a>
            </div>
          </section>

          {/*Contenedor de Redes Sociales*/}
          <section className="footer-columna">
            <h3 className="columna-encabezado">Síguenos en</h3>

            {/* Contenedor de íconos de RRSS*/}
            <div className="iconos-contenedor">
              <img src={facebook} alt="Ícono de Facebook" />
              <img src={instagram} alt="Ícono de Instagram" />
              <img src={x} alt="Ícono de X" />
              <img src={youtube} alt="Ícono de YouTube" />
              <img src={whatsapp} alt="Ícono de Whatsapp" />
            </div>
          </section>
        </div>

        {/*Contenedor Legal*/}
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

export default FichaLibro;
