import {
  COMPLEMENTO_POR_DEFECTO,
  COMPLEMENTOS_LIBROS,
} from "../datos/complementosLibros";
import { generoEnApi } from "../datos/generos";
import { IMAGENES_RELLENO } from "../datos/imagenes";
import { LIBROS } from "../datos/libros";
import type { PaginadoDto } from "../tipos/api";
import type {
  BuscarLibrosRequest,
  FormatoLibro,
  GeneroDto,
  Libro,
  LibroResponseDto,
  OrdenLibros,
} from "../tipos/libro";
import { ErrorApi, solicitar, usarApi } from "./api";

// Servicio del catálogo. Con API: GET /libros, GET /libros/generos y
// GET /libros/:id. Sin API (VITE_API_URL vacía): datos dummy de src/datos.

export const LIBROS_POR_PAGINA = 12;
// Máximo de libros por página que acepta GET /libros
const LIMITE_API = 50;

// Filtros del Catálogo. Todos los resuelve la API (GET /libros), salvo cuando
// se marcan varias editoriales o varios subgéneros: la API acepta solo uno de
// cada uno, así que en ese caso se filtra aquí sobre los libros recibidos.
export type FiltrosCatalogo = {
  q?: string;
  genero?: string;
  autores?: string[];
  formato?: FormatoLibro;
  soloEnStock?: boolean;
  precioMin?: number;
  precioMax?: number;
  orden?: OrdenLibros;
  subgeneros?: string[];
  editoriales?: string[];
  soloOfertas?: boolean;
};

export type PaginaLibros = {
  libros: Libro[];
  total: number;
  pagina: number;
  totalPaginas: number;
};

export type OpcionesFiltro = {
  subgeneros: string[];
  autores: string[];
  editoriales: string[];
  precios: number[];
};

const pausa = () => new Promise((resolver) => setTimeout(resolver, 150));

// LibroResponseDto (API) + complemento dummy → Libro (pantallas)
function desdeApi(dto: LibroResponseDto): Libro {
  return {
    ...(COMPLEMENTOS_LIBROS[dto.isbn] ?? COMPLEMENTO_POR_DEFECTO),
    id: dto.id,
    isbn: dto.isbn,
    titulo: dto.titulo,
    autor: dto.autor,
    editorial: dto.editorial ?? "",
    genero: dto.genero,
    subgenero: dto.subgenero ?? undefined,
    descripcion: dto.descripcion ?? undefined,
    anioPublicacion: dto.anioPublicacion ?? undefined,
    formato: dto.formato,
    estado: dto.estado,
    precio: dto.precio,
    stock: dto.stock,
    enStock: dto.enStock,
    portada: dto.portadaUrl ?? IMAGENES_RELLENO.portada,
  };
}

// Valor único de un filtro de casillas (la API recibe uno solo)
const unico = (valores: string[] = []) => (valores.length === 1 ? valores[0] : undefined);

// Filtros que se envían a GET /libros
function aRequest(filtros: FiltrosCatalogo): BuscarLibrosRequest {
  return {
    q: filtros.q,
    genero: filtros.genero ? generoEnApi(filtros.genero) : undefined,
    autores: filtros.autores?.length ? filtros.autores : undefined,
    editorial: unico(filtros.editoriales),
    subgenero: unico(filtros.subgeneros),
    enOferta: filtros.soloOfertas || undefined,
    formato: filtros.formato,
    enStock: filtros.soloEnStock || undefined,
    precioMin: filtros.precioMin,
    precioMax: filtros.precioMax,
    orden: filtros.orden,
  };
}

// Varias editoriales o varios subgéneros: la API no puede filtrarlos
const usaFiltroLocal = (filtros: FiltrosCatalogo) =>
  (filtros.editoriales?.length ?? 0) > 1 || (filtros.subgeneros?.length ?? 0) > 1;

// Editoriales y subgéneros marcados, sobre los libros ya recibidos
function aplicarFiltroLocal(libros: Libro[], filtros: FiltrosCatalogo) {
  const { subgeneros = [], editoriales = [] } = filtros;
  return libros.filter(
    (libro) =>
      (!subgeneros.length || subgeneros.includes(libro.subgenero ?? "")) &&
      (!editoriales.length || editoriales.includes(libro.editorial)),
  );
}

