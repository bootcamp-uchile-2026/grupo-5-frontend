import type { TarjetaProductoProps } from "../componentes/TarjetaProducto";
import type { LibroDto } from "../tipos/libro";

// Datos que necesita la tarjeta de producto (Home, Catálogo y Ficha)
export const propsDeTarjeta = (libro: LibroDto): TarjetaProductoProps => ({
  idLibro: libro.id,
  titulo: libro.titulo,
  autor: libro.autor,
  portada: libro.portada,
  precio: libro.precio,
  precioAnterior: libro.precioAnterior,
  calificacion: libro.calificacion,
  opiniones: libro.opiniones,
});
