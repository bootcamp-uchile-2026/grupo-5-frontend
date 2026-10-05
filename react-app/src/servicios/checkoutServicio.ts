import type {
  CheckoutRequest,
  CheckoutResponse,
  DescuentoResponse,
  LoginRequest,
  LoginResponse,
} from "../tipos/checkout";

function nombreDesdeCorreo(email: string) {
  const base = email.split("@")[0].split(/[._-]/)[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

const pausa = () => new Promise((r) => setTimeout(r, 300));

// Servicios dummy: reemplazar por HTTP/REST cuando Backend exponga /auth/login, /descuentos y /pedidos.
export async function iniciarSesion(
  solicitud: LoginRequest,
): Promise<LoginResponse> {
  await pausa();
  return {
    email: solicitud.email,
    nombre: nombreDesdeCorreo(solicitud.email),
    apellido: "Ejemplo",
    token: "token-dummy",
    direccionGuardada: {
      direccion: "Avenida siempre viva",
      numero: "555",
      depto: "Casa",
      region: "Región Metropolitana",
      comuna: "Santiago",
      telefono: "961528497",
    },
  };
}

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
