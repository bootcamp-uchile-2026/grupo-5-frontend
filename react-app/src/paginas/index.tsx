import "../estilos/index.css";
import "../estilos/base.css";
import { Carrusel } from "../componentes/Carrusel";
import { Footer } from "../componentes/Footer";
import { Link } from "react-router-dom";
import { Newsletter } from "../componentes/Newsletter";
import { TarjetaProducto } from "../componentes/TarjetaProducto";
import {
  TarjetaRecomendacion,
  type TarjetaRecomendacionProps,
} from "../componentes/TarjetaRecomendacion";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { Icono } from "../componentes/Icono";
import { MensajeError } from "../componentes/MensajeError";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { obtenerLibrosInicio } from "../servicios/catalogoServicio";
import { propsDeTarjeta } from "../utils/libros";
import { IMAGENES_RELLENO } from "../datos/imagenes";

// Datos dummy de "Recomendados de nuestros libreros" (sin Backend aún)

const librosRecomendados: TarjetaRecomendacionProps[] = [
  {
    nombreLibrero: "Gregorio S.",
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    calificacion: 5,
    opiniones: 12,
  },
  {
    nombreLibrero: "Tyler D.",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    calificacion: 4.5,
    opiniones: 28,
  },
  {
    nombreLibrero: "Clara V.",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    calificacion: 4,
    opiniones: 9,
  },
  {
    nombreLibrero: "Ana K.",
    titulo: "1984",
    autor: "George Orwell",
    calificacion: 4.5,
    opiniones: 31,
  },
  {
    nombreLibrero: "Lisbeth S.",
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    calificacion: 4,
    opiniones: 15,
  },
  {
    nombreLibrero: "Aureliano B.",
    titulo: "Pedro Páramo",
    autor: "Juan Rulfo",
    calificacion: 5,
    opiniones: 22,
  },
  {
    nombreLibrero: "Gregorio S.",
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    calificacion: 4.5,
    opiniones: 18,
  },
  {
    nombreLibrero: "Clara V.",
    titulo: "La casa de los espíritus",
    autor: "Isabel Allende",
    calificacion: 4,
    opiniones: 11,
  },
].map((libro) => ({
  ...libro,
  imagenLibrero: IMAGENES_RELLENO.avatar,
  portada: IMAGENES_RELLENO.portadaHorizontal,
}));

function Index() {
  useTituloPagina("Inicio");
  const inicio = usePeticion(obtenerLibrosInicio, "inicio");

  // Carruseles de productos (libros del catálogo; ver obtenerLibrosInicio)
  const carruselesProductos = [
    {
      titulo: "Más vendidos",
      variante: "mas-vendidos",
      libros: inicio.datos?.masVendidos ?? [],
    },
    {
      titulo: "Nuevos lanzamientos",
      variante: "lanzamiento",
      libros: inicio.datos?.nuevosLanzamientos ?? [],
    },
    {
      titulo: "Más comentados por la comunidad",
      variante: "comentados",
      libros: inicio.datos?.masComentados ?? [],
    },
  ] as const;

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
                <button className="boton boton-secundario">Botón 2</button>
              </div>

              {/* HERO CARACTERÍSTICAS */}
              <div className="hero-caracteristicas">
                <div className="hero-caracteristicas-contenedor">
                  <Icono nombre="estadoVacio" className="hero-caracteristica-icono" />
                  <h3>Libros</h3>
                  <p>Encuentra tu próximo favorito</p>
                </div>

                <div className="hero-caracteristicas-contenedor">
                  <Icono nombre="estadoVacio" className="hero-caracteristica-icono" />
                  <h3>Curadores expertos</h3>
                  <p>Encuentra tu próximo favorito</p>
                </div>

                <div className="hero-caracteristicas-contenedor">
                  <Icono nombre="estadoVacio" className="hero-caracteristica-icono" />
                  <h3>Comunidad</h3>
                  <p>Encuentra tu próximo favorito</p>
                </div>
              </div>
            </div>

            {/* HERO IMAGEN */}
            <div className="hero-imagen">
              <img src={IMAGENES_RELLENO.hero} alt="" />
            </div>
          </div>
        </section>

        <Carrusel
          titulo="Recomendados de nuestros libreros"
          variante="recomendaciones"
          className="inicio-recomendados carrusel-tarjetas-recomendacion"
          flechasEncabezado
        >
          {librosRecomendados.map((libro) => (
            <TarjetaRecomendacion key={libro.titulo} {...libro} />
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
                <Link className="boton" to="/comunidad">
                  Ir a la comunidad
                </Link>
              </div>
            </div>

            {/* COMUNIDAD LECTORA IMAGEN */}
            <div className="comunidad-lectora-imagen">
              <img src={IMAGENES_RELLENO.comunidad} alt="" />
            </div>
          </div>
        </section>

        {Boolean(inicio.error) && (
          <MensajeError error={inicio.error} onReintentar={inicio.reintentar} />
        )}
        {inicio.cargando && <EstadoCarga texto="Cargando libros..." />}
        {inicio.datos &&
          carruselesProductos.map(({ titulo, variante, libros }) => (
            <Carrusel
              key={variante}
              titulo={titulo}
              variante={variante}
              className="inicio-productos"
              mostrarVerMas={false}
            >
              {libros.map((libro) => (
                <TarjetaProducto key={libro.id} {...propsDeTarjeta(libro)} />
              ))}
            </Carrusel>
          ))}
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}

export default Index;
