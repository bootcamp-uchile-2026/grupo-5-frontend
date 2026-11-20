// DTO de autenticación según la API (Swagger: LoginDto, CreateUsuarioDto,
// AuthResponseDto y UsuarioResponseDto)
export type Rol = "CLIENTE" | "LIBRERO" | "ADMIN";

// Request de POST /auth/login
export type LoginRequestDto = {
  email: string;
  password: string;
};

// Request de POST /auth/registro (CreateUsuarioDto). "recibirNovedades"
// suscribe el correo al newsletter.
export type RegistroRequestDto = {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  generosFavoritos?: string[];
  recibirNovedades?: boolean;
};

// Response de GET /auth/me (y "usuario" dentro de AuthResponseDto)
// "apellido" es null en las cuentas creadas antes del Hito 3, que guardaban
// nombre y apellido juntos en "nombre"
export type UsuarioResponseDto = {
  id: string;
  nombre: string;
  apellido: string | null;
  nombreCompleto: string;
  email: string;
  rol: Rol;
  generosFavoritos: string[];
  avatarUrl: string | null;
  recibirNovedades: boolean;
  emailVerificado: boolean;
  creadoEn: string;
};

// Response de POST /auth/login, POST /auth/registro y POST /auth/refresh.
// El accessToken dura poco (expiresIn, p. ej. "2h"); el refreshToken permite
// pedir uno nuevo sin la contraseña mientras siga vigente (refreshExpiresIn)
export type AuthResponseDto = {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  refreshToken: string;
  refreshExpiresIn: string;
  usuario: UsuarioResponseDto;
};

// Request de POST /auth/refresh
export type RefreshTokenRequestDto = { refreshToken: string };
