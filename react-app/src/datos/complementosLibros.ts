import type { ComplementoLibro } from "../tipos/libro";

// DATOS DUMMY. Complementan los libros de la API (por ISBN) con lo que UX
// diseñó y Backend aún no expone: calificación, opiniones, ventas, precio
// anterior (descuento), subgénero, encuadernación, páginas, dimensiones y
// etiquetas. Reemplazar cuando Backend los entregue.

export const COMPLEMENTO_POR_DEFECTO: ComplementoLibro = {
  calificacion: 4,
  opiniones: 0,
  ventas: 0,
};

const TAPA_BLANDA = "Tapa blanda";
const TAPA_DURA = "Tapa dura";
const BOLSILLO = "13 x 19 cm";
const ESTANDAR = "15 x 23 cm";

export const COMPLEMENTOS_LIBROS: Record<string, ComplementoLibro> = {
  // 1984
  "9780451524935": {
    calificacion: 5,
    opiniones: 48,
    ventas: 120,
    precioAnterior: 10990,
    encuadernacion: TAPA_BLANDA,
    paginas: 328,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Distopía", "Clásico", "Política"],
  },
  // Asesinato en el Orient Express
  "9780062073501": {
    calificacion: 4.5,
    opiniones: 31,
    ventas: 64,
    subgenero: "Misterio policial",
    encuadernacion: TAPA_BLANDA,
    paginas: 256,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Misterio", "Detectives", "Clásico"],
  },
  // Breve historia del tiempo (audiolibro)
  "9780553380163": {
    calificacion: 4.5,
    opiniones: 12,
    ventas: 25,
    etiquetas: ["No ficción", "Ciencia", "Universo", "Divulgación"],
  },
  // Cien años de soledad
  "9780307474728": {
    calificacion: 5,
    opiniones: 56,
    ventas: 140,
    precioAnterior: 16990,
    encuadernacion: TAPA_BLANDA,
    paginas: 496,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Realismo mágico", "Clásico", "Latinoamérica"],
  },
  // Desolación
  "9789561100015": {
    calificacion: 4,
    opiniones: 9,
    ventas: 18,
    encuadernacion: TAPA_BLANDA,
    paginas: 176,
    dimensiones: BOLSILLO,
    etiquetas: ["Poesía", "Clásico", "Chile", "Nobel"],
  },
  // Dune
  "9780441172719": {
    calificacion: 4.5,
    opiniones: 27,
    ventas: 72,
    encuadernacion: TAPA_BLANDA,
    paginas: 688,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Ciencia ficción", "Épica", "Clásico"],
  },
  // El halcón maltés
  "9780679722649": {
    calificacion: 4,
    opiniones: 11,
    ventas: 22,
    subgenero: "Novela negra",
    encuadernacion: TAPA_BLANDA,
    paginas: 224,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Novela negra", "Detectives", "Clásico"],
  },
  // El hobbit
  "9780547928227": {
    calificacion: 5,
    opiniones: 40,
    ventas: 95,
    encuadernacion: TAPA_BLANDA,
    paginas: 320,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Fantasía", "Aventura", "Clásico"],
  },
  // El nombre del viento
  "9780756404741": {
    calificacion: 5,
    opiniones: 35,
    ventas: 88,
    precioAnterior: 21990,
    encuadernacion: TAPA_BLANDA,
    paginas: 880,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Fantasía", "Magia", "Saga"],
  },
  // El principito
  "9780156013925": {
    calificacion: 5,
    opiniones: 44,
    ventas: 130,
    encuadernacion: TAPA_DURA,
    paginas: 96,
    dimensiones: BOLSILLO,
    etiquetas: ["Infantil", "Clásico", "Fábula", "Filosofía"],
  },
  // El viento conoce mi nombre
  "9780593598108": {
    calificacion: 4.5,
    opiniones: 6,
    ventas: 15,
    encuadernacion: TAPA_DURA,
    paginas: 352,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Novela", "Historia", "Migración"],
  },
  // Fahrenheit 451
  "9781451673319": {
    calificacion: 4.5,
    opiniones: 22,
    ventas: 47,
    precioAnterior: 12990,
    encuadernacion: TAPA_BLANDA,
    paginas: 256,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Distopía", "Clásico", "Libros"],
  },
  // Fundación
  "9780553293357": {
    calificacion: 4.5,
    opiniones: 18,
    ventas: 39,
    encuadernacion: TAPA_BLANDA,
    paginas: 304,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Ciencia ficción", "Saga", "Clásico"],
  },
  // Harry Potter y la piedra filosofal
  "9788478884452": {
    calificacion: 5,
    opiniones: 62,
    ventas: 150,
    encuadernacion: TAPA_BLANDA,
    paginas: 264,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Fantasía", "Magia", "Saga"],
  },
  // La casa de los espíritus
  "9781501117015": {
    calificacion: 4.5,
    opiniones: 29,
    ventas: 58,
    precioAnterior: 15990,
    encuadernacion: TAPA_BLANDA,
    paginas: 496,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Realismo mágico", "Chile", "Familia"],
  },
  // La comunidad del anillo
  "9780547928210": {
    calificacion: 5,
    opiniones: 33,
    ventas: 76,
    encuadernacion: TAPA_BLANDA,
    paginas: 576,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Fantasía", "Épica", "Saga"],
  },
  // Las venas abiertas de América Latina
  "9780853459910": {
    calificacion: 4.5,
    opiniones: 15,
    ventas: 30,
    encuadernacion: TAPA_BLANDA,
    paginas: 384,
    dimensiones: ESTANDAR,
    etiquetas: ["No ficción", "Historia", "Latinoamérica", "Ensayo"],
  },
  // Los detectives salvajes
  "9788433920836": {
    calificacion: 4.5,
    opiniones: 17,
    ventas: 28,
    encuadernacion: TAPA_BLANDA,
    paginas: 624,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Novela", "Chile", "Poesía"],
  },
  // Los hombres que no amaban a las mujeres
  "9780307454546": {
    calificacion: 4.5,
    opiniones: 25,
    ventas: 54,
    precioAnterior: 13990,
    subgenero: "Thriller psicológico",
    encuadernacion: TAPA_BLANDA,
    paginas: 672,
    dimensiones: ESTANDAR,
    etiquetas: ["Ficción", "Thriller", "Misterio", "Saga"],
  },
  // Neuromante (e-book)
  "9780441569595": {
    calificacion: 4,
    opiniones: 10,
    ventas: 20,
    paginas: 288,
    etiquetas: ["Ficción", "Ciencia ficción", "Cyberpunk", "Clásico"],
  },
  // Papelucho
  "9789561200012": {
    calificacion: 5,
    opiniones: 21,
    ventas: 66,
    encuadernacion: TAPA_BLANDA,
    paginas: 112,
    dimensiones: BOLSILLO,
    etiquetas: ["Infantil", "Humor", "Chile", "Clásico"],
  },
  // Rayuela
  "9788437604572": {
    calificacion: 4.5,
    opiniones: 24,
    ventas: 41,
    precioAnterior: 17990,
    encuadernacion: TAPA_BLANDA,
    paginas: 736,
    dimensiones: BOLSILLO,
    etiquetas: ["Ficción", "Novela", "Experimental", "Latinoamérica"],
  },
  // Sapiens: de animales a dioses
  "9780062316097": {
    calificacion: 4.5,
    opiniones: 38,
    ventas: 84,
    encuadernacion: TAPA_BLANDA,
    paginas: 496,
    dimensiones: ESTANDAR,
    etiquetas: ["No ficción", "Historia", "Ciencia", "Sociedad"],
  },
  // Veinte poemas de amor y una canción desesperada
  "9780143039969": {
    calificacion: 5,
    opiniones: 26,
    ventas: 61,
    encuadernacion: TAPA_BLANDA,
    paginas: 112,
    dimensiones: BOLSILLO,
    etiquetas: ["Poesía", "Amor", "Chile", "Nobel"],
  },
};
