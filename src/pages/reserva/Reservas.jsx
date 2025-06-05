import SeatSelector from "./SeatSelector";

import "../../assets/css/Reservas.css";

const Reservas = () => {
  return (
    <div className="reserva__container">
      <h1>Reservarción</h1>

      <div className="reserva__container-content">
        <div className="reserva__selectors">
          <div className="reserva__fecha">
            <h2>Fecha</h2>
            <div className="reserva__fecha-content">
                <div>Lun</div>
                <div>Mar</div>
                <div>Mie</div>
                <div>Jue</div>
                <div>Cal</div>
            </div>
          </div>
          <div className="reserva__hora">
            <h2>Hora</h2>
            <div className="reserva__hora-content">
              <div>10:00</div>
              <div>12:00</div>
              <div>14:00</div>
              <div>16:00</div>
              <div>18:00</div>
            </div>
          </div>
          <div className="reserva__formato">
            <h2>Formato</h2>
            <div className="reserva__formato-content">
              <div>2D</div>
              <div>3D</div>
              <div>4DX</div>
              <div>IMAX</div>
            </div>
          </div>
        </div>

        <div className="reserva__seats">
          <SeatSelector />
        </div>
      </div>
    </div>
  );
};

export default Reservas;
