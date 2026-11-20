import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EstadoCarga } from "../componentes/EstadoCarga";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { useAutenticacionStore } from "../estado/autenticacionStore";
import { verificarCorreo } from "../servicios/authServicio";

// Destino del enlace que llega por correo al crear la cuenta:
// /verificar-correo?token=<token>. Valida el token con la API y abre el
// modal con el resultado sobre el Inicio: "¡Tu cuenta ya está lista!" o
// "No hemos podido verificar tu cuenta".
//
// Sin API, cualquier token sirve y "invalido" muestra el error, para probar
// los dos diseños: /verificar-correo?token=prueba y ?token=invalido.

// Un token se verifica una sola vez, aunque el efecto se repita (React en
// desarrollo monta los componentes dos veces)
const tokensEnCurso = new Map<string, Promise<boolean>>();

function verificarUnaVez(token: string) {
  let verificacion = tokensEnCurso.get(token);
  if (!verificacion) {
    verificacion = verificarCorreo(token).then(
      () => true,
      () => false,
    );
    tokensEnCurso.set(token, verificacion);
  }
  return verificacion;
}

function VerificarCorreo() {
  useTituloPagina("Verificando tu cuenta");
  const [searchParams] = useSearchParams();
  const navegar = useNavigate();
  const mostrar = useAutenticacionStore((estado) => estado.mostrar);
  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    let vigente = true;
    void verificarUnaVez(token).then((verificada) => {
      if (!vigente) return;
      navegar("/", { replace: true });
      mostrar(verificada ? "cuenta-lista" : "verificacion-fallida");
    });
    return () => {
      vigente = false;
    };
  }, [token, navegar, mostrar]);

  return (
    <main className="verificar-correo">
      <EstadoCarga texto="Verificando tu cuenta..." />
    </main>
  );
}

export default VerificarCorreo;
