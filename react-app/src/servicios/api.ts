import type { ErrorRespuestaDto } from "../tipos/api";

// Cliente de la API de LeeConNos: es el único módulo que conoce la URL base.
// Los servicios lo usan cuando hay API configurada (VITE_API_URL en .env);
// si no, siguen con sus datos dummy.
const URL_BASE = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/$/, "");

export const usarApi = URL_BASE !== "";

// Error de la API con el código del campo "error" (ej. "STOCK_INSUFICIENTE")
export class ErrorApi extends Error {
  statusCode: number;
  error: string;
  detalles: string[];
  requestId?: string;

  constructor(datos: ErrorRespuestaDto) {
    super(datos.message);
    this.name = "ErrorApi";
    this.statusCode = datos.statusCode;
    this.error = datos.error;
    this.detalles = datos.detalles ?? [];
    this.requestId = datos.requestId;
  }
}

// La sesión se conecta desde fuera para que este módulo no dependa del store
let obtenerToken: () => string | undefined = () => undefined;
let alVencerSesion: () => void = () => {};

export function configurarSesion(opciones: {
  obtenerToken: () => string | undefined;
  alVencerSesion: () => void;
}) {
  obtenerToken = opciones.obtenerToken;
  alVencerSesion = opciones.alVencerSesion;
}

type Parametros = Record<string, string | number | boolean | undefined>;

type OpcionesSolicitud = {
  metodo?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  cuerpo?: unknown;
  parametros?: Parametros;
};

export async function solicitar<T>(
  ruta: string,
  { metodo = "GET", cuerpo, parametros }: OpcionesSolicitud = {},
): Promise<T> {
  const url = new URL(`${URL_BASE}${ruta}`);
  Object.entries(parametros ?? {}).forEach(([nombre, valor]) => {
    if (valor !== undefined && valor !== "") {
      url.searchParams.set(nombre, String(valor));
    }
  });

  const token = obtenerToken();
  const encabezados: Record<string, string> = { Accept: "application/json" };
  if (cuerpo !== undefined) encabezados["Content-Type"] = "application/json";
  if (token) encabezados.Authorization = `Bearer ${token}`;

  let respuesta: Response;
  try {
    respuesta = await fetch(url, {
      method: metodo,
      headers: encabezados,
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
    });
  } catch {
    throw new ErrorApi({
      statusCode: 0,
      error: "SIN_CONEXION",
      message: "No se pudo conectar con la API",
    });
  }

  if (respuesta.status === 204) return null as T;

  const datos: unknown = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    // Token vencido o inválido: se cierra la sesión y se pide iniciarla de nuevo
    if (respuesta.status === 401 && token) alVencerSesion();
    const error = datos as Partial<ErrorRespuestaDto> | null;
    throw new ErrorApi({
      statusCode: respuesta.status,
      error: error?.error ?? "ERROR_HTTP",
      message: error?.message ?? respuesta.statusText,
      detalles: error?.detalles,
      requestId: error?.requestId ?? respuesta.headers.get("x-request-id") ?? undefined,
    });
  }

  return datos as T;
}
