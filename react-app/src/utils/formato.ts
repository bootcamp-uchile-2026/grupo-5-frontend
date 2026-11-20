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

// Fecha de una reseña como en el wireframe: "Hoy", "Hace 5 días",
// "Hace 1 semana", "Hace 3 meses" o "Hace 1 año"
export function fechaRelativa(fecha: string, ahora = new Date()) {
  const dias = Math.max(0, Math.floor((ahora.getTime() - new Date(fecha).getTime()) / 86_400_000));
  const hace = (cantidad: number, singular: string, plural: string) =>
    `Hace ${cantidad} ${cantidad === 1 ? singular : plural}`;
  if (dias === 0) return "Hoy";
  if (dias < 7) return hace(dias, "día", "días");
  if (dias < 30) return hace(Math.floor(dias / 7), "semana", "semanas");
  if (dias < 365) return hace(Math.floor(dias / 30), "mes", "meses");
  return hace(Math.floor(dias / 365), "año", "años");
}
