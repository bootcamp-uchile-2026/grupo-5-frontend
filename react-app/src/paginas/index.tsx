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

      </main>

      <Newsletter />
      <Footer />
    </>
  );
}

export default Index;
