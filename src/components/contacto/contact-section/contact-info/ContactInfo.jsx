import './ContactInfo.css';

const ContactInfo = () => {
  const contactLinks = [
    { icon: '/redes/instagram.png', text: '@gia_pucp', href: 'https://www.instagram.com/gia_pucp' },
    { icon: '/redes/linkedin.png', text: 'GIA PUCP', href: 'https://www.linkedin.com/company/gia-pucp' },
    { icon: '/redes/gmail.png', text: 'grupo.gia@pucp.edu.pe', href: 'mailto:grupo.gia@pucp.edu.pe' },
    { icon: '/redes/ws.png', text: '+51 972285288', href: 'https://wa.me/51972285288' },
  ];

  return (
    <div className="contact-info-card">
      <h2 className="contact-info-title">
        Averigua Más de Nosotros
      </h2>
      <p className="contact-info-description">
        Contamos con estos otros medios por donde nos podrás encontrar
      </p>

      <div className="contact-links-list">
        {contactLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-item"
          >
            <img src={link.icon} alt={link.text} className="contact-link-icon" />
            <span className="contact-link-text">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
