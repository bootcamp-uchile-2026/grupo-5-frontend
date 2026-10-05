import { useLocation } from "react-router-dom";
import "../estilos/confirmacion-compra.css";

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
      {/*--------------------------------------------------------------------------------------*/}

      {/*RUTA DE CATEGORÍA*/}
      <main className="confirmacion-compra">
        <div className="ruta-categoria">
          <a className="home" href="../index.html" aria-label="Volver al home">
            <img src="https://placehold.co/40x40" alt="Icono de casa" />
          </a>
          <p> &gt; Carro &gt; Check out &gt; Confirmación de compra</p>
        </div>

        {/*CONFIRMACIÓN DE COMPRA*/}
        <section className="texto-confirmacion">
          <div className="encabezado-confirmacion">
            <img src="https://placehold.co/200x200" alt="Icono de check" />
            <div className="contenido-confirmacion">
              <h1>¡Compra realizada, Nombre!</h1>
              <p>Tu pedido ha sido procesado con éxito.</p>
              <p>
                Te enviaremos un correo electrónico con los detalles de tu
                compra y la información de seguimiento.
              </p>
              <p>
                Si tienes alguna pregunta o necesitas asistencia, no dudes en
                contactarnos.
              </p>
            </div>
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
            </div>
            <div className="detalle-item">
              <img
                src="https://placehold.co/40x40"
                alt="Imagen del método de entrega"
              />
              <div className="detalle-texto">
                <strong>Método de entrega</strong>
                <span>Despacho a domicilio</span>
              </div>
            </div>
            <div className="detalle-item">
              <img
                src="https://placehold.co/40x40"
                alt="Imagen de la dirección de entrega"
              />
              <div className="detalle-texto">
                <strong>Dirección de entrega</strong>
                <span>
                  Lorem ipsum dolor sit amet,
                  <br />
                  Lorem ipsum dolor sit amet.
                </span>
              </div>
            </div>
          </section>

          {/*RESUMEN DEL PEDIDO*/}
          <section className="resumen-pedido">
            <div className="cabecera-resumen">
              <h2>Resumen del pedido</h2>
              <span>2 productos</span>
            </div>
            <div className="resumen-superior">
              <img src="https://placehold.co/100x100" alt="Imagen del libro" />
              <div className="contenido-resumen">
                <div className="datos-libro">
                  <h3>Nombre del libro</h3>
                  <p>
                    <strong>Nombre del autor</strong>
                  </p>
                  <p className="dato-con-separador dato-cantidad">
                    <strong>Cantidad:</strong> <span>2</span>
                  </p>
                </div>
              </div>
              <p className="precio-libro">$40.000</p>
            </div>

            <div className="resumen-financiero">
              <div className="fila-resumen">
                <span>Subtotal</span>
                <strong>$40.000</strong>
              </div>
              <div className="fila-resumen">
                <span>Envío</span>
                <strong>$3.000</strong>
              </div>
              <div className="fila-resumen">
                <span>Descuento</span>
                <strong>$0</strong>
              </div>
            </div>

            <div className="total-a-pagar">
              <h3>Total a pagar</h3>
              <h3 className="monto-total">{total}</h3>
            </div>

            <div className="metodo-de-pago">
              <p>
                <strong>Método de pago:</strong> Método de pago
              </p>
            </div>
          </section>
        </div>

        {/*MENÚ FINAL*/}
        <section className="menu-final">
          {/*VER MI PEDIDO*/}
          <div className="ver-mi-pedido">
            <a href="../index.html" aria-label="Volver al home">
              {" "}
              {/*CAMBIAR POR PANTALLA CORRECTA A FUTURO*/}
              <img src="https://placehold.co/40x40" alt="icono ver pedido" />
            </a>
            <h3>Ver mi pedido</h3>
            <p>Lore ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          {/*SEGUIR COMPRANDO*/}
          <div className="seguir-comprando">
            <a href="../index.html" aria-label="Volver al home">
              <img src="https://placehold.co/40x40" alt="seguir comprando" />
            </a>
            <h3>Seguir comprando</h3>
            <p>Lore ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          {/*CONOCE NUESTRA COMUNIDAD*/}
          <div className="conoce-comunidad">
            <a href="../comunidad.html" aria-label="Conoce nuestra comunidad">
              <img src="https://placehold.co/40x40" alt="conoce comunidad" />
            </a>
            <h3>Conoce nuestra comunidad</h3>
            <p>Lore ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </section>
      </main>

      {/*--------------------------------------------------------------------------------------*/}


    </>
  );
}

export default ConfirmacionCompra;
