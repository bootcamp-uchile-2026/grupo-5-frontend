import { Link } from "react-router-dom";
import { Estrellas } from "./Estrellas";
import "../estilos/tarjeta-recomendacion.css";

// Tarjeta "card-recomended" (Figma: Componentes Global, node 2039:6606)
export type TarjetaRecomendacionProps = {
  nombreLibrero: string;
  imagenLibrero: string;
  portada: string;
  titulo: string;
  autor: string;
  calificacion: number;
  opiniones: number;
};

export function TarjetaRecomendacion({
  nombreLibrero,
  imagenLibrero,
  portada,
  titulo,
  autor,
  calificacion,
  opiniones,
}: TarjetaRecomendacionProps) {
  return (
    <article className="tarjeta-recomendacion">
      <div className="tarjeta-recomendacion-librero">
        <img src={imagenLibrero} alt="" />
        <span>{nombreLibrero}</span>
      </div>

      <Link to="/ficha-libro" tabIndex={-1} aria-hidden="true">
        <img className="tarjeta-recomendacion-portada" src={portada} alt="" />
      </Link>

      <div className="tarjeta-recomendacion-info">
        <div className="tarjeta-recomendacion-textos">
          <h4>
            <Link to="/ficha-libro">{titulo}</Link>
          </h4>
          <p>{autor}</p>
        </div>

        <div className="tarjeta-recomendacion-calificacion">
          <Estrellas
            calificacion={calificacion}
            className="tarjeta-recomendacion-estrellas"
          />
          <span>({opiniones} opiniones)</span>
        </div>
      </div>
    </article>
  );
}
