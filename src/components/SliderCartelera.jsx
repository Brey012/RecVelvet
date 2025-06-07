import React, { useState } from "react";
import "../styles/SliderCartelera.css";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";

const SliderCartelera = () => {
  const [itemActive, setItemActive] = useState(0);
  const items = [
    {
      img: "/public/img/TheGodFatherBg.jpg",
      thumbnail: "/public/img/TheGodFather.jpg",
      title: "The Godfather",
      sinopsis: "La historia de la familia criminal Corleone en Nueva York, liderada por Don Vito Corleone, y la transformación de su hijo Michael en el nuevo jefe de la familia.",
    },
    {
      img: "/public/img/InterstellarBg.png",
      thumbnail: "/public/img/Interstellar.jpg",
      title: "Interstellar",
      sinopsis: "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en busca de un nuevo hogar para la humanidad.",
    },
    {
      img: "/public/img/StarWarsEp3Bg.jpg",
      thumbnail: "/public/img/StarWarsEp3.jpg",
      title: "Star Wars Episode III",
      sinopsis: "Anakin Skywalker se convierte en Darth Vader mientras la República Galáctica cae y el Imperio emerge en una épica batalla entre el bien y el mal.",
    },
  ];
  const countItem = items.length;

  const showSlider = (index) => {
    setItemActive(index);
  };

  const handleNext = () => {
    setItemActive((prev) => (prev + 1) % countItem);
  };

  const handlePrev = () => {
    setItemActive((prev) => (prev - 1 + countItem) % countItem);
  };

  return (
    <div className="slider">
      <div className="slider__list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`slider__item ${index === itemActive ? "active" : ""}`}
          >
            <img src={item.img} alt={item.title} />
            <div className="content">
              <p>RECVELVET</p>
              <h2>{item.title}</h2>
              <p>{item.sinopsis}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button className="prev" onClick={handlePrev}>
          <ChevronDoubleLeftIcon className="icon" />
        </button>
        <button className="next" onClick={handleNext}>
          <ChevronDoubleRightIcon className="icon" />
        </button>
      </div>

      <div className="thumbnail">
        {items.map((item, index) => (
          <div
            key={index}
            className={`thumbnail__item ${index === itemActive ? "active" : ""}`}
            onClick={() => showSlider(index)}
          >
            <img src={item.thumbnail} alt={item.title} />
            <p className="title">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderCartelera;
