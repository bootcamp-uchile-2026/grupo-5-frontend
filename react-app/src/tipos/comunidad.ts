import type { PaginadoDto } from "./api";
import type { Rol } from "./auth";
import type { LibroResumenDto } from "./librero";

// DTO de reseñas, favoritos, newsletter y categorías según la API (Swagger:
// ResenaResponseDto, ResenasPaginadasDto, ListaDeseosResponseDto,
// SuscribirNewsletterDto y GrupoCategoriasDto)

export type TipoResena = "LECTOR" | "LIBRERO";

export type AutorResenaDto = {
  id: string;
  // Nombre e inicial del apellido, p. ej. "Tomás H."
  nombre: string;
  avatarUrl: string | null;
  rol: Rol;
};

export type ResenaResponseDto = {
  id: string;
  libroId: string;
  usuarioId: string;
  autor: AutorResenaDto;
  tipo: TipoResena;
  calificacion: number;
  titulo: string | null;
  comentario: string;
  // Compra verificada
  verificada: boolean;
  fecha: string;
  creadoEn: string;
  actualizadoEn: string;
};

export type ResumenCalificacionDto = {
  promedio: number;
  cantidad: number;
  // Cantidad de reseñas por estrella: { "1": 0, ..., "5": 10 }
  distribucion: Record<string, number>;
};

// Response de GET /libros/{id}/resenas
export type ResenasPaginadasDto = PaginadoDto<ResenaResponseDto> & {
  resumen: ResumenCalificacionDto;
};

// Request de GET /libros/{id}/resenas
export type BuscarResenasRequest = {
  tipo?: TipoResena;
  soloVerificadas?: boolean;
  orden?: "recientes" | "mejor_calificadas" | "peor_calificadas";
  page?: number;
  limit?: number;
};

// Response de GET, POST y DELETE /listas-deseos/favoritos
export type ListaDeseosResponseDto = {
  id: string;
  usuarioId: string;
  nombre: string;
  esParaRegalo: boolean;
  esFavoritos: boolean;
  // Ids de los libros de la lista
  libros: string[];
  items: LibroResumenDto[];
  fechaCreacion: string;
};

// Request y response de POST /newsletter/suscripciones
export type SuscribirNewsletterDto = { email: string };
export type SuscripcionResponseDto = {
  email: string;
  activa: boolean;
  creadoEn: string;
};

// Response de GET /libros/categorias: el menú Catálogo de UX
export type CategoriaDto = {
  nombre: string;
  // Libros activos de la categoría (0 = "Aún no hay libros en este género")
  cantidad: number;
};
export type GrupoCategoriasDto = {
  grupo: string;
  tipo: "GENERO" | "TEMATICA";
  categorias: CategoriaDto[];
};
