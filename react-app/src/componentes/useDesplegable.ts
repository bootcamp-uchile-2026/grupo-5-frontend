import { useEffect, useRef, useState } from "react";

// Estado compartido de los desplegables de la barra:
// se cierran con Esc o con un clic fuera del contenedor.
export function useDesplegable() {
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  const cerrar = () => setAbierto(false);
  const alternar = () => setAbierto((actual) => !actual);

  useEffect(() => {
    if (!abierto) return;

    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    const alHacerClic = (e: MouseEvent) => {
      if (!contenedorRef.current?.contains(e.target as Node)) {
        setAbierto(false);
      }
    };

    document.addEventListener("keydown", alPresionar);
    document.addEventListener("mousedown", alHacerClic);
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.removeEventListener("mousedown", alHacerClic);
    };
  }, [abierto]);

  return { abierto, alternar, cerrar, contenedorRef };
}
