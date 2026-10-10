import { useState } from "react";
import { Footer } from "../componentes/Footer";
import { Carrusel } from "../componentes/Carrusel";
import { Icono } from "../componentes/Icono";
import { PreguntaLibrero } from "../componentes/PreguntaLibrero.tsx";
import { TarjetaLibro } from "../componentes/TarjetaLibro";
import "../estilos/perfil-librero.css";

// LIBROS INDISPENSABLES DEL LIBRERO
const libros = [
	{ titulo: "La metamorfosis", autor: "Franz Kafka" },
	{ titulo: "El extranjero", autor: "Albert Camus" },
	{ titulo: "El túnel", autor: "Ernesto Sabato" },
	{ titulo: "La náusea", autor: "Jean-Paul Sartre" },
	{ titulo: "Ensayo sobre la ceguera", autor: "José Saramago" },
];

// AUTORES FAVORITOS DEL LIBRERO
const autores = ["Franz Kafka", "Milan Kundera", "Han Kang", "George Orwell"];

// LIBROS DE LAS ULTIMAS RECOMENDACIONES
const ultimasRecomendaciones = libros.map((libro) => ({
	nombreCurador: "Gregorio S.",
	imagenCurador: "https://placehold.co/30/000000/ffffff",
	portada: "https://placehold.co/250x200",
	titulo: libro.titulo,
	autor: libro.autor,
	precio: 20150,
}));
// ESTILOS LITERARIOS FAVORITOS
const generos = [
	"Existencialismo",
	"Distopía",
	"Contemporáneo",
	"Ficción psicológica",
	"Crítica social",
	"Terror psicológico",
];

// COLECCIONES DEL LIBRERO
const colecciones = [
	{
		titulo: "Para cuando todo te parece absurdo",
		descripcion: "5 libros para una crisis existencial",
		fecha: "Agosto 24, 2026",
	},
	{
		titulo: "Personajes difíciles de olvidar",
		descripcion: "Historias protagonizadas por personas bastante complicadas",
		fecha: "Marzo 05, 2026",
	},
	{
		titulo: "No todo está bien",
		descripcion: "Distopías que se parecen demasiado a nosotros",
		fecha: "Enero 09, 2026",
	},
];

