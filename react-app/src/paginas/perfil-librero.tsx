import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Footer } from "../componentes/Footer";
import { Carrusel } from "../componentes/Carrusel";
import { Icono } from "../componentes/Icono";
import { PreguntaLibrero } from "../componentes/PreguntaLibrero.tsx";
import { TarjetaRecomendacion } from "../componentes/TarjetaRecomendacion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { LIBREROS, buscarLibrero, type Librero } from "../datos/libreros";
import "../estilos/perfil-librero.css";
import { IMAGENES_RELLENO } from "../datos/imagenes";

// Wireframes "Perfiles de libreros" (Figma: Wireframes Desktop, nodes
// 1547:4321, 1547:4583, 1547:4849 y 1584:4835). Muestra el librero indicado
// en ?librero=<id>; sin id, el primero (Gregorio Samsa).

function PerfilLibrero() {
	const [searchParams] = useSearchParams();
	const librero = buscarLibrero(searchParams.get("librero")) ?? LIBREROS[0];

	// Cada perfil parte con sus estados reiniciados
	return <PerfilContenido key={librero.id} librero={librero} />;
}

function PerfilContenido({ librero }: { librero: Librero }) {
	const libros = librero.indispensables;
	const generos = librero.estilos;

	useTituloPagina(librero.nombre);

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
					title: `${librero.nombre} | LeeConNos`,
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
		? [...librero.colecciones, librero.coleccionExtra]
		: librero.colecciones;

	return (
		<>
			{/*CONTENIDO PERFIL LIBRERO*/}
			<main className="perfil-librero">
				{/*PRESENTACION DEL LIBRERO*/}
				<section className="perfil-presentacion" aria-labelledby="perfil-titulo">
					{/*BIOGRAFIA Y ACCIONES DEL LIBRERO*/}
					<div className="perfil-introduccion">
						<div className="perfil-generos" aria-label="Géneros favoritos">
							{librero.etiquetas.map((genero) => (
								<span className="perfil-etiqueta" key={genero}>{genero}</span>
							))}
						</div>
						<h1 id="perfil-titulo">{librero.nombre}</h1>
						<p className="perfil-cita">{librero.cita}</p>
						<p className="perfil-biografia">{librero.biografia}</p>
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
						<img src={IMAGENES_RELLENO.retrato} alt={`Retrato de ${librero.nombre}`} />
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
								{librero.autores.map((autor, indice) => (
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
					<Carrusel
						titulo="Últimas recomendaciones"
						variante="recomendaciones"
						className="carrusel-tarjetas-recomendacion"
						mostrarVerMas={false}
					>
						{librero.ultimasRecomendaciones.map((libro) => (
							<TarjetaRecomendacion
								key={libro.titulo}
								nombreLibrero={librero.nombreCorto}
								imagenLibrero={IMAGENES_RELLENO.avatar}
								portada={IMAGENES_RELLENO.portadaHorizontal}
								titulo={libro.titulo}
								autor={libro.autor}
								calificacion={4.5}
								opiniones={12}
							/>
						))}
					</Carrusel>
				</section>

				<PreguntaLibrero nombre={librero.nombre.split(" ")[0]} />

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
