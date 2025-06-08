import React, { useState, useRef, useEffect } from "react";
import "../styles/NavBar.css";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 600;

  // --- Búsqueda de películas ---
  const [search, setSearch] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/peliculas")
      .then((res) => res.json())
      .then(setPeliculas);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const f = peliculas.filter((p) =>
        p.titulo_original.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(f);
      setShowDropdown(true);
    } else {
      setFiltered([]);
      setShowDropdown(false);
    }
  }, [search, peliculas]);

  const handleSelectMovie = (movie) => {
    setSearch("");
    setShowDropdown(false);
    navigate(
      `/peliculasinfo?pelicula=${encodeURIComponent(movie.titulo_original)}`
    );
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      // Cerrar dropdown de búsqueda si se hace click fuera
      if (!e.target.className?.includes("navbar__navigation-input")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="/img/RecVelvet_Logo.jpeg"
          alt="Logo de JolyGuacamoly"
          className="navbar__logo"
        />
      </Link>
      {isMobile && (
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
        </button>
      )}
      <section
        className={`navbar__navigation${
          isMobile ? " navbar__navigation--mobile" : ""
        }${menuOpen ? " open" : ""}`}
      >
        <ul className="navbar__navigation-items">
          <li>
            <Link to="/cartelera">Cartelera</Link>
          </li>
          {user?.role !== "admin" && (
            <li>
              <Link to="/mireserva">Mi reserva</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li
            className="navbar__navigation-search"
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", width: 220 }}>
              <input
                type="text"
                className="navbar__navigation-input"
                placeholder="Buscar película..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search && setShowDropdown(true)}
                autoComplete="off"
                style={{
                  border: showDropdown ? "2px solid #f91c36" : "1px solid #888",
                  borderRadius: "8px",
                  padding: "8px 36px 8px 14px",
                  boxShadow: showDropdown ? "0 4px 24px #f91c3622" : "none",
                  transition: "all 0.18s",
                  background: "#232323",
                  color: "#fff",
                  width: "100%",
                  outline: showDropdown ? "2px solid #f91c36" : "none",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered.length > 0) {
                    handleSelectMovie(filtered[0]);
                  }
                }}
              />
              <SearchIcon
                className="navbar__navigation-icon"
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  color: "#f91c36",
                  pointerEvents: "none",
                }}
              />
              {showDropdown && (
                <ul
                  className="navbar__search-dropdown"
                  style={{
                    position: "absolute",
                    top: 40,
                    left: 0,
                    width: "100%",
                    background: "#181818",
                    borderRadius: 10,
                    boxShadow: "0 8px 32px #000a",
                    zIndex: 100,
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                    animation: "fadeInDropdown 0.18s",
                    border: "1.5px solid #f91c36",
                  }}
                >
                  {filtered.length === 0 && (
                    <li
                      style={{
                        color: "#bbb",
                        padding: "10px 18px",
                        textAlign: "center",
                      }}
                    >
                      No se encontraron resultados
                    </li>
                  )}
                  {filtered.map((p, idx) => (
                    <li
                      key={p.id}
                      className="navbar__search-dropdown-item"
                      style={{
                        padding: "10px 18px",
                        cursor: "pointer",
                        color: "#fff",
                        background: idx === 0 ? "#2a2a2a" : "none",
                        borderBottom: "1px solid #222",
                        transition: "background 0.15s",
                      }}
                      onMouseDown={() => handleSelectMovie(p)}
                      onMouseOver={(e) => (e.currentTarget.style.background = "#2a2a2a")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "none")}
                    >
                      {p.titulo_original}
                    </li>
                  ))}
                </ul>
              )}
              <style>{`
                @keyframes fadeInDropdown {
                  from { opacity: 0; transform: translateY(-8px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          </li>
        </ul>

        <div className="navbar__navigation-user" ref={menuRef}>
          <button
            className={`navbar__user-btn${
              user ? " navbar__user-btn--active" : ""
            }`}
            onClick={() => setOpen((o) => !o)}
            title="Usuario"
          >
            <UserCircleIcon className="navbar__user-icon" />
          </button>
          {open && user && (
            <div className="navbar__user-menu">
              <div className="navbar__user-email">{user.email}</div>
              <button className="navbar__logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
};

export default NavBar;
