import { useSesionStore } from "../estado/sesionStore";
import type {
  AuthResponseDto,
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegistroRequestDto,
  UsuarioResponseDto,
} from "../tipos/auth";
import type { LoginRequest, LoginResponse, RegistroRequest } from "../tipos/checkout";
import { ErrorApi, configurarRenovacion, solicitar, usarApi } from "./api";

// Servicio de autenticación. Con API: POST /auth/login, POST /auth/registro,
// GET /auth/me, POST /auth/refresh, POST /auth/verificar-email y
// POST /auth/reenviar-verificacion. Sin API (VITE_API_URL vacía):
// autenticación dummy.

const pausa = () => new Promise((resolver) => setTimeout(resolver, 300));

// La API entrega nombre y apellido por separado. Las cuentas anteriores al
// Hito 3 tienen apellido null y todo en "nombre": ahí se separa el texto
// para que el saludo "Hola, Nombre" muestre solo el nombre
function aSesion(usuario: UsuarioResponseDto, token: string): LoginResponse {
  const base = { id: usuario.id, rol: usuario.rol, email: usuario.email, token };
  if (usuario.apellido !== null) {
    return { ...base, nombre: usuario.nombre, apellido: usuario.apellido };
  }
  const [nombre = "", ...apellido] = usuario.nombre.trim().split(/\s+/);
  return { ...base, nombre, apellido: apellido.join(" ") };
}

const desdeAuthResponse = (respuesta: AuthResponseDto) => ({
  ...aSesion(respuesta.usuario, respuesta.accessToken),
  refreshToken: respuesta.refreshToken,
});

export async function iniciarSesion(solicitud: LoginRequest): Promise<LoginResponse> {
  if (!usarApi) return iniciarSesionDummy(solicitud);
  const cuerpo: LoginRequestDto = {
    email: solicitud.email.trim(),
    password: solicitud.password,
  };
  return desdeAuthResponse(
    await solicitar<AuthResponseDto>("/auth/login", { metodo: "POST", cuerpo }),
  );
}

export async function registrarse(solicitud: RegistroRequest): Promise<LoginResponse> {
  if (!usarApi) return registrarseDummy(solicitud);
  const cuerpo: RegistroRequestDto = {
    nombre: solicitud.nombre.trim(),
    apellido: solicitud.apellido.trim(),
    email: solicitud.email.trim(),
    password: solicitud.password,
    recibirNovedades: solicitud.recibirNovedades,
  };
  return desdeAuthResponse(
    await solicitar<AuthResponseDto>("/auth/registro", { metodo: "POST", cuerpo }),
  );
}

// VERIFICACIÓN DEL CORREO
// El correo que envía Backend al registrarse trae un enlace con un token.
// La web lo recibe en /verificar-correo?token=<token> (paginas/verificar-correo.tsx).

// POST /auth/verificar-email. Lanza un error si el enlace no es válido o venció.
// Sin API, el token "invalido" simula un enlace vencido.
export async function verificarCorreo(token: string): Promise<void> {
  if (!usarApi) {
    await pausa();
    if (!token || token === "invalido") {
      throw new ErrorApi({
        statusCode: 400,
        error: "ENLACE_INVALIDO",
        message: "El enlace de verificación no es válido o ha expirado",
      });
    }
    return;
  }
  await solicitar<unknown>("/auth/verificar-email", {
    metodo: "POST",
    cuerpo: { token },
    conSesion: false,
  });
}

// POST /auth/reenviar-verificacion. Requiere sesión: la API usa el correo de
// la cuenta. Responde 409 si la cuenta ya está verificada.
export async function reenviarVerificacion(): Promise<void> {
  if (!usarApi) {
    await pausa();
    return;
  }
  await solicitar<unknown>("/auth/reenviar-verificacion", { metodo: "POST" });
}

// Token vencido: pide uno nuevo con el refreshToken (POST /auth/refresh) y
// actualiza la sesión. api.ts la llama al recibir un 401 y repite la petición.
async function renovarSesion(): Promise<boolean> {
  const sesion = useSesionStore.getState().usuario;
  if (!usarApi || !sesion?.refreshToken) return false;
  try {
    const cuerpo: RefreshTokenRequestDto = { refreshToken: sesion.refreshToken };
    const respuesta = await solicitar<AuthResponseDto>("/auth/refresh", {
      metodo: "POST",
      cuerpo,
      conSesion: false,
    });
    useSesionStore.getState().iniciar({ ...sesion, ...desdeAuthResponse(respuesta) });
    return true;
  } catch {
    return false;
  }
}

configurarRenovacion(renovarSesion);

// Al cargar la app: valida el token guardado con GET /auth/me y actualiza
// los datos del usuario. Si venció, se renueva; si no se puede, cierra la
// sesión sin avisar.
export async function restaurarSesion(): Promise<void> {
  if (!usarApi || !useSesionStore.getState().usuario?.token) return;
  try {
    const actual = await solicitar<UsuarioResponseDto>("/auth/me", {
      avisarSesionVencida: false,
    });
    // Se lee de nuevo la sesión: el token pudo renovarse durante la petición
    const sesion = useSesionStore.getState().usuario;
    if (sesion) useSesionStore.getState().iniciar({ ...sesion, ...aSesion(actual, sesion.token) });
  } catch (error) {
    if (error instanceof ErrorApi && error.statusCode === 401) {
      useSesionStore.getState().cerrar();
    }
  }
}

// AUTENTICACIÓN DUMMY (sin API)

function nombreDesdeCorreo(email: string) {
  const base = email.split("@")[0].split(/[._-]/)[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

async function iniciarSesionDummy(solicitud: LoginRequest): Promise<LoginResponse> {
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

async function registrarseDummy(solicitud: RegistroRequest): Promise<LoginResponse> {
  await pausa();
  return {
    email: solicitud.email,
    nombre: solicitud.nombre,
    apellido: solicitud.apellido,
    token: "token-dummy",
  };
}
