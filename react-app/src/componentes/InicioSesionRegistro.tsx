import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import iconoCorreo from "../assets/iconos/14-correo.svg";
import iconoCuentaLista from "../assets/iconos/13-check-circulo.svg";
import iconoVerificacionFallida from "../assets/iconos/15-x-circulo.svg";
import { useAutenticacionStore } from "../estado/autenticacionStore";
import { useCarritoStore } from "../estado/carritoStore";
import { useSesionStore } from "../estado/sesionStore";
import { ErrorApi } from "../servicios/api";
import { reenviarVerificacion } from "../servicios/authServicio";
import { iniciarSesion, registrarse } from "../servicios/checkoutServicio";
import { LARGO_MINIMO_CONTRASENA, REGEX_EMAIL } from "../utils/validacion";
import { Icono } from "./Icono";
import "../estilos/modal-autenticacion.css";

// Modal de inicio de sesión y registro en alta fidelidad (Figma: login-card,
// node 3408:8870, y su estado de error, node 3408:8940). Después de crear la
// cuenta muestra "¡Ya casi estás dentro!", y al volver del enlace del correo,
// "¡Tu cuenta ya está lista!" o "No hemos podido verificar tu cuenta"
// (estado/autenticacionStore.ts).

type ModalInicioSesionRegistroProps = {
	abierto: boolean;
	onCerrar: () => void;
};

type ModoAutenticacion = "inicio" | "registro";

const CAMPOS_VACIOS = {
	nombre: "",
	apellido: "",
	correo: "",
	contrasena: "",
	confirmar: "",
	terminos: false,
	novedades: false,
};

type Campos = typeof CAMPOS_VACIOS;
type Errores = Partial<Record<keyof Campos | "general", string>>;

// Validación del formulario (inicio de sesión o registro)
function validar(campos: Campos, esRegistro: boolean): Errores {
	const errores: Errores = {};
	if (esRegistro && !campos.nombre.trim()) errores.nombre = "Ingresa tu nombre";
	if (esRegistro && !campos.apellido.trim()) errores.apellido = "Ingresa tu apellido";
	if (!REGEX_EMAIL.test(campos.correo.trim())) errores.correo = "Ingresa un correo válido";
	if (campos.contrasena.length < LARGO_MINIMO_CONTRASENA) {
		errores.contrasena = `La contraseña debe tener al menos ${LARGO_MINIMO_CONTRASENA} caracteres`;
	}
	if (esRegistro && campos.confirmar !== campos.contrasena) {
		errores.confirmar = "Las contraseñas no coinciden";
	}
	if (esRegistro && !campos.terminos) {
		errores.terminos = "Debes aceptar los términos para crear tu cuenta";
	}
	return errores;
}

// "camila.rojas@gmail.com" -> "****jas@gmail.com", como en el diseño
function enmascararCorreo(correo: string) {
	const [usuario, dominio] = correo.split("@");
	if (!dominio) return correo;
	return `****${usuario.slice(-3)}@${dominio}`;
}

// Mensajes de la verificación del correo (Figma: nodes 3263:40035, 3262:39965
// y 3263:39974). Comparten el formato: ícono de 108 px, título Bree Serif 36,
// texto y acciones de texto subrayado.
function MensajeAutenticacion({
	variante,
	icono,
	titulo,
	children,
	acciones,
}: {
	variante: "correo" | "exito" | "error";
	icono: string;
	titulo: string;
	children: ReactNode;
	acciones: ReactNode;
}) {
	return (
		<div className={`autenticacion-mensaje autenticacion-mensaje-${variante}`} aria-live="polite">
			<img className="autenticacion-mensaje-icono" src={icono} alt="" />
			<h2 id="autenticacion-titulo">{titulo}</h2>
			<div className="autenticacion-mensaje-texto">{children}</div>
			<div className="autenticacion-mensaje-acciones">{acciones}</div>
		</div>
	);
}

