import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaInicio from "./components/inicio/PaginaInicio";
import PaginaNoticias from "./components/noticias/PaginaNoticias";
import PaginaContacto from "./components/contacto/PaginaContacto";
import PaginaDirectorio from "./components/directorio/PaginaDirectorio"; // Importar PaginaDirectorio

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/noticias" element={<PaginaNoticias />} />
        <Route path="/directorio" element={<PaginaDirectorio />} />{" "}
        {/* Nueva ruta para Directorio */}
        <Route path="/contacto" element={<PaginaContacto />} />
      </Routes>
    </Router>
  );
}

export default App;
