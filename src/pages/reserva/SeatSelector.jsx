import React, { useState } from 'react';
import '../../assets/css/SeatSelector.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 16;

const SeatSelector = ({ setAsientosSeleccionados, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    const isSelected = selectedSeats.includes(seatId);
    const updated = isSelected
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updated);
    if (setAsientosSeleccionados) setAsientosSeleccionados(updated);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedSeats);
    } else {
      alert(`Asientos confirmados: ${selectedSeats.join(', ')}`);
    }
  };

  return (
    <div className="seat-selector__wrapper">
      <div className="seat-selector__screen">Pantalla</div>
      <div className="seat-selector__grid">
        {rows.map(row => (
          <div key={row} className="seat-selector__row">
            <div className="seat-selector__row-label">{row}</div>
            {[...Array(seatsPerRow)].map((_, i) => {
              const seatId = `${row}${i + 1}`;
              const selected = selectedSeats.includes(seatId);
              return (
                <button
                  key={seatId}
                  className={`seat-selector__seat ${selected ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seatId)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <button
        className="seat-selector__confirm-btn"
        disabled={selectedSeats.length === 0}
        onClick={handleConfirm}
      >
        Confirmar selección
      </button>
    </div>
  );
};

export default SeatSelector;
