import { useId, useState, type ReactNode } from "react";
import { Icono } from "./Icono";

// Sección plegable de la barra de filtros del catálogo (wireframe Catálogo)
type FiltroDesplegableProps = {
  titulo: string;
  abiertoInicial?: boolean;
  children: ReactNode;
};

export function FiltroDesplegable({
  titulo,
  abiertoInicial = false,
  children,
}: FiltroDesplegableProps) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const idPanel = useId();

  return (
    <section className="filtro-desplegable">
      <button
        type="button"
        className="filtro-desplegable-boton"
        aria-expanded={abierto}
        aria-controls={idPanel}
        onClick={() => setAbierto((actual) => !actual)}
      >
        {titulo}
        <Icono nombre="abajo" />
      </button>

      <div id={idPanel} className="filtro-desplegable-panel" hidden={!abierto}>
        {children}
      </div>
    </section>
  );
}
