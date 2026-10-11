import { useEffect, useState } from "react";
import { Icono } from "./Icono";
import "../estilos/modal-autenticacion.css";

type ModalInicioSesionRegistroProps = {
	abierto: boolean;
	onCerrar: () => void;
};

type ModoAutenticacion = "inicio" | "registro";

export function ModalInicioSesionRegistro({ abierto, onCerrar }: ModalInicioSesionRegistroProps) {
	// ESTADO DEL FORMULARIO ACTUAL
	const [modo, setModo] = useState<ModoAutenticacion>("inicio");

	// CIERRE CON ESCAPE Y BLOQUEO DEL SCROLL
	useEffect(() => {
		if (!abierto) return;

		const overflowAnterior = document.body.style.overflow;
		const cerrarConEscape = (evento: KeyboardEvent) => {
			if (evento.key === "Escape") onCerrar();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", cerrarConEscape);

		return () => {
			document.body.style.overflow = overflowAnterior;
			window.removeEventListener("keydown", cerrarConEscape);
		};
	}, [abierto, onCerrar]);

	if (!abierto) return null;

	const esRegistro = modo === "registro";
	// PREVENIR EL ENVIO HASTA CONECTAR EL SERVICIO DE CUENTAS
	const enviarFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
	};

	return (
		<div
			className="autenticacion-overlay"
			role="presentation"
			onMouseDown={(evento) => {
				if (evento.target === evento.currentTarget) onCerrar();
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
					onClick={onCerrar}
				>
					<Icono nombre="cerrar" />
				</button>

				{/*TITULO Y CAMBIO ENTRE INICIO DE SESION Y REGISTRO*/}
				<header className="autenticacion-encabezado">
					<h2 id="autenticacion-titulo">{esRegistro ? "Crear cuenta" : "Iniciar sesión"}</h2>
					<p>
						{esRegistro ? "¿Ya tienes una cuenta? " : "¿Nuevo en LeeConNos? "}
						{/*BOTON PARA CAMBIAR DE FORMULARIO*/}
						<button
							className="autenticacion-cambiar-modo"
							type="button"
							onClick={() => setModo(esRegistro ? "inicio" : "registro")}
						>
							{esRegistro ? "Inicia sesión" : "Crear cuenta"}
						</button>
					</p>
				</header>

				{/*FORMULARIO DE INICIO DE SESION O REGISTRO*/}
				<form className="autenticacion-formulario" onSubmit={enviarFormulario}>
					{/*CAMPOS DE NOMBRE Y APELLIDO PARA REGISTRO*/}
					{esRegistro && (
						<div className="autenticacion-campos-dobles">
							<label>
								Nombre
								<input type="text" name="nombre" placeholder="Nombre" autoComplete="given-name" required />
							</label>
							<label>
								Apellido
								<input type="text" name="apellido" placeholder="Apellido" autoComplete="family-name" required />
							</label>
						</div>
					)}

					{/*CAMPO DE CORREO ELECTRONICO*/}
					<label>
						Correo electrónico
						<input type="email" name="correo" placeholder="Correo electrónico" autoComplete="email" required />
					</label>
					{/*CAMPO DE CONTRASENA*/}
					<label>
						Contraseña
						<input
							type="password"
							name="contrasena"
							placeholder="Contraseña"
							autoComplete={esRegistro ? "new-password" : "current-password"}
							minLength={8}
							required
						/>
					</label>

					{/*CAMPOS DE REGISTRO O RECUPERACION DE CONTRASENA*/}
					{esRegistro ? (
						<>
							{/*CONFIRMACION DE CONTRASENA*/}
							<label>
								Confirmar contraseña
								<input type="password" name="confirmar-contrasena" placeholder="Confirmar contraseña" autoComplete="new-password" minLength={8} required />
							</label>
							{/*ACEPTACION DE TERMINOS Y PRIVACIDAD*/}
							<label className="autenticacion-checkbox">
								<input type="checkbox" name="terminos" required />
								<span>Acepto los términos de servicio y la política de privacidad.</span>
							</label>
							{/*SUSCRIPCION A NOVEDADES*/}
							<label className="autenticacion-checkbox">
								<input type="checkbox" name="novedades" />
								<span>Quiero recibir novedades y recomendaciones por correo.</span>
							</label>
						</>
					) : (
						<button className="autenticacion-recuperar" type="button">
							Olvidé mi contraseña
						</button>
					)}

					{/*BOTON PRINCIPAL DEL FORMULARIO*/}
					<button className="autenticacion-enviar" type="submit">
						{esRegistro ? "Crear cuenta" : "Iniciar sesión"}
					</button>
				</form>

				{/*SEPARADOR DE ACCESO ALTERNATIVO*/}
				<div className="autenticacion-separador"><span>o continuar con</span></div>
				{/*BOTONES DE ACCESO SOCIAL*/}
				<div className="autenticacion-social">
					<button type="button"><Icono nombre="google" />Google</button>
					<button type="button"><Icono nombre="facebook" />Facebook</button>
				</div>
			</section>
		</div>
	);
}