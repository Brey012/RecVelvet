import React, { useState, useEffect, useRef } from 'react';
import '../../styles/SeatSelector.css';
import { setAsientosEnEspera, liberarAsientosEnEspera, onAsientosChange } from '../../services/asientosService';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatsPerRow = 16;

const SeatSelector = ({
  setAsientosSeleccionados,
  funcionId,
  usuarioId,
  confirmada,
  asientosOcupados: asientosOcupadosProp = [], // Recibe los ocupados de la API local
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [asientosOcupadosFirestore, setAsientosOcupadosFirestore] = useState([]);
  const [asientosEnEspera, setAsientosEnEspera] = useState([]);
  const [aviso, setAviso] = useState('');
  const mountedRef = useRef(true);

  // Escuchar cambios en tiempo real de asientos
  useEffect(() => {
    if (!funcionId) return;
    const unsub = onAsientosChange(funcionId, ({ asientosOcupados, asientosEnEspera }) => {
      setAsientosOcupadosFirestore(asientosOcupados);
      setAsientosEnEspera(asientosEnEspera);
    });
    return () => {
      mountedRef.current = false;
      unsub && unsub();
    };
  }, [funcionId]);

  // Marcar asientos en espera en Firestore
  useEffect(() => {
    if (!funcionId || !usuarioId) return;
    if (selectedSeats.length > 0 && !confirmada) {
      setAsientosEnEspera(funcionId, selectedSeats, usuarioId);
    }
    // Liberar asientos en espera al desmontar
    return () => {
      if (!confirmada) liberarAsientosEnEspera(funcionId, usuarioId);
    };
  }, [selectedSeats, funcionId, usuarioId, confirmada]);

  const toggleSeat = (seatId) => {
    if (confirmada) {
      setAviso('No puedes cambiar tus asientos después de confirmar. Contacta al administrador.');
      return;
    }
    if (asientosOcupadosCombinados.includes(seatId)) return;
    // No permitir seleccionar asientos en espera de otros usuarios
    const ocupadoPorOtro = asientosEnEsperaArray.some(a => a.usuarioId !== usuarioId && a.asientos.includes(seatId));
    if (ocupadoPorOtro) return;
    const isSelected = selectedSeats.includes(seatId);
    const updated = isSelected
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];
    setSelectedSeats(updated);
    if (setAsientosSeleccionados) setAsientosSeleccionados(updated);
  };

  // Mostrar aviso temporal
  useEffect(() => {
    if (aviso) {
      const t = setTimeout(() => setAviso(''), 3500);
      return () => clearTimeout(t);
    }
  }, [aviso]);

  // Asegurar que asientosEnEspera siempre sea un array
  const asientosEnEsperaArray = Array.isArray(asientosEnEspera) ? asientosEnEspera : [];

  // Combinar asientos ocupados de Firestore y de la API local
  const asientosOcupadosCombinados = Array.from(new Set([
    ...asientosOcupadosProp,
    ...asientosOcupadosFirestore,
  ]));

  return (
    <div className="seat-selector__wrapper">
      {aviso && <div className="seat-selector__aviso">{aviso}</div>}
      <div className="seat-selector__screen">Pantalla</div>
      <div className="seat-selector__grid" style={{ marginBottom: 6 }}>
        <div className="seat-selector__row" style={{ justifyContent: 'flex-start' }}>
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
              const ocupado = asientosOcupadosCombinados.includes(seatId);
              const enEspera = asientosEnEsperaArray.some(a => a.asientos.includes(seatId) && a.usuarioId !== usuarioId);
              return (
                <button
                  key={seatId}
                  className={`seat-selector__seat${selected ? ' selected' : ''}${ocupado ? ' ocupado' : ''}${enEspera ? ' espera' : ''}`}
                  onClick={() => toggleSeat(seatId)}
                  disabled={ocupado || enEspera || confirmada}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '40%',
                    margin: '1px',
                    border: selected ? '2px solid #f91c36' : ocupado ? '2px solid #888' : enEspera ? '2px solid #f9c236' : '1px solid #bbb',
                    background: ocupado ? '#888' : enEspera ? '#f9c236' : selected ? '#f91c36' : '#232323',
                    transition: 'all 0.2s',
                    boxShadow: selected ? '0 0 4px #f91c36aa' : '0 1px 2px #0002',
                    flexShrink: 0,
                    cursor: ocupado || enEspera || confirmada ? 'not-allowed' : 'pointer',
                  }}
                  title={ocupado ? 'Reservado' : enEspera ? 'En espera por otro cliente' : seatId}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
