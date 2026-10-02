import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BarraNavegacion } from "./componentes/BarraNavegacion";
import Biblioteca from "./paginas/biblioteca";
import Catalogo from "./paginas/catalogo";
import Checkout from "./paginas/checkout";
import Comunidad from "./paginas/comunidad";
import ConfirmacionCompra from "./paginas/confirmacion-compra";
import Descubrir from "./paginas/descubrir";
import FichaLibro from "./paginas/ficha-libro";
import Index from "./paginas/index";
import MiCuenta from "./paginas/mi-cuenta";
import Recomendaciones from "./paginas/recomendaciones";

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/descubrir" element={<Descubrir />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/mi-cuenta" element={<MiCuenta />} />
        <Route path="/ficha-libro" element={<FichaLibro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/confirmacion-compra"
          element={<ConfirmacionCompra />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

