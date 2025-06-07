import React, { useState } from 'react';
import '../../styles/SeatSelector.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 16;

const SeatSelector = ({ setAsientosSeleccionados, asientosOcupados = [] }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    if (asientosOcupados.includes(seatId)) return; // No permitir seleccionar ocupados
    const isSelected = selectedSeats.includes(seatId);
    const updated = isSelected
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(updated);
    if (setAsientosSeleccionados) setAsientosSeleccionados(updated);
  };

  return (
    <div className="seat-selector__wrapper">
      <div className="seat-selector__screen">Pantalla</div>
      {/* Números de columna perfectamente alineados */}
      <div className="seat-selector__grid" style={{ marginBottom: 6 }}>
        <div className="seat-selector__row" style={{ justifyContent: 'flex-start' }}>
          {/* Espacio para la etiqueta de fila */}
          <div style={{ width: 18, flexShrink: 0 }}></div>
          {[...Array(seatsPerRow)].map((_, i) => (
            <div
              key={`col-num-${i + 1}`}
              className="seat-selector__col-number"
              style={{ width: 18, color: '#aaa', fontWeight: 500, fontSize: 11, textAlign: 'center', letterSpacing: 0, flexShrink: 0 }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="seat-selector__grid">
        {rows.map(row => (
          <div key={row} className="seat-selector__row">
            <div className="seat-selector__row-label" style={{ width: 18, color: '#aaa', fontWeight: 500, fontSize: 11, flexShrink: 0 }}>{row}</div>
            {[...Array(seatsPerRow)].map((_, i) => {
              const seatId = `${row}${i + 1}`;
              const selected = selectedSeats.includes(seatId);
              const ocupado = asientosOcupados.includes(seatId);
              return (
                <button
                  key={seatId}
                  className={`seat-selector__seat${selected ? ' selected' : ''}${ocupado ? ' ocupado' : ''}`}
                  onClick={() => toggleSeat(seatId)}
                  disabled={ocupado}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '40%',
                    margin: '1px',
                    border: selected ? '2px solid #f91c36' : ocupado ? '2px solid #888' : '1px solid #bbb',
                    background: ocupado ? '#888' : selected ? '#f91c36' : '#232323',
                    transition: 'all 0.2s',
                    boxShadow: selected ? '0 0 4px #f91c36aa' : '0 1px 2px #0002',
                    flexShrink: 0,
                    cursor: ocupado ? 'not-allowed' : 'pointer',
                  }}
                  title={ocupado ? 'Reservado' : seatId}
                />
              );
            })}
          </div>
        ))}
      </div>
      {/* El botón de confirmar ahora está en Reservas.jsx */}
    </div>
  );
};

export default SeatSelector;
