import type { ComponentProps } from "react";

const iconos = {
  busqueda: "bi-search",
  usuario: "bi-person-circle",
  favorito: "bi-heart",
  favoritoActivo: "bi-heart-fill",
  bolsa: "bi-bag",
  envio: "bi-truck",
  tienda: "bi-shop",
  cerrar: "bi-x-lg",
  eliminar: "bi-x",
  papelera: "bi-trash",
  detallePedido: "bi-receipt",
  casaPuerta: "bi-house-door",
  confirmado: "bi-check-lg",
  fecha: "bi-calendar-event",
  ubicacion: "bi-geo-alt",
  informacion: "bi-info-circle",
  anterior: "bi-chevron-left",
  siguiente: "bi-chevron-right",
  compartir: "bi-share",
  compartirAccion: "bi-arrow-return-right",
  facebook: "bi-facebook",
  instagram: "bi-instagram",
  whatsapp: "bi-whatsapp",
  youtube: "bi-youtube",
  x: "bi-twitter-x",
  guardar: "bi-bookmark",
  guardarActivo: "bi-bookmark-fill",
  guardarVerificado: "bi-bookmark-check",
  guardarAgregar: "bi-bookmark-plus",
  guardarFavorito: "bi-bookmark-star",
  arriba: "bi-chevron-up",
  abajo: "bi-chevron-down",
  flechaDerecha: "bi-arrow-right",
  flechaIzquierda: "bi-arrow-left",
  flechaArriba: "bi-arrow-up",
  flechaAbajo: "bi-arrow-down",
  descuento: "bi-percent",
  libro: "bi-book",
  libros: "bi-book-half",
  editar: "bi-pencil",
  editarFormulario: "bi-pencil-square",
  comentario: "bi-chat-left-text",
  calificar: "bi-star",
  comunidad: "bi-people",
  comunidadUsuario: "bi-person-lines-fill",
  estadoCorrecto: "bi-check-circle",
  estadoError: "bi-x-circle",
  estadoAdvertencia: "bi-exclamation-triangle",
  estadoVacio: "bi-circle",
  estadoSeleccion: "bi-square",
  verificar: "bi-check2-square",
  verificarAlternativo: "bi-check-square",
  usuarioCuenta: "bi-person-badge",
  ver: "bi-eye",
  ocultar: "bi-eye-slash",
  configuracion: "bi-gear",
  inicio: "bi-house",
  inicioAlternativo: "bi-house-door",
  punto: "bi-circle-fill",
  actualizar: "bi-arrow-repeat",
  google: "bi-google",
} as const;

type IconoProps = {
  nombre: keyof typeof iconos;
  className?: string;
} & Omit<ComponentProps<"i">, "className" | "aria-hidden">;

export function Icono({ nombre, className, ...props }: IconoProps) {
  return (
    <i
      className={`icono bi ${iconos[nombre]}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      {...props}
    />
  );
}
