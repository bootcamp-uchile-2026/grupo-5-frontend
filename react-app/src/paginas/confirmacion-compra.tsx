import { Link, useLocation } from "react-router-dom";
import { Footer } from "../componentes/Footer";
import "../estilos/confirmacion-compra.css";
import type { ConfirmacionPedido, MetodoPago } from "../tipos/checkout";

const formatoPrecio = (valor: number) => `$${valor.toLocaleString("es-CL")}`;

const METODOS_PAGO: Record<MetodoPago, string> = {
  onepay: "Onepay",
  webpay: "Webpay",
  mercadopago: "Mercado Pago",
  transferencia: "Transferencia electrónica",
};

function ConfirmacionCompra() {
  const pedido = useLocation().state as ConfirmacionPedido | null;

  if (!pedido) {
    return (
      <>
        <main className="confirmacion-compra">
          <section className="confirmacion-sin-pedido">
            <i className="bi bi-receipt" aria-hidden="true"></i>
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
  const direccion = pedido.direccionEntrega;

  return (
    <>
      <main className="confirmacion-compra">
        <nav className="confirmacion-ruta" aria-label="Ruta de navegación">
          <Link to="/" aria-label="Inicio">
            <i className="bi bi-house-door" aria-hidden="true"></i>
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
            <i className="bi bi-check-lg"></i>
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
          <section
            className="confirmacion-detalles"
            aria-labelledby="titulo-detalles-pedido"
          >
            <h2 id="titulo-detalles-pedido">Detalles del pedido</h2>
            <dl className="confirmacion-lista-detalles">
              <div className="confirmacion-detalle">
                <span className="confirmacion-detalle-icono" aria-hidden="true">
                  <i className="bi bi-receipt"></i>
                </span>
                <div>
                  <dt>Número de pedido</dt>
                  <dd>{pedido.idPedido}</dd>
                </div>
              </div>
              <div className="confirmacion-detalle">
                <span className="confirmacion-detalle-icono" aria-hidden="true">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <div>
                  <dt>Fecha y hora</dt>
                  <dd>{fecha} hrs.</dd>
                </div>
              </div>
              <div className="confirmacion-detalle">
                <span className="confirmacion-detalle-icono" aria-hidden="true">
                  <i
                    className={`bi ${pedido.metodoEnvio === "despacho" ? "bi-truck" : "bi-shop"}`}
                  ></i>
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
              {direccion && (
                <div className="confirmacion-detalle">
                  <span className="confirmacion-detalle-icono" aria-hidden="true">
                    <i className="bi bi-geo-alt"></i>
                  </span>
                  <div>
                    <dt>Dirección de entrega</dt>
                    <dd>
                      {direccion.direccion} {direccion.numero}
                      {direccion.depto ? `, ${direccion.depto}` : ""}
                      <br />
                      {direccion.comuna}, {direccion.region}
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
                      <i className="bi bi-book" aria-hidden="true"></i>
                    </span>
                  )}
                  <div className="confirmacion-producto-datos">
                    <h3>{item.titulo}</h3>
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

        <nav className="confirmacion-acciones" aria-label="Acciones posteriores a la compra">
          <Link to="/mi-cuenta" className="confirmacion-accion">
            <i className="bi bi-receipt" aria-hidden="true"></i>
            <span>
              <strong>Ver mi pedido</strong>
              <small>Revisa los detalles de tu compra.</small>
            </span>
            <i className="bi bi-chevron-right" aria-hidden="true"></i>
          </Link>
          <Link to="/catalogo" className="confirmacion-accion">
            <i className="bi bi-bag" aria-hidden="true"></i>
            <span>
              <strong>Seguir comprando</strong>
              <small>Encuentra tu próxima lectura.</small>
            </span>
            <i className="bi bi-chevron-right" aria-hidden="true"></i>
          </Link>
          <Link to="/comunidad" className="confirmacion-accion">
            <i className="bi bi-people" aria-hidden="true"></i>
            <span>
              <strong>Conoce nuestra comunidad</strong>
              <small>Conecta con otros lectores.</small>
            </span>
            <i className="bi bi-chevron-right" aria-hidden="true"></i>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default ConfirmacionCompra;
