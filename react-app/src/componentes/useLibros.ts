import { useEffect, useState } from "react";
import { obtenerLibros } from "../servicios/catalogoServicio";
import type { LibroDto } from "../tipos/libro";

// Libros del catálogo pedidos al servicio (dummy por ahora)
export function useLibros() {
  const [libros, setLibros] = useState<LibroDto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vigente = true;
    obtenerLibros().then((respuesta) => {
      if (!vigente) return;
      setLibros(respuesta);
      setCargando(false);
    });
    return () => {
      vigente = false;
    };
  }, []);

  return { libros, cargando };
}
