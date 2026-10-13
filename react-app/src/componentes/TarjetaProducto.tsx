import { Link } from "react-router-dom";
import { BotonFavorito } from "./BotonFavorito";
import { Estrellas } from "./Estrellas";
import { Icono } from "./Icono";
import { Portada } from "./Portada";
import { useComprarLibro } from "./useComprarLibro";
import { formatearPrecio, porcentajeDescuento } from "../utils/formato";
import "../estilos/tarjeta-producto.css";

// Tarjeta "card-product" (Figma: Componentes Global, node 1626:9440)
export type TarjetaProductoProps = {
  idLibro: string;
  titulo: string;
  autor: string;
  portada: string;
  precio: number;
  precioAnterior?: number;
  calificacion: number;
  opiniones: number;
  // Sin stock se muestran los botones de compra deshabilitados
  enStock?: boolean;
};

export function TarjetaProducto({
  idLibro,
  titulo,
  autor,
  portada,
  precio,
  precioAnterior,
  calificacion,
  opiniones,
  enStock = true,
}: TarjetaProductoProps) {
  const comprarLibro = useComprarLibro();
  // La imagen y el título llevan a la ficha del libro
  const rutaFicha = `/ficha-libro?libro=${encodeURIComponent(idLibro)}`;
  const descuento = porcentajeDescuento(precio, precioAnterior);

  const comprar = (irAlCheckout: boolean) =>
    comprarLibro(
      { idLibro, titulo, autor, precioUnitario: precio, cantidad: 1, portada },
      irAlCheckout,
    );

  return (
    <article className="tarjeta-producto">
      <div className="tarjeta-producto-imagen">
        <Link to={rutaFicha} tabIndex={-1} aria-hidden="true">
          <Portada src={portada} />
        </Link>
        <BotonFavorito titulo={titulo} className="tarjeta-producto-favorito" />
      </div>

      <div className="tarjeta-producto-info">
        <div className="tarjeta-producto-textos">
          <h4>
            <Link to={rutaFicha}>{titulo}</Link>
          </h4>
          <p>{autor}</p>
        </div>

        <div className="tarjeta-producto-precios">
          <span className="tarjeta-producto-precio">{formatearPrecio(precio, true)}</span>
          {descuento > 0 && precioAnterior && (
            <>
              <span className="tarjeta-producto-descuento">{descuento}% dcto.</span>
              <s className="tarjeta-producto-precio-anterior">
                {formatearPrecio(precioAnterior, true)}
              </s>
            </>
          )}
        </div>

        <div className="tarjeta-producto-calificacion">
          <Estrellas
            calificacion={calificacion}
            className="tarjeta-producto-estrellas"
          />
          <span>({opiniones} opiniones)</span>
        </div>

        <div className="tarjeta-producto-botones">
          <button
            type="button"
            className="tarjeta-producto-agregar"
            disabled={!enStock}
            onClick={() => void comprar(false)}
          >
            {enStock ? "Agregar al carrito" : "Sin stock"}
            <Icono nombre="carro" />
          </button>
          <button
            type="button"
            className="tarjeta-producto-comprar"
            disabled={!enStock}
            onClick={() => void comprar(true)}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </article>
  );
}
