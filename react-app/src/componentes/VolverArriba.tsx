import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// Al cambiar de página (o de libro/librero en la ficha y el perfil) la vista
// vuelve arriba. Los cambios de filtros del catálogo no mueven el scroll.
export function VolverArriba() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const pagina = `${pathname}|${searchParams.get("libro") ?? ""}|${searchParams.get("librero") ?? ""}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagina]);

  return null;
}
