import { agregarAlCarrito } from "../servicios/carritoServicio";
import "../estilos/catalogo.css";
import { Footer } from "../componentes/Footer";
import { Newsletter } from "../componentes/Newsletter";

function Catalogo() {
  return (
    <>
      <main className="catalogo">
        <div className="catalogo-filtros">
          <div className="catalogo-filtros-grupo">
            <label>Filtrar:</label>
            <select aria-label="Filtrar por categorías">
              <option>Categorías</option>
            </select>
            <select aria-label="Filtrar por descuento">
              <option>% Descuento</option>
            </select>
            <select aria-label="Filtrar por precio">
              <option>% Precio</option>
            </select>
            <select aria-label="Filtrar por autor">
              <option>Autor</option>
            </select>
            <select aria-label="Filtrar por editorial">
              <option>Editorial</option>
            </select>
          </div>
          <div className="catalogo-orden">
            <label htmlFor="orden">Ordenar por:</label>
            <select id="orden" aria-label="Ordenar catálogo">
              <option>Relevancia</option>
              <option>Precio menor</option>
              <option>Precio mayor</option>
            </select>
          </div>
          <span className="catalogo-resultados">67 resultados</span>
        </div>

        <section className="catalogo-grilla" aria-label="Libros del catálogo">
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg"
              alt="Portada de El principito"
            />
            <h2 className="catalogo-titulo">El principito</h2>
            <p className="catalogo-autor">Antoine de Saint-Exupéry</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$20.150</span>
              <span className="catalogo-precio-anterior">$26.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "el-principito",
                    titulo: "El principito",
                    precioUnitario: 20150,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg"
              alt="Portada de Cien años de soledad"
            />
            <h2 className="catalogo-titulo">Cien años de soledad</h2>
            <p className="catalogo-autor">Gabriel García Márquez</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$22.900</span>
              <span className="catalogo-precio-anterior">$26.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "cien-a-os-de-soledad",
                    titulo: "Cien años de soledad",
                    precioUnitario: 22900,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg"
              alt="Portada de Don Quijote de la Mancha"
            />
            <h2 className="catalogo-titulo">Don Quijote de la Mancha</h2>
            <p className="catalogo-autor">Miguel de Cervantes</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$25.600</span>
              <span className="catalogo-precio-anterior">$31.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "don-quijote-de-la-mancha",
                    titulo: "Don Quijote de la Mancha",
                    precioUnitario: 25600,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780394757681-L.jpg"
              alt="Portada de Rayuela"
            />
            <h2 className="catalogo-titulo">Rayuela</h2>
            <p className="catalogo-autor">Julio Cortázar</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$19.990</span>
              <span className="catalogo-precio-anterior">$24.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "rayuela",
                    titulo: "Rayuela",
                    precioUnitario: 19990,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780394757681-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg"
              alt="Portada de La metamorfosis"
            />
            <h2 className="catalogo-titulo">La metamorfosis</h2>
            <p className="catalogo-autor">Franz Kafka</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$15.500</span>
              <span className="catalogo-precio-anterior">$18.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "la-metamorfosis",
                    titulo: "La metamorfosis",
                    precioUnitario: 15500,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg"
              alt="Portada de Orgullo y prejuicio"
            />
            <h2 className="catalogo-titulo">Orgullo y prejuicio</h2>
            <p className="catalogo-autor">Jane Austen</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$21.300</span>
              <span className="catalogo-precio-anterior">$27.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "orgullo-y-prejuicio",
                    titulo: "Orgullo y prejuicio",
                    precioUnitario: 21300,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780802130303-L.jpg"
              alt="Portada de Ficciones"
            />
            <h2 className="catalogo-titulo">Ficciones</h2>
            <p className="catalogo-autor">Jorge Luis Borges</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$18.700</span>
              <span className="catalogo-precio-anterior">$22.900</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "ficciones",
                    titulo: "Ficciones",
                    precioUnitario: 18700,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780802130303-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
          <article className="catalogo-tarjeta">
            <img
              className="catalogo-portada"
              src="https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg"
              alt="Portada de 1984"
            />
            <h2 className="catalogo-titulo">1984</h2>
            <p className="catalogo-autor">George Orwell</p>
            <div className="catalogo-precio">
              <span className="catalogo-precio-actual">$17.800</span>
              <span className="catalogo-precio-anterior">$23.500</span>
            </div>
            <div className="catalogo-etiquetas">
              <span className="catalogo-etiqueta">Reseñado</span>
              <span className="catalogo-etiqueta">Recomendado</span>
              <span className="catalogo-etiqueta oscuro">Agotado</span>
              <span className="catalogo-etiqueta oscuro">Novedad</span>
              <span className="catalogo-etiqueta oscuro">Oferta</span>
            </div>
            <div className="catalogo-acciones">
              <button
                className="catalogo-carrito"
                type="button"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "1984",
                    titulo: "1984",
                    precioUnitario: 17800,
                    cantidad: 1,
                    portada: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
                  })
                }
              >
                Agregar al carrito
              </button>
              <a className="catalogo-comprar" href="#">
                Comprar ahora
              </a>
            </div>
          </article>
        </section>
      </main>
        <Newsletter />

        <Footer />

    </>
  );
}

export default Catalogo;
