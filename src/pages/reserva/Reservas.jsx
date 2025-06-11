import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SeatSelector from "./SeatSelector";
import ReservaModal from "./ReservaModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Reservas.css";
import { nextDay } from "date-fns";
import ComboSelector from "./ComboSelector";
import { confirmarAsientos } from '../../services/asientosService';
import Swal from 'sweetalert2';

const fechas = [
  { label: "Lun", value: "Lunes" },
  { label: "Mar", value: "Martes" },
  { label: "Mie", value: "Miércoles" },
  { label: "Jue", value: "Jueves" },
  { label: "Cal", value: "Calendario" },
];

const horas = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const formatos = ["2D", "3D", "4DX", "IMAX"];

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves"];

const getNextWeekdayDate = (weekday) => {
  const daysMap = {
    Lunes: 1,
    Martes: 2,
    Miércoles: 3,
    Jueves: 4,
  };
  const today = new Date();
  const targetDay = daysMap[weekday];
  if (targetDay === undefined) return null;
  return nextDay(today, targetDay);
};

const salas = [
  "Sala Kubrick",
  "Sala Lynch",
  "Sala Tarantino",
  "Sala Hitchcock"
];

const Reservas = () => {
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Detectar película desde state o query param
  useEffect(() => {
    // 1. Intentar desde location.state
    if (location.state?.movie) {
      setSelectedMovie(location.state.movie);
      return;
    }
    // 2. Intentar desde query param
    const params = new URLSearchParams(location.search);
    const peliculaQuery = params.get("pelicula");
    if (peliculaQuery) {
      // Buscar la película en la API
      fetch("http://localhost:3001/peliculas")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find(
            (p) => p.titulo_original === peliculaQuery
          );
          if (found) {
            setSelectedMovie({
              name: found.titulo_original,
              ...found,
            });
          }
        });
    }
  }, [location]);

  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [formato, setFormato] = useState(null);
  const [asientos, setAsientos] = useState([]);
  const [asientosOcupados, setAsientosOcupados] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [customDate, setCustomDate] = useState(null);
  const [showCombo, setShowCombo] = useState(false);
  const [sala, setSala] = useState(salas[0]);
  const [confirmada, setConfirmada] = useState(false);

  // Para guardar la reserva (puedes luego usar contexto o localStorage)
  const [reserva, setReserva] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const funcionId = selectedMovie && fecha && hora && formato && sala
    ? `${selectedMovie.name}_${fecha}_${hora}_${formato}_${sala}`.replace(/\s+/g, '_')
    : null;
  const usuarioId = user?.uid || user?.email || user?.fullName || 'anonimo';

  useEffect(() => {
    // Solo buscar si hay película, fecha, hora y formato seleccionados
    if (selectedMovie && fecha && hora && formato) {
      fetch("http://localhost:3001/reservas")
        .then((res) => res.json())
        .then((data) => {
          // Filtrar reservas que coincidan con la selección actual
          const ocupados = data
            .filter(
              (r) =>
                r.pelicula === selectedMovie.name &&
                r.fecha === fecha &&
                r.hora === hora &&
                r.formato === formato
            )
            .flatMap((r) => r.asientos);
          setAsientosOcupados(ocupados);
        });
    } else {
      setAsientosOcupados([]);
    }
  }, [selectedMovie, fecha, hora, formato]);

  const handleConfirm = async () => {
    if (confirmada) {
      Swal.fire({
        icon: 'info',
        title: 'Reserva ya confirmada',
        text: 'Tienes que comunicarte con administración para hacer el cambio en tu reserva.',
        background: '#181818',
        color: '#fff',
        iconColor: '#f91c36',
        confirmButtonColor: '#f91c36',
        customClass: {
          popup: 'swal2-custom-popup',
          confirmButton: 'swal2-custom-confirm',
        },
      });
      return;
    }
    if (funcionId && asientos.length > 0) {
      await confirmarAsientos(funcionId, asientos, usuarioId);
      setConfirmada(true);
    }
    setShowCombo(true);
  };

  const handleComboSelect = async (combo) => {
    setShowCombo(false);
    // Guardar reserva con combo
    const user = JSON.parse(localStorage.getItem("user"));
    const nuevaReserva = {
      pelicula: selectedMovie?.name,
      fecha,
      hora,
      formato,
      sala,
      asientos,
      cliente: user?.fullName || "Desconocido",
      combo: combo ? combo.nombre : null,
      comboPrecio: combo ? combo.precio : null,
    };
    await fetch("http://localhost:3001/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaReserva),
    });
    setReserva(nuevaReserva);
    setModalOpen(true);
  };

  const handleComboSkip = async () => {
    setShowCombo(false);
    // Guardar reserva sin combo
    const user = JSON.parse(localStorage.getItem("user"));
    const nuevaReserva = {
      pelicula: selectedMovie?.name,
      fecha,
      hora,
      formato,
      sala,
      asientos,
      cliente: user?.fullName || "Desconocido",
      combo: null,
      comboPrecio: null,
    };
    await fetch("http://localhost:3001/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaReserva),
    });
    setReserva(nuevaReserva);
    setModalOpen(true);
  };

  // Si la reserva ya está confirmada y el modal está abierto, bloquear los selectores y mostrar alerta si se intenta cambiar
  const handleBlockedChange = () => {
    window.Swal && Swal.fire({
      icon: 'info',
      title: 'Reserva confirmada',
      text: 'Tienes que comunicarte con administración para hacer el cambio en tu reserva.',
      background: '#181818',
      color: '#fff',
      iconColor: '#f91c36',
      confirmButtonColor: '#f91c36',
      customClass: {
        popup: 'swal2-custom-popup',
        confirmButton: 'swal2-custom-confirm',
      },
    });
  };

  return (
    <div className="reserva__container">
      <h1>Reservación</h1>
      {selectedMovie && (
        <h2 style={{ color: "#f91c36" }}>Película: {selectedMovie.name}</h2>
      )}
      <div className="reserva__container-content">
        <div className="reserva__selectors">
          {/* SALA SELECTOR */}
          <div className="reserva__sala">
            <h2>Sala</h2>
            <div className="reserva__sala-content">
              {salas.map((s) => (
                <div
                  key={s}
                  className={sala === s ? "selected" : ""}
                  style={{
                    border: sala === s ? "2px solid #f91c36" : "",
                    background: sala === s ? "#f91c36" : "",
                    color: sala === s ? "#fff" : "",
                    cursor: confirmada && modalOpen ? "not-allowed" : "pointer",
                    marginRight: 8,
                    marginBottom: 4,
                    padding: "8px 18px",
                    borderRadius: 8,
                    fontWeight: sala === s ? 700 : 500,
                    fontSize: 16,
                  }}
                  onClick={confirmada && modalOpen ? handleBlockedChange : () => setSala(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="reserva__fecha">
            <h2>Fecha</h2>
            <div className="reserva__fecha-content">
              {fechas.map((f) => {
                let isSelected = false;
                if (f.value === "Calendario" && customDate) {
                  isSelected = true;
                } else if (diasSemana.includes(f.value) && customDate) {
                  const dayName = customDate
                    .toLocaleDateString("es-ES", { weekday: "long" })
                    .toLowerCase();
                  isSelected = dayName === f.value.toLowerCase();
                } else if (!customDate && fecha === f.value) {
                  isSelected = true;
                }
                return (
                  <div
                    key={f.value}
                    className={isSelected ? "selected" : ""}
                    style={{
                      border: isSelected ? "2px solid #f91c36" : "",
                      background: isSelected ? "#f91c36" : "",
                      color: isSelected ? "#fff" : "",
                      cursor: confirmada && modalOpen ? "not-allowed" : "pointer",
                    }}
                    onClick={confirmada && modalOpen ? handleBlockedChange : () => {
                      if (f.value === "Calendario") {
                        setShowCalendar(true);
                      } else if (diasSemana.includes(f.value)) {
                        const nextDate = getNextWeekdayDate(f.value);
                        setCustomDate(nextDate);
                        setFecha(nextDate ? nextDate.toLocaleDateString() : null);
                        setShowCalendar(false);
                      }
                    }}
                  >
                    {f.label}
                  </div>
                );
              })}
              {/* Mostrar SIEMPRE el calendario si showCalendar es true */}
              {showCalendar && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(2px)",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "fadeInBg 0.2s",
                  }}
                  onClick={() => setShowCalendar(false)}
                >
                  <div
                    style={{
                      background: "#181818",
                      borderRadius: 18,
                      padding: 28,
                      boxShadow: "0 8px 32px #000a",
                      minWidth: 320,
                      position: "relative",
                      animation: "popIn 0.25s",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 16,
                        background: "none",
                        border: "none",
                        fontSize: 32,
                        cursor: "pointer",
                        color: "#f91c36",
                        fontWeight: 700,
                        transition: "color 0.2s",
                      }}
                      onClick={() => setShowCalendar(false)}
                      title="Cerrar"
                    >
                      &times;
                    </button>
                    <h3
                      style={{
                        color: "#f91c36",
                        textAlign: "center",
                        marginBottom: 12,
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      Selecciona una fecha
                    </h3>
                    <DatePicker
                      selected={customDate}
                      onChange={(date) => {
                        setCustomDate(date);
                        setFecha(date ? date.toLocaleDateString() : null);
                        setShowCalendar(false);
                      }}
                      minDate={new Date()}
                      inline
                    />
                    {customDate && (
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: 10,
                          color: "#fff",
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        {customDate.toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>
                  <style>{`
                    @keyframes fadeInBg {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }
                    @keyframes popIn {
                      from { transform: scale(0.85); opacity: 0; }
                      to { transform: scale(1); opacity: 1; }
                    }
                  `}</style>
                </div>
              )}
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
                    cursor: confirmada && modalOpen ? "not-allowed" : "pointer",
                  }}
                  onClick={confirmada && modalOpen ? handleBlockedChange : () => setHora(h)}
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
                    cursor: confirmada && modalOpen ? "not-allowed" : "pointer",
                  }}
                  onClick={confirmada && modalOpen ? handleBlockedChange : () => setFormato(f)}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reserva__seats">
          <SeatSelector
            setAsientosSeleccionados={setAsientos}
            funcionId={funcionId}
            usuarioId={usuarioId}
            confirmada={confirmada}
            asientosOcupados={asientosOcupados}
          />
        </div>
      </div>
      <button
        className="seat-selector__confirm-btn"
        style={{ marginTop: 20 }}
        disabled={
          !selectedMovie || !fecha || !hora || !formato || asientos.length === 0 || !sala
        }
        onClick={handleConfirm}
      >
        Confirmar selección
      </button>
      {showCombo && (
        <ComboSelector onSelect={handleComboSelect} onSkip={handleComboSkip} />
      )}
      <ReservaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        reserva={reserva}
      />
    </div>
  );
};

export default Reservas;
