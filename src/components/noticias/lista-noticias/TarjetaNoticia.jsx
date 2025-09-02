import { Calendar } from "lucide-react";

import "./TarjetaNoticia.css";

const TarjetaNoticia = ({ noticia, onClick }) => {
  const titulo =
    noticia.titulo || noticia.attributes?.titulo || "Título no disponible";
  const imagen =
    noticia.portada || noticia.attributes?.portada || "/default-image.jpg";
  const fecha =
    noticia.fecha || noticia.attributes?.fecha || new Date().toISOString();

  const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      className="tarjeta-noticia relative h-[280px] rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imagen}
        alt={titulo}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      <div className="tarjeta-noticia-info absolute bottom-0 left-6 right-3">
        <h3 className="text-white text-xl font-bold mb-2">{titulo}</h3>
        <div className="flex items-center text-white/80">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">{fechaFormateada}</span>
        </div>
      </div>
    </div>
  );
};

export default TarjetaNoticia;
