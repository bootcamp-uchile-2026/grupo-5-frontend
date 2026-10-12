import { Link } from "react-router-dom";
import { useTituloPagina } from "./useTituloPagina";
import "../estilos/pagina-en-construccion.css";

type PaginaEnConstruccionProps = {
  titulo: string;
  mensaje?: string;
  enlace?: { texto: string; ruta: string };
};

// Página simple con título, mensaje y un enlace. Se usa para las secciones
// en construcción y para la página 404.
export function PaginaEnConstruccion({
  titulo,
  mensaje = "Esta sección está en construcción. Pronto encontrarás novedades aquí.",
  enlace = { texto: "Explorar el catálogo", ruta: "/catalogo" },
}: PaginaEnConstruccionProps) {
  useTituloPagina(titulo);

  return (
    <main className="pagina-en-construccion">
      <section aria-labelledby="pagina-en-construccion-titulo">
        <h1 id="pagina-en-construccion-titulo">{titulo}</h1>
        <p>{mensaje}</p>
        <Link to={enlace.ruta}>{enlace.texto}</Link>
      </section>
    </main>
  );
}
