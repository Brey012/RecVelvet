import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/RecVelvet.css";
import NavBar from "./assets/Components/NavBar";
import SliderCartelera from "./assets/Components/SliderCartelera";
import Login from "./assets/Components/Login"; // Importa el componente Login

const RecVelvet = () => {
  return (
    <Router>
      <div className="body-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<SliderCartelera />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RecVelvet;
