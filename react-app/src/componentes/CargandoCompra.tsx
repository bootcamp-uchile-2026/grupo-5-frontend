import "../estilos/cargando-compra.css";

// Pantalla de espera entre el checkout y la confirmación de compra, mientras
// se crea el pedido (Figma: loading-book, node 3495:18208). La muestra el
// checkout en su misma ruta, así no se pierde lo que escribió el comprador si
// el pago falla.
export function CargandoCompra() {
  return (
    <main className="cargando-compra" role="status" aria-live="polite">
      <h1>¡Tu próxima lectura está cerca!</h1>
      <span className="cargando-compra-anillo" aria-hidden="true" />
      <span className="cargando-compra-texto-oculto">Estamos procesando tu compra.</span>
    </main>
  );
}
