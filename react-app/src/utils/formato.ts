// Formatos compartidos de la tienda

// Precio en pesos chilenos: "$18.830" (o "$ 18.830" en tarjetas y ficha,
// como en los wireframes)
export function formatearPrecio(valor: number, conEspacio = false) {
  return `$${conEspacio ? " " : ""}${valor.toLocaleString("es-CL")}`;
}

// Porcentaje de descuento redondeado; 0 si no hay precio anterior mayor
export function porcentajeDescuento(precio: number, precioAnterior?: number) {
  return precioAnterior && precioAnterior > precio
    ? Math.round((1 - precio / precioAnterior) * 100)
    : 0;
}
