import "../estilos/index.css";
import "../estilos/base.css";
import { Carrusel } from "../componentes/Carrusel";
import { Footer } from "../componentes/Footer";
import { Newsletter } from "../componentes/Newsletter";
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
      <main>
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

      </main>

      <Newsletter />
      <Footer />
    </>
  );
}

export default Index;
