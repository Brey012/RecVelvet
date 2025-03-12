import React from "react";
import "./assets/css/RecVelvet.css";
import NavBar from "./assets/Components/NavBar";
import SliderCartelera from "./assets/Components/SliderCartelera";

const RecVelvet = () => {
  return (
    <div className="body-container">
      <NavBar />
      <SliderCartelera />
    </div>
  );
};

export default RecVelvet;
