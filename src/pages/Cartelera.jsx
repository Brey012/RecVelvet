import "../styles/Cartelera.css";
import { useNavigate } from "react-router-dom";

const movies = [
  { key: "godfather", name: "The Godfather" },
  { key: "starwars", name: "Star Wars" },
  { key: "seven", name: "Seven" },
  { key: "batman", name: "The Dark Knight" },
  { key: "back", name: "Back to the Future" },
  { key: "godfellas", name: "Godfellas" },
  { key: "interstellar", name: "Interstellar" },
];

const Cartelera = () => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate("/reservas", { state: { movie } });
  };

  return (
    <div className="cartelera__container">
      <h1 className="cartelera__title">Cartelera</h1>
      <div className="cartelera__movies">
        {movies.map((movie) => (
          <div
            key={movie.key}
            className={movie.key}
            style={{ cursor: "pointer" }}
            onClick={() => handleMovieClick(movie)}
            title={movie.name}
          />
        ))}
        <button onClick={() => navigate("/reservas")}>Reserva Ya!</button>
      </div>
    </div>
  );
};

export default Cartelera;
