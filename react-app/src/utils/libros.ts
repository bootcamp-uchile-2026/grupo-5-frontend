import type { TarjetaProductoProps } from "../componentes/TarjetaProducto";
import type { FormatoLibro, Libro } from "../tipos/libro";

// Datos que necesita la tarjeta de producto (Home, Catálogo y Ficha)
export const propsDeTarjeta = (libro: Libro): TarjetaProductoProps => ({
  idLibro: libro.id,
  titulo: libro.titulo,
  autor: libro.autor,
  portada: libro.portada,
  precio: libro.precio,
  precioAnterior: libro.precioAnterior,
  calificacion: libro.calificacion,
  opiniones: libro.opiniones,
  enStock: libro.enStock,
});

// Nombre visible de cada formato de la API
export const NOMBRES_FORMATO: Record<FormatoLibro, string> = {
  FISICO: "Físico",
  EBOOK: "E-book",
  AUDIOLIBRO: "Audiolibro",
};
