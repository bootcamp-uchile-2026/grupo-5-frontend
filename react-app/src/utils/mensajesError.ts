// Mensajes para el usuario según el código "error" de la API. El cliente
// (servicios/api.ts) los usa como texto de cada ErrorApi, así cualquier
// pantalla que muestre error.message ve el mensaje claro.
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

// Nombre visible de los campos que nombra la API en sus validaciones
const CAMPOS: Record<string, string> = {
  nombre: "nombre",
  email: "correo",
  password: "contraseña",
  telefono: "teléfono",
  nombreReceptor: "nombre de quien recibe",
  calle: "dirección",
  comuna: "comuna",
  region: "región",
  cantidad: "cantidad",
  q: "búsqueda",
  numeroTarjeta: "número de tarjeta",
  titular: "titular",
  vencimiento: "vencimiento",
  cvv: "CVV",
};

const MENSAJE_GENERICO = "Ocurrió un error inesperado. Intenta nuevamente.";

// Campo de un detalle de validación: "email must be an email" → "email";
// "property apellido should not exist" → "apellido"
function campoDeDetalle(detalle: string) {
  const palabras = detalle.split(" ");
  return palabras[0] === "property" ? palabras[1] : palabras[0];
}

// Mensaje claro para un código de error de la API y sus detalles
export function mensajePorCodigo(codigo: string, detalles: string[] = []): string {
  const mensaje = MENSAJES[codigo] ?? MENSAJE_GENERICO;

  if (codigo === "PAGO_RECHAZADO") {
    const motivo = detalles.map((detalle) => MOTIVOS_RECHAZO[detalle]).find(Boolean);
    return motivo ? `${mensaje} ${motivo}` : mensaje;
  }

  if (codigo === "VALIDATION_ERROR" && detalles.length) {
    const campos = Array.from(
      new Set(detalles.map((detalle) => CAMPOS[campoDeDetalle(detalle)]).filter(Boolean)),
    );
    if (campos.length) return `Revisa los siguientes datos: ${campos.join(", ")}.`;
  }

  return mensaje;
}

// Mensaje claro para cualquier error (de la API o de un servicio dummy)
export function mensajeDeError(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return MENSAJE_GENERICO;
}
