import NavbarAnimado from './navbar/NavbarAnimado';
import SeccionActualidad from './actualidad/SeccionActualidad';
import MisionVision from './mision-vision/MisionVision';
import RumboBrasil from './rumbo-brasil/RumboBrasil';
import HistoriaInicio from './historia-inicio/HistoriaInicio';
import Footer from '../comun/footer/Footer';
import './PaginaInicio.css';

function PaginaInicio() {
  return (
    <div className="container-inicio">
      <NavbarAnimado />
      <SeccionActualidad />
      <MisionVision />
      <RumboBrasil />
      <HistoriaInicio />
      <Footer />
    </div>
  );
}

export default PaginaInicio;