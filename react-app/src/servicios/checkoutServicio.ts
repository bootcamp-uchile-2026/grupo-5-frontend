import { codigoDeRegion } from "../datos/regiones";
import { useSesionStore } from "../estado/sesionStore";
import type {
  CheckoutRequest,
  CheckoutResponse,
  CotizacionEnvio,
  DescuentoResponse,
  MetodoEnvio,
} from "../tipos/checkout";
import type {
  CotizacionEnvioDto,
  CotizarEnvioRequestDto,
  CrearPedidoRequestDto,
  MetodoEnvioApi,
  PedidoResponseDto,
} from "../tipos/pedido";
import { solicitar, usarApi } from "./api";

// Inicio de sesión y registro viven en authServicio.ts; se reexportan aquí
// porque el modal de autenticación y el checkout los importan desde este módulo.
export { iniciarSesion, registrarse } from "./authServicio";

const pausa = () => new Promise((r) => setTimeout(r, 300));

// Código de descuento: dummy (Backend no tiene descuentos).

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

const METODO_ENVIO_API: Record<MetodoEnvio, MetodoEnvioApi> = {
  despacho: "DESPACHO",
  retiro: "RETIRO",
};

// Costo y días de envío. Con API: POST /envios/cotizar (público, mismas
// reglas que usa Backend al crear el pedido). Sin API: costo fijo dummy.
export async function cotizarEnvio(datos: {
  metodoEnvio: MetodoEnvio;
  region?: string;
  comuna?: string;
  subtotal: number;
}): Promise<CotizacionEnvio> {
  if (!usarApi) {
    await pausa();
    const retiro = datos.metodoEnvio === "retiro";
    return { costo: retiro ? 0 : 1990, diasEstimados: retiro ? 1 : 3, gratis: false };
  }
  const cuerpo: CotizarEnvioRequestDto = {
    metodoEnvio: METODO_ENVIO_API[datos.metodoEnvio],
    region: datos.region ? codigoDeRegion(datos.region) : undefined,
    comuna: datos.comuna || undefined,
    subtotal: datos.subtotal,
  };
  const { costo, diasEstimados, gratis } = await solicitar<CotizacionEnvioDto>(
    "/envios/cotizar",
    { metodo: "POST", cuerpo },
  );
  return { costo, diasEstimados, gratis };
}

// Crea el pedido. Con sesión y API: POST /pedidos con el carrito de la cuenta;
// queda "pendiente de pago" (el pago con tarjeta aún no tiene diseño).
// Invitado o sin API: pedido dummy (Backend no permite comprar sin cuenta).
export async function crearPedido(solicitud: CheckoutRequest): Promise<CheckoutResponse> {
  if (!usarApi || !useSesionStore.getState().usuario?.token) {
    await pausa();
    return { idPedido: `PED-${Date.now()}` };
  }
  const region = solicitud.region ? codigoDeRegion(solicitud.region) : undefined;
  const cuerpo: CrearPedidoRequestDto = {
    metodoEnvio: METODO_ENVIO_API[solicitud.metodoEnvio],
    ...(solicitud.metodoEnvio === "despacho" && region
      ? {
          direccion: {
            nombreReceptor: solicitud.nombreReceptor ?? "",
            calle: [
              `${solicitud.direccion ?? ""} ${solicitud.numero ?? ""}`.trim(),
              solicitud.depto?.trim(),
            ]
              .filter(Boolean)
              .join(", "),
            comuna: solicitud.comuna ?? "",
            region,
            telefono: (solicitud.telefono ?? "").replace(/\s/g, ""),
          },
        }
      : {}),
  };
  const pedido = await solicitar<PedidoResponseDto>("/pedidos", { metodo: "POST", cuerpo });
  return { idPedido: pedido.numero, estado: pedido.estado };
}
