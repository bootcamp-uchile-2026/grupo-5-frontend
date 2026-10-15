import { useState } from "react";
import { Icono } from "./Icono";

// Corazón para guardar un libro en favoritos. Solo en pantalla: aún no
// existe un servicio de favoritos.
type BotonFavoritoProps = {
  titulo: string;
  className: string;
};

export function BotonFavorito({ titulo, className }: BotonFavoritoProps) {
  const [favorito, setFavorito] = useState(false);

  return (
    <button
      type="button"
      className={className}
      aria-label={`Guardar ${titulo} en favoritos`}
      aria-pressed={favorito}
      onClick={() => setFavorito((actual) => !actual)}
    >
      <Icono nombre={favorito ? "favoritoActivo" : "favorito"} />
    </button>
  );
}
