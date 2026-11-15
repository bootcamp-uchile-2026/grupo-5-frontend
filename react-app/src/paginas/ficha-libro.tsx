import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logoImagen from "../assets/logos/05-Imagen-2-colores.svg";
import { BotonFavorito } from "../componentes/BotonFavorito";
import { Desplegable } from "../componentes/Desplegable";
import { Estrellas } from "../componentes/Estrellas";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import { RutaNavegacion, type ElementoRuta } from "../componentes/RutaNavegacion";
import { TarjetaProducto } from "../componentes/TarjetaProducto";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { MensajeError } from "../componentes/MensajeError";
import { Portada } from "../componentes/Portada";
import { useComprarLibro } from "../componentes/useComprarLibro";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { grupoDeGenero } from "../datos/generos";
import { ErrorApi } from "../servicios/api";
import {
  obtenerLibro,
  obtenerLibroDestacado,
  obtenerRelacionados,
} from "../servicios/catalogoServicio";
import { obtenerRecomendacionesDeLibro } from "../servicios/libreroServicio";
import { obtenerResenasLectores } from "../servicios/resenaServicio";
import type { Libro } from "../tipos/libro";
import { NOMBRES_FORMATO, propsDeTarjeta } from "../utils/libros";
import "../estilos/ficha-libro.css";
import { formatearPrecio, porcentajeDescuento } from "../utils/formato";
import { IMAGENES_RELLENO } from "../datos/imagenes";

// Wireframe Ficha de libro (Figma: Wireframes Desktop, node 1547:6140).
// Muestra el libro indicado en ?libro=<id> (GET /libros/:id); sin id, el
// libro más reciente del catálogo. Relacionados, recomendaciones de libreros
// y reseñas de lectores vienen de la API; el video y la galería son dummy.

const CANTIDAD_MAXIMA = 10;

function FichaLibro() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("libro") ?? "";
  const peticion = usePeticion(
    () => (id ? obtenerLibro(id) : obtenerLibroDestacado()),
    id,
  );

  if (peticion.error) {
    // Libro inexistente o id inválido: no tiene sentido reintentar
    const noExiste =
      peticion.error instanceof ErrorApi && [400, 404].includes(peticion.error.statusCode);
    return (
      <main className="ficha">
        <FichaNoEncontrada />
        <MensajeError
          error={peticion.error}
          onReintentar={noExiste ? undefined : peticion.reintentar}
          enlace={{ texto: "Ir al catálogo", ruta: "/catalogo" }}
        />
      </main>
    );
  }

  if (peticion.cargando || !peticion.datos) {
    return (
      <main className="ficha">
        <EstadoCarga texto="Cargando libro..." className="ficha-cargando" />
      </main>
    );
  }

  // Cada libro parte con la galería, la cantidad y las reseñas reiniciadas
  return <FichaContenido key={peticion.datos.id} libro={peticion.datos} />;
}

// Solo fija el título de la pestaña cuando el libro no existe
function FichaNoEncontrada() {
  useTituloPagina("Libro no encontrado");
  return null;
}

