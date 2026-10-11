import { Link, useLocation } from "react-router-dom";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import "../estilos/confirmacion-compra.css";
import type {
  ConfirmacionPedido,
  MetodoPago,
} from "../tipos/checkout";

const formatoPrecio = (valor: number) => `$${valor.toLocaleString("es-CL")}`;

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

function ConfirmacionCompra() {
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

  const fecha = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
    hourCycle: "h23",
  }).format(new Date(pedido.fecha));

  return (
    <>
      <main className="confirmacion-compra">
        <nav className="confirmacion-ruta" aria-label="Ruta de navegación">
          <Link to="/" aria-label="Inicio">
            <Icono nombre="casaPuerta" />
          </Link>
          <div className="confirmacion-ruta-pasos">
            <Link to="/catalogo">Carro</Link>
            <span aria-hidden="true">›</span>
            <Link to="/checkout">Check out</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Confirmación de compra</span>
          </div>
        </nav>

        <section className="confirmacion-exito" aria-labelledby="titulo-confirmacion">
          <div className="confirmacion-exito-icono" aria-hidden="true">
            <Icono nombre="confirmado" />
          </div>
          <div>
            <h1 id="titulo-confirmacion">
              ¡Compra realizada, {pedido.nombreComprador}!
            </h1>
            <p>
              Tu pedido fue procesado correctamente. Enviaremos los detalles de
              la compra a <strong>{pedido.emailComprador}</strong>.
            </p>
          </div>
        </section>

        <div className="confirmacion-pedido">
          <section className="confirmacion-detalles">
            <h2>Detalles del pedido</h2>
            <dl className="confirmacion-lista-detalles">
              <div className="confirmacion-detalle">
                <span className="confirmacion-detalle-icono" aria-hidden="true">
                  <Icono nombre="detallePedido" />
                </span>
                <div>
                  <dt>Número de pedido</dt>
                  <dd>{pedido.idPedido}</dd>
                </div>
              </div>
              <div className="confirmacion-detalle">
                <span className="confirmacion-detalle-icono" aria-hidden="true">
                  <Icono nombre="fecha" />
                </span>
                <div>
                  <dt>Fecha y hora</dt>
                  <dd>{fecha}</dd>
                </div>
              </div>
              <div className="confirmacion-detalle">
                <span className="confirmacion-detalle-icono" aria-hidden="true">
                  <Icono
                    nombre={pedido.metodoEnvio === "despacho" ? "envio" : "tienda"}
                  />
                </span>
                <div>
                  <dt>Método de entrega</dt>
                  <dd>
                    {pedido.metodoEnvio === "despacho"
                      ? "Despacho a domicilio"
                      : "Retiro en tienda"}
                  </dd>
                </div>
              </div>
              {pedido.direccionEntrega && (
                <div className="confirmacion-detalle">
                  <span className="confirmacion-detalle-icono" aria-hidden="true">
                    <Icono nombre="ubicacion" />
                  </span>
                  <div>
                    <dt>Dirección de entrega</dt>
                    <dd>
                      {pedido.direccionEntrega.direccion}{" "}
                      {pedido.direccionEntrega.numero}
                      {pedido.direccionEntrega.depto
                        ? `, ${pedido.direccionEntrega.depto}`
                        : ""}
                      <br />
                      {pedido.direccionEntrega.comuna},{" "}
                      {pedido.direccionEntrega.region}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </section>

          <section
            className="confirmacion-resumen"
            aria-labelledby="titulo-resumen-pedido"
          >
            <div className="confirmacion-resumen-cabecera">
              <h2 id="titulo-resumen-pedido">Resumen del pedido</h2>
              <span>
                {pedido.totalItems}{" "}
                {pedido.totalItems === 1 ? "producto" : "productos"}
              </span>
            </div>

            <ul className="confirmacion-productos">
              {pedido.items.map((item) => (
                <li className="confirmacion-producto" key={item.idLibro}>
                  {item.portada ? (
                    <img
                      className="confirmacion-producto-portada"
                      src={item.portada}
                      alt={`Portada de ${item.titulo}`}
                    />
                  ) : (
                    <span
                      className="confirmacion-producto-sin-portada"
                      aria-label={`Sin portada para ${item.titulo}`}
                    >
                      <Icono nombre="libro" />
                    </span>
                  )}
                  <div className="confirmacion-producto-datos">
                    <h3>{item.titulo}</h3>
                    {item.autor && <p>{item.autor}</p>}
                    <p>Cantidad: {item.cantidad}</p>
                  </div>
                  <strong className="confirmacion-producto-precio">
                    {formatoPrecio(item.precioUnitario * item.cantidad)}
                  </strong>
                </li>
              ))}
            </ul>

            <dl className="confirmacion-finanzas">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatoPrecio(pedido.subtotal)}</dd>
              </div>
              <div>
                <dt>Envío</dt>
                <dd>{formatoPrecio(pedido.envio)}</dd>
              </div>
              <div>
                <dt>Descuento</dt>
                <dd>-{formatoPrecio(pedido.descuento)}</dd>
              </div>
            </dl>

            <div className="confirmacion-total">
              <h3>Total pagado</h3>
              <strong>{formatoPrecio(pedido.total)}</strong>
            </div>
            <p className="confirmacion-pago">
              <strong>Método de pago</strong>
              <span>{METODOS_PAGO[pedido.metodoPago]}</span>
            </p>
          </section>
        </div>

        <nav
          className="confirmacion-acciones"
          aria-label="Acciones posteriores a la compra"
        >
          <Link to="/mi-cuenta" className="confirmacion-accion">
            <Icono nombre="detallePedido" />
            <span>
              <strong>Ver mi pedido</strong>
              <small>Revisa los detalles de tu compra.</small>
            </span>
            <Icono nombre="siguiente" />
          </Link>
          <Link to="/catalogo" className="confirmacion-accion">
            <Icono nombre="bolsa" />
            <span>
              <strong>Seguir comprando</strong>
              <small>Encuentra tu próxima lectura.</small>
            </span>
            <Icono nombre="siguiente" />
          </Link>
          <Link to="/comunidad" className="confirmacion-accion">
            <Icono nombre="comunidad" />
            <span>
              <strong>Conoce nuestra comunidad</strong>
              <small>Conecta con otros lectores.</small>
            </span>
            <Icono nombre="siguiente" />
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default ConfirmacionCompra;
