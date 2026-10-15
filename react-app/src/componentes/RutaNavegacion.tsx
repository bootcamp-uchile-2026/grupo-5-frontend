import { Link } from "react-router-dom";
import "../estilos/ruta-navegacion.css";

// Ruta de navegación ("Inicio / Catálogo / ..."). El último elemento es la
// página actual; los elementos sin ruta se muestran como texto.
export type ElementoRuta = { texto: string; ruta?: string };

type RutaNavegacionProps = {
  elementos: ElementoRuta[];
  className?: string;
};

export function RutaNavegacion({ elementos, className }: RutaNavegacionProps) {
  return (
    <nav
      className={`ruta-navegacion${className ? ` ${className}` : ""}`}
      aria-label="Ruta de navegación"
    >
      <ol>
        {elementos.map((elemento, indice) => (
          <li key={`${elemento.texto}-${indice}`}>
            {indice === elementos.length - 1 ? (
              <span aria-current="page">{elemento.texto}</span>
            ) : elemento.ruta ? (
              <Link to={elemento.ruta}>{elemento.texto}</Link>
            ) : (
              elemento.texto
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
