import type { TarjetaRecomendacionProps } from "../componentes/TarjetaRecomendacion";
import { IMAGENES_RELLENO } from "../datos/imagenes";
import {
  FOTOS_LIBREROS,
  LIBREROS,
  RECOMENDADOS_INICIO,
  buscarLibrero,
  rutaDeLibrero,
  type Coleccion,
  type Librero,
} from "../datos/libreros";
import { RESENAS_LIBREROS } from "../datos/resenas";
import { useSesionStore } from "../estado/sesionStore";
import type { BuscarResenasRequest, ResenaResponseDto, ResenasPaginadasDto } from "../tipos/comunidad";
import type {
  ColeccionResponseDto,
  CrearPreguntaLibreroDto,
  LibreroPerfilDto,
  LibreroResumenDto,
  PreguntaEnviadaDto,
  RecomendacionLibreroResponseDto,
} from "../tipos/librero";
import { ErrorApi, solicitar, usarApi } from "./api";

// Servicio de libreros. Con API: GET /libreros, GET /libreros/{slug},
// GET /libreros/yo, POST /libreros/{slug}/preguntas, GET /recomendaciones/destacadas,
// GET /libros/{id}/recomendaciones-libreros y
// GET /libros/{id}/resenas?tipo=LIBRERO. Sin API (VITE_API_URL vacía):
// datos dummy de datos/libreros.ts y datos/resenas.ts.

// Perfil que se muestra en /perfil-librero sin indicar uno (como en el wireframe)
const LIBRERO_POR_DEFECTO = "gregorio-samsa";

// Colecciones visibles antes de pulsar "Ver más", como en el diseño
const COLECCIONES_VISIBLES = 3;

const pausa = () => new Promise((resolver) => setTimeout(resolver, 150));

const rutaPerfil = (slug: string) => `/perfil-librero?librero=${encodeURIComponent(slug)}`;

// "2026-03-03" -> "Marzo 03, 2026", el formato del diseño
function formatearFecha(fecha: string) {
  const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);
  const nombreMes = new Date(anio, mes - 1, dia).toLocaleDateString("es-CL", { month: "long" });
  return `${nombreMes.charAt(0).toUpperCase()}${nombreMes.slice(1)} ${String(dia).padStart(2, "0")}, ${anio}`;
}

function desdeColeccion(coleccion: ColeccionResponseDto): Coleccion {
  return {
    titulo: coleccion.titulo,
    descripcion: coleccion.descripcion ?? "",
    fecha: formatearFecha(coleccion.fecha),
  };
}

// Convierte el perfil de la API al formato que usa la vista Perfil del librero.
// El id es el slug, el mismo que usa la ruta pública /perfil-librero?librero=
function desdePerfilApi(perfil: LibreroPerfilDto): Librero {
  const colecciones = perfil.colecciones.map(desdeColeccion);
  return {
    id: perfil.slug,
    nombre: perfil.nombre,
    nombreCorto: perfil.nombreCorto,
    etiquetas: perfil.etiquetas,
    cita: perfil.cita ?? "",
    biografia: perfil.biografia,
    // Si el indispensable está en el catálogo, trae su portada y su id
    indispensables: perfil.indispensables.map(({ titulo, autor, libro }) => ({
      titulo,
      autor,
      idLibro: libro?.id,
      portada: libro?.portadaUrl ?? undefined,
    })),
    estilos: perfil.estilos,
    autores: perfil.autoresFavoritos,
    colecciones: colecciones.slice(0, COLECCIONES_VISIBLES),
    coleccionesExtra: colecciones.slice(COLECCIONES_VISIBLES),
    ultimasRecomendaciones: perfil.ultimasRecomendaciones.map(({ libro }) => ({
      titulo: libro.titulo,
      autor: libro.autor,
      idLibro: libro.id,
      portada: libro.portadaUrl ?? undefined,
      calificacion: libro.calificacion,
      opiniones: libro.opiniones,
    })),
  };
}

// PERFILES

