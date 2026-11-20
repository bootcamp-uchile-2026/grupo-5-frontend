import { Link } from "react-router-dom";
import logoImagen from "../assets/logos/06-Imagen-Contorno-Blanco.svg";
import logoTexto from "../assets/logos/04-Horizontal-Texto.svg";
import fotoComunidad from "../assets/imagenes/home-comunidad-lectora.png";
import "../estilos/comunidad-lectora.css";

// Banner "community-banner" de la Home de alta fidelidad (Figma, node 3172:28763)

export function ComunidadLectora() {
  return (
    <section className="comunidad-lectora" aria-labelledby="comunidad-titulo">
      <div className="comunidad-lectora-contenedor">
        <div className="comunidad-lectora-contenido">
          <h2 id="comunidad-titulo" className="comunidad-lectora-titulo">
            Únete a nuestra comunidad lectora
          </h2>
          <p className="comunidad-lectora-pie">
            Comparte reseñas y descubre recomendaciones de la comunidad
          </p>
          <Link className="comunidad-lectora-boton" to="/comunidad">
            Ir a la comunidad
          </Link>
        </div>

        <div className="comunidad-lectora-imagen">
          <img
            className="comunidad-lectora-foto"
            src={fotoComunidad}
            alt=""
            width="676"
            height="360"
          />
          <div className="comunidad-lectora-marca" role="img" aria-label="Leeconnos">
            <img src={logoImagen} alt="" />
            <img className="comunidad-lectora-logo-texto" src={logoTexto} alt="" />
          </div>
        </div>

        <span className="comunidad-lectora-separador" aria-hidden="true" />
      </div>
    </section>
  );
}
