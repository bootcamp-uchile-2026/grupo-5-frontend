type CuentaVerificadaProps = {
	onComenzar: () => void;
};

export function CuentaVerificada({ onComenzar }: CuentaVerificadaProps) {
	return (
		<div className="autenticacion-verificada" aria-live="polite">
			<div className="autenticacion-verificada-icono" aria-hidden="true">
				<span className="autenticacion-verificada-placeholder">70 × 70 px</span>
			</div>
			<h2 id="autenticacion-titulo">¡Tu cuenta ya está lista!</h2>
			<p>
				Tu cuenta fue verificada correctamente.
				<br />
				Ya puedes descubrir nuevas lecturas, guardar tus favoritos y recibir recomendaciones.
			</p>
			<button
				type="button"
				className="autenticacion-verificada-accion"
				onClick={onComenzar}
			>
				Comenzar a explorar
			</button>
		</div>
	);
}
