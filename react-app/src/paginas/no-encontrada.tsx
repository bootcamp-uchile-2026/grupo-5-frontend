import { PaginaEnConstruccion } from "../componentes/PaginaEnConstruccion";

// Ruta 404: cualquier dirección que no existe
function NoEncontrada() {
  return (
    <PaginaEnConstruccion
      titulo="Página no encontrada"
      mensaje="La página que buscas no existe o cambió de dirección."
      enlace={{ texto: "Volver al inicio", ruta: "/" }}
    />
  );
}

export default NoEncontrada;
