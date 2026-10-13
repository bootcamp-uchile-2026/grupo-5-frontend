// DTO comunes de la API (Swagger: http://3.131.220.134:3000/docs)

// Estructura única de error de la API (ErrorResponseDto)
export type ErrorRespuestaDto = {
  statusCode: number;
  // Código del error, por ejemplo "CREDENCIALES_INVALIDAS"
  error: string;
  message: string;
  // Detalle por campo o por ítem (validaciones, stock, motivo de rechazo)
  detalles?: string[];
  timestamp?: string;
  path?: string;
  requestId?: string;
};

// Respuesta paginada (LibrosPaginadosDto)
export type PaginadoDto<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
