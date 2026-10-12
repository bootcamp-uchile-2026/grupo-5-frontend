type CuentaVerificadaProps = {
	onComenzar: () => void;
};

export function CuentaVerificada({ onComenzar }: CuentaVerificadaProps) {
	return (
		<div className="autenticacion-verificada" aria-live="polite">
			<div className="autenticacion-verificada-icono" aria-hidden="true">
				<svg viewBox="0 0 80 80" focusable="false">
					<circle
						cx="40"
						cy="40"
						r="34"
						fill="none"
						stroke="currentColor"
						strokeWidth="5"
						strokeDasharray="190 24"
						strokeLinecap="round"
						transform="rotate(-45 40 40)"
					/>
					<path
						d="m27 40 9 9 19-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
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
