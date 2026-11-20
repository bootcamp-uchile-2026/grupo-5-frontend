// Reseñas dummy de la ficha (cuando VITE_API_URL está vacía). Son las del
// wireframe de Ficha de libro, escritas para "El perfume".

export type ResenaLibreroDummy = {
  nombre: string;
  calificacion: number;
  reseñas: number;
  texto: string[];
};

export type ResenaLectorDummy = {
  nombre: string;
  ubicacion: string;
  calificacion: number;
  fecha: string;
  texto: string;
};

export const RESENAS_LIBREROS: ResenaLibreroDummy[] = [
  {
    nombre: "Gregorio Samsa",
    calificacion: 5,
    reseñas: 56,
    texto: [
      "Hay libros que uno termina y puede guardar en el estante. El perfume no. Este se queda dando vueltas en la cabeza... y, de alguna manera, también en la nariz.",
      "Grenouille es un personaje difícil de querer, pero imposible de ignorar. Vive obsesionado con capturar aquello que los demás ni siquiera saben que están desprendiendo: su olor. Y mientras más intenta encontrar la esencia perfecta, más evidente se vuelve que quizás él mismo carece de una.",
      "Una historia oscura, perturbadora y extrañamente hermosa sobre la obsesión, la identidad y el deseo de ser alguien. Si alguna vez te has sentido invisible, quizás entiendas demasiado bien a Grenouille.",
    ],
  },
  {
    nombre: "Ana Karenina",
    calificacion: 4,
    reseñas: 83,
    texto: [
      "Me ha inquietado pensar cuánto puede desear una persona aquello que no puede nombrar. Grenouille no busca amor, aunque quizás toda su vida no haya hecho otra cosa que buscarlo. Quiere poseer la esencia de los demás porque nunca ha logrado encontrar la suya.",
      "Hay algo terrible en esa obsesión, pero también algo profundamente triste. Porque ¿qué somos cuando nadie puede percibirnos? ¿Y cuánto estaríamos dispuestos a hacer para sentir, aunque fuera una sola vez, que alguien nos desea? No es una historia de amor. Es, quizás, algo más incómodo: una historia sobre la necesidad desesperada de ser amado.",
    ],
  },
  {
    nombre: "Clara del Valle",
    calificacion: 5,
    reseñas: 41,
    texto: [
      "Una novela que se lee con todos los sentidos. Süskind consigue que el olfato, el sentido más olvidado, sea el protagonista de una historia inolvidable.",
    ],
  },
];

export const RESENAS_LECTORES: ResenaLectorDummy[] = [
  {
    nombre: "Daniela S.",
    ubicacion: "Copiapó, Chile",
    calificacion: 5,
    fecha: "Hace 5 días",
    texto: "Excelente libro, la película le hace honor a la historia original, recomendable.",
  },
  {
    nombre: "Luciano A.",
    ubicacion: "La Serena, Chile",
    calificacion: 3,
    fecha: "Hace 5 días",
    texto:
      "La primera mitad me atrapó muchísimo. Después sentí que la historia se volvió demasiado obsesionada con su propia filosofía.",
  },
  {
    nombre: "Cristian G.",
    ubicacion: "Santiago, Chile",
    calificacion: 4,
    fecha: "Hace 5 días",
    texto:
      "Lo terminé y tuve ganas de hacer algo impulsivo. Cinco minutos después se me pasó. Quizás ese era el punto.",
  },
  {
    nombre: "Andrés F.",
    ubicacion: "Santiago, Chile",
    calificacion: 5,
    fecha: "Hace 5 días",
    texto:
      "Me gustó el libro, pero debo admitir que visualmente la película me marcó más. Fincher hizo algo difícil de sacar de la cabeza.",
  },
  {
    nombre: "Valentina R.",
    ubicacion: "Valparaíso, Chile",
    calificacion: 5,
    fecha: "Hace 1 semana",
    texto: "Lo leí de una sentada. La forma en que describe los olores es increíble.",
  },
  {
    nombre: "Martín P.",
    ubicacion: "Concepción, Chile",
    calificacion: 4,
    fecha: "Hace 2 semanas",
    texto: "Perturbador y fascinante. No es para todos, pero vale mucho la pena.",
  },
];