// Perfil público de un librero (/perfil-librero?librero=<slug>). Sin slug,
// el perfil por defecto.
export async function obtenerLibrero(slug: string | null): Promise<Librero> {
  const id = slug || LIBRERO_POR_DEFECTO;
  if (usarApi) {
    return desdePerfilApi(
      await solicitar<LibreroPerfilDto>(`/libreros/${encodeURIComponent(id)}`),
    );
  }
  await pausa();
  const librero = buscarLibrero(id);
  if (!librero) {
    throw new ErrorApi({
      statusCode: 404,
      error: "LIBRERO_NO_ENCONTRADO",
      message: `No existe un librero con id "${id}"`,
    });
  }
  return librero;
}

// Perfil del librero con sesión iniciada. La API responde 403 si el usuario
// no es LIBRERO y 404 si su cuenta aún no tiene perfil de librero.
export async function obtenerMiPerfilLibrero(): Promise<Librero> {
  if (!usarApi) return LIBREROS[0];
  return desdePerfilApi(await solicitar<LibreroPerfilDto>("/libreros/yo"));
}

// "¿NO SABES QUÉ LEER?"

// Envía la pregunta al librero con el nombre y el correo de la sesión, para
// que pueda responder. Devuelve el mensaje de confirmación de la API.
export async function enviarPreguntaLibrero(
  librero: Pick<Librero, "id" | "nombre">,
  pregunta: string,
): Promise<string> {
  const usuario = useSesionStore.getState().usuario;
  if (!usuario) {
    throw new ErrorApi({ statusCode: 401, error: "NO_AUTENTICADO", message: "Inicia sesión" });
  }
  if (!usarApi) {
    await pausa();
    return `${librero.nombre.split(" ")[0]} recibió tu pregunta y te responderá a ${usuario.email}`;
  }
  const cuerpo: CrearPreguntaLibreroDto = {
    nombre: `${usuario.nombre} ${usuario.apellido}`.trim(),
    email: usuario.email,
    pregunta: pregunta.trim(),
  };
  const respuesta = await solicitar<PreguntaEnviadaDto>(
    `/libreros/${encodeURIComponent(librero.id)}/preguntas`,
    { metodo: "POST", cuerpo },
  );
  return respuesta.mensaje;
}

// MENÚ "DESCUBRE CON NOSOTROS"

export type EnlaceLibrero = { nombre: string; ruta: string };

// Nombres del desplegable en el wireframe (sin API)
const LIBREROS_MENU = [
  "Gregorio Samsa",
  "Ana Karenina",
  "Aureliano Buendía",
  "Lisbeth Salander",
  "Tyler Durden",
  "Clara del Valle",
];

export const ENLACES_LIBREROS_INICIALES: EnlaceLibrero[] = LIBREROS_MENU.map((nombre) => ({
  nombre,
  ruta: rutaDeLibrero(nombre),
}));

export async function obtenerEnlacesLibreros(): Promise<EnlaceLibrero[]> {
  if (!usarApi) return ENLACES_LIBREROS_INICIALES;
  const libreros = await solicitar<LibreroResumenDto[]>("/libreros");
  return libreros.map((librero) => ({ nombre: librero.nombre, ruta: rutaPerfil(librero.slug) }));
}

// HOME: "RECOMENDADOS DE NUESTROS LIBREROS"

function aTarjeta(recomendacion: RecomendacionLibreroResponseDto): TarjetaRecomendacionProps {
  const { libro, librero } = recomendacion;
  return {
    idLibro: libro.id,
    nombreLibrero: librero?.nombreCorto ?? "",
    imagenLibrero: librero?.fotoUrl ?? IMAGENES_RELLENO.avatar,
    portada: libro.portadaUrl ?? IMAGENES_RELLENO.portadaHorizontal,
    titulo: libro.titulo,
    autor: libro.autor,
    calificacion: libro.calificacion,
    opiniones: libro.opiniones,
  };
}

export async function obtenerRecomendadosInicio(cantidad = 8): Promise<TarjetaRecomendacionProps[]> {
  if (usarApi) {
    const destacadas = await solicitar<RecomendacionLibreroResponseDto[]>(
      "/recomendaciones/destacadas",
      { parametros: { limite: cantidad } },
    );
    return destacadas.map(aTarjeta);
  }
  await pausa();
  return RECOMENDADOS_INICIO.map((libro) => ({
    ...libro,
    imagenLibrero: IMAGENES_RELLENO.avatar,
    portada: IMAGENES_RELLENO.portadaHorizontal,
  }));
}

