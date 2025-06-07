import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import '../styles/Reservas.css';

const movieImages = {
  "The Godfather": "/img/TheGodFather.jpg",
  "Star Wars": "/img/StarWarsEp3.jpg",
  "Seven": "/img/Seven.jpeg",
  "The Dark Knight": "/img/TheDarkKnight.jpeg",
  "Back to the Future": "/img/Backtothefuture.jpeg",
  "Godfellas": "/img/GodFellas.jpeg",
  "Interstellar": "/img/Interstellar.jpg",
};

const MiReserva = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:3001/reservas")
      .then(res => res.json())
      .then(data => {
        const reservasUsuario = data.filter(r => r.cliente === user.fullName);
        setReservas(reservasUsuario);
        setSelected(reservasUsuario.length > 0 ? 0 : null);
      });
    fetch("http://localhost:3001/peliculas")
      .then(res => res.json())
      .then(setPeliculas);
  }, [user]);

  if (!user) return <div className="reserva__container">Debes iniciar sesión para ver tus reservas.</div>;
  if (!reservas.length) return <div className="reserva__container">No tienes reservas registradas.</div>;

  const reserva = reservas[selected];
  const pelicula = peliculas.find(p => p.titulo_original === reserva.pelicula);
  const imgSrc = movieImages[reserva.pelicula] || "/img/RecVelvet_Logo.jpeg";

  return (
    <div className="reserva__container">
      <h1>Mis Reservas</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        {reservas.map((r, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            style={{
              background: selected === idx ? '#f91c36' : '#232323',
              color: selected === idx ? '#fff' : '#f91c36',
              border: selected === idx ? '2px solid #f91c36' : '1.5px solid #888',
              borderRadius: 10,
              padding: '10px 22px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: selected === idx ? '0 2px 12px #f91c3622' : 'none',
              marginBottom: 8,
              minWidth: 120
            }}
          >
            {r.pelicula} <span style={{ fontWeight: 400, fontSize: 13 }}>({r.fecha})</span>
          </button>
        ))}
      </div>
      <div className="reserva__container-content" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 32 }}>
        <img src={imgSrc} alt={reserva.pelicula} className="reserva-modal__img" />
        <div className="reserva-modal__info-block">
          <h2 className="reserva-modal__title">{reserva.pelicula}</h2>
          <div className="reserva-modal__info">
            <ul>
              <li><b>Cliente:</b> {reserva.cliente}</li>
              <li><b>Fecha:</b> {reserva.fecha}</li>
              <li><b>Hora:</b> {reserva.hora}</li>
              <li><b>Formato:</b> {reserva.formato}</li>
              <li><b>Asientos:</b> {Array.isArray(reserva.asientos) ? reserva.asientos.join(", ") : reserva.asientos}</li>
              {reserva.combo && <li><b>Combo:</b> {reserva.combo} {reserva.comboPrecio && (<span style={{ color: "#f91c36", fontWeight: 600 }}>- ${reserva.comboPrecio.toLocaleString()}</span>)}</li>}
            </ul>
          </div>
          {pelicula && (
            <div className="reserva-modal__info" style={{ marginTop: 24 }}>
              <h3>Información de la Película</h3>
              <ul>
                {pelicula.director && <li><b>Director:</b> {pelicula.director}</li>}
                {pelicula.duracion && <li><b>Duración:</b> {pelicula.duracion}</li>}
                {pelicula.genero && <li><b>Género:</b> {Array.isArray(pelicula.genero) ? pelicula.genero.join(", ") : pelicula.genero}</li>}
                {pelicula.clasificacion && <li><b>Clasificación:</b> {pelicula.clasificacion}</li>}
                {pelicula.estreno && <li><b>Estreno:</b> {pelicula.estreno}</li>}
                {pelicula.sinopsis && <li><b>Sinopsis:</b> {pelicula.sinopsis}</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiReserva;
