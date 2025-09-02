import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="navbar-simple fixed top-0 w-full bg-black text-white p-4 flex justify-between items-center z-50">
        {/* Logo GIA a la izquierda */}
        <div className="flex-none">
          <Link to="/" className="text-white no-underline">
            <h1 className="text-2xl font-bold m-0 text-white">GIA</h1>
          </Link>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button
          className="burger-menu md:hidden z-20 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

        {/* Navegación desktop */}
        <nav className="nav-links hidden md:block">
          <ul className="flex gap-16 text-lg m-0 p-0 list-none">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="nav-text">Inicio</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/noticias" className="nav-link">
                <span className="nav-text">Noticias</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/directorio" className="nav-link">
                <span className="nav-text">Directorio</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">
                <span className="nav-text">Contáctanos</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="mobile-nav-text">Inicio</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  to="/noticias"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Noticias</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  to="/directorio"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Directorio</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  to="/contacto"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Contáctanos</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay para cerrar el menú */}
        {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu} />}
      </header>
    </>
  );
}

export default Navbar;
