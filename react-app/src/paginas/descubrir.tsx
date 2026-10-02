import "../estilos/carrito.css";

function Descubrir() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        {/* HERO CONTENEDOR */}
        <div className="hero-contenedor">
          {/* HERO CENTENIDO */}
          <div className="hero-contenido">
            {/* HERO TÍTULO */}
            <div className="hero-titulo">
              <h2>Descubrir</h2>
            </div>
          </div>
        </div>
      </section>

      {/* CARRITO (VISTA SUPERPUESTA) */}
      <div className="carrito-overlay" id="carrito-overlay" hidden>
        <aside className="carrito-panel" aria-label="Carrito de compras">
          <div className="carrito-encabezado">
            <h3>Carrito</h3>

            <button
              className="carrito-cerrar"
              id="carrito-cerrar"
              type="button"
              aria-label="Cerrar carrito"
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>

          <div className="carrito-item">
            <div className="carrito-item-foto">
              Foto
              <br />
              libro
            </div>

            <div className="carrito-item-datos">
              <div className="carrito-item-fila">
                <span className="carrito-item-titulo">Título del libro</span>

                <div className="carrito-item-cantidad">
                  <button type="button" aria-label="Disminuir cantidad">
                    -
                  </button>

                  <span>1</span>

                  <button type="button" aria-label="Aumentar cantidad">
                    +
                  </button>
                </div>

                <button
                  className="carrito-item-eliminar"
                  type="button"
                  aria-label="Eliminar producto"
                >
                  <i className="bi bi-x" aria-hidden="true"></i>
                </button>
              </div>

              <span className="carrito-item-precio">$99.999</span>
            </div>
          </div>

          <hr className="carrito-separador" />

          <div className="carrito-sumario">
            <div className="carrito-sumario-fila">
              <span>Sumario:</span>
              <span>1 Item</span>
            </div>

            <div className="carrito-sumario-fila">
              <span>Subtotal:</span>
              <span>$99.999</span>
            </div>
          </div>

          <a className="carrito-pago" href="paginas/checkout.html">
            Pago seguro
          </a>

          <p className="carrito-envio-nota">
            El envío se calcula en el checkout
          </p>
        </aside>
      </div>

    </>
  );
}

export default Descubrir;
