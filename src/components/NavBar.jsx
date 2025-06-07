import React, { useState, useRef, useEffect } from "react";
import "../styles/NavBar.css";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
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

      <section className="navbar__navigation">
        <ul className="navbar__navigation-items">
          <li>
            <Link to="/cartelera">Cartelera</Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li className="navbar__navigation-search">
            <input
              type="text"
              className="navbar__navigation-input"
              placeholder="Buscar película..."
            />
            <SearchIcon className="navbar__navigation-icon" />
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
