import { useState } from "react";
import "../estilos/newsletter.css";

export function Newsletter() {
  const [correo, setCorreo] = useState("");

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

      <div className="newsletter-formulario">
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu e-mail"
          aria-label="Ingresa tu e-mail"
          value={correo}
          onChange={(event) => setCorreo(event.target.value)}
        />

        <button
          className="newsletter-boton"
          type="button"
          onClick={() => setCorreo("")}
        >
          Suscribirme
        </button>
      </div>
    </section>
  );
}