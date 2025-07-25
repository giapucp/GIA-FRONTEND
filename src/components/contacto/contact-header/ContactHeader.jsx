// src/components/contacto/contact-header/ContactHeader.jsx
import React from 'react';
import './ContactHeader.css'; // Importa el archivo CSS asociado

const ContactHeader = () => {
  return (
    <div className="">
      <div className="container-content">
        {/* NUEVO DIV PARA LA ANIMACIÓN CONJUNTA */}
        <div className="animated-header-content">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            Contáctanos
          </h1>
          <p className="text-lg font-bold md:text-xl text-black">
            Si desea comunicarse con nosotros lo puede realizar por estos medios
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;