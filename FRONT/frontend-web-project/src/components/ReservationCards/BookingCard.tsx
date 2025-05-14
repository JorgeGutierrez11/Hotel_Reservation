import "./BookingCard.css";
import RoomImage from "../../assets/Rectangle 13.svg";
import UbicationIcon from "../../assets/BookingCard/ubicacion.svg";
import CalendarIcon from "../../assets/BookingCard/calendar.svg";
import StarIcon from "../../assets/BookingCard/star.svg";
import Usericon from "../../assets/person.svg";

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  reservationStatus:
    | "PENDING"
    | "CONFIRMED"
    | "CHECKED_IN"
    | "COMPLETED"
    | "CANCELED";
  totalCost: number;
  room: {
    id: number;
    roomNumber: string;
    roomType:
      | "SINGLE"
      | "STANDARD"
      | "SUITE"
      | "DELUXE"
      | "PENTHOUSE"
      | "FAMILY";
    capacity: number;
  };
}

interface ReservationProps {
  reservation: Reservation;
}

function BookingCard({ reservation }: ReservationProps) {
  const capacity = reservation.room.capacity == 1 ? "Persona" : "Personas";

  return (
    <div className="container-history">
      <div className="history-room-image">
        <img className="room" src={RoomImage} alt="Habitación" />
      </div>
      <div className="details">
        <div className="header">
          <h1>Habitación - {reservation.room.roomNumber}</h1>
          <p className={reservation.reservationStatus}>
            {reservation.reservationStatus}
          </p>
        </div>
        <div className="location">
          <img src={UbicationIcon} alt="Ubication icon" /> Bucaramanga, Colombia
        </div>
        <div className="room-details">
          <div className="feature-container">
            <div className="feature">
              <p>Fechas</p>
              <p className="icon">
                <img src={CalendarIcon} alt="" />
                {reservation.startDate} - {reservation.endDate}
              </p>
            </div>
            <div className="feature">
              <p>Huéspedes</p>
              <p className="icon">
                <img src={Usericon} alt="" /> {reservation.room.capacity}{" "}
                {capacity}
              </p>
            </div>
          </div>
          <div className="feature-container">
            <div className="feature">
              <p>Tipo de Habitación</p>
              {reservation.room.roomType == "PENTHOUSE" ? (
                <p className="icon">
                  <img src={StarIcon} alt="" />
                  <img src={StarIcon} alt="" />
                  <img src={StarIcon} alt="" />
                  <img src={StarIcon} alt="" />
                  <img src={StarIcon} alt="" />
                  {reservation.room.roomType}
                </p>
              ) : (
                <p className="icon">
                  <img src={StarIcon} alt="" />
                  <img src={StarIcon} alt="" />
                  <img src={StarIcon} alt="" />
                  {reservation.room.roomType}
                </p>
              )}
            </div>
            <div className="feature">
              <p>Precio Total</p>
              <p className="icon" id="total-cost">${reservation.totalCost}</p>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="button" id="cancel">
            Cancelar
          </button>
          <button className="button" id="update">
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
