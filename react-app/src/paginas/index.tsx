import "../estilos/index.css";
import "../estilos/base.css";
import "../estilos/carrito.css";
import { TarjetaLibro } from "../componentes/TarjetaLibro";

const librosDestacados = [
  {
    nombreCurador: "Luciano H.",
    imagenCurador: "https://placehold.co/30/000000/ffffff",
    portada: "https://placehold.co/250x200",
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 13200,
  },
  {
    nombreCurador: "Tania G.",
    imagenCurador: "https://placehold.co/30/000000/ffffff",
    portada: "https://placehold.co/250x200",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 22900,
  },
  {
    nombreCurador: "Daniela C.",
    imagenCurador: "https://placehold.co/30/000000/ffffff",
    portada: "https://placehold.co/250x200",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    precio: 25600,
  },
  {
    nombreCurador: "Alexis M.",
    imagenCurador: "https://placehold.co/30/000000/ffffff",
    portada: "https://placehold.co/250x200",
    titulo: "1984",
    autor: "George Orwell",
    precio: 14400,
  },
];

function Index() {
  return (
    <>
      <body>
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

        <Carrusel titulo="Recomendados por Nuestros Libreros" variante="recomendaciones">
          {librosDestacados.map((libro) => (
            <TarjetaLibro
              key={libro.titulo}
              {...libro}
              className="carrusel-recomendaciones-tarjeta"
            />
          ))}
        </Carrusel>

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

        <Carrusel titulo="Más Vendidos" variante="mas-vendidos">
          {librosDestacados.map((libro) => (
            <TarjetaLibro
              key={libro.titulo}
              {...libro}
              className="carrusel-mas-vendidos-tarjeta"
            />
          ))}
        </Carrusel>

        <Carrusel titulo="Nuevos Lanzamientos" variante="lanzamiento">
          {librosDestacados.map((libro) => (
            <TarjetaLibro
              key={libro.titulo}
              {...libro}
              className="carrusel-lanzamiento-tarjeta"
            />
          ))}
        </Carrusel>

        <Carrusel
          titulo="Más Comentados por la Comunidad"
          variante="comentados"
        >
          {librosDestacados.map((libro) => (
            <TarjetaLibro
              key={libro.titulo}
              {...libro}
              className="carrusel-comentados-tarjeta"
            />
          ))}
        </Carrusel>

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

      <Newsletter />

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

    </>
  );
}

export default Index;
