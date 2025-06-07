import React from "react";
import "../../styles/ComboSelector.css";
import "../../styles/Reservas.css";

const combos = [
  {
    id: 1,
    nombre: "Combo Clásico",
    descripcion: "Crispetas medianas + Gaseosa 400ml",
    precio: 18000,
    img: "/img/ComboClasico.png"
  },
  {
    id: 2,
    nombre: "Combo Pareja",
    descripcion: "Crispetas grandes + 2 Gaseosas 400ml",
    precio: 25000,
    img: "/img/ComboPareja.png"
  },
  {
    id: 3,
    nombre: "Combo Nachos",
    descripcion: "Nachos + Queso + Gaseosa 400ml",
    precio: 20000,
    img: "/img/ComboNachos.png"
  },
  {
    id: 4,
    nombre: "Combo Amigos",
    descripcion: "2 Crispetas medianas + 2 Gaseosas 400ml",
    precio: 27000,
    img: "/img/ComboAmigos.png"
  },
  {
    id: 5,
    nombre: "Combo Familiar",
    descripcion: "Crispetas extra grandes + 3 Gaseosas 400ml + Nachos",
    precio: 35000,
    img: "/img/ComboFamiliar.png"
  },
];

const ComboSelector = ({ onSelect, onSkip }) => {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="combo-selector__overlay">
      <div className="combo-selector__modal">
        <h2>¿Deseas agregar un combo a tu reserva?</h2>
        <div className="combo-selector__list">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className={`combo-selector__item${selected === combo.id ? " selected" : ""}`}
              onClick={() => setSelected(combo.id)}
            >
              <img src={combo.img} alt={combo.nombre} className="combo-selector__img" style={{ borderRadius: 18, boxShadow: '0 2px 16px #f91c36cc, 0 1px 8px #000a', border: selected === combo.id ? '3px solid #f91c36' : '2px solid #232323', transition: 'border 0.2s, box-shadow 0.2s' }} />
              <div className="combo-selector__info">
                <h3>{combo.nombre}</h3>
                <p>{combo.descripcion}</p>
                <span className="combo-selector__precio">${combo.precio.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="combo-selector__actions">
          <button
            className="combo-selector__btn"
            disabled={selected === null}
            onClick={() => onSelect(combos.find(c => c.id === selected))}
          >
            Elegir combo
          </button>
          <button
            className="combo-selector__btn combo-selector__btn--skip"
            onClick={onSkip}
          >
            No quiero combo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboSelector;
