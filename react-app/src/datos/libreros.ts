// Datos dummy de los perfiles de libreros (sin Backend aún).
// Contenido de los wireframes "Perfiles de libreros" (Figma: Wireframes
// Desktop, nodes 1547:4321, 1547:4583, 1547:4849 y 1584:4835).

export type LibroLibrero = { titulo: string; autor: string };

export type Coleccion = {
  titulo: string;
  descripcion: string;
  fecha: string;
};

export type Librero = {
  id: string;
  nombre: string;
  nombreCorto: string;
  etiquetas: string[];
  cita: string;
  biografia: string;
  indispensables: LibroLibrero[];
  estilos: string[];
  autores: string[];
  colecciones: Coleccion[];
  // Se muestra al pulsar "Ver más" en Colecciones
  coleccionExtra: Coleccion;
  ultimasRecomendaciones: LibroLibrero[];
};

export const LIBREROS: Librero[] = [
  {
    id: "gregorio-samsa",
    nombre: "Gregorio Samsa",
    nombreCorto: "Gregorio S.",
    etiquetas: ["Existencialismo", "Distopía", "Contemporáneo"],
    cita: "“Me gustan los libros que terminan y te dejan mirando el techo un rato.”",
    biografia:
      "Te recomiendo historias extrañas, incómodas y profundamente humanas. Me interesan los personajes que no terminan de encajar, las sociedades que parecen funcionar pero no tanto y los libros que dejan más preguntas que respuestas.",
    indispensables: [
      { titulo: "El proceso", autor: "Franz Kafka" },
      { titulo: "El extranjero", autor: "Albert Camus" },
      { titulo: "1984", autor: "George Orwell" },
      { titulo: "Ensayo sobre la ceguera", autor: "José Saramago" },
      { titulo: "Nunca me abandones", autor: "Kazuo Ishiguro" },
    ],
    estilos: [
      "Existencialismo",
      "Distopía",
      "Contemporáneo",
      "Ficción Psicológica",
      "Crítica Social",
      "Terror Psicológico",
    ],
    autores: ["Franz Kafka", "Milan Kundera", "Han Kang", "George Orwell"],
    colecciones: [
      {
        titulo: "Para cuando todo te parece absurdo",
        descripcion: "5 libros para una crisis existencial",
        fecha: "Agosto 24, 2026",
      },
      {
        titulo: "Personajes difíciles de olvidar",
        descripcion: "Historias protagonizadas por personas bastante complicadas",
        fecha: "Marzo 03, 2026",
      },
      {
        titulo: "No todo está bien",
        descripcion: "Distopías que se parecen demasiado a nosotros",
        fecha: "Enero 09, 2026",
      },
    ],
    coleccionExtra: {
      titulo: "Lecturas para noches largas",
      descripcion: "Libros que siguen contigo después de cerrar la última página",
      fecha: "Octubre 18, 2025",
    },
    ultimasRecomendaciones: [
      { titulo: "Piranesi", autor: "Susanna Clarke" },
      { titulo: "Klara y el Sol", autor: "Kazuo Ishiguro" },
      { titulo: "La vegetariana", autor: "Han Kang" },
      { titulo: "El hombre en el castillo", autor: "Philip K. Dick" },
    ],
  },
  {
    id: "ana-karenina",
    nombre: "Ana Karenina",
    nombreCorto: "Ana Karenina",
    etiquetas: ["Romance", "Drama", "Clásicos", "Realismo"],
    cita: "“Me interesan las historias donde amar a alguien también significa enfrentarse a una misma.”",
    biografia:
      "Te recomiendo historias donde el amor no siempre llega en el momento correcto, donde las decisiones tienen consecuencias y los personajes deben elegir entre lo que desean y lo que se espera de ellos. Me interesan las relaciones complejas, las emociones contenidas y esas novelas que siguen dando vueltas en la cabeza mucho después de terminarlas.",
    indispensables: [
      { titulo: "La edad de la inocencia", autor: "Edith Wharton" },
      { titulo: "Madame Bovary", autor: "Gustave Flaubert" },
      { titulo: "Orgullo y prejuicio", autor: "Jane Austen" },
      { titulo: "La señora Dalloway", autor: "Virginia Woolf" },
      { titulo: "El amante", autor: "Marguerite Duras" },
    ],
    estilos: [
      "Romance",
      "Drama psicológico",
      "Realismo",
      "Clásicos",
      "Ficción literaria",
      "Relaciones humanas",
    ],
    autores: ["Edith Wharton", "Virginia Woolf", "Gustave Flaubert", "Marguerite Duras"],
    colecciones: [
      {
        titulo: "Amar también es complicarse la vida",
        descripcion: "Historias donde enamorarse es apenas el comienzo del problema.",
        fecha: "Agosto 24, 2026",
      },
      {
        titulo: "La vida que pudo haber sido",
        descripcion: "Para pensar en todas las versiones de nosotros que quedaron atrás.",
        fecha: "Marzo 03, 2026",
      },
      {
        titulo: "Después de leer esto, llama a alguien",
        descripcion: "Historias que te dejan emocionalmente poco presentable.",
        fecha: "Enero 09, 2026",
      },
    ],
    coleccionExtra: {
      titulo: "Cartas que nunca enviamos",
      descripcion: "Novelas sobre todo lo que no se dijo a tiempo.",
      fecha: "Octubre 18, 2025",
    },
    ultimasRecomendaciones: [
      { titulo: "La edad de la inocencia", autor: "Edith Wharton" },
      { titulo: "Los días del abandono", autor: "Elena Ferrante" },
      { titulo: "El amante", autor: "Marguerite Duras" },
      { titulo: "La señora Dalloway", autor: "Virginia Woolf" },
    ],
  },
  {
    id: "tyler-durden",
    nombre: "Tyler Durden",
    nombreCorto: "Tyler D.",
    etiquetas: ["Ficción transgresora", "Sátira social", "Existencialismo"],
    cita: "¿Eres dueño de tus cosas o ellas son dueñas de ti?",
    biografia:
      "Me interesan los libros que incomodan, cuestionan las reglas y ponen en duda todo eso que damos por normal. Historias sobre identidades que se desmoronan, sociedades obsesionadas con aparentar y personajes que están hartos de seguir el guion. Si un libro te deja pensando que algo no cuadra, probablemente me va a gustar.",
    indispensables: [
      { titulo: "El club de la lucha", autor: "Chuck Palahniuk" },
      { titulo: "American Psycho", autor: "Bret Easton Ellis" },
      { titulo: "Rascacielos", autor: "J. G. Ballard" },
      { titulo: "Memorias del subsuelo", autor: "Fiódor Dostoyevski" },
      { titulo: "La naranja mecánica", autor: "Anthony Burgess" },
    ],
    estilos: [
      "Ficción transgresora",
      "Sátira social",
      "Existencialismo",
      "Distopía",
      "Crítica social",
      "Thriller psicológico",
    ],
    autores: ["Chuck Palahniuk", "Bret Easton Ellis", "J. G. Ballard", "Albert Camus"],
    colecciones: [
      {
        titulo: "Tu vida no cabe en un catálogo",
        descripcion: "Tienes demasiadas cosas y todavía sientes que te falta algo.",
        fecha: "Agosto 24, 2026",
      },
      {
        titulo: "Manual para no encajar",
        descripcion: "Para los que nunca entendieron por qué había que seguir las reglas.",
        fecha: "Marzo 03, 2026",
      },
      {
        titulo: "Todo está bajo control. Claro que sí.",
        descripcion:
          "Sociedades perfectas, ciudadanos obedientes y algo que huele bastante mal.",
        fecha: "Enero 09, 2026",
      },
    ],
    coleccionExtra: {
      titulo: "No leas esto un lunes",
      descripcion: "Libros que te van a quitar las ganas de volver a la oficina.",
      fecha: "Octubre 18, 2025",
    },
    ultimasRecomendaciones: [
      { titulo: "El hombre rebelde", autor: "Albert Camus" },
      { titulo: "Menos que cero", autor: "Bret Easton Ellis" },
      { titulo: "El señor de las moscas", autor: "William Golding" },
      { titulo: "La sociedad del espectáculo", autor: "Guy Debord" },
    ],
  },
  {
    // Su wireframe tiene parte del contenido de relleno ("Título del libro"):
    // se completó con libros coherentes con su perfil.
    id: "clara-del-valle",
    nombre: "Clara del Valle",
    nombreCorto: "Clara V.",
    etiquetas: ["Realismo mágico", "Distopía", "Contemporáneo"],
    cita: "Hay historias que no terminan cuando alguien se va. Se quedan viviendo en nosotros.",
    biografia:
      "Me gustan las historias donde lo cotidiano se vuelve extraordinario, las casas guardan secretos y los recuerdos nunca se van del todo. Te recomiendo libros sobre la familia, la memoria y la magia de lo cotidiano.",
    indispensables: [
      { titulo: "La casa de los espíritus", autor: "Isabel Allende" },
      { titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
      { titulo: "La amortajada", autor: "María Luisa Bombal" },
      { titulo: "Como agua para chocolate", autor: "Laura Esquivel" },
      { titulo: "Pedro Páramo", autor: "Juan Rulfo" },
    ],
    estilos: [
      "Realismo mágico",
      "Saga familiar",
      "Memoria",
      "Literatura latinoamericana",
      "Contemporáneo",
    ],
    autores: [
      "Isabel Allende",
      "Gabriel García Márquez",
      "María Luisa Bombal",
      "Laura Esquivel",
    ],
    colecciones: [
      {
        titulo: "Las cosas que no se lleva el tiempo",
        descripcion: "Hay recuerdos que se niegan a quedarse en el pasado.",
        fecha: "Agosto 24, 2026",
      },
      {
        titulo: "En esta casa pasan cosas",
        descripcion: "Casas con secretos, visitas inesperadas y algún que otro fantasma.",
        fecha: "Marzo 03, 2026",
      },
      {
        titulo: "Las mujeres que vinieron antes",
        descripcion: "Algunas historias comienzan mucho antes de que nazcamos.",
        fecha: "Enero 09, 2026",
      },
    ],
    coleccionExtra: {
      titulo: "Historias de sobremesa",
      descripcion: "Relatos que se heredan de generación en generación.",
      fecha: "Octubre 18, 2025",
    },
    ultimasRecomendaciones: [
      { titulo: "Eva Luna", autor: "Isabel Allende" },
      { titulo: "Del amor y otros demonios", autor: "Gabriel García Márquez" },
      { titulo: "La última niebla", autor: "María Luisa Bombal" },
      { titulo: "Los recuerdos del porvenir", autor: "Elena Garro" },
    ],
  },
];

export const buscarLibrero = (id: string | null) =>
  LIBREROS.find((librero) => librero.id === id);

// Ruta al perfil a partir del nombre completo; si el librero aún no tiene
// perfil diseñado, lleva al perfil por defecto.
export function rutaDeLibrero(nombre: string) {
  const librero = LIBREROS.find((actual) => actual.nombre === nombre);
  return librero ? `/perfil-librero?librero=${librero.id}` : "/perfil-librero";
}
