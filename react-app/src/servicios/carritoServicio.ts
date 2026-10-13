import { resumenCarrito, useCarritoStore } from "../estado/carritoStore";
import { useSesionStore } from "../estado/sesionStore";
import type {
  ActualizarItemRequestDto,
  AgregarAlCarritoRequest,
  AgregarItemRequestDto,
  CarritoItemDto,
  CarritoResponse,
  CarritoResponseDto,
} from "../tipos/carrito";
import { mensajeDeError } from "../utils/mensajesError";
import { ErrorApi, solicitar, usarApi } from "./api";

// Servicio del carrito. Con sesión iniciada y API configurada, el carrito
// vive en Backend (GET/DELETE /carrito, POST /carrito/items y
// PATCH/DELETE /carrito/items/:libroId) y el store guarda una copia.
// Sin sesión (invitado) o sin API, el carrito es local (store persistido).
// Las funciones devuelven true si el cambio se guardó; si falla, el mensaje
// queda en el aviso del panel del carrito.

const conCarritoApi = () => usarApi && Boolean(useSesionStore.getState().usuario?.token);

// CarritoResponseDto (API) → ítems que muestran las pantallas
const desdeApi = (respuesta: CarritoResponseDto): CarritoItemDto[] =>
  respuesta.items.map((item) => ({
    idLibro: item.libroId,
    titulo: item.titulo,
    autor: item.autor,
    precioUnitario: item.precioUnitario,
    cantidad: item.cantidad,
    portada: item.portadaUrl ?? undefined,
    stockDisponible: item.stockDisponible,
    disponible: item.disponible,
  }));

// Ejecuta una operación en la API y deja en el store el carrito que devuelve
async function enApi(operacion: () => Promise<CarritoResponseDto | null>) {
  const store = useCarritoStore.getState();
  store.setActualizando(true);
  store.setAviso("");
  try {
    const respuesta = await operacion();
    useCarritoStore.getState().reemplazar(respuesta ? desdeApi(respuesta) : []);
    return true;
  } catch (error) {
    // Con la sesión vencida (401) ya se abre el inicio de sesión
    if (!(error instanceof ErrorApi && error.statusCode === 401)) {
      useCarritoStore.getState().setAviso(mensajeDeError(error));
      useCarritoStore.getState().abrir();
    }
    return false;
  } finally {
    useCarritoStore.getState().setActualizando(false);
  }
}

const rutaItem = (idLibro: string) => `/carrito/items/${encodeURIComponent(idLibro)}`;

export async function agregarAlCarrito(solicitud: AgregarAlCarritoRequest) {
  if (conCarritoApi()) {
    const cuerpo: AgregarItemRequestDto = {
      libroId: solicitud.idLibro,
      cantidad: solicitud.cantidad,
    };
    const guardado = await enApi(() =>
      solicitar<CarritoResponseDto>("/carrito/items", { metodo: "POST", cuerpo }),
    );
    if (guardado) useCarritoStore.getState().abrir();
    return guardado;
  }
  const { agregar, abrir, setAviso } = useCarritoStore.getState();
  setAviso("");
  agregar(solicitud);
  abrir();
  return true;
}

// Suma o resta unidades (botones + y − del panel); en 0 quita el libro
export async function cambiarCantidadCarrito(item: CarritoItemDto, delta: number) {
  const cantidad = item.cantidad + delta;
  if (cantidad < 1) return quitarDelCarrito(item.idLibro);
  if (conCarritoApi()) {
    const cuerpo: ActualizarItemRequestDto = { cantidad };
    return enApi(() =>
      solicitar<CarritoResponseDto>(rutaItem(item.idLibro), { metodo: "PATCH", cuerpo }),
    );
  }
  useCarritoStore.getState().cambiarCantidad(item.idLibro, delta);
  return true;
}

export async function quitarDelCarrito(idLibro: string) {
  if (conCarritoApi()) {
    return enApi(() =>
      solicitar<CarritoResponseDto>(rutaItem(idLibro), { metodo: "DELETE" }),
    );
  }
  useCarritoStore.getState().eliminar(idLibro);
  return true;
}

export async function vaciarCarrito() {
  if (conCarritoApi()) {
    return enApi(() => solicitar<null>("/carrito", { metodo: "DELETE" }));
  }
  useCarritoStore.getState().vaciar();
  return true;
}

// Trae el carrito de la cuenta (con sesión); sin sesión, el local
export async function obtenerCarrito(): Promise<CarritoResponse> {
  if (conCarritoApi()) {
    await enApi(() => solicitar<CarritoResponseDto>("/carrito"));
  }
  return resumenCarrito(useCarritoStore.getState().items);
}

// Al iniciar sesión: los libros que el invitado agregó se suman al carrito
// de su cuenta y luego se muestra el carrito completo de la API
async function pasarCarritoInvitadoACuenta() {
  const itemsInvitado = useCarritoStore.getState().items;
  const fallidos: string[] = [];
  for (const item of itemsInvitado) {
    try {
      await solicitar<CarritoResponseDto>("/carrito/items", {
        metodo: "POST",
        cuerpo: { libroId: item.idLibro, cantidad: item.cantidad } satisfies AgregarItemRequestDto,
      });
    } catch {
      fallidos.push(item.titulo);
    }
  }
  await obtenerCarrito();
  if (fallidos.length) {
    useCarritoStore
      .getState()
      .setAviso(`No pudimos pasar a tu cuenta: ${fallidos.join(", ")}.`);
  }
}

// Conecta el carrito con la sesión: al iniciarla pasa el carrito del invitado
// a la cuenta; al cerrarla vacía la copia local (el de la cuenta queda en
// Backend). Devuelve la función para dejar de escuchar.
export function vigilarSesionCarrito() {
  return useSesionStore.subscribe((estado, anterior) => {
    const token = estado.usuario?.token;
    if (!usarApi || token === anterior.usuario?.token) return;
    if (token) void pasarCarritoInvitadoACuenta();
    else useCarritoStore.getState().vaciar();
  });
}
