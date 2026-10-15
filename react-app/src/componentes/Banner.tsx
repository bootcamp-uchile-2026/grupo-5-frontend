import { useState } from "react";
import { Icono } from "./Icono";

const avisos = ["Noticia destacada, anuncios, ofertas"];

export function Banner() {
  const [actual, setActual] = useState(0);

  const mover = (paso: number) =>
    setActual((indice) => (indice + paso + avisos.length) % avisos.length);

  return (
    <div className="banner-contenedor">
      <button
        className="banner-flecha"
        type="button"
        aria-label="Aviso anterior"
        onClick={() => mover(-1)}
      >
        <Icono nombre="anterior" />
      </button>

      <p className="banner" aria-live="polite">
        {avisos[actual]}
      </p>

      <button
        className="banner-flecha"
        type="button"
        aria-label="Aviso siguiente"
        onClick={() => mover(1)}
      >
        <Icono nombre="siguiente" />
      </button>
    </div>
  );
}