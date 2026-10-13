import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  cantidadMaximaDe,
  resumenCarrito,
  useCarritoStore,
} from "../estado/carritoStore";
import { cambiarCantidadCarrito, quitarDelCarrito } from "../servicios/carritoServicio";
import { Icono } from "./Icono";
import { Portada } from "./Portada";
import "../estilos/carrito.css";
import { formatearPrecio } from "../utils/formato";

export function Carrito() {
  const items = useCarritoStore((s) => s.items);
  const abierto = useCarritoStore((s) => s.abierto);
  const cerrar = useCarritoStore((s) => s.cerrar);
  const actualizando = useCarritoStore((s) => s.actualizando);
  const aviso = useCarritoStore((s) => s.aviso);

  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [abierto, cerrar]);

  const { totalItems, subtotal } = resumenCarrito(items);

  return (
    <div
      className="carrito-overlay"
      hidden={!abierto}
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrar();
      }}
    >
      <aside className="carrito-panel" aria-label="Carrito de compras">
        <div className="carrito-encabezado">
          <h3>Carrito</h3>
          <button
            className="carrito-cerrar"
            type="button"
            aria-label="Cerrar carrito"
            onClick={cerrar}
          >
            <Icono nombre="cerrar" />
          </button>
        </div>

        {aviso && (
          <p className="carrito-aviso" role="alert">
            {aviso}
          </p>
        )}

        {items.length === 0 && <p>Tu carrito está vacío.</p>}

        {items.map((item) => (
          <div className="carrito-item" key={item.idLibro}>
            <div className="carrito-item-foto">
              {item.portada ? (
                <Portada src={item.portada} width={64} height={86} />
              ) : (
                <>
                  Foto
                  <br />
                  libro
                </>
              )}
            </div>

            <div className="carrito-item-datos">
              <div className="carrito-item-fila">
                <span className="carrito-item-titulo">{item.titulo}</span>

                <div className="carrito-item-cantidad">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    disabled={actualizando}
                    onClick={() => void cambiarCantidadCarrito(item, -1)}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    disabled={actualizando || item.cantidad >= cantidadMaximaDe(item)}
                    onClick={() => void cambiarCantidadCarrito(item, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="carrito-item-eliminar"
                  type="button"
                  aria-label="Eliminar producto"
                  disabled={actualizando}
                  onClick={() => void quitarDelCarrito(item.idLibro)}
                >
                  <Icono nombre="eliminar" />
                </button>
              </div>

              <span className="carrito-item-precio">
                {formatearPrecio(item.precioUnitario * item.cantidad)}
              </span>
              {item.disponible === false && (
                <span className="carrito-item-sin-stock">
                  {item.stockDisponible
                    ? `Solo quedan ${item.stockDisponible} unidades`
                    : "Sin stock"}
                </span>
              )}
            </div>
          </div>
        ))}

        <hr className="carrito-separador" />

        <div className="carrito-sumario">
          <div className="carrito-sumario-fila">
            <span>Sumario:</span>
            <span>{totalItems} Item</span>
          </div>
          <div className="carrito-sumario-fila">
            <span>Subtotal:</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>
        </div>

        {items.length === 0 ? (
          <button className="carrito-pago" type="button" disabled>
            Pago seguro
          </button>
        ) : (
          <Link className="carrito-pago" to="/checkout" onClick={cerrar}>
            Pago seguro
          </Link>
        )}

        <p className="carrito-envio-nota">El envío se calcula en el checkout</p>
      </aside>
    </div>
  );
}
