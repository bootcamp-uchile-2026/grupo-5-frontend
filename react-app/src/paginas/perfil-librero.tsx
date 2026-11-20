import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BotonFavorito } from "../componentes/BotonFavorito";
import { Carrusel } from "../componentes/Carrusel";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import { MensajeError } from "../componentes/MensajeError";
import { Portada } from "../componentes/Portada";
import { PreguntaLibrero } from "../componentes/PreguntaLibrero.tsx";
import { TarjetaRecomendacion } from "../componentes/TarjetaRecomendacion";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { IMAGENES_RELLENO } from "../datos/imagenes";
import { FOTOS_AUTORES, FOTOS_LIBREROS, PORTADAS_LIBREROS, type Librero } from "../datos/libreros";
import { ErrorApi } from "../servicios/api";
import { obtenerLibrero } from "../servicios/libreroServicio";
import "../estilos/perfil-librero.css";

// Perfil del librero en alta fidelidad (Figma: Perfil librero de Gregorio
// Samsa, node 3516:27619). Muestra el librero indicado en ?librero=<slug>
// (GET /libreros/{slug}); sin slug, Gregorio Samsa.

function PerfilLibrero() {
	const [searchParams] = useSearchParams();
	const slug = searchParams.get("librero");
	const peticion = usePeticion(() => obtenerLibrero(slug), slug ?? "");

	if (peticion.error) {
		// Librero inexistente: no tiene sentido reintentar
		const noExiste = peticion.error instanceof ErrorApi && peticion.error.statusCode === 404;
		return (
			<main className="perfil-librero">
				<MensajeError
					error={peticion.error}
					onReintentar={noExiste ? undefined : peticion.reintentar}
					enlace={{ texto: "Volver al inicio", ruta: "/" }}
					className="perfil-estado"
				/>
			</main>
		);
	}

	if (peticion.cargando || !peticion.datos) {
		return (
			<main className="perfil-librero">
				<EstadoCarga texto="Cargando perfil..." className="perfil-estado" />
			</main>
		);
	}

	// Cada perfil parte con sus estados reiniciados
	return <PerfilContenido key={peticion.datos.id} librero={peticion.datos} />;
}

// "Franz Kafka" -> "FK", para los autores sin foto
const iniciales = (nombre: string) =>
	nombre
		.split(" ")
		.map((parte) => parte[0])
		.join("")
		.slice(0, 2);

// La API entrega la cita sin comillas y los datos dummy, con comillas
const conComillas = (cita: string) => `“${cita.replace(/^["“]|["”]$/g, "")}”`;

