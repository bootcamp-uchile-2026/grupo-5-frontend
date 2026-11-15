import { useFavoritosStore } from "../estado/favoritosStore";
import { useSesionStore } from "../estado/sesionStore";
import type { ListaDeseosResponseDto } from "../tipos/comunidad";
import { solicitar, usarApi } from "./api";

// Favoritos (botón corazón). Con API y sesión: GET, POST y DELETE
// /listas-deseos/favoritos. Sin API: solo en el navegador (favoritosStore).

const RUTA_FAVORITOS = "/listas-deseos/favoritos";

const conSesionEnApi = () => usarApi && Boolean(useSesionStore.getState().usuario?.token);

// Trae los favoritos de la cuenta (al cargar la app y al iniciar sesión)
export async function obtenerFavoritos(): Promise<void> {
  if (!conSesionEnApi()) return;
  try {
    const lista = await solicitar<ListaDeseosResponseDto>(RUTA_FAVORITOS, {
      avisarSesionVencida: false,
    });
    useFavoritosStore.getState().reemplazar(lista.libros);
  } catch {
    // Si falla, el corazón queda como estaba; no bloquea la navegación
  }
}

// Guarda o quita un libro. Lanza el error de la API para que el botón lo avise.
export async function alternarFavorito(idLibro: string): Promise<void> {
  const favoritos = useFavoritosStore.getState();
  if (!conSesionEnApi()) {
    favoritos.alternar(idLibro);
    return;
  }
  const esFavorito = favoritos.ids.includes(idLibro);
  favoritos.setActualizando(idLibro);
  try {
    const lista = await solicitar<ListaDeseosResponseDto>(
      `${RUTA_FAVORITOS}/libros/${encodeURIComponent(idLibro)}`,
      { metodo: esFavorito ? "DELETE" : "POST" },
    );
    useFavoritosStore.getState().reemplazar(lista.libros);
  } finally {
    useFavoritosStore.getState().setActualizando(null);
  }
}

// Al iniciar sesión se traen los favoritos de la cuenta; al cerrarla se
// vacían, para que el siguiente usuario no vea los del anterior
export function vigilarSesionFavoritos() {
  return useSesionStore.subscribe((estado, anterior) => {
    const conSesion = Boolean(estado.usuario?.token);
    if (!usarApi || conSesion === Boolean(anterior.usuario?.token)) return;
    if (conSesion) void obtenerFavoritos();
    else useFavoritosStore.getState().reemplazar([]);
  });
}
