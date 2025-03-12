import React, { useEffect } from "react";
import "../css/SliderCartelera.css";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { initializeSlider } from "../Controllers/SliderCartelera";

const SliderCartelera = () => {
  useEffect(() => {
    initializeSlider();
  }, []);

  return (
    <section className="slider">
        <div className="slider__list">
          <div className="slider__list-item active">
            <img src="/public/img/TheGodFatherBg.jpg" alt="The God Father" />
            <div className="slider_list-content">
              <h2>Titulo</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium nostrum molestiae mollitia velit saepe hic vitae
                unde beatae cumque porro?
              </p>
            </div>
          </div>

          <div className="slider__list-item">
            <img src="/public/img/StarWarsEp3Bg.jpg" alt="Star Wars Ep III" />
            <div className="slider_list-content">
              <h2>Titulo</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium nostrum molestiae mollitia velit saepe hic vitae
                unde beatae cumque porro?
              </p>
            </div>
          </div>

          <div className="slider__list-item">
            <img src="/public/img/InterstellarBg.png" alt="Interstellar" />
            <div className="slider_list-content">
              <h2>Titulo</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium nostrum molestiae mollitia velit saepe hic vitae
                unde beatae cumque porro?
              </p>
            </div>
          </div>
        </div>

        <div className="slider__controls">
          <button id="prev">
            <ChevronDoubleLeftIcon className="arrow__button" />
          </button>
          <button id="next">
            <ChevronDoubleRightIcon className="arrow__button" />
          </button>
        </div>

        <div className="thumbnail">
          <div className="thumbnail__item active">
            <img src="/public/img/TheGodFather.jpg" alt="The God Father" />
            <div className="thumbnail__item-content">The God Father</div>
          </div>

          <div className="thumbnail__item">
            <img src="/public/img/StarWarsEp3.jpg" alt="Star Wars Ep III" />
            <div className="thumbnail__item-content">
              Star Wars Ep III
            </div>
          </div>

          <div className="thumbnail__item">
            <img src="/public/img/Interstellar.jpg" alt="Interstellar" />
            <div className="thumbnail__item-content">Interstellar</div>
          </div>
        </div>
    </section>
  );
};

export default SliderCartelera;