// También la usa "Mi perfil de librero" (paginas/mi-perfil-librero.tsx)
export function PerfilContenido({ librero }: { librero: Librero }) {
	const libros = librero.indispensables;
	const foto = FOTOS_LIBREROS[librero.id];
	const portada = PORTADAS_LIBREROS[librero.id];

	useTituloPagina(librero.nombre);

	// ESTADOS DE INTERACCION DEL PERFIL
	// Indispensables sin libro en el catálogo y colecciones: se guardan solo
	// en esta visita (la API no tiene dónde guardarlos)
	const [guardados, setGuardados] = useState<string[]>([]);
	const [mostrarColecciones, setMostrarColecciones] = useState(false);
	const [compartido, setCompartido] = useState(false);
	const [errorCompartir, setErrorCompartir] = useState("");

	// ACCIONES DEL PERFIL
	function alternarGuardado(clave: string) {
		setGuardados((actuales) =>
			actuales.includes(clave)
				? actuales.filter((guardado) => guardado !== clave)
				: [...actuales, clave],
		);
	}

	// Siempre se comparte el perfil público, también desde "Mi perfil de librero"
	const enlacePerfil = `${window.location.origin}/perfil-librero?librero=${librero.id}`;

	async function compartirPerfil() {
		setCompartido(false);
		setErrorCompartir("");
		try {
			if (navigator.share) {
				await navigator.share({
					title: `${librero.nombre} | LeeConNos`,
					url: enlacePerfil,
				});
				return;
			}

			if (!navigator.clipboard) {
				throw new Error("Compartir no está disponible en este navegador.");
			}
			await navigator.clipboard.writeText(enlacePerfil);
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

	const coleccionesVisibles = mostrarColecciones
		? [...librero.colecciones, ...librero.coleccionesExtra]
		: librero.colecciones;

	return (
		<>
			{/*CONTENIDO PERFIL LIBRERO*/}
			<main className="perfil-librero">
				{/*PRESENTACION DEL LIBRERO: franja oscura con la foto grande*/}
				<section className="perfil-presentacion" aria-labelledby="perfil-titulo">
					<div className="perfil-presentacion-columna">
						{portada && <img className="perfil-portada" src={portada} alt="" />}
						<div className="perfil-introduccion">
							<div className="perfil-encabezado">
								{foto ? (
									<img className="perfil-avatar" src={foto} alt="" />
								) : (
									<span className="perfil-avatar" aria-hidden="true">
										{iniciales(librero.nombre)}
									</span>
								)}
								<div className="perfil-generos" aria-label="Géneros favoritos">
									{librero.etiquetas.map((genero) => (
										<span className="perfil-etiqueta" key={genero}>{genero}</span>
									))}
								</div>
							</div>
							<h1 id="perfil-titulo">{librero.nombre}</h1>
							{librero.cita && <p className="perfil-cita">{conComillas(librero.cita)}</p>}
							<p className="perfil-biografia">{librero.biografia}</p>
							<div className="perfil-acciones">
								<button className="perfil-boton perfil-boton-compartir" type="button" onClick={compartirPerfil}>
									<Icono nombre="compartir" />
									{compartido ? "Enlace copiado" : "Compartir"}
								</button>
								<a className="perfil-boton perfil-boton-recomendaciones" href="#recomendaciones">
									<Icono nombre="guardar" />
									Recomendaciones
								</a>
							</div>
							{(errorCompartir || compartido) && (
								<p className="perfil-compartir-estado" role="status">
									{errorCompartir || "Enlace copiado al portapapeles."}
								</p>
							)}
						</div>
					</div>
				</section>

				{/*LIBROS INDISPENSABLES Y PREFERENCIAS*/}
				<section className="perfil-descubrimiento">
					<div className="perfil-columna">
						{/*LISTA DE LOS 5 LIBROS INDISPENSABLES*/}
						<div className="perfil-top-lista">
							<h2>Mis {libros.length} libros indispensables</h2>
							<ol className="perfil-libros">
								{libros.map((libro, indice) => {
									const clave = `libro-${libro.titulo}`;
									const guardado = guardados.includes(clave);
									return (
										<li className="perfil-libro" key={libro.titulo}>
											<Portada className="perfil-libro-portada" src={libro.portada} alt="" />
											<span className="perfil-libro-numero">{String(indice + 1).padStart(2, "0")}.</span>
											<span className="perfil-libro-info">
												{libro.idLibro ? (
													<Link to={`/ficha-libro?libro=${encodeURIComponent(libro.idLibro)}`}>{libro.titulo}</Link>
												) : (
													<strong>{libro.titulo}</strong>
												)}
												<small>{libro.autor}</small>
											</span>
											{libro.idLibro ? (
												<BotonFavorito idLibro={libro.idLibro} titulo={libro.titulo} className="perfil-favorito" />
											) : (
												<button
													className="perfil-favorito"
													type="button"
													aria-label={guardado ? `Quitar ${libro.titulo} de favoritos` : `Guardar ${libro.titulo} en favoritos`}
													aria-pressed={guardado}
													onClick={() => alternarGuardado(clave)}
												>
													<Icono nombre={guardado ? "favoritoActivo" : "favorito"} />
												</button>
											)}
										</li>
									);
								})}
							</ol>
						</div>

						{/*PREFERENCIAS LITERARIAS*/}
						<aside className="perfil-preferencias" aria-label="Preferencias de lectura">
							{/*ESTILOS LITERARIOS*/}
							<section className="perfil-estilos">
								<h2>Estilos literarios</h2>
								<div className="perfil-generos">
									{librero.estilos.map((genero) => (
										<span className="perfil-etiqueta" key={genero}>{genero}</span>
									))}
								</div>
							</section>
							{/*AUTORES FAVORITOS*/}
							<Carrusel
								titulo="Autores favoritos"
								variante="autores"
								className="perfil-autores"
								mostrarVerMas={false}
								flechasLaterales
							>
								{librero.autores.map((autor) => (
									<article className="perfil-autor" key={autor}>
										{FOTOS_AUTORES[autor] ? (
											<img className="perfil-autor-retrato" src={FOTOS_AUTORES[autor]} alt="" />
										) : (
											<span className="perfil-autor-retrato" aria-hidden="true">{iniciales(autor)}</span>
										)}
										<span>{autor}</span>
									</article>
								))}
							</Carrusel>
						</aside>
					</div>
				</section>

				{/*COLECCIONES DEL LIBRERO*/}
				<section className="perfil-colecciones" aria-labelledby="colecciones-titulo">
					<h2 id="colecciones-titulo">Colecciones</h2>
					<div className="perfil-colecciones-lista">
						{coleccionesVisibles.map((coleccion) => {
							const clave = `coleccion-${coleccion.titulo}`;
							const guardada = guardados.includes(clave);
							return (
								<article className="perfil-coleccion" key={coleccion.titulo}>
									<div className="perfil-coleccion-texto">
										<h3>{coleccion.titulo}</h3>
										<p>{coleccion.descripcion}</p>
									</div>
									<time>{coleccion.fecha}</time>
									<button
										className="perfil-guardar-coleccion"
										type="button"
										aria-pressed={guardada}
										onClick={() => alternarGuardado(clave)}
									>
										{guardada ? "Colección guardada" : "Guardar colección"}
										<Icono nombre={guardada ? "guardarActivo" : "guardar"} />
									</button>
								</article>
							);
						})}
					</div>
					{librero.coleccionesExtra.length > 0 && (
						<button
							className="perfil-ver-mas"
							type="button"
							aria-expanded={mostrarColecciones}
							onClick={() => setMostrarColecciones((mostrar) => !mostrar)}
						>
							{mostrarColecciones ? "Ver menos" : "Ver más"}
							<Icono nombre={mostrarColecciones ? "arriba" : "abajo"} />
						</button>
					)}
				</section>

				{/*CARRUSEL DE ULTIMAS RECOMENDACIONES (destino del botón "Recomendaciones")*/}
				<div className="perfil-ultimas-recomendaciones" id="recomendaciones">
					<Carrusel
						titulo="Últimas recomendaciones"
						variante="recomendaciones"
						className="inicio-recomendados carrusel-tarjetas-recomendacion"
						mostrarVerMas={false}
					>
						{librero.ultimasRecomendaciones.map((libro) => (
							<TarjetaRecomendacion
								key={libro.titulo}
								idLibro={libro.idLibro}
								nombreLibrero={librero.nombreCorto}
								imagenLibrero={foto ?? IMAGENES_RELLENO.avatar}
								portada={libro.portada ?? IMAGENES_RELLENO.portadaHorizontal}
								titulo={libro.titulo}
								autor={libro.autor}
								calificacion={libro.calificacion ?? 4.5}
								opiniones={libro.opiniones ?? 12}
							/>
						))}
					</Carrusel>
				</div>

				<PreguntaLibrero librero={librero} />
			</main>
			{/*PIE DE PAGINA*/}
			<Footer />
		</>
	);
}

export default PerfilLibrero;
