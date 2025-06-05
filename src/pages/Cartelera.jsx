import "../assets/css/Cartelera.css";
import { useNavigate } from "react-router-dom"; // Agrega esto

const Cartelera = () => {
  const navigate = useNavigate(); // Agrega esto

  return (
    <div className="cartelera__container">
        <h1 className="cartelera__title">Cartelera</h1>
        <div className="cartelera__movies">
            <div className="godfather"></div>
            <div className="starwars"></div>
            <div className="seven"></div>
            <button onClick={() => navigate("/reservas")}>Reserva Ya!</button>
            <div className="batman"></div>
            <div className="back"></div>
            <div className="godfellas"></div>
            <div className="interstellar"></div>
        </div>
    </div>
  );
};

export default Cartelera;
