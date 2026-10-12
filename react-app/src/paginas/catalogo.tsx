import { useSearchParams } from "react-router-dom";
import { Desplegable } from "../componentes/Desplegable";
import { FiltroPrecio } from "../componentes/FiltroPrecio";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import { RutaNavegacion, type ElementoRuta } from "../componentes/RutaNavegacion";
import { TarjetaProducto } from "../componentes/TarjetaProducto";
import { useLibros } from "../componentes/useLibros";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { grupoDeGenero } from "../datos/generos";
import { SUBGENEROS } from "../datos/libros";
import type { LibroDto } from "../tipos/libro";
import { propsDeTarjeta } from "../utils/libros";
import "../estilos/catalogo.css";

// Wireframe Catálogo (Figma: Wireframes Desktop, node 1622:7933).
// Los filtros viven en la URL: q, categoria, descuento, orden, subgenero,
// autor, editorial (estos tres pueden repetirse), precioMin y precioMax.

const valoresUnicos = (libros: LibroDto[], campo: "autor" | "editorial") =>
  Array.from(new Set(libros.map((libro) => libro[campo]))).sort((a, b) =>
    a.localeCompare(b, "es"),
  );

// Paginación de muestra: por ahora los botones no cambian de página
const PAGINAS = [1, 2, 3, 4, 5];
const ULTIMA_PAGINA = 7;

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { libros, cargando } = useLibros();
  const consultaOriginal = searchParams.get("q") ?? "";
  const consulta = consultaOriginal.trim().toLocaleLowerCase("es-CL");
  const categoria = searchParams.get("categoria") ?? "";
  const descuento = searchParams.get("descuento") ?? "";
  const orden = searchParams.get("orden") ?? "";
  const subgeneros = searchParams.getAll("subgenero");
  const autores = searchParams.getAll("autor");
  const editoriales = searchParams.getAll("editorial");
  const precioMin = Number(searchParams.get("precioMin")) || undefined;
  const precioMax = Number(searchParams.get("precioMax")) || undefined;

  function actualizarParametro(nombre: string, valor: string) {
    setSearchParams(
      (actuales) => {
        const siguientes = new URLSearchParams(actuales);
        if (valor) siguientes.set(nombre, valor);
        else siguientes.delete(nombre);
        return siguientes;
      },
      { replace: true },
    );
  }

  // Marca o desmarca un valor de un filtro que admite varios (casillas)
  function alternarValor(nombre: string, valor: string) {
    setSearchParams(
      (actuales) => {
        const siguientes = new URLSearchParams(actuales);
        const valores = siguientes.getAll(nombre);
        siguientes.delete(nombre);
        const nuevos = valores.includes(valor)
          ? valores.filter((actual) => actual !== valor)
          : [...valores, valor];
        nuevos.forEach((actual) => siguientes.append(nombre, actual));
        return siguientes;
      },
      { replace: true },
    );
  }

  function aplicarPrecio(minimo: number, maximo: number) {
    setSearchParams(
      (actuales) => {
        const siguientes = new URLSearchParams(actuales);
        siguientes.set("precioMin", String(minimo));
        siguientes.set("precioMax", String(maximo));
        return siguientes;
      },
      { replace: true },
    );
  }

  // Libros del ámbito actual (búsqueda, género y ofertas)
  const librosDelAmbito = libros.filter((libro) => {
    const coincideBusqueda =
      !consulta ||
      `${libro.titulo} ${libro.autor}`.toLocaleLowerCase("es-CL").includes(consulta);
    const coincideCategoria = !categoria || libro.categoria === categoria;
    const tieneDescuento = Boolean(
      libro.precioAnterior && libro.precio < libro.precioAnterior,
    );
    const coincideDescuento =
      !descuento || (descuento === "si" ? tieneDescuento : !tieneDescuento);
    return coincideBusqueda && coincideCategoria && coincideDescuento;
  });

  const librosSinPrecio = librosDelAmbito.filter(
    (libro) =>
      (!subgeneros.length || subgeneros.includes(libro.subgenero ?? "")) &&
      (!autores.length || autores.includes(libro.autor)) &&
      (!editoriales.length || editoriales.includes(libro.editorial)),
  );

  const librosFiltrados = librosSinPrecio
    .filter(
      (libro) =>
        (!precioMin || libro.precio >= precioMin) &&
        (!precioMax || libro.precio <= precioMax),
    )
    .sort((a, b) => {
      if (orden === "precio-menor") return a.precio - b.precio;
      if (orden === "precio-mayor") return b.precio - a.precio;
      return 0;
    });

  const subgenerosDisponibles = SUBGENEROS[categoria] ?? [];
  const grupo = categoria ? grupoDeGenero(categoria) : undefined;
  const ruta: ElementoRuta[] = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Catálogo", ruta: "/catalogo" },
    ...(grupo ? [{ texto: grupo }] : []),
    ...(categoria ? [{ texto: categoria }] : []),
  ];
  const titulo =
    categoria ||
    (consultaOriginal ? `Resultados para "${consultaOriginal}"` : "Catálogo");

  const casillas = (nombre: string, opciones: string[], marcadas: string[]) => (
    <ul className="filtro-casillas">
      {opciones.map((opcion) => (
        <li key={opcion}>
          <label>
            <input
              type="checkbox"
              checked={marcadas.includes(opcion)}
              onChange={() => alternarValor(nombre, opcion)}
            />
            {opcion}
          </label>
        </li>
      ))}
    </ul>
  );

  useTituloPagina(titulo);

  return (
    <>
      <main className="catalogo">
        <RutaNavegacion className="catalogo-ruta" elementos={ruta} />

        <h1 className="catalogo-titulo-pagina">{titulo}</h1>

        <div className="catalogo-cuerpo">
          <aside className="catalogo-filtros" aria-label="Filtros">
            <p className="catalogo-filtros-titulo">Filtrar:</p>

            {subgenerosDisponibles.length > 0 && (
              <Desplegable className="filtro-desplegable" titulo="Subgéneros" abiertoInicial>
                {casillas("subgenero", subgenerosDisponibles, subgeneros)}
              </Desplegable>
            )}

            <Desplegable className="filtro-desplegable" titulo="Precio" abiertoInicial>
              <FiltroPrecio
                key={`${libros.length}|${categoria}|${consulta}|${subgeneros}|${autores}|${editoriales}`}
                precios={librosSinPrecio.map((libro) => libro.precio)}
                minimoAplicado={precioMin}
                maximoAplicado={precioMax}
                onAceptar={aplicarPrecio}
              />
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Autor">
              {casillas("autor", valoresUnicos(librosDelAmbito, "autor"), autores)}
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Editorial">
              {casillas(
                "editorial",
                valoresUnicos(librosDelAmbito, "editorial"),
                editoriales,
              )}
            </Desplegable>
          </aside>

          <section className="catalogo-resultados" aria-label="Libros del catálogo">
            <div className="catalogo-barra">
              <div className="catalogo-orden">
                <label htmlFor="catalogo-orden">Ordenar por:</label>
                <select
                  id="catalogo-orden"
                  value={orden}
                  onChange={(evento) =>
                    actualizarParametro("orden", evento.target.value)
                  }
                >
                  <option value="">Relevancia</option>
                  <option value="precio-menor">Precio: menor a mayor</option>
                  <option value="precio-mayor">Precio: mayor a menor</option>
                </select>
              </div>
              <span className="catalogo-cantidad" aria-live="polite">
                {librosFiltrados.length}{" "}
                {librosFiltrados.length === 1 ? "resultado" : "resultados"}
              </span>
            </div>

            <div className="catalogo-productos">
              {librosFiltrados.map((libro) => (
                <TarjetaProducto key={libro.id} {...propsDeTarjeta(libro)} />
              ))}
            </div>
            {cargando && (
              <p className="catalogo-vacio" role="status">
                Cargando libros...
              </p>
            )}
            {!cargando && librosFiltrados.length === 0 && (
              <p className="catalogo-vacio" role="status">
                No encontramos libros con esos criterios.
              </p>
            )}

            {librosFiltrados.length > 0 && (
              <nav className="catalogo-paginacion" aria-label="Paginación">
                <button type="button" aria-label="Página anterior" disabled>
                  <Icono nombre="anterior" />
                </button>
                {PAGINAS.map((pagina) => (
                  <button
                    key={pagina}
                    type="button"
                    className="catalogo-pagina"
                    aria-current={pagina === 1 ? "page" : undefined}
                  >
                    {pagina}
                  </button>
                ))}
                <span aria-hidden="true">…</span>
                <button type="button" className="catalogo-pagina">
                  {ULTIMA_PAGINA}
                </button>
                <button type="button" aria-label="Página siguiente">
                  <Icono nombre="siguiente" />
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Catalogo;
