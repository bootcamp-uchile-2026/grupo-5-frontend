import { Icono } from "./Icono";

// Calificación de 0 a 5 con estrellas llenas, medias o vacías
const ESTRELLAS = 5;

function nombreEstrella(posicion: number, calificacion: number) {
  if (calificacion >= posicion) return "estrellaLlena";
  if (calificacion >= posicion - 0.5) return "estrellaMedia";
  return "calificar";
}

type EstrellasProps = {
  calificacion: number;
  className?: string;
};

export function Estrellas({ calificacion, className }: EstrellasProps) {
  return (
    <span
      className={className}
      role="img"
      aria-label={`Calificación ${calificacion.toLocaleString("es-CL")} de ${ESTRELLAS}`}
    >
      {Array.from({ length: ESTRELLAS }, (_, indice) => (
        <Icono key={indice} nombre={nombreEstrella(indice + 1, calificacion)} />
      ))}
    </span>
  );
}
