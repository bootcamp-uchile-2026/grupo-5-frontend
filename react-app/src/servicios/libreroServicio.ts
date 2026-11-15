import type { TarjetaRecomendacionProps } from "../componentes/TarjetaRecomendacion";
import { IMAGENES_RELLENO } from "../datos/imagenes";
import {
  LIBREROS,
  RECOMENDADOS_INICIO,
  buscarLibrero,
  rutaDeLibrero,
  type Coleccion,
  type Librero,
} from "../datos/libreros";
import { RESENAS_LIBREROS } from "../datos/resenas";
import type {
  ColeccionResponseDto,
  LibreroPerfilDto,
  LibreroResumenDto,
  RecomendacionLibreroResponseDto,
} from "../tipos/librero";
import { ErrorApi, solicitar, usarApi } from "./api";

// Servicio de libreros. Con API: GET /libreros, GET /libreros/{slug},
// GET /libreros/yo, GET /recomendaciones/destacadas y
// GET /libros/{id}/recomendaciones-libreros. Sin API (VITE_API_URL vacía):
// datos dummy de datos/libreros.ts y datos/resenas.ts.

// Perfil que se muestra en /perfil-librero sin indicar uno (como en el wireframe)
const LIBRERO_POR_DEFECTO = "gregorio-samsa";

// Colecciones visibles antes de pulsar "Ver más", como en el wireframe
const COLECCIONES_VISIBLES = 2;

const pausa = () => new Promise((resolver) => setTimeout(resolver, 150));

const rutaPerfil = (slug: string) => `/perfil-librero?librero=${encodeURIComponent(slug)}`;

// "2026-08-24" -> "Agosto 24, 2026", el formato del wireframe
function formatearFecha(fecha: string) {
  const [anio, mes, dia] = fecha.slice(0, 10).split("-").map(Number);
  const nombreMes = new Date(anio, mes - 1, dia).toLocaleDateString("es-CL", { month: "long" });
  return `${nombreMes.charAt(0).toUpperCase()}${nombreMes.slice(1)} ${dia}, ${anio}`;
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
    indispensables: perfil.indispensables.map(({ titulo, autor }) => ({ titulo, autor })),
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

// La API entrega el librero y su nota, pero no una calificación ni su
// cantidad de reseñas: esos dos datos solo existen en los datos dummy
export type RecomendacionFicha = {
  nombre: string;
  ruta: string;
  texto: string[];
  calificacion?: number;
  reseñas?: number;
};

export async function obtenerRecomendacionesDeLibro(idLibro: string): Promise<RecomendacionFicha[]> {
  if (usarApi) {
    const recomendaciones = await solicitar<RecomendacionLibreroResponseDto[]>(
      `/libros/${encodeURIComponent(idLibro)}/recomendaciones-libreros`,
    );
    return recomendaciones.flatMap(({ librero, nota }) =>
      librero ? [{ nombre: librero.nombre, ruta: rutaPerfil(librero.slug), texto: [nota] }] : [],
    );
  }
  await pausa();
  return RESENAS_LIBREROS.map((resena) => ({ ...resena, ruta: rutaDeLibrero(resena.nombre) }));
}
