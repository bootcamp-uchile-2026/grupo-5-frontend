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
import { useComprarLibro } from "../componentes/useComprarLibro";
import { useLibros } from "../componentes/useLibros";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { grupoDeGenero } from "../datos/generos";
import { rutaDeLibrero } from "../datos/libreros";
import type { LibroDto } from "../tipos/libro";
import { propsDeTarjeta } from "../utils/libros";
import "../estilos/ficha-libro.css";
import { formatearPrecio, porcentajeDescuento } from "../utils/formato";
import { IMAGENES_RELLENO } from "../datos/imagenes";

// Wireframe Ficha de libro (Figma: Wireframes Desktop, node 1547:6140).
// Muestra el libro indicado en ?libro=<id>; sin id, el libro del wireframe.

const LIBRO_POR_DEFECTO = "el-perfume";
const CANTIDAD_MAXIMA = 10;

type ReseñaLibrero = {
  nombre: string;
  calificacion: number;
  reseñas: number;
  texto: string[];
};

type ReseñaLector = {
  nombre: string;
  ubicacion: string;
  calificacion: number;
  fecha: string;
  texto: string;
};

// Reseñas dummy del wireframe (escritas para "El perfume")
const RESEÑAS_LIBREROS: ReseñaLibrero[] = [
  {
    nombre: "Gregorio Samsa",
    calificacion: 5,
    reseñas: 56,
    texto: [
      "Hay libros que uno termina y puede guardar en el estante. El perfume no. Este se queda dando vueltas en la cabeza... y, de alguna manera, también en la nariz.",
      "Grenouille es un personaje difícil de querer, pero imposible de ignorar. Vive obsesionado con capturar aquello que los demás ni siquiera saben que están desprendiendo: su olor. Y mientras más intenta encontrar la esencia perfecta, más evidente se vuelve que quizás él mismo carece de una.",
      "Una historia oscura, perturbadora y extrañamente hermosa sobre la obsesión, la identidad y el deseo de ser alguien. Si alguna vez te has sentido invisible, quizás entiendas demasiado bien a Grenouille.",
    ],
  },
  {
    nombre: "Ana Karenina",
    calificacion: 4,
    reseñas: 83,
    texto: [
      "Me ha inquietado pensar cuánto puede desear una persona aquello que no puede nombrar. Grenouille no busca amor, aunque quizás toda su vida no haya hecho otra cosa que buscarlo. Quiere poseer la esencia de los demás porque nunca ha logrado encontrar la suya.",
      "Hay algo terrible en esa obsesión, pero también algo profundamente triste. Porque ¿qué somos cuando nadie puede percibirnos? ¿Y cuánto estaríamos dispuestos a hacer para sentir, aunque fuera una sola vez, que alguien nos desea? No es una historia de amor. Es, quizás, algo más incómodo: una historia sobre la necesidad desesperada de ser amado.",
    ],
  },
  {
    nombre: "Clara del Valle",
    calificacion: 5,
    reseñas: 41,
    texto: [
      "Una novela que se lee con todos los sentidos. Süskind consigue que el olfato, el sentido más olvidado, sea el protagonista de una historia inolvidable.",
    ],
  },
];

const RESEÑAS_LECTORES: ReseñaLector[] = [
  {
    nombre: "Daniela S.",
    ubicacion: "Copiapó, Chile",
    calificacion: 5,
    fecha: "Hace 5 días",
    texto: "Excelente libro, la película le hace honor a la historia original, recomendable.",
  },
  {
    nombre: "Luciano A.",
    ubicacion: "La Serena, Chile",
    calificacion: 3,
    fecha: "Hace 5 días",
    texto:
      "La primera mitad me atrapó muchísimo. Después sentí que la historia se volvió demasiado obsesionada con su propia filosofía.",
  },
  {
    nombre: "Cristian G.",
    ubicacion: "Santiago, Chile",
    calificacion: 4,
    fecha: "Hace 5 días",
    texto:
      "Lo terminé y tuve ganas de hacer algo impulsivo. Cinco minutos después se me pasó. Quizás ese era el punto.",
  },
  {
    nombre: "Andrés F.",
    ubicacion: "Santiago, Chile",
    calificacion: 5,
    fecha: "Hace 5 días",
    texto:
      "Me gustó el libro, pero debo admitir que visualmente la película me marcó más. Fincher hizo algo difícil de sacar de la cabeza.",
  },
  {
    nombre: "Valentina R.",
    ubicacion: "Valparaíso, Chile",
    calificacion: 5,
    fecha: "Hace 1 semana",
    texto: "Lo leí de una sentada. La forma en que describe los olores es increíble.",
  },
  {
    nombre: "Martín P.",
    ubicacion: "Concepción, Chile",
    calificacion: 4,
    fecha: "Hace 2 semanas",
    texto: "Perturbador y fascinante. No es para todos, pero vale mucho la pena.",
  },
];

