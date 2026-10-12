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
  return generos.find((columna) => columna.opciones.includes(genero))?.titulo;
}

// Por ahora solo los géneros con subgéneros diseñados tienen página filtrada;
// el resto lleva al catálogo completo para no mostrar listas vacías.
export function rutaDeGenero(genero: string) {
  return genero in SUBGENEROS
    ? `/catalogo?categoria=${encodeURIComponent(genero)}`
    : "/catalogo";
}
