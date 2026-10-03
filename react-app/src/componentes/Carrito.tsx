import { useEffect } from "react";
import { Link } from "react-router-dom";
import { resumenCarrito, useCarritoStore } from "../estado/carritoStore";
import "../estilos/carrito.css";

const formatoPrecio = (valor: number) => `$${valor.toLocaleString("es-CL")}`;

export function Carrito() {
  const items = useCarritoStore((s) => s.items);
  const abierto = useCarritoStore((s) => s.abierto);
  const cerrar = useCarritoStore((s) => s.cerrar);
  const cambiarCantidad = useCarritoStore((s) => s.cambiarCantidad);
  const eliminar = useCarritoStore((s) => s.eliminar);

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
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        {items.length === 0 && <p>Tu carrito está vacío.</p>}

        {items.map((item) => (
          <div className="carrito-item" key={item.idLibro}>
            <div className="carrito-item-foto">
              {item.portada ? (
                <img src={item.portada} alt="" width={64} height={86} />
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
                    onClick={() => cambiarCantidad(item.idLibro, -1)}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => cambiarCantidad(item.idLibro, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="carrito-item-eliminar"
                  type="button"
                  aria-label="Eliminar producto"
                  onClick={() => eliminar(item.idLibro)}
                >
                  <i className="bi bi-x" aria-hidden="true"></i>
                </button>
              </div>

              <span className="carrito-item-precio">
                {formatoPrecio(item.precioUnitario * item.cantidad)}
              </span>
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
            <span>{formatoPrecio(subtotal)}</span>
          </div>
        </div>

        <Link
          className="carrito-pago"
          to="/checkout"
          onClick={cerrar}
          aria-disabled={items.length === 0}
        >
          Pago seguro
        </Link>

        <p className="carrito-envio-nota">El envío se calcula en el checkout</p>
      </aside>
    </div>
  );
}
