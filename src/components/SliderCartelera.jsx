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
      title: "Star Wars: Episode III - Revenge of the Sith",
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
              <button
                className="slider__cta-btn"
                style={{
                  background: 'rgba(249,28,54,0.13)',
                  color: '#fff',
                  border: '1px solid #f91c36',
                  borderRadius: 10,
                  padding: '10px 28px',
                  fontSize: 18,
                  fontWeight: 700,
                  margin: '18px 0 0 0',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px #0002',
                  transition: 'background 0.18s, color 0.18s, border 0.18s',
                  outline: 'none',
                  opacity: 0.93,
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#f91c36';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.border = '2px solid #f91c36';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'rgba(249,28,54,0.13)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.border = '2px solid #f91c36';
                }}
                onFocus={e => {
                  e.currentTarget.style.background = '#f91c36';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.border = '2px solid #f91c36';
                }}
                onBlur={e => {
                  e.currentTarget.style.background = 'rgba(249,28,54,0.13)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.border = '2px solid #f91c36';
                }}
                onClick={() => {
                  window.location.href = `/reservas?pelicula=${encodeURIComponent(item.title)}`;
                }}
              >
                Reservar
              </button>
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
