import { LIBROS } from "../datos/libros";
import type { LibroDto } from "../tipos/libro";

const pausa = () => new Promise((r) => setTimeout(r, 150));

// Servicios dummy: reemplazar por HTTP/REST cuando Backend exponga
// GET /libros y GET /libros/:id.
export async function obtenerLibros(): Promise<LibroDto[]> {
  await pausa();
  return LIBROS;
}

export async function obtenerLibro(id: string): Promise<LibroDto | undefined> {
  await pausa();
  return LIBROS.find((libro) => libro.id === id);
}