function FichaLibro() {
  const [searchParams] = useSearchParams();
  const { libros, cargando } = useLibros();
  const id = searchParams.get("libro");
  const libro =
    libros.find((actual) => actual.id === id) ??
    libros.find((actual) => actual.id === LIBRO_POR_DEFECTO) ??
    libros[0];

  if (cargando || !libro) {
    return (
      <main className="ficha">
        <p className="ficha-cargando" role="status">
          Cargando libro...
        </p>
      </main>
    );
  }

  // Cada libro parte con la galería, la cantidad y las reseñas reiniciadas
  return <FichaContenido key={libro.id} libro={libro} libros={libros} />;
}

function FichaContenido({
  libro,
  libros,
}: {
  libro: LibroDto;
  libros: LibroDto[];
}) {
  const comprarLibro = useComprarLibro();

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
  const grupo = grupoDeGenero(libro.categoria);
  const ruta: ElementoRuta[] = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Catálogo", ruta: "/catalogo" },
    ...(grupo ? [{ texto: grupo }] : []),
    { texto: libro.categoria },
  ];
  const etiquetas = libro.etiquetas ?? [libro.categoria, libro.subgenero].filter(Boolean);
  const especificaciones = [
    ["Editorial", libro.editorial],
    ["ISBN", libro.isbn],
    ["Encuadernación", libro.encuadernacion],
    ["N° Páginas", libro.paginas?.toString()],
    ["Dimensiones", libro.dimensiones],
  ].filter((fila): fila is [string, string] => Boolean(fila[1]));
  const relacionados = libros.filter((otro) => otro.id !== libro.id).slice(0, 4);
  const libreros = verTodosLibreros ? RESEÑAS_LIBREROS : RESEÑAS_LIBREROS.slice(0, 2);
  const lectores = verTodosLectores ? RESEÑAS_LECTORES : RESEÑAS_LECTORES.slice(0, 4);

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
                <img
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

              <p className="ficha-stock">Disponible en stock</p>

              <div className="ficha-cantidad">
                <label htmlFor="ficha-cantidad">Cantidad</label>
                <div className="ficha-cantidad-control">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    disabled={cantidad <= 1}
                    onClick={() => setCantidad((actual) => actual - 1)}
                  >
                    −
                  </button>
                  <input
                    id="ficha-cantidad"
                    type="number"
                    min={1}
                    max={CANTIDAD_MAXIMA}
                    value={cantidad}
                    onChange={(evento) => {
                      const valor = Number(evento.target.value);
                      if (Number.isInteger(valor) && valor >= 1 && valor <= CANTIDAD_MAXIMA) {
                        setCantidad(valor);
                      }
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    disabled={cantidad >= CANTIDAD_MAXIMA}
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
                    onClick={() => void agregar(false)}
                  >
                    Añadir a la cesta
                    <Icono nombre="bolsa" />
                  </button>
                  <BotonFavorito titulo={libro.titulo} className="ficha-favorito" />
                </div>
                <button
                  type="button"
                  className="ficha-comprar"
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
                  ({RESEÑAS_LIBREROS.length} reseñas)
                </span>
              </>
            }
          >
            <ul className="ficha-libreros">
              {libreros.map((reseña) => (
                <li key={reseña.nombre}>
                  <div className="ficha-librero-perfil">
                    <span className="ficha-avatar" aria-hidden="true">
                      <Icono nombre="usuario" />
                    </span>
                    <span>Reseñas: {reseña.reseñas}</span>
                    <Link to={rutaDeLibrero(reseña.nombre)}>Visitar Perfil</Link>
                  </div>
                  <div className="ficha-librero-texto">
                    <p className="ficha-librero-nombre">
                      <strong>{reseña.nombre}</strong>
                      <Estrellas calificacion={reseña.calificacion} />
                    </p>
                    {reseña.texto.map((parrafo) => (
                      <p key={parrafo}>{parrafo}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            {!verTodosLibreros && (
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
            <ul className="ficha-lectores">
              {lectores.map((reseña) => (
                <li key={reseña.nombre}>
                  <div className="ficha-lector-perfil">
                    <span className="ficha-avatar" aria-hidden="true">
                      <Icono nombre="usuario" />
                    </span>
                    <div>
                      <strong>{reseña.nombre}</strong>
                      <span>{reseña.ubicacion}</span>
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
              {!verTodosLectores && (
                <button
                  type="button"
                  className="ficha-ver-mas"
                  onClick={() => setVerTodosLectores(true)}
                >
                  Mostrar {RESEÑAS_LECTORES.length} reseñas
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
            <div className="ficha-relacionados-grilla">
              {relacionados.map((otro) => (
                <TarjetaProducto key={otro.id} {...propsDeTarjeta(otro)} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FichaLibro;
