import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icono } from "./Icono";
import { CuentaVerificada } from "./CuentaVerificada";
import { useSesionStore } from "../estado/sesionStore";
import { iniciarSesion, registrarse } from "../servicios/checkoutServicio";
import type { LoginResponse } from "../tipos/checkout";
import { LARGO_MINIMO_CONTRASENA, REGEX_EMAIL } from "../utils/validacion";
import "../estilos/modal-autenticacion.css";

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

export function ModalInicioSesionRegistro({ abierto, onCerrar }: ModalInicioSesionRegistroProps) {
	// ESTADO DEL FORMULARIO ACTUAL
	const [modo, setModo] = useState<ModoAutenticacion>("inicio");
	const [campos, setCampos] = useState(CAMPOS_VACIOS);
	const [errores, setErrores] = useState<Errores>({});
	const [enviando, setEnviando] = useState(false);
	const [registroExitoso, setRegistroExitoso] = useState(false);
	const [cuentaVerificada, setCuentaVerificada] = useState(false);
	const [correoConfirmacion, setCorreoConfirmacion] = useState("");
	const [usuarioPendiente, setUsuarioPendiente] = useState<LoginResponse | null>(null);
	const iniciar = useSesionStore((estado) => estado.iniciar);
	const navegar = useNavigate();

	const resetearModal = () => {
		setModo("inicio");
		setCampos(CAMPOS_VACIOS);
		setErrores({});
		setRegistroExitoso(false);
		setCuentaVerificada(false);
		setCorreoConfirmacion("");
		setUsuarioPendiente(null);
	};

	const cerrarModal = () => {
		resetearModal();
		onCerrar();
	};

	// CIERRE CON ESCAPE Y BLOQUEO DEL SCROLL
	useEffect(() => {
		if (!abierto) return;

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

	function continuarDespuesDeVerificar() {
		if (usuarioPendiente) iniciar(usuarioPendiente);
		setCuentaVerificada(true);
	}

	function comenzarAExplorar() {
		cerrarModal();
		navegar("/catalogo");
	}

	function actualizar<K extends keyof Campos>(campo: K, valor: Campos[K]) {
		setCampos((actuales) => ({ ...actuales, [campo]: valor }));
		setErrores((actuales) => ({ ...actuales, [campo]: undefined, general: undefined }));
	}

	function cambiarModo() {
		setModo(esRegistro ? "inicio" : "registro");
		setErrores({});
	}

	// ENVIO AL SERVICIO DUMMY DE AUTENTICACION (la sesión queda en Zustand)
	async function enviarFormulario(evento: SubmitEvent<HTMLFormElement>) {
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
			if (esRegistro) {
				setUsuarioPendiente(usuario);
				setCorreoConfirmacion(correo);
				setRegistroExitoso(true);
				setCampos(CAMPOS_VACIOS);
				return;
			}
			iniciar(usuario);
			setCampos(CAMPOS_VACIOS);
			cerrarModal();
		} catch (error) {
			setErrores({
				general: error instanceof Error ? error.message : "No pudimos procesar tu solicitud",
			});
		} finally {
			setEnviando(false);
		}
	}

	// Atributos de accesibilidad y mensaje de error de cada campo
	const estadoCampo = (campo: keyof Campos) => ({
		"aria-invalid": Boolean(errores[campo]) || undefined,
		"aria-describedby": errores[campo] ? `error-${campo}` : undefined,
	});
	const mensajeError = (campo: keyof Campos) =>
		errores[campo] && (
			<span className="autenticacion-error" id={`error-${campo}`}>
				{errores[campo]}
			</span>
		);

	return (
		<div
			className="autenticacion-overlay"
			role="presentation"
			onMouseDown={(evento) => {
				if (evento.target === evento.currentTarget) cerrarModal();
			}}
		>
			{/*VENTANA SUPERPUESTA DEL MODAL*/}
			{/*CONTENEDOR DEL DIALOGO*/}
			<section
				className="autenticacion-dialogo"
				role="dialog"
				aria-modal="true"
				aria-labelledby="autenticacion-titulo"
			>
				{/*BOTON PARA CERRAR EL MODAL*/}
				<button
					className="autenticacion-cerrar"
					type="button"
					aria-label="Cerrar ventana"
					onClick={cerrarModal}
				>
					<Icono nombre="cerrar" />
				</button>

				{cuentaVerificada ? (
					<CuentaVerificada onComenzar={comenzarAExplorar} />
				) : registroExitoso ? (
					<div className="autenticacion-confirmacion" aria-live="polite">
						<div className="autenticacion-confirmacion-icono" aria-hidden="true">
							<span className="autenticacion-confirmacion-placeholder">70 × 70 px</span>
						</div>
						<h2 id="autenticacion-titulo">¡Ya casi estás dentro!</h2>
						<p>
							Te enviamos un correo a <span className="autenticacion-confirmacion-correo">{correoConfirmacion}</span>
							<br />
							para verificar tu cuenta. Solo tienes que abrirlo y hacer clic en el enlace.
						</p>
						<div className="autenticacion-confirmacion-acciones">
							<button type="button" className="autenticacion-confirmacion-secondary">
								Reenviar correo
							</button>
							<button type="button" className="autenticacion-confirmacion-primary" onClick={continuarDespuesDeVerificar}>
								Continuar
							</button>
						</div>
						<p className="autenticacion-confirmacion-ayuda">
							¿No lo encuentras? <br />
							Revisa tu bandeja de spam o promociones
						</p>
					</div>
				) : (
					<>
						{/*TITULO Y CAMBIO ENTRE INICIO DE SESION Y REGISTRO*/}
						<header className="autenticacion-encabezado">
							<h2 id="autenticacion-titulo">{esRegistro ? "Crear cuenta" : "Iniciar sesión"}</h2>
							<p>
								{esRegistro ? "¿Ya tienes una cuenta? " : "¿Nuevo en LeeConNos? "}
								{/*BOTON PARA CAMBIAR DE FORMULARIO*/}
								<button
									className="autenticacion-cambiar-modo"
									type="button"
									onClick={cambiarModo}
								>
									{esRegistro ? "Inicia sesión" : "Crear cuenta"}
								</button>
							</p>
						</header>

						{/*FORMULARIO DE INICIO DE SESION O REGISTRO*/}
						<form className="autenticacion-formulario" onSubmit={enviarFormulario} noValidate>
							{/*CAMPOS DE NOMBRE Y APELLIDO PARA REGISTRO*/}
							{esRegistro && (
								<div className="autenticacion-campos-dobles">
									<label>
										Nombre
										<input
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
									</label>
									<label>
										Apellido
										<input
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
									</label>
								</div>
							)}

							{/*CAMPO DE CORREO ELECTRONICO*/}
							<label>
								Correo electrónico
								<input
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
							</label>
							{/*CAMPO DE CONTRASENA*/}
							<label>
								Contraseña
								<input
									type="password"
									name="contrasena"
									placeholder="Contraseña"
									autoComplete={esRegistro ? "new-password" : "current-password"}
									minLength={LARGO_MINIMO_CONTRASENA}
									required
									value={campos.contrasena}
									onChange={(evento) => actualizar("contrasena", evento.target.value)}
									{...estadoCampo("contrasena")}
								/>
								{mensajeError("contrasena")}
							</label>

							{/*CAMPOS DE REGISTRO O RECUPERACION DE CONTRASENA*/}
							{esRegistro ? (
								<>
									{/*CONFIRMACION DE CONTRASENA*/}
									<label>
										Confirmar contraseña
										<input
											type="password"
											name="confirmar-contrasena"
											placeholder="Confirmar contraseña"
											autoComplete="new-password"
											required
											value={campos.confirmar}
											onChange={(evento) => actualizar("confirmar", evento.target.value)}
											{...estadoCampo("confirmar")}
										/>
										{mensajeError("confirmar")}
									</label>
									{/*ACEPTACION DE TERMINOS Y PRIVACIDAD*/}
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
									{/*SUSCRIPCION A NOVEDADES*/}
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
								<button className="autenticacion-recuperar" type="button">
									Olvidé mi contraseña
								</button>
							)}

							{/*BOTON PRINCIPAL DEL FORMULARIO*/}
							{errores.general && (
								<p className="autenticacion-error" role="alert">
									{errores.general}
								</p>
							)}
							<button className="autenticacion-enviar" type="submit" disabled={enviando}>
								{enviando ? "Enviando..." : esRegistro ? "Crear cuenta" : "Iniciar sesión"}
							</button>
						</form>

						{/*SEPARADOR DE ACCESO ALTERNATIVO*/}
						<div className="autenticacion-separador"><span>o continuar con</span></div>
						{/*BOTONES DE ACCESO SOCIAL*/}
						<div className="autenticacion-social">
							<button type="button"><Icono nombre="google" />Google</button>
							<button type="button"><Icono nombre="facebook" />Facebook</button>
						</div>
					</>
				)}
			</section>
		</div>
	);
}