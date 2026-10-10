import { type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Footer } from "../componentes/Footer";
import { Newsletter } from "../componentes/Newsletter";
import { useCarritoStore } from "../estado/carritoStore";
import { agregarAlCarrito } from "../servicios/carritoServicio";
import "../estilos/catalogo.css";

type LibroCatalogo = {
  id: string;
  titulo: string;
  autor: string;
  precio: number;
  precioAnterior: number;
  portada: string;
  categoria: string;
};

const LIBROS: LibroCatalogo[] = [
  {
    id: "el-principito",
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 20150,
    precioAnterior: 26900,
    portada: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    categoria: "Clásicos",
  },
  {
    id: "cien-a-os-de-soledad",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 22900,
    precioAnterior: 26900,
    portada: "https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg",
    categoria: "Narrativa",
  },
  {
    id: "don-quijote-de-la-mancha",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    precio: 25600,
    precioAnterior: 31900,
    portada: "https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg",
    categoria: "Clásicos",
  },
  {
    id: "rayuela",
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 19990,
    precioAnterior: 24900,
    portada: "https://covers.openlibrary.org/b/isbn/9780394757681-L.jpg",
    categoria: "Narrativa",
  },
  {
    id: "la-metamorfosis",
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    precio: 15500,
    precioAnterior: 18900,
    portada: "https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg",
    categoria: "Clásicos",
  },
  {
    id: "orgullo-y-prejuicio",
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    precio: 21300,
    precioAnterior: 27900,
    portada: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    categoria: "Clásicos",
  },
  {
    id: "ficciones",
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 18700,
    precioAnterior: 22900,
    portada: "https://covers.openlibrary.org/b/isbn/9780802130303-L.jpg",
    categoria: "Narrativa",
  },
  {
    id: "1984",
    titulo: "1984",
    autor: "George Orwell",
    precio: 17800,
    precioAnterior: 23500,
    portada: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    categoria: "Narrativa",
  },
];

const formatoPrecio = (valor: number) => `$${valor.toLocaleString("es-CL")}`;

function Catalogo() {
  const navegar = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const consultaOriginal = searchParams.get("q") ?? "";
  const consulta = consultaOriginal.trim().toLocaleLowerCase("es-CL");
  const categoria = searchParams.get("categoria") ?? "";
  const descuento = searchParams.get("descuento") ?? "";
  const autor = searchParams.get("autor") ?? "";
  const orden = searchParams.get("orden") ?? "";

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

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datosFormulario = new FormData(evento.currentTarget);
    actualizarParametro("q", String(datosFormulario.get("q") ?? "").trim());
  }

  const librosFiltrados = LIBROS.filter((libro) => {
    const coincideBusqueda =
      !consulta ||
      `${libro.titulo} ${libro.autor}`.toLocaleLowerCase("es-CL").includes(consulta);
    const coincideCategoria = !categoria || libro.categoria === categoria;
    const tieneDescuento = libro.precio < libro.precioAnterior;
    const coincideDescuento =
      !descuento ||
      (descuento === "si" ? tieneDescuento : !tieneDescuento);
    const coincideAutor = !autor || libro.autor === autor;
    return (
      coincideBusqueda &&
      coincideCategoria &&
      coincideDescuento &&
      coincideAutor
    );
  }).sort((a, b) => {
    if (orden === "precio-menor") return a.precio - b.precio;
    if (orden === "precio-mayor") return b.precio - a.precio;
    return 0;
  });

  async function comprar(libro: LibroCatalogo, irAlCheckout: boolean) {
    await agregarAlCarrito({
      idLibro: libro.id,
      titulo: libro.titulo,
      autor: libro.autor,
      precioUnitario: libro.precio,
      cantidad: 1,
      portada: libro.portada,
    });
    if (irAlCheckout) {
      useCarritoStore.getState().cerrar();
      navegar("/checkout");
    }
  }

  return (
    <>
      <main className="catalogo">
        <div className="catalogo-filtros">
          <form
            key={consultaOriginal}
            className="catalogo-filtros-grupo"
            onSubmit={buscar}
            role="search"
          >
            <label htmlFor="catalogo-busqueda">Buscar:</label>
            <input
              id="catalogo-busqueda"
              type="search"
              name="q"
              defaultValue={consultaOriginal}
              placeholder="Título o autor"
            />
            <button type="submit">Buscar</button>
            <label htmlFor="catalogo-categoria">Categoría:</label>
            <select
              id="catalogo-categoria"
              value={categoria}
              onChange={(evento) =>
                actualizarParametro("categoria", evento.target.value)
              }
            >
              <option value="">Todas</option>
              <option value="Clásicos">Clásicos</option>
              <option value="Narrativa">Narrativa</option>
            </select>
            <label htmlFor="catalogo-descuento">Descuento:</label>
            <select
              id="catalogo-descuento"
              value={descuento}
              onChange={(evento) =>
                actualizarParametro("descuento", evento.target.value)
              }
            >
              <option value="">Todos</option>
              <option value="si">Con descuento</option>
              <option value="no">Sin descuento</option>
            </select>
            <label htmlFor="catalogo-autor">Autor:</label>
            <select
              id="catalogo-autor"
              value={autor}
              onChange={(evento) => actualizarParametro("autor", evento.target.value)}
            >
              <option value="">Todos</option>
              {Array.from(new Set(LIBROS.map((libro) => libro.autor))).map(
                (nombreAutor) => (
                  <option key={nombreAutor} value={nombreAutor}>
                    {nombreAutor}
                  </option>
                ),
              )}
            </select>
          </form>
          <div className="catalogo-orden">
            <label htmlFor="catalogo-orden">Ordenar por:</label>
            <select
              id="catalogo-orden"
              value={orden}
              onChange={(evento) => actualizarParametro("orden", evento.target.value)}
            >
              <option value="">Relevancia</option>
              <option value="precio-menor">Precio menor</option>
              <option value="precio-mayor">Precio mayor</option>
            </select>
          </div>
          <span className="catalogo-resultados" aria-live="polite">
            {librosFiltrados.length}{" "}
            {librosFiltrados.length === 1 ? "resultado" : "resultados"}
          </span>
        </div>

        <section className="catalogo-grilla" aria-label="Libros del catálogo">
          {librosFiltrados.map((libro) => (
            <article className="catalogo-tarjeta" key={libro.id}>
              <img
                className="catalogo-portada"
                src={libro.portada}
                alt={`Portada de ${libro.titulo}`}
              />
              <h2 className="catalogo-titulo">{libro.titulo}</h2>
              <p className="catalogo-autor">{libro.autor}</p>
              <div className="catalogo-precio">
                <span className="catalogo-precio-actual">
                  {formatoPrecio(libro.precio)}
                </span>
                <span className="catalogo-precio-anterior">
                  {formatoPrecio(libro.precioAnterior)}
                </span>
              </div>
              <div className="catalogo-etiquetas">
                <span className="catalogo-etiqueta">Recomendado</span>
                <span className="catalogo-etiqueta oscuro">Oferta</span>
              </div>
              <div className="catalogo-acciones">
                <button
                  className="catalogo-carrito"
                  type="button"
                  onClick={() => void comprar(libro, false)}
                >
                  Agregar al carrito
                </button>
                <button
                  className="catalogo-comprar"
                  type="button"
                  onClick={() => void comprar(libro, true)}
                >
                  Comprar ahora
                </button>
              </div>
            </article>
          ))}
          {librosFiltrados.length === 0 && (
            <p role="status">No encontramos libros con esos criterios.</p>
          )}
        </section>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Catalogo;
