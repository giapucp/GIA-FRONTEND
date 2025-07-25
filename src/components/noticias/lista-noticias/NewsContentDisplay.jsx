import TarjetaNoticia from './TarjetaNoticia';

const NewsContentDisplay = ({ yearsWithRows, abrirModal }) => {
  return (
    <div className="news-content-display">
      {yearsWithRows.map(({ year, rows }) => (
        <div key={year} className="year-section" data-year={year}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="noticias-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {row.map((noticia) => (
                <TarjetaNoticia
                  key={noticia.id}
                  noticia={noticia}
                  onClick={() => abrirModal(noticia)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewsContentDisplay;