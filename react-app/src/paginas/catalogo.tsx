import { useSearchParams } from "react-router-dom";
import { Desplegable } from "../componentes/Desplegable";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { FiltroPrecio } from "../componentes/FiltroPrecio";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import { MensajeError } from "../componentes/MensajeError";
import { RutaNavegacion, type ElementoRuta } from "../componentes/RutaNavegacion";
import { TarjetaProducto } from "../componentes/TarjetaProducto";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { generoEnApi, grupoDeGenero, subgenerosDe } from "../datos/generos";
import {
  buscarLibros,
  obtenerGeneros,
  obtenerOpcionesFiltro,
  type FiltrosCatalogo,
} from "../servicios/catalogoServicio";
import type { FormatoLibro, OrdenLibros } from "../tipos/libro";
import { NOMBRES_FORMATO, propsDeTarjeta } from "../utils/libros";
import "../estilos/catalogo.css";

// Wireframe Catálogo (Figma: Wireframes Desktop, node 1622:7933).
// Los filtros y la página viven en la URL: q, genero, orden, formato, stock,
// descuento, precioMin, precioMax, pagina y (repetibles) subgenero, autor y
// editorial. Los datos vienen de GET /libros (ver catalogoServicio.ts).

const LARGO_MINIMO_BUSQUEDA = 2;

const ORDENES: { valor: OrdenLibros | ""; texto: string }[] = [
  { valor: "", texto: "Relevancia" },
  { valor: "novedades", texto: "Novedades" },
  { valor: "precio_asc", texto: "Precio: menor a mayor" },
  { valor: "precio_desc", texto: "Precio: mayor a menor" },
  { valor: "titulo", texto: "Título (A-Z)" },
];

const esOrden = (valor: string): valor is OrdenLibros =>
  ORDENES.some((orden) => orden.valor === valor && valor !== "");
const esFormato = (valor: string): valor is FormatoLibro => valor in NOMBRES_FORMATO;

