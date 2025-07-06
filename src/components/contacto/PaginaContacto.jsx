import Navbar from '../comun/navbar/Navbar';
import ContactHeader from './contact-header/ContactHeader';
import ContactSection from './contact-section/ContactSection';
import Footer from '../comun/footer/Footer';
import './PaginaContacto.css';

function PaginaContacto() {
    return (
        <div className="container-contacto">
            <Navbar />
            <ContactHeader />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default PaginaContacto;