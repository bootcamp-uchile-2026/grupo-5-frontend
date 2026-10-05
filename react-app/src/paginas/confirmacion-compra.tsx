import { useLocation } from "react-router-dom";
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

function ConfirmacionCompra() {
  const estado = useLocation().state as
    | { idPedido?: string; total?: number }
    | null;
  const idPedido = estado?.idPedido ?? "123456789";
  const total =
    estado?.total !== undefined
      ? `$${estado.total.toLocaleString("es-CL")}`
      : "$43.000";
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

        <div className="pedido-informacion">
          {/*DETALLES DEL PEDIDO*/}
          <section className="detalles-pedido">
            <h2>Detalles del pedido</h2>
            <div className="detalle-item">
              <img
                src="https://placehold.co/40x40"
                alt="Imagen del número del pedido"
              />
              <div className="detalle-texto">
                <strong>Número de pedido</strong>
                <span>{idPedido}</span>
              </div>
            </div>
            <div className="detalle-item">
              <img
                src="https://placehold.co/40x40"
                alt="Imagen de fecha y hora"
              />
              <div className="detalle-texto">
                <strong>Fecha y hora</strong>
                <span>21 de agosto 2026, 13:40 hrs.</span>
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
            </div>

            <div className="total-a-pagar">
              <h3>Total a pagar</h3>
              <h3 className="monto-total">{total}</h3>
            </div>

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
