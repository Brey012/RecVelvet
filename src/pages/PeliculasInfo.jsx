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

  // Mapeo de imágenes por título
  const getPoster = (info) => {
    if (info.imagen) return info.imagen;
    const map = {
      "The Godfather": "/img/TheGodFather.jpg",
      "Star Wars: Episode III - Revenge of the Sith": "/img/StarWarsEp3.jpg",
      "Se7en": "/img/Seven.jpeg",
      "The Dark Knight": "/img/TheDarkKnight.jpeg",
      "Back to the Future": "/img/Backtothefuture.jpeg",
      "Goodfellas": "/img/GodFellas.jpeg",
      "Interstellar": "/img/Interstellar.jpg",
      "Pulp Fiction": "/img/PulpFiction.jpg",
      "Forrest Gump": "/img/ForrestGump.jpg",
      "Inception": "/img/Inception.jpg",
      "Fight Club": "/img/FightClub.jpg",
      "The Matrix": "/img/Matrix.jpg",
      "The Shawshank Redemption": "/img/TheShawshankRedemption.jpg",
      "The Lord of the Rings: The Return of the King": "/img/TheLordoftheRings.jpg",
      "Gladiator": "/img/Gladiator.jpg",
      "Titanic": "/img/Titanic.jpg",
      "Jurassic Park": "/img/JurassicPark.jpg",
      "The Silence of the Lambs": "/img/TheSilenceoftheLambs.jpg",
      "Avatar": "/img/Avatar.jpg",
      "The Lion King": "/img/TheLionKing.jpg"
    };
    return map[info.titulo_original] || "/img/RecVelvet_Logo.jpeg";
  };

  if (!pelicula) return <div className="peliculasinfo__container">No se seleccionó ninguna película.</div>;
  if (!info) return <div className="peliculasinfo__container">Cargando información...</div>;

  return (
    <div className="peliculasinfo__container" style={{
      maxWidth: 1200,
      minHeight: 600,
      margin: '48px auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 64,
      padding: 48,
      boxSizing: 'border-box',
      background: 'linear-gradient(120deg, #1a1a1a 80%, #f91c3622 100%)', // Color de fondo original oscuro
      borderRadius: 24,
      boxShadow: '0 8px 40px #0002',
    }}>
      <img
        src={getPoster(info)}
        alt={info.titulo_original}
        className="peliculasinfo__img"
        style={{
          width: 340,
          height: 480,
          objectFit: 'cover',
          borderRadius: 18,
          boxShadow: '0 8px 32px #000a',
          border: '4px solid #f91c36',
          background: '#fff',
          flexShrink: 0,
          alignSelf: 'center',
        }}
      />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <h1 className="peliculasinfo__title" style={{ fontSize: 44, fontWeight: 800, marginBottom: 12, letterSpacing: 1 }}>{info.titulo_original}</h1>
        <p className="peliculasinfo__sinopsis" style={{ fontSize: 22, marginBottom: 24, maxWidth: 600 }}>{info.sinopsis}</p>
        <button
          className="peliculasinfo__cta-btn"
          style={{
            background: '#f91c36',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '16px 48px',
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 24px 0',
            cursor: 'pointer',
            boxShadow: '0 4px 18px #f91c3622',
            transition: 'background 0.18s, transform 0.18s',
            alignSelf: 'center',
          }}
          onClick={() => {
            window.location.href = `/reservas?pelicula=${encodeURIComponent(info.titulo_original)}`;
          }}
        >
          Reservar esta película
        </button>
        <ul className="peliculasinfo__details" style={{ fontSize: 20, marginTop: 0, listStyle: 'none', padding: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
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
    </div>
  );
};

export default PeliculasInfo;