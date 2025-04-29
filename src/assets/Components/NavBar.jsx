import React from "react";
import "../css/Navbar.css";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <img
        src="/public/img/RecVelvet_Logo.jpeg"
        alt=""
        className="navbar__logo"
      />
      <section className="navbar__navigation">
        <ul className="navbar__navigation-items">
          <li>
            <a href="#">Cartelera</a>
          </li>
          <li>
            <a href="#">Promociones</a>
          </li>
          <li className="navbar__navigation-search">
            <input type="text" className="navbar__navigation-input" />
            <SearchIcon className="navbar__navigation-icon" />
          </li>
        </ul>
        <Link to="/login" className="navbar__navigation-button">
          <UserCircleIcon />
        </Link>
      </section>
    </nav>
  );
};

export default NavBar;
