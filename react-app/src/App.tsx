import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BarraNavegacion } from "./componentes/BarraNavegacion";
import { Carrito } from "./componentes/Carrito";
import { ModalInicioSesionRegistro } from "./componentes/InicioSesionRegistro";
import { VolverArriba } from "./componentes/VolverArriba";
import { useAutenticacionStore } from "./estado/autenticacionStore";
import Biblioteca from "./paginas/biblioteca";
import Catalogo from "./paginas/catalogo";
import Checkout from "./paginas/checkout";
import Comunidad from "./paginas/comunidad";
import ConfirmacionCompra from "./paginas/confirmacion-compra";
import Descubrir from "./paginas/descubrir";
import FichaLibro from "./paginas/ficha-libro";
import Index from "./paginas/index";
import MiCuenta from "./paginas/mi-cuenta";
import NoEncontrada from "./paginas/no-encontrada";
import PerfilLibrero from "./paginas/perfil-librero";
import Recomendaciones from "./paginas/recomendaciones";
import { restaurarSesion } from "./servicios/authServicio";

function App() {
  const autenticacionAbierta = useAutenticacionStore((estado) => estado.abierto);
  const abrirAutenticacion = useAutenticacionStore((estado) => estado.abrir);
  const cerrarAutenticacion = useAutenticacionStore((estado) => estado.cerrar);

  // Al cargar la app se valida la sesión guardada con la API (GET /auth/me)
  useEffect(() => {
    void restaurarSesion();
  }, []);

  return (
    <BrowserRouter>
      <VolverArriba />
      <BarraNavegacion onAbrirAutenticacion={abrirAutenticacion} />
      <Carrito />
      <ModalInicioSesionRegistro
        abierto={autenticacionAbierta}
        onCerrar={cerrarAutenticacion}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/descubrir" element={<Descubrir />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/mi-cuenta" element={<MiCuenta />} />
        <Route path="/perfil-librero" element={<PerfilLibrero />} />
        <Route path="/ficha-libro" element={<FichaLibro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/confirmacion-compra"
          element={<ConfirmacionCompra />}
        />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
