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

// Filtros del Catálogo. Búsqueda, género, un autor, formato, stock, precio y
// orden los resuelve la API; subgéneros, editoriales, varios autores y
// ofertas no existen en Backend y se aplican aquí (dummy).
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

// Filtros que se envían a GET /libros
function aRequest(filtros: FiltrosCatalogo): BuscarLibrosRequest {
  const autores = filtros.autores ?? [];
  return {
    q: filtros.q,
    genero: filtros.genero ? generoEnApi(filtros.genero) : undefined,
    autor: autores.length === 1 ? autores[0] : undefined,
    formato: filtros.formato,
    enStock: filtros.soloEnStock || undefined,
    precioMin: filtros.precioMin,
    precioMax: filtros.precioMax,
    orden: filtros.orden,
  };
}

const usaFiltrosDummy = (filtros: FiltrosCatalogo) =>
  Boolean(
    filtros.subgeneros?.length ||
      filtros.editoriales?.length ||
      (filtros.autores?.length ?? 0) > 1 ||
      filtros.soloOfertas,
  );

// Filtros que Backend no tiene (se aplican sobre los libros ya recibidos)
function aplicarFiltrosDummy(libros: Libro[], filtros: FiltrosCatalogo) {
  const { subgeneros = [], editoriales = [], autores = [] } = filtros;
  return libros.filter(
    (libro) =>
      (!subgeneros.length || subgeneros.includes(libro.subgenero ?? "")) &&
      (!editoriales.length || editoriales.includes(libro.editorial)) &&
      (autores.length < 2 || autores.includes(libro.autor)) &&
      (!filtros.soloOfertas || Boolean(libro.precioAnterior && libro.precioAnterior > libro.precio)),
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

// Versión dummy de GET /libros (mismas reglas que la API)
function filtrarDummy(request: BuscarLibrosRequest): Libro[] {
  const consulta = request.q?.toLocaleLowerCase("es-CL");
  const resultado = LIBROS.filter(
    (libro) =>
      (!consulta ||
        `${libro.titulo} ${libro.autor} ${libro.isbn ?? ""}`
          .toLocaleLowerCase("es-CL")
          .includes(consulta)) &&
      (!request.genero ||
        generoEnApi(libro.genero).toLocaleLowerCase("es-CL") ===
          request.genero.toLocaleLowerCase("es-CL")) &&
      (!request.autor ||
        libro.autor.toLocaleLowerCase("es-CL").includes(request.autor.toLocaleLowerCase("es-CL"))) &&
      (!request.formato || (libro.formato ?? "FISICO") === request.formato) &&
      (!request.enStock || libro.enStock) &&
      (request.precioMin === undefined || libro.precio >= request.precioMin) &&
      (request.precioMax === undefined || libro.precio <= request.precioMax),
  );
  if (request.orden === "precio_asc") resultado.sort((a, b) => a.precio - b.precio);
  if (request.orden === "precio_desc") resultado.sort((a, b) => b.precio - a.precio);
  if (request.orden === "titulo") {
    resultado.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  }
  return resultado;
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
  // Sin filtros dummy, la API pagina directamente
  if (usarApi && !usaFiltrosDummy(filtros)) {
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
  // Con filtros dummy se piden todos los libros del ámbito y se pagina aquí
  const libros = await todosLosLibros(aRequest(filtros));
  return paginar(aplicarFiltrosDummy(libros, filtros), pagina);
}

// Autores, editoriales y precios disponibles para una búsqueda y un género
export async function obtenerOpcionesFiltro(
  ambito: Pick<FiltrosCatalogo, "q" | "genero">,
): Promise<OpcionesFiltro> {
  const libros = await todosLosLibros(aRequest(ambito));
  const unicos = (valores: string[]) =>
    Array.from(new Set(valores.filter(Boolean))).sort((a, b) => a.localeCompare(b, "es"));
  return {
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
