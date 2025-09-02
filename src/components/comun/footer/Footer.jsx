import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const progressBarRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    if (progressBarRef.current && footerRef.current) {
      gsap.to(progressBarRef.current, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === footerRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <div
      className="principal-footer-container bg-black text-[#e3e3db] py-20 px-5 md:px-10 flex flex-col items-center w-full box-border min-h-[50vh]"
      ref={footerRef}
    >
      {/* Barra divisora con efecto de llenado */}
      <div className="progress-bar-container w-[90%] h-[3px] bg-[#333] relative overflow-hidden my-16">
        <div
          className="progress-bar absolute top-0 left-0 h-full w-0 bg-[#f93535]"
          ref={progressBarRef}
        ></div>
      </div>

      {/* Contenedor principal del contenido del footer */}
      {/* Este contenedor flex-col items-center centra todo el bloque de columnas */}
      <div className="footer-content flex flex-col items-center w-full max-w-screen-xl px-4 md:px-0">
        {/* justify-center para centrar el bloque de columnas */}
        {/* gap-x-8 para controlar el espacio entre las columnas, ajusta este valor */}
        {/* flex-wrap para que las columnas se apilen en pantallas pequeñas */}
        <div className="flex flex-col md:flex-row justify-center">
          {/* COLUMNA 1: GIA + Logo PUCP */}
          {/* footer-col define el ancho de la columna */}
          <div className="footer-col flex flex-col items-center mb-12 md:mb-0">
            <p className="text-4xl font-bold text-white font-barlow-condensed leading-none mb-8">
              GIA
            </p>
            <img
              src="/logo-pucp.png"
              alt="PUCP Logo"
              className="w-[150px] h-auto filter brightness-0 invert"
            />
          </div>

          {/* COLUMNA 2: Contacto + Detalles */}
          {/* footer-col define el ancho de la columna */}
          <div className="footer-col flex flex-col items-center mb-12 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold text-white font-barlow-condensed mb-8">
              Contacto
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-2 font-barlow-condensed">
              grupo.gia@pucp.edu.pe
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-2 font-barlow-condensed">
              +51 972285288
            </p>
            <p className="text-base md:text-lg leading-relaxed flex items-center justify-center gap-2 font-barlow-condensed">
              Perú
              <span className="flex items-center gap-px">
                <span className="w-2 h-4 bg-red-600"></span>
                <span className="w-2 h-4 bg-white"></span>
                <span className="w-2 h-4 bg-red-600"></span>
              </span>
            </p>
          </div>

          {/* COLUMNA 3: Redes + Iconos */}
          {/* footer-col define el ancho de la columna */}
          <div className="footer-col flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-white font-barlow-condensed mb-8">
              Redes
            </h3>
            <div className="social-icons flex gap-6 justify-center mt-2">
              <a
                href="https://www.instagram.com/gia_pucp/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <FaInstagram size={35} style={{ color: "#E4405F" }} />
              </a>
              <a
                href="https://www.linkedin.com/company/gia-at-pucp/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn size={35} style={{ color: "#0077B5" }} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom mt-20 text-center w-full text-sm text-[#a0a0a0] font-barlow-condensed">
        <p>©2025 Reservado todos los derechos</p>
      </div>
    </div>
  );
};

export default Footer;
