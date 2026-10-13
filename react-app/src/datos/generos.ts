import { SUBGENEROS } from "./libros";

// Géneros y temáticas del desplegable de Catálogo
// (Figma: Componentes Global, nodes 2294:20831 y 2294:20860)
export type Columna = { titulo: string; opciones: string[] };

export const generos: Columna[] = [
  {
    titulo: "Ficción",
    opciones: [
      "Literatura contemporánea",
      "Misterio y thriller",
      "Fantasía",
      "Ciencia ficción",
      "Romance",
      "Terror",
      "Clásicos",
      "Distopía",
    ],
  },
  {
    titulo: "No ficción",
    opciones: [
      "Historia",
      "Filosofía",
      "Ciencia",
      "Sociedad",
      "Biografías",
      "Ensayo",
      "Crónica",
      "Naturaleza",
    ],
  },
  {
    titulo: "Arte y Diseño",
    opciones: [
      "Arte",
      "Diseño",
      "Fotografía",
      "Cine",
      "Música",
      "Arquitectura",
      "Ilustración",
      "Moda",
    ],
  },
  {
    titulo: "Bienestar",
    opciones: [
      "Psicología",
      "Desarrollo personal",
      "Esoterismo",
      "Tarot y oráculos",
      "Vida Saludable",
      "Nutrición",
      "Familia",
      "Autoayuda",
    ],
  },
  {
    titulo: "Negocios",
    opciones: [
      "Emprendimiento",
      "Finanzas",
      "Economía",
      "Liderazgo",
      "Marketing",
      "Innovación",
      "Productividad",
      "Tecnología",
    ],
  },
];

export const tematicas: Columna[] = [
  {
    titulo: "Para cada momento",
    opciones: [
      "Enamorarse",
      "Llorar",
      "Reír",
      "Emocionarse",
      "Sentirse acompañado",
      "Inquietarse",
    ],
  },
  {
    titulo: "Para pensar",
    opciones: [
      "Darle vueltas",
      "Cuestionarlo todo",
      "Cambiar de perspectiva",
      "Entender el mundo",
      "Conocerse mejor",
      "Aprender algo nuevo",
    ],
  },
  {
    titulo: "Para descubrir",
    opciones: [
      "Joyas escondidas",
      "Más allá del hype",
      "Autores por descubrir",
      "Historias que sorprenden",
      "Favoritos inesperados",
      "Merecen más atención",
    ],
  },
  {
    titulo: "Para compartir",
    opciones: [
      "Regalos",
      "Lecturas compartidas",
      "Para conversar",
      "Para alguien especial",
    ],
  },
];

// Grupo al que pertenece un género (p. ej. "Misterio y thriller" → "Ficción")
export function grupoDeGenero(genero: string) {
  const generoUx = generoDeUx(genero);
  return generos.find((columna) => columna.opciones.includes(generoUx))?.titulo;
}

// Géneros de UX que en la API tienen otro nombre. Los demás se buscan tal
// cual (Fantasía, Ciencia ficción, Historia… coinciden en ambos).
const GENERO_EN_API: Record<string, string> = {
  "Misterio y thriller": "Policial",
};

// Nombre del género para el parámetro "genero" de GET /libros
export function generoEnApi(genero: string) {
  return GENERO_EN_API[genero] ?? genero;
}

// Nombre de UX de un género de la API (p. ej. "Policial" → "Misterio y thriller")
function generoDeUx(genero: string) {
  return Object.keys(GENERO_EN_API).find((ux) => GENERO_EN_API[ux] === genero) ?? genero;
}

// Subgéneros diseñados para un género (con su nombre de UX o de la API)
export function subgenerosDe(genero: string) {
  return SUBGENEROS[generoDeUx(genero)] ?? [];
}

// Catálogo filtrado por un género del menú
export function rutaDeGenero(genero: string) {
  return `/catalogo?genero=${encodeURIComponent(genero)}`;
}
