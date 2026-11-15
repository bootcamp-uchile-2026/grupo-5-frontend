// DTO de libreros según la API (Swagger: LibreroPerfilDto,
// ColeccionResponseDto y RecomendacionLibreroResponseDto)

// Resumen de libro dentro de colecciones, indispensables y recomendaciones
export type LibroResumenDto = {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  precio: number;
  precioAnterior: number | null;
  portadaUrl: string | null;
  calificacion: number;
  opiniones: number;
  enStock: boolean;
};

// "libro" viene null cuando el indispensable no está en el catálogo
export type IndispensableResponseDto = {
  titulo: string;
  autor: string;
  libroId: string | null;
  libro: LibroResumenDto | null;
};

export type ColeccionResponseDto = {
  id: string;
  titulo: string;
  descripcion: string | null;
  // Formato "2026-08-24"
  fecha: string;
  libros: LibroResumenDto[];
};

export type RecomendacionLibreroResponseDto = {
  id: string;
  libro: LibroResumenDto;
  nota: string;
  notaPersonal: string;
  destacada: boolean;
  orden: number;
  fecha: string;
};

// Response de GET /libreros/yo y GET /libreros/{id}
export type LibreroPerfilDto = {
  id: string;
  slug: string;
  nombre: string;
  nombreCorto: string;
  etiquetas: string[];
  cita: string | null;
  fotoUrl: string | null;
  seguidores: number;
  biografia: string;
  estilos: string[];
  autoresFavoritos: string[];
  autores: string[];
  indispensables: IndispensableResponseDto[];
  colecciones: ColeccionResponseDto[];
  ultimasRecomendaciones: RecomendacionLibreroResponseDto[];
  // Solo con token: si el usuario sigue a este librero
  siguiendo: boolean | null;
};
