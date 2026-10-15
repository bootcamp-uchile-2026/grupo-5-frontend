import { useNavigate } from "react-router-dom";
import { useCarritoStore } from "../estado/carritoStore";
import { agregarAlCarrito } from "../servicios/carritoServicio";
import type { AgregarAlCarritoRequest } from "../tipos/carrito";

// "Agregar al carrito" abre el panel del carrito; "Comprar ahora" agrega
// y lleva directo al checkout. Usado por la tarjeta de producto y la ficha.
export function useComprarLibro() {
  const navegar = useNavigate();

  return async function comprar(
    solicitud: AgregarAlCarritoRequest,
    irAlCheckout = false,
  ) {
    const agregado = await agregarAlCarrito(solicitud);
    if (agregado && irAlCheckout) {
      useCarritoStore.getState().cerrar();
      navegar("/checkout");
    }
  };
}
