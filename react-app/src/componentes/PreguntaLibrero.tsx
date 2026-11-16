import logoImagen from "../assets/logos/05-Imagen-2-colores.svg";
import logoTexto from "../assets/logos/04-Horizontal-Texto.svg";
import { Icono } from "./Icono";
import "../estilos/pregunta-librero.css";

// Alta fidelidad: Perfil librero (Figma, node 3516:27691). El nombre del
// librero cambia según el perfil (por defecto, Gregorio)
export function PreguntaLibrero({ nombre = "Gregorio" }: { nombre?: string }) {
	return (
		<section className="pregunta-librero" aria-labelledby="pregunta-librero-titulo">
			<div className="pregunta-librero-logo" aria-hidden="true">
				<img src={logoImagen} alt="" />
				<img className="pregunta-librero-logo-texto" src={logoTexto} alt="" />
			</div>
			<h2 id="pregunta-librero-titulo">¿No sabes qué leer?</h2>
			<p className="pregunta-librero-descripcion">
				Cuéntame qué has leído últimamente, qué te gustó o simplemente qué tienes ganas de encontrar.
			</p>
			<label className="pregunta-librero-etiqueta" htmlFor="pregunta-lectura">
				Escribe qué tipo de lectura buscas
			</label>
			<div className="pregunta-librero-campo">
				<textarea
					id="pregunta-lectura"
					name="pregunta"
					rows={4}
					maxLength={500}
					placeholder="¿Qué tienes ganas de leer?..."
					aria-describedby="pregunta-librero-nota"
				/>
				<Icono nombre="editar" />
			</div>
			<p className="pregunta-librero-nota" id="pregunta-librero-nota">
				Para enviar tu pregunta necesitas una cuenta. Así {nombre} podrá responderte directamente y tendrás tus recomendaciones guardadas para volver a ellas cuando quieras.
			</p>
		</section>
	);
}
