import { useAutenticacionStore } from "../estado/autenticacionStore";
import { useFavoritosStore } from "../estado/favoritosStore";
import { useSesionStore } from "../estado/sesionStore";
import { alternarFavorito } from "../servicios/favoritosServicio";
import { Icono } from "./Icono";

// Corazón para guardar un libro en favoritos (HU-014). Sin sesión abre el
// inicio de sesión; con sesión guarda o quita el libro de la lista
// "Favoritos" de la cuenta y se mantiene al recargar.
type BotonFavoritoProps = {
  idLibro: string;
  titulo: string;
  className: string;
};

export function BotonFavorito({ idLibro, titulo, className }: BotonFavoritoProps) {
  const conSesion = useSesionStore((estado) => Boolean(estado.usuario));
  const abrirAutenticacion = useAutenticacionStore((estado) => estado.abrir);
  const favorito = useFavoritosStore((estado) => conSesion && estado.ids.includes(idLibro));
  const actualizando = useFavoritosStore((estado) => estado.actualizando === idLibro);

  function alternar() {
    if (!conSesion) {
      abrirAutenticacion();
      return;
    }
    // Si la API falla, el corazón queda como estaba
    alternarFavorito(idLibro).catch(() => undefined);
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={favorito ? `Quitar ${titulo} de favoritos` : `Guardar ${titulo} en favoritos`}
      aria-pressed={favorito}
      aria-busy={actualizando}
      disabled={actualizando}
      onClick={alternar}
    >
      <Icono nombre={favorito ? "favoritoActivo" : "favorito"} />
    </button>
  );
}
