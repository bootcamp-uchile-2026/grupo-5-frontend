import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCarritoStore } from "../estado/carritoStore";
import { agregarAlCarrito } from "../servicios/carritoServicio";
import "../estilos/ficha-libro.css";

function FichaLibro() {
  const [cantidad, setCantidad] = useState(1);
  const navegar = useNavigate();

  function ajustarCantidad(delta: number) {
    setCantidad((actual) => Math.min(10, Math.max(1, actual + delta)));
  }

  async function comprarAhora(
    idLibro: string,
    titulo: string,
    precioUnitario: number,
    portada?: string,
  ) {
    await agregarAlCarrito({
      idLibro,
      titulo,
      precioUnitario,
      cantidad: 1,
      ...(portada ? { portada } : {}),
    });
    useCarritoStore.getState().cerrar();
    navegar("/checkout");
  }

  return (
    <>
      {/*--------------------------------------------------------------------------------------*/}

      {/*CONTENIDO FICHA LIBRO*/}
      <main className="contenido-libro">
        <div className="ruta-categoria">
          <Link className="home" to="/" aria-label="Volver al home">
            <img src="https://placehold.co/40x40" alt="Icono de casa" />
          </Link>
          <p> &gt; Categoría &gt; Arte, Arquitectura y Diseño</p>
        </div>

        <section className="ficha-libro">
          <div className="galeria-libro">
            <div className="imagen_libro">
              <img
                src="https://placehold.co/1080x1350"
                alt="Portada del libro"
              />
              <button
                className="flecha flecha-anterior"
                type="button"
                aria-label="Imagen anterior"
              >
                &lt;
              </button>
              <button
                className="flecha flecha-siguiente"
                type="button"
                aria-label="Imagen siguiente"
              >
                &gt;
              </button>
            </div>

            <div className="miniaturas-libro">
              <div className="imagen_micro">
                <img
                  src="https://placehold.co/1080x1080"
                  alt="Imagen micro 1"
                />
              </div>

              <div className="imagen_micro">
                <img
                  src="https://placehold.co/1080x1080"
                  alt="Imagen micro 2"
                />
              </div>

              <div className="imagen_micro">
                <img
                  src="https://placehold.co/1080x1080"
                  alt="Imagen micro 3"
                />
              </div>
            </div>
          </div>

          <div className="datos-libro">
            <h1>Nombre del libro</h1>
            <h3>Nombre Editorial / Nombre Autor</h3>
            <p className="titulo-descripcion">Descripción del libro</p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
              imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
              ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
              tellus eget condimentum rhoncus, sem quam semper libero, sit amet
              adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
              pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
              tempus. Donec vitae sapien ut libero.,
            </p>
            <div className="precio">
              <h2>$27.990</h2>
              <div className="disponibilidad">
                <p className="stock">En stock online</p>
                <p>Ver disponibilidad en tienda</p>
              </div>
            </div>
            <div className="cantidad">
              <p className="titulo-cantidad">Cantidad</p>
              <div className="botones">
                <button
                  type="button"
                  id="menos-cantidad"
                  aria-label="Disminuir cantidad"
                  disabled={cantidad <= 1}
                  onClick={() => ajustarCantidad(-1)}
                >
                  −
                </button>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  min={1}
                  max={10}
                  step={1}
                  value={cantidad}
                  onChange={(evento) => {
                    const valor = Number(evento.target.value);
                    if (Number.isInteger(valor) && valor >= 1 && valor <= 10) {
                      setCantidad(valor);
                    }
                  }}
                />
                <button
                  type="button"
                  id="mas-cantidad"
                  aria-label="Aumentar cantidad"
                  disabled={cantidad >= 10}
                  onClick={() => ajustarCantidad(1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                id="agregar-carrito"
                aria-label="Agregar al carrito"
                onClick={() =>
                  void agregarAlCarrito({
                    idLibro: "libro-demo",
                    titulo: "Nombre del libro",
                    precioUnitario: 27990,
                    cantidad,
                  })
                }
              >
                Agregar al carrito
              </button>
            </div>
            <div className="especificaciones">
              <hr />
              <div className="titulo-especificaciones">
                <h3>Especificaciones</h3>
                <h3>&gt;</h3>
              </div>
              <hr />
              <div className="etiquetas">
                <button type="button" aria-label="Etiqueta 1">
                  #Etiqueta 1
                </button>
                <button type="button" aria-label="Etiqueta 2">
                  #Etiqueta 2
                </button>
                <button type="button" aria-label="Etiqueta 3">
                  #Etiqueta 3
                </button>
                <button type="button" aria-label="Etiqueta 4">
                  #Etiqueta 4
                </button>
              </div>
            </div>
          </div>
        </section>

        {/*CONTENIDO RECOMENDACION LEECONNOS*/}
        <section className="recomendacion-libro">
          <h2>Recomendación LeeConNos</h2>
          <h3>Nombre del curador</h3>
          <div className="contenido-recomendacion">
            <div className="video_recomendacion">
              <img
                src="https://placehold.co/1080x920"
                alt="video_recomendacion"
              />
            </div>
            <div className="texto-recomendacion">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante,
              </p>
              <div className="explora-mas">
                <p>Explora más</p>
              </div>
              <div className="imagenes-explora">
                <img
                  src="https://placehold.co/600x400"
                  alt="Libro recomendado 1"
                />
                <img
                  src="https://placehold.co/600x400"
                  alt="Libro recomendado 2"
                />
                <img
                  src="https://placehold.co/600x400"
                  alt="Libro recomendado 3"
                />
              </div>
            </div>
          </div>
        </section>

        {/*VALORACION LIBRO*/}
        <section className="valoracion-libro">
          <hr />
          <div className="puntaje-valoracion">
            <h1>4,99</h1>
            <h2>Favorito entre lectores</h2>
            <p>
              Este libro está en el 5% de los libros de arte mejor valorados,
              según las valoraciones, las reseñas y la confiabilidad.
            </p>
          </div>
          <hr />
        </section>

        {/*RESEÑAS LIBRO*/}
        <section className="reseñas-libro">
          <div className="reseñas-contenedor">
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
            </div>
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
            </div>
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
            </div>
            <div className="reseña">
              <div className="encabezado-reseña">
                <div className="perfil">
                  <img
                    src="https://placehold.co/100x100"
                    alt="Foto de perfil del lector"
                  />
                  <div className="datos-perfil">
                    <h3>Nombre del lector</h3>
                    <p>Ubicación</p>
                  </div>
                </div>
              </div>
              <div className="meta-reseña">
                ★★★★★ <span>Fecha de la reseña + otro dato</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
                enim. Aliquam lorem ante.
              </p>
            </div>
          </div>
        </section>
        <hr className="separador-reseñas-catalogo" />

        {/*MINI CATALOGO*/}
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
              <button className="catalogo-comprar" type="button" onClick={() => void comprarAhora("el-principito", "El principito", 20150, "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg")}>
                Comprar ahora
              </button>
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
              <button className="catalogo-comprar" type="button" onClick={() => void comprarAhora("cien-a-os-de-soledad", "Cien años de soledad", 22900, "https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg")}>
                Comprar ahora
              </button>
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
              <button className="catalogo-comprar" type="button" onClick={() => void comprarAhora("don-quijote-de-la-mancha", "Don Quijote de la Mancha", 25600, "https://covers.openlibrary.org/b/isbn/9780060934347-L.jpg")}>
                Comprar ahora
              </button>
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
              <button className="catalogo-comprar" type="button" onClick={() => void comprarAhora("rayuela", "Rayuela", 19990, "https://covers.openlibrary.org/b/isbn/9780394757681-L.jpg")}>
                Comprar ahora
              </button>
            </div>
          </article>
        </section>
      </main>

      {/*--------------------------------------------------------------------------------------*/}


    </>
  );
}

export default FichaLibro;
