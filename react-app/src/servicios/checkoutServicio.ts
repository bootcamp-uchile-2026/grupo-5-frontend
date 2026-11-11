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
  CrearPedidoInvitadoRequestDto,
  CrearPedidoRequestDto,
  CuponAplicadoDto,
  DireccionDto,
  MetodoEnvioApi,
  PedidoInvitadoResponseDto,
  PedidoResponseDto,
  ValidarCuponRequestDto,
} from "../tipos/pedido";
import { ErrorApi, solicitar, usarApi } from "./api";

// Inicio de sesión y registro viven en authServicio.ts; se reexportan aquí
// porque el modal de autenticación y el checkout los importan desde este módulo.
export { iniciarSesion, registrarse } from "./authServicio";

const pausa = () => new Promise((r) => setTimeout(r, 300));

// Código de descuento. Con API: POST /cupones/validar (no consume el cupón;
// se aplica al crear el pedido con codigoDescuento). Sin API: cupones dummy.

const CUPONES_DUMMY: Record<string, DescuentoResponse> = {
  BIENVENIDA10: {
    codigo: "BIENVENIDA10",
    descripcion: "10% de descuento en tu primera compra",
    tipo: "PORCENTAJE",
    valor: 10,
  },
};

export async function validarDescuento(datos: {
  codigo: string;
  subtotal: number;
  email?: string;
}): Promise<DescuentoResponse> {
  const codigo = datos.codigo.trim().toUpperCase();
  if (!usarApi) {
    await pausa();
    const cupon = CUPONES_DUMMY[codigo];
    if (!cupon) {
      throw new ErrorApi({ statusCode: 404, error: "CUPON_NO_ENCONTRADO", message: codigo });
    }
    return cupon;
  }
  const cuerpo: ValidarCuponRequestDto = { codigo, subtotal: datos.subtotal, email: datos.email };
  const cupon = await solicitar<CuponAplicadoDto>("/cupones/validar", { metodo: "POST", cuerpo });
  return { codigo: cupon.codigo, descripcion: cupon.descripcion, tipo: cupon.tipo, valor: cupon.valor };
}

// Monto que descuenta un cupón sobre un subtotal (misma regla que Backend)
export function montoDelDescuento(descuento: DescuentoResponse | null, subtotal: number) {
  if (!descuento) return 0;
  const monto =
    descuento.tipo === "PORCENTAJE"
      ? Math.round((subtotal * descuento.valor) / 100)
      : descuento.valor;
  return Math.min(monto, subtotal);
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

// Dirección de despacho en el formato de la API (solo si es despacho)
function direccionApi(solicitud: CheckoutRequest): DireccionDto | undefined {
  const region = solicitud.region ? codigoDeRegion(solicitud.region) : undefined;
  if (solicitud.metodoEnvio !== "despacho" || !region) return undefined;
  return {
    nombreReceptor: solicitud.nombreReceptor ?? "",
    calle: [`${solicitud.direccion ?? ""} ${solicitud.numero ?? ""}`.trim(), solicitud.depto?.trim()]
      .filter(Boolean)
      .join(", "),
    comuna: solicitud.comuna ?? "",
    region,
    telefono: (solicitud.telefono ?? "").replace(/\s/g, ""),
  };
}

// PedidoResponseDto → número y montos que muestra la confirmación
const desdePedido = (pedido: PedidoResponseDto): CheckoutResponse => ({
  idPedido: pedido.numero,
  estado: pedido.estado,
  montos: {
    subtotal: pedido.subtotal,
    descuento: pedido.descuento,
    envio: pedido.costoEnvio,
    total: pedido.total,
  },
});

// Crea el pedido, que queda "pendiente de pago" (el pago con tarjeta aún no
// tiene diseño). Con sesión: POST /pedidos con el carrito de la cuenta.
// Invitado: POST /pedidos/invitado con los libros en el body. Sin API: dummy.
export async function crearPedido(solicitud: CheckoutRequest): Promise<CheckoutResponse> {
  if (!usarApi) {
    await pausa();
    return { idPedido: `PED-${Date.now()}` };
  }
  const cuerpo: CrearPedidoRequestDto = {
    metodoEnvio: METODO_ENVIO_API[solicitud.metodoEnvio],
    direccion: direccionApi(solicitud),
    codigoDescuento: solicitud.codigoDescuento,
  };
  if (useSesionStore.getState().usuario?.token) {
    return desdePedido(await solicitar<PedidoResponseDto>("/pedidos", { metodo: "POST", cuerpo }));
  }
  const cuerpoInvitado: CrearPedidoInvitadoRequestDto = {
    ...cuerpo,
    email: solicitud.email.trim(),
    nombre: solicitud.nombre?.trim() ?? "",
    items: solicitud.items.map((item) => ({ libroId: item.idLibro, cantidad: item.cantidad })),
  };
  const { pedido } = await solicitar<PedidoInvitadoResponseDto>("/pedidos/invitado", {
    metodo: "POST",
    cuerpo: cuerpoInvitado,
  });
  return desdePedido(pedido);
}
