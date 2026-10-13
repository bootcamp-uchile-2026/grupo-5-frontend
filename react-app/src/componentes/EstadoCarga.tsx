import "../estilos/estados.css";

// Indicador de carga común para las vistas que piden datos a un servicio
type EstadoCargaProps = {
  texto?: string;
  className?: string;
};

export function EstadoCarga({ texto = "Cargando...", className }: EstadoCargaProps) {
  return (
    <p className={`estado-carga${className ? ` ${className}` : ""}`} role="status">
      <span className="estado-carga-indicador" aria-hidden="true" />
      {texto}
    </p>
  );
}
