import { useState, type FormEvent } from "react";
import "../estilos/newsletter.css";

export function Newsletter() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensaje(
      "La suscripción aún no está disponible porque el servicio no está conectado.",
    );
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

        <button className="newsletter-boton" type="submit">
          Suscribirme
        </button>
      </form>
      {mensaje && <p className="newsletter-mensaje" role="status">{mensaje}</p>}
    </section>
  );
}