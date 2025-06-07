import { useLocation } from "react-router-dom";
import { useState } from "react";
import SeatSelector from "./SeatSelector";
import ReservaModal from "./ReservaModal";
import "../../styles/Reservas.css";

const fechas = [
  { label: "Lun", value: "Lunes" },
  { label: "Mar", value: "Martes" },
  { label: "Mie", value: "Miércoles" },
  { label: "Jue", value: "Jueves" },
  { label: "Cal", value: "Calendario" },
];

const horas = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const formatos = ["2D", "3D", "4DX", "IMAX"];

const Reservas = () => {
  const location = useLocation();
  const selectedMovie = location.state?.movie || null;

  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [formato, setFormato] = useState(null);
  const [asientos, setAsientos] = useState([]);

  // Para guardar la reserva (puedes luego usar contexto o localStorage)
  const [reserva, setReserva] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const nuevaReserva = {
      pelicula: selectedMovie?.name,
      fecha,
      hora,
      formato,
      asientos,
      cliente: user?.fullName || "Desconocido",
    };
    // Guardar en el backend (json-server)
    await fetch("http://localhost:3001/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaReserva),
    });
    setReserva(nuevaReserva);
    setModalOpen(true);
  };

  return (
    <div className="reserva__container">
      <h1>Reservación</h1>
      {selectedMovie && (
        <h2 style={{ color: "#f91c36" }}>Película: {selectedMovie.name}</h2>
      )}
      <div className="reserva__container-content">
        <div className="reserva__selectors">
          <div className="reserva__fecha">
            <h2>Fecha</h2>
            <div className="reserva__fecha-content">
              {fechas.map((f) => (
                <div
                  key={f.value}
                  className={fecha === f.value ? "selected" : ""}
                  style={{
                    border: fecha === f.value ? "2px solid #f91c36" : "",
                    background: fecha === f.value ? "#f91c36" : "",
                    color: fecha === f.value ? "#fff" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => setFecha(f.value)}
                >
                  {f.label}
                </div>
              ))}
            </div>
          </div>
          <div className="reserva__hora">
            <h2>Hora</h2>
            <div className="reserva__hora-content">
              {horas.map((h) => (
                <div
                  key={h}
                  className={hora === h ? "selected" : ""}
                  style={{
                    border: hora === h ? "2px solid #f91c36" : "",
                    background: hora === h ? "#f91c36" : "",
                    color: hora === h ? "#fff" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => setHora(h)}
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="reserva__formato">
            <div className="reserva__formato-content">
              {formatos.map((f) => (
                <div
                  key={f}
                  className={formato === f ? "selected" : ""}
                  style={{
                    border: formato === f ? "2px solid #f91c36" : "",
                    background: formato === f ? "#f91c36" : "",
                    color: formato === f ? "#fff" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => setFormato(f)}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reserva__seats">
          <SeatSelector setAsientosSeleccionados={setAsientos} />
        </div>
      </div>
      <button
        className="seat-selector__confirm-btn"
        style={{ marginTop: 20 }}
        disabled={
          !selectedMovie || !fecha || !hora || !formato || asientos.length === 0
        }
        onClick={handleConfirm}
      >
        Confirmar selección
      </button>
      <ReservaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        reserva={reserva}
      />
    </div>
  );
};

export default Reservas;