function paginar(libros: Libro[], pagina: number): PaginaLibros {
  const totalPaginas = Math.ceil(libros.length / LIBROS_POR_PAGINA);
  const inicio = (pagina - 1) * LIBROS_POR_PAGINA;
  return {
    libros: libros.slice(inicio, inicio + LIBROS_POR_PAGINA),
    total: libros.length,
    pagina,
    totalPaginas,
  };
}

// Todas las páginas de GET /libros para unos filtros
async function todosDeLaApi(request: BuscarLibrosRequest): Promise<Libro[]> {
  const pedirPagina = (page: number) =>
    solicitar<PaginadoDto<LibroResponseDto>>("/libros", {
      parametros: { ...request, page, limit: LIMITE_API },
    });
  const primera = await pedirPagina(1);
  const resto = await Promise.all(
    Array.from({ length: Math.max(0, primera.totalPages - 1) }, (_, indice) =>
      pedirPagina(indice + 2),
    ),
  );
  return [primera, ...resto].flatMap((pagina) => pagina.items).map(desdeApi);
}

const minusculas = (texto: string) => texto.toLocaleLowerCase("es-CL");
const contiene = (texto: string, parte: string) => minusculas(texto).includes(minusculas(parte));
const enOferta = (libro: Libro) => Boolean(libro.precioAnterior && libro.precioAnterior > libro.precio);
const descuento = (libro: Libro) =>
  enOferta(libro) ? 1 - libro.precio / (libro.precioAnterior ?? libro.precio) : 0;

// Orden de los resultados dummy (los de la API ya vienen ordenados)
const COMPARAR: Partial<Record<OrdenLibros, (a: Libro, b: Libro) => number>> = {
  precio_asc: (a, b) => a.precio - b.precio,
  precio_desc: (a, b) => b.precio - a.precio,
  titulo: (a, b) => a.titulo.localeCompare(b.titulo, "es"),
  mas_vendidos: (a, b) => b.ventas - a.ventas,
  mejor_calificados: (a, b) => b.calificacion - a.calificacion,
  mas_comentados: (a, b) => b.opiniones - a.opiniones,
  mayor_descuento: (a, b) => descuento(b) - descuento(a),
};

// Versión dummy de GET /libros (mismas reglas que la API)
function filtrarDummy(request: BuscarLibrosRequest): Libro[] {
  const { autores = [] } = request;
  const resultado = LIBROS.filter(
    (libro) =>
      (!request.q || contiene(`${libro.titulo} ${libro.autor} ${libro.isbn ?? ""}`, request.q)) &&
      (!request.genero || minusculas(generoEnApi(libro.genero)) === minusculas(request.genero)) &&
      (!autores.length || autores.some((autor) => contiene(libro.autor, autor))) &&
      (!request.editorial || contiene(libro.editorial, request.editorial)) &&
      (!request.subgenero || minusculas(libro.subgenero ?? "") === minusculas(request.subgenero)) &&
      (!request.enOferta || enOferta(libro)) &&
      (!request.formato || (libro.formato ?? "FISICO") === request.formato) &&
      (!request.enStock || libro.enStock) &&
      (request.precioMin === undefined || libro.precio >= request.precioMin) &&
      (request.precioMax === undefined || libro.precio <= request.precioMax),
  );
  const comparar = request.orden && COMPARAR[request.orden];
  return comparar ? resultado.sort(comparar) : resultado;
}

async function todosLosLibros(request: BuscarLibrosRequest): Promise<Libro[]> {
  if (usarApi) return todosDeLaApi(request);
  await pausa();
  return filtrarDummy(request);
}

// Página de resultados del Catálogo
export async function buscarLibros(
  filtros: FiltrosCatalogo,
  pagina = 1,
): Promise<PaginaLibros> {
  // Caso habitual: la API filtra y pagina en una sola petición
  if (usarApi && !usaFiltroLocal(filtros)) {
    const respuesta = await solicitar<PaginadoDto<LibroResponseDto>>("/libros", {
      parametros: { ...aRequest(filtros), page: pagina, limit: LIBROS_POR_PAGINA },
    });
    return {
      libros: respuesta.items.map(desdeApi),
      total: respuesta.total,
      pagina: respuesta.page,
      totalPaginas: respuesta.totalPages,
    };
  }
  // Varias editoriales o subgéneros (o sin API): se piden todos los libros
  // que cumplen el resto de los filtros y se termina de filtrar aquí
  const libros = await todosLosLibros(aRequest(filtros));
  return paginar(aplicarFiltroLocal(libros, filtros), pagina);
}

// Subgéneros, autores, editoriales y precios de una búsqueda y un género.
// No usa GET /libros/filtros porque entrega las opciones de todo el
// catálogo, sin considerar la búsqueda ni el género elegidos.
export async function obtenerOpcionesFiltro(
  ambito: Pick<FiltrosCatalogo, "q" | "genero">,
): Promise<OpcionesFiltro> {
  const libros = await todosLosLibros(aRequest(ambito));
  const unicos = (valores: string[]) =>
    Array.from(new Set(valores.filter(Boolean))).sort((a, b) => a.localeCompare(b, "es"));
  return {
    subgeneros: unicos(libros.map((libro) => libro.subgenero ?? "")),
    autores: unicos(libros.map((libro) => libro.autor)),
    editoriales: unicos(libros.map((libro) => libro.editorial)),
    precios: libros.map((libro) => libro.precio),
  };
}

// Géneros con su cantidad de libros (filtro "Género")
export async function obtenerGeneros(): Promise<GeneroDto[]> {
  if (usarApi) return solicitar<GeneroDto[]>("/libros/generos");
  await pausa();
  const cantidades = new Map<string, number>();
  LIBROS.forEach((libro) =>
    cantidades.set(libro.genero, (cantidades.get(libro.genero) ?? 0) + 1),
  );
  return Array.from(cantidades, ([genero, cantidad]) => ({ genero, cantidad })).sort(
    (a, b) => a.genero.localeCompare(b.genero, "es"),
  );
}

// Ficha de libro
export async function obtenerLibro(id: string): Promise<Libro> {
  if (usarApi) {
    return desdeApi(
      await solicitar<LibroResponseDto>(`/libros/${encodeURIComponent(id)}`),
    );
  }
  await pausa();
  const libro = LIBROS.find((actual) => actual.id === id);
  if (!libro) {
    throw new ErrorApi({
      statusCode: 404,
      error: "LIBRO_NO_ENCONTRADO",
      message: `No existe un libro con id "${id}"`,
    });
  }
  return libro;
}

// Libro que muestra la ficha cuando no se indica uno: el más reciente
export async function obtenerLibroDestacado(): Promise<Libro> {
  const { libros } = await buscarLibros({ orden: "novedades" });
  if (!libros.length) {
    throw new ErrorApi({
      statusCode: 404,
      error: "LIBRO_NO_ENCONTRADO",
      message: "El catálogo está vacío",
    });
  }
  return libros[0];
}

// "Te podría interesar": libros del mismo género, completados con novedades
export async function obtenerRelacionados(libro: Libro, cantidad = 4): Promise<Libro[]> {
  const [mismoGenero, novedades] = await Promise.all([
    buscarLibros({ genero: libro.genero }),
    buscarLibros({ orden: "novedades" }),
  ]);
  const vistos = new Set([libro.id]);
  return [...mismoGenero.libros, ...novedades.libros]
    .filter((otro) => !vistos.has(otro.id) && Boolean(vistos.add(otro.id)))
    .slice(0, cantidad);
}

// Carruseles del Home. "Nuevos lanzamientos" usa el orden de la API;
// "Más vendidos" y "Más comentados" se ordenan con datos dummy (Backend no
// tiene ventas ni comentarios).
export async function obtenerLibrosInicio(cantidad = 8) {
  const libros = await todosLosLibros({ orden: "novedades" });
  const ordenarPor = (campo: "ventas" | "opiniones") =>
    [...libros].sort((a, b) => b[campo] - a[campo]).slice(0, cantidad);
  return {
    masVendidos: ordenarPor("ventas"),
    nuevosLanzamientos: libros.slice(0, cantidad),
    masComentados: ordenarPor("opiniones"),
  };
}
