import { generoEnApi, generos, tematicas, type Columna } from "../datos/generos";
import { IMAGENES_RELLENO } from "../datos/imagenes";
import { LIBROS } from "../datos/libros";
import type { PaginadoDto } from "../tipos/api";
import type { GrupoCategoriasDto } from "../tipos/comunidad";
import type { LibroResumenDto } from "../tipos/librero";
import type {
  BuscarLibrosRequest,
  FormatoLibro,
  GeneroDto,
  Libro,
  LibroResponseDto,
  OrdenLibros,
} from "../tipos/libro";
import { ErrorApi, solicitar, usarApi } from "./api";

// Servicio del catálogo. Con API: GET /libros, GET /libros/generos,
// GET /libros/:id, GET /libros/:id/relacionados y GET /libros/categorias.
// Sin API (VITE_API_URL vacía): datos dummy de src/datos.

export const LIBROS_POR_PAGINA = 12;
// Máximo de libros por página que acepta GET /libros
const LIMITE_API = 50;

// Filtros del Catálogo. Todos los resuelve la API (GET /libros), incluidas
// varias editoriales y varios subgéneros a la vez.
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

// LibroResponseDto (API) → Libro (pantallas)
function desdeApi(dto: LibroResponseDto): Libro {
  return {
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
    precioAnterior: dto.precioAnterior ?? undefined,
    stock: dto.stock,
    enStock: dto.enStock,
    portada: dto.portadaUrl ?? IMAGENES_RELLENO.portada,
    calificacion: dto.calificacion,
    opiniones: dto.opiniones,
    ventas: dto.ventas,
    encuadernacion: dto.encuadernacion ?? undefined,
    paginas: dto.paginas ?? undefined,
    dimensiones: dto.dimensiones ?? undefined,
    etiquetas: dto.etiquetas.length ? dto.etiquetas : undefined,
  };
}

// Casillas marcadas, o undefined si no hay ninguna
const marcadas = (valores: string[] = []) => (valores.length ? valores : undefined);

// Filtros que se envían a GET /libros
function aRequest(filtros: FiltrosCatalogo): BuscarLibrosRequest {
  return {
    q: filtros.q,
    genero: filtros.genero ? generoEnApi(filtros.genero) : undefined,
    autores: marcadas(filtros.autores),
    editoriales: marcadas(filtros.editoriales),
    subgeneros: marcadas(filtros.subgeneros),
    enOferta: filtros.soloOfertas || undefined,
    formato: filtros.formato,
    enStock: filtros.soloEnStock || undefined,
    precioMin: filtros.precioMin,
    precioMax: filtros.precioMax,
    orden: filtros.orden,
  };
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
  const { autores = [], editoriales = [], subgeneros = [] } = request;
  const resultado = LIBROS.filter(
    (libro) =>
      (!request.q || contiene(`${libro.titulo} ${libro.autor} ${libro.isbn ?? ""}`, request.q)) &&
      (!request.genero || minusculas(generoEnApi(libro.genero)) === minusculas(request.genero)) &&
      (!autores.length || autores.some((autor) => contiene(libro.autor, autor))) &&
      (!editoriales.length || editoriales.includes(libro.editorial)) &&
      (!subgeneros.length || subgeneros.includes(libro.subgenero ?? "")) &&
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
  // La API filtra y pagina en una sola petición
  if (usarApi) {
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
  // Sin API: los libros dummy, filtrados con las mismas reglas
  await pausa();
  return paginar(filtrarDummy(aRequest(filtros)), pagina);
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

// LibroResumenDto (relacionados, colecciones, recomendaciones) → Libro.
// El resumen no trae ficha técnica: solo lo que muestran las tarjetas.
export function desdeResumen(dto: LibroResumenDto): Libro {
  return {
    id: dto.id,
    titulo: dto.titulo,
    autor: dto.autor,
    editorial: "",
    genero: dto.genero,
    precio: dto.precio,
    precioAnterior: dto.precioAnterior ?? undefined,
    enStock: dto.enStock,
    portada: dto.portadaUrl ?? IMAGENES_RELLENO.portada,
    calificacion: dto.calificacion,
    opiniones: dto.opiniones,
    ventas: 0,
  };
}

// "Te podría interesar". Con API: lo que la comunidad compró junto a este
// libro, completado con los más vendidos de sus categorías. Sin API: libros
// del mismo género, completados con novedades.
export async function obtenerRelacionados(libro: Libro, cantidad = 4): Promise<Libro[]> {
  if (usarApi) {
    const relacionados = await solicitar<LibroResumenDto[]>(
      `/libros/${encodeURIComponent(libro.id)}/relacionados`,
      { parametros: { limite: cantidad } },
    );
    return relacionados.map(desdeResumen);
  }
  const [mismoGenero, novedades] = await Promise.all([
    buscarLibros({ genero: libro.genero }),
    buscarLibros({ orden: "novedades" }),
  ]);
  const vistos = new Set([libro.id]);
  return [...mismoGenero.libros, ...novedades.libros]
    .filter((otro) => !vistos.has(otro.id) && Boolean(vistos.add(otro.id)))
    .slice(0, cantidad);
}

// Carruseles del Home: la primera página de GET /libros con cada orden
export async function obtenerLibrosInicio(cantidad = 8) {
  const primeros = async (orden: OrdenLibros) =>
    (await buscarLibros({ orden })).libros.slice(0, cantidad);
  const [masVendidos, nuevosLanzamientos, masComentados] = await Promise.all([
    primeros("mas_vendidos"),
    primeros("novedades"),
    primeros("mas_comentados"),
  ]);
  return { masVendidos, nuevosLanzamientos, masComentados };
}

// Columnas del menú Catálogo (géneros y temáticas de UX). Con API:
// GET /libros/categorias; sin API: las de datos/generos.ts.
export type MenuCategorias = { generos: Columna[]; tematicas: Columna[] };

export async function obtenerCategorias(): Promise<MenuCategorias> {
  if (!usarApi) return { generos, tematicas };
  const grupos = await solicitar<GrupoCategoriasDto[]>("/libros/categorias");
  const columnas = (tipo: GrupoCategoriasDto["tipo"]) =>
    grupos
      .filter((grupo) => grupo.tipo === tipo)
      .map((grupo) => ({
        titulo: grupo.grupo,
        opciones: grupo.categorias.map((categoria) => categoria.nombre),
      }));
  return { generos: columnas("GENERO"), tematicas: columnas("TEMATICA") };
}