// Botones de página: todas si son pocas; si no, primera, última y vecinas
function paginasVisibles(actual: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, indice) => indice + 1);
  const vecinas = [actual - 1, actual, actual + 1].filter(
    (pagina) => pagina > 1 && pagina < total,
  );
  return [
    1,
    ...(vecinas[0] > 2 ? ["…" as const] : []),
    ...vecinas,
    ...(vecinas[vecinas.length - 1] < total - 1 ? ["…" as const] : []),
    total,
  ];
}

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const consulta = (searchParams.get("q") ?? "").trim();
  const genero = searchParams.get("genero") ?? "";
  const ordenParametro = searchParams.get("orden") ?? "";
  const formatoParametro = searchParams.get("formato") ?? "";
  const soloEnStock = searchParams.get("stock") === "si";
  const soloOfertas = searchParams.get("descuento") === "si";
  const subgeneros = searchParams.getAll("subgenero");
  const autores = searchParams.getAll("autor");
  const editoriales = searchParams.getAll("editorial");
  const precioMin = Number(searchParams.get("precioMin")) || undefined;
  const precioMax = Number(searchParams.get("precioMax")) || undefined;
  const pagina = Math.max(1, Math.floor(Number(searchParams.get("pagina")) || 1));
  const busquedaCorta = consulta.length > 0 && consulta.length < LARGO_MINIMO_BUSQUEDA;

  const filtros: FiltrosCatalogo = {
    q: consulta || undefined,
    genero: genero || undefined,
    autores,
    formato: esFormato(formatoParametro) ? formatoParametro : undefined,
    soloEnStock,
    precioMin,
    precioMax,
    orden: esOrden(ordenParametro) ? ordenParametro : undefined,
    subgeneros,
    editoriales,
    soloOfertas,
  };
  const ambito = { q: filtros.q, genero: filtros.genero };

  const resultados = usePeticion(
    () =>
      busquedaCorta
        ? Promise.resolve({ libros: [], total: 0, pagina: 1, totalPaginas: 0 })
        : buscarLibros(filtros, pagina),
    JSON.stringify([filtros, pagina, busquedaCorta]),
  );
  const opciones = usePeticion(
    () =>
      busquedaCorta
        ? Promise.resolve({ autores: [], editoriales: [], precios: [] })
        : obtenerOpcionesFiltro(ambito),
    JSON.stringify([ambito, busquedaCorta]),
  );
  const generos = usePeticion(obtenerGeneros, "generos");

  // Cambia la URL; cualquier cambio de filtro vuelve a la página 1
  function cambiarParametros(cambiar: (parametros: URLSearchParams) => void) {
    setSearchParams(
      (actuales) => {
        const siguientes = new URLSearchParams(actuales);
        cambiar(siguientes);
        siguientes.delete("pagina");
        return siguientes;
      },
      { replace: true },
    );
  }

  function actualizarParametro(nombre: string, valor: string) {
    cambiarParametros((parametros) => {
      if (valor) parametros.set(nombre, valor);
      else parametros.delete(nombre);
    });
  }

  // Marca o desmarca un valor de un filtro que admite varios (casillas)
  function alternarValor(nombre: string, valor: string) {
    cambiarParametros((parametros) => {
      const valores = parametros.getAll(nombre);
      parametros.delete(nombre);
      const nuevos = valores.includes(valor)
        ? valores.filter((actual) => actual !== valor)
        : [...valores, valor];
      nuevos.forEach((actual) => parametros.append(nombre, actual));
    });
  }

  function aplicarPrecio(minimo: number, maximo: number) {
    cambiarParametros((parametros) => {
      parametros.set("precioMin", String(minimo));
      parametros.set("precioMax", String(maximo));
    });
  }

  function irAPagina(numero: number) {
    setSearchParams((actuales) => {
      const siguientes = new URLSearchParams(actuales);
      if (numero > 1) siguientes.set("pagina", String(numero));
      else siguientes.delete("pagina");
      return siguientes;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const subgenerosDisponibles = genero ? subgenerosDe(genero) : [];
  const grupo = genero ? grupoDeGenero(genero) : undefined;
  const ruta: ElementoRuta[] = [
    { texto: "Inicio", ruta: "/" },
    { texto: "Catálogo", ruta: "/catalogo" },
    ...(grupo ? [{ texto: grupo }] : []),
    ...(genero ? [{ texto: genero }] : []),
  ];
  const titulo = genero || (consulta ? `Resultados para "${consulta}"` : "Catálogo");
  useTituloPagina(titulo);

  const libros = resultados.datos?.libros ?? [];
  const total = resultados.datos?.total ?? 0;
  const totalPaginas = resultados.datos?.totalPaginas ?? 0;

  const casillas = (nombre: string, opcionesFiltro: string[], marcadas: string[]) => (
    <ul className="filtro-casillas">
      {opcionesFiltro.map((opcion) => (
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

  // Opciones de un solo valor (radio): la primera es "Todos"
  const opcionesUnicas = (
    nombre: string,
    opcionesFiltro: { valor: string; texto: string }[],
    marcada: string,
  ) => (
    <ul className="filtro-casillas">
      {opcionesFiltro.map((opcion) => (
        <li key={opcion.valor || "todos"}>
          <label>
            <input
              type="radio"
              name={`filtro-${nombre}`}
              checked={marcada === opcion.valor}
              onChange={() => actualizarParametro(nombre, opcion.valor)}
            />
            {opcion.texto}
          </label>
        </li>
      ))}
    </ul>
  );

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
              {opciones.datos ? (
                <FiltroPrecio
                  key={`${JSON.stringify(ambito)}|${opciones.datos.precios.length}`}
                  precios={opciones.datos.precios}
                  minimoAplicado={precioMin}
                  maximoAplicado={precioMax}
                  onAceptar={aplicarPrecio}
                />
              ) : (
                <EstadoCarga className="filtro-cargando" />
              )}
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Autor">
              {casillas("autor", opciones.datos?.autores ?? [], autores)}
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Editorial">
              {casillas("editorial", opciones.datos?.editoriales ?? [], editoriales)}
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Género">
              {opcionesUnicas(
                "genero",
                [
                  { valor: "", texto: "Todos" },
                  ...(generos.datos ?? []).map((actual) => ({
                    valor: actual.genero,
                    texto: `${actual.genero} (${actual.cantidad})`,
                  })),
                ],
                genero && generoEnApi(genero),
              )}
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Formato">
              {opcionesUnicas(
                "formato",
                [
                  { valor: "", texto: "Todos" },
                  ...Object.entries(NOMBRES_FORMATO).map(([valor, texto]) => ({
                    valor,
                    texto,
                  })),
                ],
                filtros.formato ?? "",
              )}
            </Desplegable>

            <Desplegable className="filtro-desplegable" titulo="Disponibilidad">
              <ul className="filtro-casillas">
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={soloEnStock}
                      onChange={() => actualizarParametro("stock", soloEnStock ? "" : "si")}
                    />
                    Solo con stock
                  </label>
                </li>
              </ul>
            </Desplegable>
          </aside>

          <section className="catalogo-resultados" aria-label="Libros del catálogo">
            <div className="catalogo-barra">
              <div className="catalogo-orden">
                <label htmlFor="catalogo-orden">Ordenar por:</label>
                <select
                  id="catalogo-orden"
                  value={filtros.orden ?? ""}
                  onChange={(evento) => actualizarParametro("orden", evento.target.value)}
                >
                  {ORDENES.map((orden) => (
                    <option key={orden.valor} value={orden.valor}>
                      {orden.texto}
                    </option>
                  ))}
                </select>
              </div>
              <span className="catalogo-cantidad" aria-live="polite">
                {total} {total === 1 ? "resultado" : "resultados"}
              </span>
            </div>

            {resultados.error ? (
              <MensajeError error={resultados.error} onReintentar={resultados.reintentar} />
            ) : (
              <>
                <div className="catalogo-productos" aria-busy={resultados.cargando}>
                  {libros.map((libro) => (
                    <TarjetaProducto key={libro.id} {...propsDeTarjeta(libro)} />
                  ))}
                </div>
                {resultados.cargando && <EstadoCarga texto="Cargando libros..." />}
                {!resultados.cargando && libros.length === 0 && (
                  <p className="catalogo-vacio" role="status">
                    {busquedaCorta
                      ? `Escribe al menos ${LARGO_MINIMO_BUSQUEDA} caracteres para buscar.`
                      : genero && !consulta
                        ? "Aún no hay libros en este género."
                        : "No encontramos libros con esos criterios."}
                  </p>
                )}
              </>
            )}

            {totalPaginas > 1 && !resultados.error && (
              <nav className="catalogo-paginacion" aria-label="Paginación">
                <button
                  type="button"
                  aria-label="Página anterior"
                  disabled={pagina <= 1}
                  onClick={() => irAPagina(pagina - 1)}
                >
                  <Icono nombre="anterior" />
                </button>
                {paginasVisibles(pagina, totalPaginas).map((numero, indice) =>
                  numero === "…" ? (
                    <span key={`salto-${indice}`} aria-hidden="true">
                      …
                    </span>
                  ) : (
                    <button
                      key={numero}
                      type="button"
                      className="catalogo-pagina"
                      aria-label={`Página ${numero}`}
                      aria-current={numero === pagina ? "page" : undefined}
                      onClick={() => irAPagina(numero)}
                    >
                      {numero}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  aria-label="Página siguiente"
                  disabled={pagina >= totalPaginas}
                  onClick={() => irAPagina(pagina + 1)}
                >
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
