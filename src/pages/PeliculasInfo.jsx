import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/PeliculasInfo.css'

const PeliculasInfo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pelicula = params.get("pelicula");

  const [info, setInfo] = React.useState(null);
  React.useEffect(() => {
    if (pelicula) {
      fetch("http://localhost:3001/peliculas")
        .then(res => res.json())
        .then(data => {
          const found = data.find(p => p.titulo_original === pelicula);
          setInfo(found);
        });
    }
  }, [pelicula]);

  if (!pelicula) return <div className="peliculasinfo__container">No se seleccionó ninguna película.</div>;
  if (!info) return <div className="peliculasinfo__container">Cargando información...</div>;

  return (
    <div className="peliculasinfo__container">
      <h1 className="peliculasinfo__title">{info.titulo_original}</h1>
      {info.imagen && (
        <img src={info.imagen} alt={info.titulo_original} className="peliculasinfo__img" />
      )}
      <p className="peliculasinfo__sinopsis">{info.sinopsis}</p>
      <button
        className="peliculasinfo__cta-btn"
        style={{
          background: '#f91c36',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          padding: '12px 32px',
          fontSize: 20,
          fontWeight: 700,
          margin: '18px 0 18px 0',
          cursor: 'pointer',
          boxShadow: '0 2px 12px #f91c3622',
          transition: 'background 0.18s, transform 0.18s',
        }}
        onClick={() => {
          window.location.href = `/reservas?pelicula=${encodeURIComponent(info.titulo_original)}`;
        }}
      >
        Reservar esta película
      </button>
      <ul className="peliculasinfo__details">
        {info.director && <li><b>Director:</b> {info.director}</li>}
        {info.duracion && <li><b>Duración:</b> {info.duracion}</li>}
        {info.genero && (
          <li>
            <b>Género:</b> {Array.isArray(info.genero)
              ? info.genero.join(", ")
              : typeof info.genero === "string" && (info.genero.includes(",") || info.genero.includes("/"))
              ? info.genero.split(/,|\//).map(g => g.trim()).join(", ")
              : info.genero}
          </li>
        )}
        {info.clasificacion && <li><b>Clasificación:</b> {info.clasificacion}</li>}
        {info.estreno && <li><b>Estreno:</b> {info.estreno}</li>}
        {info.estado && <li><b>Estado:</b> {info.estado}</li>}
        {/* Muestra cualquier otro campo relevante */}
        {Object.entries(info).map(([key, value]) => {
          if (["id", "titulo_original", "imagen", "sinopsis", "director", "duracion", "genero", "clasificacion", "estreno", "estado"].includes(key)) return null;
          if (!value) return null;
          return <li key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {value}</li>;
        })}
      </ul>
    </div>
  );
};

export default PeliculasInfo;