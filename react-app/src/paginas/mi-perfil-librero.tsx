import { EstadoCarga } from "../componentes/EstadoCarga";
import { MensajeError } from "../componentes/MensajeError";
import { usePeticion } from "../componentes/usePeticion";
import { ErrorApi } from "../servicios/api";
import { obtenerMiPerfilLibrero } from "../servicios/libreroServicio";
import { useSesionStore } from "../estado/sesionStore";
import { PerfilContenido } from "./perfil-librero";
import "../estilos/perfil-librero.css";

// Perfil del librero con sesión iniciada (GET /libreros/yo). Usa la misma
// vista diseñada que el perfil público. La ruta está protegida en App.tsx con
// RutaProtegida y roles={["LIBRERO"]}, igual que la regla de Backend.
function MiPerfilLibrero() {
  // La clave cambia con la cuenta: si se inicia sesión con otro librero, se
  // vuelve a pedir el perfil
  const idUsuario = useSesionStore((estado) => estado.usuario?.id ?? "");
  const peticion = usePeticion(obtenerMiPerfilLibrero, idUsuario);

  if (peticion.error) {
    // 404: la cuenta tiene el perfil LIBRERO pero aún no tiene perfil creado
    const sinPerfil = peticion.error instanceof ErrorApi && peticion.error.statusCode === 404;
    return (
      <main className="perfil-librero">
        <MensajeError
          error={peticion.error}
          onReintentar={sinPerfil ? undefined : peticion.reintentar}
          enlace={{ texto: "Volver al inicio", ruta: "/" }}
          className="perfil-estado"
        />
      </main>
    );
  }

  if (peticion.cargando || !peticion.datos) {
    return (
      <main className="perfil-librero">
        <EstadoCarga texto="Cargando tu perfil..." className="perfil-estado" />
      </main>
    );
  }

  return <PerfilContenido key={peticion.datos.id} librero={peticion.datos} />;
}

export default MiPerfilLibrero;
