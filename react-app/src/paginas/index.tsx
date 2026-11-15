import "../estilos/index.css";
import "../estilos/base.css";
import { Carrusel } from "../componentes/Carrusel";
import { ComunidadLectora } from "../componentes/ComunidadLectora";
import { Footer } from "../componentes/Footer";
import { Newsletter } from "../componentes/Newsletter";
import { TarjetaProducto } from "../componentes/TarjetaProducto";
import { TarjetaRecomendacion } from "../componentes/TarjetaRecomendacion";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { MensajeError } from "../componentes/MensajeError";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { obtenerLibrosInicio } from "../servicios/catalogoServicio";
import { obtenerRecomendadosInicio } from "../servicios/libreroServicio";
import { propsDeTarjeta } from "../utils/libros";
import imagenHero from "../assets/imagenes/home-hero-libreros.png";
import iconoLibros from "../assets/iconos/07-libro-abierto.svg";
import iconoCuradores from "../assets/iconos/08-lapiz.svg";
import iconoComunidad from "../assets/iconos/09-mensaje-chat-cuadrado.svg";

// Características del hero (Figma: Home de alta fidelidad)
const CARACTERISTICAS = [
  { icono: iconoLibros, titulo: "Libros", texto: "Encuentra tu próximo favorito" },
  {
    icono: iconoCuradores,
    titulo: "Curadores expertos",
    texto: "Descubre libros recomendados por quienes más saben.",
  },
  { icono: iconoComunidad, titulo: "Comunidad", texto: "Comparte y conecta con otros lectores." },
];

function Index() {
  useTituloPagina("Inicio");
  const inicio = usePeticion(obtenerLibrosInicio, "inicio");
  // "Recomendados de nuestros libreros" (GET /recomendaciones/destacadas)
  const recomendados = usePeticion(() => obtenerRecomendadosInicio(), "recomendados");

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
        {/* HERO (Figma: Home de alta fidelidad, node 3173:28808) */}
        <section className="hero" aria-labelledby="hero-titulo">
          <div className="hero-contenedor">
            <div className="hero-contenido">
              <div className="hero-titulo">
                <h2 id="hero-titulo">
                  <span className="hero-titulo-destacado">Encuentra ese libro </span>
                  que aún no conoces
                </h2>
                <p className="hero-pie">
                  Descubre tu próxima lectura y conecta con una comunidad de
                  lectores como tú.
                </p>
              </div>

              <ul className="hero-caracteristicas">
                {CARACTERISTICAS.map(({ icono, titulo, texto }) => (
                  <li key={titulo} className="hero-caracteristica">
                    <span className="hero-caracteristica-icono">
                      <span>
                        <img src={icono} alt="" width="24" height="24" />
                      </span>
                    </span>
                    <h3>{titulo}</h3>
                    <p>{texto}</p>
                  </li>
                ))}
              </ul>
            </div>

            <img
              className="hero-imagen"
              src={imagenHero}
              alt="Libreros de Leeconnos con sus libros recomendados"
              width="714"
              height="608"
            />
          </div>
        </section>

        {Boolean(recomendados.error) && (
          <MensajeError error={recomendados.error} onReintentar={recomendados.reintentar} />
        )}
        {recomendados.cargando && <EstadoCarga texto="Cargando recomendaciones..." />}
        {recomendados.datos && (
          <Carrusel
            titulo="Recomendados de nuestros libreros"
            variante="recomendaciones"
            className="inicio-recomendados carrusel-tarjetas-recomendacion"
          >
            {recomendados.datos.map((libro) => (
              <TarjetaRecomendacion key={`${libro.nombreLibrero}-${libro.titulo}`} {...libro} />
            ))}
          </Carrusel>
        )}

        <ComunidadLectora />

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
