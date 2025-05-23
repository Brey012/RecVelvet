import React from "react";
import "../css/Navbar.css";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const NavBar = () => {
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
          <li>
            <Link to="/promociones">Promociones</Link>
          </li>
          <li className="navbar__navigation-search">
            <input
              type="text"
              className="navbar__navigation-input"
              placeholder="Buscar película..."
            />
            <SearchIcon className="navbar__navigation-icon" />
          </li>
        </ul>

        <Link to="/login" className="navbar__navigation-button" title="Iniciar sesión">
          <UserCircleIcon className="navbar__user-icon" />
        </Link>
      </section>
    </nav>
  );
};

export default NavBar;
