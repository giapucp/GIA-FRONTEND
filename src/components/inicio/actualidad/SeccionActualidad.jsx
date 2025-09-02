import React, { useState, useEffect } from "react";
import { fetchNoticiasRecientes } from "../../../api/strapi";
import "./SeccionActualidad.css";

const SeccionActualidad = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNoticias = async () => {
      try {
        setLoading(true);
        const noticiasData = await fetchNoticiasRecientes(5);
        setNoticias(noticiasData);
        setError(null);
      } catch (err) {
        console.error("Error cargando noticias:", err);
        setError("Error al cargar las noticias");
        setNoticias([]);
      } finally {
        setLoading(false);
      }
    };

    loadNoticias();
  }, []);

  const handleNavigation = (direction) => {
    if (isAnimating || noticias.length === 0) return;

    setIsAnimating(true);
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % noticias.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const getPreviewPositions = () => {
    if (noticias.length <= 1) return [];

    const previewIndices = [];
    const maxPreviews = Math.min(3, noticias.length - 1);

    for (let i = 1; i <= maxPreviews; i++) {
      previewIndices.push((currentIndex + i) % noticias.length);
    }
    return previewIndices;
  };

  const previewIndices = getPreviewPositions();

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] py-8 px-4">
        <div className="text-center">
          <p className="mt-4 text-xl font-medium text-gray-700 animate-pulse">
            Cargando noticias...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[50vh] py-8 px-4">
        <div className="text-center">
          <p className="mt-4 text-xl font-medium text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );

  if (noticias.length === 0)
    return (
      <div className="flex justify-center items-center h-[50vh] py-8 px-4">
        <div className="text-center">
          <p className="mt-4 text-xl font-medium text-gray-700">
            No hay noticias disponibles en este momento.
          </p>
        </div>
      </div>
    );

  return (
    <div className="carousel">
      <h2 className="titleRecent">Actualidad</h2>

      <div className="list">
        {noticias.map((noticia, index) => {
          const isCurrent = index === currentIndex;
          const previewPosition = previewIndices.indexOf(index) + 1;
          const portadaUrl =
            noticia.portada?.original ||
            noticia.portada ||
            "/placeholder-noticia.jpg";

          return (
            <div
              key={noticia.id}
              className={`item ${isCurrent ? "active" : ""}`}
              style={{
                backgroundImage: `url(${portadaUrl})`,
                willChange: "transform, opacity, width, height",
              }}
              data-position={isCurrent ? 0 : null}
              data-preview-position={
                previewPosition > 0 && window.innerWidth < 768
                  ? null
                  : previewPosition
              }
            >
              <div className="content">
                <div className="title" data-item={index + 1}>
                  {noticia.titulo}
                </div>
                <div className="des">
                  {noticia.textoFinal ||
                    noticia.contenido.substring(0, 150) + "..."}
                </div>
                <div className="categorias">
                  {noticia.categorias?.map((cat) => (
                    <span key={cat.id} className="categoria-tag">
                      {cat.nombre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {noticias.length > 1 && (
        <div className="arrows">
          <button
            className="prev"
            onClick={() => handleNavigation("prev")}
            disabled={isAnimating}
            aria-label="Noticia anterior"
          >
            ←
          </button>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${((currentIndex + 1) / noticias.length) * 100}%`,
              }}
            ></div>
          </div>
          <button
            className="next"
            onClick={() => handleNavigation("next")}
            disabled={isAnimating}
            aria-label="Siguiente noticia"
          >
            →
          </button>
          <div className="slide-number">
            {`${(currentIndex + 1).toString().padStart(2, "0")}/${noticias.length.toString().padStart(2, "0")}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeccionActualidad;
