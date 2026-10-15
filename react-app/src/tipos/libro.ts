// DTO del catálogo según la API (Swagger: LibroResponseDto y GeneroDto)
export type FormatoLibro = "FISICO" | "EBOOK" | "AUDIOLIBRO";
export type EstadoLibro = "DISPONIBLE" | "PREVENTA";
export type OrdenLibros = "novedades" | "precio_asc" | "precio_desc" | "titulo";

// Response de GET /libros (dentro de "items") y de GET /libros/:id
export type LibroResponseDto = {
  id: string;
  isbn: string;
  titulo: string;
  autor: string;
  genero: string;
  descripcion: string | null;
  editorial: string | null;
  anioPublicacion: number | null;
  formato: FormatoLibro;
  estado: EstadoLibro;
  precio: number;
  stock: number;
  enStock: boolean;
  portadaUrl: string | null;
  fechaIngreso: string;
};

// Response de GET /libros/generos
export type GeneroDto = { genero: string; cantidad: number };

// Request de GET /libros (query params, todos opcionales)
export type BuscarLibrosRequest = {
  q?: string;
  genero?: string;
  autor?: string;
  formato?: FormatoLibro;
  estado?: EstadoLibro;
  precioMin?: number;
  precioMax?: number;
  enStock?: boolean;
  orden?: OrdenLibros;
  page?: number;
  limit?: number;
};

// Datos que UX diseñó y Backend aún no expone. Son dummy
// (src/datos/complementosLibros.ts) hasta que existan en la API.
export type ComplementoLibro = {
  calificacion: number;
  opiniones: number;
  // Unidades vendidas, para el carrusel "Más vendidos" del Home
  ventas: number;
  precioAnterior?: number;
  subgenero?: string;
  encuadernacion?: string;
  paginas?: number;
  dimensiones?: string;
  etiquetas?: string[];
};

// Libro como lo muestran las pantallas: datos de la API + complemento dummy
export type Libro = ComplementoLibro & {
  id: string;
  isbn?: string;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  descripcion?: string;
  anioPublicacion?: number;
  formato?: FormatoLibro;
  estado?: EstadoLibro;
  precio: number;
  stock?: number;
  enStock: boolean;
  portada: string;
};
