export type TarjetaLibroProps = {
  nombreCurador: string;
  imagenCurador: string;
  portada: string;
  titulo: string;
  autor: string;
  precio: number;
  className?: string;
};

export function TarjetaLibro({
  nombreCurador,
  imagenCurador,
  portada,
  titulo,
  autor,
  precio,
  className = "carrusel-recomendaciones-tarjeta",
}: TarjetaLibroProps) {
  return (
    <article className={`${className} carrusel-tarjeta`}>
      <div className="tarjeta-header-curador">
        <img
          className="tarjeta-imagen-curador"
          src={imagenCurador}
          alt="miniatura del librero"
        />

        <div className="tarjeta-nombre-curador">{nombreCurador}</div>
      </div>

      <div className="tarjeta-libro-portada">
        <img
          className="tarjeta-portada-imagen"
          src={portada}
          alt="imagen de portada del libro"
        />
      </div>

      <div className="tarjeta-libro-info">
        <div className="tarjeta-libro-info-titulo">{titulo}</div>

        <div className="tarjeta-libro-info-autor">{autor}</div>

        <div className="tarjeta-libro-info-precio">${precio.toLocaleString("es-CL")}</div>

        <div className="tarjeta-libro-info-favorito">
          <i className="bi bi-heart" aria-hidden="true"></i>
        </div>
      </div>
    </article>
  );
}
