import { useState, type CSSProperties } from "react";
import { formatearPrecio } from "../utils/formato";

// Filtro de precio con dos controles (mínimo y máximo), según wireframe Catálogo.
// Al mover los controles se muestra cuántos productos quedarían; el filtro
// se aplica con "Aceptar".
type FiltroPrecioProps = {
  precios: number[];
  minimoAplicado?: number;
  maximoAplicado?: number;
  onAceptar: (minimo: number, maximo: number) => void;
};

const PASO = 10;

export function FiltroPrecio({
  precios,
  minimoAplicado,
  maximoAplicado,
  onAceptar,
}: FiltroPrecioProps) {
  const limiteInferior = precios.length ? Math.min(...precios) : 0;
  const limiteSuperior = precios.length ? Math.max(...precios) : 0;
  const [minimo, setMinimo] = useState(minimoAplicado ?? limiteInferior);
  const [maximo, setMaximo] = useState(maximoAplicado ?? limiteSuperior);

  if (!precios.length) return <p className="filtro-precio-nota">Sin productos.</p>;

  const rango = limiteSuperior - limiteInferior || 1;
  const porcentaje = (valor: number) => ((valor - limiteInferior) / rango) * 100;
  const cantidad = precios.filter((precio) => precio >= minimo && precio <= maximo).length;
  const estiloTramo = {
    "--tramo-inicio": `${porcentaje(minimo)}%`,
    "--tramo-fin": `${porcentaje(maximo)}%`,
  } as CSSProperties;

  return (
    <div className="filtro-precio">
      <div className="filtro-precio-valores" aria-hidden="true">
        <span>{formatearPrecio(minimo)}</span>
        <span>{formatearPrecio(maximo)}</span>
      </div>

      <div className="filtro-precio-rango" style={estiloTramo}>
        <input
          type="range"
          min={limiteInferior}
          max={limiteSuperior}
          step={PASO}
          value={minimo}
          aria-label="Precio mínimo"
          aria-valuetext={formatearPrecio(minimo)}
          onChange={(evento) =>
            setMinimo(Math.min(Number(evento.target.value), maximo))
          }
        />
        <input
          type="range"
          min={limiteInferior}
          max={limiteSuperior}
          step={PASO}
          value={maximo}
          aria-label="Precio máximo"
          aria-valuetext={formatearPrecio(maximo)}
          onChange={(evento) =>
            setMaximo(Math.max(Number(evento.target.value), minimo))
          }
        />
      </div>

      <div className="filtro-precio-acciones">
        <span aria-live="polite">
          {cantidad} {cantidad === 1 ? "producto" : "productos"}
        </span>
        <button type="button" onClick={() => onAceptar(minimo, maximo)}>
          Aceptar
        </button>
      </div>

      <p className="filtro-precio-nota">
        El precio más alto es de {formatearPrecio(limiteSuperior)}
      </p>
    </div>
  );
}
