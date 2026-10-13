// DTO de autenticación según la API (Swagger: LoginDto, CreateUsuarioDto,
// AuthResponseDto y UsuarioResponseDto)
export type Rol = "CLIENTE" | "LIBRERO" | "ADMIN";

// Request de POST /auth/login
export type LoginRequestDto = {
  email: string;
  password: string;
};

// Request de POST /auth/registro. La API rechaza campos que no declara
// (por ejemplo "apellido"), por eso nombre y apellido van juntos en "nombre".
export type RegistroRequestDto = {
  nombre: string;
  email: string;
  password: string;
  generosFavoritos?: string[];
};

// Response de GET /auth/me (y "usuario" dentro de AuthResponseDto)
export type UsuarioResponseDto = {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  generosFavoritos: string[];
  avatarUrl: string | null;
  creadoEn: string;
};

// Response de POST /auth/login y POST /auth/registro
export type AuthResponseDto = {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  usuario: UsuarioResponseDto;
};
