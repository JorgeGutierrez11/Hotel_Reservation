import "./BookingCard.css";
import UbicationIcon from "../../assets/BookingCard/ubicacion.svg";
import CalendarIcon from "../../assets/BookingCard/calendar.svg";
import StarIcon from "../../assets/BookingCard/star.svg";
import Usericon from "../../assets/person.svg";
import { Reservation } from "../../models/reservation.model";

interface ReservationProps {
  reservation: Reservation;
}

function BookingCard({ reservation }: ReservationProps) {
  const { room, startDate, endDate, totalCost, reservationStatus } = reservation;
  const capacityLabel = room.capacity === 1 ? "Persona" : "Personas";
  const starCount = room.roomType === "PENTHOUSE" ? 5 : 3;

  return (
    <div className="booking-card">
      <div className="image-container">
        <img className="room-imager" src={reservation.room.imageUrl} alt="Habitación" />
      </div>
      <div className="details">
        <div className="header">
          <h1>Habitación - {room.roomNumber}</h1>
          <p className={`status ${reservationStatus.toLowerCase()}`}>
            {reservationStatus}
          </p>
        </div>

        <div className="location">
          <img src={UbicationIcon} alt="Ubicación" />
          Bucaramanga, Colombia
        </div>

        <div className="info">
          <div className="features">
            <div className="feature">
              <p>Fechas</p>
              <p className="icon">
                <img src={CalendarIcon} alt="Calendario" />
                {startDate.toString().split("T")[0]} - {endDate.toString().split("T")[0]}
              </p>
            </div>
            <div className="feature">
              <p>Tipo de Habitación</p>
              <p className="icon">
                {[...Array(starCount)].map((_, i) => (
                  <img key={i} src={StarIcon} alt="Estrella" />
                ))}
                {room.roomType}
              </p>
            </div>
          </div>
          <div className="features">
            <div className="feature">
              <p>Huéspedes</p>
              <p className="icon">
                <img src={Usericon} alt="Usuario" />
                {room.capacity} {capacityLabel}
              </p>
            </div>
            <div className="feature">
              <p>Precio Total</p>
              <p className="icon total">${totalCost}</p>
            </div>
            <div className="buttons">
              <button className="btn cancel">Cancelar</button>
              <button className="btn update">Modificar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
