import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NavbarAnimado.css';

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const middleLogoRef = useRef(null);

  useEffect(() => {
    if (!middleLogoRef.current || !headerRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(middleLogoRef.current, {
        scale: 6,
        y: 300,
        x: 0,
      });

      gsap.to(middleLogoRef.current, {
        scale: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.page1',
          start: 'top top',
          end: 'center top',
          scrub: 1,
          onComplete: () => {
            gsap.set(middleLogoRef.current, { y: 0 });
          },
        },
      });

      ScrollTrigger.create({
        trigger: '.page1',
        start: 'center top',
        onEnter: () => {
          gsap.set(middleLogoRef.current, { y: 0 });
        },
      });

      gsap.fromTo(
        middleLogoRef.current,
        { x: 0 },
        {
          x: '-42vw',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: '.page1',
            start: 'center top',
            end: 'bottom top',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to(headerRef.current, {
        backgroundColor: '#000000',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        scrollTrigger: {
          trigger: '.page1',
          start: 'top top',
          end: '30% top',
          scrub: 1.5,
        },
      });

      const timerId = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 50);

      return () => {
        clearTimeout(timerId);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="navbar-container" ref={containerRef}>
      <header
        ref={headerRef}
        className="navbar-header fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5 z-50 text-white transition-all duration-300"
      >
        <div className="w-[100px]" />
        <div className="middle-logo absolute left-0 w-full flex justify-center pointer-events-none z-10">
          <h1 
            ref={middleLogoRef} 
            className="text-2xl font-bold m-0"
            style={{ transform: 'scale(6) translateY(300px)' }}
          >
            G I A
          </h1>
        </div>
        <nav className="nav-links">
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
            {/* Nuevo enlace a Directorio */}
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
      </header>

      <div className="page1">
        <h2>Grupo de Ingeniería</h2>
        <h2>Aeroespacial</h2>
      </div>
    </div>
  );
}

export default Navbar;