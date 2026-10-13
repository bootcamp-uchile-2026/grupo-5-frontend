import { ErrorApi } from "../servicios/api";

// Mensajes para el usuario según el código "error" de la API
const MENSAJES: Record<string, string> = {
  CREDENCIALES_INVALIDAS: "El correo o la contraseña no son correctos.",
  EMAIL_YA_REGISTRADO: "Ya existe una cuenta con ese correo.",
  TOKEN_REQUERIDO: "Debes iniciar sesión para continuar.",
  TOKEN_INVALIDO: "Tu sesión expiró. Inicia sesión nuevamente.",
  NO_AUTORIZADO: "Tu sesión expiró. Inicia sesión nuevamente.",
  PERMISO_DENEGADO: "No tienes permiso para realizar esta acción.",
  USUARIO_NO_ENCONTRADO: "No encontramos tu cuenta.",
  LIBRO_NO_ENCONTRADO: "No encontramos este libro.",
  PEDIDO_NO_ENCONTRADO: "No encontramos este pedido.",
  RECURSO_NO_ENCONTRADO: "No encontramos lo que buscas.",
  RUTA_NO_ENCONTRADA: "No encontramos lo que buscas.",
  ID_INVALIDO: "No encontramos lo que buscas.",
  STOCK_INSUFICIENTE: "No hay stock suficiente de este libro.",
  ITEM_NO_ESTA_EN_CARRITO: "Este libro ya no está en tu carrito.",
  CARRITO_VACIO: "Tu carrito está vacío.",
  ENVIO_SIN_COBERTURA: "Por ahora no tenemos despacho a esa comuna.",
  ESTADO_PEDIDO_INVALIDO: "Este pedido ya no se puede modificar.",
  SEGUIMIENTO_NO_DISPONIBLE: "El seguimiento estará disponible cuando el pedido esté pagado.",
  PAGO_RECHAZADO: "El pago fue rechazado.",
  PASARELA_NO_DISPONIBLE: "La pasarela de pago no está disponible. Intenta más tarde.",
  VALIDATION_ERROR: "Revisa los datos ingresados.",
  SIN_CONEXION: "No pudimos conectarnos con el servidor. Revisa tu conexión e intenta nuevamente.",
};

// Motivos de rechazo del pago (campo "detalles" de PAGO_RECHAZADO)
const MOTIVOS_RECHAZO: Record<string, string> = {
  FONDOS_INSUFICIENTES: "La tarjeta no tiene fondos suficientes.",
  TARJETA_BLOQUEADA: "La tarjeta está bloqueada.",
  TARJETA_VENCIDA: "La tarjeta está vencida.",
};

const MENSAJE_GENERICO = "Ocurrió un error inesperado. Intenta nuevamente.";

// Mensaje claro para cualquier error (de la API o de un servicio dummy)
export function mensajeDeError(error: unknown): string {
  if (error instanceof ErrorApi) {
    const mensaje = MENSAJES[error.error] ?? MENSAJE_GENERICO;
    const motivo = error.detalles.map((detalle) => MOTIVOS_RECHAZO[detalle]).find(Boolean);
    return motivo ? `${mensaje} ${motivo}` : mensaje;
  }
  if (error instanceof Error && error.message) return error.message;
  return MENSAJE_GENERICO;
}
