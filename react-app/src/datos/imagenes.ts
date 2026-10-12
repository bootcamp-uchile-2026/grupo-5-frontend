// Imágenes de relleno (placehold.co) en los colores del sitio, mientras no
// existan las imágenes reales. Reemplazarlas aquí actualiza todo el sitio.
const relleno = (tamano: string, texto: string) =>
  `https://placehold.co/${tamano}/efe6fd/4600a9?text=${texto}`;

export const IMAGENES_RELLENO = {
  portada: relleno("560x688", "Portada"),
  portadaHorizontal: relleno("540x388", "Portada"),
  miniatura: relleno("280x280", "Imagen"),
  avatar: relleno("56", "L"),
  hero: "https://placehold.co/600x400",
  comunidad: "https://placehold.co/600x300",
  retrato: "https://placehold.co/600x400",
};
