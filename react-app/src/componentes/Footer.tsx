import { Link } from "react-router-dom";
import logoImagen from "../assets/logos/06-Imagen-Contorno-Blanco.svg";
import logoTexto from "../assets/logos/04-Horizontal-Texto.svg";
import facebook from "../assets/iconos/01-facebook-negative.svg";
import instagram from "../assets/iconos/02-instagram-negative.svg";
import youtube from "../assets/iconos/04-youtube-negative.svg";
import "../estilos/footer.css";

// Estructura según el footer del wireframe (Figma: Componentes Global, node 2169:10344)
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenedor">
        <section className="footer-logo">
          <div className="footer-marca" role="img" aria-label="Leeconnos">
            <img src={logoImagen} alt="" />
            <img className="footer-marca-texto" src={logoTexto} alt="" />
          </div>
          <p className="footer-lema">Leer conecta. Nosotros también</p>
        </section>

        <div className="footer-columnas">
          <section className="footer-columna">
            <h3 className="columna-encabezado">Explora</h3>
            <div className="columna-lista">
              <Link to="/catalogo">Catálogo</Link>
              <Link to="/perfil-librero">Descubre con nosotros</Link>
              <Link to="/comunidad">Comunidad</Link>
            </div>
          </section>

          <section className="footer-columna">
            <h3 className="columna-encabezado">Ayuda</h3>
            <div className="columna-lista">
              <span>Preguntas frecuentes</span>
              <span>Envíos y entregas</span>
              <span>Cambios y devoluciones</span>
            </div>
          </section>

          <section className="footer-columna">
            <h3 className="columna-encabezado">Síguenos en</h3>
            <div className="iconos-contenedor">
              <img src={facebook} alt="Facebook" />
              <img src={instagram} alt="Instagram" />
              <img src={youtube} alt="YouTube" />
            </div>
          </section>

          <section className="footer-columna">
            <h3 className="columna-encabezado">Contáctanos</h3>
            <address className="footer-direccion">
              <span>Visítanos</span>
              Av. Italia 1245, Barrio Italia, Providencia, Santiago, Chile
            </address>
          </section>
        </div>
      </div>

      <div className="footer-legal">
        <p>
          ©2026 leeconnos.cl&emsp;Todos los derechos reservados Leeconnos®
          Legión Atenea SPA, Equipo 5 Bootcamp U de Chile
        </p>
      </div>
    </footer>
  );
}
