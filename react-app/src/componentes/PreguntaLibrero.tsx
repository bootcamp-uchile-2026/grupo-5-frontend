import { useState, type FormEvent } from "react";
import logoImagen from "../assets/logos/05-Imagen-2-colores.svg";
import logoTexto from "../assets/logos/04-Horizontal-Texto.svg";
import type { Librero } from "../datos/libreros";
import { useAutenticacionStore } from "../estado/autenticacionStore";
import { useSesionStore } from "../estado/sesionStore";
import { enviarPreguntaLibrero } from "../servicios/libreroServicio";
import { mensajeDeError } from "../utils/mensajesError";
import { Icono } from "./Icono";
import "../estilos/pregunta-librero.css";

// Largo que acepta la API (POST /libreros/{slug}/preguntas)
const LARGO_MINIMO = 10;
const LARGO_MAXIMO = 1000;

// Alta fidelidad: Perfil librero (Figma, node 3516:27691). El diseño no tiene
// botón: el lápiz del campo envía la pregunta. Se envía con el nombre y el
// correo de la sesión; sin sesión, abre el inicio de sesión (como dice la nota).
export function PreguntaLibrero({ librero }: { librero: Pick<Librero, "id" | "nombre"> }) {
	const usuario = useSesionStore((estado) => estado.usuario);
	const abrirAutenticacion = useAutenticacionStore((estado) => estado.abrir);
	const [pregunta, setPregunta] = useState("");
	const [enviando, setEnviando] = useState(false);
	const [error, setError] = useState("");
	const [confirmacion, setConfirmacion] = useState("");
	const nombre = librero.nombre.split(" ")[0];

	async function enviar(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setConfirmacion("");
		if (!usuario) {
			abrirAutenticacion();
			return;
		}
		if (pregunta.trim().length < LARGO_MINIMO) {
			setError(`Escribe al menos ${LARGO_MINIMO} caracteres`);
			return;
		}
		setError("");
		setEnviando(true);
		try {
			setConfirmacion(await enviarPreguntaLibrero(librero, pregunta));
			setPregunta("");
		} catch (err) {
			setError(mensajeDeError(err));
		} finally {
			setEnviando(false);
		}
	}

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
			<form className="pregunta-librero-formulario" onSubmit={enviar} noValidate>
				<label className="pregunta-librero-etiqueta" htmlFor="pregunta-lectura">
					Escribe qué tipo de lectura buscas
				</label>
				<div className="pregunta-librero-campo">
					<textarea
						id="pregunta-lectura"
						name="pregunta"
						rows={4}
						maxLength={LARGO_MAXIMO}
						placeholder="¿Qué tienes ganas de leer?..."
						aria-invalid={Boolean(error)}
						aria-describedby={error ? "pregunta-librero-error" : "pregunta-librero-nota"}
						value={pregunta}
						onChange={(e) => setPregunta(e.target.value)}
					/>
					<button
						type="submit"
						className="pregunta-librero-enviar"
						aria-label={`Enviar pregunta a ${nombre}`}
						disabled={enviando}
					>
						<Icono nombre="editar" />
					</button>
				</div>
				{error && (
					<p className="pregunta-librero-error" id="pregunta-librero-error">
						{error}
					</p>
				)}
				<p className="pregunta-librero-confirmacion" aria-live="polite">
					{confirmacion}
				</p>
			</form>
			<p className="pregunta-librero-nota" id="pregunta-librero-nota">
				Para enviar tu pregunta necesitas una cuenta. Así {nombre} podrá responderte directamente y tendrás tus recomendaciones guardadas para volver a ellas cuando quieras.
			</p>
		</section>
	);
}
