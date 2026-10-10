import { Children, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icono } from "./Icono";

const estilos = {
  recomendaciones: "carrusel-recomendaciones",
  "mas-vendidos": "carrusel-mas-vendidos",
  lanzamiento: "carrusel-lanzamiento",
  comentados: "carrusel-comentados",
} as const;

export type CarruselVariante = keyof typeof estilos;

type CarruselProps = {
  titulo: string;
  variante: CarruselVariante;
  children: React.ReactNode;
  hrefVerMas?: string;
};

export function Carrusel({
  titulo,
  variante,
  children,
  hrefVerMas = "/catalogo",
}: CarruselProps) {
  const idTitulo = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cantidadPaginas, setCantidadPaginas] = useState(1);
  const [paginaActual, setPaginaActual] = useState(0);
  const [puedeIrAtras, setPuedeIrAtras] = useState(false);
  const [puedeIrAdelante, setPuedeIrAdelante] = useState(false);
  const claseBase = estilos[variante];
  const cantidadElementos = Children.count(children);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const actualizarControles = () => {
      const scrollMaximo = Math.max(
        0,
        viewport.scrollWidth - viewport.clientWidth,
      );
      const paginas =
        scrollMaximo > 0
          ? Math.ceil(viewport.scrollWidth / viewport.clientWidth)
          : 1;
      const pagina =
        scrollMaximo > 0
          ? Math.round((viewport.scrollLeft / scrollMaximo) * (paginas - 1))
          : 0;

      setCantidadPaginas(paginas);
      setPaginaActual(pagina);
      setPuedeIrAtras(viewport.scrollLeft > 1);
      setPuedeIrAdelante(viewport.scrollLeft < scrollMaximo - 1);
    };

    const observer = new ResizeObserver(actualizarControles);
    observer.observe(viewport);
    observer.observe(track);
    viewport.addEventListener("scroll", actualizarControles, {
      passive: true,
    });
    actualizarControles();

    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", actualizarControles);
    };
  }, [cantidadElementos]);

  const desplazar = (direccion: -1 | 1) => {
    viewportRef.current?.scrollBy({
      left: (viewportRef.current.clientWidth - 24) * direccion,
      behavior: "smooth",
    });
  };

  const irAPagina = (pagina: number) => {
    const viewport = viewportRef.current;
    if (!viewport || cantidadPaginas < 2) return;

    const scrollMaximo = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({
      left: (scrollMaximo * pagina) / (cantidadPaginas - 1),
      behavior: "smooth",
    });
  };

  return (
    <section className={claseBase} aria-labelledby={idTitulo}>
      <header className={`${claseBase}-encabezado`}>
        <h3 id={idTitulo} className={`${claseBase}-titulo`}>
          {titulo}
        </h3>

        <div className={`${claseBase}-acciones`}>
          <Link to={hrefVerMas}>Ver más</Link>
        </div>
      </header>

      <div className={`${claseBase}-contenedor`}>
        <div
          ref={viewportRef}
          className="carrusel-viewport"
          role="region"
          aria-roledescription="carrusel"
          aria-label={titulo}
          tabIndex={0}
        >
          <div ref={trackRef} className="coleccion-tarjetas">
            {Children.map(children, (child) => (
              <div className="carrusel-item">{child}</div>
            ))}
          </div>
        </div>

        <div className="controles-carrusel" role="group" aria-label={`Controles de ${titulo}`}>
          <button
            type="button"
            aria-label={`Anterior: ${titulo}`}
            onClick={() => desplazar(-1)}
            disabled={!puedeIrAtras}
          >
            <Icono nombre="anterior" />
          </button>

          {Array.from({ length: cantidadPaginas }, (_, pagina) => (
            <button
              key={pagina}
              type="button"
              className="carrusel-punto"
              aria-label={`Ir a la página ${pagina + 1} de ${cantidadPaginas}`}
              aria-current={paginaActual === pagina ? "true" : undefined}
              onClick={() => irAPagina(pagina)}
            />
          ))}

          <button
            type="button"
            aria-label={`Siguiente: ${titulo}`}
            onClick={() => desplazar(1)}
            disabled={!puedeIrAdelante}
          >
            <Icono nombre="siguiente" />
          </button>
        </div>
      </div>
    </section>
  );
}