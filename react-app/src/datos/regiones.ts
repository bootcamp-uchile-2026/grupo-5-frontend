import type { Region } from "../tipos/pedido";

// Regiones de Chile con el código que usa la API (enum Region del Swagger)
// y sus comunas principales para el formulario de envío del checkout.
export type RegionChile = { codigo: Region; nombre: string; comunas: string[] };

export const REGIONES: RegionChile[] = [
  { codigo: "XV", nombre: "Arica y Parinacota", comunas: ["Arica", "Putre"] },
  { codigo: "I", nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte"] },
  {
    codigo: "II",
    nombre: "Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "San Pedro de Atacama"],
  },
  { codigo: "III", nombre: "Atacama", comunas: ["Copiapó", "Vallenar", "Caldera", "Chañaral"] },
  {
    codigo: "IV",
    nombre: "Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"],
  },
  {
    codigo: "V",
    nombre: "Valparaíso",
    comunas: [
      "Valparaíso",
      "Viña del Mar",
      "Quilpué",
      "Villa Alemana",
      "San Antonio",
      "Los Andes",
      "Quillota",
      "Isla de Pascua",
      "Juan Fernández",
    ],
  },
  {
    codigo: "RM",
    nombre: "Región Metropolitana",
    comunas: [
      "Santiago",
      "Providencia",
      "Ñuñoa",
      "Las Condes",
      "La Florida",
      "Maipú",
      "Puente Alto",
      "San Miguel",
      "Estación Central",
      "Recoleta",
      "Vitacura",
      "Peñalolén",
    ],
  },
  {
    codigo: "VI",
    nombre: "O'Higgins",
    comunas: ["Rancagua", "San Fernando", "Rengo", "Pichilemu", "Santa Cruz"],
  },
  { codigo: "VII", nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Constitución"] },
  { codigo: "XVI", nombre: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"] },
  {
    codigo: "VIII",
    nombre: "Biobío",
    comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Los Ángeles", "Coronel"],
  },
  {
    codigo: "IX",
    nombre: "La Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"],
  },
  { codigo: "XIV", nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"] },
  {
    codigo: "X",
    nombre: "Los Lagos",
    comunas: ["Puerto Montt", "Osorno", "Castro", "Puerto Varas", "Ancud"],
  },
  { codigo: "XI", nombre: "Aysén", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico"] },
  {
    codigo: "XII",
    nombre: "Magallanes",
    comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Antártica"],
  },
];

// Código de la API para el nombre de una región (p. ej. "Valparaíso" → "V")
export const codigoDeRegion = (nombre: string) =>
  REGIONES.find((region) => region.nombre === nombre)?.codigo;

export const comunasDe = (nombre: string) =>
  REGIONES.find((region) => region.nombre === nombre)?.comunas ?? [];
