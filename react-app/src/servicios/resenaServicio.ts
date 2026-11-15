import { RESENAS_LECTORES } from "../datos/resenas";
import type { BuscarResenasRequest, ResenasPaginadasDto } from "../tipos/comunidad";
import { fechaRelativa } from "../utils/formato";
import { solicitar, usarApi } from "./api";

// Servicio de reseñas. Con API: GET /libros/{id}/resenas. Sin API
// (VITE_API_URL vacía): las reseñas dummy del wireframe (datos/resenas.ts).

// Máximo de reseñas por página que acepta la API
const LIMITE_API = 50;

const pausa = () => new Promise((resolver) => setTimeout(resolver, 150));

// Reseña de lector como la muestra la ficha. La API no guarda la ubicación
// del lector: solo existe en los datos dummy.
export type ResenaLector = {
  id: string;
  nombre: string;
  ubicacion?: string;
  calificacion: number;
  fecha: string;
  texto: string;
};

export type ResenasLectores = { resenas: ResenaLector[]; total: number };

// "Reseñas de otros lectores": las más recientes primero
export async function obtenerResenasLectores(idLibro: string): Promise<ResenasLectores> {
  if (usarApi) {
    const parametros: BuscarResenasRequest = { tipo: "LECTOR", orden: "recientes", limit: LIMITE_API };
    const respuesta = await solicitar<ResenasPaginadasDto>(
      `/libros/${encodeURIComponent(idLibro)}/resenas`,
      { parametros },
    );
    return {
      total: respuesta.total,
      resenas: respuesta.items.map((resena) => ({
        id: resena.id,
        nombre: resena.autor.nombre,
        calificacion: resena.calificacion,
        fecha: fechaRelativa(resena.creadoEn),
        texto: resena.comentario,
      })),
    };
  }
  await pausa();
  return {
    total: RESENAS_LECTORES.length,
    resenas: RESENAS_LECTORES.map((resena) => ({ ...resena, id: resena.nombre })),
  };
}
