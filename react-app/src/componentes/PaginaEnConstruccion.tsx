import { Link } from "react-router-dom";
import "../estilos/pagina-en-construccion.css";

type PaginaEnConstruccionProps = {
  titulo: string;
};

export function PaginaEnConstruccion({
  titulo,
}: PaginaEnConstruccionProps) {
  return (
    <main className="pagina-en-construccion">
      <section aria-labelledby="pagina-en-construccion-titulo">
        <h1 id="pagina-en-construccion-titulo">{titulo}</h1>
        <p>Esta sección está en construcción. Pronto encontrarás novedades aquí.</p>
        <Link to="/catalogo">Explorar el catálogo</Link>
      </section>
    </main>
  );
}
