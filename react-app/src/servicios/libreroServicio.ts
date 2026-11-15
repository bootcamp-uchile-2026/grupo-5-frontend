import { LIBREROS, type Coleccion, type Librero } from "../datos/libreros";
import type { ColeccionResponseDto, LibreroPerfilDto } from "../tipos/librero";
import { solicitar, usarApi } from "./api";

// Servicio de libreros. Con API: GET /libreros/yo (perfil del librero con
// sesión). Sin API (VITE_API_URL vacía): el primer librero de los datos dummy.

// Colecciones visibles antes de pulsar "Ver más", como en el wireframe
const COLECCIONES_VISIBLES = 2;

// "2026-08-24" -> "Agosto 24, 2026", el formato del wireframe
function formatearFecha(fecha: string) {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const nombreMes = new Date(anio, mes - 1, dia).toLocaleDateString("es-CL", { month: "long" });
  return `${nombreMes.charAt(0).toUpperCase()}${nombreMes.slice(1)} ${dia}, ${anio}`;
}

function desdeColeccion(coleccion: ColeccionResponseDto): Coleccion {
  return {
    titulo: coleccion.titulo,
    descripcion: coleccion.descripcion ?? "",
    fecha: formatearFecha(coleccion.fecha),
  };
}

// Convierte el perfil de la API al formato que usa la vista Perfil del librero.
// El id es el slug, el mismo que usa la ruta pública /perfil-librero?librero=
function desdePerfilApi(perfil: LibreroPerfilDto): Librero {
  const colecciones = perfil.colecciones.map(desdeColeccion);
  return {
    id: perfil.slug,
    nombre: perfil.nombre,
    nombreCorto: perfil.nombreCorto,
    etiquetas: perfil.etiquetas,
    cita: perfil.cita ?? "",
    biografia: perfil.biografia,
    indispensables: perfil.indispensables.map(({ titulo, autor }) => ({ titulo, autor })),
    estilos: perfil.estilos,
    autores: perfil.autoresFavoritos,
    colecciones: colecciones.slice(0, COLECCIONES_VISIBLES),
    coleccionesExtra: colecciones.slice(COLECCIONES_VISIBLES),
    ultimasRecomendaciones: perfil.ultimasRecomendaciones.map(({ libro }) => ({
      titulo: libro.titulo,
      autor: libro.autor,
    })),
  };
}

// Perfil del librero con sesión iniciada. La API responde 403 si el usuario
// no es LIBRERO y 404 si su cuenta aún no tiene perfil de librero.
export async function obtenerMiPerfilLibrero(): Promise<Librero> {
  if (!usarApi) return LIBREROS[0];
  return desdePerfilApi(await solicitar<LibreroPerfilDto>("/libreros/yo"));
}
