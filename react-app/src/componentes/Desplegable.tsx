import { useId, useState, type ReactNode } from "react";
import { Icono } from "./Icono";

// Sección plegable con título y flecha. Se usa en los filtros del Catálogo
// (className="filtro-desplegable") y en las secciones de la Ficha de libro
// (className="ficha-seccion"); cada página define su estilo.
type DesplegableProps = {
  titulo: ReactNode;
  className: string;
  abiertoInicial?: boolean;
  children: ReactNode;
};

export function Desplegable({
  titulo,
  className,
  abiertoInicial = false,
  children,
}: DesplegableProps) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const idPanel = useId();

  return (
    <section className={className}>
      <h2 className="desplegable-encabezado">
        <button
          type="button"
          className="desplegable-boton"
          aria-expanded={abierto}
          aria-controls={idPanel}
          onClick={() => setAbierto((actual) => !actual)}
        >
          <span>{titulo}</span>
          <Icono nombre="abajo" />
        </button>
      </h2>
      <div id={idPanel} className="desplegable-panel" hidden={!abierto}>
        {children}
      </div>
    </section>
  );
}
