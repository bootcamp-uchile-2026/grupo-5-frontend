import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  cantidadMaximaDe,
  resumenCarrito,
  useCarritoStore,
} from "../estado/carritoStore";
import { cambiarCantidadCarrito } from "../servicios/carritoServicio";
import { ConfirmarEliminar } from "./ConfirmarEliminar";
import { Icono } from "./Icono";
import { Portada } from "./Portada";
import "../estilos/carrito.css";
import { formatearPrecio } from "../utils/formato";

// Carrito en alta fidelidad (Figma: carrito, node 3388:56304). Se abre bajo
// el ícono del carro, en todas las vistas. Al eliminar un libro pide
// confirmación (ConfirmarEliminar, node 3416:25598).
export function Carrito() {
  const items = useCarritoStore((s) => s.items);
  const abierto = useCarritoStore((s) => s.abierto);
  const cerrar = useCarritoStore((s) => s.cerrar);
  const actualizando = useCarritoStore((s) => s.actualizando);
  const aviso = useCarritoStore((s) => s.aviso);
  const [porEliminar, setPorEliminar] = useState<{ idLibro: string; titulo: string } | null>(null);

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
    <>
      <div
        className="carrito-overlay"
        hidden={!abierto}
        onClick={(e) => {
          if (e.target === e.currentTarget) cerrar();
        }}
      >
        <aside className="carrito-panel" aria-labelledby="carrito-titulo">
          <div className="carrito-encabezado">
            <h2 id="carrito-titulo">Carrito</h2>
            <span className="carrito-cantidad">
              <Icono nombre="bolsa" />
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
            {/* El diseño cierra al hacer clic fuera o con Escape; este botón
                queda disponible para el teclado y los lectores de pantalla */}
            <button className="carrito-cerrar" type="button" aria-label="Cerrar carrito" onClick={cerrar}>
              <Icono nombre="cerrar" />
            </button>
          </div>

          {aviso && (
            <p className="carrito-aviso" role="alert">
              {aviso}
            </p>
          )}

          {items.length === 0 ? (
            <div className="carrito-vacio">
              <p>Tu carrito está vacío.</p>
              <Link to="/catalogo" onClick={cerrar}>
                Explorar el catálogo
              </Link>
            </div>
          ) : (
            <ul className="carrito-items">
              {items.map((item) => (
                <li className="carrito-item" key={item.idLibro}>
                  <Portada className="carrito-item-portada" src={item.portada} alt="" />
                  <div className="carrito-item-datos">
                    <div className="carrito-item-textos">
                      <p className="carrito-item-titulo">{item.titulo}</p>
                      {item.autor && <p className="carrito-item-autor">{item.autor}</p>}
                    </div>
                    <p className="carrito-item-precio">
                      {formatearPrecio(item.precioUnitario * item.cantidad)}
                    </p>
                    <div className="carrito-item-cantidad">
                      <button
                        type="button"
                        aria-label={`Disminuir cantidad de ${item.titulo}`}
                        disabled={actualizando || item.cantidad <= 1}
                        onClick={() => void cambiarCantidadCarrito(item, -1)}
                      >
                        <Icono nombre="menos" />
                      </button>
                      <span aria-live="polite">{item.cantidad}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.titulo}`}
                        disabled={actualizando || item.cantidad >= cantidadMaximaDe(item)}
                        onClick={() => void cambiarCantidadCarrito(item, 1)}
                      >
                        <Icono nombre="mas" />
                      </button>
                    </div>
                    {item.disponible === false && (
                      <span className="carrito-item-sin-stock">
                        {item.stockDisponible
                          ? `Solo quedan ${item.stockDisponible} unidades`
                          : "Sin stock"}
                      </span>
                    )}
                  </div>
                  <button
                    className="carrito-item-eliminar"
                    type="button"
                    aria-label={`Eliminar ${item.titulo} del carrito`}
                    disabled={actualizando}
                    onClick={() => setPorEliminar({ idLibro: item.idLibro, titulo: item.titulo })}
                  >
                    <Icono nombre="papelera" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="carrito-pie">
            <div className="carrito-total">
              <span>Total a pagar:</span>
              <span>{formatearPrecio(subtotal)}</span>
            </div>
            {items.length === 0 ? (
              <button className="carrito-pagar" type="button" disabled>
                Pagar ahora
              </button>
            ) : (
              <Link className="carrito-pagar" to="/checkout" onClick={cerrar}>
                Pagar ahora
              </Link>
            )}
            <p className="carrito-nota">El envío se calcula en el checkout</p>
          </div>
        </aside>
      </div>

      {porEliminar && (
        <ConfirmarEliminar
          idLibro={porEliminar.idLibro}
          titulo={porEliminar.titulo}
          onCerrar={() => setPorEliminar(null)}
        />
      )}
    </>
  );
}
