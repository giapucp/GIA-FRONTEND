import { useEffect, useRef } from 'react';
import { X, Calendar, Clock, Share2 } from 'lucide-react';
import './ModalNoticia.css';

const ModalNoticia = ({ noticia, onClose }) => {
  const { titulo, portada, contenido, fechaPublicacion, autor, textoFinal, categorias } = noticia;
  const modalRef = useRef(null);
  
  const fechaFormateada = new Date(fechaPublicacion).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Función para parsear el contenido RichText (si es necesario)
  const parseRichText = (content) => {
    if (typeof content === 'string') return content;
    // Aquí puedes implementar un parser más sofisticado para RichText
    return content;
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.classList.add('show');
      }
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const compartirNoticia = () => {
    if (navigator.share) {
      navigator.share({
        title: titulo,
        text: textoFinal || parseRichText(contenido),
        url: window.location.href
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <img 
            src={portada} 
            alt={titulo} 
            className="modal-image"
            onError={(e) => {
              e.target.src = '/placeholder-noticia.jpg';
            }}
          />
          <div className="modal-gradient"></div>
          <h2 className="modal-title">{titulo}</h2>
        </div>
        
        <div className="modal-content">
          <div className="modal-meta">
            <div className="meta-item">
              <Calendar size={18} />
              <span>{fechaFormateada}</span>
            </div>
            {autor && (
              <div className="meta-item">
                <Clock size={18} />
                <span>{autor}</span>
              </div>
            )}
            {categorias?.length > 0 && (
              <div className="meta-item">
                <span className="text-sm">
                  {categorias.map(cat => cat.nombre).join(', ')}
                </span>
              </div>
            )}
            <button 
              className="share-button"
              onClick={compartirNoticia}
              aria-label="Compartir"
            >
              <Share2 size={18} />
              <span>Compartir</span>
            </button>
          </div>
          
          <div className="modal-body">
            <div dangerouslySetInnerHTML={{ __html: parseRichText(contenido) }} />
            
            {textoFinal && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{textoFinal}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNoticia;