// FICHA: "TE RECOMENDAMOS ESTE LIBRO PORQUE..."

// Las estrellas vienen de la reseña que el librero dejó del libro (tipo
// LIBRERO), cuando existe. La cantidad de reseñas del librero no la entrega
// la API: solo existe en los datos dummy.
export type RecomendacionFicha = {
  nombre: string;
  ruta: string;
  foto?: string;
  texto: string[];
  calificacion?: number;
  reseñas?: number;
};

// Primera palabra del nombre, para cruzar las dos fuentes: la reseña la firma
// la cuenta del librero ("Clara d.") y la recomendación, su perfil ("Clara
// del Valle"). La API no entrega un id común entre ambos.
const nombreDePila = (nombre: string) => nombre.trim().split(/\s+/)[0].toLowerCase();

function perfilDeResena(resena: ResenaResponseDto, libreros: LibreroResumenDto[]) {
  return libreros.find((librero) => nombreDePila(librero.nombre) === nombreDePila(resena.autor.nombre));
}

// Combina las recomendaciones (nota del librero) con las reseñas de libreros
// (calificación y comentario). Una reseña sin recomendación también se muestra.
function combinarConResenas(
  recomendaciones: RecomendacionLibreroResponseDto[],
  resenas: ResenaResponseDto[],
  libreros: LibreroResumenDto[],
): RecomendacionFicha[] {
  const usadas = new Set<string>();
  const desdeRecomendaciones = recomendaciones.flatMap(({ librero, nota }) => {
    if (!librero) return [];
    const resena = resenas.find(
      (actual) => !usadas.has(actual.id) && nombreDePila(actual.autor.nombre) === nombreDePila(librero.nombre),
    );
    if (resena) usadas.add(resena.id);
    // Si la reseña dice algo distinto de la nota, se muestra como otro párrafo
    const texto = resena && resena.comentario !== nota ? [nota, resena.comentario] : [nota];
    return [
      {
        nombre: librero.nombre,
        ruta: rutaPerfil(librero.slug),
        foto: librero.fotoUrl ?? FOTOS_LIBREROS[librero.slug],
        texto,
        calificacion: resena?.calificacion,
      },
    ];
  });
  const soloResenas = resenas
    .filter((resena) => !usadas.has(resena.id))
    .map((resena) => {
      const perfil = perfilDeResena(resena, libreros);
      return {
        nombre: perfil?.nombre ?? resena.autor.nombre,
        ruta: perfil ? rutaPerfil(perfil.slug) : "/perfil-librero",
        foto: perfil ? (perfil.fotoUrl ?? FOTOS_LIBREROS[perfil.slug]) : undefined,
        texto: [resena.comentario],
        calificacion: resena.calificacion,
      };
    });
  return [...desdeRecomendaciones, ...soloResenas];
}

export async function obtenerRecomendacionesDeLibro(idLibro: string): Promise<RecomendacionFicha[]> {
  if (usarApi) {
    const ruta = `/libros/${encodeURIComponent(idLibro)}`;
    const parametros: BuscarResenasRequest = { tipo: "LIBRERO", limit: 50 };
    const [recomendaciones, resenas] = await Promise.all([
      solicitar<RecomendacionLibreroResponseDto[]>(`${ruta}/recomendaciones-libreros`),
      solicitar<ResenasPaginadasDto>(`${ruta}/resenas`, { parametros }),
    ]);
    // Los perfiles solo hacen falta para las reseñas sin recomendación
    const libreros = resenas.items.length
      ? await solicitar<LibreroResumenDto[]>("/libreros")
      : [];
    return combinarConResenas(recomendaciones, resenas.items, libreros);
  }
  await pausa();
  return RESENAS_LIBREROS.map((resena) => {
    const librero = LIBREROS.find((actual) => actual.nombre === resena.nombre);
    return {
      ...resena,
      ruta: rutaDeLibrero(resena.nombre),
      foto: librero && FOTOS_LIBREROS[librero.id],
    };
  });
}