function PerfilLibrero() {
	// ESTADOS DE INTERACCION DEL PERFIL
	const [guardados, setGuardados] = useState<number[]>([]);
	const [mostrarColecciones, setMostrarColecciones] = useState(false);
	const [libroAleatorio, setLibroAleatorio] = useState(0);
	const [mostrarRecomendacion, setMostrarRecomendacion] = useState(false);
	const [compartido, setCompartido] = useState(false);
	const [errorCompartir, setErrorCompartir] = useState("");

	// ACCIONES DEL PERFIL
	function alternarGuardado(indice: number) {
		setGuardados((actuales) =>
			actuales.includes(indice)
				? actuales.filter((guardado) => guardado !== indice)
				: [...actuales, indice],
		);
	}

	function recomendarAlAzar() {
		setLibroAleatorio(Math.floor(Math.random() * libros.length));
		setMostrarRecomendacion(true);
	}

	async function compartirPerfil() {
		setCompartido(false);
		setErrorCompartir("");
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Gregorio Samsa | LeeConNos",
					url: window.location.href,
				});
				return;
			}

			if (!navigator.clipboard) {
				throw new Error("Compartir no está disponible en este navegador.");
			}
			await navigator.clipboard.writeText(window.location.href);
			setCompartido(true);
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") return;
			setErrorCompartir(
				error instanceof Error
					? error.message
					: "No se pudo compartir el perfil. Intenta nuevamente.",
			);
		}
	}

	const libroDestacado = libros[libroAleatorio];
	const coleccionesVisibles = mostrarColecciones
		? [
				...colecciones,
				{
					titulo: "Lecturas para noches largas",
					descripcion: "Libros que siguen contigo después de cerrar la última página",
					fecha: "Octubre 18, 2025",
				},
			]
		: colecciones;

	return (
		<>
			{/*CONTENIDO PERFIL LIBRERO*/}
			<main className="perfil-librero">
				{/*PRESENTACION DEL LIBRERO*/}
				<section className="perfil-presentacion" aria-labelledby="perfil-titulo">
					{/*BIOGRAFIA Y ACCIONES DEL LIBRERO*/}
					<div className="perfil-introduccion">
						<div className="perfil-generos" aria-label="Géneros favoritos">
							{generos.slice(0, 3).map((genero) => (
								<span className="perfil-etiqueta" key={genero}>{genero}</span>
							))}
						</div>
						<h1 id="perfil-titulo">Gregorio Samsa</h1>
						<p className="perfil-cita">
							“Me gustan los libros que terminan y te dejan mirando el techo un rato.”
						</p>
						<p className="perfil-biografia">
							Te recomiendo historias extrañas, incómodas y profundamente humanas.
							Me interesan los personajes que no terminan de encajar, las sociedades
							que parecen funcionar pero no tanto y los libros que dejan más preguntas
							que respuestas.
						</p>
						<div className="perfil-acciones">
							<a className="perfil-boton perfil-boton-principal" href="#recomendaciones">
								<Icono nombre="guardarFavorito" />
								Recomendaciones
							</a>
							<button className="perfil-boton perfil-boton-texto" type="button" onClick={recomendarAlAzar}>
								<Icono nombre="actualizar" />
								Recomiéndame al azar
							</button>
						</div>
					</div>
					{/*FOTO DEL PERFIL*/}
					<div className="perfil-foto">
						<img src="https://placehold.co/600x400" alt="Retrato de Gregorio Samsa, imagen de 600 por 400 píxeles" />
						<button className="perfil-compartir" type="button" onClick={compartirPerfil}>
							<Icono nombre="compartir" />
							{compartido ? "Enlace copiado" : "Compartir"}
						</button>
						{(errorCompartir || compartido) && (
							<span role="status">
								{errorCompartir || "Enlace copiado al portapapeles."}
							</span>
						)}
					</div>
				</section>

				{/*LIBROS INDISPENSABLES Y PREFERENCIAS*/}
				<section className="perfil-descubrimiento" id="recomendaciones">
					{/*LISTA DE LOS 5 LIBROS INDISPENSABLES*/}
					<div className="perfil-top-lista">
						<h2>Mis 5 libros indispensables</h2>
						<ol className="perfil-libros">
							{libros.map((libro, indice) => (
								<li className="perfil-libro" key={libro.titulo}>
									<span className="perfil-libro-numero">{String(indice + 1).padStart(2, "0")}.</span>
									<span className="perfil-libro-portada" aria-hidden="true" />
									<span className="perfil-libro-info">
										<strong>{libro.titulo}</strong>
										<small>{libro.autor}</small>
									</span>
									<button
										className="perfil-favorito"
										type="button"
										aria-label={guardados.includes(indice) ? `Quitar ${libro.titulo} de favoritos` : `Guardar ${libro.titulo} en favoritos`}
										aria-pressed={guardados.includes(indice)}
										onClick={() => alternarGuardado(indice)}
									>
										<Icono nombre={guardados.includes(indice) ? "favoritoActivo" : "favorito"} />
									</button>
								</li>
							))}
						</ol>
					</div>

					{/*PREFERENCIAS LITERARIAS*/}
					<aside className="perfil-preferencias" aria-label="Preferencias de lectura">
						{/*GENEROS LITERARIOS*/}
						<section className="perfil-generos-seccion">
							<h2>Estilos literarios</h2>
							<div className="perfil-generos perfil-generos-completos">
								{generos.map((genero) => (
									<span className="perfil-etiqueta" key={genero}>{genero}</span>
								))}
							</div>
						</section>
						{/*AUTORES FAVORITOS*/}
						<section className="perfil-autores-seccion">
							<h2>Autores favoritos</h2>
							<div className="perfil-autores">
								{autores.map((autor, indice) => (
									<article className="perfil-autor" key={autor}>
										<div className={`perfil-autor-retrato retrato-${indice + 1}`} aria-hidden="true">
											{autor.split(" ").map((parte) => parte[0]).join("")}
										</div>
										<span>{autor}</span>
									</article>
								))}
							</div>
							<div className="perfil-paginacion" aria-label="Página 1 de autores favoritos">
								<span className="activo" />
								<span />
								<span />
							</div>
						</section>
					</aside>
				</section>

				{/*COLECCIONES DEL LIBRERO*/}
                <section className="perfil-colecciones" aria-labelledby="colecciones-titulo">
					<h2 id="colecciones-titulo">Colecciones</h2>
					<div className="perfil-colecciones-lista">
						{coleccionesVisibles.map((coleccion, indice) => (
							<article className="perfil-coleccion" key={coleccion.titulo}>
								<div className="perfil-coleccion-texto">
									<h3>{coleccion.titulo}</h3>
									<p>{coleccion.descripcion}</p>
								</div>
								<time>{coleccion.fecha}</time>
								<button className="perfil-guardar-coleccion" type="button" onClick={() => alternarGuardado(indice + libros.length)}>
									{guardados.includes(indice + libros.length) ? "Guardada" : "Guardar colección"}
									<Icono nombre={guardados.includes(indice + libros.length) ? "guardarActivo" : "guardar"} />
								</button>
							</article>
						))}
					</div>
					<button
						className="perfil-ver-mas"
						type="button"
						aria-expanded={mostrarColecciones}
						onClick={() => setMostrarColecciones((mostrar) => !mostrar)}
					>
						{mostrarColecciones ? "Ver menos" : "Ver más"}
						<Icono nombre={mostrarColecciones ? "arriba" : "abajo"} />
					</button>
				</section>

				{/*CARRUSEL DE ULTIMAS RECOMENDACIONES*/}
				<section className="perfil-ultimas-recomendaciones">
					<Carrusel titulo="Últimas recomendaciones" variante="recomendaciones">
						{ultimasRecomendaciones.map((libro) => (
							<TarjetaLibro
								key={libro.titulo}
								{...libro}
								className="carrusel-recomendaciones-tarjeta"
							/>
						))}
					</Carrusel>
				</section>

				<PreguntaLibrero />

				{/*RECOMENDACION ALEATORIA*/}
				<div className={`perfil-recomendacion-toast ${mostrarRecomendacion ? "visible" : ""}`} aria-live="polite">
					Recomendación al azar: <strong>{libroDestacado.titulo}</strong> · {libroDestacado.autor}
				</div>
			</main>
			{/*PIE DE PAGINA*/}
			<Footer />
		</>
	);
}

export default PerfilLibrero;
