import "../estilos/pregunta-librero.css";

export function PreguntaLibrero() {
	return (
		<section className="pregunta-librero" aria-labelledby="pregunta-librero-titulo">
			<h2 id="pregunta-librero-titulo">¿No sabes qué leer? Pregúntame</h2>
			<p className="pregunta-librero-descripcion">
				Cuéntame qué has leído últimamente, qué te gustó o simplemente qué tienes ganas de encontrar.
			</p>
			<label className="pregunta-librero-etiqueta" htmlFor="pregunta-lectura">
				Escribe qué tipo de lectura buscas
			</label>
			<textarea
				id="pregunta-lectura"
				name="pregunta"
				rows={4}
				maxLength={500}
				placeholder="¿Qué tienes ganas de leer?..."
				aria-describedby="pregunta-librero-nota"
			/>
			<p className="pregunta-librero-nota" id="pregunta-librero-nota">
				Para enviar tu pregunta necesitas una cuenta. Así Gregorio podrá responderte directamente y tendrás tus recomendaciones guardadas para volver a ellas cuando quieras.
			</p>
		</section>
	);
}