import type {
  CheckoutRequest,
  CheckoutResponse,
  DescuentoResponse,
} from "../tipos/checkout";

// Inicio de sesión y registro viven en authServicio.ts; se reexportan aquí
// porque el modal de autenticación y el checkout los importan desde este módulo.
export { iniciarSesion, registrarse } from "./authServicio";

const pausa = () => new Promise((r) => setTimeout(r, 300));

// Servicios dummy: reemplazar por HTTP/REST cuando Backend exponga /descuentos y /pedidos.

const DESCUENTOS: Record<string, number> = { LEE10: 10, BIENVENIDO: 15 };

export async function validarDescuento(
  codigo: string,
): Promise<DescuentoResponse> {
  await pausa();
  const clave = codigo.trim().toUpperCase();
  const porcentaje = DESCUENTOS[clave];
  if (!porcentaje) throw new Error("Código de descuento inválido");
  return { codigo: clave, porcentaje };
}

export async function crearPedido(
  solicitud: CheckoutRequest,
): Promise<CheckoutResponse> {
  await pausa();
  void solicitud;
  return { idPedido: `PED-${Date.now()}` };
}
