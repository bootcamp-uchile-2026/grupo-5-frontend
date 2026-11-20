import { useEffect, useState } from "react";
import iconoPapelera from "../assets/iconos/16-papelera.svg";
import { useAutenticacionStore } from "../estado/autenticacionStore";
import { useFavoritosStore } from "../estado/favoritosStore";
import { useSesionStore } from "../estado/sesionStore";
import { quitarDelCarrito } from "../servicios/carritoServicio";
import { alternarFavorito } from "../servicios/favoritosServicio";
import { Icono } from "./Icono";
import "../estilos/confirmar-eliminar.css";

// Confirmación para quitar un libro del carrito (Figma, alta fidelidad,
// node 3416:25598). La usan el carrito y el checkout.
// "Guardar en favoritos" guarda el libro en la lista de la cuenta y lo quita
// del carrito; sin sesión, abre el inicio de sesión y el libro se queda en el
// carrito.
type ConfirmarEliminarProps = {
  idLibro: string;
  titulo: string;
  onCerrar: () => void;
};

export function ConfirmarEliminar({ idLibro, titulo, onCerrar }: ConfirmarEliminarProps) {
  const conSesion = useSesionStore((estado) => Boolean(estado.usuario));
  const abrirAutenticacion = useAutenticacionStore((estado) => estado.abrir);
  const yaEsFavorito = useFavoritosStore((estado) => estado.ids.includes(idLibro));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  // Cierre con Escape
  useEffect(() => {
    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        evento.stopPropagation();
        onCerrar();
      }
    };
    document.addEventListener("keydown", alPresionar, true);
    return () => document.removeEventListener("keydown", alPresionar, true);
  }, [onCerrar]);

  function eliminar() {
    void quitarDelCarrito(idLibro);
    onCerrar();
  }

  async function guardarEnFavoritos() {
    if (!conSesion) {
      onCerrar();
      abrirAutenticacion();
      return;
    }
    setGuardando(true);
    setError("");
    try {
      if (!yaEsFavorito) await alternarFavorito(idLibro);
      void quitarDelCarrito(idLibro);
      onCerrar();
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : "No pudimos guardar el libro en tus favoritos.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div
      className="confirmar-eliminar-fondo"
      role="presentation"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <section
        className="confirmar-eliminar"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmar-eliminar-titulo"
        aria-describedby="confirmar-eliminar-texto"
      >
        <button type="button" className="confirmar-eliminar-cerrar" aria-label="Cerrar" onClick={onCerrar}>
          <Icono nombre="cerrar" />
        </button>
        <img className="confirmar-eliminar-icono" src={iconoPapelera} alt="" />
        <div className="confirmar-eliminar-textos">
          <h2 id="confirmar-eliminar-titulo">¿Quieres eliminar este producto?</h2>
          <p id="confirmar-eliminar-texto">
            <span className="confirmar-eliminar-oculto">{titulo}. </span>
            Este producto se eliminará de tu carrito. Si todavía lo estás pensando, puedes guardarlo en tus
            favoritos para después.
          </p>
        </div>
        <div className="confirmar-eliminar-acciones">
          <button type="button" className="confirmar-eliminar-principal" autoFocus onClick={eliminar}>
            Eliminar producto
          </button>
          <button
            type="button"
            className="confirmar-eliminar-secundario"
            disabled={guardando}
            onClick={() => void guardarEnFavoritos()}
          >
            {guardando ? "Guardando..." : "Guardar en favoritos"}
          </button>
          {error && (
            <p className="confirmar-eliminar-error" role="alert">
              {error}
            </p>
          )}
          <button type="button" className="confirmar-eliminar-cancelar" onClick={onCerrar}>
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
}
