import { useState, type ImgHTMLAttributes } from "react";
import { IMAGENES_RELLENO } from "../datos/imagenes";

// Portada de libro con respaldo: si la imagen no carga, o llega vacía
// (Open Library responde una imagen de 1×1 px cuando no tiene la portada),
// se muestra la portada de relleno del sitio.
type PortadaProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
};

export function Portada({ src, alt = "", ...props }: PortadaProps) {
  const [fallida, setFallida] = useState<string>();
  const usarRespaldo = !src || fallida === src;

  return (
    <img
      {...props}
      alt={alt}
      src={usarRespaldo ? IMAGENES_RELLENO.portada : src}
      onError={() => setFallida(src)}
      onLoad={(evento) => {
        if (!usarRespaldo && evento.currentTarget.naturalWidth <= 1) setFallida(src);
      }}
    />
  );
}
