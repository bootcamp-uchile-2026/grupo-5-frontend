import { Link } from "react-router-dom";
import { mensajeDeError } from "../utils/mensajesError";
import { Icono } from "./Icono";
import "../estilos/estados.css";

// Mensaje de error común: traduce el error de la API y ofrece reintentar
// y/o un enlace para seguir navegando
type MensajeErrorProps = {
  error: unknown;
  onReintentar?: () => void;
  enlace?: { texto: string; ruta: string };
  className?: string;
};

export function MensajeError({ error, onReintentar, enlace, className }: MensajeErrorProps) {
  return (
    <div className={`mensaje-error${className ? ` ${className}` : ""}`} role="alert">
      <Icono nombre="informacion" className="mensaje-error-icono" />
      <p>{mensajeDeError(error)}</p>
      {(onReintentar || enlace) && (
        <div className="mensaje-error-acciones">
          {onReintentar && (
            <button
              type="button"
              className="boton boton-secundario mensaje-error-reintentar"
              onClick={onReintentar}
            >
              Reintentar
            </button>
          )}
          {enlace && <Link to={enlace.ruta}>{enlace.texto}</Link>}
        </div>
      )}
    </div>
  );
}
