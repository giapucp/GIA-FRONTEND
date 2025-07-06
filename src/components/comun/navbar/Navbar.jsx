import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import './Navbar.css'; // Asegúrate de que este CSS esté en la misma carpeta

function Navbar() {
  return (
    <header className="navbar-simple fixed top-0 w-full bg-black text-white p-4 flex justify-between items-center z-50">
      {/* Contenido "GIA" a la izquierda */}
      <div className="flex-none">
        {/* Aquí GIA como enlace a la página de inicio */}
        <Link to="/" className="text-white no-underline">
          <h1 className="text-2xl font-bold m-0 text-white">GIA</h1>
        </Link>
      </div>

      {/* Enlaces de navegación a la derecha */}
      <nav className="nav-links"> {/* Usamos la clase 'nav-links' para aplicar estilos */}
        <ul className="flex gap-16 text-lg m-0 p-0 list-none"> {/* Aumentamos el gap a 16 (64px) para más separación */}
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <span className="nav-text">Inicio</span>
              <span className="nav-indicator"></span> {/* Indicador de línea inferior */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/noticias" className="nav-link">
              <span className="nav-text">Noticias</span>
              <span className="nav-indicator"></span> {/* Indicador de línea inferior */}
            </Link>
          </li>
          {/* Nuevo enlace a Directorio */}
          <li className="nav-item">
            <Link to="/directorio" className="nav-link">
              <span className="nav-text">Directorio</span>
              <span className="nav-indicator"></span> {/* Indicador de línea inferior */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className="nav-link">
              <span className="nav-text">Contáctanos</span>
              <span className="nav-indicator"></span> {/* Indicador de línea inferior */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;