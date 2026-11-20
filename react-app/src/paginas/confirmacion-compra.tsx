import type { ComponentProps } from "react";
import { Link, useLocation } from "react-router-dom";
import iconoConfirmado from "../assets/iconos/13-check-circulo.svg";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import { Portada } from "../componentes/Portada";
import { RutaNavegacion } from "../componentes/RutaNavegacion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import "../estilos/confirmacion-compra.css";
import type {
  ConfirmacionPedido,
  MetodoPago,
} from "../tipos/checkout";
import { formatearPrecio } from "../utils/formato";

// Confirmación de compra en alta fidelidad (Figma: Checkout-confirmación
// compra, node 1563:10247). Recibe el pedido desde el checkout en el state
// de la navegación.

const METODOS_PAGO: Record<MetodoPago, string> = {
  onepay: "Onepay",
  webpay: "Webpay",
  mercadopago: "Mercado Pago",
  transferencia: "Transferencia electrónica",
};

function esConfirmacionPedido(valor: unknown): valor is ConfirmacionPedido {
  if (!valor || typeof valor !== "object") return false;
  const pedido = valor as Partial<ConfirmacionPedido>;
  return (
    typeof pedido.idPedido === "string" &&
    typeof pedido.nombreComprador === "string" &&
    typeof pedido.emailComprador === "string" &&
    typeof pedido.fecha === "string" &&
    typeof pedido.totalItems === "number" &&
    typeof pedido.subtotal === "number" &&
    typeof pedido.envio === "number" &&
    typeof pedido.descuento === "number" &&
    typeof pedido.total === "number" &&
    Array.isArray(pedido.items) &&
    (pedido.metodoEnvio === "despacho" || pedido.metodoEnvio === "retiro") &&
    (pedido.metodoPago === "onepay" ||
      pedido.metodoPago === "webpay" ||
      pedido.metodoPago === "mercadopago" ||
      pedido.metodoPago === "transferencia")
  );
}

// "21 de agosto 2026, 13:44 hrs", el formato del diseño
function formatearFechaPedido(fechaIso: string) {
  const fecha = new Date(fechaIso);
  const dia = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long" }).format(fecha);
  const hora = new Intl.DateTimeFormat("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(fecha);
  return `${dia} ${fecha.getFullYear()}, ${hora} hrs`;
}

const RUTA = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Carrito" },
  { texto: "Check out", ruta: "/checkout" },
  { texto: "Confirmación de compra" },
];

function ConfirmacionCompra() {
  useTituloPagina("Confirmación de compra");
  const { state } = useLocation();
  const pedido = esConfirmacionPedido(state) ? state : null;

  if (!pedido) {
    return (
      <>
        <main className="confirmacion-compra">
          <section className="confirmacion-sin-pedido">
            <Icono nombre="detallePedido" />
            <h1>No encontramos los datos de tu compra</h1>
            <p>
              Esta confirmación está disponible justo después de completar el
              pago.
            </p>
            <Link to="/catalogo">Volver al catálogo</Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const direccion = pedido.direccionEntrega;
  const detalles: { icono: ComponentProps<typeof Icono>["nombre"]; titulo: string; valor: string }[] = [
    { icono: "bolsa", titulo: "Número de pedido", valor: pedido.idPedido },
    { icono: "fechaConfirmada", titulo: "Fecha y hora", valor: formatearFechaPedido(pedido.fecha) },
    {
      icono: pedido.metodoEnvio === "despacho" ? "envio" : "tienda",
      titulo: "Método de entrega",
      valor: pedido.metodoEnvio === "despacho" ? "Despacho a domicilio" : "Retiro en tienda",
    },
    ...(direccion
      ? [
          {
            icono: "ubicacion" as const,
            titulo: "Dirección de entrega",
            // Una dirección guardada trae la calle completa en "direccion"
            valor: [
              `${direccion.direccion} ${direccion.numero}`.trim(),
              direccion.depto,
              direccion.comuna,
              direccion.region,
            ]
              .filter(Boolean)
              .join(", "),
          },
        ]
      : []),
  ];

  return (
    <>
      <main className="confirmacion-compra">
        <RutaNavegacion elementos={RUTA} className="confirmacion-ruta" />

        <section className="confirmacion-exito" aria-labelledby="titulo-confirmacion">
          <img className="confirmacion-exito-icono" src={iconoConfirmado} alt="" />
          <div className="confirmacion-exito-mensaje">
            <h1 id="titulo-confirmacion">¡Compra confirmada!</h1>
            <p>
              {pedido.metodoEnvio === "despacho"
                ? "Gracias por tu compra, pronto comenzará el envío."
                : "Gracias por tu compra, pronto estará listo tu pedido."}
            </p>
            <p className="confirmacion-exito-correo">
              Hemos enviado los detalles de tu compra a tu correo electrónico{" "}
              <strong>{pedido.emailComprador}</strong>
            </p>
          </div>
        </section>

        <div className="confirmacion-pedido">
          <section className="confirmacion-tarjeta confirmacion-detalles" aria-labelledby="titulo-detalles-pedido">
            <h2 id="titulo-detalles-pedido">Detalles del pedido</h2>
            <dl className="confirmacion-lista-detalles">
              {detalles.map((detalle) => (
                <div className="confirmacion-detalle" key={detalle.titulo}>
                  <span className="confirmacion-detalle-icono" aria-hidden="true">
                    <Icono nombre={detalle.icono} />
                  </span>
                  <div>
                    <dt>{detalle.titulo}</dt>
                    <dd>{detalle.valor}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="confirmacion-tarjeta confirmacion-resumen"
            aria-labelledby="titulo-resumen-pedido"
          >
            <div className="confirmacion-resumen-cabecera">
              <h2 id="titulo-resumen-pedido">Resumen del pedido</h2>
              <span>
                {pedido.totalItems}{" "}
                {pedido.totalItems === 1 ? "elemento" : "elementos"}
              </span>
            </div>

            <ul className="confirmacion-productos">
              {pedido.items.map((item) => (
                <li className="confirmacion-producto" key={item.idLibro}>
                  <Portada
                    className="confirmacion-producto-portada"
                    src={item.portada}
                    alt={`Portada de ${item.titulo}`}
                  />
                  <div className="confirmacion-producto-datos">
                    <h3>{item.titulo}</h3>
                    {item.autor && <p className="confirmacion-producto-autor">{item.autor}</p>}
                    <p>
                      {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"}
                    </p>
                  </div>
                  <strong className="confirmacion-producto-precio">
                    {formatearPrecio(item.precioUnitario * item.cantidad)}
                  </strong>
                </li>
              ))}
            </ul>

            <dl className="confirmacion-finanzas">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatearPrecio(pedido.subtotal)}</dd>
              </div>
              <div className={pedido.descuento > 0 ? "confirmacion-descuento" : undefined}>
                <dt>Descuento</dt>
                <dd>-{formatearPrecio(pedido.descuento)}</dd>
              </div>
              <div>
                <dt>Envío</dt>
                <dd>{formatearPrecio(pedido.envio)}</dd>
              </div>
            </dl>

            <div className="confirmacion-total">
              <h3>Total</h3>
              <strong>{formatearPrecio(pedido.total)}</strong>
            </div>
            <p className="confirmacion-pago">
              <span>Método de pago</span>
              <span>{METODOS_PAGO[pedido.metodoPago]}</span>
            </p>
          </section>
        </div>

        <Link to="/catalogo" className="confirmacion-seguir-comprando">
          <span>Seguir comprando</span>
          <Icono nombre="siguiente" />
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default ConfirmacionCompra;
