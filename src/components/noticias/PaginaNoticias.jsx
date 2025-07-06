import Navbar from '../comun/navbar/Navbar';
import ListaNoticias from './lista-noticias/ListaNoticias';
import Footer from '../comun/footer/Footer';
import './PaginaNoticias.css';

function PaginaNoticias() {
  return (
    <div className="container-noticias">
      <Navbar />

      <ListaNoticias />
      
      <Footer />
    </div>
  );
}

export default PaginaNoticias;