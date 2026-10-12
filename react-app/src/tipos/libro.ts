// DTO de libro (response de GET /libros y GET /libros/:id; hoy dummy)
export type LibroDto = {
  id: string;
  titulo: string;
  autor: string;
  editorial: string;
  precio: number;
  precioAnterior?: number;
  portada: string;
  categoria: string;
  subgenero?: string;
  calificacion: number;
  opiniones: number;
  // Detalle para la ficha del libro (opcional en los datos dummy)
  descripcion?: string;
  isbn?: string;
  encuadernacion?: string;
  paginas?: number;
  dimensiones?: string;
  etiquetas?: string[];
};