function FichaContenido({ libro }: { libro: Libro }) {
  const comprarLibro = useComprarLibro();
  const relacionadosPeticion = usePeticion(() => obtenerRelacionados(libro), libro.id);
  const recomendacionesPeticion = usePeticion(
    () => obtenerRecomendacionesDeLibro(libro.id),
    libro.id,
  );
  const resenasPeticion = usePeticion(() => obtenerResenasLectores(libro.id), libro.id);

  useTituloPagina(libro.titulo);

  const imagenes = [
    libro.portada,
    IMAGENES_RELLENO.miniatura,
    IMAGENES_RELLENO.miniatura,
    IMAGENES_RELLENO.miniatura,
  ];
  const [imagenActual, setImagenActual] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  
  const [verTodosLibreros, setVerTodosLibreros] = useState(false);
  const [verTodosLectores, setVerTodosLectores] = useState(false);
  const [mostrarAyudaReseñas, setMostrarAyudaReseñas] = useState(false);
  const [avisoReseña, setAvisoReseña] = useState("");

  const descuento = porcentajeDescuento(libro.precio, libro.precioAnterior);
  const grupo = grupoDeGenero(libro.genero);
  const ruta: ElementoRuta[] = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Catálogo", ruta: "/catalogo" },
    ...(grupo ? [{ texto: grupo }] : []),
    { texto: libro.genero },
  ];
  const etiquetas = libro.etiquetas ?? [libro.genero, libro.subgenero].filter(Boolean);
  const cantidadMaxima = Math.min(CANTIDAD_MAXIMA, libro.stock ?? CANTIDAD_MAXIMA);
  const disponibilidad = !libro.enStock
    ? "Sin stock"
    : libro.estado === "PREVENTA"
      ? "Disponible en preventa"
      : "Disponible en stock";
  // Filas del wireframe y, al final, Año y Formato (datos de la API que el
  // wireframe no tiene)
  const especificaciones = [
    ["Editorial", libro.editorial],
    ["ISBN", libro.isbn],
    ["Encuadernación", libro.encuadernacion],
    ["N° Páginas", libro.paginas?.toString()],
    ["Dimensiones", libro.dimensiones],
    ["Año", libro.anioPublicacion?.toString()],
    ["Formato", libro.formato && NOMBRES_FORMATO[libro.formato]],
  ].filter((fila): fila is [string, string] => Boolean(fila[1]));
  const relacionados = relacionadosPeticion.datos ?? [];
  const recomendaciones = recomendacionesPeticion.datos ?? [];
  const libreros = verTodosLibreros ? recomendaciones : recomendaciones.slice(0, 2);
  const resenas = resenasPeticion.datos?.resenas ?? [];
  const totalResenas = resenasPeticion.datos?.total ?? 0;
  const lectores = verTodosLectores ? resenas : resenas.slice(0, 4);

  function moverImagen(paso: number) {
    setImagenActual((actual) => (actual + paso + imagenes.length) % imagenes.length);
  }

  const agregar = (irAlCheckout: boolean) =>
    comprarLibro(
      {
        idLibro: libro.id,
        titulo: libro.titulo,
        autor: libro.autor,
        precioUnitario: libro.precio,
        cantidad,
        portada: libro.portada,
      },
      irAlCheckout,
    );

  return (
    <>
      <main>
        <div className="ficha">
          <RutaNavegacion className="ficha-ruta" elementos={ruta} />

          {/* PRODUCTO */}
          <section className="ficha-producto">
            <div className="ficha-galeria">
              <div className="ficha-galeria-principal">
                <button
                  type="button"
                  className="ficha-galeria-flecha"
                  aria-label="Imagen anterior"
                  onClick={() => moverImagen(-1)}
                >
                  <Icono nombre="anterior" />
                </button>
                <Portada
                  src={imagenes[imagenActual]}
                  alt={`${libro.titulo}, imagen ${imagenActual + 1} de ${imagenes.length}`}
                />
                <button
                  type="button"
                  className="ficha-galeria-flecha"
                  aria-label="Imagen siguiente"
                  onClick={() => moverImagen(1)}
                >
                  <Icono nombre="siguiente" />
                </button>
              </div>

              <div className="ficha-miniaturas">
                {imagenes.slice(1).map((imagen, indice) => (
                  <button
                    key={indice}
                    type="button"
                    aria-label={`Ver imagen ${indice + 2}`}
                    aria-pressed={imagenActual === indice + 1}
                    onClick={() => setImagenActual(indice + 1)}
                  >
                    <img src={imagen} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="ficha-datos">
              <h1>{libro.titulo}</h1>
              <p className="ficha-autor">{libro.autor}</p>

              <div className="ficha-precios">
                <span className="ficha-precio">{formatearPrecio(libro.precio, true)}</span>
                {descuento > 0 && libro.precioAnterior && (
                  <>
                    <s>{formatearPrecio(libro.precioAnterior, true)}</s>
                    <span className="ficha-descuento">-{descuento}% dcto</span>
                  </>
                )}
              </div>

              <p className={`ficha-stock${libro.enStock ? "" : " ficha-sin-stock"}`}>
                {disponibilidad}
              </p>

              <div className="ficha-cantidad">
                <label htmlFor="ficha-cantidad">Cantidad</label>
                <div className="ficha-cantidad-control">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    disabled={!libro.enStock || cantidad <= 1}
                    onClick={() => setCantidad((actual) => actual - 1)}
                  >
                    −
                  </button>
                  <input
                    id="ficha-cantidad"
                    type="number"
                    min={1}
                    max={cantidadMaxima}
                    value={cantidad}
                    disabled={!libro.enStock}
                    onChange={(evento) => {
                      const valor = Number(evento.target.value);
                      if (Number.isInteger(valor) && valor >= 1 && valor <= cantidadMaxima) {
                        setCantidad(valor);
                      }
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    disabled={!libro.enStock || cantidad >= cantidadMaxima}
                    onClick={() => setCantidad((actual) => actual + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="ficha-botones">
                <div className="ficha-botones-fila">
                  <button
                    type="button"
                    className="ficha-agregar"
                    disabled={!libro.enStock}
                    onClick={() => void agregar(false)}
                  >
                    Añadir a la cesta
                    <Icono nombre="bolsa" />
                  </button>
                  <BotonFavorito idLibro={libro.id} titulo={libro.titulo} className="ficha-favorito" />
                </div>
                <button
                  type="button"
                  className="ficha-comprar"
                  disabled={!libro.enStock}
                  onClick={() => void agregar(true)}
                >
                  Comprar ahora
                </button>
              </div>

              <div className="ficha-envio">
                <Link to="/checkout">Calcular envío</Link>
                <Link to="/checkout">Retiro en tienda</Link>
              </div>

              <dl className="ficha-especificaciones">
                {especificaciones.map(([nombre, valor]) => (
                  <div key={nombre}>
                    <dt>{nombre}:</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
              </dl>

              {etiquetas.length > 0 && (
                <div className="ficha-etiquetas">
                  <p>Etiquetas:</p>
                  <ul>
                    {etiquetas.map((etiqueta) => (
                      <li key={etiqueta}>{etiqueta}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <Desplegable className="ficha-seccion" abiertoInicial titulo="Descripción">
            <p className="ficha-descripcion">
              {libro.descripcion ?? "Pronto agregaremos la descripción de este libro."}
            </p>
          </Desplegable>

          <Desplegable
            className="ficha-seccion"
            abiertoInicial
            titulo={
              <>
                Te recomendamos este libro porque...{" "}
                <span className="ficha-seccion-detalle">
                  ({recomendaciones.length} {recomendaciones.length === 1 ? "reseña" : "reseñas"})
                </span>
              </>
            }
          >
            {recomendacionesPeticion.error ? (
              <MensajeError
                error={recomendacionesPeticion.error}
                onReintentar={recomendacionesPeticion.reintentar}
              />
            ) : recomendacionesPeticion.cargando ? (
              <EstadoCarga />
            ) : !recomendaciones.length ? (
              <p className="ficha-sin-resenas">
                Aún ningún librero ha recomendado este libro.
              </p>
            ) : (
              <ul className="ficha-libreros">
                {libreros.map((reseña) => (
                  <li key={reseña.ruta}>
                    <div className="ficha-librero-perfil">
                      <span className="ficha-avatar" aria-hidden="true">
                        <Icono nombre="usuario" />
                      </span>
                      {/* La API no entrega la cantidad de reseñas del librero */}
                      {reseña.reseñas !== undefined && <span>Reseñas: {reseña.reseñas}</span>}
                      <Link to={reseña.ruta}>Visitar Perfil</Link>
                    </div>
                    <div className="ficha-librero-texto">
                      <p className="ficha-librero-nombre">
                        <strong>{reseña.nombre}</strong>
                        {/* La API no entrega una calificación por recomendación */}
                        {reseña.calificacion !== undefined && (
                          <Estrellas calificacion={reseña.calificacion} />
                        )}
                      </p>
                      {reseña.texto.map((parrafo) => (
                        <p key={parrafo}>{parrafo}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {!verTodosLibreros && recomendaciones.length > 2 && (
              <button
                type="button"
                className="ficha-ver-mas"
                onClick={() => setVerTodosLibreros(true)}
              >
                Ver más
                <Icono nombre="abajo" />
              </button>
            )}
          </Desplegable>

          {/* MÍRALO DE CERCA */}
          <section className="ficha-video">
            <div className="ficha-video-reproductor" role="img" aria-label="Video del libro (próximamente)">
              <Icono nombre="reproducir" />
            </div>
            <div className="ficha-video-texto">
              <h2>Míralo de cerca</h2>
              <p className="ficha-video-etiqueta">Recomendado Leeconnos</p>
              <p>
                Conoce el libro por dentro y por fuera y descubre por qué vale la
                pena tenerlo entre tus lecturas.
              </p>
            </div>
          </section>
        </div>

        {/* CALIFICACIÓN */}
        <section className="ficha-calificacion" aria-labelledby="ficha-calificacion-titulo">
          <img src={logoImagen} alt="" />
          <Estrellas calificacion={libro.calificacion} className="ficha-calificacion-estrellas" />
          <p className="ficha-calificacion-nota">
            {libro.calificacion.toLocaleString("es-CL", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </p>
          <h2 id="ficha-calificacion-titulo">Favorito entre los lectores</h2>
          <p>
            Este libro está en el 5% de los mejores
            <br />
            valorados según las reseñas de confiabilidad
          </p>
          <button
            type="button"
            aria-expanded={mostrarAyudaReseñas}
            onClick={() => setMostrarAyudaReseñas((actual) => !actual)}
          >
            ¿Cómo funcionan las reseñas?
          </button>
          {mostrarAyudaReseñas && (
            <p className="ficha-calificacion-ayuda">
              La nota combina las calificaciones de lectores y libreros, dando más
              peso a las reseñas verificadas.
            </p>
          )}
        </section>

        <div className="ficha ficha-final">
          <Desplegable className="ficha-seccion" abiertoInicial titulo="Reseñas de otros lectores">
            {resenasPeticion.error ? (
              <MensajeError error={resenasPeticion.error} onReintentar={resenasPeticion.reintentar} />
            ) : resenasPeticion.cargando ? (
              <EstadoCarga />
            ) : !resenas.length ? (
              <p className="ficha-sin-resenas">
                Aún no hay reseñas de lectores para este libro.
              </p>
            ) : (
              <ul className="ficha-lectores">
                {lectores.map((reseña) => (
                  <li key={reseña.id}>
                    <div className="ficha-lector-perfil">
                      <span className="ficha-avatar" aria-hidden="true">
                        <Icono nombre="usuario" />
                      </span>
                      <div>
                        <strong>{reseña.nombre}</strong>
                        {/* La API no guarda la ubicación del lector */}
                        {reseña.ubicacion && <span>{reseña.ubicacion}</span>}
                      </div>
                    </div>
                    <p className="ficha-lector-meta">
                      <Estrellas calificacion={reseña.calificacion} />
                      <span>{reseña.fecha}</span>
                    </p>
                    <p>{reseña.texto}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="ficha-lectores-acciones">
              <button
                type="button"
                className="ficha-dejar-reseña"
                onClick={() =>
                  setAvisoReseña("Pronto podrás dejar tu reseña: el servicio aún no está conectado.")
                }
              >
                Dejar una reseña
              </button>
              {!verTodosLectores && resenas.length > 4 && (
                <button
                  type="button"
                  className="ficha-ver-mas"
                  onClick={() => setVerTodosLectores(true)}
                >
                  Mostrar {totalResenas} reseñas
                  <Icono nombre="abajo" />
                </button>
              )}
            </div>
            {avisoReseña && (
              <p className="ficha-aviso" role="status">
                {avisoReseña}
              </p>
            )}
          </Desplegable>

          <section className="ficha-relacionados" aria-labelledby="ficha-relacionados-titulo">
            <h2 id="ficha-relacionados-titulo">Te podría interesar</h2>
            {relacionadosPeticion.error ? (
              <MensajeError
                error={relacionadosPeticion.error}
                onReintentar={relacionadosPeticion.reintentar}
              />
            ) : relacionadosPeticion.cargando ? (
              <EstadoCarga />
            ) : (
              <div className="ficha-relacionados-grilla">
                {relacionados.map((otro) => (
                  <TarjetaProducto key={otro.id} {...propsDeTarjeta(otro)} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FichaLibro;
