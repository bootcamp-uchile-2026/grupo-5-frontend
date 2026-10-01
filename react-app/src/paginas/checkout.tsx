import "../estilos/carrito.css";
import "../estilos/checkout.css";

function Checkout() {
  return (
    <>
      <main className="checkout">
        {/*MIGA DE PAN*/}
        <nav className="checkout-breadcrumb" aria-label="Ruta de navegación">
          <a href="../index.html" aria-label="Inicio">
            <i className="bi bi-house" aria-hidden="true"></i>
          </a>
          <span aria-hidden="true">&gt;</span>
          <a href="#">Carro</a>
          <span aria-hidden="true">&gt;</span>
          <span aria-current="page">Check out</span>
        </nav>

        <div className="checkout-contenedor">
          {/*FORMULARIO DE CHECKOUT*/}
          <form
            className="checkout-formulario"
            action="confirmacion-compra.html"
            method="get"
          >
            {/*INFORMACIÓN DE CONTACTO*/}
            <section className="checkout-tarjeta">
              <h2>Información de contacto</h2>
              <div className="checkout-campo">
                <label htmlFor="checkout-email">Dirección de correo*</label>
                <input
                  type="email"
                  id="checkout-email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="checkout-campo">
                <label htmlFor="checkout-telefono">Número de teléfono*</label>
                <input
                  type="tel"
                  id="checkout-telefono"
                  name="telefono"
                  autoComplete="tel"
                  required
                />
              </div>
            </section>

            {/*MÉTODO DE ENVÍO*/}
            <section className="checkout-tarjeta">
              <h2>Método de envío</h2>
              <div className="checkout-envio-opciones">
                <label className="checkout-envio-opcion">
                  <input
                    type="radio"
                    name="metodo-envio"
                    value="despacho"
                    defaultChecked
                  />
                  <span>Despacho a domicilio</span>
                </label>
                <label className="checkout-envio-opcion">
                  <input type="radio" name="metodo-envio" value="retiro" />
                  <span>Retiro en tienda</span>
                </label>
              </div>
            </section>

            {/*INFORMACIÓN DE ENVÍO*/}
            <section className="checkout-tarjeta">
              <h2>Información de envío</h2>
              <div className="checkout-campo">
                <label htmlFor="checkout-nombre">Nombre y apellido*</label>
                <input
                  type="text"
                  id="checkout-nombre"
                  name="nombre"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="checkout-campo">
                <label htmlFor="checkout-direccion">Dirección*</label>
                <input
                  type="text"
                  id="checkout-direccion"
                  name="direccion"
                  autoComplete="street-address"
                  required
                />
              </div>
              <div className="checkout-campo">
                <label htmlFor="checkout-comuna">Comuna*</label>
                <input
                  type="text"
                  id="checkout-comuna"
                  name="comuna"
                  required
                />
              </div>
              <div className="checkout-campo">
                <label htmlFor="checkout-region">Región*</label>
                <input
                  type="text"
                  id="checkout-region"
                  name="region"
                  required
                />
              </div>
            </section>

            {/*MÉTODO DE PAGO*/}
            <section className="checkout-tarjeta">
              <h2>Método de pago</h2>
              <div className="checkout-pago-opciones">
                <label className="checkout-pago-opcion">
                  <input
                    type="radio"
                    name="metodo-pago"
                    value="tarjeta"
                    defaultChecked
                  />
                  <span>Tarjeta de crédito o débito</span>
                </label>
                <label className="checkout-pago-opcion">
                  <input type="radio" name="metodo-pago" value="webpay" />
                  <span>Webpay</span>
                </label>
                <label className="checkout-pago-opcion">
                  <input
                    type="radio"
                    name="metodo-pago"
                    value="transferencia"
                  />
                  <span>Transferencia bancaria</span>
                </label>
              </div>
            </section>

            {/*TÉRMINOS Y PAGO*/}
            <label className="checkout-terminos">
              <input type="checkbox" name="terminos" required />
              <span>He leído y acepto los términos y condiciones</span>
            </label>
            <button className="checkout-pagar" type="submit">
              Pagar ahora
            </button>
          </form>

          {/*RESUMEN DEL PEDIDO*/}
          <aside className="checkout-resumen" aria-label="Resumen del pedido">
            <div className="checkout-resumen-encabezado">
              <h2>Resumen del pedido</h2>
              <span className="checkout-resumen-cantidad">
                número de productos
              </span>
            </div>

            <div className="checkout-resumen-item">
              <div className="checkout-resumen-foto">
                Imagen
                <br />
                del libro
              </div>
              <div className="checkout-resumen-datos">
                <p className="checkout-resumen-titulo">Nombre del libro</p>
                <p>Autor</p>
                <p>Cantidad</p>
              </div>
              <span className="checkout-resumen-precio">$123.456</span>
            </div>

            <div className="checkout-descuento">
              <input
                type="text"
                placeholder="Código de descuento"
                aria-label="Código de descuento"
              />
              <button type="button">Aplicar</button>
            </div>

            <hr className="checkout-separador" />

            <div className="checkout-resumen-filas">
              <div className="checkout-resumen-fila">
                <span>Subtotal</span>
                <span>$123.456</span>
              </div>
              <div className="checkout-resumen-fila">
                <span>Envío</span>
                <span>$123.456</span>
              </div>
              <div className="checkout-resumen-fila">
                <span>Descuento</span>
                <span>$123.456</span>
              </div>
            </div>

            <div className="checkout-total">
              <span>Total pagado</span>
              <span className="checkout-total-monto">$99.999</span>
            </div>
            <div className="checkout-resumen-fila checkout-metodo-seleccionado">
              <span>Método de pago</span>
              <span>método de pago</span>
            </div>
          </aside>
        </div>
      </main>

          {/*CARRITO (VISTA SUPERPUESTA)*/}
    <div className="carrito-overlay" id="carrito-overlay" hidden>
        <aside className="carrito-panel" aria-label="Carrito de compras">
            <div className="carrito-encabezado">
                <h3>Carrito</h3>
                <button className="carrito-cerrar" id="carrito-cerrar" type="button" aria-label="Cerrar carrito"><i className="bi bi-x-lg" aria-hidden="true"></i></button>
            </div>

            <div className="carrito-item">
                <div className="carrito-item-foto">Foto<br/>libro</div>
                <div className="carrito-item-datos">
                    <div className="carrito-item-fila">
                        <span className="carrito-item-titulo">Título del libro</span>
                        <div className="carrito-item-cantidad">
                            <button type="button" aria-label="Disminuir cantidad">-</button>
                            <span>1</span>
                            <button type="button" aria-label="Aumentar cantidad">+</button>
                        </div>
                        <button className="carrito-item-eliminar" type="button" aria-label="Eliminar producto"><i className="bi bi-x" aria-hidden="true"></i></button>
                    </div>
                    <span className="carrito-item-precio">$99.999</span>
                </div>
            </div>

            <hr className="carrito-separador"/>

            <div className="carrito-sumario">
                <div className="carrito-sumario-fila"><span>Sumario:</span><span>1 Item</span></div>
                <div className="carrito-sumario-fila"><span>Subtotal:</span><span>$99.999</span></div>
            </div>

            <a className="carrito-pago" href="checkout.html">Pago seguro</a>
            <p className="carrito-envio-nota">El envío se calcula en el checkout</p>
        </aside>
    </div>


    </>
  );
}

export default Checkout;