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
          <div
            className="admin__modal-content"
            style={{
              maxWidth: 700,
              minWidth: 380,
              width: '98vw',
              padding: '16px 16px 10px 16px',
              borderRadius: 14,
              boxShadow: '0 6px 32px #f91c36bb, 0 1px 8px #000a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '78vh',
              overflowY: 'auto',
            }}
          >
            <h3 style={{ marginBottom: 8, color: '#1976d2', fontSize: 20, fontWeight: 700, letterSpacing: 0.5, textAlign: 'center', width: '100%' }}>Editar Reserva</h3>
            <div
              className="admin__modal-form"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: 24,
                justifyContent: 'center',
                alignItems: 'stretch', // Cambia a stretch para igualar altura
                fontSize: 14,
                minHeight: 220,
                boxSizing: 'border-box',
              }}
            >
              {/* Columna izquierda */}
              <div
                style={{
                  flex: 1,
                  minWidth: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  justifyContent: 'space-between',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span>Película:</span>
                  <input
                    type="text"
                    placeholder="Buscar película..."
                    value={reservaEdit.pelicula || ''}
                    onChange={e => setReservaEdit(prev => ({ ...prev, pelicula: e.target.value }))}
                    style={{ borderRadius: 6, padding: '4px 8px', fontSize: 14, marginBottom: 2 }}
                    list="admin-peliculas-list"
                    autoComplete="off"
                  />
                  <datalist id="admin-peliculas-list">
                    {peliculas.map(p => (
                      <option key={p.id} value={p.titulo_original} />
                    ))}
                  </datalist>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span>Fecha:</span>
                  <input
                    type="date"
                    name="fecha"
                    value={reservaEdit.fecha}
                    onChange={handleReservaChange}
                    style={{
                      borderRadius: 6,
                      padding: '4px 8px',
                      fontSize: 14,
                      marginBottom: 2,
                      background: '#181c24',
                      color: '#fff',
                      border: '1.5px solid #f91c36',
                      boxShadow: '0 1px 4px #f91c3622',
                    }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span>Hora:</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                    {['12:00', '15:00', '18:00', '21:00'].map(h => (
                      <div
                        key={h}
                        onClick={() => setReservaEdit(prev => ({ ...prev, hora: h }))}
                        style={{
                          border: reservaEdit.hora === h ? '2px solid #f91c36' : '1.5px solid #444',
                          background: reservaEdit.hora === h ? '#f91c36' : '#232323',
                          color: reservaEdit.hora === h ? '#fff' : '#fff',
                          borderRadius: 7,
                          padding: '4px 12px',
                          fontWeight: reservaEdit.hora === h ? 700 : 500,
                          fontSize: 13,
                          cursor: 'pointer',
                          boxShadow: reservaEdit.hora === h ? '0 1px 6px #f91c3655' : '0 1px 2px #0002',
                          transition: 'all 0.15s',
                        }}
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span>Formato:</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                    {['2D', '3D', '4DX', 'IMAX'].map(f => (
                      <div
                        key={f}
                        onClick={() => setReservaEdit(prev => ({ ...prev, formato: f }))}
                        style={{
                          border: reservaEdit.formato === f ? '2px solid #1976d2' : '1.5px solid #444',
                          background: reservaEdit.formato === f ? '#1976d2' : '#232323',
                          color: reservaEdit.formato === f ? '#fff' : '#fff',
                          borderRadius: 7,
                          padding: '4px 12px',
                          fontWeight: reservaEdit.formato === f ? 700 : 500,
                          fontSize: 13,
                          cursor: 'pointer',
                          boxShadow: reservaEdit.formato === f ? '0 1px 6px #1976d255' : '0 1px 2px #0002',
                          transition: 'all 0.15s',
                        }}
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    style={{ borderRadius: 6, padding: '4px 8px', fontSize: 14, marginBottom: 2 }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span>Cliente:</span>
                  <input
                    name="cliente"
                    value={reservaEdit.cliente}
                    onChange={handleReservaChange}
                    style={{ borderRadius: 6, padding: '4px 8px', fontSize: 14, marginBottom: 2 }}
                  />
                </label>
              </div>
              {/* Columna derecha: combos */}
              <div
                style={{
                  flex: 1.1,
                  minWidth: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontWeight: 600, color: '#f91c36', fontSize: 15, marginBottom: 4, display: 'block', textAlign: 'center' }}>Combo:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 4, width: '100%' }}>
                  {[
                    { nombre: "Combo Clásico", descripcion: "Crispetas medianas + Gaseosa 400ml", precio: 18000, color: '#f91c36', img: '/img/ComboClasico.png' },
                    { nombre: "Combo Pareja", descripcion: "Crispetas grandes + 2 Gaseosas 400ml", precio: 25000, color: '#e67e22', img: '/img/ComboPareja.png' },
                    { nombre: "Combo Nachos", descripcion: "Nachos + Queso + Gaseosa 400ml", precio: 20000, color: '#f4d03f', img: '/img/ComboNachos.png' },
                    { nombre: "Combo Amigos", descripcion: "2 Crispetas medianas + 2 Gaseosas 400ml", precio: 27000, color: '#16a085', img: '/img/ComboAmigos.png' },
                    { nombre: "Combo Familiar", descripcion: "Crispetas extra grandes + 3 Gaseosas 400ml + Nachos", precio: 35000, color: '#2980b9', img: '/img/ComboFamiliar.png' }
                  ].map(combo => (
                    <div key={combo.nombre}
                      onClick={() => setReservaEdit(prev => ({ ...prev, combo: combo.nombre }))
                      }
                      style={{
                        border: reservaEdit.combo === combo.nombre ? `2px solid ${combo.color}` : '1.5px solid #444',
                        background: reservaEdit.combo === combo.nombre ? `${combo.color}22` : '#232323',
                        color: reservaEdit.combo === combo.nombre ? combo.color : '#fff',
                        borderRadius: 8,
                        padding: '8px 8px',
                        minWidth: 90,
                        maxWidth: 110,
                        cursor: 'pointer',
                        boxShadow: reservaEdit.combo === combo.nombre ? `0 1px 6px ${combo.color}55` : '0 1px 2px #0002',
                        fontWeight: reservaEdit.combo === combo.nombre ? 700 : 500,
                        transition: 'all 0.15s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        outline: reservaEdit.combo === combo.nombre ? `1.5px solid ${combo.color}` : 'none',
                        marginBottom: 2,
                      }}
                    >
                      <img src={combo.img} alt={combo.nombre} style={{ width: 38, height: 38, objectFit: 'contain', marginBottom: 4, borderRadius: 8, background: '#fff', boxShadow: reservaEdit.combo === combo.nombre ? `0 2px 12px ${combo.color}55` : '0 1px 4px #0002', border: reservaEdit.combo === combo.nombre ? `2px solid ${combo.color}` : '1.5px solid #ccc', transition: 'border 0.2s, box-shadow 0.2s' }} />
                      <span style={{ fontSize: 13 }}>{combo.nombre}</span>
                      <span style={{ fontSize: 10, color: '#ccc', margin: '2px 0 2px 0', textAlign: 'center' }}>{combo.descripcion}</span>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>${combo.precio.toLocaleString()}</span>
                    </div>
                  ))}
                  <div
                    onClick={() => setReservaEdit(prev => ({ ...prev, combo: "" }))}
                    style={{
                      border: reservaEdit.combo === "" || !reservaEdit.combo ? '2px solid #888' : '1.5px solid #444',
                      background: reservaEdit.combo === "" || !reservaEdit.combo ? '#8882' : '#232323',
                      color: reservaEdit.combo === "" || !reservaEdit.combo ? '#888' : '#fff',
                      borderRadius: 8,
                      padding: '8px 8px', // Igual que los combos
                      minWidth: 90,
                      maxWidth: 110,
                      cursor: 'pointer',
                      boxShadow: reservaEdit.combo === "" || !reservaEdit.combo ? '0 1px 6px #8885' : '0 1px 2px #0002',
                      fontWeight: reservaEdit.combo === "" || !reservaEdit.combo ? 700 : 500,
                      transition: 'all 0.15s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      outline: reservaEdit.combo === "" || !reservaEdit.combo ? '1.5px solid #888' : 'none',
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontSize: 13 }}>Sin combo</span>
                    <span style={{ fontSize: 10, color: '#ccc', margin: '2px 0 2px 0', textAlign: 'center' }}>No agregar combo</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button className="admin__btn guardar" style={{ fontSize: 14, padding: '6px 16px' }} onClick={guardarEdicionReserva}>
                💾 Guardar
              </button>
              <button className="admin__btn cancelar" style={{ marginLeft: 8, fontSize: 14, padding: '6px 16px' }} onClick={() => setModalOpen(false)}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