export function ModalInicioSesionRegistro({ abierto, onCerrar }: ModalInicioSesionRegistroProps) {
	const navegar = useNavigate();
	const vista = useAutenticacionStore((estado) => estado.vista);
	const correoVerificacion = useAutenticacionStore((estado) => estado.correo);
	const mostrar = useAutenticacionStore((estado) => estado.mostrar);
	const conSesion = useSesionStore((estado) => Boolean(estado.usuario));
	const iniciar = useSesionStore((estado) => estado.iniciar);

	// ESTADO DEL FORMULARIO ACTUAL
	const [modo, setModo] = useState<ModoAutenticacion>("inicio");
	const [campos, setCampos] = useState(CAMPOS_VACIOS);
	const [errores, setErrores] = useState<Errores>({});
	const [enviando, setEnviando] = useState(false);
	const [verContrasena, setVerContrasena] = useState(false);
	// Resultado de "Reenviar correo"
	const [reenvio, setReenvio] = useState<{ estado: "enviando" | "enviado" | "error"; texto: string } | null>(null);

	const resetearModal = () => {
		setModo("inicio");
		setCampos(CAMPOS_VACIOS);
		setErrores({});
		setVerContrasena(false);
		setReenvio(null);
	};

	const cerrarModal = () => {
		resetearModal();
		onCerrar();
	};

	// CIERRE CON ESCAPE Y BLOQUEO DEL SCROLL
	useEffect(() => {
		if (!abierto) return;

		// El carrito se cierra para que no quede abierto detrás del modal
		useCarritoStore.getState().cerrar();
		const overflowAnterior = document.body.style.overflow;
		const cerrarConEscape = (evento: KeyboardEvent) => {
			if (evento.key === "Escape") cerrarModal();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", cerrarConEscape);

		return () => {
			document.body.style.overflow = overflowAnterior;
			window.removeEventListener("keydown", cerrarConEscape);
		};
	}, [abierto, cerrarModal]);

	if (!abierto) return null;

	const esRegistro = modo === "registro";

	function actualizar<K extends keyof Campos>(campo: K, valor: Campos[K]) {
		setCampos((actuales) => ({ ...actuales, [campo]: valor }));
		setErrores((actuales) => ({ ...actuales, [campo]: undefined, general: undefined }));
	}

	function cambiarModo() {
		setModo(esRegistro ? "inicio" : "registro");
		setErrores({});
		setVerContrasena(false);
	}

	async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
		evento.preventDefault();
		const nuevos = validar(campos, esRegistro);
		setErrores(nuevos);
		if (Object.keys(nuevos).length) return;

		setEnviando(true);
		try {
			const correo = campos.correo.trim();
			const usuario = esRegistro
				? await registrarse({
						nombre: campos.nombre.trim(),
						apellido: campos.apellido.trim(),
						email: correo,
						password: campos.contrasena,
						recibirNovedades: campos.novedades,
					})
				: await iniciarSesion({ email: correo, password: campos.contrasena });
			iniciar(usuario);
			resetearModal();
			if (esRegistro) {
				mostrar("verificacion-enviada", correo);
				return;
			}
			onCerrar();
		} catch (error) {
			// Credenciales incorrectas: ambos campos en rojo y el mensaje bajo el
			// correo (Figma: estado de error, node 3408:8940)
			if (!esRegistro && error instanceof ErrorApi && error.statusCode === 401) {
				setErrores({ correo: "Correo electrónico o contraseña no coinciden.", contrasena: " " });
				return;
			}
			setErrores({
				general: error instanceof Error ? error.message : "No pudimos procesar tu solicitud",
			});
		} finally {
			setEnviando(false);
		}
	}

	// "Reenviar correo": la API lo envía al correo de la cuenta con sesión
	async function reenviarCorreo() {
		if (!conSesion) {
			setReenvio({ estado: "error", texto: "Inicia sesión para que te enviemos un nuevo correo." });
			return;
		}
		setReenvio({ estado: "enviando", texto: "Enviando…" });
		try {
			await reenviarVerificacion();
			setReenvio({ estado: "enviado", texto: "Te enviamos un nuevo correo." });
		} catch (error) {
			const yaVerificada = error instanceof ErrorApi && error.statusCode === 409;
			setReenvio({
				estado: yaVerificada ? "enviado" : "error",
				texto: yaVerificada
					? "Tu cuenta ya está verificada."
					: error instanceof Error
						? error.message
						: "No pudimos reenviar el correo.",
			});
		}
	}

	// Atributos de accesibilidad y mensaje de error de cada campo
	const estadoCampo = (campo: keyof Campos) => ({
		"aria-invalid": Boolean(errores[campo]) || undefined,
		"aria-describedby": errores[campo]?.trim() ? `error-${campo}` : undefined,
	});
	const mensajeError = (campo: keyof Campos) =>
		errores[campo]?.trim() && (
			<span className="autenticacion-error" id={`error-${campo}`}>
				{errores[campo]}
			</span>
		);

	// Botón "Reenviar correo" y su resultado
	const botonReenviar = (
		<button
			type="button"
			className="autenticacion-texto-boton"
			disabled={reenvio?.estado === "enviando"}
			onClick={() => void reenviarCorreo()}
		>
			Reenviar correo
		</button>
	);
	const estadoReenvio = reenvio && (
		<p className={`autenticacion-reenvio autenticacion-reenvio-${reenvio.estado}`} role="status">
			{reenvio.texto}
		</p>
	);

	let contenido: ReactNode;
	if (vista === "verificacion-enviada") {
		contenido = (
			<MensajeAutenticacion
				variante="correo"
				icono={iconoCorreo}
				titulo="¡Ya casi estás dentro!"
				acciones={
					<>
						{botonReenviar}
						<button type="button" className="autenticacion-texto-boton" onClick={cerrarModal}>
							Continuar
							<Icono nombre="flechaDerecha" />
						</button>
					</>
				}
			>
				<p>
					Te enviamos un correo a {enmascararCorreo(correoVerificacion)} para verificar
					tu cuenta. Solo tienes que abrirlo y hacer clic en el enlace.
				</p>
				<p>
					<strong>¿No lo encuentras?</strong>
					<br />
					Revisa tu bandeja de spam o promociones
				</p>
				{estadoReenvio}
			</MensajeAutenticacion>
		);
	} else if (vista === "cuenta-lista") {
		contenido = (
			<MensajeAutenticacion
				variante="exito"
				icono={iconoCuentaLista}
				titulo="¡Tu cuenta ya está lista!"
				acciones={
					<button
						type="button"
						className="autenticacion-texto-boton autenticacion-texto-boton-marca"
						onClick={() => {
							cerrarModal();
							navegar("/catalogo");
						}}
					>
						Comenzar a explorar
					</button>
				}
			>
				<p>
					Tu cuenta fue verificada correctamente.
					<br />
					Ya puedes descubrir nuevas lecturas, guardar tus favoritos y recibir recomendaciones
				</p>
			</MensajeAutenticacion>
		);
	} else if (vista === "verificacion-fallida") {
		contenido = (
			<MensajeAutenticacion
				variante="error"
				icono={iconoVerificacionFallida}
				titulo="No hemos podido verificar tu cuenta"
				acciones={botonReenviar}
			>
				<p>
					El enlace de verificación no es válido o ha expirado.
					<br />
					Solicita un nuevo correo para continuar con la activación de tu cuenta.
				</p>
				{estadoReenvio}
			</MensajeAutenticacion>
		);
	} else {
		contenido = (
			<div className="autenticacion-tarjeta">
				{/*SALUDO*/}
				<header className="autenticacion-encabezado">
					<h2 id="autenticacion-titulo">
						{esRegistro ? (
							"Crea tu cuenta"
						) : (
							<>
								¡Hola, <span>lector!</span>
							</>
						)}
					</h2>
					<p>
						{esRegistro
							? "Guarda tus favoritos y recibe recomendaciones de nuestros libreros."
							: "Inicia sesión para descubrir buenas lecturas."}
					</p>
				</header>

				{/*FORMULARIO DE INICIO DE SESION O REGISTRO*/}
				<form className="autenticacion-formulario" onSubmit={enviarFormulario} noValidate>
					{esRegistro && (
						<div className="autenticacion-campos-dobles">
							<div className="autenticacion-campo">
								<label htmlFor="autenticacion-nombre">Nombre</label>
								<input
									id="autenticacion-nombre"
									type="text"
									name="nombre"
									placeholder="Nombre"
									autoComplete="given-name"
									required
									value={campos.nombre}
									onChange={(evento) => actualizar("nombre", evento.target.value)}
									{...estadoCampo("nombre")}
								/>
								{mensajeError("nombre")}
							</div>
							<div className="autenticacion-campo">
								<label htmlFor="autenticacion-apellido">Apellido</label>
								<input
									id="autenticacion-apellido"
									type="text"
									name="apellido"
									placeholder="Apellido"
									autoComplete="family-name"
									required
									value={campos.apellido}
									onChange={(evento) => actualizar("apellido", evento.target.value)}
									{...estadoCampo("apellido")}
								/>
								{mensajeError("apellido")}
							</div>
						</div>
					)}

					<div className="autenticacion-campo">
						<label htmlFor="autenticacion-correo">Correo electrónico</label>
						<input
							id="autenticacion-correo"
							type="email"
							name="correo"
							placeholder="Correo electrónico"
							autoComplete="email"
							required
							value={campos.correo}
							onChange={(evento) => actualizar("correo", evento.target.value)}
							{...estadoCampo("correo")}
						/>
						{mensajeError("correo")}
					</div>

					<div className="autenticacion-campo">
						<label htmlFor="autenticacion-contrasena">Contraseña</label>
						<div className="autenticacion-campo-con-boton">
							<input
								id="autenticacion-contrasena"
								type={verContrasena ? "text" : "password"}
								name="contrasena"
								placeholder="Contraseña"
								autoComplete={esRegistro ? "new-password" : "current-password"}
								minLength={LARGO_MINIMO_CONTRASENA}
								required
								value={campos.contrasena}
								onChange={(evento) => actualizar("contrasena", evento.target.value)}
								{...estadoCampo("contrasena")}
							/>
							<button
								type="button"
								aria-label={verContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
								aria-pressed={verContrasena}
								onClick={() => setVerContrasena((ver) => !ver)}
							>
								<Icono nombre={verContrasena ? "ver" : "ocultar"} />
							</button>
						</div>
						{mensajeError("contrasena")}
					</div>

					{esRegistro ? (
						<>
							<div className="autenticacion-campo">
								<label htmlFor="autenticacion-confirmar">Confirmar contraseña</label>
								<input
									id="autenticacion-confirmar"
									type={verContrasena ? "text" : "password"}
									name="confirmar-contrasena"
									placeholder="Confirmar contraseña"
									autoComplete="new-password"
									required
									value={campos.confirmar}
									onChange={(evento) => actualizar("confirmar", evento.target.value)}
									{...estadoCampo("confirmar")}
								/>
								{mensajeError("confirmar")}
							</div>
							<label className="autenticacion-checkbox">
								<input
									type="checkbox"
									name="terminos"
									required
									checked={campos.terminos}
									onChange={(evento) => actualizar("terminos", evento.target.checked)}
									{...estadoCampo("terminos")}
								/>
								<span>Acepto los términos de servicio y la política de privacidad.</span>
							</label>
							{mensajeError("terminos")}
							<label className="autenticacion-checkbox">
								<input
									type="checkbox"
									name="novedades"
									checked={campos.novedades}
									onChange={(evento) => actualizar("novedades", evento.target.checked)}
								/>
								<span>Quiero recibir novedades y recomendaciones por correo.</span>
							</label>
						</>
					) : (
						// Diseñado; la recuperación de contraseña aún no tiene pantalla
						<p className="autenticacion-recuperar">
							<button type="button">¿Olvidaste tu contraseña?</button>
						</p>
					)}

					{errores.general && (
						<p className="autenticacion-error autenticacion-error-general" role="alert">
							{errores.general}
						</p>
					)}

					<div className="autenticacion-acciones">
						<button className="autenticacion-enviar" type="submit" disabled={enviando}>
							{enviando ? "Enviando..." : esRegistro ? "Crear cuenta" : "Iniciar sesión"}
						</button>
						<p className="autenticacion-cambiar">
							{esRegistro ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}
							<button type="button" onClick={cambiarModo}>
								{esRegistro ? "Inicia sesión" : "Regístrate aquí"}
							</button>
						</p>
					</div>
				</form>

				{/*ACCESO CON GOOGLE O FACEBOOK (diseñado; falta la configuración en Backend)*/}
				<div className="autenticacion-separador">
					<span>O continúa con</span>
				</div>
				<div className="autenticacion-social">
					<button type="button">
						<Icono nombre="google" />
						Continuar con Google
					</button>
					<button type="button">
						<Icono nombre="facebook" />
						Continuar con Facebook
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className="autenticacion-overlay"
			role="presentation"
			onMouseDown={(evento) => {
				if (evento.target === evento.currentTarget) cerrarModal();
			}}
		>
			<section
				className={`autenticacion-dialogo${vista === "formulario" ? "" : " autenticacion-dialogo-mensaje"}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby="autenticacion-titulo"
			>
				<button className="autenticacion-cerrar" type="button" aria-label="Cerrar ventana" onClick={cerrarModal}>
					<Icono nombre="cerrar" />
				</button>
				{contenido}
			</section>
		</div>
	);
}
