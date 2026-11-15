import { useState, type FormEvent } from "react";
import { suscribirNewsletter } from "../servicios/newsletterServicio";
import { mensajeDeError } from "../utils/mensajesError";
import "../estilos/newsletter.css";

// Suscripción al newsletter (POST /newsletter/suscripciones)
export function Newsletter() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setMensaje("");
    try {
      await suscribirNewsletter(correo);
      setMensaje("¡Listo! Te enviaremos recomendaciones y novedades a tu correo.");
      setCorreo("");
    } catch (error) {
      setMensaje(mensajeDeError(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-titulo">
      <h2 id="newsletter-titulo" className="newsletter-titulo">
        Suscríbete a nuestro newsletter
      </h2>

      <p className="newsletter-pie">
        Entérate de recomendaciones,
        <br />
        novedades y más
      </p>

      <form className="newsletter-formulario" onSubmit={enviar}>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu e-mail"
          aria-label="Ingresa tu e-mail"
          autoComplete="email"
          required
          value={correo}
          onChange={(event) => {
            setCorreo(event.target.value);
            setMensaje("");
          }}
        />

        {/* Oculto a la vista como en el wireframe; se envía con Enter */}
        <button className="newsletter-boton" type="submit" disabled={enviando}>
          Suscribirme
        </button>
      </form>
      {mensaje && <p className="newsletter-mensaje" role="status">{mensaje}</p>}
    </section>
  );
}