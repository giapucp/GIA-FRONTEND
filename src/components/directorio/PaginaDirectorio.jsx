import { useEffect, useState, useRef } from 'react';
import Navbar from '../comun/navbar/Navbar';
import Footer from '../comun/footer/Footer.jsx';
import MiembroCard from './MiembroCard';
import { fetchMiembros } from '../../api/strapi.js'; 
import './PaginaDirectorio.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PaginaDirectorio() {
  const [miembros, setMiembros] = useState([]);
  const pageContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const miembrosData = await fetchMiembros();
      console.log("Datos de miembros:", miembrosData); // Para depuración
      setMiembros(miembrosData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!pageContainerRef.current || miembros.length === 0) return;

    const sections = gsap.utils.toArray('.directorio-seccion', pageContainerRef.current);
    const sectionTriggers = []; // Almacenar triggers para limpiarlos

    sections.forEach((section) => {
      const tl = gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%', // Ajustar para que se active un poco después
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
            // markers: true, // Descomentar para depuración
          }
        }
      );
      sectionTriggers.push(tl.scrollTrigger); // Guardar el scrollTrigger de la línea de tiempo
    });

    return () => {
      // Limpiar todos los ScrollTriggers creados para estas secciones
      sectionTriggers.forEach(trigger => trigger.kill());
    };
  }, [miembros]);

  const presidente = miembros.find(m => m.area.nombre === 'presidente');
  const areas = miembros
    .filter(m => m.area.nombre !== 'presidente') // Por el momento es la unica area diferente
    .reduce((acc, miembro) => {
      if (!acc[miembro.area.nombre]) {
        acc[miembro.area.nombre] = [];
      }
      acc[miembro.area.nombre].push(miembro);
      return acc;
    }, {});

  return (
    <>
      <Navbar />
      <div className="pagina-directorio-container" ref={pageContainerRef}>
        <h2 className="directorio-titulo">Directorio</h2>

        {presidente && (
          <section className="directorio-seccion presidente-seccion">
            <h3>{presidente.area.nombre}</h3>
            <div className="miembros-grid">
              <MiembroCard
                key={presidente.id}
                nombre={presidente.nombre}
                apellido={presidente.apellidoPaterno}
                imagenSrc={presidente.foto}
              />
            </div>
          </section>
        )}

        {Object.entries(areas).map(([nombreArea, miembrosDelArea]) => (
          <section key={nombreArea} className="directorio-seccion">
            <h3>{nombreArea}</h3>
            <div className="miembros-grid">
              {miembrosDelArea.map(miembro => (
                <MiembroCard
                  key={miembro.id}
                  nombre={miembro.nombre}
                  apellido={miembro.apellidoPaterno}
                  imagenSrc={miembro.foto}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default PaginaDirectorio;
