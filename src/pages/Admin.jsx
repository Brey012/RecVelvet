import React, { useEffect, useState } from "react";
import "../styles/Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);

  // Estados para edición de reservas
  const [reservaEdit, setReservaEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(setUsers);

    fetch("http://localhost:3001/reservas")
      .then(res => res.json())
      .then(setReservas);

    fetch("http://localhost:3001/peliculas")
      .then(res => res.json())
      .then(setPeliculas);
  }, []);

  const eliminarUsuario = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u.id !== id));
  };

  const eliminarReserva = async (id) => {
    await fetch(`http://localhost:3001/reservas/${id}`, { method: "DELETE" });
    setReservas(reservas.filter(r => r.id !== id));
  };

  // Abrir modal de edición de reserva
  const abrirEditarReserva = (reserva) => {
    setReservaEdit({ ...reserva });
    setModalOpen(true);
  };

  // Manejar cambios en el formulario de edición
  const handleReservaChange = (e) => {
    const { name, value } = e.target;
    setReservaEdit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar cambios de la reserva editada
  const guardarEdicionReserva = async () => {
    await fetch(`http://localhost:3001/reservas/${reservaEdit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...reservaEdit,
        asientos: Array.isArray(reservaEdit.asientos)
          ? reservaEdit.asientos
          : reservaEdit.asientos.split(",").map(s => s.trim())
      })
    });
    setReservas(reservas.map(r => r.id === reservaEdit.id ? {
      ...reservaEdit,
      asientos: Array.isArray(reservaEdit.asientos)
        ? reservaEdit.asientos
        : reservaEdit.asientos.split(",").map(s => s.trim())
    } : r));
    setModalOpen(false);
  };

  const cambiarEstadoPelicula = async (pelicula) => {
    const nuevoEstado = pelicula.estado === "cartelera" ? "estreno" : "cartelera";
    const actualizada = { ...pelicula, estado: nuevoEstado };
    await fetch(`http://localhost:3001/peliculas/${pelicula.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizada)
    });
    setPeliculas(peliculas.map(p => p.id === pelicula.id ? actualizada : p));
  };

  return (
    <div className="admin__container">
      <h1 className="admin__title" style={{ letterSpacing: 2, marginBottom: 32 }}>Panel de Administración</h1>
      <div className="admin__grid">
        <div className="admin__grid-row">
          <section className="admin__section admin__section--usuarios">
            <h2>Usuarios</h2>
            <ul className="admin__list">
              {users.map(u => (
                <li key={u.id} className="admin__item">
                  <span className="admin__user-info">
                    <b>{u.fullName}</b> <span style={{ color: '#888' }}>({u.email})</span> <span className="admin__role">[{u.role}]</span>
                  </span>
                  <div className="admin__buttons">
                    <button className="admin__btn eliminar" title="Eliminar usuario" onClick={() => eliminarUsuario(u.id)}>
                      🗑️ Eliminar
                    </button>
                    <button className="admin__btn modificar" title="Modificar usuario" disabled style={{ opacity: 0.5 }}>
                      ✏️ Modificar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="admin__section admin__section--peliculas">
            <h2>Películas</h2>
            <ul className="admin__list">
              {peliculas.map(p => (
                <li key={p.id} className="admin__item">
                  <span className="admin__pelicula-info">
                    <b>{p.titulo_original}</b> — <span style={{ color: p.estado === "cartelera" ? '#1976d2' : '#fbc02d', fontWeight: 600 }}>{p.estado === "cartelera" ? "En Cartelera" : "En Estreno"}</span>
                  </span>
                  <div className="admin__buttons">
                    <button
                      className="admin__btn modificar"
                      title="Cambiar estado"
                      onClick={() => cambiarEstadoPelicula(p)}
                    >
                      🔄 Cambiar a {p.estado === "cartelera" ? "Estreno" : "Cartelera"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="admin__grid-row">
          <section className="admin__section admin__section--reservas">
            <h2>Reservas</h2>
            <ul className="admin__list">
              {reservas.map(r => (
                <li key={r.id} className="admin__item">
                  <span className="admin__reserva-info">
                    <b>Película:</b> {r.pelicula} <span style={{ margin: '0 8px' }}>|</span> <b>Cliente:</b> {r.cliente} <span style={{ margin: '0 8px' }}>|</span> <b>Asientos:</b> <span style={{ color: '#2e7d32' }}>{r.asientos?.join(", ")}</span>
                  </span>
                  <div className="admin__buttons">
                    <button className="admin__btn eliminar" title="Eliminar reserva" onClick={() => eliminarReserva(r.id)}>
                      🗑️ Eliminar
                    </button>
                    <button className="admin__btn modificar" title="Modificar reserva" onClick={() => abrirEditarReserva(r)}>
                      ✏️ Modificar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      {/* Modal de edición de reserva */}
      {modalOpen && reservaEdit && (
        <div className="admin__modal">
          <div className="admin__modal-content">
            <h3 style={{ marginBottom: 16, color: '#1976d2' }}>Editar Reserva</h3>
            <div className="admin__modal-form">
              <label>
                <span>Película:</span>
                <input
                  name="pelicula"
                  value={reservaEdit.pelicula}
                  onChange={handleReservaChange}
                />
              </label>
              <label>
                <span>Fecha:</span>
                <input
                  name="fecha"
                  value={reservaEdit.fecha}
                  onChange={handleReservaChange}
                />
              </label>
              <label>
                <span>Hora:</span>
                <input
                  name="hora"
                  value={reservaEdit.hora}
                  onChange={handleReservaChange}
                />
              </label>
              <label>
                <span>Formato:</span>
                <input
                  name="formato"
                  value={reservaEdit.formato}
                  onChange={handleReservaChange}
                />
              </label>
              <label>
                <span>Asientos (separados por coma):</span>
                <input
                  name="asientos"
                  value={Array.isArray(reservaEdit.asientos) ? reservaEdit.asientos.join(",") : reservaEdit.asientos}
                  onChange={e =>
                    setReservaEdit(prev => ({
                      ...prev,
                      asientos: e.target.value
                    }))
                  }
                />
              </label>
              <label>
                <span>Cliente:</span>
                <input
                  name="cliente"
                  value={reservaEdit.cliente}
                  onChange={handleReservaChange}
                />
              </label>
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="admin__btn guardar" onClick={guardarEdicionReserva}>
                  💾 Guardar
                </button>
                <button className="admin__btn cancelar" onClick={() => setModalOpen(false)} style={{ marginLeft: 12 }}>
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
