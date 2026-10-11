import { Link } from "react-router-dom";
import logo from "../assets/logos/01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg";
import facebook from "../assets/iconos/01-facebook-negative.svg";
import instagram from "../assets/iconos/02-instagram-negative.svg";
import x from "../assets/iconos/03-x-negative.svg";
import youtube from "../assets/iconos/04-youtube-negative.svg";
import whatsapp from "../assets/iconos/05-whatsapp-negative.svg";
import "../estilos/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenedor">
        <section className="footer-logo">
          <img
            className="imagen-logo"
            src={logo}
            alt="Nombre y logo de la librería."
          />
        </section>

        <section className="footer-columna">
          <h3 className="columna-encabezado">Información</h3>
          <div className="columna-lista">
            <span>Contáctanos</span>
            <span>FAQ's</span>
            <span>Devoluciones y garantía</span>
            <span>Políticas de despacho</span>
            <span>Políticas de retiro en tienda</span>
          </div>
        </section>

        <section className="footer-columna">
          <h3 className="columna-encabezado">LeeConNos</h3>
          <div className="columna-lista">
            <Link to="/mi-cuenta">Mi Cuenta</Link>
            <Link to="/biblioteca">Biblioteca</Link>
            <span>Gift Cards</span>
            <span>Nuestro Equipo</span>
          </div>
        </section>

        <section className="footer-columna">
          <h3 className="columna-encabezado">Síguenos en</h3>
          <div className="iconos-contenedor">
            <img src={facebook} alt="Ícono de Facebook" />
            <img src={instagram} alt="Ícono de Instagram" />
            <img src={x} alt="Ícono de X" />
            <img src={youtube} alt="Ícono de YouTube" />
            <img src={whatsapp} alt="Ícono de Whatsapp" />
          </div>
        </section>
      </div>

      <div className="footer-legal">
        <p>
          (C)2026 leeconnos.cl - Todos los derechos reservados - Legión Atenea
          - Equipo 5 - Bootcamp Universidad de Chile
        </p>
      </div>
    </footer>
  );
}