import React from "react";
import "../../styles/Reservas.css";

// Mapeo de imágenes por título (igual que en PeliculasInfo.jsx)
const getPoster = (pelicula) => {
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
    "The Lion King": "/img/TheLionKing.jpg",
  };
  return map[pelicula] || "/img/RecVelvet_Logo.jpeg";
};

const ReservaModal = ({ open, onClose, reserva }) => {
  if (!open || !reserva) return null;
  const imgSrc = getPoster(reserva.pelicula);

  return (
    <div className="reserva-modal__overlay">
      <div
        className="reserva-modal__content reserva-modal__content--wide"
        style={{
          minWidth: 520,
          maxWidth: 820,
          width: "98vw",
          padding: "48px 48px 36px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button className="reserva-modal__close" onClick={onClose}>
          &times;
        </button>
        <div
          className="reserva-modal__row"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 48,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={imgSrc}
            alt={reserva.pelicula}
            className="reserva-modal__img"
            style={{
              width: 240,
              height: 400,
              objectFit: "cover",
              borderRadius: 18,
              boxShadow: "0 2px 16px #0008",
              marginBottom: 0,
              border: "4px solid #f91c36",
              background: "#fff",
            }}
          />
          <div className="reserva-modal__info-block">
            <h2 className="reserva-modal__title">¡Reserva Confirmada!</h2>
            <div className="reserva-modal__info">
              <h3>{reserva.pelicula}</h3>
              <ul>
                <li>
                  <b>Cliente:</b> {reserva.cliente}
                </li>
                <li>
                  <b>Fecha:</b> {reserva.fecha}
                </li>
                <li>
                  <b>Hora:</b> {reserva.hora}
                </li>
                <li>
                  <b>Formato:</b> {reserva.formato}
                </li>
                <li>
                  <b>Sala:</b> {reserva.sala}
                </li>
                <li>
                  <b>Asientos:</b>{" "}
                  {Array.isArray(reserva.asientos)
                    ? reserva.asientos.join(", ")
                    : reserva.asientos}
                </li>
                {reserva.combo && (
                  <li>
                    <b>Combo:</b> {reserva.combo}{" "}
                    {reserva.comboPrecio && (
                      <span
                        style={{
                          color: "#f91c36",
                          fontWeight: 600,
                        }}
                      >
                        - ${reserva.comboPrecio.toLocaleString()}
                      </span>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservaModal;