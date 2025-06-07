import React from "react";
import "../../styles/Reservas.css";

const movieImages = {
  "The Godfather": "/img/TheGodFather.jpg",
  "Star Wars": "/img/StarWarsEp3.jpg",
  "Seven": "/img/Seven.jpeg",
  "The Dark Knight": "/img/TheDarkKnight.jpeg",
  "Back to the Future": "/img/Backtothefuture.jpeg",
  "Godfellas": "/img/GodFellas.jpeg",
  "Interstellar": "/img/Interstellar.jpg",
};

const ReservaModal = ({ open, onClose, reserva }) => {
  if (!open || !reserva) return null;
  const imgSrc = movieImages[reserva.pelicula] || "/img/RecVelvet_Logo.jpeg";

  return (
    <div className="reserva-modal__overlay">
      <div className="reserva-modal__content reserva-modal__content--wide">
        <button className="reserva-modal__close" onClick={onClose}>
          &times;
        </button>
        <div className="reserva-modal__row">
          <img
            src={imgSrc}
            alt={reserva.pelicula}
            className="reserva-modal__img"
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