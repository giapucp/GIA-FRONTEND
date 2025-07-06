import './MiembroCard.css';

function MiembroCard({ imagenSrc, nombre, apellido }) {
  return (
    <div className="miembro-card">
      <div className="miembro-imagen-container"> {/* Contenedor para la imagen */}
        <img src={imagenSrc} alt={`Foto de ${nombre}`} className="miembro-imagen" />
      </div>
      <h3 className="miembro-nombre">{nombre} {apellido}</h3>
    </div>
  );
}

export default MiembroCard;
