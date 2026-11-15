import "../estilos/index.css";
import "../estilos/base.css";
import { Carrusel } from "../componentes/Carrusel";
import { ComunidadLectora } from "../componentes/ComunidadLectora";
import { Footer } from "../componentes/Footer";
import { Newsletter } from "../componentes/Newsletter";
import { TarjetaProducto } from "../componentes/TarjetaProducto";
import { TarjetaRecomendacion } from "../componentes/TarjetaRecomendacion";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { Icono } from "../componentes/Icono";
import { MensajeError } from "../componentes/MensajeError";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { obtenerLibrosInicio } from "../servicios/catalogoServicio";
import { obtenerRecomendadosInicio } from "../servicios/libreroServicio";
import { propsDeTarjeta } from "../utils/libros";
import { IMAGENES_RELLENO } from "../datos/imagenes";

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

        {Boolean(recomendados.error) && (
          <MensajeError error={recomendados.error} onReintentar={recomendados.reintentar} />
        )}
        {recomendados.cargando && <EstadoCarga texto="Cargando recomendaciones..." />}
        {recomendados.datos && (
          <Carrusel
            titulo="Recomendados de nuestros libreros"
            variante="recomendaciones"
            className="inicio-recomendados carrusel-tarjetas-recomendacion"
            flechasEncabezado
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
