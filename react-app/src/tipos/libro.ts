// DTO del catálogo según la API (Swagger: LibroResponseDto y GeneroDto)
export type FormatoLibro = "FISICO" | "EBOOK" | "AUDIOLIBRO";
export type EstadoLibro = "DISPONIBLE" | "PREVENTA";
export type OrdenLibros =
  | "novedades"
  | "precio_asc"
  | "precio_desc"
  | "titulo"
  | "mas_vendidos"
  | "mejor_calificados"
  | "mas_comentados"
  | "mayor_descuento";

// Response de GET /libros (dentro de "items") y de GET /libros/:id
export type LibroResponseDto = {
  id: string;
  isbn: string;
  titulo: string;
  autor: string;
  genero: string;
  subgenero: string | null;
  descripcion: string | null;
  editorial: string | null;
  anioPublicacion: number | null;
  formato: FormatoLibro;
  estado: EstadoLibro;
  precio: number;
  // Solo en oferta: precio antes del descuento y su porcentaje
  precioAnterior: number | null;
  descuentoPorcentaje: number;
  enOferta: boolean;
  stock: number;
  enStock: boolean;
  portadaUrl: string | null;
  calificacion: number;
  opiniones: number;
  // Unidades vendidas (orden "mas_vendidos")
  ventas: number;
  encuadernacion: string | null;
  paginas: number | null;
  dimensiones: string | null;
  etiquetas: string[];
  fechaIngreso: string;
};

// Response de GET /libros/generos
export type GeneroDto = { genero: string; cantidad: number };

// Request de GET /libros (query params, todos opcionales). "autores" admite
// varios valores; "editorial" y "subgenero", uno solo.
export type BuscarLibrosRequest = {
  q?: string;
  genero?: string;
  autores?: string[];
  editorial?: string;
  subgenero?: string;
  enOferta?: boolean;
  formato?: FormatoLibro;
  estado?: EstadoLibro;
  precioMin?: number;
  precioMax?: number;
  enStock?: boolean;
  orden?: OrdenLibros;
  page?: number;
  limit?: number;
};

// Libro como lo muestran las pantallas (desde LibroResponseDto)
export type Libro = {
  id: string;
  isbn?: string;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  subgenero?: string;
  calificacion: number;
  opiniones: number;
  ventas: number;
  precioAnterior?: number;
  encuadernacion?: string;
  paginas?: number;
  dimensiones?: string;
  etiquetas?: string[];
  descripcion?: string;
  anioPublicacion?: number;
  formato?: FormatoLibro;
  estado?: EstadoLibro;
  precio: number;
  stock?: number;
  enStock: boolean;
  portada: string;
};
